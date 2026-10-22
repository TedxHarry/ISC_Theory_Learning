# The account is on the right identity now. What did the manual correction actually fix?

Devi, employee `77007`, already has an employee identity in SailPoint Identity Security Cloud (ISC). Her document-review account has been collected into ISC, but it is not attached to her identity.

The application owner checks the account against the worker registry and confirms it belongs to her.

You can establish the correct relationship manually. But the account's missing person reference does not become correct just because you chose the right person.

That leaves two separate outcomes to follow: the account-to-identity relationship and the data that should have supported automatic matching.

Let's start with the records you are actually changing.

## Confirm the account and the intended person

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a connected system. An **attribute** is a named piece of information on either record.

A **source** is ISC's configured representation of a system or account-data collection.

In this fictional design, **StaffPath Production** is authoritative for Employees. Its worker accounts establish employee identities through the Employees **identity profile**, the shared configuration governing those identities and their attribute mappings.

StaffPath account `sp-77007` is already associated with Devi's identity. We'll call that identity `I-77007`, a teaching label rather than an actual ISC object ID.

An **identity attribute mapping** supplies an identity value from selected information or a calculation. Here the Employees mapping has already populated Identification Number, `identificationNumber`, with Devi's approved reference `P-77007`.

**ProjectSpace Production** represents the document-review application. It is not authoritative for establishing employee identities in this design.

**Account correlation** matches and associates source accounts with identities. A **correlation criterion** pairs an account attribute with an identity attribute. **Equals** compares the selected values.

An **uncorrelated account** is a collected account not associated with an authoritative identity. That describes an ISC relationship, not whether the external account has a legitimate business owner.

**Manual correlation** establishes a persistent explicit account-to-identity link. It does not require you to invent a matching source value to justify the choice.

Here is the supplied evidence before the correction:

| Record or decision | What has been established |
|---|---|
| Devi's identity `I-77007` | Applied, correlation-eligible `identificationNumber = P-77007`; identity `name = worker77007`; email `devi.rao@learn.example`; displayed name Devi Rao. |
| Another identity `I-77008` | `identificationNumber = P-77008`; identity `name = worker77008`; email `another.devi@learn.example`; also displayed as Devi Rao. It is a different person. |
| ProjectSpace account `ps-512` | Login `drao.ps`; `personRef = null`; already collected and evaluated; recorded uncorrelated. Null means no value is present in that field. |
| Selected account fields | Account ID uses the account key `ps-512`; Account Name uses `userLogin`, whose value is `drao.ps`. |
| Complete saved criterion | Account `personRef` Equals identity `identificationNumber`. No other configured criterion applies; no identity `name` matches `drao.ps`. |
| Approved ownership | Application records and the worker registry establish that `ps-512` is Devi's personal account, with approved person reference `P-77007`. |
| Approved immediate change | Associate this exact ProjectSpace Production account with existing identity `I-77007`; do not create another account or identity. |
| Separate data defect | The application's integration feed has omitted the required person reference. The data-owner investigation remains open. |

The two identities share a display name. Selecting the first “Devi Rao” is therefore not enough.

Check the intended identity's approved person reference, actual object reference and authoritative context. Check the source environment and account key too. An identically named account in a test source is not this production account.

The source's **account schema** defines its represented fields and the Account ID and Account Name designations. Those designations are not the same thing as a person's business reference.

The separate **default correlation** path compares the designated Account Name with identity `name`, case-insensitively, when configured correlation cannot establish an association. It is not configurable. Here `drao.ps` supplies no such match; the current uncorrelated result is supplied evidence, not a conclusion drawn from null alone.

`ps-512` identifies the application account. `P-77007` identifies its approved person in this design. `I-77007` is only our teaching label for the ISC identity.

Do not paste a teaching label or a guessed display name into a real correction file. Each supported interface has its own required identifiers.

## The correction changes a relationship, not the missing field

The supported account-management capability called **Update Correlation** lets an authorized operator select the account's classification and intended identity.

A **human account** is an account associated with a human identity. A **machine account** is a non-human account related to an application or service; it can include shared automation accounts. Do not classify a service account as someone's personal login simply to reduce the uncorrelated count. Use the features and responsibility model supported for that account and tenant.

For a personal employee account, the intended classification is Human and the target is the verified human identity. This is not choosing a new application permission.

The manual-correlation file process is another documented way to establish explicit account-to-identity associations. A file contains proposed relationship instructions; uploading it is not evidence that every row is correct or that every proposed change succeeded.

Whichever supported path is used, the logical instruction needs an exact account and an exact intended identity.

For our main example, the supplied approved correction succeeds. Current evidence shows `ps-512` associated with `I-77007`.

The account is still `ps-512`. Its login remains `drao.ps`. Its collected `personRef` remains null.

The configured comparison remains `personRef` Equals `identificationNumber`. Manual assignment did not replace the source's shared matching configuration.

```text
Before:
  ProjectSpace ps-512
  personRef = null
    -> no identity association

Human verifies approved owner:
  Devi, reference P-77007
    -> approved manual correction

Supplied result:
  same ps-512 -> existing I-77007
  same login drao.ps
  personRef still null
    -> relationship fixed
    -> feed defect remains open
```

The arrows separate ownership verification, the approved relationship change and the observed result. They are not an undocumented backend execution pipeline.

This correction does not create an employee identity, merge the two people named Devi Rao, rename the account or repair the integration feed.

If an uncorrelated report no longer lists `ps-512`, that is consistent with the new relationship. The report does not establish that its matching field is now populated or that all its access is approved.

## A manual link is not a temporary suggestion until the next read

**Account aggregation** reads account data into ISC.

In **optimized aggregation**, unchanged account records are skipped for relevant correlation evaluation. **Unoptimized aggregation** recalculates correlation logic even for unchanged account data.

Neither mode is an automatic release mechanism for a manual association.

The documented manual link persists even when source account data changes. Unoptimized aggregation does not remove that correlation.

Suppose an approved feed correction later supplies `personRef = P-77007` for `ps-512`. Once collected, that value agrees with the intended owner.

You have repaired an input while preserving the existing relationship. Agreement between the field and the link does not prove the link has converted into an ordinary automatic association.

Now consider a different variation. The same account is collected with `personRef = P-77008`, while independent owner evidence still supports Devi, `P-77007`.

Do not expect the persistent manual link to move automatically to the other identity. Investigate why the reference changed. It may be wrong, or the business ownership evidence may need an approved update.

A changed field and a changed legitimate owner are not interchangeable facts.

If the design requires removing or replacing explicit treatment, use the supported relationship-management process after reviewing ownership and consequences. Repeated reads and a changed criterion are not a substitute.

Accounts created through ISC can also have `manuallyCorrelated=true`. Here **true** is a Boolean yes/no value. That documented treatment can exist without a manual-correlation file upload, so file-import history alone cannot establish every link's origin.

## A wrong existing link needs more than a better-looking report

Consider a separate ProjectSpace account, `ps-513`.

It is manually linked to `I-77008`, but approved application records establish `I-77007` as the intended owner. Its current `personRef` is already the correct `P-77007`.

The account is correlated, but incorrectly. It may not appear in an uncorrelated report at all.

ISC's supported correlation-update capabilities cover incorrectly associated accounts, including errors originating in manual assignment or aggregation. The correction must target this exact relationship.

After an approved move, verify `ps-513` is associated with the intended identity and no longer associated with the wrong one. Check both identity contexts rather than inspecting only the destination.

Do not rewrite a correct person reference to agree with the wrong identity. That would damage the source evidence while hiding the association error.

Do not change the target identity's correct employee data to make the old link look valid.

The original cause also remains a separate question. Was the wrong person selected because names were duplicated? Was a correlation-file identifier misunderstood? Did unsuitable source data support an earlier automatic match?

Use retained configuration, actual records and available activity evidence to distinguish those explanations. Today's values do not reconstruct the full history by themselves.

## Repair the cause without losing sight of the immediate result

The main `ps-512` case has an approved owner and a verified new association. Its feed still needs repair.

Trace where the person reference should have come from, who owns that information, what the integration publishes and what ISC actually collects.

A correct value on the application screen is not automatically the value in the integration response or the represented ISC account.

If the missing input is instead on the identity side, follow the governing profile and its mapping. **Identity processing** evaluates identity attributes and configured access requirements. A mapping **Preview** evaluates a selected identity's mapping result; it does not prove the value is already applied.

The correction belongs at the proven defective layer.

For a large recurring population of uncorrelated accounts, review the correlation configuration and source data. Repeated manual assignment of each new account can conceal a common design problem.

There can be an approved reason to retain an explicit association. In that case, record its purpose, owner evidence and review conditions. Do not quietly treat it as self-correcting.

```text
Verified ps-512 -> I-77007
    -> association outcome established

Separate follow-up tracks:

Input repair:
  approve reference in the feed
  collect and verify account value
    -> check matching design

Persistent-link review:
  confirm why explicit link remains
  approve any later relationship change

Other effects:
  check operations using the link
  verify any external account changes
```

These are human follow-up tracks, not a promise that ISC performs them in that order or automatically fixes each one.

You can close the narrowly defined relationship task while keeping the data defect open, provided the approved acceptance criteria allow that distinction. You cannot close the feed defect merely because a different task succeeded.

## A relationship correction can have external consequences

An **entitlement** represents a permission or membership. Associating an existing account with an identity can change whose represented account and access ISC shows.

That is not the same as approving those permissions.

**Provisioning** attempts supported account or access changes in an external system. An **access request** asks for a particular access item for an identity; its approval and fulfillment are separate from choosing the correct owner of an existing account.

Manual correlation is not a replacement for those decisions.

**Attribute synchronization** is a configured identity-to-account write path for existing correlated accounts. It specifies which eligible account fields should follow mapped identity values.

Moving or correlating an account to an identity with different values can trigger that configured synchronization.

Suppose a separate wrong-link correction moves an account from a person whose department is `Support` to Devi, whose department is `Engineering`. If department synchronization is configured, the move can cause a department write to the external account.

If that write fails, the association can still be correct while delivery remains unresolved. If it succeeds, restoring an old correlation criterion does not automatically undo it.

Review mappings that use the account and other configured consumers of the relationship. Do not assume every manual correction is operationally isolated.

For the main `ps-512` example, attribute synchronization is not enabled and no access-change operation is supplied. The successful result is the relationship only.

A later account observation or sign-in test answers a different question from whether the approved identity now owns the represented account.

## Choose evidence for the outcome you are claiming

A submitted selection, an uploaded file and a smaller exception count are incomplete evidence for different reasons.

| Claim being checked | Evidence that addresses it |
|---|---|
| The operator selected the intended records | Approved source/environment/account key and target identity reference agree with the change instruction; duplicated names are disambiguated. |
| The explicit association changed correctly | Current account association shows the intended identity; a wrong-link move is checked in both old and new identity contexts. |
| A correlation-file operation completed | Import status and reported issues are reviewed, then the intended account results are reconciled individually; a badge alone does not establish owner correctness. |
| The missing reference was repaired | Approved input is delivered through the integration and appears on the actual collected account; the association alone is insufficient. |
| The shared matching design is suitable | Saved comparisons, actual account/identity inputs, eligibility and relevant evaluation support approved ownership across the intended population. |
| A dependent external write completed | Relevant provisioning activity and actual target state support the specific write; correct association is not delivery evidence. |
| The operational exception is resolved | Each approved acceptance condition is met, with unresolved data, ownership or consumer work explicitly retained. |

The source's Latest Manual Correlation summary and Manual Correlation aggregation-history filter concern file imports. An account-level update should be checked through its actual records and available relevant events; do not require every supported correction path to create a file-import entry.

Available identity events can show successful and failed actions. They are not a guaranteed complete transcript of every historical candidate comparison.

Keep observation times with the exact objects. Different views can reflect updates at different times, so reconcile the account and identity records before interpreting a display difference as another move.

## Do not confuse correcting a link with removing an account

Removing an account record from ISC and deleting the external account are different operations.

The documented **Remove Account** operation removes the account from ISC, not from the source system. A later full aggregation can bring the account back.

That is not a harmless synonym for “move this link.” It changes represented data and can have wider effects. Removing an authoritative account can affect the identity's profile or visibility.

**Delete Account**, where supported, concerns deletion from the external source and follows its configured request process, including any required approval.

Neither operation is justified merely because an account is on the wrong identity.

A source reset has a broader scope again: it removes the source's aggregated accounts and entitlements from ISC. It is not a routine cleanup for one mistaken relationship.

Choose the supported correction appropriate to the approved change. Do not erase records, delete identities or reset the source just to make an exception list smaller.

## Work through the changed evidence

### 1. Two identities have the same displayed name

**Facts:** Both `I-77007` and `I-77008` display Devi Rao. Approved worker-registry evidence identifies `P-77007` as the owner of `ps-512`.

Is selecting the first matching name enough?

**Reasoning:** No. Verify the identity's approved reference and actual object context, together with the source and account key. A display label does not distinguish these two people.

### 2. The account disappears from the uncorrelated report

**Facts:** After the approved manual correction, `ps-512` is linked to `I-77007`. Its collected `personRef` is still null.

Which issue has been demonstrated as fixed?

**Reasoning:** The intended association, not the missing input. Keep the feed defect open until approved delivery and the actual account value demonstrate its repair.

### 3. A later value points to the other person

**Facts:** A manually linked account remains approved for Devi. A later collected reference is `P-77008`, and an unoptimized aggregation runs.

Must the account move to `I-77008`?

**Reasoning:** No. Manual correlation persists. Investigate the changed reference and ownership evidence; do not use the new field or a broad reread as authority for an unapproved move.

### 4. A wrong link is corrected

**Facts:** `ps-513` was manually attached to `I-77008`. Approved correction moves it to `I-77007`; current evidence confirms the intended association and its absence from the former identity.

Does the earlier manual mistake make supported correction impossible?

**Reasoning:** No. Persistence prevents automatic reassignment from being assumed; it does not prohibit an approved explicit correction. Preserve the before/after evidence and investigate dependent effects and original cause.

### 5. The file import reports issues

**Facts:** A manual-correlation file contains 12 intended corrections. The upload summary reports issues, and no account-by-account reconciliation has occurred.

Can the team mark all 12 complete?

**Reasoning:** No. Review the reported issues and verify each intended relationship. Keep unverified rows open; neither submission nor a single summary supplies all individual outcomes or proves ownership.

### 6. Someone suggests Remove Account

**Facts:** The external account is legitimate and should remain. Only its ISC relationship is wrong.

Is Remove Account simply another name for moving it?

**Reasoning:** No. It removes the represented account from ISC, not just a relationship selection, and is distinct from external deletion. Assess the supported relationship correction rather than substituting a broader operation.

### 7. The link is correct but synchronization failed

**Facts:** A separate approved move establishes the right association. A configured department-sync write is attempted and fails; the target still has the previous value.

Has the association necessarily failed too?

**Reasoning:** No. Relationship success and write success are separate outcomes. Keep delivery unresolved, investigate its actual failure and verify any approved recovery against target state.

### 8. The owner is not yet verified

**Facts:** An account's person reference is missing. No application or worker-registry evidence identifies its intended owner. Someone suggests assigning it to the source administrator.

Should you make that personal assignment to close the case?

**Reasoning:** No. Source administration is not account ownership. Keep the ownership question open and establish the account's use and supported classification before approving a relationship change.

## Review a proposed correction file as an engineer

A project proposes 80 correction rows: 40 verified uncorrelated personal accounts, 10 known wrong links, 15 records without verified owners, 5 shared automation accounts and 10 duplicate or contradictory proposed rows.

These are proposed rows, not necessarily 80 distinct accounts.

The team wants to upload the whole file and close the issue when the count falls.

How would you separate the work?

The 40 verified personal-account cases can proceed only after exact record selection, approval, persistence and dependent-effect checks. The 10 wrong links also need old/new relationship evidence and investigation of consequences already produced.

The 15 unknown-owner rows need ownership evidence before assignment. The 5 automation accounts need appropriate classification and responsibility, not a guessed employee.

The 10 duplicate or contradictory rows need reconciliation by actual account and intended identity. Do not assume file order means the last row is the approved answer.

Establish the supported file contract and identifier requirements before preparing a real import. Preserve the approved change set and reconcile actual results against it.

Then keep association completion, root-cause repair and dependent delivery as separate acceptance conditions. An authorized manual correction can be the right immediate action without being the whole solution.
