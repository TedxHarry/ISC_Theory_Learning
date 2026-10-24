# The entitlement has an owner. Do we know what it allows?

Devi, employee `100505`, uses account `pay-100505` in PayLedger Production, a fictional payroll application. Her current assignment is to compare department headcount totals. She needs summary figures, not individual salary or bank-account information.

Her account belongs to group `G-9501`. In SailPoint Identity Security Cloud, or ISC, the group appears with the display name **Payroll Reports** and description **Basic reporting access**.

Would you have enough information to decide whether Devi should keep it?

“Reporting” could mean reading a department total. It could also mean exporting every employee's payroll details. A friendly name does not settle that difference.

In this example, the application administrator checks the current PayLedger permission configuration. Membership in `G-9501` allows viewing and exporting employee-level salary and bank-account details across all payroll regions. It does not allow editing those details or releasing payroll. A separate summary-only permission exists.

All application names, records, business requirements and observed outcomes here are fictional. They give us a specific situation to reason about, not a built-in PayLedger connector or a universal ISC access policy.

## Put the owner and the access holder on different lines

An **entitlement** is an access right represented in ISC, such as a source group or application permission. A **source** is ISC's representation of the connected system or account-data collection. Here, the source represents PayLedger Production, and the entitlement represents `G-9501`.

Devi's **account** is the login record in PayLedger. Her ISC **identity** is the record representing her as a person. The account is correctly associated with her identity in this example. That association lets us discuss Devi's access, but the group membership belongs to her application account.

An **entitlement owner** is the person recorded as responsible for that access item. ISC's Primary Owner field selects an identity. It does not select the list of accounts holding the entitlement.

For `G-9501`, suppose the selected owner is the identity labelled `payroll-owner-505`. This is a fictional teaching label, not a real ISC identifier. The organization has agreed that this person is accountable for explaining the permission and maintaining its governance information.

That responsibility needs an agreement behind it. Saving someone's identity in a field does not prove that they understand the application, have accepted ownership, or can answer an access question.

The two relationships look like this:

```text
PayLedger Production
|
+-- G-9501: access object
|   |
|   +-- owner reference
|   |   -> payroll-owner-505
|   |
|   +-- description and metadata
|       -> explain and classify
|
+-- pay-100505: Devi's account
    |
    +-- member of G-9501
        -> native access policy
```

The owner-reference arrow identifies who is responsible in ISC. The membership arrow identifies an application relationship used by PayLedger's access policy. The description and metadata branch contains explanatory information. These arrows are not a processing sequence.

Notice what is missing: there is no arrow granting `payroll-owner-505` membership in `G-9501`. Assigning that identity as owner does not, by itself, give the person the payroll permission. Conversely, Devi can hold the permission without owning its definition.

Nor does entitlement ownership make someone an ISC administrator. Administrative permissions are a separate question from responsibility for an access item.

## Who should answer which question?

People often use “owner” without saying what is owned. That makes an investigation harder than it needs to be.

| Person or responsibility | What you need from them |
|---|---|
| Entitlement owner | Explain this specific access item's purpose, appropriate use and maintained meaning. |
| Source owner | Take responsibility for the connected source; help coordinate application and integration questions within that agreed responsibility. |
| Devi's manager | Explain Devi's current work and whether she needs the capability. |
| Application administrator | Confirm the actual permission configuration, scope and account relationships in PayLedger. |
| Assigned reviewer | Make the decision assigned by a particular request or certification process. |

One person can perform several of these jobs. The jobs still ask different questions.

Devi's manager knows that she only compares totals. The application administrator knows that `G-9501` permits detailed exports. The entitlement owner brings that meaning into a form other people can use. None of those facts alone establishes the final decision.

A useful owner can obtain technical evidence without personally administering the application. An administrator can explain the settings without being the right person to decide a worker's business need.

ISC also supports Additional Owners, represented by identities or a governance group. A **governance group** is a group of people organized in SailPoint to carry governance responsibilities. It is not the PayLedger group `G-9501`, which grants application access. Similar words do not make those groups interchangeable.

Additional owners can provide coverage, but their presence does not mean that every listed person must approve every request. The configured review process determines participation and approval rules.

## Write the description from what the permission does

Let's replace “Basic reporting access” with something a reviewer can actually use.

A **display name** gives the entitlement a readable label. A **description** explains the capability behind that label. For this example, a clearer display name is **Payroll detail export, all regions**.

The description could say:

> Allows viewing and exporting employee-level salary and bank-account details for all payroll regions in PayLedger Production. Intended for approved payroll reconciliation work. Does not permit editing employee payment details or releasing payroll. Summary headcount reporting uses separate access.

Each part answers a different question.

“Viewing and exporting” identifies actions. “Employee-level salary and bank-account details” identifies the information. “All payroll regions” identifies scope. The exclusions prevent a reader from treating reporting access as an editing or payment-release permission.

The final sentence distinguishes a narrower alternative. That matters because Devi's work does not require the broader capability.

The intended use is business guidance. It is not a claim that PayLedger checks a person's work assignment whenever they export a report. A description can explain who should receive access without implementing that restriction.

Avoid adding an exclusion merely because it sounds reassuring. If the application administrator has not established whether bank details are included, the description must not promise “no bank data.” Record the uncertainty, obtain the permission evidence, and then maintain the description.

Descriptions also need to say what varies. If a permission reads only the account's assigned region, say so. If it reads every region, say that instead. Do not silently substitute the employee's department for the application's actual data boundary.

Changing the display name or description in ISC does not send those changes to the source. In our example, renaming the ISC entry leaves PayLedger's group key, membership and permission configuration unchanged.

The catalog is now clearer. Devi's access is not yet narrower.

## Sensitive access is about possible harm, not just administration

**Sensitive access** means access whose use or misuse deserves special attention because of what it exposes or permits. Here, it is an organizational assessment of the capability, not the name of a universal ISC Boolean field.

Consider two permissions:

- One reads a non-confidential office directory.
- One exports individual salary and bank-account details.

Neither needs to edit data to have consequences. “Read-only” describes the absence of a write action. It does not describe the sensitivity of the information or the effect of copying it outside the application.

When you investigate an entitlement, ask what actions it permits, what data or resources they affect, and how broad that reach is. Also check whether it can administer other users or permissions. Someone who can grant themselves another permission may have more capability than their initial screen suggests.

Use native configuration and a knowledgeable application contact to establish those facts. Names such as “Reader,” “Support,” or “Basic” are clues to investigate, not proof of limited scope.

For `G-9501`, the sensitive fact is the detailed, all-region export. Devi's current headcount task does not become a justification for that export merely because her department is Finance.

This reasoning is not a legal classification of payroll data. It is a practical access decision based on the supplied work requirement and permission evidence.

## Where do ISC privilege levels fit?

**Privilege classification** assigns a privilege level to an entitlement. The **direct privilege level** is the level assigned to that entitlement itself.

Current SailPoint classification uses High, Medium and Low. Broadly, High represents the highest administrative privilege on a source, Medium represents a more limited administrative capability, and Low can represent non-administrative data access. A displayed None can also mean no classification has been assigned. It is not evidence that the entitlement permits nothing.

Classification can use a configured source-wide level, recommendations or custom criteria. Automatic assignment depends on its configuration being enabled. A manual direct-privilege override takes precedence until removed.

Why does the origin of the value matter? Suppose an old manual override remains while the organization changes its classification criteria. Looking only at the new criteria would not explain the displayed result. Check the override as well.

Do not interpret Low as “safe for everyone.” The detailed payroll export can remain sensitive even though it is not an administrative function.

**Effective privilege** is the calculated level after considering direct and inherited privilege. An entitlement hierarchy represents relationships between access objects, such as one group belonging to another. For supported, represented entitlement hierarchies, a child can inherit a higher level from a parent; the entitlement's effective level uses the higher direct or inherited level.

For example, if an entitlement has direct Low and inherits High through a represented parent, effective High is not a contradiction. Inspect the relationship and its classification. Do not lower the direct label and conclude that the inherited capability disappeared.

This calculation describes privilege information in SailPoint. It does not create a native group relationship or make PayLedger enforce a new permission. Missing hierarchy information is also not proof that the application has no indirect access path.

Check which capabilities and fields are available in your tenant and supported integration. A generic label, a legacy privileged indicator and a current direct/effective level must not be treated as interchangeable evidence.

## Keep data sensitivity separate from the privilege scale

**Metadata** is descriptive information attached to an access item. ISC supports configurable access-model metadata, including custom attributes for entitlements.

Suppose this organization creates a custom attribute called **Data sensitivity**, with a value **Restricted payroll**. Those names and that classification policy are invented for this example. They are not predefined ISC values.

The organization assigns that value to `G-9501` after confirming its data scope. This communicates a concern that “non-administrative” alone does not capture.

| Information on the entitlement | What it establishes, and what it does not |
|---|---|
| Primary Owner identifies `payroll-owner-505` | Records the responsible identity; does not establish membership or automatic review of every process. |
| Description explains all-region payroll exports | Communicates the confirmed capability; does not narrow the native permission. |
| Direct privilege is Low | Records a privilege classification; does not prove that the exported data is harmless. |
| Custom Data sensitivity is Restricted payroll | Records this organization's sensitivity assessment; does not automatically block requests or remove access. |
| Requestable status is disabled | Prevents availability through that direct request mechanism; does not establish removal of existing application membership. |

If the organization wants a metadata value to affect a decision or workflow, it must identify and validate the process that consumes it. Storing a value does not, on its own, define that behavior.

Also keep classification evidence current. A permission may gain a new export capability while retaining its old name. A previously reasonable description or assessment can then become misleading.

## Follow the information into a real decision

An **access request** asks for access to be granted. A **certification** asks an assigned reviewer to assess existing access and decide whether it should remain. Both need understandable permission information, but they are different processes.

Our situation concerns access Devi already holds. The organization investigates whether she should keep `G-9501`.

The following is a human investigation and decision flow. It is not an ISC backend execution order:

```text
Current application evidence
             |
             v
Owner confirms action and scope
             |
             v
Description and classification
             |
             v
Configured review + work need
             |
             v
       Access decision
             |
    if a change is required
             |
             v
Separate delivery and checks
             |
             v
Account + permission evidence
```

First, current application evidence establishes the capability. The owner confirms its meaning and keeps the description and classification usable. A configured review then combines that information with the person's work requirement.

A decision requiring a change starts a separate delivery and verification responsibility. **Provisioning** is the process of changing accounts or access in a target system. **Remediation** is the corrective work needed to address access that should not remain.

The arrows mean “use this evidence or result for the next responsibility.” They do not mean saving metadata automatically launches a review or that every decision provisions a change.

In the supplied example, the organization confirms that Devi needs only summary figures. It decides to replace detailed payroll access with the separate summary-only permission through its approved change process. It must plan that replacement without assuming a label edit performs it.

To establish the outcome, inspect the operation for the correct source, account and entitlement. Then obtain current application evidence that the broader capability is no longer available and that the required summary capability works. A recorded decision is evidence of intent; an account change and a permission check establish different parts of the result.

## The owner field does not choose every recipient

For entitlement access requests, reviewer selection can include owners, managers, source owners or governance groups. The relevant configuration matters, including individual entitlement settings that can supersede source or global settings.

If the effective request approval configuration selects only Manager, saving an entitlement owner does not silently add an owner approval.

If it selects Primary Owner, the selected identity participates through that configured choice. If it selects All Owners, the documented rule allows any one primary or additional owner to approve. The label does not mean unanimous approval.

Do not transfer those request rules to every certification campaign or manual task. Inspect the process involved and its actual assignee. For example, certification remediation has its own delivery path; a manual task is not necessarily sent to the person whose name appears on the entitlement.

When an owner leaves, repair the ownership record through an agreed handover. Also inspect outstanding work. A new name on the entitlement is not evidence that an existing request or task changed recipient. Check its recorded assignment and use the supported reassignment process where required.

The same discipline applies when an owner cannot answer. Ask for the missing application evidence and a suitable accountable contact. Assigning a convenient person's name to clear an empty field does not resolve the uncertainty.

## What if aggregation brings back the old description?

**Aggregation** reads source data into ISC. Entitlement aggregation reads the supported access-object details available from the source.

Descriptions can originate in that data or be maintained in ISC. Their origin affects later updates.

A manually updated entitlement name or description is protected from replacement by later aggregation. This preserves deliberate enrichment, but it also means that a corrected source description does not necessarily replace an older manual ISC description.

Suppose PayLedger's native description is updated to mention all-region exports, while ISC still shows a manually maintained “Basic reporting access.” The difference does not, by itself, establish a failed connection.

Check the exact entitlement and source, the currently returned description, the relevant aggregation result and whether the ISC field was manually updated. Then agree which system owns the explanation and maintain it through the supported method.

Do not clear manual-update protection across a source simply to make one display match. That is a different change, with a wider effect on curated information.

## Work through the evidence

### Case 1: The owner is not in the group

**Facts:** `payroll-owner-505` owns `G-9501` in ISC. Current PayLedger membership evidence shows that this person's application account is not a member. Devi's `pay-100505` is a member.

Is the owner record inconsistent?

**Reasoning:** No inconsistency follows. Ownership records responsibility; membership records access. The organization may intentionally choose an owner who can govern this permission without holding it. Verify that the person accepted the responsibility and can obtain the required evidence, rather than adding them to payroll access to make the fields “match.”

### Case 2: The description is corrected

**Facts:** The ISC description now explicitly says that `G-9501` permits all-region detailed payroll exports. No membership, native permission or provisioning operation changed.

Has Devi's access been reduced?

**Reasoning:** No. The explanation changed, not the application capability. Inspect `pay-100505` membership and PayLedger's permission rules for access evidence. The better description supports a better decision; the decision still needs a separate approved change if access is excessive.

### Case 3: Low privilege, detailed exports

**Facts:** Direct privilege is Low. Current native configuration confirms salary and bank-account exports. Devi needs only headcount totals.

Can you approve continued detailed access because it is non-administrative?

**Reasoning:** No. The level does not establish that the data is harmless or that Devi needs it. Compare the confirmed capability with her task. In this example, investigate replacement with the separate summary permission through the organization's approved process. A justified different work requirement would need its own evidence.

### Case 4: The owner never received the request

**Facts:** A new request for `G-9501` was assigned to the requester's manager. The effective approval configuration selects Manager only. The entitlement has a valid Primary Owner.

Does this prove that owner resolution failed?

**Reasoning:** No. The supplied configuration does not require owner review. The assignment is consistent with that configuration. If policy requires both business-need and permission-owner checks, correct the review design through a controlled change. Do not diagnose a broken owner reference merely from the absence of a task it was not configured to receive.

### Case 5: A new criterion does not change the level

**Facts:** Automatic privilege classification is enabled. Revised criteria would classify an entitlement as Medium. Its current direct level is High because a manual override remains.

What explains the displayed High?

**Reasoning:** The manual override has precedence. Confirm its origin and justification before deciding whether to retain or remove it. Do not repeatedly change the criteria or relabel native permissions to repair a result already explained by the override. Any change to the classification still does not change native access.

### Case 6: Two names appear under owners

**Facts:** An entitlement has one primary and one additional owner. Its request configuration selects All Owners. The primary owner approves; the additional owner has not approved.

Does the selected reviewer option require the second approval too?

**Reasoning:** No. Under the documented All Owners option, any one primary or additional owner can approve. If the organization requires separate approvals, the review configuration must express that requirement. Counting names in the ownership record is not a substitute for understanding the configured approval rule.

### Case 7: The source description changed, ISC did not

**Facts:** A successful, relevant entitlement aggregation returned the corrected source description for the exact group. The corresponding ISC description had previously been manually edited and retains its old wording.

What would you check before repeating aggregation?

**Reasoning:** Check the manual-update provenance and the agreed maintenance authority. The protected manual field explains why collection can succeed without replacing it. Repeating the same read does not resolve the ownership of the description. Update the intended explanation through the supported method after confirming its meaning.

### Case 8: The reviewer chose revoke

**Facts:** A certification records a revoke decision for Devi's `G-9501`. The supplied delivery evidence is still pending. Current PayLedger evidence still shows `pay-100505` as a member.

Is the broad access confirmed removed?

**Reasoning:** No. The decision does not establish completed remediation. Check required sign-off, meaning the reviewer's submission of their decisions, and the resulting delivery activity or manual task, then confirm current native membership and capability. The evidence does not yet tell us whether delivery failed, has not started, or remains in progress. Do not replace that uncertainty with a guessed failure.

## Try the same reasoning when the permission changes underneath the name

A fictional document system has entitlement `ExternalReviewers`, native key `R-605`. Account `doc-605` holds it. The recorded owner is active, and its description says “Read assigned project documents; no export.”

The application administrator supplies a confirmed change record: `R-605` now permits exporting all project documents. Account membership did not change. The ISC description is manually maintained and still has the old wording. A new custom metadata value, **Sensitive documents**, has been saved. No access-removal operation has occurred.

Explain what changed, what did not, and what evidence the next decision needs.

The native capability changed even though the account-to-entitlement relationship did not. The old description now understates both action and scope. A valid owner reference does not make that wording accurate.

Confirm the new permission and affected resources with the application contact, update the maintained explanation and reassess the classification. The custom value communicates the assessment; it does not remove export capability.

Then compare the account holder's actual work with the broader permission. The facts do not say what that person needs, so immediate approval or revocation is not justified by the supplied evidence alone. Obtain that requirement and follow the organization's decision process.

If the decision requires a change, identify whether the intended correction is this account's access or the shared permission definition. Those are different targets and can affect different people. Verify the chosen result in the application.

An owner gives you an accountable contact. A description gives you a usable explanation. Classification gives you another way to identify concern. You still need evidence of the real capability, a reason for the person to hold it, and a separate check that any required change actually happened.
