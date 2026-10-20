# Who owns what when access needs to change?

*Lesson SYS-003 · Revision 1.0*

Devi has moved from Customer Support to Finance. She already has workplace accounts, but she now needs permission to read supplier invoices.

She submits an access request in SailPoint Identity Security Cloud, or ISC. An **access request** asks for a specified access item to be assigned to someone. In this case, Devi is requesting access for herself.

The request reaches her former manager.

Her new manager says the move is complete. The Human Resources team says the employee record was updated. The ISC engineer sees the former manager on the record for Devi in ISC.

Who should fix it?

It's tempting to answer, "The ISC engineer, because the incorrect manager appears in ISC." But the place where a problem becomes visible isn't necessarily the place where it began.

You need to establish which information is wrong, where it changed or failed to change, and who is authorized to correct that part of the process.

Devi, the records, and the access names in this lesson are fictional. The team responsibilities described here are a practical operating model, not a fixed organization chart imposed by SailPoint. One organization may combine these responsibilities in a small team; another may spread them across departments.

## Separate the decision from the work

When someone says, "I own this," ask what they own.

They might mean they decide what a business value should be. They might approve an access request, maintain a connection between systems, operate the system receiving a change, or coordinate a support case until it is resolved.

These responsibilities can belong to different people.

For Devi's move, someone must confirm her actual manager. Someone must configure ISC to use that information correctly. A designated reviewer must decide whether she needs invoice access. The required account change must then be carried out and checked.

The person who can change a setting isn't automatically the person authorized to choose its business meaning.

Suppose an engineer can edit an access configuration. That capability doesn't make the engineer the decision-maker for whether every Finance employee should release payments. Conversely, a Finance manager's authority to approve invoice reading doesn't automatically give that manager permission to edit accounts in another system.

**Accountability** means being answerable for an outcome. **Execution responsibility** means performing the work needed to reach it. Agree both: who must make sure this is resolved, and who performs each action?

For a support case crossing teams, appoint a coordinator who tracks the overall outcome. That person can keep the case moving without personally owning every underlying system.

## HR owns employment facts, but which facts reach ISC?

**Human Resources**, or HR, manages employment information under the organization's processes. For our example, the HR team is responsible for recording Devi's department, manager, and the date her move takes effect.

The effective date matters. "The move has been entered" could mean it is recorded for next month, not that it applies today.

An **account** is a system-specific record representing a user or another actor. In an HR integration, an employee record can be collected as a source account even though nobody uses that particular record to sign in.

An **identity** in ISC brings together information about a person and their associated accounts and access. A **source** is ISC's configured representation of a system or account-data collection. The **connector** is the integration used to read that system and, where supported, send changes.

ISC doesn't learn about Devi's move merely because someone edits an HR screen.

**Account aggregation** is the collection of source account data into ISC. The relevant HR record must be available through the integration, and collection must bring the relevant change into ISC.

An **attribute** is a named piece of information on a record, such as an employee number or department. An **identity profile** contains configuration for a population of identities, including how identity attributes obtain their values. A **mapping** specifies where a value comes from or how it is calculated.

An **authoritative source** supplies the population from which ISC establishes identities through an identity profile. It does not mean every attribute on those identities must come from that source. The mappings still need to be inspected.

Here, HR is the agreed authority for employment facts and the authoritative source for these employee identities. Those are related design choices, not interchangeable meanings of the word "authoritative."

If the HR record contains the wrong manager, the HR data owner must validate and correct that employment fact. If HR contains the right value but ISC reads an outdated export, the failure is in the data-delivery path. If ISC has the right source value but uses the wrong mapping, the ISC configuration needs investigation.

Don't change HR just to make it agree with a faulty integration.

## The manager explains why the employee needs access

Devi's manager knows what work she is expected to perform. In this example, the manager confirms that invoice checking is part of her new assignment.

That business knowledge is why the organization selected the manager as an approver. It is not proof that every access request in ISC automatically goes to a manager.

Approval routing is configured. Depending on the access item and applicable settings, a request can require a manager, an owner, or another designated reviewer.

There is also a technical question behind "send it to the manager."

**Manager correlation** links an employee's ISC identity to the identity representing their manager. It uses configured matching information; displaying a manager's name as text is not the same as establishing the correct relationship.

In our example, the employee's HR account contains a manager number. The configured correlation compares that value with an identifying attribute on manager identities. The intended manager must exist in ISC with the matching value, and the relevant correlation configuration must be valid.

The manager can confirm, "Devi reports to me." The ISC engineer investigates whether the records and configuration establish that relationship. Those are different contributions to the same resolution.

Once the relationship is corrected, inspect any request already waiting with a reviewer. Don't assume changing identity data automatically reroutes every in-progress approval. Its current assignment and the supported request-management actions need to be checked separately.

## The application owner explains what the access permits

A **permission** allows an action or access to a resource. Reading an invoice and releasing a payment are different permissions, even though both occur in a finance application.

The **application owner**, in the operating model here, is accountable for the application's business access requirements. The owner works with application specialists to establish what permissions allow and which responsibilities justify them.

An **application administrator** operates and configures the application. The owner and administrator can be the same person, but don't assume they are.

The manager says, "Devi needs to check invoices." The application owner or designated specialist translates that into the appropriate access item and explains its limits.

That translation must be precise. Does "invoice access" permit reading, editing, approving, or exporting? Does it apply to every business unit or one? A friendly display name isn't enough evidence of the underlying permission.

A **directory** stores identity-related records such as accounts and groups. A **group** is a collection of accounts that a system can use when applying shared access rules.

For this fictional application, the agreed design is:

| Item | Meaning in this example |
|---|---|
| `FIN_INVOICE_READ` | A directory group whose members receive invoice-reading access |
| `INVOICE_VIEW` | The application's permission to read supplier invoices |
| Application mapping | Membership in `FIN_INVOICE_READ` provides `INVOICE_VIEW` |
| Payment release | Requires separate access; this group must not provide it |

An **entitlement** is an access right represented on an ISC source, such as this directory group membership. Here, Devi requests the entitlement representing `FIN_INVOICE_READ`.

The application mapping is part of our example's design. It isn't an automatic consequence of giving a group a particular name.

If the group actually grants payment release too, the application owner must resolve that mismatch with the application's technical team. Renaming its entitlement in ISC to "Read only" wouldn't restrict what the application allows.

## The directory team maintains the system receiving this change

In this design, ISC adds Devi to a directory group. It does not write an invoice permission directly into the finance application.

The directory is therefore the **target system** for this operation: the system receiving the change.

**Provisioning** is carrying out an account or access change. This provisioning operation changes membership in `FIN_INVOICE_READ`.

The directory team maintains the relevant accounts, groups, and system permissions under its agreed responsibilities. It helps establish how the connector authenticates and which operations that connection may perform.

An **integration account** is an account used by the integration to do its work. Its privileges are separate from Devi's privileges. A connection can read accounts successfully while lacking permission to update a particular group.

If a membership update is rejected, the ISC engineer can identify the failed operation and the returned error. The directory administrator can investigate the target-side restriction. Neither should assume that granting the integration broad administrator rights is the appropriate fix.

After a successful change, the directory team can confirm membership. The application team can confirm how the finance application uses that membership, including any delay before it recognizes the change.

"The directory group is correct" and "Devi can read invoices in the application" are related findings, not identical findings.

If another application stores permissions locally, the application administrator may operate the target change instead. Follow the actual write destination, not a rule that all access problems belong to the directory team.

## What does the ISC engineer own?

The ISC engineer translates agreed requirements into supported configuration and investigates how that configuration behaves.

For this example, that work includes checking which source provides the employee data, how it is collected, how the manager relationship is established, which entitlement is requested, how approvals are routed, and what account the provisioning operation targets.

**Identity processing** evaluates identity data against applicable configuration. It can update identity attributes and manager relationships and initiate configured access changes. Completing that processing doesn't prove a downstream provisioning operation succeeded.

The engineer needs to distinguish incorrect input from incorrect configuration. Otherwise, a technical workaround can silently replace a business decision.

For example, hard-coding one manager for everyone in Finance might send Devi's request to the expected person today. It could send another employee's request to the wrong person tomorrow. A local symptom has been hidden by a wider configuration error.

The engineer should establish the intended requirement with the responsible owner, examine the affected population, test the proposed change, and verify its results. If a platform or connector issue needs vendor support, provide a focused technical case without treating vendor support as the authority for the organization's employment or access decisions.

Automation changes who executes a routine step. It doesn't remove responsibility for approving its design, maintaining its inputs, or investigating failures.

If access is assigned automatically under an agreed rule, there may be no human approval for each assignment. Someone still needs to own the rule's business meaning and review the effect of changes to it.

## Where do security, support, and audit fit?

The security or access-governance function helps establish controls: requirements intended to limit inappropriate access or detect when it occurs. For example, the organization may require independent review before someone receives payment-release access.

The application owner explains the permission's business impact. The security function helps establish the restriction and how exceptions are authorized. The ISC engineer implements the agreed behavior where supported. Choosing a setting doesn't settle a disagreement about the underlying policy.

The service desk can collect the initial problem description, confirm the affected account and application, and coordinate investigation. Technical actions depend on the permissions and procedures assigned to that team. A support job title doesn't automatically grant unrestricted ISC access.

An auditor examines whether the control operated and whether the evidence supports the reported result. An approval record can establish who made a decision; target evidence can establish whether the corresponding change occurred. Neither should be invented retrospectively to make an incomplete case look complete.

Agree these responsibilities explicitly. Don't route every routine request to security merely because it concerns access, or expect an auditor to perform the operational removal they are assessing.

## An ISC owner field isn't the same as a job title

ISC records include ownership designations that can be used by configured processes. These are related to organizational responsibilities, but you have to connect them deliberately.

A **source owner** is the designated owner of a source in ISC. Source ownership can be used for provisioning tasks and access reviews. For example, manual account work for a file-based source can be directed to its source owner.

An **entitlement owner** is designated for an individual access item. That owner can be configured to review requests for the item. Applicable approval settings determine who actually receives the request.

A **governance group** is a group of ISC identities configured to participate in governance work, such as reviewing access. It can provide a maintained set of reviewers rather than depending on one person.

Don't confuse a governance group with `FIN_INVOICE_READ`. The first organizes responsibility within ISC; the second grants application-related access through a directory. Giving them similar names doesn't make them the same object.

An ISC **user level** is a set of platform permissions. For example, Source Admin permissions allow source-management operations. An ownership designation and an administrative user level describe different things.

Before assigning either, ask what work the person needs to perform. Do they need to judge requests, complete assigned tasks, inspect reports, or change source configuration? Verify their actual permissions instead of assuming that an owner field grants every required administrative capability.

The reverse matters too. Having administrative capability doesn't, by itself, establish business authorization to approve access on behalf of its owner.

Manual work also needs an explicit assignment check. SailPoint documents manual entitlement provisioning tasks going to the entitlement owner, with the source owner as fallback. Other task paths depend on the operation and configuration. Inspect the task's actual assignee; don't send every incomplete task to a team merely called "the source team."

## Find the first disagreement in Devi's manager data

Return to the request that reached Devi's former manager. An **identifier** is a value used to distinguish a record, such as an employee number. Use identifiers as well as names so two people with similar names aren't confused.

These are the agreed facts for our investigation:

- Devi's employee number is `10482`.
- Her former manager's employee number is `8802`.
- Her new manager's employee number is `9007`.
- The move is effective today.
- The request under investigation is `REQ-318`.

The identifiers and request label are fictional. They make it possible to compare the same person and event across records.

Before changing anything, compare the expected relationship with the evidence at each boundary:

| Evidence found | What it establishes | Who needs to participate next |
|---|---|---|
| HR still records manager `8802` for today's effective assignment | The business record disagrees with the confirmed move | HR data owner, with the manager supplying the approved change |
| HR records `9007`, but the export consumed by ISC still contains `8802` | The change hasn't reached the integration input | HR system or export operator, with the ISC engineer identifying the consumed data |
| The consumed input has `9007`, but ISC's collected account still shows `8802` | The collection result is not current or not the expected record | ISC engineer and source operator, using collection scope, result, and timestamps |
| ISC has `9007`, but the linked manager remains the identity for `8802` | Correct source input alone has not established the expected relationship | ISC engineer, checking manager identities, correlation configuration, and processing evidence |
| The identity links to `9007`, but `REQ-318` is still assigned to the former manager | The manager relationship and an existing work assignment differ | Authorized request administrator, checking that request's routing and supported correction path |

The table identifies the next investigation, not an automatic verdict against a team. A displayed value needs context: its record, effective date, observation time, and the process that produced it.

For the fourth row, don't assume an unmatched new manager value must clear an old relationship. If the account's manager value changes but cannot be matched to a new manager, the existing manager relationship can remain in place. Check whether `9007` can actually match an eligible manager identity.

That behavior is a reason to inspect the relationship itself, not just the text value.

Suppose we find the second row: HR has the correct current manager, but an old export is still being delivered. The feed operator corrects the delivery issue. The ISC engineer checks the next relevant collection and processing results. Then the team verifies the manager relationship and separately resolves `REQ-318`.

Correcting the export isn't the last verification step.

## Follow the handoffs through to usable access

A **handoff** transfers a specific piece of work or evidence to the person responsible for the next part. "Please investigate" is incomplete unless it says what has been established and what needs checking.

For this successful example, assume the employee and manager records are correct, the request uses configured manager approval, the relevant directory account is identified, and the connector supports the group change. Membership is the only application-specific permission condition for invoice reading here; the application account is already usable.

```text
DATA RESPONSIBILITY

HR confirms today's manager and employee record
    |
    | correct current data made available to ISC
    v
ISC collection and identity processing
    |
    | engineer verifies the intended manager relationship
    v
Correct manager relationship available for request routing


ACCESS DECISION AND DELIVERY

Manager confirms Devi's invoice-checking responsibility
Application owner defines the access that work requires
    |
    | configured request for FIN_INVOICE_READ
    v
Designated reviewer decides
    | rejected -> no grant from this request
    | approved
    v
ISC sends the supported directory membership change
    | failure -> ISC and directory teams investigate
    | directory applies the change
    v
Directory evidence confirms the intended account is a member
    |
    | application team checks its mapping and recognition
    v
Invoice reading works; unrelated access is not added
    |
    | coordinator records evidence and confirms closure
    v
Resolved outcome, not merely a transferred ticket
```

This is a responsibility map, not a claim that all the boxes are automated ISC stages. HR confirmation, engineering checks, application verification, and case closure are human responsibilities in this operating model.

The first path supplies a relationship used by the second. It doesn't say a manager change itself submits an access request. A request already in progress still needs the separate check discussed above.

The diagram also doesn't require HR, the manager, and the application owner to meet for every request. They can establish the facts and access design beforehand. The request uses those maintained records and configurations.

If the connector cannot perform the change automatically, replace the automated write with the configured manual fulfillment path. **Fulfillment** means getting the access change carried out. Assign the work, track its result, and verify the target state; the responsibility doesn't disappear because the connection is read-only.

## What does each screen actually show?

The **front end** is what the user sees and interacts with. The **back end** is the processing that reads records, evaluates configuration, routes work, and executes operations.

Devi sees a request and a reviewer. Behind that presentation are her identity information, the access item's approval configuration, and the resulting work assignment. A wrong reviewer can come from those inputs or from the history of that request, not necessarily from a display problem.

An engineer sees a provisioning result. It describes the attempted operation and reported outcome, not the manager's business justification or every permission the application ultimately permits.

A directory administrator sees membership. The application administrator checks how the application interprets it. Devi's successful use confirms a particular operation under the conditions tested.

No single screen answers all of those questions.

When evidence is handed between teams, identify which question it answers. "The group exists" doesn't answer "Was Devi added?" "Devi was added" doesn't answer "Does this group provide only the intended rights?"

## Make the next person's investigation possible

Compare two messages.

"SailPoint is wrong. Please fix the manager."

"For employee `10482`, the approved move is effective today and the current HR record identifies manager `9007`. The HR export consumed at 09:10 still contained `8802`, and ISC collected that value at 09:15. Please check why the export still contains the previous assignment. After the corrected record is available, the ISC team will verify collection and the resulting manager relationship. Request `REQ-318` also needs a separate assignment check."

The second message supplies a boundary, evidence, and a next action. Its times are fictional and show order, not a promised processing interval.

A useful handoff should identify the affected person and account, expected versus observed result, relevant configuration or operation, event time, and requested check. Include a case reference and who is coordinating the overall outcome.

Share only the data needed for the investigation through approved channels. Don't attach passwords, integration secrets, or a complete employee export when a small, appropriately redacted record is sufficient.

The team receiving a task should acknowledge ownership and return the result, including what remains unresolved. Transferring a ticket without acceptance doesn't establish that someone is doing the work.

## Who owns the work after access has been granted?

The manager still needs to report when Devi's work changes. The application owner still needs to maintain permission definitions. The directory team still needs to maintain groups and their operation. The ISC team still needs to maintain mappings, integrations, and governance configuration.

If the application team changes its mapping so membership in `FIN_INVOICE_READ` also allows payment release, the meaning of existing access changes even if ISC sends no new grant. Agree how permission changes are communicated and reviewed before they affect existing users.

An **access certification** is a structured review of existing access in which designated reviewers decide whether it remains appropriate. A decision to revoke means the reviewer wants access removed. **Remediation** is the work of implementing that correction and verifying it.

The reviewer owns the decision within the assigned review. An administrator coordinates the review process, and the configured automated or manual path performs the resulting removal work. The responsible operational team must verify unresolved removals instead of treating the review decision as proof that the permission disappeared.

Ownership records also need maintenance when owners move or leave. Review pending work, source and entitlement ownership, governance-group membership, and the relevant administrative access. Updating a contact list doesn't necessarily update those ISC objects.

For urgent cases, use the organization's authorized escalation or exception process. An **exception** is a documented departure from the normal control, approved by whoever has authority to accept it. Record scope, reason, approver, duration, follow-up, and the access actually changed.

Urgency doesn't make an engineer the employee's manager or the application's business owner. A temporary intervention also doesn't repair the underlying bad data. Track restoration and verification of the normal process.

## Agree these responsibilities before connecting a new application

Suppose a project says, "The application team owns it."

That leaves unanswered who defines permissions, operates the system, approves requests, receives failed-change alerts, and verifies manual work. Ask for the particular responsibility, not just a department name.

For a new connection, agree:

- Which records supply the relevant population and attributes, who corrects them, and how effective dates and corrections are delivered.
- Who explains each access item, approves its business use, and keeps that explanation current.
- Which system receives each account or permission change and which team operates it.
- Who maintains the integration's authorized credentials, connectivity, and permissions.
- Which ISC ownership fields, reviewer settings, governance groups, and user levels implement the agreed responsibilities.
- Who investigates failed or delayed work, who provides backup coverage, and who coordinates cases across teams.
- What evidence is required to accept a normal grant, a rejection, a removal, and a failed operation.

These are operational agreements to establish with the organization, not settings ISC can infer from job titles.

The acceptance test should include a failure handoff. For example, if a manual removal remains incomplete, can the team identify its actual assignee, contact the authorized operator, and obtain evidence of removal? A successful automated grant alone doesn't test that responsibility.

## Try assigning the next action

### Case 1: the input is correct, but the identity value is wrong

For employee `10482`, HR and ISC's collected HR account both show department `Finance`. ISC's identity still shows `Customer Support`. Inspection finds that the identity's department mapping reads a different source account containing the old value. The approved design says this employee population's department should come from HR.

Who should act, and should HR change its value?

**Reason it through.** HR's value agrees with the requirement and has reached ISC. The ISC engineer should investigate and correct the mapping through the approved change process, checking its effect on the affected population before applying it.

HR should not alter correct business data to compensate for a mapping error. After the correction and appropriate processing, verify the identity value and any configured downstream effects. Don't stop at saving the mapping.

### Case 2: the directory operation succeeded, but the permission is wrong

The approved requirement is invoice reading only. ISC requested membership in `FIN_INVOICE_READ` for the correct directory account. The directory confirms that membership. An application test finds that this group also permits payment release.

Which team owns the decision about the proper permission meaning?

**Reason it through.** The application owner must resolve the business access requirement with the application specialists. The directory and ISC teams have evidence that the requested membership was delivered; that doesn't make the group appropriately designed.

Investigate the application mapping, assess who else holds the group, and coordinate a controlled correction. The ISC team should not merely rename the entitlement. If the agreed correction changes which group is requested, the access configuration and affected assignments also need review.

### Case 3: the source owner cannot edit a connection

A business specialist is designated as the source owner in ISC and is responsible for reviewing access. They report that they cannot change the connection settings. The integration already has a separate technical support team.

Should they receive broad administrative permissions because they are the owner?

**Reason it through.** Not on that evidence. First establish whether changing connection settings is part of their assigned work. Source ownership, review responsibility, and source-configuration permissions are different.

If configuration belongs to the technical team, that team should perform the authorized change. If the specialist genuinely needs an administrative function, assess the appropriate user level and scope through the access-granting process. An owner label isn't a reason to grant unrelated capabilities.

### Case 4: a review decision has no completed removal

A reviewer selected revoke for an entitlement. The resulting manual removal task is still open, assigned to the entitlement owner. The target administrator confirms the account still has the access.

Is the reviewer the person who must directly edit the target account?

**Reason it through.** Not necessarily. The reviewer made the removal decision. The task assignee must arrange the work through the authorized target operator under the agreed operating model. The coordinator tracks the unresolved removal and any required escalation.

Check the task details, confirm acceptance by the responsible operator, and obtain target evidence after removal. Don't mark the task complete merely because the review decision exists.

## Apply it to a different system

A supplier portal is managed by a vendor. Internal procurement sponsors confirm which contractors need access. A contractor register supplies their identities to ISC. The integration can read portal accounts but cannot remove permissions automatically.

The business wants this outcome: when a sponsor says a contractor no longer needs purchasing access, that access is removed and the result is verified.

Explain who must own each part and what the project still needs to agree. Don't assume the word "vendor" answers every responsibility.

**One workable arrangement is this:**

The sponsor supplies the authorized business decision. The contractor-register owner maintains the contractor facts. The portal owner defines which purchasing entitlement must be removed and agrees the removal obligation with the vendor.

The ISC team configures a supported manual fulfillment path with the correct ownership and monitors the resulting work. The assigned internal owner coordinates with the vendor's authorized operator, who changes the target account. The coordinator obtains target evidence and checks that ISC's collected view is updated through the agreed collection process.

Before using this arrangement, agree how the vendor accepts work, expected response times, escalation, and what evidence it returns. If the vendor cannot perform the required removal or provide adequate verification, that is an unresolved project requirement, not something an ISC success label can solve.

A different arrangement can also work if it clearly assigns decision authority, execution, coordination, and verification. Explain your choice by naming the required outcome and the evidence each participant supplies.

For Devi's request or the supplier portal, the useful question isn't simply, "Whose system is this?" It's, "What needs to be decided or changed next, who has authority to do that, and how will we know it worked?"
