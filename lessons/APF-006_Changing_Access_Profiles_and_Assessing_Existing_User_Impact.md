# The profile changed. What happens to people who already have it?

Devi, employee `110606`, records incoming stock in StockLedger Production, a fictional application. Her account, `sl-110606`, can read stock records and enter receipts.

The business now wants receiving staff to add notes about delivery discrepancies. The ISC administrator adds the corresponding entitlement to the existing access profile.

The profile still has the same name. Its identifier has not changed.

Does everybody who already had that profile receive the new permission?

Before answering, we need to know why each person had the profile. An existing role requirement is not the same as an old request for the profile itself. Neither is the same as ISC recognizing a collection of permissions that was already present.

That difference determines the change's impact.

All people, records, identifiers, application rules, configurations and results below are fictional. The example uses standing access, which is available without separate Just-In-Time activation, and one correctly associated account per person on this source.

## Start with the definition, not just its name

In SailPoint Identity Security Cloud, or ISC, an **access profile** is a named bundle of related entitlements from one source. An **entitlement** represents an access right, such as membership in an application's group.

A **source** represents the system or account-data collection being managed. Its **connector** provides the integration for reading data and, where supported and configured, changing it.

Here the source represents StockLedger Production. Its supplied integration supports reading accounts and groups and adding or removing these memberships.

Devi's **identity** is ISC's representation of her as a person. Her **account** is the application's login record. **Account correlation** associates that account with the correct ISC identity. Her only StockLedger account is correctly correlated.

The application team has verified these group meanings:

| Native group | Confirmed capability in StockLedger |
|---|---|
| `SL-6601`, Stock Readers | Read stock records for the account's assigned site. |
| `SL-6602`, Receipt Entry | Enter receipts when the same account also has Stock Readers. |
| `SL-6603`, Discrepancy Notes | Add discrepancy notes when the same account also has Stock Readers. It does not approve stock adjustments. |

“Native” means in StockLedger itself, rather than just in ISC's records.

Devi's account is enabled, sign-in works, and its assigned site is North. These application conditions remain necessary; an access-profile definition does not replace them.

The profile is **Stock receiving**, which we will call `AP-6606`. Its initial definition references ISC entitlement records `E-6601` and `E-6602`, representing the first two groups.

The proposed definition adds `E-6603`. These short ISC identifiers are teaching labels, not real ID formats or an API payload.

The precise difference is:

- Before: Stock Readers and Receipt Entry.
- After: Stock Readers, Receipt Entry and Discrepancy Notes.
- No entitlement is removed in this first change.

The profile and the relevant roles and lifecycle states are enabled. The affected accounts already exist. There are no concurrent assignment changes or other grants of the new permission in the main comparison.

## Separate a wording change from an access change

Renaming Stock receiving to Stock receiving and discrepancy notes changes how a person reads the package.

Adding `E-6603` changes what the package contains.

Those are different changes, even if an administrator performs them together. A new description saying “includes discrepancy notes” cannot supply the missing entitlement reference. Conversely, adding the reference while leaving an old description unchanged can produce a technically expanded package that a reviewer misunderstands.

**Metadata** is descriptive or governance information about the object, such as its description or owner. It can matter to decisions and configured routing without being the application's permission mechanism.

A useful change record therefore separates the exact entitlement-list difference from changes to the name, description, owner, request settings or account-selection logic. Do not label every field change “cosmetic.” A request-setting change can alter who can ask for access, even when it adds no group to an existing account.

Also check whether the application's meaning of an existing group has changed. If StockLedger adds adjustment approval to Stock Readers while preserving the group key, the profile's entitlement list can remain identical while its risk changes substantially.

A reference comparison answers “which objects changed?” Application permission evidence answers “what can those objects now allow?”

## Find the profile's consumers and its holders

A **consumer**, in this discussion, is a configuration that uses this profile. For example, a role can include it, or a lifecycle state can require it.

A **holder** is a person currently associated with the profile. The person's **assignment origin** explains how that association arose.

These two inventories serve different purposes. Looking only at today's holders can miss a configured role that will select another employee tomorrow. Looking only at roles can miss people who received the profile through a direct request or detection.

A **role** models access required for a business responsibility. An automatically assigned role uses configured conditions or a membership list to select identities.

A **lifecycle state** represents a stage such as working or departed. Its configuration can require access for identities in that state within the governing identity profile. An **identity profile** defines how a population's identities are created and managed; it is not an access profile.

Devi holds Stock receiving through the enabled Receiving clerk role. She still meets that role's assignment criteria.

A second representative account, `sl-lcs`, holds the profile through a lifecycle-state requirement. That requirement also still applies.

A third, `sl-request`, holds it because somebody previously submitted and completed a direct access request for Stock receiving. An **access request** asks for a specified access item for an identity; applicable review and fulfillment are separate parts of that route.

A fourth, `sl-detect`, already had the original pair of groups. ISC recognized that complete set and associated the profile. This is **access-profile detection**, not evidence that ISC originally granted the groups.

Initially, all four accounts have Readers and Receipt Entry, but none has Discrepancy Notes. Their recorded memberships are current.

They can look similar in a current access list. Their reasons for holding the package are not interchangeable.

## Follow the addition through each origin

An existing role or lifecycle requirement can enforce the revised bundle. A previous direct request or detection does not automatically become an instruction to grant every later addition.

For the four accounts above, the documented distinction is:

| Existing origin | Effect of adding Discrepancy Notes |
|---|---|
| Current role requirement: Devi | The new standing entitlement is provisioned to enforce the requirement; delivery must still be checked. |
| Current lifecycle requirement: `sl-lcs` | The new standing entitlement is provisioned to enforce the requirement; delivery must still be checked. |
| Previous direct request for the profile: `sl-request` | No automatic addition from this definition edit. Without the full revised set, the profile is no longer retained after evaluation. |
| Detection: `sl-detect` | No automatic addition from this definition edit. Without the full revised set, the profile is no longer retained after evaluation. |

For the last two rows, losing the profile association does not mean that Readers and Receipt Entry were removed from StockLedger.

The represented bundle changed. Those accounts no longer hold its complete revised contents. The old two native memberships can still exist.

If either account already held Discrepancy Notes independently, it would meet the new complete set and could retain the revised profile without needing a new grant.

Notice the wording “previous direct request for the profile.” A person who requested a **role** containing this profile is holding it through that role. Do not classify that person as a direct-profile-request holder merely because a request appeared somewhere in the history.

The relevant question is what currently requires this profile, not whether anybody ever clicked Request.

```text
Saved profile: Readers + Entry + Notes
                  |
         relevant evaluation
                  |
       inspect current origin
          /               \
   role / lifecycle    request / detection
          |                    |
 enforce new Notes       no new Notes
          |                    |
 check source result    full revised set?
          |              /           \
 verify native use     yes           no
                    retain    lose profile
                               keep groups
```

The arrows show dependencies in this comparison, not a private engine sequence or a promise that every account completes at the same time. The request branch refers to a previous request for the access profile itself.

Just-In-Time entitlements have different activation behavior. Do not apply the example's immediate standing-membership expectation to an entitlement that must first become available for activation.

## Save, evaluate and deliver are separate events

**Identity processing** evaluates identity information and applicable access requirements. **Provisioning** performs account or access changes through the supported fulfillment route.

Saving the edited definition records the new configuration. It does not prove that every affected identity has been evaluated or that every source change succeeded.

The access-profile list's **Apply Changes** action starts identity processing across eligible identities: those with Active or Inactive (short-term) identity status, rather than Inactive (long-term). These are ISC processing statuses, not the application's account-enabled flag. All four example identities are Active. The role, access-profile and application configurations are processed together through these list-page actions.

This matters when planning a change. Opening Devi's identity in another browser tab does not turn a shared profile edit into a one-person edit. Nor should the administrator assume Apply Changes will apply only the newly edited profile while ignoring other saved access-model changes.

Consider these supplied observations, all on the same date in UTC:

- At 10:00, the revised profile is saved.
- At 10:05, the administrator starts the agreed processing.
- At 10:12, provisioning activity shows a Notes addition for Devi, rejected because the integration credential lacks update permission for her account.
- At 10:14, the Notes addition for `sl-lcs` is reported successful.
- At 10:20, native checks find Devi still has only Readers and Entry. The lifecycle account has all three groups and can add a note at its assigned site.

The two outcomes do not contradict one another. They concern different account operations.

The saved profile proves what ISC is configured to require. Devi's failed operation proves that an attempted addition did not complete successfully. Her native check establishes the observed application state.

A successful change for `sl-lcs` does not prove that Devi succeeded too.

The investigation should preserve the exact source, identity, account, entitlement, operation, result and observation time. If a supported fulfillment route uses manual work rather than a connected write, inspect that task and completion evidence instead of inventing an automated connector success.

Do not repeatedly edit the profile to compensate for a credential failure. The intended requirement may already be correct. Fixing the authorized integration problem and following the supported recovery process is different from changing the access model.

## Removing a reference is not always removing a membership

Now consider a separate proposed change, starting from a confirmed three-entitlement profile and accounts that hold all three groups.

Receipt Entry is no longer required. The administrator removes `E-6602`, leaving Readers and Discrepancy Notes.

First establish an important condition: **Enable Role Access Removal Propagation is off** in this example. This is an organization-level setting affecting removal after certain role-definition changes.

Under that condition, removing Entry from the profile does not itself reclaim the existing Entry membership. Existing users can retain it as an independent entitlement, detached from this profile.

“Independent” describes its relationship to the revised bundle. It does not mean approved, harmless, or impossible to remove.

Devi can therefore meet the new two-item profile and still have Receipt Entry in StockLedger. If the business intended to stop her entering receipts, the definition edit alone has not achieved that outcome.

Do not turn this into a universal rule that profile edits can never remove access.

With role access removal propagation enabled, removing an entitlement from a profile associated with an **enabled role** is a documented role-change removal path. Role state matters: changes made while a role is disabled are not simply propagated by enabling it later.

This setting does not control access additions. Nor does it make every detected or direct-request profile association equivalent to a role requirement.

For a removal assessment, identify the actual applicable path, role state, setting and other access requirements before predicting a native deletion. Access required by another role needs separate consideration; a familiar profile label is not a complete dependency inventory.

There are three different questions here:

- Did the definition stop including Entry?
- Did an applicable removal process initiate an Entry removal for this account?
- Did Entry actually disappear from the native account, with the intended effect?

A yes to the first question is not evidence for the other two.

## Why restoring the old definition may not undo the change

Return to the addition example, with role access removal propagation off.

Suppose the Notes addition succeeds for Devi after an authorized recovery. A later business review decides that only discrepancy specialists should have Notes, not every receiving clerk.

The administrator restores the old profile definition: Readers and Entry.

It is tempting to call this a rollback and close the change. But restoring a saved definition and reversing completed account writes are different operations.

```text
Original profile: Readers + Entry
                  |
           add Notes reference
                  |
        Notes delivered to account
                  |
      restore original definition
                  |
      propagation OFF in this example
                  |
Profile: Readers + Entry
Account: Readers + Entry + Notes
                  |
     assess authorized Notes removal
                  |
       verify actual native result
```

Here, the old definition is restored, but Notes remains on the account until an applicable removal action actually removes it.

A **compensating action** is an authorized corrective action addressing effects that have already occurred. It is not merely replacing a configuration file.

Work out which accounts received Notes, which attempts failed, which were never selected and which already had Notes for another valid reason. Removing Notes from everyone who currently has it could affect access unrelated to this change.

That is why retaining the before-state and per-account delivery evidence is practical, not paperwork. It identifies what actually needs reversing.

If propagation is enabled for an applicable enabled-role path, reassess the expected removal behavior rather than importing this off-setting outcome unchanged.

## Assess the shared change before applying it

Suppose there are 180 holders, but the change ticket mentions only Devi.

The number 180 is not an impact answer. It is the starting population for classification.

Find the exact profile object and compare its saved entitlement references before and after. Confirm the source, native meanings and intended work, including what must remain excluded.

Then identify configurations using the profile and the origins of current holders. Where origins overlap or history is incomplete, keep those cases visible rather than forcing them into a guessed category.

For each relevant group, predict a specific outcome: a required addition, no automatic addition, possible loss of the profile association, retained old memberships, or a removal dependent on the enabled-role propagation path.

Separate desired outcomes from evidence already obtained. “Should receive Notes” and “native Notes membership confirmed” belong in different columns of a change record.

Agree the application scope and review other pending configuration changes before starting broad processing. A request for a small pilot does not justify applying a shared definition to everybody without recognizing that wider effect. A separately designed pilot needs its own controlled configuration and approval.

After application, reconcile expected identities and exact account outcomes. Include exceptions, not just a success total.

If an origin is unknown, say what is unknown and collect the evidence needed to resolve it. A current screenshot cannot reconstruct a missing approval history or prove which original grant should be reversed.

## Work through the changed conditions

### Case 1: The wording promises Notes, but the list has two entries

**Facts:** The description says “read, enter receipts and add discrepancy notes.” The saved references are still only `E-6601` and `E-6602`. Devi cannot add notes.

**Reasoning:** The package wording and its contents disagree. First confirm the approved work and exact entitlement references. Do not diagnose a failed Notes write before establishing that Notes was actually part of the configured requirement.

### Case 2: The role still applies, but provisioning failed

**Facts:** Devi still holds the Receiving clerk role. The revised profile includes Notes. Her Notes addition reports a credential-permission failure.

**Reasoning:** The requirement exists, but delivery failed. Inspect the exact rejected operation and authorized credential correction, then the supported recovery and native outcome. Removing and readding the profile is not an explanation of the permission failure.

### Case 3: The old direct request succeeded

**Facts:** `sl-request` received Readers and Entry through a completed request for Stock receiving last month. Notes was not in that profile then. Notes is added today; no other requirement selects it.

**Reasoning:** The earlier completed request does not automatically deliver the later addition. After evaluation, an account missing Notes no longer satisfies the revised profile. Its previous Readers and Entry memberships can remain. A historical success is not evidence of current three-item delivery.

### Case 4: Detection survives the larger definition

**Facts:** `sl-detect` independently acquired Notes before the edit. ISC has current, correctly linked records showing all three memberships on its one account.

**Reasoning:** The revised full set is already present. Retaining the profile does not establish that the definition edit granted Notes. Establish origin from grant evidence, not from the profile's continued appearance.

### Case 5: Entry was removed, propagation is off

**Facts:** Devi has all three groups. Entry is removed from the profile. Role access removal propagation is off. No other removal action occurs.

**Reasoning:** Do not report that receipt-entry capability was reclaimed. The revised definition can exclude Entry while the account retains it independently. If withdrawal is intended, assess and carry out the applicable authorized removal, then verify the application result.

### Case 6: The relevant role path has propagation enabled

**Facts:** In an independent variation, propagation is on and the profile is associated with an enabled role. Entry is removed from the profile. No other role requires Entry.

**Reasoning:** This is a documented role-change removal path, not the off-setting case. Expect the relevant removal to be processed, then inspect the actual account operation and result. If the role had been disabled during the edit, do not assume later enablement would replay that earlier access change.

### Case 7: The same reference now permits approval

**Facts:** The saved profile references have not changed. StockLedger's application team changed Stock Readers so that its members can approve adjustments as well as read stock.

**Reasoning:** A clean profile-list comparison does not establish unchanged capability. Confirm the native permission change, affected membership population and approved duties. Renaming the profile or improving its description cannot remove the added approval permission.

### Case 8: The definition is restored after partial delivery

**Facts:** Notes succeeded for 12 accounts and failed for 3. The profile is restored to its original pair. Propagation is off; no corrective account action has occurred.

**Reasoning:** Do not report all 15 accounts as restored. Preserve the successful and failed populations separately. Assess the 12 actual grants, including any independent requirements, and verify each required compensating removal. A failed addition should not be counted as a successful grant that was later undone.

## Apply the reasoning to a license change

A design application has a profile containing a project-reader group. The proposed change adds a paid Editor license. Its enabled role still applies to 20 people.

Ten others hold the profile only through completed direct requests for the profile itself. None of the 30 accounts currently has Editor.

Assume the integration supports license assignment, the records are current, and no other route grants Editor. Available license capacity is not yet known.

Before reading on, decide:

- Which population has a requirement for the new license?
- Should the 10 previous direct-request holders be counted as new license deliveries?
- What evidence would establish the number of successful assignments?
- If the license reference is later removed with role removal propagation off, has capacity necessarily been reclaimed?

The role's 20 people are the population for required additions, not 30 confirmed successful licenses. The direct-request population does not automatically receive this later addition and, without Editor, no longer satisfies the revised bundle after evaluation.

Unknown capacity prevents a promise that all 20 assignments will succeed. Inspect per-account fulfillment results and current native license assignments, then reconcile failures and any other application conditions.

Removing the license reference with propagation off is not proof that completed license grants were reclaimed. Verify the applicable authorized removals and native capacity afterward.

The application and entitlement type changed, but the reasoning did not: exact definition, current requirement, applicable processing, account operation and native result each answer a different question.
