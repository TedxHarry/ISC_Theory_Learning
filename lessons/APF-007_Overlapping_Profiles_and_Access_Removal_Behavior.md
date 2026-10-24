# If two profiles share an entitlement, what does revoking one remove?

Devi, employee `110707`, handles customer cases in CaseDock Production, a fictional application. Her account, `cd-110707`, can read cases, add review notes and export case evidence for its assigned queue.

She is finishing the note-taking work but still needs evidence exports.

In ISC, her access appears as two packages: **Case review** and **Evidence export**. Both include the same case-reader entitlement.

The administrator plans to revoke Case review.

Should the reader entitlement stay because Evidence export still includes it?

That is a reasonable expectation, but it is not the documented behavior for two overlapping access profiles held outside roles. Removing one can remove the shared entitlement, make the second profile incomplete and interrupt work that was supposed to continue.

Let's follow the actual memberships rather than treating the two package names as two independent permission switches.

All people, identifiers, application rules, configurations and observations here are fictional. We use one correctly associated account per person on this source, current records and ordinary standing access, with no separate Just-In-Time activation.

## Establish exactly what overlaps

SailPoint Identity Security Cloud, or ISC, represents a person with an **identity**. An **account** is that person's login record in a system. **Account correlation** associates the source account with the right ISC identity.

A **source** represents a connected system or account-data collection. Its **connector** reads data and, where supported and configured, carries out changes. Here the source represents CaseDock Production, and the supplied integration supports reading and changing the memberships below.

An **entitlement** represents an access right such as group membership. An **access profile** is a named bundle of related entitlements from one source.

The application team has confirmed these native rules. “Native” means in CaseDock itself.

| Native group | Confirmed permission |
|---|---|
| `CD-7701`, Case Readers | Read cases in the account's assigned queue. |
| `CD-7702`, Review Notes | Add notes in that queue when the same account also has Case Readers. |
| `CD-7703`, Evidence Export | Export case evidence in that queue when the same account also has Case Readers. |

Devi's account is enabled, sign-in works, and its assigned queue is North. The example does not assume access to every queue or any administrative permission.

Case review contains Readers and Notes. Evidence export contains Readers and Export.

We will call the profiles `AP-7707-A` and `AP-7707-B`. Their ISC entitlement references are `E-7701`, `E-7702` and `E-7703`, corresponding to the three native groups. These short identifiers are teaching labels, not actual ISC ID formats or an API payload.

The overlap is the same `E-7701` reference on the same source. Similar names would not establish overlap if they pointed to different access objects.

Both profiles are enabled. An **access request** asks for specified access for an identity, with applicable authorization and fulfillment. Devi received these profiles through completed requests for the profiles themselves. Neither comes from a role or a lifecycle-state requirement in the main example. There are no other grants or concurrent changes.

Her account currently has all three native groups, and ISC's recorded account holdings agree.

```text
Profile A: Case review
  Readers + Notes
       \
        same Readers entitlement
       /
Profile B: Evidence export
  Readers + Export

Account before:
  Readers + Notes + Export

Revoke A; successful removals:
  remove Readers + Notes

Account after:
  Export only

B now lacks Readers:
  B association is lost
  Export membership remains
```

The diagonal lines identify a shared reference, not nested profiles or an execution order. The lower half assumes that the authorized removal succeeds and that no role or other enforcing requirement changes the outcome.

## Revocation changes access, not just the package label

**Revocation** means withdrawing an identity's access through the applicable removal process. **Provisioning** carries out account or access changes through a supported fulfillment path. **Deprovisioning** is the removal side of that work.

In the documented non-role overlap case, revoking one profile removes its entitlements, including those shared with another profile.

Applied to Devi, revoking Case review removes Readers and Notes.

Evidence export then lacks Readers. Its complete required set is no longer held, so Devi loses that profile association too. Export, the entitlement unique to that second profile, remains as an individual entitlement.

Do not describe this as “both profiles were fully revoked.”

One profile was explicitly revoked. The other became incomplete. Its nonshared entitlement remained.

Also do not describe it as “only the Case review label was removed.” The native reader and note memberships were removed in the successful example.

Those two mistakes lead to different operational failures. The first hides residual access; the second hides the interruption to evidence work.

This behavior applies whether the non-role profile was recognized from existing holdings or obtained through a provisioning route. **Detection** means ISC recognizes that a complete required set is already present. A detected association is not a promise that revocation will leave native memberships untouched.

## One remaining membership can mean two different problems

After successful removal, Devi's account still has Export but lacks Readers.

Under the fictional CaseDock rules, she cannot export evidence because Export requires Readers on the same account. She also cannot read cases or add notes.

The intended result was different: keep reading and exporting, stop note-taking.

We can now describe the mismatch precisely. The removal achieved withdrawal of Notes, but also removed Readers and broke the retained task.

What about the leftover Export membership? It has not disappeared merely because it is currently unusable. If Readers is legitimately restored later, the account can export again without a fresh Export grant.

That is why “the action was denied” is not the same as “every permission involved was removed.”

If the business intends to retain exports, Readers needs an appropriate continuing requirement and a controlled plan. If the business intends to withdraw exports too, the residual Export membership needs its own assessment and authorized removal.

Do not remove it automatically just because a profile label vanished. First establish the intended work and any valid remaining requirements.

**Authorization** is the application's decision to permit a particular action. Memberships are inputs to that decision; account state, sign-in and resource scope can also matter.

For this example, we know the exact dependency because the application team supplied it. In another application, a residual permission could work independently. Never assume that every leftover entitlement becomes harmless when a companion entitlement is removed.

## Change one condition: a role still requires Readers

A **role** models access required for a business responsibility. It can contain access profiles or direct entitlement references. Its current assignment can therefore require access independently of a directly held profile.

Consider a separate variation of Devi's situation.

She still holds Case review and Evidence export outside roles, but she also has an enabled **Queue analyst** role. That role directly requires Readers, and it remains assigned throughout the removal. It does not require Notes.

The documented role-overlap behavior preserves access required by a current role when the overlapping access profile is revoked.

So Case review's revocation can remove Notes while Readers remains required by Queue analyst. Export is not part of the revoked profile and remains too.

With Readers and Export still present, the Evidence export profile remains complete. Devi can continue exporting in North, while note-taking is withdrawn.

```text
Independent variation:
Role Queue analyst still requires Readers

Revoke Case review
  Readers + Notes
         |
 check remaining role requirement
         |
 Readers required       Notes not required
         |                     |
 retain Readers          remove Notes
         \                     /
          resulting account
           Readers + Export
                  |
     Evidence export remains complete
```

The branches show the entitlement-level distinction in this stated variation. They do not describe private engine steps or guarantee successful delivery.

The contrast is not “two packages versus three packages.” It is a **current role requirement** versus another directly held access profile.

Do not invent a universal reference-counting rule such as “every entitlement stays until the last object mentioning it is gone.” The direct-profile example already disproves that prediction.

A profile definition containing Readers is also not proof that Devi currently has an assigned role requiring Readers. Check the actual role assignment and included access.

## What if Case review itself comes from a role?

That is a different situation again.

If Devi holds Case review through role membership, the profile cannot simply be deprovisioned directly as though it were an independent direct-profile grant. The current role is the governing requirement.

For an automatically assigned role, inspect the configured membership criteria or identity list and the current identity data used to select her. A request to revoke a criteria-assigned role is not a substitute for correcting the approved assignment requirement.

For a requested role, inspect the actual revocable role assignment and the authorized role-removal route.

In either case, do not change a shared role definition merely to remove one person's access. A definition change can affect everyone using that role.

Nor should you falsify Devi's department or job data to make a valid rule stop matching. Decide whether the person, the rule, or an approved exception needs to change, then correct the appropriate object.

Removing an assigned role and editing the access contents of a role are separate operations. **Role access removal propagation** is the setting affecting removal after specified role-definition changes. It is not a general switch that disables every explicit access revocation.

For a role-removal plan, include other assigned roles and retained work. If another role still requires an entitlement, account for that requirement instead of predicting that removing one role deletes everything it mentions.

## A lifecycle requirement can explain access returning

A **lifecycle state** represents a stage such as working or departed. Its configuration can require profiles for the identities governed by the relevant identity profile.

An **identity profile** defines how a population's identities are created and managed. It is a different object from an access profile.

Profiles assigned through a lifecycle state are enforced while the identity remains in that state. Removing the profile without changing that continuing requirement can lead to it being provisioned again.

That is a useful question when investigating an apparent regrant: what still requires the access?

Do not immediately blame a failed removal or a connector retry. First separate the original removal result from later activity and identify the continuing assignment.

This lifecycle behavior does not justify guessing a universal mixed-origin overlap algorithm. The main example explicitly excludes lifecycle assignments. When the actual case contains them, examine those current requirements and the supported removal route before applying the non-role comparison.

## Keep these operations separate

An access profile can be changed in several ways. They do not have the same scope or effect.

| Operation or condition | What you should distinguish |
|---|---|
| Revoke a directly held profile with another non-role profile sharing an entitlement | Shared entitlement can be removed; the other profile can become incomplete while its unique entitlements remain. |
| Revoke a profile while a current role requires overlapping access | The role-required access is retained; assess the remaining entitlements individually. |
| Profile itself is held through a role | Direct profile deprovisioning is not the independent removal route; examine the governing role assignment. |
| Disable the profile definition | Pauses its participation and removes associations after relevant processing, but does not itself deprovision existing entitlements. |
| Remove an entitlement reference from the definition | Changes the shared bundle. Do not equate this with explicit revocation; applicable enabled-role removal propagation can affect removal behavior. |
| Current lifecycle state still requires the profile | Account for enforcement and possible reprovisioning rather than assuming a one-time removal ends the requirement. |

For a definition edit, the population can include many holders. A revocation request concerns an identity's access, but its entitlement effects can still reach other tasks on that person's account.

Neither operation should be described merely as “remove the profile.” Name the object, action and intended native result.

The distinction also helps with the removal setting. A tenant with role-definition removal propagation off can still perform an authorized explicit revocation of a directly held profile. An unrelated toggle should not be used to explain away a rejected source operation.

## Follow the request through to evidence

An **access removal request** asks for specified access to be withdrawn. Applicable approval, account operations and target verification are separate from submitting it.

The user-facing revocation control depends on the access and assignment being revocable and the actor having the relevant authority. A submission confirmation establishes that the request was submitted, not that the source memberships disappeared.

For the original non-role example, suppose the supplied observations are:

- At 14:00 UTC, the authorized administrator submits the Case review revocation.
- At 14:04, the required removal approval completes.
- At 14:09, activity reports Readers and Notes removals successful for `cd-110707`.
- At 14:12, the application team verifies Export remains, Readers and Notes are absent, and evidence export is denied for North.

That establishes successful membership removal and an unwanted interruption to retained work.

Now take an independent failure variation: Notes removal succeeds, but Readers removal is rejected because the integration actor cannot change that membership on this account.

The native account then has Readers and Export. Evidence export still works. The requested reader removal is incomplete, even though note-taking is withdrawn.

Do not infer success or failure of each entitlement from the overall activity label alone. Inspect the specific source, account, operation and result. For a manual fulfillment route, inspect the work item and actual completion evidence instead.

A profile can be absent from the current view for more than one reason. Its absence is not a substitute for checking the account. Its continued appearance in an older record is not proof that the removal failed.

**Account aggregation** reads account data, including supported entitlement holdings, into ISC. **Identity processing** evaluates available identity information and applicable access configuration. These differ from the native write that deprovisioning performs.

Compare observation times. An ISC account record collected before 14:09 does not establish the 14:12 native state. Allow the relevant collection and evaluation to be distinguished from the reported write; do not invent one universal job order or completion delay.

## Plan withdrawal around the work that must remain

Start by writing the intended native outcome in plain language: Devi must keep North case reading and evidence export, but lose note-taking.

Then identify the exact profiles and entitlement references, current holders and assignment origins. Compare the underlying access, not just names.

Predict the removal set and retained requirements. Include roles, lifecycle requirements and the application's permission dependencies. For multiple-account cases, identify the actual account scope before using this lesson's single-account result.

If the intended withdrawal would break retained work, revise the approved access design and transition plan before carrying it out. Possible designs include separating a shared baseline from optional capabilities, or using roles to model real continuing business requirements.

For example, a new design could separate Readers as baseline access, Notes as an optional capability and Export as another optional capability. Removing the Notes-only profile would then contain no Readers reference to withdraw, provided the baseline still has a valid assignment and the application dependencies are satisfied.

That describes a future clean design, not a safe shortcut for migrating today's account. Adding a new directly held Readers-only profile and then revoking the old Case review profile still creates the non-role overlap problem. Assess the transition itself, including any required authorized correction, rather than assuming the new package protects Readers.

There is no universal redesign that makes every direct-profile overlap safe. Splitting profiles can improve clarity, but removal behavior and native dependencies still need checking.

Do not add a dummy role merely to defeat a removal. A role should express legitimate continuing access. Its ownership, membership and maintenance become part of the operating design.

When a correction is needed after an interruption, distinguish service recovery from permission cleanup. Restoring Readers for approved evidence work may reactivate an already-present Export membership. That may be intended here, but it is still an effect to recognize and verify.

Close the change only when the intended withdrawals, retained work and residual memberships have been reconciled. A request number alone cannot answer those questions.

## Test the changed conditions

### Case 1: Two direct profiles share Readers

**Facts:** A contains Readers and Notes; B contains Readers and Export. Devi holds both outside roles. Both removals for A succeed. No other requirement applies.

**Reasoning:** Readers and Notes are removed. B becomes incomplete and its association is lost; Export remains independently. Under CaseDock's stated rules, export fails without Readers. A second directly held profile did not protect the overlap.

### Case 2: A current role requires only Readers

**Facts:** The same profiles exist, but an assigned role requires Readers throughout the revocation. Notes has no continuing requirement. Its removal succeeds.

**Reasoning:** Readers is retained under the role-overlap behavior. Notes is removed, Export remains and B stays complete. Verify North export succeeds and note entry is denied. A role's mere existence would not suffice without the current assignment and access requirement.

### Case 3: The revoked profile was detected

**Facts:** A was recognized from existing memberships rather than granted through a profile request. It has no role or lifecycle assignment. Its revocation is authorized and fulfillment succeeds.

**Reasoning:** Detection does not turn revocation into label-only cleanup. Apply the stated non-role overlap behavior and inspect native removals. The original membership grant history is separate from the impact of this removal.

### Case 4: The UI says the profile is not revocable

**Facts:** A is currently granted through a role. The profile's details show it is not revocable directly. Devi's role requirement is still valid.

**Reasoning:** Do not search for a different button to bypass the governing requirement. Inspect whether the approved role assignment should continue. If access must change, plan the appropriate assignment or design correction and assess the rest of the role's access.

### Case 5: One operation fails

**Facts:** A's Notes removal succeeds; Readers removal fails. Fresh native evidence shows Readers and Export, with no Notes.

**Reasoning:** Note-taking has stopped, but the requested membership removal is only partial. B's full pair remains, and export can work. Preserve the exact rejected operation and reason. Do not count profile disappearance as proof that Readers was removed.

### Case 6: The names match but the keys do not

**Facts:** A references Production Readers. B references a different reader object on the same source with a similar display name. No entitlement references overlap.

**Reasoning:** Do not apply an overlap prediction based on names. Compare source, entitlement type and exact object references, then map native dependencies. If removing A changes no right required by B and all B rights remain, this particular shared-entitlement mechanism does not make B incomplete.

### Case 7: A profile was disabled, not revoked

**Facts:** The administrator disables A's definition. After evaluation, A is no longer associated with Devi, but no native membership removal occurred.

**Reasoning:** Do not report successful withdrawal of Notes. Disabling and revoking are different actions. Check the native memberships and use the authorized removal process if withdrawal is the intended result.

### Case 8: Access returns after a successful withdrawal

**Facts:** Separate native observations establish that a lifecycle-granted profile's memberships were removed and later added again. The current lifecycle state still requires that enabled profile.

**Reasoning:** Investigate the continuing requirement and later provisioning, not just the original request. The earlier removal can have succeeded while enforcement subsequently restored access. A final lasting withdrawal requires correcting the approved requirement, not repeatedly deleting the same memberships without addressing its cause.

## Transfer the reasoning to a paid license

A reporting system uses these two directly held profiles:

- Report design: Editor license and Draft Authors.
- Report publishing: Editor license and Publishers.

One account holds all three entitlements. There is no role, lifecycle requirement or other grant. The application requires Editor plus Publishers to publish. All access is standing.

The approved goal is to stop draft authoring while preserving publishing. Somebody proposes revoking Report design and assumes Report publishing will protect the license.

Before reading on, decide what successful removal does to the license, the publishing profile and the native publishing action. What evidence would you need afterward?

The non-role overlap prediction removes Editor and Draft Authors. Report publishing becomes incomplete. Publishers remains independently, but publishing fails under the stated application rule.

Verify the actual license operation and current native assignment, not just the profile labels. If license capacity is being reclaimed, verify the application's reported capacity as well; do not infer a paid-seat outcome from an ISC association alone.

If an independent variation adds a valid current role requiring Editor, reassess the removal using that role requirement. The answer changes because the assignment mechanism changed, not because the second profile's name sounds more permanent.

Before approving either path, reconcile the intended retained task with the predicted native result. That is the practical value of tracing overlap: you can identify a removal that technically succeeds but achieves the wrong business outcome.
