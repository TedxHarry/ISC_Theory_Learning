# The identity changed. Which results should change with it?

Devi moves from Support into Engineering and becomes a regular employee after a prehire period. Her manager changes too.

SailPoint Identity Security Cloud (ISC) now has the updated worker record. You open Devi's identity and see Engineering. Does that mean her new manager is linked, her employee access is assigned, her Support role is gone, and the Engineering group is present in the directory?

Engineering answers only the department question.

**Identity processing** reevaluates identity information and applicable access requirements using the relevant data and configuration. Its responsibilities include identity values, manager relationships, lifecycle-driven access and automatic role assignments. Each responsibility has its own inputs and result.

Let's put those results beside the records that explain them.

## Establish what Devi already has

Devi's employee number is 95005. Her ISC **identity** is the record representing her as a person. We will call it I-95005; this is a teaching label, not an actual ISC object ID.

Her worker account `wl-95005` on WorkforceLedger Production is correctly associated with that identity. A **source** is ISC's configured representation of a system's account data. WorkforceLedger is authoritative for this employee population: its records establish and maintain their identities.

The Employees **identity profile** holds the shared instructions for these identities, including attribute mappings and lifecycle configuration.

An **account attribute** is a field on a source account. An **identity attribute** is a field on the person record. A **mapping** tells ISC where an identity value comes from. A **transform** calculates or prepares a value when direct copying is not enough.

The approved configuration is:

- Identity department reads WorkforceLedger `department` directly.
- Identity identificationNumber reads WorkforceLedger `workerNumber` directly.
- The Manager Name mapping reads WorkforceLedger `managerNumber`. Source manager correlation matches that account field against managers' identificationNumber identity field.
- The Lifecycle State mapping translates workerStage `PRE` to technical state name `prehire`, and `EMP` to `active`. The business has approved those exact translations; neither is inferred from Devi's department.

Manager identities already exist. The previous manager has identificationNumber 95090; the new manager has 95091. Each number identifies exactly one intended manager. Both managers' relevant identity values are already applied, not merely present in uncollected HR records.

Only this source/profile supplies Devi's manager in this example. We are not choosing between competing authoritative sources.

Both lifecycle states are enabled and configured with ISC identity state **Active**. Identity state controls participation in ISC features and processing; it is not the same field as the lifecycle state describing a business stage. Here, lifecycle prehire does not mean an Inactive identity.

Devi already has one correctly associated account, `wd-95005`, on WorkDirectory. The source supports the relevant group additions and removals, and provisioning is enabled. No account creation, deletion, enable/disable action or identity-field synchronization is configured in this example.

These records, configurations and outcomes are fictional. No real tenant or account is changed.

## Read the inputs before predicting the results

Before the update, the collected WorkforceLedger account contains department Support, managerNumber 95090 and workerStage PRE. Devi's applied identity department is Support, her resolved manager is identity 95090, and her assigned lifecycle state is prehire.

After the update has been collected into ISC, the same account contains:

```text
WorkforceLedger account wl-95005
  workerNumber: 95005  (unchanged)
  department: Engineering
  managerNumber: 95091
  workerStage: EMP

Employees profile instructions
  department -> identity department
  managerNumber -> manager lookup
  EMP -> lifecycle state active

Relevant identity processing
  -> verify each applicable result
  -> verify required delivery separately
```

The arrows show configured dependencies and verification boundaries. They do not describe separate private services, parallel jobs or a guaranteed execution sequence.

The input is already in ISC. **Aggregation**, the collection of account data from a source, supplied it. Identity processing does not make an uncollected HR edit available by itself.

For this example, relevant event-based processing has been initiated by the identity modification during aggregation. That gives us a reason for reevaluation, not proof that every expected result has finished.

If you were investigating a real case, check the exact account, collected values and relevant processing evidence. “HR changed the record” and “this identity was reevaluated using those values” are different observations.

## A copied value and a resolved relationship are different results

The department mapping has a straightforward dependency: the selected account's department is Engineering, so that mapping should produce Engineering.

The unchanged workerNumber should still produce identificationNumber 95005. An unchanged result is correct when the relevant input and instructions still call for it.

Manager correlation answers a different question: **which existing identity is Devi's manager?** It establishes a relationship between two identities. It does not associate Devi's own account with her identity; that association already exists.

The account supplies 95091 as a reference to another person. The source's manager-correlation configuration says to compare it with candidate managers' identificationNumber values. A unique match to the prepared manager identity supports the new relationship.

There are therefore two useful checks: did ISC select the intended manager-reference value, and did it resolve the intended manager identity?

A visible 95091 value alone cannot answer both. Neither can the name “Manager Name” be taken to mean that display-name matching is always involved. Inspect the configured fields.

If the relevant account manager value changes to null, the documented behavior clears the manager relationship. If it changes to a non-null value that cannot be correlated to a new manager, the existing manager relationship is retained.

That distinction matters during investigation. Seeing the previous manager after a change does not, by itself, prove that processing never ran. The new reference might be unmatched. Check the selected input, candidate identity and actual result before deciding which defect to repair.

A corrected current relationship also does not prove that an approval already created for the previous manager has been rerouted. That approval is a separate piece of work with its own recorded recipient and handling.

## The lifecycle value selects configured requirements

A **lifecycle state** represents a business stage and connects it to configured access or account actions. The technical name is the value that selects the state; a friendly display label is not a substitute.

In this configuration, PRE maps to prehire and EMP maps to active. Both states grant the enabled Worker Portal **access profile**. An access profile bundles entitlements from one source. Here Worker Portal contains the ordinary, ongoing WorkDirectory group membership `PORTAL`.

An **entitlement** is a governed access item, such as that group membership. The account's actual group membership and the ISC access object representing it are related records, not the same object.

The active state additionally grants enabled Employee Base, containing ordinary membership `STAFF-BASE`. The prehire state does not grant it.

Devi's state change therefore introduces a new STAFF-BASE requirement. PORTAL remains required because both states grant the same Worker Portal profile. We should not predict a remove-and-readd of PORTAL merely because the lifecycle label changed.

There are no lifecycle account actions or Remove all access configuration in this example. Moving to active is not a command to enable every account or remove every access item that active does not list.

The main question is: given the actual selected state and its enabled configuration, what access should now be required?

If the identity displays a state value you expected but a group is absent, inspect that state's access configuration and the specific delivery evidence. The state name is not a receipt from WorkDirectory.

## Roles apply a separate condition

A **role** groups access requirements. An automatically assigned role uses configured membership criteria to decide which identities should receive it.

Three enabled roles are relevant here:

- Company Core tests identificationNumber equals 95005 in this small teaching example. It contains Company Common, an enabled profile requiring `COMMON`.
- Support Tools tests identity department equals Support. Its Support Bundle requires `SUPPORT-BASE` and `COMMON`.
- Engineering Tools tests identity department equals Engineering. Its Engineering Bundle requires `ENG-BASE`.

All these profiles are enabled and contain standing access, with no separate activation step. They use Devi's existing WorkDirectory account.

Company Core's deliberately narrow criterion lets us examine retention without adding another employee population. It is not a recommended design for a real company-wide role.

Before the change, Devi has Company Core and Support Tools. Engineering Tools is not assigned. WorkDirectory wd-95005 contains PORTAL, COMMON and SUPPORT-BASE, but not STAFF-BASE or ENG-BASE.

With identity department Engineering, Support Tools no longer matches and Engineering Tools does. Company Core still matches because identificationNumber remains 95005.

The Support role's removal does not make COMMON unnecessary. Company Core still requires that entitlement. Removing the Support-only requirement and preserving the shared requirement are compatible outcomes.

Do not count the role's two entitlements and conclude that two memberships must be removed. Determine which requirements survive.

Losing a role also does not mean deleting its source account. In this example the account must remain, with retained and newly required memberships.

## Bring the decisions together without inventing an engine order

We can now predict the intended applied results.

| Responsibility | Expected result with this configuration |
|---|---|
| Identity mappings | Department Engineering; identificationNumber remains 95005; workerStage EMP translates to lifecycle technical value active. |
| Manager resolution | Reference 95091 resolves to the existing intended manager identity. |
| Lifecycle-driven access | Assigned active state requires Worker Portal and Employee Base; PORTAL remains required and STAFF-BASE becomes required. |
| Automatic role assignment | Support Tools removed, Engineering Tools added, Company Core retained; COMMON remains required. |

The table groups responsibilities so you can inspect them. It does not assert that every field is calculated first, then every manager is resolved, then lifecycle work finishes, then all roles run, as one atomic transaction.

A **dependency** means an outcome relies on particular information or configuration. It does not automatically give you control over the product's execution order.

For example, Engineering Tools depends on the identity department used in its criteria. That does not justify building another identity attribute by reading “the freshly calculated department” and assuming a particular mapping runs first. The identityAttribute transform is not intended for use inside another identity-profile attribute calculation; such calculations do not guarantee that a peer field is current or even available.

Use supported independent input retrieval and suitable composed calculations where needed. Verify the applied results. Do not repair an assumed ordering problem by repeatedly running processing until an unsupported cross-field design happens to appear correct.

Our lifecycle mapping reads workerStage from the account; it does not read a newly calculated peer identity field. The manager candidates are already established. These assumptions remove two avoidable ambiguities from the example.

You can reason that the configured inputs call for Engineering, manager 95091, active and the stated assignments. You cannot infer an undocumented backend schedule from that reasoning.

## Required memberships are not completed memberships

Combine the continuing and new requirements for wd-95005:

```text
Before: observed WorkDirectory memberships
  PORTAL + COMMON + SUPPORT-BASE

After: intended memberships
  PORTAL + COMMON + STAFF-BASE + ENG-BASE

Retain: PORTAL and COMMON
Remove requirement: SUPPORT-BASE
Add requirements: STAFF-BASE and ENG-BASE

Provisioning and target evidence
  STAFF-BASE add: confirmed
  SUPPORT-BASE removal: confirmed
  ENG-BASE add: failed; still absent
  PORTAL and COMMON: confirmed retained
```

**Provisioning** performs the required changes to a connected system, or uses the applicable manual fulfillment path. Here we have a supported direct connection, so the example concerns actual WorkDirectory group changes.

The first two parts of the diagram compare observed initial state with intended state. The last part supplies fictional delivery results. It is not a sequence in which ISC must issue those operations.

Suppose an investigation verifies these observations on October 23, 2026, in UTC:

At 14:00, wl-95005's updated values are collected and the relevant identity modification initiates processing. At 14:04, the applied identity department is Engineering, the resolved manager is 95091, the assigned lifecycle state is active, and the expected role assignments are verified.

At 14:06, the activity evidence reports STAFF-BASE addition and SUPPORT-BASE removal completed, but ENG-BASE addition failed because the connection lacks permission for that group.

At 14:07, a fresh check of wd-95005 confirms PORTAL, COMMON and STAFF-BASE present, SUPPORT-BASE absent, and ENG-BASE absent.

The identity-side results are consistent with the intended decisions. Delivery is incomplete. Devi has not received all intended access.

Those supplied intervals are not processing-time promises. Neither the job status nor one completed addition establishes the other operations' outcomes.

Some provisioning failures have supported retry handling. Do not turn that into “every failure will fix itself” or “another identity-processing run retries every failed item.” Inspect the actual error, applicable recovery behavior, authorization and current target evidence. Correct the permission problem through the approved process, then verify the supported recovery and exact membership result.

## Read each screen as evidence of a particular record

When you open the identity's attributes, you are looking for applied person-level information, not a live view of every target account.

When you inspect its resolved manager, verify the intended manager identity, not merely a plausible display name.

When you inspect lifecycle configuration, you see instructions for a state. When you inspect Devi's assigned lifecycle state, you see which state currently applies. Neither view alone establishes every target action.

Role membership tells you about the assignment. Provisioning activity tells you about work to deliver or remove access. Current source-account data in ISC shows the collected account representation; a target observation establishes the target's state at the time checked.

Keep the claim as specific as its evidence:

| Observation | What it establishes, and what is still missing |
|---|---|
| Identity department is Engineering | Applied department agrees with the new input. Manager, lifecycle, roles and memberships need their own checks. |
| Company Core remains assigned | The continuing role requirement is recorded. Check COMMON membership if actual delivery or retention is in question. |
| ENG-BASE add reports failure | That attempt failed. A later current-state claim still needs later evidence. |
| Fresh target check shows ENG-BASE absent at 14:07 | Membership is absent at that observation time. It does not prove permanent absence or that a later recovery failed. |

If no activity appears where you first look, treat that as missing evidence, not immediate proof of a failed operation. Confirm identity, account, source, requested change, time range and the view's coverage.

Likewise, do not “fix” the source department back to Support just because Engineering delivery failed. Engineering is the approved business fact. The failed group operation has a different cause.

## Work through the changed conditions

Treat the following variations independently. Each changes only the facts stated.

### 1. Only the department changed

**Facts:** The collected department changes to Engineering, but workerStage remains PRE and managerNumber remains 95090. The existing enabled configurations are unchanged.

**Reasoning:** Engineering Tools should qualify and Support Tools should stop qualifying when the relevant identity department is applied. Lifecycle remains prehire, so this case does not introduce Employee Base through active. Manager 95090 remains the intended match. A department change does not logically require every other result to change.

### 2. The manager reference has no match

**Facts:** Instead of 95091, the collected managerNumber becomes non-null 95999. No candidate identity has identificationNumber 95999. Devi already has resolved manager 95090.

**Reasoning:** The documented unmatched non-null behavior retains the existing relationship. Do not report 95999 as a resolved new manager or assume the relationship was cleared. Investigate whether the reference is wrong or the intended manager's identity data is missing. Do not invent a manager to satisfy a guessed match.

### 3. The manager value becomes null

**Facts:** In a separate variation, the relevant account managerNumber changes to null rather than 95999.

**Reasoning:** The documented null-change behavior clears the manager relationship. That differs from case 2. Verify the actual selected value and relationship; “missing manager” is not precise enough to distinguish a null input, an unmatched reference and an uncollected change.

### 4. The lifecycle state did not change

**Facts:** Devi already has lifecycle active and both state-granted profiles before a later department-only update.

**Reasoning:** There is no new prehire-to-active transition in this variation. The continuing active access requirements remain relevant, but a new transition or duplicate group write is not required to prove reevaluation. Role criteria can change their result while lifecycle remains correct.

### 5. COMMON belongs to the old role too

**Facts:** Support Tools loses its assignment. Company Core remains assigned and still requires COMMON.

**Reasoning:** COMMON is retained for the continuing role. SUPPORT-BASE has no continuing requirement in this example, so its removal is the expected change. Role removal is not a command to erase every entitlement mentioned in the old role.

### 6. The identity and role are right, but the group is absent

**Facts:** At 14:07, Engineering is applied, Engineering Tools is assigned and a fresh target check finds no ENG-BASE. The add activity records insufficient permission.

**Reasoning:** The supplied evidence points to delivery failure, not an incorrect department condition. Verify the exact source, account and group, correct the approved connection permission and confirm recovery. Rewriting the role to match Support would hide the business requirement rather than fulfill it.

### 7. The display label looks right

**Facts:** An enabled lifecycle state displays as Active Employee, with technical name active. A proposed mapping returns the text Active Employee instead.

**Reasoning:** The display text is not the technical selection value required here. Correct the mapping to the approved technical name and verify actual assignment and access outcomes. A familiar-looking label is insufficient; do not assert an undocumented fallback for an unrecognized value.

### 8. The proposed design depends on peer-field timing

**Facts:** A designer proposes calculating department first and reading that newly calculated identity attribute inside the Lifecycle State mapping. No supported execution-order contract is supplied.

**Reasoning:** The design relies on an order it cannot assume. Inspect the underlying account inputs and business decision, then use a supported calculation that does not depend on a freshly calculated peer field. A correct Preview once is not evidence that the dependency is safe for every identity or later run.

## Try the same reasoning with another set of records

An employee moves from Leeds to Bristol. Their identity's location mapping reads the correct collected location. The existing manager reference is unchanged and still resolves uniquely.

The employee remains in an enabled active lifecycle state granting Staff Portal. Their enabled Bristol Tools role requires both identity location Bristol **and** lifecycle technical value active. Its profile requires ordinary group BR-TOOLS on an existing, correctly associated account. Staff Portal uses a different group.

The supplied evidence shows a correct Preview for Bristol, but the applied identity still says Leeds. No current role evaluation or BR-TOOLS delivery result is supplied.

Would you report the move as complete? Which conditions can you establish, and where would you look next?

A reasoned answer separates the proposed value from the applied one. Preview does not establish that location Bristol has been applied. The continuing manager and lifecycle facts do not fill that gap.

Verify the relevant identity processing and applied location, then the actual Bristol Tools assignment against both conditions. Follow the resulting provisioning activity and fresh target membership evidence. Preserve the continuing Staff Portal requirement.

If applied location becomes Bristol but BR-TOOLS is still absent, the investigation has moved to a different boundary. If lifecycle is not actually active, the role's second condition needs investigation. Do not reduce the condition to location alone.

When you explain the original Devi example to someone else, connect each claim to its input and configuration: Engineering comes from the selected department mapping; manager 95091 comes from resolving the reference; active comes from the worker-stage translation; access requirements come from that state and the matching roles. Then explain which actual memberships are confirmed.

That is how you can say exactly what is correct, what remains incomplete, and why.
