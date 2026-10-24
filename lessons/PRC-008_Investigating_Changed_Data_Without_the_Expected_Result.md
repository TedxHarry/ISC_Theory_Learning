# The data changed. Where did the expected result stop?

Devi's office changes from Leeds to Bristol. Her worker account in SailPoint Identity Security Cloud (ISC) contains Bristol, but her identity still shows Leeds and the directory group she needs is missing.

The support ticket says, “Aggregation completed. Processing was tried. Nothing happened.”

That description joins several different questions.

**Aggregation** collects account data into ISC. **Identity processing** reevaluates person-level information and applicable relationships and access requirements. **Provisioning** performs required changes in connected systems.

Completing one does not prove that every later result is correct. Equally, an unchanged result does not prove that processing never ran.

Let's establish the exact requirement, then use the evidence to find where the expectation stops matching the actual outcome.

## Make “the expected result” specific

Devi's employee number is 98008. Her ISC **identity** is the record representing her as a person. We will call it I-98008; that is a teaching label, not an actual ISC object ID.

Her worker account `pp-98008` on PeopleRecord Production is correctly associated with that identity. A **source** is ISC's configured representation of a system's account data. PeopleRecord is authoritative for this employee population: its worker records establish and maintain the related identities.

The Employees **identity profile** holds the shared configuration for their person-level information.

An **account attribute** is a field on an account; an **identity attribute** is a field on the person record. A **mapping** specifies where an identity value comes from.

The business-approved location input is PeopleRecord currentOffice. The source also retains legacyOffice for historical information. The two fields must not be treated as interchangeable.

Identity workerType reads the account's workerType directly and currently contains EMP.

An enabled automatic **role**, Bristol Workspace, groups the required access and assigns it when both conditions are true:

- Identity location equals Bristol.
- Identity workerType equals EMP.

Both conditions are joined with AND. A Bristol location alone is not the whole requirement.

The role contains enabled Bristol Tools, an **access profile** that bundles access from OfficeDirectory. It requires the ordinary group membership `BR-WORK`. That group membership is the **entitlement**, the access item governed in ISC.

Devi has two correctly associated OfficeDirectory accounts:

- `od-98008`, with account field type equal to Primary.
- `oda-98008`, with type equal to Admin.

Bristol Tools has automatic multiple-account selection configured to choose the account whose type equals Primary. Exactly one of Devi's accounts matches. The BR-WORK requirement is therefore for od-98008, not for both accounts.

The source supports group addition and has provisioning enabled. This is standing access, with no separate activation step. Both accounts initially lack BR-WORK.

Devi's **identity state**, the setting controlling participation in particular ISC processes, is Active. No account creation, ongoing identity-to-account field synchronization or old-office access removal is in scope. Configuration changes are limited to the reviewed mapping correction and connection-permission recovery. We are investigating this new group requirement, not declaring an entire employee move complete.

All records, times, actions and results below are fictional. No real tenant or account is changed.

## Preserve the evidence before changing the configuration

A useful starting record contains the identity, source account, exact fields, expected value, actual value, relevant configuration and observation times.

Include the job or activity reference when one exists. Different systems can have different references; do not invent one universal transaction identifier.

Here are the initial observations on October 23, 2026. All times are UTC, a shared time reference.

At 18:00, the approved PeopleRecord worker record has currentOffice Bristol and legacyOffice Leeds. At 18:05, collection has brought those exact values into pp-98008 in ISC.

At 18:06, a selected **Process Identity** operation for Devi has completed. This is an administrator-initiated reevaluation of the selected identity. Her current identity location remains Leeds, workerType remains EMP, and Bristol Workspace is not assigned.

What have these observations actually established?

| Observation | What it establishes, and what it does not |
|---|---|
| The producer record has currentOffice Bristol | The approved input exists there. By itself, it does not prove ISC collected it. |
| ISC account pp-98008 has currentOffice Bristol | Collection reached this account. It does not tell us which field the identity mapping selects. |
| Selected Process Identity completed | This selected reevaluation occurred. Its completion does not prove the configured value or resulting access is correct. |
| Identity location is Leeds | The applied value is still Leeds. We need the actual mapping and selected input before naming the cause. |

There is no reason yet to alter the producer's correct Bristol value. There is also no reason to assume a connector outage merely because the group is absent.

A **connector** is the integration that communicates with a source system. A successful read and a successful group write require different evidence.

## Test whether ISC used the value you expected

Open the saved Employees location mapping and inspect its selected source and field.

In this case, it reads PeopleRecord legacyOffice directly.

That explains the result. The collected account contains both values, but the mapping tells ISC to use Leeds.

```text
Collected account pp-98008
  currentOffice: Bristol  (approved input)
  legacyOffice: Leeds     (historical)

Saved location mapping
  selects legacyOffice -> identity Leeds

Approved correction
  selects currentOffice -> Bristol
  Preview result is not application proof
  Verify current identity after processing
```

The arrows show configured input selection and the evidence needed after correction. They do not describe a private backend job order.

We have a supported explanation for an unchanged result after processing: the process used an inappropriate configured input. Repeating it with the same available data and mapping does not repair that selection.

No transform is needed. A **transform** calculates or prepares a value. Adding one to trim or change case would not fix reading the wrong field.

Do not turn every mismatch into a calculation problem before inspecting the direct mapping.

The conclusion is narrower than “ISC processing is broken.” The saved mapping selects historical information where the approved requirement calls for current information.

That distinction determines the correction and the people who need to review it.

## Apply the correction without losing sight of its scope

The mapping is shared by identities associated with Employees. Before applying a change, review who uses it, the relevant available inputs, and the access consequences.

A successful result for Devi would not prove that every other employee has currentOffice populated correctly. Nor does selecting one identity create a private configuration version that other relevant processing cannot use.

In this fictional case, the appropriate owners approve the direct mapping correction and its access consequences. The affected profile population has been reviewed; broader application and its separate validation are tracked outside this selected investigation.

At 18:10, the corrected mapping is saved. It now selects currentOffice.

At 18:11, **Preview**, which evaluates mappings for a selected identity, returns Bristol. A separate current-identity check still shows Leeds.

Save establishes the stored instruction. Preview establishes a selected evaluation. Neither observation alone establishes the applied result.

The authorized selected Process Identity operation starts at 18:12. At 18:15, its completion and the current identity results are verified: location Bristol and workerType EMP. Bristol Workspace is now assigned.

Those results agree with both configured role conditions. We have crossed the identity-value and role-assignment boundaries.

We have not yet established BR-WORK membership on od-98008.

Manual application is not harmless just because it is useful. Its relevant mappings and access requirements can have wider effects than the single field motivating the investigation. Choose a supported, authorized scope and verify the actual affected results.

## Follow the requirement to the intended account

A person can qualify for a role while delivery to an account is incomplete.

The access profile's multiple-account selection tells us which account should receive the membership for this automatic grant.

```text
Bristol Workspace assigned
  -> Bristol Tools access profile
  -> OfficeDirectory group BR-WORK

Automatic account selection: type Primary
  od-98008  / Primary -> selected
  oda-98008 / Admin   -> not selected

18:17 selected-account add failed
18:18 od-98008 checked: BR-WORK absent
After approved delivery recovery
18:35 od-98008 present; oda-98008 absent
```

The arrows describe the configured access relationship and selected account. The times are supplied observations, not a required provisioning sequence or a duration guarantee.

At 18:17, the activity for adding BR-WORK to od-98008 reports an insufficient-permission error. At 18:18, fresh target checks show BR-WORK absent on both accounts.

The primary account's missing membership is now explained by a confirmed failed delivery attempt. The administrator account's absence is consistent with the selection policy.

Do not change the role condition back to Leeds to make the missing group look expected. Bristol is the approved business fact, and the role has qualified correctly.

Do not add the group to the administrator account merely because it is another account associated with Devi. That would change the access requirement instead of satisfying it.

Operation capability and runtime permission are different checks. The source can support adding groups while the connection lacks the authority required for this particular addition.

Inspect the specific identity, source, account, group, action and error. A broad “provisioning finished” description cannot replace that evidence.

## Keep a delayed view separate from a failed write

**Search** provides a searchable representation of identity and access information. It is not a live query of every connected directory.

At 18:16, Search still displays Leeds for Devi, although her current identity location was verified as Bristol at 18:15.

At 18:24, Search displays Bristol.

The independent current-identity observation establishes the distinction: the view was behind the already-applied value.

That delayed view did not cause the permission failure on BR-WORK. Waiting for Search to show Bristol would not authorize the connection to add the group.

Conversely, correcting the connection permission does not by itself prove that Search has updated.

When views disagree, compare the same identity, actual query, filters and observation times. Do not diagnose visibility delay from one old result when the current identity value has not been checked.

A historical account report is also not a current target observation. Opening an old report now does not make its data current.

## Confirm recovery at the boundary that failed

The approved recovery addresses the connection permission and the failed BR-WORK delivery through the supported operational process.

We do not assume that another identity-processing run retries every failed provisioning item. Recovery behavior depends on the operation and error; a changed mapping is not a universal repair for delivery.

In the supplied later evidence, the connection issue is corrected through the approved process, and the specific group-add recovery completes at 18:34.

At 18:35, fresh target checks confirm BR-WORK present on od-98008 and absent on oda-98008. The intended role remains assigned.

Now we can report that this account-level requirement was delivered to the selected account. We cannot extend that claim to unrelated accounts, previous-office cleanup or every employee affected by the shared mapping.

Separate the findings in the case record.

| Finding | Correction or acceptance evidence |
|---|---|
| Identity mapping selected legacyOffice | Approved currentOffice mapping saved; selected processing produced verified Bristol. |
| Bristol Workspace was initially absent | Current Bristol and EMP satisfy both conditions; actual role assignment verified at 18:15. |
| BR-WORK addition failed on the primary account | Approved permission/recovery process; specific completion and fresh primary membership at 18:35. |
| Search temporarily showed Leeds | Current identity was independently Bristol; same Search result showed Bristol at 18:24. |

There were different boundaries in one ticket. Finding the mapping defect did not establish that it was the only issue.

## Use a result to narrow the next question

You do not need to restart the whole investigation after every observation.

If the correct input is not collected, investigate collection and selection before recalculating. If it is collected but not selected, investigate the mapping. If the expected mapped value is only a Preview, application remains unverified.

If the current value is right but the role does not qualify, inspect every configured condition and whether the role and profile are enabled. Do not silently replace an AND with one convenient matching condition.

If the role is assigned, inspect the required source access and account-selection path. Then inspect the specific delivery result and fresh target state.

These are diagnostic dependencies, not a claim that every ISC process executes as one universal sequence.

A job that is queued has not necessarily begun. A running job has not necessarily reached the identity. A completed job has only crossed its own documented boundary. Record which one you actually observed.

When a clock-dependent calculation is involved, verify its evaluation time and supported processing path as well as its input. The arrival of a date does not update every stored value without the relevant processing.

When **lifecycle state**, the configured business stage that can drive account and access actions, affects the requirement, inspect the selected state and its actual enabled configuration. A familiar label is not proof of an account action.

For a manager issue, **manager correlation** resolves an employee's reference to another person's identity. A correct reference value is not proof that the intended manager identity exists with the matching candidate value. Inspect both the Manager Name mapping and the source's manager-correlation configuration.

Do not force these different mechanisms into a generic “refresh failed” diagnosis.

## Missing evidence is not a failed outcome

Suppose you have a correct role assignment but cannot find a provisioning activity in the first search.

That is an evidence gap. Verify the source, account, operation, time range, status filters and view coverage. Also check whether the required access already exists or whether account selection prevented delivery.

A failed attempt needs operation-level evidence. A fresh target state can establish that the requirement remains unmet without telling you whether delivery failed, is waiting, or was never initiated. Absence from one search is not enough to identify its cause.

Likewise, a correct unchanged value or an already-present group does not require a new visible write just to prove processing worked.

Record what remains unknown. That is more useful than turning uncertainty into an invented error.

Avoid broad corrective actions while the actual failure boundary is unknown. A full aggregation, broad application or direct grant can affect other people and obscure which change caused the later outcome.

If an urgent access or security requirement is at risk, preserve the evidence and use the approved escalation or recovery path. Urgency changes the handling priority; it does not make an unsupported assumption true.

## Work through the alternatives

Each variation changes only its supplied facts.

### 1. The producer changed, but the selected account did not

**Facts:** PeopleRecord has currentOffice Bristol, but ISC account pp-98008 still contains currentOffice Leeds. The identity mapping correctly selects currentOffice.

**Reasoning:** Investigate collection scope, freshness and exact-account selection first. Processing available Leeds data cannot establish Bristol. Do not change a correct mapping to compensate for an input that never arrived.

### 2. Processing completed with the legacy mapping

**Facts:** Account currentOffice Bristol and legacyOffice Leeds are collected. The saved mapping selects legacyOffice. Selected processing completes and the current identity remains Leeds.

**Reasoning:** The result agrees with the configured input but conflicts with the approved current-office requirement. The evidence identifies a mapping defect, not proof that processing failed to run. Repetition without correction does not address the cause.

### 3. Only Preview is correct

**Facts:** The corrected mapping is saved, Preview returns Bristol, and the current identity still shows Leeds. No later relevant application is verified.

**Reasoning:** The proposed calculation works for that selected evaluation. The applied result remains unverified. Use an appropriate supported application path and current-result evidence rather than claiming the role or group was delivered.

### 4. One role condition is false

**Facts:** The current identity location is Bristol, but workerType is CONT rather than EMP. The enabled Bristol Workspace role still requires Bristol AND EMP.

**Reasoning:** The role does not qualify through these criteria. Missing assignment can be correct. Confirm whether the policy or worker data is wrong before proposing a change; a matching location alone does not justify removing the employee-type condition.

### 5. The broad action excludes the identity

**Facts:** In a separate case, an identity is Inactive (long-term), and Apply Changes is started from the access-profile list after a shared configuration change.

**Reasoning:** That broad action excludes long-term inactive identities. Its completion does not prove this person's reevaluation. Profile-associated application and selected identity processing have different supported scope. Review an appropriate authorized path instead of changing the business participation state just to force inclusion.

### 6. The value and role are right, but delivery failed

**Facts:** Bristol and EMP are applied, Bristol Workspace is assigned, and the exact BR-WORK addition to od-98008 reports insufficient permission.

**Reasoning:** Investigate the operation and approved permission/recovery path. An unchanged Search result or another mapping Preview cannot repair that write. Verify the target outcome after recovery rather than closing the case from the role assignment alone.

### 7. No activity appears in the initial search

**Facts:** The role is assigned. One search returns no group-add activity. No fresh target membership check is supplied.

**Reasoning:** The cause remains unknown. Verify query coverage, account selection, actual existing membership and relevant operation evidence. Do not assert a failed write or guaranteed absence merely because one search returned nothing.

### 8. The group is on the other account

**Facts:** A fresh check finds BR-WORK on oda-98008 but absent on od-98008. The automatic access profile still selects type Primary.

**Reasoning:** The intended primary-account requirement remains unmet. The administrator account's membership does not prove correct delivery, and its origin must be investigated separately. Do not remove or copy access without reviewing authorization, other requirements and the actual cause.

## Try a manager correction

An employee's collected HR manager reference changes from 71001 to non-null 71002. Only this source/profile supplies the manager. Its Manager Name mapping and source manager-correlation configuration select the intended reference and compare it with managers' identificationNumber identity values.

The employee already has resolved manager 71001. No identity currently has identificationNumber 71002. Relevant selected identity processing has completed, but the current resolved manager remains 71001.

A colleague proposes repeating processing until the relationship changes.

Which explanation fits the supplied facts, and what would a useful correction need to address?

The documented behavior retains an existing manager when a changed non-null reference cannot correlate to a new manager. The supplied result is therefore consistent with the missing candidate.

Check whether 71002 is the approved reference and whether the intended manager's identity should exist with the required applied identifier. Correct the verified data or candidate-availability issue through the supported process, then verify actual relationship resolution.

Do not create a guessed manager or assume that a changed reference must clear the existing relationship. A change to null has different documented behavior.

If an approval already exists, its recorded recipient and handling are another question. A corrected current manager relationship alone would not prove that earlier work was rerouted.

For Devi's office issue, the final explanation should be equally specific: collection brought the right current field into ISC; the old mapping selected historical data; applying the approved correction established Bristol and the qualifying role; a separate permission failure blocked BR-WORK; recovery was verified on the primary account. Search caught up independently.

That explanation identifies what happened, why it happened, and which evidence supports the completed requirement.
