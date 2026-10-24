# One role was removed. Why does some access remain?

Devi no longer prepares cases, so her **Case preparer** role is withdrawn in SailPoint Identity Security Cloud, or ISC. She can no longer edit drafts. But she can still read cases and add follow-up notes.

Did ISC miss part of the removal?

Not necessarily. Devi also holds a **Case follow-up** role. It still requires case reading.

To judge the result, we need to separate the responsibility that ended from the rights that remain justified. Removing everything mentioned by the first role could break work the second role is still supposed to support.

## Put both responsibilities on the same account

Devi, employee **120606**, works with North cases in **CaseBridge Production**, a fictional application. Her ISC identity represents her as a person and is correctly linked to her existing account, **cb-120606**. This account-to-person relationship is account correlation.

A **source** is ISC's configured representation of a managed system and its account data. The connector is the integration used to read that system and, where supported, change it.

In CaseBridge, the native group keys are:

- **CB-8601, Readers**: read North cases.
- **CB-8602, DraftEditors**: edit North case drafts, but only with Readers on the same account.
- **CB-8603, FollowUp**: add North follow-up notes, but only with Readers on the same account.

None permits final approval, export, or administration. These are supplied application rules, not meanings ISC infers from the names.

An **entitlement** is an access right represented in ISC. We will call the ISC records representing those three groups **E-8601**, **E-8602**, and **E-8603**. The E labels are teaching identifiers for ISC objects; CB keys identify the native groups. They are not interchangeable.

An **access profile** bundles related entitlements from one source. A **role** groups access for a responsibility and can contain profiles or direct entitlement references.

The enabled standard roles are:

- **R-1206, Case preparer**, which we will call Role A. It includes profile **AP-8601, Case preparation**, containing E-8601 Readers and E-8602 DraftEditors.
- **R-1266, Case follow-up**, which we will call Role B. It includes profile **AP-8602, Case follow-up**, containing E-8601 Readers and E-8603 FollowUp.

Both roles currently apply to cb-120606. The account is enabled, sign-in works, its resource scope is North, and all three native memberships are present. Reading, draft editing, and follow-up work.

All records, identifiers, permission rules, assignment histories, times, and outcomes here are fictional. Assume supported provisioning, enabled components, and standing access without separate activation before each use. There are no other grants, lifecycle requirements, concurrent changes, or additional accounts in the main example.

## Two paths to Readers are not two Readers memberships

Follow the references carefully.

Role A points to AP-8601, which points to E-8601. Role B points to AP-8602, which points to **that same E-8601**.

The profiles are different objects, but the Readers entitlement they reference is the same object on the same source. That is the overlap.

```text
Devi: two current role assignments
                 |
      +----------+----------+
      |                     |
A: Case preparer    B: Case follow-up
      |                     |
Profile AP-8601      Profile AP-8602
Readers + Drafts    Readers + FollowUp
      |                     |
      +-- same E-8601 ------+
                 |
       Group CB-8601 Readers
       on account cb-120606

Four role-to-entitlement paths.
Three distinct entitlement objects.
One Readers membership on this account.
```

The lines show references and their shared target, not separate connector calls. Drafts is the diagram's short label for DraftEditors.

Across the two roles, there are four role-to-entitlement paths: A-to-Readers, A-to-Drafts, B-to-Readers, and B-to-FollowUp. There are only three distinct entitlements. On this stated account, there is one Readers group membership.

Do not turn the path count into a claim that ISC sends four source operations or grants Readers twice. Object relationships, assignment records, provisioning events, and native memberships are different things to count.

Also, a role directly referencing E-8601 would still be a role requirement. “Direct entitlement in a role” describes how its definition points to the right; it does not mean Devi independently requested that entitlement outside the role.

## Find out why each role is assigned

**Assignment origin** means the basis by which a particular access assignment arose. It answers a different question from the role's contents.

It also differs from standing versus Just-In-Time access. That distinction concerns whether separate activation is required, not whether a rule or a request authorized the assignment.

Role A was automatically assigned because Devi's current identity values matched its approved membership policy: department `ServiceOps`, job code `CASE-PREP`, and lifecycle state `working`, joined with AND.

A lifecycle state represents a stage such as working or departed. Here `working` is the configured technical value, and its associated identity state is Active.

Role B came through an approved request for a temporary follow-up project. An **access request** asks for specified access for a recipient. The required reviews completed, the start time passed, and the supplied records show the assignment and its access were delivered to cb-120606. Its end is **October 30, 2026, at 17:00 UTC**.

Both are current role assignments. One is automatic and the other requested; that distinction does not make B a directly requested **profile**. Its profile is included through the requested role.

This is why you need the complete path:

**Approved role request → assigned Role B → profile AP-8602 → required Readers and FollowUp.**

The request explains why B was authorized. The role contents explain what it requires. Current account evidence explains what actually reached the application.

Do not infer a completed request from a role being marked requestable. Do not infer an automatic assignment merely because someone happens to match its criteria today. Inspect the actual assignment and supporting history.

## Withdraw A, then examine each right

Devi moves to a different ordinary job. Her correct current identity values no longer match A's complete criteria. Role B's separate, approved temporary project continues.

**Identity processing** applies current identity and access-model configuration to calculate requirements such as automatic role membership. In the supplied case, relevant processing withdraws A's automatic assignment while B remains assigned.

The role definitions themselves are unchanged. We are ending one person's assignment, not deleting DraftEditors from a shared role for every member.

Now reason about the entitlements individually.

| Right on cb-120606 | What A's withdrawal means in this case |
|---|---|
| Readers, E-8601 / CB-8601 | Both A and B required it. B still requires it, so it is retained for that role. |
| DraftEditors, E-8602 / CB-8602 | Only A required it. With A withdrawn and no other stated grant, it needs removal. |
| FollowUp, E-8603 / CB-8603 | B still requires it. It was not part of A, so withdrawing A does not withdraw this requirement. |

The documented role-overlap behavior retains access required by another assigned role. It is the **remaining current requirement**, not the date of the earliest grant or the number of profiles in the catalog, that explains Readers here.

If another unassigned role also mentions DraftEditors, that definition does not protect Devi's DraftEditors membership. It expresses possible access for that role's members, not a requirement currently assigned to her.

```text
Withdraw A's automatic assignment
                 |
B remains assigned to the same account
                 |
       +---------+----------+
       |                    |
Readers still required   Drafts not
by B                     required
       |                    |
Retain Readers           Remove Drafts
       +---------+----------+
                 |
       Readers + FollowUp remain
                 |
Read and follow up: allowed
Edit drafts: denied

Later: B also ends
                 |
No remaining stated requirements
                 |
Readers + FollowUp need removal
                 |
Verify each native outcome
```

The diagram states required and observed outcomes under the example's conditions. It does not describe private engine steps, guarantee atomic delivery, or apply one removal algorithm to every assignment origin.

## What successful withdrawal looks like

Use the supplied observations on **October 28, 2026**:

- At **10:00 UTC**, the current identity values used by A's criteria no longer match. B's project authorization remains valid.
- At **10:05 UTC**, assignment evidence shows A withdrawn and B still assigned to cb-120606.
- At **10:10 UTC**, the DraftEditors removal reports success.
- At **10:15 UTC**, native account inspection shows Readers and FollowUp, with DraftEditors absent. Reading and follow-up work in North; draft editing is denied.

These are example observations, not promised processing intervals.

**Provisioning** is the work of changing a target system; a removal is also called deprovisioning. A correct membership decision and a successful native removal are separate facts. Identity processing initiating a change is not proof that the target accepted it.

Here, the reported removal and native task checks support the intended result. Readers remaining is not evidence of a failed Readers removal. We have a positive explanation for retaining it: B still requires it on this account.

Now change one observation. Suppose DraftEditors removal reports a permission error, and native inspection still shows all three groups. A may have been withdrawn correctly, but its unique draft capability remains because fulfillment failed. Do not justify DraftEditors by pointing vaguely at B; B does not contain it.

Keeping a required shared right and failing to remove an unrequired unique right must not be grouped under one label such as “some access remained.”

## What happens when B ends too?

At B's access end date and time, withdrawal processing starts. An end timestamp is not proof of instantaneous native completion.

In our main example, A is already gone and no other stated requirement exists. Ending B leaves neither Readers nor FollowUp required by these roles. Both need removal through the applicable fulfillment path.

After successful removal, none of the three example memberships remains. That still does not mean the account was deleted or disabled. Account actions are separate; role entitlement withdrawal is not account deletion.

If FollowUp removal succeeds but Readers removal fails, the account can still read North cases under the supplied native rules. Follow-up fails. That is a partial removal to investigate, even though the project assignment ended.

If the organization later grants another role requiring Readers before B ends, reassess the current requirements. The original plan was based on a stated absence of other grants, not a permanent fact about Devi.

Treat each transition as a new evidence question. A plan made on Monday does not prove Friday's assignment population is unchanged.

## Why the same-looking profiles can produce a different result

Compare an **independent alternative**, not an extra grant added to the main example.

There are no roles. Devi holds AP-8601 and AP-8602 directly through profile requests, with the same three native groups initially present. No lifecycle requirement or other grant applies.

An authorized explicit revocation of AP-8601 removes its Readers and DraftEditors memberships, assuming successful fulfillment. AP-8602 then lacks its required Readers entitlement, so its profile association is lost. FollowUp remains as an individual entitlement.

Under CaseBridge's supplied rule, FollowUp alone cannot add notes because it needs Readers on the same account.

A second directly held profile did not protect the shared Readers right. This differs from the main case, where a current assigned role required it.

Access-profile **detection** is ISC recognizing a complete recorded entitlement set and associating a profile with the identity. Detection does not itself add groups or reconstruct their original approval. The explicit non-role profile-revocation behavior is not converted into label-only cleanup because the profile was detected rather than requested.

This comparison is why “keep it until the last object mentioning it is gone” is not a safe universal rule. The kind of assignment and the action being performed matter.

## Use the origin to choose the investigation

The origin and the current requirement both matter. A past approved request records a past authorization decision; you still need to establish whether the resulting assignment is current and applicable to the account being changed.

An Identity List is the alternative automatic-role configuration in which an administrator selects ISC identities explicitly. A department change does not silently remove someone from that list.

| Basis or observation | What to establish before predicting withdrawal |
|---|---|
| Automatic role from criteria or Identity List | Inspect the actual selector, current inputs or selected identity, and applied membership decision. A definition alone is not a grant. |
| Requested role | Inspect the specific assignment, request history, effective dates, retained roles, and target accounts. Use its supported revocation or expiry route. |
| Profile included through a role | Investigate the governing role assignment. Do not treat the profile as an independent direct-profile revocation. |
| Directly held or detected non-role profile | Establish its actual revocability and other current requirements. Another non-role profile is not the same protection as a current role. |
| Current lifecycle requirement | Inspect the configured state and required profiles. Continued enforcement can explain later reprovisioning. |
| Native membership with unknown history | Establish current holdings and any managed requirements. Do not invent an approved request or a role merely because the membership exists. |

A **lifecycle requirement** comes from the configured stage governing an identity, such as a working state that requires baseline access. Profiles required by the current lifecycle state are enforced while the person remains in that state. If activity establishes a successful removal followed by a later addition, a continuing lifecycle requirement can explain the return.

That is different from a right never having been removed. Compare separate operations and native observations before deciding between retention, failed removal, and later regrant.

Do not extrapolate these documented mechanisms into an undocumented priority list for every possible mixed-role, lifecycle, direct-request, native, and Just-In-Time combination. When a real case exceeds the verified conditions, gather its exact assignments and supported behavior before promising a cleanup result.

## Keep the source and the account attached to every path

Overlap means more than two labels saying Readers.

Compare the exact source, entitlement type, entitlement object, and actual account target. Production Readers and Test Readers are not the same right merely because their display names match. A copied profile with a different ID can still reference the same entitlement, while two similarly named profiles can contain entirely different rights.

Now consider a separate two-account variation. Role A targets Devi's normal account, while B targets a privileged account. A right required on the privileged account is not evidence that the normal account must keep the same membership.

Do not combine both accounts' holdings into one imaginary account. Inspect assignment details, the account-selection configuration where relevant, and per-account provisioning evidence. Where the same role has multiple requested assignments, identify which assignment and account targets the removal actually selects.

Likewise, B requiring Readers does not make it inherit A's DraftEditors entitlement. Sharing one right does not nest one role inside another or copy all of its contents.

## Use the screens to connect evidence

A role's **Manage Access** view describes its contents. It does not establish that Devi is currently assigned to it. The role's identities and assignment details address that different question; they can include both automatic and requested grants.

For requested access, connect the request and dates to the current assignment and account targets. For automatic access, connect current identity inputs or list membership to the selector and relevant processing. The same role name on two screens is not enough.

Provisioning activity helps establish which account operation was attempted and what error or result was reported. **Aggregation** reads account information into ISC; a record collected before a removal is not proof of the later native state.

Finally, compare actual memberships and application tasks. Native membership tells you whether a group is present. Task checks show its effect under account status, sign-in, resource scope, and application permission dependencies.

Do not use an approval, a vanished role label, or one successful operation as proof that all intended withdrawals and retained work are correct.

## Work through the changed conditions

### Case 1: A ends while B remains

**Facts:** Both main roles target cb-120606. A ends, B remains, and the required DraftEditors removal succeeds.

**Reasoning:** Readers and FollowUp remain required through B. DraftEditors is withdrawn. Verify that North reading and follow-up still work while draft editing is denied. Readers retention supports the intended design rather than contradicting it.

### Case 2: A catalog role mentions DraftEditors

**Facts:** A is withdrawn. Another enabled role definition includes DraftEditors, but Devi is not assigned to that role. No other requirement applies.

**Reasoning:** An unassigned definition is not a continuing requirement for her account. It does not justify retaining DraftEditors. Inspect the removal outcome rather than treating every catalog reference as protection.

### Case 3: Both roles end, but an extra membership appears

**Facts:** After both main roles end, all three of their memberships are successfully removed. Native inspection also finds a separate administrators group that neither role contained.

**Reasoning:** Ending these roles does not establish removal or approval of unrelated access. Investigate that group's origin, current justification, and supported removal separately. Never report the account as having no application access from this role-set evidence alone.

### Case 4: B contains a different Readers object

**Facts:** In a variation, B references Test Readers on a different source, not Production E-8601. A targets CaseBridge Production.

**Reasoning:** There is no stated overlap protecting Production Readers. Compare exact object and account scope before predicting retention. A matching display name is not the shared right shown in the main diagram.

### Case 5: The profiles are held outside roles

**Facts:** There are no roles or lifecycle requirements. AP-8601 and AP-8602 are directly held. Explicit AP-8601 revocation successfully removes Readers and DraftEditors.

**Reasoning:** AP-8602 becomes incomplete and is lost; FollowUp remains individually. Under the stated same-account dependency, follow-up fails. The main role-retention result does not apply merely because both cases contain two profiles.

### Case 6: Only DraftEditors fails to be removed

**Facts:** A ends, B remains, and DraftEditors removal reports a target permission error. Native inspection finds all three groups.

**Reasoning:** Readers and FollowUp have valid retained requirements. DraftEditors does not. Recover the verified failed removal without withdrawing the rights B needs. A role label disappearing does not prove fulfillment.

### Case 7: B's end time has arrived

**Facts:** A is already gone. B reaches its end time. No removal results or current native observations have been supplied.

**Reasoning:** Withdrawal is due, but completion is unproved. Inspect the assignment state, applicable fulfillment activity, and exact native memberships. Do not turn a timestamp into a claim that either Readers or FollowUp is absent.

### Case 8: The remaining role targets another account

**Facts:** B remains assigned for a privileged account. A's withdrawal concerns the normal account. The supplied information does not establish any remaining requirement on the normal account.

**Reasoning:** Do not claim normal-account retention from a privileged-account grant. Establish the exact account-target requirements and removals. More evidence is needed before describing a native outcome; the single-account main result cannot simply be copied.

## Transfer the reasoning to a paid application

A reporting application has two enabled roles on the same account:

- Report author requires an Editor license and DraftAuthors.
- Report publisher requires the same Editor license and Publishers.

The current requirement to author ends, but the assigned publisher role remains. The application requires Editor plus Publishers to publish. There are no other grants, and all access is standing.

Predict the intended result before deciding whether a removal looks correct.

Editor remains required through the publisher role. DraftAuthors needs removal. Publishers remains. After successful fulfillment, publishing should work and draft authoring should not, under the supplied permission rules.

The paid Editor license has **not** been reclaimed merely because the author role ended. If reclaiming the seat is the business objective, reconcile that objective with the continuing publisher requirement and the application's licensing model. Also verify the application's actual license assignment and capacity, not only ISC's role labels.

If these were two directly held profiles instead of roles, revisit the explicit non-role overlap behavior. If they targeted different accounts, revisit account scope. If one write failed, revisit actual delivery.

A useful explanation names **which assignment ended, which current requirement remains, which exact rights belong on which account, and what the application now permits**. That is how you distinguish correct retention from incomplete removal.
