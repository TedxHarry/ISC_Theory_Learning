# Why give a set of entitlements a name?

Devi, employee `110101`, needs to enter supplier invoices in ReceiptWorks Production, a fictional application. Her account, `rw-110101`, can already read invoices for her assigned business unit. It cannot create invoice drafts.

The application team confirms that invoice intake requires two groups in the application itself, or **native groups**:

- `RW-1101`, Invoice Readers, permits reading invoices within the account's assigned business unit.
- `RW-1102`, Invoice Draft Entry, permits creating drafts within that unit, provided the account also has Invoice Readers.

A different group, `RW-1199`, permits releasing payments. Devi's intake work does not require it.

Now imagine the same requirement arriving for several new intake staff. Each request says “invoice access.” Someone has to translate those words into the right group combination every time.

One person receives only the reading group. Another receives draft entry without its reading dependency. Someone else chooses a broad finance group because the name sounds suitable.

The problem is not a shortage of groups. It is the absence of a clear, reusable description of the access needed for this piece of work.

All systems, groups, requirements and observed results below are fictional. They illustrate access-profile reasoning, not a built-in ReceiptWorks connector or operations performed in an ISC tenant.

## Keep the technical permissions, but name the useful combination

In SailPoint Identity Security Cloud, or ISC, an **entitlement** represents an access right from a source, such as a group or application permission.

A **source** represents a connected system or account-data collection in ISC. Here, it represents ReceiptWorks Production. The **connector** is the integration used to read information from that system and, where supported and configured, change it.

An **access profile** is a named bundle of related entitlements from one source. It lets the organization describe a useful access package without asking every requester to reconstruct its technical contents.

For Devi's work, the team defines **Invoice intake**, containing references to `RW-1101` and `RW-1102` from ReceiptWorks Production.

Its explanation says:

> Read invoices and create invoice drafts within the account's assigned business unit in ReceiptWorks Production. Intended for invoice-intake work. Does not include payment release.

Each reference points to a represented entitlement rather than copying its native definition. The two entitlement references remain separate. The access profile does not replace the native groups, combine their identifiers, or change what either group permits.

It gives their intended combination a business meaning that a requester, manager and application contact can discuss.

Although a bundle is useful for several related permissions, an enabled access profile can contain just one entitlement. The requirement is a meaningful, maintainable access item, not an arbitrary minimum of two groups. An enabled profile must have at least one entitlement.

## The profile exists in ISC, not as another application group

An **account** is the login record in the target application. An ISC **identity** represents the person. In this example, `rw-110101` is correctly associated with Devi's identity, and it is her only account on this source.

The profile's definition describes entitlements. The application's account holds native memberships.

```text
ISC access profile: Invoice intake
|
+-- source: ReceiptWorks Production
|
+-- entitlement references
    |
    +-- RW-1101: Invoice Readers
    |
    +-- RW-1102: Invoice Draft Entry

Native account: rw-110101
|
+-- group memberships
    -> application permission rules

Profile references are not
a new native parent group.
```

The upper branches mean “this profile references these source access items.” The lower branch means “the application uses the account's native memberships when deciding what it permits.” This is an object relationship map, not an execution sequence.

There is no new ReceiptWorks group named Invoice intake in the supplied application configuration. Creating an ISC access profile does not automatically create a native parent group or put the two groups inside it.

That distinction matters when someone asks, “Where can I find the profile in ReceiptWorks?” You would find the account and its groups there. The named bundle is maintained in ISC.

If ReceiptWorks independently has a native role also called Invoice intake, that is a different object. You must establish its native identifier and permission rules rather than treating the shared name as a connection.

The same caution applies to Test and Production. A profile referencing ReceiptWorks Test entitlements does not grant the similarly named Production permissions.

## What does the named bundle improve?

Without the bundle, a request might ask for “group RW-1101 and group RW-1102.” The requester must know the keys, and the reviewer must remember why they belong together.

With the bundle, the request can ask for Invoice intake. The selected access item already identifies the intended source and entitlement combination. A reviewer can still inspect those contents, but does not have to infer the purpose from two technical names.

The bundle also gives the organization a maintained place for a description and an owner.

An **access profile owner** is the identity recorded as responsible for that bundle. Ownership is not proof that the person holds its access, understands every native permission, or automatically receives every approval. The organization needs an accountable person who can confirm the purpose and coordinate the necessary application knowledge.

Why not simply copy a colleague's groups?

The colleague may have payment release, temporary investigation access or an old permission that no longer fits the job. A useful bundle is designed from the work requirement and confirmed permission meanings. It is not a copy of the broadest existing account.

For Invoice intake, excluding `RW-1199` is part of the design. Putting it in the profile and writing “do not release payments” in the description would not remove its native capability.

The profile makes a reviewed design reusable. It cannot make an excessive design appropriate.

## Defining the bundle and deciding who receives it are different jobs

A profile definition answers, “What access is in this package?”

An **assignment** records that an identity has an access item through a particular mechanism. The mechanism matters because it explains why the access is present and what process governs it.

Saving Invoice intake does not assign it to every employee in Finance. Selecting an owner does not make that owner a recipient. A useful name does not supply a rule for choosing people.

There are different ways the profile can become associated with a person:

An **access request** asks for access to be granted. Where the service and request configuration allow it, someone can request Invoice intake, with the configured review process deciding whether the request is approved.

A **role** describes a broader business access requirement. It can contain access profiles or entitlements. An automatically assigned role can select identities using configured criteria, such as an approved combination of job function and organizational attributes. The role can use Invoice intake as its ReceiptWorks component.

A **lifecycle state** describes an identity's organizational stage, such as active employment or termination, and can drive configured access changes. A profile included in a state's access requirements can be granted to identities in that state.

Those are different reasons for access. A state called active does not inherently mean everyone should enter invoices. That would be a business design choice expressed in the state's configuration, with a potentially much wider population than Devi's intake team.

Do not invent a department rule simply because the profile's name includes “Finance.” The assignment mechanism must actually express the intended selection.

## Enabled and requestable do not mean assigned

An **enabled** profile is available for supported use in the access model. Whether people can request it is a separate configuration question.

A **requestable** profile is made available through the configured access-request mechanism. Requestability does not mean that everyone is entitled to receive it without a decision.

For example, an organization can enable a profile for use in automated assignment without offering it as a direct request item. Conversely, making a profile available for requests does not automatically grant it to the people who can see it.

Check the request experience and capabilities available in the tenant. Do not turn a conceptual distinction into an assumed API default or a promise that every tenant exposes identical settings.

These states answer different questions:

| Observation | What you can conclude |
|---|---|
| Invoice intake is saved with two entitlement references | Its bundle definition exists. This does not establish an assignment or account change. |
| The profile is enabled | It is enabled for supported use. This does not select the recipients. |
| The profile is available for requests | A configured route exists for asking for it. This is not evidence of approval. |
| Devi's request is approved | The configured decision is complete. Native delivery still needs its own evidence. |
| Both memberships are confirmed on `rw-110101` | That account holds the specified native groups at the observation time. Investigate the assignment origin separately. |
| ReceiptWorks permits the intended draft operation | The tested account, action and resource worked under the observed conditions. This does not prove every possible permission is appropriate. |

## Follow a request into the application

This example uses **standing access**, where granted entitlements are delivered without a separate activation step. Access that must first be activated just in time is a different delivery model and is not included in this bundle.

**Provisioning** is the process of changing accounts or access in a target system. An approved profile request can drive provisioning of its entitlements through the supported connection.

That is how a business-readable package connects to native permissions. The request identifies the profile; the profile identifies the source access items; the delivery process works with the relevant target account and entitlements.

ReceiptWorks still decides whether the account can create an invoice draft. In our fictional policy, it needs both groups, and the invoice must be within the account's assigned business unit. Signing in successfully is not a substitute for those permission conditions.

Here is the distinction between delivery and a separate mechanism called detection:

```text
Request for Invoice intake
             |
             v
Configured approval decision
             |
       if approved
             |
             v
Supported account-access delivery
             |
             v
Check memberships and capability

Separate detection path:
Current collected entitlement set
             |
             v
Identity processing finds full set
             |
             v
Access profile recorded as held
```

The upper path shows the logical responsibilities for the configured request example. It does not promise a private queue order, a separate write for every listed entitlement, or successful completion.

The lower path uses **identity processing**, ISC's evaluation of an identity and the relevant access-model information. **Detection** recognizes that the collected access already satisfies a profile's entitlement set.

The paths are separate explanations, not two compulsory phases of every request.

For the main request example, assume Invoice intake is enabled, directly requestable through the configured service, and requires the configured manager approval. The source supports the necessary membership write. Devi already has an enabled ReceiptWorks account, and no account-selection ambiguity exists.

In the fictional observations:

- At 10:00 UTC, the saved profile contains `RW-1101` and `RW-1102`. Devi's account still holds only `RW-1101`.
- At 10:10 UTC, the request is approved for Devi.
- At 10:12 UTC, the recorded attempt to add `RW-1102` to `rw-110101` is rejected because the integration credential lacks the required write permission.
- At 10:15 UTC, current native evidence still shows only `RW-1101`. Reading works, but creating a draft is denied.

The **integration credential** is the account or authorization used by the connector to perform its source operations. A connector supporting membership writes does not prove that its credential currently has permission to perform this one.

What failed here?

The supplied evidence identifies a rejected membership change. It does not identify a bad business bundle or a missing second approval. The desired combination remains understandable; the delivery did not establish it.

There is also no evidence that the pre-existing reading membership was removed. Treating a profile as one request does not make its source changes an all-or-nothing transaction.

In a later fictional observation, after an approved correction to the integration's permissions and the appropriate supported retry, current evidence confirms both memberships on `rw-110101`. ReceiptWorks allows draft creation within its assigned unit. Payment release remains denied.

That closes the stated intake outcome. It does not claim a guaranteed retry time, automatic rollback, or success for every account on the source.

## A profile can appear because the access was already there

Now consider an independent variation using the same profile definition.

Before any request for Invoice intake, Devi's account already holds both native groups. The organization has collected that current membership information. The enabled profile definition is then applied through relevant identity processing.

ISC can detect that the identity has all the entitlements in the profile and record the profile as held. Recognizing a full existing set is different from sending a new grant to create that set.

So if you see Invoice intake on an identity, ask how it became associated with that identity. Do not assume it proves an approved profile request.

Detection is also not proof that the original access was justified. An administrator might have granted the groups directly, or a previous process might have supplied them. Establish the actual history and continuing business need.

Change one condition: the account holds only `RW-1101`. That is not the full two-entitlement set. Detection alone is not a rule that supplies `RW-1102` to finish the package. A separate qualifying grant mechanism would be needed to require the missing access.

Keep current native state distinct from collected state. **Aggregation** reads source data into ISC. Detection uses the information available for processing; it is not an independent live inspection of ReceiptWorks every time a profile name is displayed.

If membership changed after the relevant read, investigate the fresh source evidence, collected memberships and processing result separately.

## One source is a design boundary, not one whole job

Invoice intake references entitlements from ReceiptWorks Production. Suppose the same employee also needs a permission from DocumentStore Production to attach supporting documents.

That second source's entitlement cannot be added to this access profile as if it were another ReceiptWorks group. Use a separate source-specific access component and, where appropriate, a role to express the broader business requirement.

The boundary is the ISC source, not simply the number of business applications a user recognizes. Directory groups from one directory source can govern access to different applications. You still have to decide whether grouping them represents a sensible access package.

An **access application** is another ISC configuration object that can group a source's access profiles in the request experience and support configured password-management functions. It is not the native ReceiptWorks software, a new connector, or an extra membership automatically granted by Invoice intake.

An **identity profile** configures the source used to establish an identity population, how its identity fields are populated, and its lifecycle settings. It is not a named bundle of source access rights.

The object names can sound similar. Their responsibilities are different: the source represents the integration's data, entitlements represent source access rights, the profile groups related rights from that source, and a role can express a wider business requirement.

## Inspect the definition before celebrating the simpler request

A single request is easier to understand only if the included access is appropriate.

Before using the bundle, confirm each entitlement's native meaning, resource scope and environment. Check why the items belong together, who owns the package and who needs it.

For this example, Invoice Readers and Invoice Draft Entry are related because ReceiptWorks requires both for the approved intake task. Payment release is excluded because it permits a different action that Devi does not need.

A profile's description explains that design. It does not override the application. If `RW-1102` is later changed natively to include more operations, the profile name alone will not reveal the expanded capability.

Also plan which account receives the access. Our example has one account. Where identities have multiple accounts on a source, automatic profile provisioning can use configured account-selection criteria. Do not assume a useful bundle name chooses the correct account.

Applying new or changed access-model configuration requires relevant identity processing. Saving a definition is not evidence that all affected identities have been reevaluated, and reevaluation is not proof that every target change succeeded.

Nor is removing a name from the model a universal revocation method. For the standing entitlements in the example, disabling or deleting a profile does not itself deprovision its existing entitlements. Removing an entitlement from its definition is also not proof that existing holders lost it.

Actual removal behavior depends on the operation and assignment mechanism. Do not assume another overlapping profile always preserves a shared entitlement. Inspect the documented path and actual assignment evidence before changing access.

## Work through the evidence

### Case 1: The profile is saved, but the account is unchanged

**Facts:** Invoice intake contains both groups. No grant mechanism has been initiated for Devi. Her account still holds only `RW-1101`.

Is the missing draft-entry membership evidence that saving the profile failed?

**Reasoning:** No. Saving the definition did not supply a recipient-selection or grant decision. Verify the saved source and entitlement references to establish the definition, then identify the intended request or automatic assignment mechanism. Do not infer that every incomplete account should receive the missing group.

### Case 2: Someone added payment release “for convenience”

**Facts:** The profile now contains `RW-1199` as well as the two intake groups. Devi's approved work is still invoice intake, not payment release.

Does the familiar profile name make that addition appropriate?

**Reasoning:** No. Judge the included capability against the requirement. The native payment-release group permits a different action. Review and correct the design through the controlled process, and independently investigate any affected holders. Renaming the profile or adding an exclusion sentence does not remove a native grant.

### Case 3: The request is approved, but draft creation fails

**Facts:** The membership write for `RW-1102` was rejected. Native evidence shows only `RW-1101`; invoice reading works.

What would another approval establish?

**Reasoning:** It would not repair the supplied delivery error. Inspect the credential's required write permission and the correct source, account and operation. Use the approved correction and supported recovery process, then verify membership and application capability. Do not call the existing reader permission a rollback or a completed intake package.

### Case 4: Both groups existed before the profile request

**Facts:** No profile request was submitted. Current collected data contains both groups on Devi's only account. Relevant identity processing records Invoice intake as detected.

Does this prove ISC originally provisioned the two memberships?

**Reasoning:** No. Detection explains the profile association from the observed entitlement set. Investigate native and ISC history to establish who or what granted the groups. The continuing business need also requires evidence; recognition of a combination is not approval of its origin.

### Case 5: Only one group is present

**Facts:** Current collected data contains `RW-1101` but not `RW-1102`. No role, lifecycle requirement or approved request requires Invoice intake.

Will detection alone finish the package?

**Reasoning:** No. The observed set does not satisfy this profile. Detection does not invent the missing business grant. Determine whether the person needs the full package and which approved mechanism should provide it.

### Case 6: A second source is needed

**Facts:** Invoice intake uses ReceiptWorks Production. A document-attachment permission comes from DocumentStore Production.

Can both sources' entitlements be placed in this one profile because they support the same job?

**Reasoning:** No. The profile's entitlement bundle is source-specific. Model the second source separately and consider a role for the wider requirement. A common business purpose does not erase the source boundary.

### Case 7: It is enabled but not offered for requests

**Facts:** In this tenant's supported configuration, Invoice intake is enabled and not directly requestable. An enabled role includes it and selects the intended employees through its configured criteria.

Must direct requestability be enabled before that automatic route can use the profile?

**Reasoning:** No. Direct request availability and automatic assignment are different mechanisms. Verify the role's selection, profile configuration, processing and target results. Do not turn on a request route merely to repair an unrelated selection or provisioning problem.

### Case 8: The profile name disappeared after disabling

**Facts:** The profile containing standing entitlements is disabled. After relevant processing it no longer appears as a held profile. Current native evidence still confirms its two memberships.

Does the remaining access contradict the documented disabling behavior?

**Reasoning:** No. Disabling is not entitlement deprovisioning. Investigate the approved removal requirement and the correct assignment/removal path if access should end. A missing profile label is not evidence that native access disappeared.

## Try it with a report permission and an editing license

A fictional design platform has one source, DesignHub Production. A worker needs the Report Authors permission and an Editor license together to prepare approved project reports.

The team proposes an access profile, Project report preparation, referencing those two source entitlements. It excludes tenant administration. The worker already has Report Authors but lacks the license. No request has been approved and no automated assignment requirement has been configured.

Explain what creating the profile solves, what it does not solve, and what evidence would establish delivery.

The profile gives a maintained name and explanation to a source-specific combination. It keeps people from rebuilding the same permission-and-license list for every appropriate worker. The different native entitlement types do not, by themselves, prevent a single-source bundle.

The definition does not justify or assign the missing license. Determine the worker's need and the supported grant route. If license availability is limited, that is a delivery dependency to investigate, not a reason to call the definition complete access.

After an authorized grant, inspect the correct account's permission and license assignment and test the intended reporting operation. Approval and a readable profile name are not substitutes for those results.

If the two access items instead come from different ISC sources, separate their source-specific components. If both already exist and processing detects the profile, investigate the prior grants rather than treating detection as a newly approved request.

An access profile lets you speak about a useful access package while retaining its technical contents. The engineering responsibility is to keep that package meaningful, choose the right recipients and prove that the right native access exists.
