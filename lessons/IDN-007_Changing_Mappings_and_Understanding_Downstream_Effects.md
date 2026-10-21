# The mapping is correct. What else will change?

Devi, employee number `67007`, works in Engineering. Her Human Resources (HR) record uses department code `ENG`. Her directory account uses the label `Engineering`.

SailPoint Identity Security Cloud (ISC) currently takes Department from the directory. The team wants to use HR's approved code instead.

A preview shows `ENG`. That is the desired new identity value.

But an automatic access condition still expects `Engineering`, and the directory is configured to receive Department updates from ISC. Changing one mapping can therefore affect access decisions and the very account that supplied the old value.

Let's follow those dependencies before treating the preview as a completed change.

## Identify what is being changed

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a particular connected system.

A **source** is ISC's configured representation of a system or account-data collection. Its **connector** provides the supported integration behavior. **Account aggregation** reads account information into ISC.

An **attribute** is a named piece of information. An account attribute belongs to a source account; an identity attribute belongs to the ISC identity.

An **identity profile** is shared configuration governing a population of identities, including their identity attribute mappings. An **authoritative source** supplies accounts used to establish identities through that profile.

An **identity attribute mapping** selects or calculates the value for an identity field. Editing it changes how ISC derives that value. It does not edit the HR record directly.

In this fictional example, **WorkforceHub Production** is authoritative for Employees. Devi's worker account is `wf-67007`. Her Corporate Directory account is `cd-67007`.

Both accounts are already correctly associated with Devi's one ISC identity. **Account correlation** establishes that ownership relationship using configured account-to-identity comparisons. We are changing an attribute input, not repairing account ownership or moving Devi to another identity profile.

Here are the selected inputs and configuration:

| Item | Supplied current state or proposal |
|---|---|
| WorkforceHub account `wf-67007` | `departmentCode = ENG`, the approved employment department code. |
| Corporate Directory account `cd-67007` | `department = Engineering`, the existing descriptive label. |
| Employees' current Department mapping | Reads Corporate Directory `department`; the applied identity value is `Engineering`. |
| Proposed Department mapping | Reads WorkforceHub `departmentCode`; expected identity output is `ENG`. |
| Engineering Worker role | Automatically assigned when identity Department equals `Engineering`. |
| Corporate Directory attribute synchronization | Enabled for account `department`, directly mapped from identity Department in its Create Account definition. |

Engineering and `ENG` mean the same department under this example's business agreement. They are not the same text value.

The intended new representation must be agreed with the owners of the processes that use it. “HR approved the code” does not establish that every existing comparison, report and receiving system understands that code.

## Find the readers and the writers

A **consumer** is a process or system using a value. A **dependency** means that its result relies on that value or on the configuration producing it.

A **role** groups access requirements and can be assigned through configured membership criteria. An **access profile** bundles entitlements on one source; an **entitlement** is a represented permission or membership. Roles can include access profiles and direct entitlements.

**Provisioning** attempts supported account or access changes in connected systems. The **target system** is the external system receiving the attempted change.

When an automatically assigned role no longer matches its criteria, ISC reevaluates that assignment and its associated access. The resulting provisioning work and actual target outcome must be checked separately.

**Attribute synchronization** is a configured identity-to-account write path. It keeps selected account attributes aligned with mapped identity values. It is not account aggregation in reverse for every field, and it is not automatically enabled just because two fields have the same name.

For the selected directory field, the example explicitly supplies the required direct mapping in the source's Create Account definition and an existing correlated account. A **Create Account definition** specifies how account fields are populated when an account is created; attribute sync uses eligible direct identity mappings from that definition for ongoing synchronization.

This creates two separate paths from Department:

```text
Proposed identity Department = ENG
  |
  +-> Engineering Worker role condition
  |     still expects Engineering
  |       -> criterion no longer matches
  |       -> reassess role/access assignment
  |
  +-> configured directory attribute sync
        identity Department -> department
          -> attempt target value ENG

Human checks:
  intended role membership and access?
  approved directory format and result?
```

This map shows the risk if the proposed mapping is used while the role condition remains unchanged. It does not show a completed rollout or a fixed order between role processing and synchronization.

The role and sync branches are separate consumers. One can succeed while another fails. The diagram's human checks do not run as automatic extra processing stages.

A change in representation can remove a match even when the person's actual job did not change. The role's condition compares the configured value; it doesn't infer that `ENG` is another name for Engineering.

## Look beyond the field you opened

The Department change affects all identities governed by Employees whose evaluated output changes, not just the identity selected for preview. Establish the actual governing profile and account associations when determining that population.

Also inspect calculations that reuse Department. A **transform** is a configured calculation or lookup used to produce a value. One transform may use another through a **Reference transform**, which reuses an existing transform's logic.

If you modify reused logic rather than one profile's input selection, the impact can extend to other fields and profiles using that reference. Inspect the saved definitions and actual references; matching display names do not prove that two mappings share the same executable definition.

Changing a mapping, removing a mapping and deleting an attribute definition are different operations. A custom identity attribute is an additional field defined for the tenant; its definition is shared across profiles. Deleting that definition is not a safe way to stop one profile from using it.

For each changed input or output, establish:

- Which identities and associated accounts supply the data.
- Which mapping or reused calculation changes.
- Which calculated identity fields read the result.
- Which role conditions, lifecycle logic, manager relationships or external writers depend on those fields.
- Which reports, integrations or notifications interpret the value.

This is a dependency review, not a claim that every mapping change triggers every item in the list.

If Department has no role dependency in another project, don't invent one. If it has an external writer that isn't visible on the profile screen, don't ignore it.

## Manager and lifecycle changes need their own reasoning

**Manager correlation** links an employee's identity to the identity of their manager. It uses configured source-account and identity information to establish that relationship.

A proposed mapping might show a manager identifier or name while the resulting relationship still needs separate checking. Manager correlation requires the relevant profile mapping and source correlation configuration; a new-looking display value is not proof that approvals will reach the intended manager.

If a manager input changes, compare its meaning with the field used to identify the manager. An employee number and a directory account identifier are not interchangeable merely because both identify someone.

**Null** means no value is present. Do not assume an unmatchable new manager input always clears the previous manager. The documented behavior can retain the existing manager when a changed non-null account value cannot correlate; a value changing to null has a different outcome. Inspect the actual relationship.

A **lifecycle state (LCS)** describes a stage such as active employment or termination, with configured access and account actions in the identity profile. The mapped lifecycle value uses the state's technical name, and the relevant state must be enabled.

Changing the input used to calculate a start date, end date or lifecycle value can change which actions are required. A date-format error is therefore more than a display defect when it feeds that calculation.

In Devi's main example, the supplied lifecycle result remains `active`, and her manager relationship is unchanged. We are not claiming that a Department edit automatically changes either of them.

The point is to identify actual dependencies and verify expected unchanged results as well as expected changes.

## Preview checks a calculation, not the whole change

**Preview** evaluates mapping results for a selected identity. It helps you inspect whether Employees would produce `ENG` from Devi's collected WorkforceHub account.

It does not prove that:

- Every employee has a usable `departmentCode`.
- The selected account is correct for someone with multiple accounts.
- The Engineering Worker role still matches.
- The directory accepted a write.
- A manager relationship, lifecycle action or external report is correct.

Check the inputs behind the preview. If WorkforceHub has not published a transfer yet, or ISC has not collected it, a successful calculation can still use old data.

For multiple-account cases, inspect the lookup's account selection and null handling rather than assuming the newest or most familiar account supplies the value.

An empty string or a literal `unknown` is different from null and does not become an approved department because a preview displays something.

Include those changed conditions in the test set. A sample should test the assumptions that can fail, not just repeat the easiest successful employee.

For this proposal, useful sample cases include:

| Sample condition | Expected reasoning or check |
|---|---|
| Engineering employee with current HR code `ENG` | Preview produces `ENG`; intended Engineering access remains after the coordinated consumer change. |
| Operations employee with HR code `OPS` | Must not gain Engineering access under the revised condition. |
| Missing or future-dated HR department | Identify the intended current value and approved missing-value behavior; do not silently treat a future fact as current. |
| Employee with multiple relevant source accounts | Confirm the intended account actually supplies the code. |
| Identity governed by another profile | Establish whether its mapping and any reused logic are affected; don't assume it belongs to Employees' processing scope. |
| Employee with an admin directory account as well | Inspect all correlated directory accounts that attribute sync can update, not just the ordinary account shown in one preview. |

The conditions in this table are a test design, not a built-in ISC test mode or a claim that these people were tested in a tenant.

## Coordinate the change before broad processing

For the main proposal, suppose the owners approve codes for identity Department and for the receiving directory field. They also approve changing the Engineering Worker condition to use `ENG`.

That is a coordinated change to input agreements, mappings and consumers where needed. It is not permission to replace a directory label with a code in every organization.

Compare the previous and intended configurations, record the affected population and capture the expected changes. Preserve the exact old mapping and relevant consumer definitions, not just a screenshot showing the field's name.

Check existing and expected role membership, selected account values, required identity attributes and external account state. User Name, Work Email and Last Name still need valid mapped values; User Name must remain unique across identities.

Choose an approved validation environment or controlled scope supported by the actual configuration. Previewing one identity is not a safe canary deployment. A **canary** is a deliberately limited real rollout used to observe effects before extending a change.

**Identity processing** reevaluates identity values and configured access requirements. It can update mapped attributes, evaluate manager relationships, lifecycle-related requirements and role membership.

Processing selected identities can limit the scope of that particular processing request. It does not make the saved shared mapping private to those identities, pause other processing or prove unrelated activity cannot use the new configuration.

Plan the transition period too. If the role condition changes to `ENG` while some identities still hold `Engineering`, those identities may not meet the revised condition until their values are updated.

A temporary condition accepting both representations is a design option only if the owners approve it and tests establish the intended population. Leaving both values accepted indefinitely can conceal data defects. Don't assume several saved configuration changes take effect together as one indivisible change.

Arrange the mapping and consumer changes with the appropriate processing and verification scope. Avoid repeatedly processing a half-finished design just because each individual edit saved successfully.

## Save, process and verify are different boundaries

Saving a mapping persists configuration. It does not establish that every affected identity now holds the new value.

**Apply Changes** on an identity profile initiates processing for identities associated with that profile. The role list's Apply Changes has a different documented population scope, covering Active and Inactive (short-term) identities. Those identity states affect participation in services and processing; they are not interchangeable with a source account's enabled flag.

Choose processing scope based on the configurations and identities affected. Don't assume that processing only Employees also validates every other profile affected by a reused transform or a shared role edit.

Account aggregation and identity processing are different operations. Aggregation reads source data; processing evaluates the data and configuration available in ISC. Reprocessing an old account value doesn't fetch a corrected HR export.

Changes during aggregation and scheduled processing can also evaluate identities. Do not treat “I haven't pressed Apply Changes yet” as proof that a saved configuration is isolated from all other activity.

In the interface, Preview displays a selected calculation; the identity's current details show applied represented values. Active Jobs and processing audit records help establish execution. Provisioning Activity and account activity details help establish attempted external changes, results and errors.

The target system and relevant application evidence establish what actually changed outside ISC. Search and reports can reflect a different observation time, so compare the exact identity, account, execution and data timestamps.

There is no single green status that proves all these boundaries.

## A successful identity update can coexist with a failed write

Here is a supplied fictional result after the coordinated code change, with appropriate processing completed:

- Devi's current identity Department is `ENG`.
- The updated Engineering Worker condition uses `ENG`, and her role assignment remains correct.
- Her manager and `active` lifecycle result remain unchanged.
- A directory update to `department = ENG` was attempted, but the target denied that write.
- Direct directory evidence still shows `Engineering` on `cd-67007`.

The mapping and role observations are successful identity-side results. The directory update is a separate failed operation.

Investigate the operation's authority and target response. Reapplying the same mapping does not grant the connector permission to change the directory.

Nor should you change HR to `Engineering` just to hide the mismatch. The approved code remains correct; delivery of the configured receiving copy needs its own repair and verification.

After restoring the approved write path, use the supported recovery for the affected work and verify the target result. Do not promise that every failed operation retries automatically or that repeated broad processing is harmless.

## Attribute sync can expand the impact

Attribute sync applies to existing correlated accounts, not to uncorrelated records or accounts that do not yet exist. It does not create missing accounts by itself.

When an identity has multiple correlated accounts on the synchronized source, attribute sync updates all of them. That is why a sample showing only Devi's ordinary directory account cannot establish that her administration account is unaffected.

A mapping that changes an optional identity attribute to null can also matter. When a mapped identity value is set to null, attribute sync propagates that null to the configured account attribute. What the target accepts and how the operation completes still need verification.

“Optional identity field” therefore does not mean “safe to clear.” Distinguish a mapping returning null from merely assuming an omitted input or removed mapping behaves identically.

Also examine the direction of the data. If you derive an identity value from a receiving account and then synchronize it back, the receiving account is both input and output. The approved source of the business fact can disappear behind a seemingly consistent pair of values.

## Restoring the old mapping may not restore the old state

Consider a separate variation in which the new code was successfully written to the directory before a problem was noticed.

Originally, the old mapping read `Engineering` from Corporate Directory. After successful sync and a read of the changed account, that same field contains `ENG`.

Restoring the old mapping now reads `ENG`, not the earlier label.

```text
Before the change:
  Directory department Engineering
    -> old mapping
      -> identity Department Engineering

Variation: new mapping and sync succeed
  HR departmentCode ENG
    -> identity Department ENG
      -> directory department ENG
        -> changed account read into ISC

Restore the old mapping:
  Directory department now ENG
    -> old mapping
      -> identity Department ENG

Human recovery:
  reconcile inputs, consumers and targets
  verify approved state after correction
```

This variation is different from the denied-write example above: here the target write succeeded and its changed value was collected. The arrows show value dependencies, not an automatic rollback feature.

A **rollback** restores a previous configuration or state. Restoring a mapping definition is configuration rollback. It is not a guaranteed reversal of already completed external changes, role transitions, notifications or actions performed while access was different.

A recovery plan may require approved compensating changes. These are new actions that correct the effects of earlier ones, rather than erasing the fact that those effects happened.

Identify which operations completed, failed or remain unresolved. Preserve evidence and coordinate all writers before repairing the intended values. Don't blindly copy an old snapshot back over legitimate business updates that occurred during the incident.

For an account deletion, restoring a mapping cannot recreate the deleted account with all its previous content and history. Recovery must follow the supported procedure for the actual action and target.

## Test the decisions against changed evidence

### 1. The output is correct, but the comparison is old

**Facts:** Department now evaluates to `ENG`. The Engineering Worker role still requires `Engineering`. No alternate condition matches.

Is the identity value alone enough to approve the change?

**Reasoning:** No. The proposed output changes the condition's result. Coordinate and test the approved representation and role logic, including a non-engineering employee. Successful calculation is not proof that existing access requirements remain correct.

### 2. Only one person was previewed

**Facts:** Devi's preview is correct. Other employees in Employees have missing codes and multiple source-account cases that have not been checked.

Can you treat the profile-wide application as validated?

**Reasoning:** No. The preview supplies one calculation result. Inspect representative inputs, account selection, missing-value behavior and expected population effects before broad processing. A shared mapping remains shared even if only one identity was selected for preview.

### 3. The administration account was overlooked

**Facts:** Both `cd-67007` and administration account `cd-admin-67007` are correlated to Devi on Corporate Directory. Attribute sync is enabled for Department.

Can you assume only `cd-67007` receives the configured value?

**Reasoning:** No. Attribute sync updates all correlated accounts on that source. Establish whether the configuration meets the approved account-class requirements; do not borrow a different feature's account-selection behavior as a safeguard.

### 4. An optional field becomes null

**Facts:** A mapped optional identity attribute now returns null. It is configured for attribute synchronization to an existing correlated account.

Does its optional status prevent an attempted account change?

**Reasoning:** No. The documented synchronization behavior propagates a mapped null to the configured account attribute. Inspect the exact operation and target outcome, and correct the cause or design before treating the empty value as harmless.

### 5. The identity changed, but the target denied the update

**Facts:** Current identity Department is `ENG`; target Department remains `Engineering`. Operation evidence records a denied write.

Should you keep editing the identity mapping until the target changes?

**Reasoning:** No. The supplied evidence identifies an execution problem after the identity value was produced. Investigate the approved operation permissions and target response, recover supported affected work and verify the target. Do not alter correct HR data to conceal the failure.

### 6. The old manager is still displayed

**Facts:** A changed non-null manager account attribute cannot be matched by manager correlation. The identity still shows its previous manager.

Does the retained manager prove no new input was evaluated?

**Reasoning:** No. Documented manager correlation can retain the existing manager when the changed value cannot correlate. Inspect the new input, matching configuration and actual relationship. A retained display is not proof that the new input successfully identified the intended manager.

### 7. A shared transform changed in another profile too

**Facts:** Employees and Contractors use Reference transforms that reuse the same underlying calculation. That calculation is changed for the employee requirement.

Is the change scoped only to Employees?

**Reasoning:** No. The referenced logic is reused. Identify every affected reference, expected output and processing scope. A similarly named independent copy would require different evidence, so inspect definitions rather than assuming either universal sharing or isolation.

### 8. The old mapping is back, but the old value is not

**Facts:** The directory successfully received `ENG`, and ISC collected that updated account. The administrator restores the old mapping that reads the directory.

Why doesn't this restore `Engineering`?

**Reasoning:** The mapping definition is old, but its input is no longer the old value. It now reads `ENG`. Reconcile the approved input, writers and consumer configuration; inspect completed external effects before planning compensating recovery.

## Apply the same review to an end-date change

A team proposes changing a contractor end-date mapping from a current approved contract date to a field containing a proposed extension.

What would you establish before applying it?

Confirm which field means an approved current end date and which means an unapproved proposal. Check publication timing, collected values, date format and time zone. Then identify calculations and processes using the mapped date, including lifecycle decisions and access removal.

Test an approved extension, an unapproved proposal, a missing date, a future change and an already-expired contractor. A previewed date is only one observation; the expected lifecycle result and separate access actions need evidence too.

Plan how to recover if an incorrect date already triggered an account action. Restoring the previous mapping may recalculate identity data, but it does not guarantee reversal of everything initiated under the wrong date.

Explain the change as a connected argument: the approved input produces this value, these consumers interpret it this way, this population is affected, these operations may run, and this evidence will establish the outcome. That is the difference between checking a field and engineering a change.
