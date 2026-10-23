# Inactive in ISC. Inactive for which process?

Devi is on leave. An administrator cannot select her in the Request Center and concludes that ISC has stopped processing her identity.

Another administrator sees that her directory account is still enabled and concludes that her ISC identity must still be Active.

Both conclusions need more evidence.

In SailPoint Identity Security Cloud (ISC), **identity state** controls whether a person participates in particular ISC features and processes. It does not directly describe whether every account can sign in, and “Inactive” does not mean “excluded from every operation.”

The distinction becomes useful when a scheduled update, access-model change or account correction appears to have missed someone. Before repeating the operation, ask: which identity state applies, and does this particular operation include that state?

## Give each status its own meaning

Devi's employee number is 96006. Her ISC **identity** is the record representing her as a person. We will call it I-96006; this is a teaching label, not an actual ISC object ID.

Her correctly associated worker account is `pr-96006` on PeopleRegister Production. A **source** is ISC's configured representation of a system's account data. PeopleRegister is authoritative for these employees: its worker records establish and maintain their identities.

The Employees **identity profile** holds shared instructions for their identity values and lifecycle configuration.

A **lifecycle state** describes a business stage and connects it to configured access or account actions. The profile in this example has three enabled lifecycle states:

- employed, configured with identity state Active.
- leave, configured with identity state Inactive (short-term).
- retained, configured with identity state Inactive (long-term).

These are technical lifecycle names chosen for this fictional configuration. Their names do not automatically determine their identity-state settings.

An identity **mapping** selects or calculates a person-level value from available information. Here, the Lifecycle State mapping reads PeopleRegister workerStage: EMP selects employed, LEAVE selects leave, and EXIT selects retained. The business has approved these exact translations.

Devi already has a correctly associated WorkDirectory account, `wd-96006`. Its enabled or disabled status belongs to WorkDirectory.

Put the four kinds of information beside one another.

| Information | What it tells you here |
|---|---|
| PeopleRegister workerStage | The collected business input: EMP, LEAVE or EXIT. |
| Assigned ISC lifecycle state | The business-stage configuration selected for Devi: employed, leave or retained. |
| ISC identity state | Which participation setting applies through that lifecycle configuration. |
| WorkDirectory account status | Whether wd-96006 is enabled or disabled in that system at the time checked. |

An HR stage, an assigned lifecycle state and a target-account status are not alternative labels for one field.

We will also use **attribute synchronization**, or attribute sync: a configured process that updates selected fields on existing associated accounts to agree with identity values.

Identity employmentCode reads PeopleRegister employmentCode directly. On WorkDirectory, the existing workerCode account field is directly mapped from identity employmentCode in the Create Account definition and selected for ongoing attribute sync. The Create Account definition supplies account-creation instructions, but its direct mappings also determine which fields are eligible for this sync configuration. Attribute sync itself updates existing accounts; it does not create a missing account.

The source supports the required field update and account-disable operations, with provisioning enabled. **Provisioning** performs changes in connected systems. Supported operation capability is not a guarantee that the connection has permission to complete every attempt.

No account deletion, new account creation, access removal or new role assignment is part of Devi's example. Remove all access is not configured for these states, and retained grants no WorkDirectory access profile that would prevent its account-disable action. The tenant has roles implemented for other identities; that matters when we discuss its evening recurring population.

All records, configurations, observations and outcomes here are fictional. No real account or tenant is changed.

## Start with the three participation settings

**Active** is the broad participation setting for people joining or working in the organization. It allows participation in the features compared below, but does not bypass their other conditions.

For example, an Active identity being selectable as a recipient does not guarantee that a particular access item is requestable or that its approval will succeed.

An **access request** asks ISC to arrange particular access for a person. The **Request Center** is the place where a user selects a recipient and access to request. Whether a person appears as a recipient is separate from whether they already hold access.

**Inactive (short-term)** supports reduced participation while a person is temporarily away or moving through separation. It excludes the person from Request Center recipient selections and the manager's My Team member list, while retaining participation in the specified processing and synchronization paths below.

This explains why an employee can be absent from a request selection yet still receive a relevant scheduled reevaluation.

**Inactive (long-term)** excludes the person from more recurring and broad operations. It is not identity deletion and does not prevent every administrative correction.

The words short-term and long-term describe participation choices. They are not timers that automatically advance an identity after a fixed number of days. In our configuration, workerStage and the lifecycle mapping determine whether leave or retained applies.

The relationship is:

```text
PeopleRegister workerStage
  EMP   -> lifecycle employed -> Active
  LEAVE -> lifecycle leave
           -> Inactive (short-term)
  EXIT  -> lifecycle retained
           -> Inactive (long-term)

Lifecycle configuration also defines
  account actions and access requirements

Identity state -> participation rules
Account action -> provisioning outcome
Check the actual account separately
```

The arrows show configuration relationships, not a guaranteed backend execution sequence. The branch describing account actions is separate from the branch describing participation.

If a business wants directory accounts disabled during leave, it must configure and verify that requirement. Selecting Inactive (short-term) does not itself prove such a disable occurred.

## Use the rule for the operation you actually started

Here is the participation comparison relevant to everyday investigation.

**Aggregation** collects account data from a source into ISC. Identity-attribute promotion means using updated account information to update mapped values on the person record. For example, collected employmentCode EXIT-CORR can supply identity employmentCode EXIT-CORR. This is separate from writing that value to WorkDirectory.

| Operation or feature | Identity-state boundary |
|---|---|
| Request Center recipient selection and My Team member list | Active is included; both Inactive states are excluded. |
| Recurring identity processing and Apply Changes from role, access-profile or application lists | Active and Inactive (short-term) are included, subject to the process's other conditions; Inactive (long-term) is excluded. |
| Apply Changes from an identity profile, or Process Identity for selected identities | All three states are included within the chosen profile or selected scope. |
| Ordinary automatic attribute sync | Active and Inactive (short-term) participate. Long-term has the transition and manual exceptions explained below. |
| Identity-attribute promotion after updated accounts arrive through aggregation | All three states are included. Long-term does not mean mapped identity information is permanently frozen. |

An **access profile** bundles related access items from one source. A **role** groups access requirements and can assign them through configured criteria. Their list-page Apply Changes actions initiate broad reevaluation, not a change to one target account.

The identity-profile action has a different scope: identities associated with that profile. The selected-identity action explicitly chooses the identity or set.

Do not transfer the long-term exclusion from the role-list action to the profile action just because both involve identity processing. “We ran Apply Changes” is incomplete evidence until you know where it was initiated and whom it included.

Processing an included identity also does not guarantee changed results. A correct value or continuing assignment can stay the same.

### Scheduled inclusion still needs its other conditions

**Identity processing** reevaluates identity values and applicable relationships and access requirements. A scheduled job is one way to initiate it.

For recurring processing, the morning population requires an account on a source configured for attribute sync, in addition to Active or Inactive (short-term) state. The evening population includes those two states when the tenant has roles implemented; without roles, the profile's periodic-refresh requirement matters.

The recurring times are 08:00 and 20:00 in the tenant's configured time zone. They are queue times, not proof that a particular identity finished at that minute.

In our example, Devi's WorkDirectory account and established sync configuration satisfy the morning account condition. The tenant's implemented roles establish the evening roles condition. During short-term leave, her identity state does not exclude her from those recurring populations.

After retained assigns Inactive (long-term), those recurring populations no longer include her. Waiting for the next evening run is not a supported explanation of how a required correction will reach her through that excluded path.

That does not establish a failure of the scheduler. It identifies a selection boundary.

The separate per-identity Next Processing Date mechanism is not the recurring job itself. Do not infer its full state behavior from this recurring comparison or assume a timestamp bypasses an exclusion. Check the supported mechanism and actual result for the requirement at hand.

## Follow Devi through leave without inventing a disable

Initially, PeopleRegister workerStage is EMP and employmentCode is EMP. Devi's assigned lifecycle state is employed, identity state is Active, and wd-96006 is enabled with workerCode EMP.

The leave state has no account-enable or account-disable action. It is deliberately configured to preserve the directory account's enabled status during this approved leave.

After LEAVE is collected and relevant processing applies the new lifecycle assignment, Devi's identity state is Inactive (short-term). Her identity employmentCode is LEAVE.

A verified sync updates WorkDirectory workerCode to LEAVE. A fresh target check still shows wd-96006 enabled, exactly as this leave policy requires.

Can those results coexist? Yes. The request-selection restriction, continued processing eligibility, field update and enabled target account answer different questions.

Do not “repair” this case by setting her identity Active to restore request selection without reviewing the approved leave policy. That would alter participation beyond the account observation that prompted the investigation.

If someone expected the account to be disabled, compare that expectation with the actual approved lifecycle action configuration. A policy or configuration defect is different from a failed disable attempt. Here, no leave disable was configured or attempted.

## Long-term changes the recurring paths, not the need for evidence

Later, an approved exit changes workerStage and employmentCode to EXIT.

The retained lifecycle state is configured with identity state Inactive (long-term) and an action to disable accounts on the specific WorkDirectory source. The state does not grant a WorkDirectory access profile, and no source exclusion removes this account from the action's scope.

This is a configured target action as well as a participation change. They still need separate outcomes.

At the transition into Inactive (long-term), ISC performs a final attribute sync under the applicable configuration. That is distinct from continuing ordinary automatic synchronization afterward.

For this example, the final workerCode update succeeds, but the account-disable attempt fails because the connection lacks permission to disable the account.

The supplied observations on October 23, 2026, in UTC are:

```text
15:00 employed / Active
      wd-96006 enabled; workerCode EMP

15:12 leave / Inactive (short-term)
      workerCode LEAVE sync confirmed
      account enabled; no disable action

16:03 retained / Inactive (long-term)
      identity employmentCode EXIT

16:04 workerCode EXIT sync confirmed
      account-disable attempt failed

16:05 fresh WorkDirectory check
      wd-96006 enabled; workerCode EXIT
```

The earlier LEAVE and later EXIT inputs have been collected before their respective applied observations. These are supplied results, not measurements from a live tenant or a processing-time guarantee. The diagram records observation times; it does not require sync and disable operations to use that execution order in other runs.

At 16:05, Devi has the intended identity-state setting but not the intended account status. Calling the exit complete would hide the failed disable.

Do not conclude that the identity state must be Active because the account is enabled. The failed provisioning attempt explains why the two disagree with the intended account outcome.

Likewise, do not assume recurring processing will repeatedly enforce a lifecycle account-disable action. Lifecycle account actions are not persistent account-state enforcement. Investigate the failed operation and use the supported, approved recovery path.

A later successful operation or fresh target check would be needed to establish recovery. Neither the long-term label nor the successful workerCode write supplies that evidence.

## Correcting a long-term identity is still possible

Suppose PeopleRegister later corrects employmentCode from EXIT to EXIT-CORR while workerStage remains EXIT.

The updated account is collected and the applied identity employmentCode is independently verified as EXIT-CORR. The assigned lifecycle state remains retained and identity state remains Inactive (long-term).

This is consistent with identity-attribute promotion from updated accounts being available for all three states. It does not prove that every external field will follow automatically.

WorkDirectory workerCode is still EXIT at the latest supplied check. Ordinary automatic sync for long-term identities does not provide the continuing update path being assumed.

An administrator can initiate **Synchronize Attributes** for an individual identity, including a long-term inactive identity. This action evaluates the configured synchronization across that identity's accounts. It is not a request to recompute every identity value from HR first, and it is not restricted to one field merely because one mismatch prompted it.

Before using that action, verify the identity value, configured mappings, relevant accounts and expected effects. In this fictional example, an authorized manual synchronization later completes, and a fresh target check confirms workerCode EXIT-CORR on wd-96006.

The account-disable issue remains a separate open issue unless its recovery is also verified. A field update does not disable the account.

No temporary change to Active is needed to establish that supported manual-sync path. Changing identity state just to get an operation to include the person can also expose request selections or alter other participation, and does not repair the original failed permission.

## Explain an unexpected state before changing it

Identity state comes from the selected lifecycle configuration. Check the assigned lifecycle state and its actual Identity State setting, not only its name.

If there is no assigned lifecycle state, or the assigned lifecycle state has no configured identity state, ISC defaults the identity state to Active.

A lifecycle display label such as Archived therefore does not prove that Inactive (long-term) is in effect. An unset configuration is not the same thing as an explicitly selected long-term setting.

For a real discrepancy, trace the actual input, lifecycle mapping, assigned state and configured participation setting. A correct mapping Preview is useful, but it does not establish the applied assignment or every downstream action.

There is also a separate daily identity-data reconciliation job, SYNCHRONIZE_IDENTITIES, concerned with synchronizing identity data across services such as Search. Long-term inactive identities are excluded from it.

That job is not source-account attribute sync. Waiting for it cannot be used as evidence that workerCode will be written, a disable will be retried, or a long-term identity's search representation will be repaired by that job.

When a person is absent from a screen, identify that screen's purpose and selection rules. Absence from Request Center or My Team is not proof of identity deletion, loss of the manager relationship or deletion of the directory account.

## Work through the participation decisions

Use each variation independently.

### 1. Missing from Request Center, present in processing

**Facts:** Devi's applied identity state is Inactive (short-term). She has the configured sync-source account. An administrator cannot select her as a Request Center recipient.

**Reasoning:** Recipient exclusion is expected for that state. It does not exclude her from the qualifying morning recurring population. Check each operation's rule; do not treat one screen's absence as a universal processing stop.

### 2. An Active identity has no qualifying sync account

**Facts:** Another identity is Active but has no account on any source configured for attribute sync.

**Reasoning:** Active satisfies the state part of morning eligibility, not its account condition. The stated facts do not establish inclusion in that morning population. This is a selection issue, not proof that its mappings failed.

### 3. Broad role application misses long-term

**Facts:** Devi is Inactive (long-term). A role configuration changes, and an administrator starts Apply Changes from the role list.

**Reasoning:** That broad action excludes her state. Its completion does not establish her reevaluation. Investigate whether a supported selected or profile-scope processing action is appropriate and authorized. Do not switch her to Active merely to enlarge the broad action's population.

### 4. Profile application includes long-term

**Facts:** A reviewed Employees identity mapping changes. Devi remains associated with Employees and is Inactive (long-term). Apply Changes starts from that identity profile.

**Reasoning:** This path includes the profile's identities across all three states. Do not copy the role-list exclusion onto it. Inclusion is still not proof that a particular value changed or a target write succeeded; inspect the current result and any required delivery.

### 5. Inactive, but still enabled

**Facts:** The supplied 16:05 observation shows retained, Inactive (long-term), a failed disable attempt and enabled wd-96006.

**Reasoning:** Participation has changed; target disabling has not succeeded. Preserve the evidence and repair the supported operation through approved authorization. The enabled account does not disprove the identity state, and the identity state does not close the disable issue.

### 6. A later field correction remains unsynchronized

**Facts:** Current identity employmentCode is EXIT-CORR, state is long-term, and the latest target workerCode is EXIT. Only the original transition sync is verified.

**Reasoning:** The final transition sync does not imply ongoing automatic updates afterward. Verify the configured mapping and authorized manual Synchronize Attributes path, then its actual outcome. Do not assume changing identity state or processing again is required to resync the field.

### 7. The lifecycle label says Archived

**Facts:** A person's assigned lifecycle state displays as Archived, but its Identity State setting is unset.

**Reasoning:** The documented default is Active when the assigned state lacks a configured identity state. The label alone cannot establish long-term participation. Review the business-approved configuration and apply the appropriate correction; do not report a directory disable without its own evidence.

### 8. A request-selection search finds nobody

**Facts:** An administrator looks for Devi only in a Request Center recipient selection, finds no result and proposes recreating her identity.

**Reasoning:** That view excludes both Inactive states. Find the existing administrative identity and its source/account evidence before considering identity creation. The supplied absence proves neither deletion nor a missing authoritative worker record.

## Try a contractor correction

A contractor is in an enabled lifecycle state called Contract Ended, explicitly configured with Inactive (long-term). Their existing application account remains associated.

An approved correction to the contractor's identity email mapping is saved. Preview returns the correct email, but the applied identity email is still the old address. An administrator proposes running Apply Changes from the access-profile list, then waiting for automatic account attribute sync.

The application account's mail field is already configured for direct identity-email synchronization. No account creation is needed.

What is wrong with the proposed reasoning, and what evidence would you need before calling the correction complete?

The broad access-profile action excludes the contractor's long-term state. A supported identity-profile application or selected identity-processing action can include that state; choose an authorized scope after reviewing the configuration's effects.

First verify the correct applied identity email. A correct Preview does not supply it. Then treat the existing account's mail field as a separate synchronization requirement.

Long-term ordinary automatic sync is not the continuing delivery path to assume. Review and use the supported manual identity sync where appropriate, accounting for its configured account scope, then inspect the operation and fresh application-account value.

None of that requires pretending the contract is active. The correct business stage, participation setting and corrected account data can coexist.

When someone says “ISC did not process this inactive person,” ask which state, which operation, which selected population and which result they checked. Those details turn a vague status problem into a specific configuration, selection or delivery question.
