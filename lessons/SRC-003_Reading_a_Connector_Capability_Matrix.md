# The connector supports it. What can this source actually do?

Devi, employee number `43003`, is joining a purchasing team. Her identity already exists in SailPoint Identity Security Cloud (ISC), but she needs a FulfillHub account and its Buyer access.

The project team finds a connector that lists provisioning support. They propose automatic onboarding, access removal when her job changes, and account disabling when she leaves.

Can you approve all of that from the word “provisioning”?

Not yet. Creating an account, adding Buyer, removing Buyer and disabling the account are different operations. A connector can offer those operation types while a particular application integration supports only part of the proposed outcome.

Let's turn that broad promise into questions you can actually answer.

## Start with the change the business expects

An **identity** is ISC's representation of a person or another entity. An **account** is a record in a particular external system. Devi can have an ISC identity before she has a FulfillHub account.

An **entitlement** is an assignable access right. In this example, Buyer is represented by membership in FulfillHub's existing `buyers` group.

A **source** is ISC's configured representation of a system or collection of account data. Its **connector** provides the supported integration behavior. The **target system** is the external system being read or changed.

An **operation** is a specific action on a particular kind of object: read accounts, create an account, remove group membership, and so on.

**Aggregation** collects account or entitlement information into ISC. **Provisioning** carries out supported account or access changes.

Now translate “give Devi Buyer access” into target effects:

- Establish the correct FulfillHub account if she doesn't already have one.
- Associate the existing Buyer entitlement with that account.
- Confirm that the intended account has the expected membership.

Those aren't three names for the same action. The first creates a record; the second changes an access relationship; the last establishes what actually happened.

A supported ISC access-assignment flow can coordinate account creation when an account is missing, using the source's configured creation values. That doesn't make creation and membership change one indivisible target capability.

If creation succeeds but adding Buyer fails, Devi can have an account without the required access. The project must recognize and handle that result.

## Read the row and the column together

A **capability matrix** compares supported operations across object types or integration choices. Documentation can present the same information as a Supported Features list rather than a table.

Before interpreting a check mark, identify what its row and column mean.

“Create” under user accounts means something different from “Create” under groups. “Aggregation” means collecting information, not necessarily changing it.

The Active Directory connector's documented table illustrates this. Its User Features section separates accounts, contacts and service accounts. Enable/Disable is supported in the user-account column while the contacts column is marked N/A. You cannot move a check mark from one column into another.

That is the reading habit to keep: operation plus object type, with its conditions.

Then read the legend and notes. A mark can mean supported, unavailable, conditional or not applicable according to that document. A blank cell without an explanation is a question to resolve, not permission to assume a capability.

A footnote can require activation, a particular component or a supported environment. It belongs to the capability claim.

Also confirm the actual connector family. An ISC guide, an IdentityIQ guide and a similarly named SaaS connector aren't interchangeable implementation contracts. **SaaS** means software operated as a hosted service. A **runtime** is where integration work executes. A SaaS connector uses a cloud runtime; that doesn't mean every connector sharing the application's name works identically.

Record the selected ISC connector and deployment path before comparing its features. Check supported target versions or editions and any activation or subscription conditions relevant to the intended operation. A feature on an unrelated guide doesn't fill a gap in yours.

## Read operations tell you what ISC can observe

**Account aggregation** reads account information. It can include represented attributes and membership references, depending on the connector and configured scope.

An **attribute** is a named value, such as an account's department or enabled status. A **schema** defines the fields and object information the source represents.

**Entitlement aggregation** collects details about access objects, such as the identifier and description of a group.

These readings answer connected but different questions:

“What account does Devi have, and which group identifiers are on it?”

“What does the group identified as `buyers` represent?”

Reading the group doesn't add Devi to it. Reading a membership doesn't remove it.

The Delimited File connector makes this distinction concrete. Its documented features include a custom account schema and loading accounts and entitlements. Importing those records provides representation in ISC; it isn't an automatic write connection back to the application that produced the file.

A file can also report that an account is disabled. That records a condition. It doesn't establish that importing the file performed the external disable action.

Other reading features need their own interpretation. **Delta aggregation** reads supported changes since an earlier collection under connector-specific conditions. **Single-account retrieval** reads a particular account where supported. A connector listing account aggregation doesn't automatically promise either feature.

A more targeted read can help refresh evidence. It doesn't become a provisioning operation merely because it happens after a change.

## Write operations change different things

Let's separate the operations that appear in everyday project conversations.

**Create Account** establishes a new target account using required input values. If the application requires a location, username and account type, those values must be available in the supported creation configuration.

**Update Account** changes supported account attributes. It isn't a promise that every target field is writable. An identifier, calculated field or application-managed value can have different rules from an editable department.

**Add Entitlement** assigns an existing right to an account. For the example, it adds `buyers` membership.

**Remove Entitlement** removes an assignment. It doesn't delete the group object itself.

Creating a group is a different operation again. A project that can assign an existing group has not thereby established group-creation support. Group aggregation only established a reading capability.

**Disable Account** changes an account into the target's supported disabled condition. **Enable Account** changes it into a supported enabled condition. Don't assume that support or successful testing of one establishes the other.

**Delete Account** removes the target account through a supported delete operation. That is different from disabling it or removing one membership.

**Unlock Account** addresses a supported lock condition; **Change Password** changes the credential under a supported password operation. Neither follows automatically from account creation or profile-attribute updates.

The target's meaning matters. Disabling an account can leave its memberships stored. Removing Buyer can leave the account enabled and able to use other access. Deleting an account doesn't, without separate evidence, establish that every external session or related record has ended.

**Deprovisioning** is the removal or reduction of access. It is an outcome implemented through the appropriate supported actions, not a universal synonym for Delete Account.

When someone asks, “Does the connector support leavers?”, ask which accounts and access must change. A business event is not a single capability row.

## Keep product support separate from project readiness

For FulfillHub, assume the project selected the Web Services SaaS connector. An **API**, or application programming interface, is a supported way for software to exchange requests and results.

The connector offers operation types that can be configured against a target API. Its supported-features list includes account and entitlement reads and account/access-changing operations. It doesn't invent a missing API in the target application.

An **endpoint** is the target API address for a particular operation. **HTTP** is the request/response protocol used here. An HTTP operation's configuration identifies such details as its destination, method, input and interpretation of the response.

You don't need to write that configuration to see the dependency. A Create Account operation needs a real target behavior that creates accounts. Selecting an operation name isn't the implementation.

The following is a fictional project review, not a published FulfillHub product matrix or a real tenant test. Its API limitations, configuration and results are supplied facts.

The intended source is `FulfillHub Production`. The **integration credential** is the proof the connector uses to authenticate to the target. Here it belongs to `svc-fulfill-isc`, which is separate from Devi's employee account.

| Required operation | Connector operation type available | Evidence for this FulfillHub design |
|---|---|---|
| Read accounts | Yes | Configured; expected in-scope records collected |
| Read group details | Yes | Configured; existing buyers group represented |
| Create Account | Yes | Required inputs configured; controlled example creates the correct account |
| Update Account | Yes | Department update configured and verified; other fields not established |
| Add Entitlement | Yes | Buyers membership operation configured and verified |
| Remove Entitlement | Yes | Application has no supported membership-removal API; no automatic removal path configured |
| Disable Account | Yes | Endpoint configured, but target rejects the integration credential's disable permission |
| Delete Account | Yes | No approved target delete path configured or tested |

Read across the Remove Entitlement row. “Yes” in the middle column describes connector operation support. The last column identifies a target/application-design gap.

Read across Disable Account. The operation type and endpoint exist, but the effective target authority is insufficient.

Neither gap is explained by a broken account aggregation. Neither is fixed by collecting the same records again.

“Ready” needs an object, operation, population and verified conditions. “This integration is ready for everything” conceals the very information an engineer needs.

## What else has to be in place?

For each required operation, you need an agreed target effect, compatible support, applicable configuration, usable input, the necessary runtime path and appropriate authority.

The runtime path includes the components and connections needed to reach the intended system.

The review looks like this:

```text
[Required effect on the intended object]
                  |
[Correct connector and operation support]
                  |
[Target API and required runtime path]
                  |
[Source configuration and usable inputs]
                  |
[Appropriate target authority and scope]
                  |
[Controlled result and outcome evidence]
```

The arrows mean “also establish this dependency.” They aren't a private ISC processing pipeline, and a failure doesn't imply ISC internally runs these checks in this exact order.

Some connector designs use customer-hosted connection components; others use a cloud runtime. Additional components apply only where the chosen connector and operation require them.

For example, Active Directory's documentation identifies IQService requirements for provisioning and password operations. **IQService** is the Windows service used for supported Windows-specific integration work. The feature check mark doesn't install it or establish its secure connectivity.

FulfillHub's selected SaaS path isn't a reason to add IQService to its example. Requirements come from the chosen integration, not from the fact that both projects use ISC.

**Authentication** establishes the caller's accepted credential context. **Authorization** determines what that caller may do.

A target can accept `svc-fulfill-isc` for reads and account creation while denying account disabling. That explains how the connection and selected writes can work while another operation fails.

Use the narrow permissions needed for the approved operations and population. A blanket administrator grant isn't the default answer to a missing permission, and more privilege cannot create an API the target doesn't provide.

Even a supported, authorized operation can fail on its input. If a target requires a location for account creation and the request has no location, investigate the missing value and its configured origin. A rejected request doesn't, by itself, mean the connector lacks Create Account support.

## A provisioning setting doesn't supply missing capabilities

The source also needs its applicable provisioning configuration. A connector's product support and a source's enabled behavior are different facts.

Current source setup distinguishes read-only connections from supported deep-governance configurations, which can change access. Quick Compliance sources are documented as read-only and not provisioning-capable.

For supported sources, enabling deep-governance provisioning is a consequential configuration change. The documented conversion cannot be undone. Don't treat it as a harmless diagnostic toggle or an upgrade that implements unavailable target operations.

Likewise, an API response listing a provisioning feature describes source configuration. It isn't proof that a particular Remove Entitlement endpoint exists, that required input is correct or that the target accepted a change.

An **authoritative source** supplies accounts used to establish identities through an **identity profile**, which configures those identities and their mapped attributes. That responsibility doesn't upgrade connector writes.

An **access profile** is different: it bundles entitlements from one source. A **role** groups access for a business purpose. They can participate in access-assignment designs, but neither object grants the connector external privileges.

An **access request** asks for specified access for a person. Approval authorizes that requested access under its configured business process. The target still evaluates the technical caller performing the change.

These are connected responsibilities, not substitutes for one another.

## Follow Devi's account and membership separately

Assume an approved controlled example uses valid creation inputs and one intended account. There is no ambiguous existing-account selection.

The supplied result establishes:

- FulfillHub creates Devi's account with external identifier `fulfill-43003`.
- The configured Add Entitlement operation adds the existing `buyers` group to that account.
- Target observations confirm the correct account and membership.
- A later in-scope account read represents those facts in ISC.

Now separate change from observation:

```text
[ISC: approved Buyer assignment]
                |
[Configured create and add operations]
                |
                v
[FulfillHub: fulfill-43003 + buyers]
                |
      later supported account read
                |
                v
[ISC: collected account and membership]
```

The top arrows represent the supported change path in this example. Create and add remain distinct target effects; the box doesn't imply an all-or-nothing transaction that automatically reverses account creation if adding access fails.

The lower arrows represent later collection. Aggregation reports the result under its actual read scope and time. It isn't what granted Buyer.

**Account correlation** associates a collected account with the appropriate ISC identity using the configured matching arrangement. Correct correlation helps place the account under Devi, but it doesn't provide the missing removal API or a disable privilege.

The **user interface**, or UI, can show the collected account and access, while Account Activity or provisioning details describe attempted changes and reported results. Check the action, recipient, source, stage and any errors, then compare with the intended target state.

A success label without that context isn't enough to establish every onboarding step. Nor does an old collected account view disprove a later target change.

## Now change one business requirement

Later, Devi moves to a purchasing-support role. She still needs FulfillHub but must lose Buyer.

Creating the account again would target the wrong effect. Disabling the whole account would remove more usability than the requirement calls for. Updating department wouldn't, in this supplied application design, remove `buyers` membership.

The required effect is removal of one existing assignment from `fulfill-43003`.

The connector framework offers Remove Entitlement, but FulfillHub has no supported API for that action in our example. The application's administrator can remove it through the application's administrative interface.

The project therefore needs an explicitly designed and approved fulfillment route, or must leave this requirement unresolved. It cannot honestly promise automatic removal through the configured connector.

**Manual fulfillment** means a responsible person performs the target change. A supported ticket integration can coordinate a change through a service-management system, but creating or closing a ticket isn't itself the external membership change.

Do not assume a failed direct operation automatically becomes the right manual task. The route, responsibility, timing and verification need configuration and agreement.

After the administrator's authorized removal, the evidence should identify `fulfill-43003`, `buyers`, the actual target result and relevant time. A subsequent supported read can update ISC's representation. A task marked complete is an assertion to check, not independent measurement of membership.

A **certification** is an access review in which a reviewer decides whether access should remain. A revoke decision also needs an effective fulfillment path. Governance can record that Buyer should be removed without a missing target API suddenly appearing.

## A permission failure is a different repair

Consider the Disable Account row separately. The target provides a supported disable endpoint, and the source operation is configured.

The supplied response is an HTTP `403`, with a target error explaining that `svc-fulfill-isc` lacks the disable privilege for this account. Target inspection shows the account remains enabled.

Here, there is an implemented operation path but inadequate authority for the attempted action. That differs from the absent membership-removal API.

The responsible owners can assess a narrowly scoped privilege correction and controlled testing. A new credential or permission change isn't proof that the earlier disable request has been replayed or completed.

Before recovery, confirm that disabling the account is still authorized, establish its current state and use the supported recovery path. Don't blindly duplicate account creation or replay unrelated successful changes.

A bare `403` in another system wouldn't establish this exact cause. The conclusion here depends on the supplied target message, caller, destination and account evidence.

Capability review helps you choose the right question. Is the operation unsupported, not implemented, unauthorized, using invalid input, failing at runtime, or simply untested? Those findings call for different next actions.

## Convert “integrated” into an honest project statement

For this design, you can say that account and group reads, account creation, the tested department update and Buyer assignment have supporting evidence.

You cannot yet say automatic Buyer removal works. Its target path is absent. You cannot say automatic disabling is ready; the attempted operation was denied. Delete Account is unconfigured and untested, not established by another operation's success.

The gap doesn't necessarily invalidate every read use case. A deliberately scoped read-only project can provide visibility without promising automated changes.

For a disconnected file-fed source, ISC supports manual provisioning tasks rather than a direct connector write. That is a different operating design with accountable fulfillment, not evidence that file import can edit the original application.

If automatic removal is a launch requirement, the project hasn't met it merely because onboarding succeeds. Agree the requirement, supported route, owner and validation evidence before calling that scope complete.

Keep an operation-level record: intended object and effect, selected connector, documented support and conditions, target behavior, configuration, required inputs, technical authority, test evidence and any remaining gap.

That record is useful when someone changes a credential, adds a population or updates an application. “It worked last year” doesn't identify which operation and conditions still apply.

## Try the review with changed evidence

### 1. Existing groups appear in ISC

An integration reads account memberships and group descriptions. The project now needs to create a new target group.

Does the successful read establish group-creation support?

**Worked reasoning:** No. It establishes reading the supplied objects under that scope. Creating a group changes a different object through a different operation. Check explicit group-creation support and its target/configuration requirements; membership assignment isn't group creation either.

### 2. Accounts can be created, but disable is denied

The correct account was created. A later disable attempt uses the same integration credential, receives a target permission error and leaves the account enabled.

Should the team declare that the connector has no disable capability?

**Worked reasoning:** Not from those facts. Verify the documented operation, its configuration and target error. In the supplied situation, the action is supported and implemented but lacks effective authority. Creation success doesn't imply disable permission, and collecting the account again doesn't grant it.

### 3. A connector supports removal, but the application has no API

The connector offers Remove Entitlement. The target exposes no supported membership-removal API, and no other approved automatic route has been implemented.

Can selecting that operation type complete automatic revocation?

**Worked reasoning:** No. The connector needs a real supported target behavior. Establish an approved alternative fulfillment route or record the requirement as unresolved. Don't promise automatic manual-task fallback or treat a business approval as a technical endpoint.

### 4. A file reports a disabled account

A new file contains a disabled-status value. ISC represents that value after import. No external change evidence is supplied.

Does that prove importing the file disabled the original account?

**Worked reasoning:** No. The file provided an observation or assertion that ISC represented. Check the actual target state and account-changing activity separately. A represented disabled value isn't evidence that the import performed a target write.

### 5. One field updates successfully

A source updates department. A new requirement asks it to change an application-managed account identifier.

Does Update Account support settle the new requirement?

**Worked reasoning:** No. Determine whether that particular field is writable through the selected connector and target API, with the required conditions and authority. A verified department change isn't a test of every attribute. Identifier changes also need their own relationship and impact review.

### 6. A supported feature hasn't been tested

The correct guide lists Enable Account. The source's enable configuration and recovery behavior haven't been inspected or exercised.

Should the project mark it unsupported or ready?

**Worked reasoning:** Neither conclusion follows. Product support is documented; project readiness is unverified. Inspect the necessary target behavior and source configuration, then obtain appropriate controlled evidence. Keep “supported,” “configured” and “verified” as separate findings.

### 7. Approval succeeded, but Buyer remains

A reviewer decides to revoke Buyer. The supplied target observation still shows `buyers` on `fulfill-43003`, and no successful removal evidence exists.

Has the capability requirement been satisfied by the decision?

**Worked reasoning:** No. The decision establishes what should happen, not a completed target change. Follow the configured fulfillment route and its accountable owner, resolve the delivery gap and verify the intended membership result. Don't infer account deletion, session termination or removal of unrelated access.

## Review a different application's proposal

A payroll project says: “The connector loads accounts, so we'll use it for new-account creation, salary-field updates, disabling, password reset and deletion. The successful connection test proves all of it.”

What would you ask before approving the proposal?

**Worked reasoning:** Split the promised effects into operations on specific objects and fields. Check the selected ISC connector's actual feature documentation, notes, supported target environment and any required activation or components.

For every proposed write, establish the target's supported behavior, source configuration, required input and appropriate authority. A successful connection test establishes only what that test actually exercises; it isn't a substitute for operation-specific evidence.

Treat sensitive salary fields and destructive deletion as explicit scope and authorization questions, not ordinary consequences of account-read support. Check where passwords are actually managed before assuming a reset belongs on the payroll account.

Record each capability as documented, configured, verified, conditional or unresolved, with evidence. If a required effect lacks a supported implementation, agree an accountable alternative or keep that requirement open.

Then explain the distinction to the project owner: “The matrix tells us which operations the selected connector offers on which objects. Our design and tests establish which of those operations this source can perform against this target, under these conditions. We still need evidence that the requested effect actually occurred.”
