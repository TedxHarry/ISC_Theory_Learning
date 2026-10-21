# The account is missing. Should ISC remove it?

Devi, employee number `57007`, coordinates delivery support. Her QueueDesk account is `qd-57007`.

The application still contains that account. It is disabled, but it has not been deleted. SailPoint Identity Security Cloud, or ISC, already represents the account and links it correctly to Devi.

A new collection returns 850 accounts where the agreed population contains 1,000. Devi's account is among the 150 records missing from the result.

An administrator suggests increasing the deletion limit so the run can finish.

Before changing that limit, let's establish what “missing” means. Was the external account removed, or did the read stop including it?

Those are different facts, and the difference can affect much more than one screen.

## Decide which object you are talking about

An **account** is a record in an external system. ISC keeps its own representation of that record.

An **identity** is ISC's representation of the person. It connects the person's accounts and holds person-level information.

A **source** is ISC's configured representation of a system or collection of account data. A **connector** supplies the supported integration operations. **Aggregation** reads supported source data and represents it in ISC.

Deleting an external account removes a record from the application. Removing its ISC representation removes the account information ISC keeps. Deleting an ISC identity removes a person record. None of those phrases should be used as a substitute for the others.

For this example:

| Record or state | Supplied fact |
|---|---|
| QueueDesk Production source | Represents 1,000 existing accounts in the agreed population, including disabled accounts. |
| External account `qd-57007` | Exists in QueueDesk and is disabled. |
| ISC representation of `qd-57007` | Already exists and is correctly associated with Devi. |
| Devi's identity | Established through a separate human resources (HR) source, WorkerRegistry. |
| HR worker account `wr-57007` | Still exists and remains associated with Devi. |

QueueDesk Production is not the source that establishes Devi's identity. Its account inventory is a separate responsibility.

All records, counts, settings and outcomes in this example are fictional supplied evidence, not results from a live tenant.

## “Disabled” does not mean “absent”

A **disabled account** remains a record in the application with a state that restricts its use. It can still have an owner, attributes and recorded group memberships.

An external deletion removes the account record. A filter exclusion leaves the record in the application but omits it from a selected response.

Our agreed QueueDesk population deliberately includes disabled accounts. The team needs to see accounts that exist, not only accounts currently enabled for use.

The new connector filter mistakenly selects active accounts only. It returns 850 accounts and excludes 150 disabled accounts. No external account has been deleted. There are no newly added accounts or account-key changes in this comparison.

That explains the count difference: 1,000 existing accounts minus 850 returned accounts leaves 150 not returned.

It does not explain 150 genuine external deletions. The application evidence contradicts that conclusion.

A filter is not the only possible cause of missing records. The integration credential may have lost visibility, a file may be incomplete, or a paged read may not have obtained every required page. **Pagination** means the producer returns a large result in portions; the read must obtain the required portions to establish complete coverage.

Identify the cause before treating absence as an instruction.

## What Enable Account Deletion actually allows

The source's account aggregation settings include **Enable Account Deletion**.

For the source-level account collection described here, enabling it permits ISC to remove account representations when accounts are not detected during aggregation. The setting concerns ISC's represented accounts. It is not a request to delete those accounts from the external application.

This is why collection scope matters. ISC needs the expected population to be represented by the read. An unintended exclusion can resemble a removed account from the consumer's point of view.

If account deletion is not enabled, do not expect this missing-record mechanism to clean up representations of externally removed accounts. A retained account record can then be old information, not proof that the account still exists.

Neither choice removes the need for a reliable read:

With deletion enabled, bad coverage can threaten represented accounts.

With deletion disabled, genuine external removals still need appropriate reconciliation so old records do not get mistaken for current evidence.

The same configured deletion settings apply to manual and scheduled source aggregations. A manual **Start Aggregation** is not a harmless preview of what a scheduled run would delete.

Flat-file account imports have deletion settings too. Uploading a file containing only “the five employees we changed” is unsafe if the intended operation treats absence from the complete population as grounds for account removal. Establish the file contract and actual import behavior first.

## The percentage limit asks how much, not whether it is true

When account deletion is enabled, **Percentage of Deleted Accounts Allowed** limits the deletion volume before an aggregation is canceled and a warning is generated.

It is a safeguard against an unexpected amount of removal. It does not verify that each missing account was actually deleted externally.

Account deletion is enabled in the supplied QueueDesk configuration, and the percentage guard is 10%. The established comparison population is 1,000 accounts, and 150 are not returned. That is 15%, clearly beyond the configured 10% limit.

The supplied run is canceled with a deletion-related warning. A separate check confirms that Devi's ISC account representation remains present.

Here is the trace:

```text
[1,000 external accounts still exist]
                 |
                 v
[Wrong active-only read returns 850]
                 |
                 v
[150 accounts missing from result]
                 |
                 v
[15% missing versus 10% limit]
                 |
                 v
[Run canceled; warning reported]

[Engineer checks qd-57007 separately]
```

The connector performs the filtered read. ISC applies its configured deletion safeguard. The arrows show this example's logical progression, not a private comparison algorithm or database transaction order. The separated engineer line is a human check of the actual record.

The guard has provided a reason to investigate. It has not proved that 150 accounts should be removed.

Would increasing the limit to 20% solve the problem?

It would not repair the active-only filter. It would weaken the guard against this incorrect missing population. The right response is to verify and correct the read scope through the approved change process, then review a supported rerun and its consequences.

Do not assume that a canceled aggregation means every earlier account update was rolled back. Inspect the run details and affected records. This example supplies Devi's retained account as evidence; it does not claim a universal all-or-nothing transaction.

A smaller mistake can remain below a percentage limit. Five incorrectly omitted accounts out of 1,000 are only 0.5%. Their small number does not make their removal correct.

Also compare identifiers, not just totals. Returning 1,000 records is not complete coverage if 20 expected accounts have disappeared and 20 different accounts have appeared. A stable count can conceal changed contents.

## Small populations need a whole-account check

Percentages can look reassuring while representing less than one account.

The account-loading guidance documents a specific limitation: the percentage is rounded to a whole-account amount. If it does not round to at least one account, the aggregation is canceled only when 100% of the source's accounts would be deleted.

For a ten-account source, compare these values:

| Configured percentage | Raw amount of ten accounts | Documented consequence |
|---|---|---|
| 1% | 0.1 account, which rounds to zero | The normal guard does not provide the expected one-account stop; cancellation occurs only at 100% deletion under this limitation. |
| 5% | 0.5 account, which rounds to one | The documented example treats this as 10%, or one account, and cancels if one or more accounts would be deleted. |

A lower percentage is therefore not automatically a stronger practical safeguard on a small source.

Check the setting against the actual population size and the documented whole-account behavior. The ten-account example is an explanation, not a recommendation to copy 5% into every source.

Do not turn the field's label into a universal “strictly greater than” formula at every boundary. The documented one-account example explicitly describes cancellation at one or more. Validate the relevant behavior for the intended source and configuration rather than testing destructive edge cases in production.

The main QueueDesk comparison deliberately uses 15% against 10%, away from that boundary. Its count arithmetic explains the supplied warning without inventing a universal threshold algorithm.

## A missing record means something different in a delta read

A **full aggregation** reads the configured population. It is still bounded by filters, operation support and the integration actor's permissions. The **integration actor** is the external identity or credential used for the connector's read.

A **delta aggregation** collects supported changes rather than the complete account population. An unchanged account can legitimately be absent from a delta result.

If `qd-57007` is not in a changes-only response, that omission alone does not establish deletion. A connector can also support explicit deletion information. For example, the JDBC SaaS delta mechanism documents account-key entries with a Delete action.

Those are different mechanisms. Do not apply the full-population absence reasoning to every omitted delta record, or assume that all connectors process deletion evidence identically.

The UI **Aggregate Account** action is different again. It reads one specified account. Its documented behavior leaves the existing ISC record unchanged when the account is not found. It is not a substitute for source-level deletion handling.

Before interpreting absence, establish which operation ran and what its response is supposed to contain.

## What changes when the missing account is authoritative?

An **authoritative source** establishes identities through an **identity profile**, the configuration that connects that source population with identity creation and identity attribute mappings.

Removing an account from an ordinary application source is not the same as losing the authoritative account that supports a person's identity.

Devi's QueueDesk account is not authoritative in our main example. Her WorkerRegistry HR account remains. Removing an ordinary application representation does not by itself mean her person record should be deleted.

Now change the situation. Suppose the authoritative HR account is genuinely deleted externally, and a supported source aggregation with account deletion enabled removes that authoritative account representation from ISC.

ISC then evaluates what should happen to the identity.

If the person has an account on another, lower-priority authoritative source, the identity is reassigned to that source's identity profile. Its identity attributes are recalculated from the new profile's mappings.

**Profile priority** decides which eligible authoritative profile supplies the person's current identity context when multiple authoritative sources contain the person. Each identity is associated with one identity profile at a time.

If no other authoritative source supports the identity, the system attempts identity deletion during its automatic nightly job. That is not a promise that deleting an HR account immediately deletes the identity.

The decision looks like this:

```text
[Authoritative account removed in ISC]
                 |
                 v
[Another authoritative account exists?]
                 |
 +-- Yes -> [Reassign profile]
 |          [Recalculate identity values]
 |
 +-- No --> [Nightly deletion attempt]
             |
             +-- Blocked -> [Hidden identity]
             |
             +-- Eligible -> [Delete allowed]
```

The branches summarize documented identity outcomes. They do not describe private job internals or promise a completion time for a particular tenant. “Blocked” means an identity-deletion condition prevents removal, not that every aggregation or external operation failed. “Delete allowed” means the identity is eligible for the attempt, not evidence that deletion has completed; verify the actual result.

The profile-reassignment branch also deserves review. A different profile can produce different person-level values. Do not assume that retaining an identity under another profile leaves every mapped attribute unchanged.

Any separate access changes need their own evidence. **Provisioning** makes supported changes to external accounts or access; it is not established merely by an ISC account or identity disappearing.

## Why would ISC retain a hidden identity?

Identity deletion can be blocked by relationships, responsibilities or protection settings.

The documented blocking conditions include:

- Accounts from other sources remain correlated to the identity. **Correlation** is the association between an account and the person it belongs to.
- The identity owns a role, access profile, application or source. A role or access profile is an access definition; owning one is an administrative responsibility, not simply having that access.
- The identity owns or requested an active work item, such as an access approval.
- Another identity designates this person as its manager.
- The identity has an elevated administrative user level, such as helpdesk or organization administrator.
- The identity is marked as protected through the supported API-level configuration. An **API** is an interface through which software requests an operation; this protection is managed through that interface.
- The identity is linked to an active access-review campaign or certification.

A **certification** is a review in which designated reviewers assess access. An active review can retain relationships that matter to identity deletion.

If these conditions prevent deletion after the identity loses its authoritative profile, ISC retains it as a **hidden identity**.

Hidden is not a synonym for “all external access disabled.”

The identity no longer has an identity profile. Its last name, email and user-name identifier are no longer mapped, and it does not appear on the normal Identities page.

Accounts previously correlated to it remain attached, but ISC treats them as uncorrelated because they no longer belong to an authoritative identity. In an uncorrelated-accounts certification covering their sources, those accounts are grouped under a shared uncorrelated identity.

That distinction explains an otherwise confusing observation: the person disappears from the usual list, but accounts and governance relationships still need attention.

Do not remove ownership, manager relationships, administrative levels or protection merely to force deletion. Establish the approved retention and responsibility-transfer decision first. “Make the identity disappear” is not an adequate access-removal plan.

A **lifecycle state** is an identity's configured state used in identity and access behavior, such as an employment-related condition. A hidden identity is not simply a normal identity placed into a lifecycle state called “terminated.”

## Is deleting the HR record a good offboarding trigger?

An offboarding process must establish which access should stop, when it should stop, and how the external result will be confirmed.

Deleting HR data immediately can remove the authoritative input and profile context needed to reason about the person. It can also lead to a hidden identity with other accounts still attached.

A business process can instead retain an authoritative worker record with the appropriate employment status or end date while the configured identity and access processes handle the required changes. The actual design depends on the organization's source contract and approved retention rules.

That is a design choice to agree, not a universal requirement that every HR system keep records forever.

The key is to avoid replacing an explicit offboarding decision with an accidental absence from a feed. An empty file or active-workers-only query is not evidence that every omitted person's application access was removed.

Verify the authoritative facts, identity evaluation, required provisioning and actual target state separately. An ISC record's disappearance does not prove account disablement, permission removal or session termination in an external system.

## Investigate before choosing a recovery action

Start with the exact source and external account key. In the main example, `qd-57007` identifies the QueueDesk account; employee number `57007` identifies the person-related input. The HR account `wr-57007` is a different record.

Check whether the external account exists under the intended integration actor's visibility. Then compare the configured read scope, returned identifiers, file revision or page coverage, and the intended population.

In **Aggregation History**, inspect the relevant run's status, start and stop times, scanned counts and available warning details. A deletion warning is evidence to inspect, not an instruction to approve the proposed volume.

For QueueDesk, the supplied checks show:

The account exists externally. It is disabled. The active-only filter excluded it. The deletion-volume guard reported a problem. Devi's ISC representation is separately confirmed as retained.

The team approves restoring the agreed population selection. A later supported full read includes all 1,000 expected accounts, including `qd-57007`. No external account is created, enabled or deleted by that correction. The actor's required read permission, account keys and ownership association are unchanged.

That is a collection correction, not a request to re-enable Devi's disabled account.

If an account representation was already removed by mistake, establish the correct supported collection and ownership handling before reintroducing it. The documented **Remove Account** action removes the representation from ISC, not the external system; an existing external account can be represented again during a later full aggregation.

Do not promise that reaggregation restores the same ISC object identifier, every historical relationship, or the exact previous identity state. If authoritative identity deletion or hidden-identity handling has already occurred, review the actual identity/profile/account relationships and use the supported recovery path, involving SailPoint Support when necessary.

Preserve the original warning, affected identifiers and configuration evidence. Avoid repeated destructive retries while the cause or recovery consequences remain unclear.

## Work through the evidence

### 1. Fifteen percent missing, but the accounts still exist

QueueDesk returns 850 of the 1,000 agreed accounts after an active-only filter change. The other 150 accounts still exist externally and are disabled. The deletion safeguard cancels the run with a warning.

Should the administrator increase the limit from 10% to 20%?

**Worked reasoning:** No. The supplied evidence identifies an unintended population exclusion, not 150 external deletions. Raising the limit would not repair that cause. Restore the approved read scope through change review, inspect the affected ISC state, and verify the supported rerun. Do not assume a universal rollback from the canceled status.

### 2. Only five accounts are omitted

In an independent variation, five of 1,000 existing accounts are incorrectly omitted. The configured volume safeguard is 10%.

Does being below the limit establish that these five accounts should be removed?

**Worked reasoning:** No. Five is 0.5% of the comparison population, but volume is not truth. Inspect those identifiers, external existence, actor visibility and read scope. A safeguard can fail to catch a small but harmful coverage error.

### 3. The source has ten accounts

A ten-account source uses 1% as its deletion percentage. An engineer says, “That is more protective than 5%.”

What is missing from that reasoning?

**Worked reasoning:** One percent of ten is 0.1, which rounds to zero. The documented small-source limitation then cancels only at 100% deletion. Its ten-account 5% example rounds to one and cancels at one or more proposed deletions. Evaluate whole-account behavior; do not copy either value without reviewing the actual source and intended guard.

### 4. The delta result omits an unchanged account

A supported delta read contains three changed accounts. Devi's unchanged account does not appear. No deletion event for it was returned.

Should the engineer count it among deleted accounts?

**Worked reasoning:** No. Changes-only collection legitimately omits unchanged accounts. Establish connector-supported deletion evidence separately. Do not compare this response to the full population as if all absent records were missing from a complete read.

### 5. One HR profile disappears, but another remains

In a separate authoritative-source variation, the current HR account is genuinely removed and its ISC representation is deleted under the configured source handling. The person still has an account on another, lower-priority authoritative source.

Must the identity be deleted in the nightly job?

**Worked reasoning:** No. The documented alternative is reassignment to the remaining authoritative source's identity profile, with identity attribute recalculation from its mappings. Verify the selected profile and resulting values; do not assume the previous profile's data remains unchanged.

### 6. No HR account remains, but an application account does

The identity has no remaining authoritative account. An ordinary application account remains correlated to it.

Does the nightly identity-deletion attempt prove that application account was deleted externally?

**Worked reasoning:** No. A correlated account from another source is a documented deletion blocker. The identity can be retained as hidden, with remaining accounts attached but treated as uncorrelated. Verify the external account and required access-removal operation separately.

### 7. The emergency account is protected

An identity with no other authoritative source is marked as protected through supported configuration. An administrator proposes clearing that protection to make the cleanup job finish.

Is the job's cleanup goal enough justification?

**Worked reasoning:** No. Protection is a documented deletion blocker, not a processing defect to bypass. Review the emergency-access purpose, authorization, retention and accountable ownership. A different approved decision may be possible, but removal of protection is not justified merely by wanting a clean list.

### 8. Remove Account succeeds, but the application login still exists

An administrator removes a represented account using ISC's Remove Account action. The application team confirms that the external account still exists.

Did the operation necessarily fail?

**Worked reasoning:** No. The action removes ISC's representation, not the external record. A later full aggregation can represent an existing external account again. If the requirement was to disable or delete access externally, establish the separately supported, approved change and verify its target result.

## A project sends only active workers

A project proposes a nightly HR file containing only active workers. It will enable account deletion, keep a low percentage limit, and use “the person disappeared from ISC” as proof of successful offboarding.

Former workers can retain application accounts and open access-review responsibilities. No explicit external disablement evidence is included.

Would you approve that design? Explain what the team needs to agree before it can safely handle leavers.

**Worked reasoning:** No. The file's omission rule substitutes a population filter for an explicit employment and access-removal decision. The percentage guard checks volume, not the correctness of each omission, and small-population rounding must be considered.

Losing the authoritative account can cause profile reassignment, a nightly deletion attempt, or a hidden identity when dependencies block deletion. None of those outcomes alone proves that an external account is disabled or its permissions are removed.

Agree the authoritative worker/status/end-date contract and retention period, full versus changes-only file semantics, stable identifiers, identity-profile consequences, access-removal rules, target-operation support and permissions, deletion safeguards, responsibilities and outcome evidence.

An approved design may eventually remove retained data, but only after its retention and relationship consequences are understood. Confirm the required external result instead of using absence from the Identities page as the success criterion.

When an account is missing, ask what was read, what still exists, which object would be removed, and what that removal would actually accomplish.
