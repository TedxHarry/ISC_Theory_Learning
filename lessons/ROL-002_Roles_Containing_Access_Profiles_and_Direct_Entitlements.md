# What is actually inside this role?

Devi, employee `120202`, prepares and submits customer cases in CaseFlow Production. She also needs to read supporting evidence in DocumentVault Production. These are fictional applications.

The proposed ISC role has three visible access entries: two access profiles and one entitlement.

Does that mean three permissions? Three application accounts? Three account changes?

None of those conclusions follows from the entry count.

One entry can reference a profile containing multiple entitlements. Two profiles can reference the same entitlement. A direct entitlement can belong to another source. The actual account changes also depend on what is already present and whether delivery succeeds.

Let's open the references behind those three entries and follow what they mean.

All people, identifiers, permissions, configuration and observations below are fictional. The example uses a standard role, supported Provisioning capabilities, standing access without separate Just-In-Time activation, and existing accounts. It does not describe a tenant operation that was actually performed.

## Identify the objects before counting them

In SailPoint Identity Security Cloud, or ISC, a **role** groups access for a business responsibility. Its access contents can include access profiles and direct entitlement references.

An **entitlement** represents an access right in a source, such as group membership. An **access profile** names a related collection of entitlements from one source.

A **source** represents a connected system or account-data collection. A **connector** reads that system and, where supported and configured, carries out changes.

Here CaseFlow and DocumentVault have separate sources. Their supplied integrations support the membership reads and changes used in the example.

Devi's ISC **identity** represents her as a person. Her application **accounts** are `cf-120202` and `dv-120202`. **Account correlation** associates those accounts with her identity; both associations are correct.

She has only one account on each source. Both accounts are enabled, sign-in works and their assigned case workspace is North.

“Native” means the membership or permission in the application itself, rather than only its representation in ISC.

The application teams confirm these rules:

- CaseFlow `CF-8201`, Case Readers, permits reading cases in the account's assigned workspace.
- CaseFlow `CF-8202`, Case Drafts, permits drafting when the same account also has Case Readers.
- CaseFlow `CF-8203`, Case Submitters, permits submission when the same account also has Case Readers.
- DocumentVault `DV-8201`, Evidence Readers, permits reading evidence in the account's assigned workspace, without editing or publishing it.

CaseFlow groups do not grant DocumentVault access. Neither application's memberships grant every workspace.

The approved responsibility needs all four rights, not refund approval, bulk evidence export or application administration.

## Read the role's immediate references

The role is **Case intake coordinator**, which we will call `R-1202`.

Its immediate access entries are:

| Entry on the role | What that entry references |
|---|---|
| Case preparation, `AP-8202-P` | An access profile on CaseFlow Production containing Case Readers and Case Drafts. |
| Case submission, `AP-8202-S` | An access profile on CaseFlow Production containing Case Readers and Case Submitters. |
| Evidence Readers, `E-DV-8201` | The DocumentVault entitlement directly, without an intervening access profile. |

The two CaseFlow entitlement pairs use references `E-CF-8201`, `E-CF-8202` and `E-CF-8203`. These and the role/profile identifiers are teaching labels, not real ISC ID formats or an API payload.

A **reference** identifies another object. The Case preparation entry tells us which profile to inspect; that profile's contents tell us which entitlements it represents.

The role does not become the profile, and the profile is not a separate native account.

In the UI, the role's access view represents its configured access entries. A profile's entitlement view represents that profile's contents. An identity's access and account views represent different records again.

Those screens can all be correct while showing different counts, because they are showing different relationships.

```text
Role R-1202: Case intake coordinator
  |
  +-- profile AP-8202-P: Preparation
  |     +-- E-CF-8201 Readers
  |     +-- E-CF-8202 Drafts
  |
  +-- profile AP-8202-S: Submission
  |     +-- E-CF-8201 Readers
  |     +-- E-CF-8203 Submitters
  |
  +-- direct E-DV-8201 Evidence Readers

CaseFlow account: cf-120202
  Readers + Drafts + Submitters

DocumentVault account: dv-120202
  Evidence Readers
```

The branches mean “references” and “contains.” The account lines show the intended native holdings, not guaranteed results or a processing order.

No other ISC role is nested inside this structure. For the standard-role model here, trace the documented access-profile and entitlement entries; do not infer role inheritance from similar names or draw another role as a child merely because its access looks similar.

## Expand the references, then identify the distinct rights

There are three immediate entries on R-1202.

Following the profiles gives five entitlement paths:

- Preparation to Readers.
- Preparation to Drafts.
- Submission to Readers.
- Submission to Submitters.
- The role directly to Evidence Readers.

Readers appears twice, but both paths point to the same CaseFlow entitlement object.

There are therefore four distinct entitlement objects in this definition, across two sources.

This is an explanation of the configuration, not a statement about how a particular report labels its entitlement total. Identify what a screen or API field actually counts before comparing numbers.

Nor does five paths mean five native memberships. The supplied CaseFlow group model records Readers membership once on the account. A second profile reference does not create a second, stronger Readers permission.

Keep the two paths in your dependency notes anyway. They explain why the same right is included and where later changes need review.

The names alone cannot establish duplication. If one profile references a different entitlement type, source or object key, it is not the same reference even if the display labels both say Readers.

Also do not turn this set comparison into a claim about exact connector calls. The definition does not tell you how operations are grouped, retried or represented in activity. Inspect the actual account operations for that question.

## What does direct mean here?

Evidence Readers is **directly included in the role**.

That describes the path from the role to the entitlement. It does not mean somebody directly granted it to Devi outside the role.

It also does not mean ISC bypasses account selection, source support or the connector.

When this role requires Evidence Readers for Devi, the right still has to reach `dv-120202` through the supported fulfillment path.

The distinction matters during investigation. “Direct entitlement” can be used casually to describe different things: an entitlement referenced directly by a role, a separately requested entitlement, or an old native grant outside the current role.

Ask which relationship is being described.

If you inspect only the profiles inside R-1202, you will miss its direct DocumentVault right. If you inspect only the role's direct entitlement entry, you will miss the CaseFlow rights behind its profiles.

A complete contents review needs both.

## Choose packaging for a reason

A role can combine rights across sources. Each access profile still belongs to one source.

You could create a DocumentVault profile containing Evidence Readers and put that profile in R-1202. You could also keep the supported direct entitlement reference used here.

Choose based on useful meaning, reuse, ownership and maintenance. A wrapper is not compulsory just because the entitlement belongs to a role.

Conversely, do not remove every profile merely to make the role's list look flatter. A profile can give a coherent source-specific capability a maintained name and make its reuse explicit.

The Case preparation pair explains why Readers and Drafts belong together. If another responsibility needs that same package, it can reference the same profile.

If you instead make a separate profile with identical contents, it is another object. Its later edits will not automatically be the same edits as those of AP-8202-P.

Reference reuse and similar copies are different maintenance choices.

In either design, confirm the exact native rights. Replacing one direct reference with a one-entitlement profile does not by itself grant extra native capability, remove existing access or prove a safe migration. The assignment and removal effects of the transition need their own assessment.

## A shared profile is not a private copy inside the role

Suppose an enabled **Case readiness reviewer** role, `R-8299`, also references AP-8202-P.

The two roles now use the same profile object. R-8299 is not inside R-1202, and neither role automatically receives the other's remaining access.

The readiness role's use of Preparation does not give its holders Submitters or DocumentVault Evidence Readers merely because the coordinator role also uses Preparation.

Now an administrator proposes adding Case Tags, `E-CF-8204`, to AP-8202-P. In this fictional application, that right permits editing tags and requires Readers.

The coordinator business owner wants it. Has the impact review finished?

Not yet. The profile is shared with readiness reviewers. Their business need and population must be assessed too.

```text
R-1202 Coordinator      R-8299 Readiness
          \               /
           same AP-8202-P
          Readers + Drafts
                  |
       proposed addition: Case Tags
                  |
      review both role populations
                  |
      if approved and applied:
   current role requirements include Tags
                  |
    verify each account's delivery
```

The converging lines identify one shared object, not copies or nested roles. The lower arrows show the conditional change impact, not authorization to carry out that change.

For current role holders, adding a standing entitlement to the referenced profile causes it to be provisioned to enforce that role requirement after relevant evaluation. Source delivery still needs verification.

That is why a role can change in practical meaning even when nobody edited its own immediate reference list. Its referenced profile changed.

Do not extend that current-role rule to everybody who once held the profile. Previous direct requests for the profile itself and detection have different addition behavior.

**Detection** means recognizing a complete existing entitlement set and associating the profile. It is not automatically an instruction to supply later additions.

## Check enablement on the referenced object too

The main role and both profiles are enabled. Direct requests for these profiles are off; their role use does not depend on a separate request for each profile.

An enabled role does not turn a disabled included profile into an enabled one.

Consider an independent new recipient with no CaseFlow memberships. Preparation is disabled, but Submission and the role remain enabled.

Preparation's retained reference is not proof that its Drafts entitlement will be provisioned. Evaluate the enabled Submission path and direct DocumentVault path separately.

Suppose the supplied fulfillment result is Readers and Submitters on CaseFlow, and Evidence Readers on DocumentVault, with no Drafts.

Under the stated application rules, this recipient can read and submit but cannot create drafts. The role name still sounds complete; the delivered capability is not.

Now consider an existing holder who already has Drafts when Preparation is disabled.

Disabling the profile is not itself a removal of existing native entitlements. Do not predict that the old Drafts membership disappeared merely because the profile is disabled or its association is later absent.

New-recipient delivery and existing-holder retention answer different questions.

When inspecting a stored reference, therefore ask both “is this the intended object?” and “what is its current participation state?” Names and links alone do not answer the second question.

## Follow the contents into separate account operations

**Role assignment** associates a role with an identity through an applicable selection route.

For the main example, an authorized identity-list assignment selects Devi for enabled R-1202. An identity list is an explicitly maintained set of identities that should receive the role automatically. No other grant or lifecycle access requirement supplies the missing rights here.

Devi already has Readers in CaseFlow before this assignment. Drafts, Submitters and DocumentVault Evidence Readers are absent.

**Identity processing** evaluates available identity information and applicable configuration. **Provisioning** carries out required account or access changes through a supported fulfillment route.

The role definition explains the desired access. Existing holdings help explain what is missing. Neither establishes the number of successful account changes.

Consider these supplied observations, all on one date in UTC:

- At 09:00, the role and profile definitions are saved with the three entries shown above.
- At 09:10, the agreed configuration is applied through relevant identity processing.
- At 09:14, activity reports successful Drafts and Submitters additions to `cf-120202`.
- At 09:16, DocumentVault's Evidence Readers addition is rejected because the integration actor cannot modify that membership on `dv-120202`.
- At 09:20, native checks confirm Readers, Drafts and Submitters in CaseFlow. Devi can perform the corresponding North actions. DocumentVault evidence reading is denied.

The existing Readers membership is still one native membership. No new Readers grant is established by the profile-entry count.

The DocumentVault failure does not make the successful CaseFlow additions vanish. Nor does CaseFlow success prove the whole business task works. Evidence reading remains unavailable.

Do not treat the role as one cross-source transaction with an automatic all-source rollback.

Preserve the exact source, account, entitlement, operation and result. Inspect manual tasks when the supported integration uses manual fulfillment. A role entry does not guarantee an automated write.

If the actual identity has multiple accounts on a source, account-selection rules need separate attention. A profile's multiple-account configuration is not a universal rule for every direct entitlement in the role. This example deliberately uses one account per source so no such routing result is assumed.

## Saving a change is not proving its impact

A saved definition and its application to identities are separate.

The role/access-profile/application list-page Apply Changes actions recalculate those access-model configurations together for eligible identities. They are not isolated to the one object you most recently opened.

That population covers Active and Inactive (short-term) identity states, not Inactive (long-term). These ISC processing states are different from native account enablement. Devi is Active in the main example.

Before broad application, review the other saved changes and all consumers of an edited profile. Opening Devi's identity in a second tab does not make a shared definition edit a one-person change.

Removing an access reference deserves separate care. It can stop being part of the definition without proving that every old native entitlement was withdrawn.

For specified role-content changes, **Enable Role Access Removal Propagation** determines whether removal propagates, and the role must be enabled. That setting concerns those definition-change removals, not whether additions are required.

Disabling a profile, removing a profile from a role and revoking an identity's role assignment are also different actions. Do not use the phrase “remove the access” without naming which one occurred.

For an actual withdrawal, inspect the applicable settings, remaining requirements, attempted removal and native result. Do not derive a general last-reference-wins rule from the duplicate Readers paths in this example.

## Investigate by following references in both directions

When a permission is unexpectedly missing, start with the intended action and identify the right source and account.

Then trace upward: which entitlement enables it, which profile includes that entitlement, and which current role requirement uses that profile? If the role references the entitlement directly, follow that path instead.

Check the exact stored references and enabled states, then the assignment, relevant processing and delivery.

When the question is change impact, trace the other direction as well: which roles and populations use this shared profile?

That gives you two useful views of the same configuration. One explains how a person's requirement reaches a native right. The other identifies who else may be affected by an edit.

Neither direction should stop at a friendly name. Renaming Case preparation does not create a new object if the same identifier remains. Replacing it with a different similarly named profile is a different reference.

Keep those distinctions in a change record. They explain why a small-looking edit can be broad, and why a large-looking list can contain fewer distinct rights than its path count suggests.

## Work through the reference changes

### Case 1: Three role entries are counted as three permissions

**Facts:** The role has two two-entitlement profiles and one direct entitlement. Readers is the same entitlement in both profiles.

**Reasoning:** Trace five paths but four distinct entitlement objects. The count does not establish accounts, connector calls or successful writes. Identify the particular screen's count semantics before treating its number as contradictory.

### Case 2: The direct entitlement is overlooked

**Facts:** A reviewer inspects only the two included profiles and reports that R-1202 affects only CaseFlow.

**Reasoning:** The direct DocumentVault reference was omitted from the review. Inspect both immediate access-entry types and expand the profiles. Evidence Readers is role-required even though it has no profile wrapper.

### Case 3: Two roles share Preparation

**Facts:** R-1202 and R-8299 reference AP-8202-P. An edit adds Case Tags. Only the coordinator population's need has been reviewed.

**Reasoning:** The shared profile's change scope includes both consumers, not just the role currently open. Review readiness users' need before application. Their role does not inherit the coordinator's other contents; the shared profile is the connecting object.

### Case 4: The copy has a similar name

**Facts:** An independent variation uses a newly created, similarly named Preparation profile with another identifier. AP-8202-P is edited, but the role references the copy.

**Reasoning:** A matching display name does not establish a shared object. Follow the actual identifier and contents. Editing the original does not establish that the separate copy's contents changed.

### Case 5: Preparation is disabled for a new recipient

**Facts:** The new account has no memberships. Preparation is disabled; the supplied final account state has Readers and Submitters but no Drafts.

**Reasoning:** A retained disabled reference did not deliver Drafts. Under CaseFlow's stated rules, submission can work while draft creation fails. Inspect object state and account evidence rather than assuming the enabled role name guarantees every intended task.

### Case 6: The old holder still has Drafts

**Facts:** Drafts was already present before Preparation was disabled. No removal operation or other withdrawal occurred.

**Reasoning:** Disabling alone is not proof of native cleanup. Check current membership and the actual intended withdrawal path. Do not import the new-recipient missing-Drafts result into this existing-holder situation.

### Case 7: A direct path fails while profile paths succeed

**Facts:** Both CaseFlow additions succeed; the direct DocumentVault addition is rejected for insufficient permission.

**Reasoning:** Direct inclusion in the role does not bypass fulfillment. Investigate the exact rejected source/account operation, correct the authorized integration problem and verify evidence reading afterward. No automatic reversal of successful CaseFlow changes is established.

### Case 8: A profile reference is removed from the role

**Facts:** Preparation is removed from the definition. Existing native memberships have not yet been checked. Submission still references Readers, and role-removal propagation settings are unknown.

**Reasoning:** The immediate entry disappeared, but the native removal outcome is unestablished. Inspect propagation settings, enabled role state, remaining access paths and operation evidence. A definition comparison alone cannot prove that Drafts disappeared or supply a universal overlap-removal algorithm.

## Transfer this to a license and a shared directory group

A design role references a directory profile containing Portal Access and Project Files. It also directly references an Editor license on a separate source.

Another role uses the same directory profile. The proposed change adds Full Archive Export to that profile for the design team.

The license assignment is reported successful, but the directory update is still unverified.

Which parts of the intended result are established, who else needs an impact review, and what does the role's reference count fail to tell you?

The role combines source-specific profile contents with a direct entitlement on another source. The license report concerns that one operation; it does not prove the directory rights arrived or that the intended design task works.

The other role is also a consumer of the shared profile. Assess its population's need for Full Archive Export before approving the change, rather than assuming it receives the design role's whole package.

Inspect the exact references, current assignment, directory-account memberships and application scope. Verify the current license and required native action as well.

A role's short list is an entry point for that investigation. Understanding its actual access means following each reference to the right source, current requirement and account result.
