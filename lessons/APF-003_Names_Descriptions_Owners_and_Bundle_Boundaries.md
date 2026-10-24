# What should a profile's name, description and owner tell you?

Devi, employee `110303`, reviews case evidence in EvidenceHub Production, a fictional application. Her account is `eh-110303`. Her work requires reading cases in her assigned queue and adding review notes. It does not require bulk export or deleting evidence.

The access catalog offers a package called **Case support**. Its description says “Standard access for the team.” The owner field contains Leela's name.

Would you know whether that package fits Devi's work?

The label tells you very little. You cannot tell whether “support” means reading evidence, changing cases or administering the application. “Standard” does not identify the permissions. Leela's name identifies a responsible person, but it does not explain what the package permits.

Before approving, assigning or changing that access, you need a more dependable account of what it contains and why.

All people, records, identifiers, permission rules and observations below are fictional. The application rules are supplied facts, not claims about every connector or application.

## Start with the access behind the label

In SailPoint Identity Security Cloud, or ISC, an **entitlement** represents a source access right, such as membership in an application group. An **access profile** is a named bundle of related entitlements from one source.

A **source** represents a connected system or account-data collection in ISC. Its **connector** is the integration that reads data and, where supported and configured, makes changes.

Here, the EvidenceHub Production source represents the live application. A separate EvidenceHub Test source represents its test environment. Similar names do not make those two sources interchangeable.

The application team verifies these Production rights:

| Native group | Confirmed behavior |
|---|---|
| `EH-3301`, Case Readers | Read case evidence within the account's assigned queue. |
| `EH-3302`, Review Notes | Add review notes when the same account also has Case Readers. Does not permit changing or deleting the evidence. |
| `EH-3399`, Bulk Export | Export case evidence across all queues. Not required for Devi's review work. |

“Native” means in the application itself. The first two rows provide the intended review capability. The third crosses a different data boundary.

The main example uses ordinary standing access: granted memberships remain until an applicable change removes them, rather than needing a separate activation for each use. The fictional integration supports collecting and assigning these groups.

The profile should reference the first two entitlements, not the export entitlement. We will call the represented ISC entitlement records `E-3301` and `E-3302`, and the profile `AP-3303`. These are readable teaching labels, not actual ISC ID formats or an API payload.

An **account** is the application's login record. An ISC **identity** represents the person. In this example, Devi's identity is correctly associated with `eh-110303`, her only EvidenceHub Production account. That account's assigned queue is West.

Those facts let us explain both the package and its limits. Membership supplies the capabilities; the application's queue rule restricts which cases the account can use them on.

## Give the package a name someone can choose correctly

A useful name helps a person distinguish this package from nearby choices.

Compare **Case support** with **EvidenceHub \| Case review \| Production**.

The second name identifies the system, the work and the environment. The separators are a naming convention for this example, not required ISC syntax. Choose a consistent convention that helps your organization distinguish real choices.

Do not copy a department name into every package simply because that department requested the first one. If Compliance and Quality employees need exactly the same case-review capability, **Compliance standard** can mislead Quality staff and encourage duplicate packages.

Conversely, two packages should not look identical if one permits only reading and the other permits reading plus bulk export. The difference affects the decision, so make it visible.

Names should be unique and descriptive. That does not mean they need to contain every entitlement key, every owner or the entire eligibility policy. Put the purpose in the name; explain the necessary detail in the description.

Do not put “West only” into the name unless the actual package and native controls justify that meaning. In this example, the two memberships use whichever queue is assigned to the account. They are not intrinsically West-specific.

For Devi, that queue happens to be West. For another account, it could be North. Calling the same package **West case review** would imply a boundary that the selected groups do not themselves establish.

The source reference, entitlement references and account/application controls settle the technical question. The name needs to describe that reality.

## Write the description from a decision someone must make

Here is a usable description for the verified two-entitlement package:

> Read case evidence and add review notes in EvidenceHub Production for cases within the account's assigned queue. Intended for staff with an approved case-review responsibility. Includes Case Readers and Review Notes. Does not provide bulk export, evidence deletion or application administration. Queue assignment is managed separately in EvidenceHub.

Each part answers a practical question.

“Read case evidence and add review notes” tells the requester what work the access supports. “Within the account's assigned queue” gives the data scope. “Production” distinguishes live information from test data.

The intended-use sentence helps a reviewer compare the recipient's work with the package purpose. The exclusions distinguish this bundle from more privileged choices. The final sentence explains a dependency the package does not manage.

Why mention queue assignment separately?

Suppose Devi has both groups but the application account is assigned to the wrong queue. Granting the same groups again does not correct that account field. You would investigate the queue assignment and its approved maintenance process.

Also consider what the description does not say. It does not promise that anyone in a department automatically receives access. It does not say that naming Leela as owner grants her the groups. It does not treat a sentence as an application permission rule.

Keep operational details that change frequently, such as support rosters and individual phone numbers, in an appropriate maintained record. The description should remain useful when someone else takes over support. Do not hide essential access meaning in a document the reviewer must somehow discover.

## The description explains a boundary. It does not enforce it

Let's separate two questions:

Who should receive the package?

What may an account do after receiving its entitlements?

The first is an access-decision question. It depends on the organization's requirement and the actual assignment or request controls. Writing “For reviewers only” does not create a technical rule selecting reviewers.

The second is an application-authorization question. **Authorization** is the application's decision to allow or deny an action on a resource. Here it depends on the account's memberships and assigned queue, along with successful sign-in and an enabled account.

The profile description supplies neither a membership nor a queue restriction.

```text
Profile AP-3303
|
+-- Name and description
|   Explain purpose and limits
|
+-- Source and entitlement references
|   EvidenceHub Production
|   E-3301 -> group EH-3301
|   E-3302 -> group EH-3302
|
+-- Primary owner: Leela
    Accountable for this package

Separate native application checks:
account rights + assigned queue
Not taken from description text.
```

The branches show different information on the same profile, not a processing sequence. The arrows from entitlement records to group keys mean “represents this native access item.” They do not mean the profile creates those native groups.

The application checks are separate because it is the application that permits reading and note-writing. It does not read the profile's descriptive sentence to decide whether a case belongs to West.

Now change one fact. The selected group unexpectedly permits reading every queue.

You cannot repair that exposure by replacing “assigned queue” with a more reassuring sentence. First establish whether the group should have narrower native permissions or whether the package should use a different entitlement. Review the affected accounts and the authorized correction.

The description must match the verified result. It cannot substitute for it.

The same applies to contextual metadata, which means descriptive information about an access item. A custom label such as `Audience = Reviewers` does not, by itself, configure recipient selection. If a separate control uses that metadata, inspect that control and its conditions. Do not infer enforcement from the label alone.

## What responsibility does the owner accept?

The **primary owner** is the identity recorded as owning the profile. ISC also supports additional owners, selected as identities or a governance group.

A **governance group** is a group of ISC users who can perform configured governance work, such as reviewing whether access is appropriate. It is not the application's Case Readers group. Joining the governance group and receiving a native application membership are different relationships.

For the main example, Leela is primary owner and Anil is an additional owner. They have accepted responsibility for maintaining the package's meaning and responding to the work assigned to them.

That acceptance is an organizational responsibility, not something a field can prove by itself.

Leela should be able to answer: Why do these entitlements belong together? What work justifies them? Do the description and exclusions still match the application? Who can confirm a native permission change? Which users or other access-model objects depend on the package?

She does not need to personally operate every connected system to be accountable for those answers. She needs reliable contacts and an agreed maintenance process.

Do not collapse every kind of ownership into hers:

- The profile owner is responsible for the bundle as a whole.
- An entitlement owner is responsible for a particular represented access right. The two entitlement owners need not be the profile owner.
- The source's responsible team handles the integration and system-specific questions allocated to it.
- Devi's manager can confirm her work need without knowing every native permission detail.

These are responsibility distinctions, not a mandatory staffing arrangement. One person can hold more than one role. Recording the same person in multiple fields does not make the underlying responsibilities identical.

Nor does profile ownership automatically grant application access or make someone an ISC administrator. Administrative permissions are configured separately. In this example, Leela has no EvidenceHub account and does not need one merely because she owns the package.

Check that the owner reference selects the intended identity, not just a familiar display name. A person who has left, an unmaintained team or an incorrectly selected identity is not dependable decision coverage.

## Ownership and approval routing are different configurations

An **access request** asks for access to be given to a recipient. An **approval** is a decision that the request may proceed. **Provisioning** is the separate work of creating or changing the account's access through a supported integration or manual process.

The owner field is not itself an approval chain.

For this example, profile requests have an explicitly configured reviewer sequence: first **Manager**, then **Primary Owner**. Manager means the manager of the person receiving the access.

Devi's manager considers whether case review belongs to her current work. After that approval, Leela considers whether this package is appropriate. If either required stage rejects the request, the supplied chain does not authorize it to continue as an approved request.

```text
Request for AP-3303
|
v
Configured chain in this example:
Manager
  |
  | approves
  v
Primary Owner: Leela
  |
  | approves
  v
Continue toward access delivery

Different configured option:
All Owners: Leela or Anil
  |
  | either one approves
  v
Continue toward access delivery

Ownership alone starts neither path.
```

The second path is an alternative configuration, not another stage appended to the first. **All Owners** allows any one primary or additional owner to approve that reviewer stage. It does not mean every owner must approve.

If the requirement is two separate decisions, configure the required stages explicitly. Do not rely on the English word “All” to create unanimity.

Anil's additional-owner reference does not make him a required approver in the main Manager-then-Primary-Owner chain. A Manager-only chain would not automatically add Leela either.

These are profile-request examples. A requested ISC role, a broader access-model object that can include profiles, uses its own request approval process. Access delivered by automatic role assignment or a configured lifecycle state does not invoke this profile-request approval chain. A **lifecycle state** records an organizational stage, such as prehire or active employment, and can have configured access requirements.

Also, turning off local Require Approval is not proof that all approval is bypassed; global approval configuration can still apply.

A **certification** is a review of whether existing access should be retained. Its configured reviewer assignment is a separate question. Do not carry this profile-request chain into every certification or manual task by assumption.

The practical check is always: what kind of work is this, and what configuration actually assigns the decision?

## Keep the package small enough to explain, but complete enough to use

A sensible boundary follows a meaningful capability.

Case Readers and Review Notes belong together because reviewers need both for the supplied work. Bulk Export has a broader data scope and a different justification. It should not enter the package simply because all three items come from EvidenceHub Production.

Do not split every entitlement into its own profile merely to keep the list short. That would make recipients assemble pieces of one capability and leave reviewers checking incomplete combinations. A one-entitlement profile can be useful when that entitlement already supplies the complete intended capability.

At the other extreme, a package called **All case-team access** can conceal unrelated work, different data exposure and responsibilities that no single owner can explain.

Use meaningful differences to decide whether separate packages are justified. Examples include reading versus exporting, Production versus Test, and ordinary review versus application administration.

A department difference alone does not prove the permissions differ. An owner difference alone does not prove they should be combined. Ask what access every recipient of this particular package actually needs.

If the desired task also needs another source, do not disguise that cross-source requirement with a longer profile description. Keep source-specific components separate and consider an appropriate broader ISC role. A business task can cross systems; an access profile remains source-specific.

## When something changes, identify which layer needs attention

Suppose the team renames **Case support** to **EvidenceHub \| Case review \| Production**, corrects the description and records a replacement owner.

The profile's ISC ID identifies the existing record. Check that ID when tracing the rename; do not treat the changed display name as proof that a new package was created. Conversely, a newly created profile with the old name is not automatically the same object.

A native permission change is different. If EvidenceHub adds bulk export to `EH-3301`, the profile's references can remain unchanged while the capability becomes broader. The owner must revisit the description and design because the meaning behind one referenced entitlement changed.

Use the evidence that addresses the specific change:

| Observation | What it establishes, and what still needs checking |
|---|---|
| Profile ID, revised name and saved description | Which ISC definition was edited. Not a new native restriction or a completed grant. |
| Owner references and actual reviewer configuration | Who is recorded as responsible and which reviewer categories are configured. Inspect the live work item to establish its assignees. |
| Entitlement references and native permission configuration | Which access items are packaged and what those items permit. Check whether actual contents support the claimed exclusions. |
| Recipient account, provisioning activity and current application evidence | The selected operation, reported result and observed access. An approval or clear description alone does not establish delivery. |

For identity effects of changed access-model configuration, account for the relevant identity processing, which reevaluates identities against configured requirements. Saving a record and observing the resulting access are different events. This does not mean every wording correction should cause a native membership change.

If an excessive entitlement is removed from the profile definition, existing holders do not lose that entitlement merely because its reference was removed. Assess their current need and assignment history, then use the appropriate separately authorized removal path and verify the native outcome.

Do not promise that a corrected definition automatically cleans up every previous grant.

## Hand ownership over without abandoning existing work

Leela is moving to another team. The package remains necessary.

A proper handover establishes who accepts responsibility, confirms the actual owner references, checks the package contents and wording, and reviews the processes that depend on ownership.

Pending work deserves its own inspection. If an existing approval still shows Leela as assignee, the new owner field is not evidence that the task has moved. Use the supported reassignment or administration mechanism for that work and confirm the result.

A certification and a manual provisioning task can have different reassignment mechanisms. Do not assume that changing one ownership field rewrites every active assignment.

If a governance group provides additional coverage, maintain its membership. Governance-group membership does not automatically update merely because a member's lifecycle state becomes inactive or the identity is disabled. A group name that sounds like a functioning team is not proof of current coverage.

Before closing the handover, check a representative decision path against the intended configuration and inspect outstanding work. Replacing a name is only part of transferring responsibility.

## Work through the evidence

### Case 1: The description says West only

**Facts:** The profile contains Case Readers and Review Notes. The native rules use each account's assigned queue. The description is changed to “West only,” but no application or selection configuration changes.

Has the edit restricted the package to West?

**Reasoning:** No. The text does not alter recipient selection or native queue assignment. Verify both separately. Correct the description to match the actual boundary, or make an approved technical change that genuinely establishes the intended West-specific design.

### Case 2: Leela becomes primary owner

**Facts:** Leela's identity is saved as primary owner. She has no EvidenceHub account. No access assignment is submitted.

Should the ownership edit give her Case Readers and Review Notes?

**Reasoning:** No. The field records responsibility for the package, not an account membership. If Leela needs application access for separate work, establish that need and use the relevant assignment process.

### Case 3: The request uses Manager only

**Facts:** The configured profile-request reviewer is Manager. Leela is primary owner and Anil is additional owner. No other owner-review stage is supplied.

Does their ownership add two more required approvals?

**Reasoning:** No. Inspect the actual configured chain. Ownership makes them available for owner-based configuration; it does not insert reviewer stages into this Manager-only example.

### Case 4: All Owners has two people

**Facts:** A different configuration uses one All Owners stage. Leela and Anil are the only owners. Anil approves that stage.

Must Leela also approve because the option says All Owners?

**Reasoning:** No. Any one primary or additional owner can approve this stage. If the policy requires separate decisions, the configuration must express them. Do not infer a second decision from the option's name.

### Case 5: The package keeps its ID after a rename

**Facts:** Before and after the rename, the profile is `AP-3303` with the same source and two entitlement references. Only its name and wording change.

Does a new label prove new native access was delivered?

**Reasoning:** No. The supplied record evidence shows a naming and description edit to the same profile. Native access requires separate account and operation evidence. Preserve the ID when tracing historical references rather than matching names alone.

### Case 6: The entitlement now permits export

**Facts:** The native application adds bulk export to `EH-3301`. The profile still references `E-3301` and `E-3302`; its description still says “Does not provide bulk export.”

Is the unchanged entitlement list enough to keep that exclusion trustworthy?

**Reasoning:** No. The capability behind a referenced entitlement changed. Confirm the native permission change, assess affected holders, and review the package and description. Renaming the profile does not remove export. An approved correction must address the native right or the selected access design.

### Case 7: The new owner cannot find an old approval

**Facts:** Anil replaces Leela as primary owner. An already pending approval still records Leela as assignee.

Can the engineer close the handover because the profile owner is correct?

**Reasoning:** No. Responsibility metadata and existing task assignment are separate evidence. Inspect and, where authorized, reassign that work through its supported mechanism. Confirm who can act on the pending item rather than assuming retroactive rerouting.

### Case 8: Export was removed from the definition

**Facts:** An older package wrongly included `EH-3399`. The team removes its reference and corrects the description. Current native evidence still shows an existing holder has `EH-3399`.

Has correcting the package proved that the holder can no longer export?

**Reasoning:** No. Removing an entitlement from a profile does not itself remove that entitlement from existing holders. Investigate the holder's requirement and grant history, arrange any separately approved removal, and verify the application's resulting access. The definition repair and the holder repair are different work.

## Try the same reasoning with a reporting package

A fictional reporting application has two proposed profiles on the same Production source. One permits reading assigned-region summary reports. The other permits exporting all-region detailed records.

The team proposes calling both **Reporting access**, giving both the description “For Finance,” and recording the reporting platform's integration engineer as owner. The engineer can maintain the connector but has not accepted responsibility for deciding appropriate data use.

Explain what you would change and what you would verify before either package is used.

Give the choices names that distinguish the work and data scope, such as **Regional summary reading** and **All-region detail export**, with the system and environment clear in the catalog. State the real capabilities and supported exclusions. “For Finance” alone does not explain the difference or enforce eligibility.

Confirm that the selected entitlements and native permissions actually match those descriptions. A friendly label cannot make an all-region right regional.

Establish an accountable owner who understands the access purpose and can obtain the necessary technical evidence. The integration engineer can remain the right contact for delivery questions without automatically becoming the business decision-maker. If the engineer genuinely accepts both responsibilities and is qualified to perform them, document that arrangement rather than ruling it out by job title.

Then inspect the actual request or assignment controls, the reviewer configuration and existing pending work where relevant. Owner metadata alone does not determine any of those outcomes.

A dependable package lets you connect its stated purpose to exact access references, current native permissions and someone who accepts responsibility for keeping those facts consistent.
