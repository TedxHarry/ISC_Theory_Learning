# Which entitlements actually belong in the same bundle?

Devi, employee `110202`, prepares purchase-order drafts in OrderWorks Production, a fictional application. Her account is `ow-110202`. She needs to read orders and create drafts for her assigned business unit. She does not approve orders or export the complete supplier register.

The application team identifies five access items in the same system. Three support draft preparation. The others permit approval and broad data export.

Would you put all five into one bundle because they come from the same system?

That would produce a technically convenient package, but it would also give draft preparers capabilities they do not need. The location of the access does not tell us that every item there belongs together.

All systems, records, identifiers, permission rules and observations here are fictional. The example supplies a specific integration contract so we can reason about grouping without assuming every connector supports the same access types.

## Establish what each candidate really permits

In SailPoint Identity Security Cloud, or ISC, an **entitlement** represents a source access right, such as a group membership, native role or license assignment. An **access profile** is a named bundle of related entitlements from one source.

A **source** represents a connected system or account-data collection in ISC. The **connector** is the integration used to read its data and, where supported and configured, make changes.

For this example, one source represents OrderWorks Production. Its verified integration supports collecting and assigning the groups, native roles and licenses used below.

An **entitlement type** identifies a kind of access object. Here, `groups`, `roles` and `licenses` are different types. Those names are fictional source definitions, not a promise that all sources expose these three types.

The team confirms these current native meanings:

| Source access item | Confirmed capability and grouping decision |
|---|---|
| `groups / 2201`, Order Readers | Read orders within the account's assigned business unit. Required for draft preparation. |
| `roles / 2201`, Draft Creator | Create order drafts when the required reading group and editor license are also present. Required. |
| `licenses / 2201`, Draft Editor | Enables the editing feature needed to prepare drafts. Required with the group and native role. |
| `roles / 2299`, Order Approver | Approve orders. A different responsibility, excluded from the draft-preparation package. |
| `groups / 2298`, Full Supplier Export | Export the complete supplier register. Not required for preparing assigned-unit drafts, so excluded. |

The native keys are text values. The repeated value `2201` does not make the first three rows one object. Each belongs to a different native type.

This table is the result of checking application configuration and confirming the work requirement with responsible application and business contacts. It is not a conclusion drawn from friendly names alone.

If “Draft Creator” actually included approval, we would have a different design problem. A description saying “drafts only” would not remove that native approval capability.

## Trace the references before you count the contents

An **account** is the application's login record. An ISC **identity** represents the person. In the main example, `ow-110202` is correctly associated with Devi's identity and is her only account on this source.

The proposed access profile is **Order draft preparation**. It references the first three entitlements from OrderWorks Production.

ISC has its own identifier for each represented entitlement. That identifier is different from the native value used by the application. To keep the references readable, we will call the three ISC records `E-G2201`, `E-R2201` and `E-L2201`.

These are teaching labels, not real ISC identifier formats or an API payload.

```text
Profile: Order draft preparation
Source: OrderWorks Production
|
+-- E-G2201
|   groups / "2201"
|   Order Readers
|
+-- E-R2201
|   roles / "2201"
|   Draft Creator
|
+-- E-L2201
    licenses / "2201"
    Draft Editor

Three distinct ISC references.
One source, three native types.
```

Each branch means “the profile references this represented entitlement.” None means “create a new native object” or “turn these items into a parent group.”

The profile has three entitlement references, even though the native values look identical. When checking a saved bundle, retain the exact source, type and represented record behind each selection.

Choosing the group record three times would not substitute for the role and license. Choosing similarly named Test records would not provide Production access. A count of three entries is not enough to establish the intended contents.

The profile is also not a list of other access profiles. Its entitlement list references entitlements. If you need a wider structure that combines access profiles, use the appropriate access-model object rather than treating a profile reference as an entitlement.

## “Related” means needed for the same useful outcome

For the intended draft preparers, each selected item has a reason:

The reading group lets the account inspect the orders it will work on. The creator role permits the draft action. The license enables the editing feature. OrderWorks requires the combination for this task.

Remove the group and the task's reading requirement is missing. Remove the role and the account lacks the draft action. Remove the license and the editing feature is unavailable.

That is a meaningful dependency, not simply three names that contain “Order.”

Now compare someone who only reads completed orders. That person needs the reader permission but not draft creation or the editor license. Being in the same department does not make the larger package appropriate.

Ask whether the people receiving the proposed package genuinely need every included item for the package's stated purpose. If only part of the population needs approval or broad export, those are not harmless extras for everyone else.

The principle is sometimes called **least privilege**: give the access required for the authorized work, without adding unrelated capabilities. Here, it has a concrete result. Approval and full supplier export stay outside Order draft preparation.

This does not mean every profile must contain the fewest possible entries. A one-item profile that leaves out a required dependency can be unusable. The aim is a complete, justified capability within a clear boundary.

## A dependency is not the same as a menu of alternatives

The profile's entitlement list names the access items in the package. Listing two items does not mean “give whichever one suits this person.”

Suppose OrderWorks has separate East Editor and West Editor licenses, and each draft preparer needs only their assigned region's license. Putting both licenses into one ordinary profile definition does not express “choose East or West.”

You would be defining a package containing both.

Establish how the native application scopes those alternatives and design the appropriate separate packages or supported higher-level selection. Do not rely on the recipient or a reviewer to notice an inappropriate extra license after it is already part of the bundle.

Likewise, a bundle containing a reader group and a creator role does not mean the requester can choose only the reader part. If read-only use is a different need, give it an appropriately bounded access item.

An **access request** asks for access to be granted. When an access profile is offered through a configured request route, the requested item is that profile's defined package. A reviewer needs to understand what approving that package includes.

The list is not an automatic substitute for a business rule that chooses among alternatives.

## Keep the application's conditions separate from the grouping

The application's permission logic is another layer.

OrderWorks permits draft creation only when the account has the reader group, creator role and editor license. The account must also be enabled, sign-in must succeed, and the order must belong to its assigned business unit.

The relevant **account attributes** are fields describing the account. In the supplied source data, entitlement-valued fields can contain `groups = ["2201"]`, `roles = ["2201"]` and `licenses = ["2201"]`.

The entitlement types and field mappings have been verified to represent the three native relationships correctly. The profile itself does not invent those mappings or infer the role and license from the group.

The application's conditions look like this:

```text
Account: ow-110202
|
+-- groups includes "2201"
+-- roles includes "2201"
+-- licenses includes "2201"
|
v
All three access items required
|
+ enabled target account
+ successful sign-in
+ order in assigned business unit
|
v
Native draft creation allowed
```

This is a fictional native permission dependency, not ISC's universal authorization algorithm. The branches state conditions that must hold for the action; they are not the order in which ISC writes entitlements.

Even a correctly delivered bundle does not remove the business-unit boundary. If Devi's account is assigned to West, the package does not grant draft access to an East order merely because all three entitlement values are present.

Conversely, the license by itself does not imply permission to create drafts. It enables a feature, while the other native rights and resource conditions still matter.

You need this distinction when someone says, “The profile is assigned, so why does the action fail?” Check the exact account, operation and resource rather than assuming every application restriction is a provisioning error.

## Do not invent inheritance to make the package smaller

A **native hierarchy** is a relationship within the source, such as one group belonging to another. An application may use those relationships to derive access, according to its own rules.

An access profile is a set of references in ISC. Grouping rights there does not create native hierarchy or make one referenced entitlement imply another.

In the supplied OrderWorks contract, the creator role does not automatically grant the reading group or license. All three relationships must be established. You cannot omit the reader merely because its name sounds less specialized than Draft Creator.

Now change the application design. Suppose a verified native role already grants every capability and feature needed for the task. A profile referencing that one role could be sufficient, if the integration represents and provisions it correctly and no unwanted rights are included.

The deciding evidence is the actual permission contract, not a rule that bundles must always have three entries or that broader-sounding roles always include narrower rights.

An enabled access profile needs at least one entitlement. It does not need unnecessary duplicate paths just to look complete.

## One source can mean different business applications

Suppose the same job also requires a document-upload permission. If that entitlement belongs to a separate DocumentStore Production source, it cannot simply become a fourth entitlement in the OrderWorks profile.

A **role** in ISC can express a broader business access requirement and can include access profiles or entitlements. That can provide a wider structure for separate source-specific components where the design calls for it.

Be careful with the word “role” here. OrderWorks's Draft Creator is a native role represented as an entitlement. An ISC role is a different access-model object. The native object's type label does not make it an ISC role.

The source boundary is also not a rule that a profile can serve only one business application. Directory groups from one directory source can govern permissions in multiple applications.

If the same dispatch task genuinely needs two such groups, they can be considered together within that source. Their business relationship still needs to be established. “Both are directory groups” is not enough.

Nor should you redraw integration boundaries merely to fit a convenient bundle. A connector's supported data and change operations, account relationships and ownership need a coherent design of their own.

## Agree what belongs together over time

A package needs an owner who can explain why its contents remain appropriate. That person is responsible for the bundle's purpose, not automatically a holder of all its permissions.

Ask what happens when only part of the package is needed temporarily. If a person reads orders throughout the year but edits drafts only during a short assignment, distinguish the ongoing reading need from the temporary drafting need.

One possible design keeps a clearly defined drafting package for the period it is required and models the continuing reading access separately. Another design can use different supported access items for the distinct needs. The appropriate choice depends on the actual assignment and removal mechanisms.

Do not split or combine packages under the assumption that overlapping permissions always remain when one package is removed. That is not a universal ISC removal rule.

The design needs to account for the operation that ends the temporary access, its assignment origin and the native outcome. A package that is easy to grant but difficult to remove safely needs more work.

The same applies to approval responsibilities. If draft preparation and order approval have different eligible populations or decision requirements, combining them to save one request changes what every package recipient receives. It does not merely shorten a form.

## Separate a sound design from a successful delivery

**Provisioning** changes accounts or access in a target system. **Aggregation** reads source information into ISC. **Identity processing** evaluates identity data and relevant access-model configuration.

These processes contribute different evidence. A saved profile shows its definition. Processing applies relevant configuration to identities. Delivery activities show the attempted or reported source changes. Current native records show the resulting relationships.

For this example, assume the chosen grant route is approved for Devi, the profile uses **standing access**, and the correct account is selected. Standing access is delivered without a separate just-in-time activation step.

If the group and native role are present but the license assignment fails, the intended draft capability remains incomplete under the supplied OrderWorks rule. The bundle can be well designed even though delivery hit a problem such as no license being available or the integration lacking permission.

Identify the actual error and supported recovery path. Do not add the approver role as a workaround, and do not assume a grouped request provides atomic rollback of every source operation.

When verifying the full result, inspect the exact group, native role and license on `ow-110202`. Then check draft creation on an order within the assigned unit, and confirm that excluded capabilities have not appeared through this change.

A useful comparison is:

| Evidence or test | What it helps establish |
|---|---|
| Saved profile references `E-G2201`, `E-R2201` and `E-L2201` from the intended source | The definition matches the chosen three-item package. |
| Only reader and creator are confirmed on the target account | The native access is not the complete required set; it does not yet establish the reason the license is absent. |
| A delivery event reports a rejected license assignment | The reported operation failed for the reason in that event; inspect its exact account and current relevance. |
| All three relationships are current, the account is enabled and sign-in succeeds | The supplied entitlement and account conditions are satisfied; the order's business-unit condition still needs checking. |
| Draft creation succeeds for West but is denied for East on a West-assigned account | The observations are consistent with the supplied resource boundary, not proof that the group count was wrong. |
| The definition no longer includes an extra permission | The package changed. This does not prove existing holders lost that permission. |

## Check existing holders separately when repairing a bundle

Suppose an older version of Order draft preparation included the Order Approver entitlement by mistake.

Removing it from the definition corrects the package's contents. It does not, by itself, remove that entitlement from identities that already held the profile. The removed entitlement can remain as an independent entitlement.

Investigate who received it, why they hold it now, and which approved change should remove inappropriate native access. Apply the relevant configuration through identity processing and verify the separate removal outcome where one is required.

An **assignment origin** is how the profile became associated with the identity. **Detection** means ISC recognizing a profile from an existing collected entitlement set. A **lifecycle state** describes an identity's organizational stage and can carry configured access requirements. Those origins are different from a person's earlier approved request.

Do not assume that adding a missing entitlement to a profile updates every existing holder in the same way either. Assignment through a role or lifecycle requirement and a profile held from detection or a previous direct request have different change behavior.

Before changing a shared definition, identify the affected population and origins. Testing a representative case is useful, but it is not evidence that every existing holder follows the same path.

## Work through the evidence

### Case 1: All five items belong to Production

**Facts:** All five candidate items come from OrderWorks Production. Draft preparers need only reading, draft creation and the editor feature.

Does the shared source justify including approval and full supplier export?

**Reasoning:** No. The source boundary makes the items eligible for consideration in that source's profile, not appropriate for every recipient. Compare each native capability with the stated work. Keep the unrelated rights outside the package and define their own need and decision process.

### Case 2: Every native value is 2201

**Facts:** The group, creator role and editor license each have text key `2201`. Their represented ISC records are `E-G2201`, `E-R2201` and `E-L2201`.

Is one selected group entitlement equivalent to selecting all three?

**Reasoning:** No. Source, type and represented record distinguish the objects. The group selection does not establish the role or license relationship. Inspect all three intended references, not just the repeated native value or the count of entries.

### Case 3: The package contains both regional licenses

**Facts:** A worker needs only West Editor. The ordinary profile definition contains both West Editor and East Editor. No separate selection mechanism chooses one.

Does the list express an either/or choice?

**Reasoning:** No. Both are included in the package. Establish the appropriate region-specific design rather than assuming a request or native application will discard the unneeded item. A choice among alternatives requires an actual supported selection design.

### Case 4: The fourth item belongs to DocumentStore

**Facts:** The document-upload entitlement is from DocumentStore Production, not OrderWorks Production. It supports the same purchasing job.

Can it be included directly in the OrderWorks profile?

**Reasoning:** No. Common business purpose does not remove the single-source boundary. Model that source's access separately and consider an ISC role for the wider requirement. Do not confuse the native Draft Creator role with the broader ISC role.

### Case 5: The creator sounds powerful enough

**Facts:** The native contract says Draft Creator requires the reader group and license. No hierarchy or automatic dependency grant supplies them.

Can you omit the reader and expect the creator assignment to provide it?

**Reasoning:** No. The supplied contract requires the separate relationship. Neither the name nor access-profile grouping creates inheritance. Include the justified dependency, or obtain evidence of a genuinely different native permission design before changing the package.

### Case 6: Every entitlement is present, but East fails

**Facts:** `ow-110202` holds all three required items, is enabled and signs in successfully. Its assigned business unit is West. Draft creation for a West order succeeds; an East order is denied.

Does the East denial establish a missing entitlement?

**Reasoning:** No. It is consistent with the explicit business-unit restriction. Verify the resource and account scope before diagnosing failed provisioning. Broadening access to all units would change the approved boundary, not repair the supplied three-item package.

### Case 7: Approval was removed from the definition

**Facts:** The team removes Order Approver from a previously excessive profile. Current native evidence still shows an existing holder has the approver entitlement.

Has the observed native access contradicted the definition correction?

**Reasoning:** No. Changing the definition is not the same operation as removing an existing grant. Identify the holder's requirement and assignment history, then carry out any separately approved access removal through its supported path. The new definition alone is not proof that the earlier exposure ended.

### Case 8: The person has the items across two accounts

**Facts:** In an independent variation, Devi has two OrderWorks accounts. Her ordinary account has only the reader group. Her administrative account has the creator role and editor license. The native rule evaluates each account's own rights for draft creation.

Can the ordinary account create drafts because the person holds all three items somewhere?

**Reasoning:** No. That account lacks two required relationships. The other account's rights do not combine with it under the supplied application rule. Inspect account selection and intended account use. This conclusion concerns native capability; it does not invent an ISC detection algorithm for aggregating rights across accounts.

## Try the same test across two business applications

A fictional directory source, Dispatch Directory Production, contains `D-25`, which permits viewing assigned stock in StockPortal, and `D-26`, which permits submitting dispatch drafts in ShipDesk. The verified application rules use these directory memberships. Both permissions are required for the same approved dispatch task.

A third directory group, `D-29`, provides global administration and is not needed. A separate ShipDesk API source supplies a scheduling entitlement.

Explain whether one source-specific dispatch profile can include the first two groups, whether the third belongs, and where the scheduling entitlement fits.

Two business applications do not automatically mean two ISC sources. The first two rights are represented on one directory source and support the same task, so they can form a meaningful package there.

The administration group fails the work-requirement test even though it shares the source. Exclude it.

The scheduling entitlement belongs to another source. If the job requires it, represent that access separately and use an appropriate broader access-model design. Do not add it to the directory profile merely because the end user calls both capabilities “ShipDesk access.”

Finally, confirm delivery and native behavior in each affected application. A correct directory bundle does not prove every application has consumed the expected membership information.

The useful question is not “Can I add another entitlement?” It is “Does this exact access item belong in the same source-specific package for these recipients and this purpose, and how will we prove the resulting access?”
