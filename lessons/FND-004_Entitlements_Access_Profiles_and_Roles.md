# Entitlements, access profiles, and roles: how the access objects fit together

*Lesson FND-004 · Revision 1.0*

Devi needs to read invoices, look up suppliers, and use the Finance workspace.

You could describe that as three separate access items. You could group the finance application’s items into one useful package. You could also describe the whole requirement as the access needed by an accounts-payable reader.

Those descriptions concern the same work at different levels.

In SailPoint Identity Security Cloud, or ISC, entitlements, access profiles, and roles let you represent those levels. The distinction matters when you design access, explain why someone has it, or investigate a missing permission.

## Start with what the applications actually allow

Devi works in Finance. Her employee number is `24004`, and her job code is `AP_READER`. She already has a finance application account, `inv-24004`, and a directory account, `dir-24004`.

The finance application manages invoice and supplier permissions. The directory manages membership in the group used for the Finance workspace.

An **account** is a record in one of those systems. An **identity** is ISC’s person-level representation, with information about Devi and the accounts associated with her.

A **source** is ISC’s configured representation of a system or account dataset. Here, `Invoice-System` represents the finance integration, and `Corporate-Directory` represents the directory integration.

A **connector** supplies the integration used to read data and carry out supported changes. **Aggregation** collects source data into ISC. **Account correlation** matches and associates a source account with the appropriate identity.

For this fictional example, both accounts have been collected and correctly associated with Devi. There is exactly one relevant account on each source. The selected integrations support the membership changes we describe.

An **entitlement** is a represented access item from a source, such as a permission or group membership.

Our systems supply these access items:

| Source | Entitlement value in this example | What it allows in the external system |
|---|---|---|
| `Invoice-System` | `InvoiceRead` | Read invoice records |
| `Invoice-System` | `SupplierRead` | Read supplier details |
| `Corporate-Directory` | `FinanceWorkspace` | Membership in the group used for the Finance workspace |

The values and their effects are teaching assumptions, not standard SailPoint permission names.

The first two permissions belong to the finance application. The directory group belongs to the directory. ISC represents them so the organization can manage and review access.

ISC does not make `SupplierRead` permit invoice approval merely by giving it a more impressive display name. The external application determines what the access item actually permits.

The source context matters too. A group named Reader in one system is not the same entitlement as a group named Reader in another.

## Why group two entitlements into an access profile?

Suppose reading invoices is not useful unless the employee can also look up the supplier associated with an invoice.

The organization decides that these two permissions form one related set of finance access.

An **access profile** is a bundle of related entitlements from one source.

We create an access profile named `Invoice reading` containing:

- `InvoiceRead` from `Invoice-System`.
- `SupplierRead` from `Invoice-System`.

Now the organization has a meaningful access package instead of asking people to choose the underlying permissions separately every time.

The name explains the intended use. The contents determine which source entitlements the package includes.

An access profile must contain at least one entitlement. Its entitlement contents come from a single source.

That source boundary is deliberate. `Invoice reading` cannot also contain `FinanceWorkspace` from `Corporate-Directory`. Giving the profile a broad name such as “Everything for Finance” would not remove the restriction.

The access profile is an ISC object. It is not a new native group created inside the finance application.

When its access is delivered, the finance account receives the underlying supported entitlements. You should not expect the application to contain a group called Invoice reading unless a separate design actually created such a group.

There is a naming trap here too. An **identity profile** is configuration for a population of identities, including where information on those identities comes from. It is not the same object as an access profile.

“Profile” appears in both names, but one helps define identity information and configuration; the other groups source access.

## A role can connect the wider work requirement

Devi’s job needs the finance package and the directory workspace membership.

An ISC **role** groups access for a responsibility or population. A role can contain access profiles, entitlements directly, or both. Its contents can span sources, but a role can also stay within one source.

Our role is named `Accounts payable reader`. It contains:

| Role content | Where the underlying access belongs |
|---|---|
| Access profile `Invoice reading` | `Invoice-System`: `InvoiceRead` and `SupplierRead` |
| Direct entitlement `FinanceWorkspace` | `Corporate-Directory` |

“Direct entitlement” here means the entitlement is included directly in the role’s definition, without putting it inside an access profile first. It does not mean ISC bypasses the connector, the target system, or the configuration required to carry out changes.

This gives us a role with one access profile and one direct entitlement. It is not necessary to create a one-item access profile solely to make every branch of the drawing look identical.

You could choose a directory access profile if that membership forms a reusable access package in the organization. The grouping should have a useful meaning, not exist only to satisfy a visual pattern.

The definition relationships look like this:

```text
ISC role: Accounts payable reader
  |
  +-- Access profile: Invoice reading
  |     Source: Invoice-System
  |       +-- Entitlement: InvoiceRead
  |       +-- Entitlement: SupplierRead
  |
  +-- Direct entitlement: FinanceWorkspace
        Source: Corporate-Directory


The role groups the work requirement across sources.
Each access profile keeps its own single-source boundary.
These branches describe contents, not completed grants.
```

The branches mean “contains this access.” They do not show a chronological execution order.

The role spans two sources, but each entitlement still belongs to its original source. Adding an entitlement to a role does not move that entitlement into a new source.

Another role can use the same access profile. It references the shared profile rather than creating a separate copy for each recipient. Before changing a shared definition, identify its references and affected identities; do not assume the change concerns only Devi.

The drawing also shows why “entitlement, then access profile, then role” is not a mandatory sequence for every access item. A role can contain an entitlement directly.

## An application role and an ISC role are different objects

An external application may have its own native roles, such as Viewer or Invoice Reviewer.

Where supported by the connector and configuration, that native application role can be represented as an entitlement from the source.

An ISC role is the broader access-model object we have just defined. It can include that entitlement alongside access from other sources.

The same word does not make them the same record.

If someone says “add the Reviewer role,” ask whether they mean assigning an ISC role or changing a native role membership on a particular application account.

Our `Accounts payable reader` role does not create a native role of that name in either system. It groups the finance permissions and directory membership already represented in the model.

Similarly, the owner assigned to an ISC role or access profile is responsible for that access object. Being its owner does not automatically mean receiving its access. Ownership and access assignment answer different questions.

## Who should receive the role?

The role’s contents answer, “What access does this role represent?”

They do not, on their own, answer, “Which identities should receive it?”

An **assignment** associates access with a recipient under the applicable configuration or request. For our role, the recipient is Devi’s identity.

An **identity attribute** is a named piece of information on that identity. Our example uses the verified identity attributes `department` and `jobCode`.

We configure automatic role assignment with this logic. **AND** means both conditions must be satisfied:

```text
Assign Accounts payable reader when:

  department equals Finance
             AND
  jobCode equals AP_READER

Both conditions must match in this example.
```

Being in Finance alone is not enough for this rule.

Devi’s current values are Finance and AP_READER, so she meets the supplied conditions.

Another Finance employee whose job code is AP_MANAGER does not meet this particular automatic rule. That does not tell us everything about that employee’s existing access or other assignments.

The role name itself is not the matching logic. An employee does not receive `Accounts payable reader` merely because a job title sounds similar.

**Provisioning** carries out supported account or access changes through the configured fulfillment method. It is the work needed to put the role’s underlying access onto the intended accounts.

The example assumes the required Provisioning service is available, the role is enabled, and its contents and assignment configuration have been prepared. These simplified criteria illustrate the relationship; a real design must include the organization’s complete eligibility requirements.

ISC also supports selecting an identity list for role assignment. In that arrangement, configuration identifies the intended recipients rather than deriving membership from this department/job-code expression.

A separate route is an **access request**: asking for specified access for a specified recipient. Roles, access profiles, and applicable entitlements can be made requestable through the relevant configuration.

**Requestable** means the item is available to ask for under that configuration. It does not mean every request will be approved or that asking has already delivered the access.

A requestable role can therefore be obtained through its configured request process. You must inspect that process and any required approvals rather than assume every assignment comes from the automatic criteria above.

An access profile can also be managed without placing it inside a role. For example, a separately approved need for the finance reading package need not imply that the employee should receive the directory workspace membership too.

These choices describe different ways to express the organization’s requirements. They should be designed deliberately, not inferred from the object names.

## Follow the assignment into the two systems

**Identity processing** evaluates identity information and applicable configured access. In this example, the relevant processing evaluates Devi’s automatic role-assignment conditions.

Her values match, and ISC assigns the role under the configured path.

The role’s assignment can initiate the provisioning needed to deliver its underlying access.

All access in this example is ordinary provisioned access, with no separate activation step. We are following the automatic role-assignment path, not an access request.

Before the change, assume neither account holds the entitlements listed in the role. There are no competing assignments or alternate grants in the main example.

The work concerns two existing accounts:

- The finance account `inv-24004` needs `InvoiceRead` and `SupplierRead`.
- The directory account `dir-24004` needs `FinanceWorkspace`.

Each source uses its own supported change mechanism. A role that spans systems does not turn them into one application or one shared account.

The configured account choices matter. Our example has one relevant account per source. If an identity has multiple accounts on a source, you must establish which should receive access. Access profiles provide multiple-account selection options for applicable automatic provisioning; those options must not be generalized as the selection mechanism for every request or direct entitlement.

Here is the selected path:

```text
Devi's ISC identity: employee 24004
  department = Finance
  jobCode = AP_READER
             |
             | Applicable processing evaluates both conditions
             v
Role assignment: Accounts payable reader
             |
             | Supported configured provisioning of role contents
             +----------------------------+
             |                            |
             v                            v
Invoice-System                    Corporate-Directory
Account inv-24004                  Account dir-24004
  Add InvoiceRead                   Add FinanceWorkspace
  Add SupplierRead

Each system reports its operation results.

Separate human verification:
  Inspect the relevant activity and current target accounts.
  Check later collected access as a separate observation.
```

The branches represent the account changes required by this definition. They do not promise parallel execution, a particular sequence between sources, or one transaction that succeeds everywhere together.

In our successful continuation, both systems accept the required changes, and the intended accounts hold the listed access.

We still distinguish the role assignment, the attempted operations, their reported results, and the target observations.

Seeing the role associated with Devi does not replace checking a rejected finance operation. Finishing identity processing does not validate that every target change succeeded.

Nor does the diagram promise that every successful write triggers an immediate full aggregation. Later collected records and current target observations can answer different questions about the state.

## What if the role is assigned but one permission is missing?

Change the supplied outcome.

The directory account holds FinanceWorkspace. The finance application accepted InvoiceRead but rejected SupplierRead because the integration credential lacked the required permission for that operation. A **credential** is the authentication information the integration presents, such as a token; the application controls which operations that credential is allowed to perform.

This is a fictional partial outcome, not a claim about universal connector transaction behavior.

Devi can enter the workspace and read invoice records, but the finance package is incomplete for the work we described.

Start with the exact missing item. It is SupplierRead on inv-24004 under Invoice-System.

Then trace the relevant relationships:

Does the role include Invoice reading? Does that profile include SupplierRead? Did the relevant role assignment apply to Devi? Which account was selected? What result was recorded for that source operation?

The supplied facts already identify a rejection. Another role assignment or business approval does not, by itself, give the integration the missing target-system permission.

The teams need an authorized correction to the relevant capability or configuration, followed by the appropriate controlled retry or resubmission and verification. Do not assume every failure retries forever or that reprocessing an identity repairs an external permission problem.

This is also why a broad report such as “the role doesn’t work” needs refinement. The account and entitlement identify the missing part of the work.

## What if the access existed before this model was created?

Suppose a different starting situation applies.

An application administrator had already given Devi InvoiceRead and SupplierRead on her finance account before ISC’s Invoice reading access profile was created.

ISC collects that account access. During identity processing, it can detect that she holds all entitlements in the access profile and represent the access as that profile.

**Detection** here means recognizing the defined bundle in access that is already held. It does not prove that a request for that profile was approved or that ISC originally delivered those permissions.

The same displayed profile can therefore lead to different investigation questions.

For the newly provisioned example, you inspect the assignment and delivery activity.

For the preexisting-access example, you establish what was collected and recognized, then investigate the history and business justification separately.

Recognizing a bundle does not create the directory membership or prove that the broader role was assigned. The role has its own contents and assignment context.

Even finding every underlying entitlement would not, on its own, establish which assignment path or historical action produced the access.

## Separate the screens from the claims you can make

In the access-model views, you inspect entitlement details, profile contents, role contents, ownership, and configuration.

In an identity’s access view, you inspect the represented access associated with that identity.

In provisioning activity, you investigate attempted changes and their reported results.

The front end presents information about those objects and operations. The back-end work includes evaluating assignment logic, deriving required access changes, using the configured integrations, and processing returned results.

Use evidence that answers the actual question:

| Question | Evidence to examine | What it does not establish alone |
|---|---|---|
| What access is in the role? | Role contents and referenced access-profile contents | That Devi has received it |
| Why should this automatic assignment apply? | Role assignment configuration and relevant identity inputs | That every target change succeeded |
| How is the access represented for Devi? | Her identity’s represented roles, profiles, and entitlements | The original grant history or current live application behavior |
| What happened to the missing SupplierRead change? | Relevant source/account activity, operation result, and error details | That another approval would fix the source rejection |
| What access does the intended account now hold? | Relevant current target evidence | That every ISC view has already received that observation |

Some information may require combining records, configuration, and activity. Do not assume one screen supplies a complete historical explanation of every grant.

A clear access-object name helps you find and understand the object. Its name is not evidence that the intended operation succeeded.

## Removing access is different from deleting its definition

Suppose Devi changes work and no longer meets the automatic role’s criteria.

In the main design, that role is her only assignment path for the listed access. Applicable processing can revoke the automatic role assignment and initiate the corresponding access removal. The removal still needs supported fulfillment and verification.

Carrying out a supported access-removal change is **deprovisioning**.

A different case has overlapping access: another assigned role also requires InvoiceRead. SailPoint documents retention of entitlements still required through another assigned role.

So “the old role was removed” does not always mean “every entitlement it contained must disappear.”

Investigate the remaining assignment before manually stripping a permission that another valid role still requires.

Now consider deleting the access profile itself.

Deleting an access profile does not deprovision its previously held entitlements. It removes the grouping and its association; it is not a replacement for revoking the intended access.

An access profile must first be removed from provisioning configurations that use it before it can be deleted. That prerequisite does not turn deletion into a target-removal operation.

Disabling or deleting an ISC role is also not a shortcut for removing its previously granted access. It prevents future automatic assignment and removes the role association, but does not deprovision that previously granted access.

Removing an assignment through the applicable revocation path and deleting an access-model definition are different actions. Use the supported path for the actual requirement, then verify the target outcome.

Finally, removing role access or entitlements does not delete the source accounts, even if a role originally caused those accounts to be created. Do not promise account deletion when the approved operation is membership removal.

## Work through these situations

**1. One package contains two sources.**

A designer proposes an access profile containing InvoiceRead from Invoice-System and FinanceWorkspace from Corporate-Directory.

Can that be one access profile? How could you represent the combined work requirement without losing each source boundary?

**2. The job title sounds right.**

An employee’s job title is “Accounts Payable Reader,” but their identity job code is AP_MANAGER. The automatic rule requires department Finance AND jobCode AP_READER.

Does the title establish automatic assignment under this rule? What else can you conclude about the employee’s access?

**3. The profile appeared without a new request.**

Devi already held InvoiceRead and SupplierRead. After collection and processing, her identity shows Invoice reading. You have no evidence of a new access request or permission-add operation.

Does the profile’s appearance prove ISC granted the two permissions?

**4. One branch succeeded.**

The role is assigned. FinanceWorkspace and InvoiceRead are present on the intended accounts. SupplierRead was rejected by the finance application because of the integration credential’s permissions.

What is the focused investigation? Would another business approval resolve the supplied cause?

**5. A permission remains after the old role is removed.**

Devi no longer has the Accounts payable reader assignment. Another assigned role still includes InvoiceRead.

Does the continued InvoiceRead entitlement, by itself, establish a removal failure?

**6. The object was deleted instead of the access being revoked.**

A team deletes an unused access profile after removing it from its provisioning configurations, or disables an ISC role, and assumes the old account permissions are now gone.

What is missing from that conclusion?

## Compare your reasoning

**For the two-source package:** An access profile has one entitlement source. You can use a role to combine a finance access profile with a directory entitlement directly, or with a separate directory access profile where that package is useful. The role spans sources; each access profile keeps its own single-source scope. Supported delivery still concerns the separate target accounts.

**For the title:** The stated rule uses department and jobCode, not a resemblance between the title and role name. AP_MANAGER does not meet the supplied AP_READER condition, so the title does not establish assignment through this automatic path. You have not established the employee’s complete existing access, another role, or an approved request-based assignment.

**For the detected profile:** No. The supplied facts are consistent with detection of an existing entitlement bundle. Inspect collected account access and applicable processing, then look for historical grant and approval evidence if that is the question. A represented access profile is not a receipt proving ISC originally provisioned every item.

**For the rejected permission:** Investigate SupplierRead on inv-24004 under Invoice-System, following the profile contents, role assignment, selected account, attempted change, and rejection details. The supplied cause is target-side authority for that operation, not missing business approval. Authorize the appropriate limited correction, use controlled retry or resubmission, and verify the actual outcome without assuming the successful branches prove this branch healthy.

**For the remaining entitlement:** Not by itself. The second assigned role still requires InvoiceRead, and overlapping role requirements can preserve that entitlement. Check the actual remaining assignment and target state rather than treating its continued presence as automatic evidence of a failed old-role removal.

**For the deleted definition:** Neither action establishes removal of previously granted permissions. An access-profile deletion and role disablement do not perform that deprovisioning. Establish the intended revocation path, the affected accounts and entitlements, any remaining assignment requirements, execution results, and current target evidence. Account deletion would be a separate requirement too.

## Design the access for a different responsibility

Choose a responsibility that needs access in two systems, such as a support analyst working in a ticketing system and a knowledge base.

Identify the source entitlements and explain what each permits. Decide which related items form useful single-source access profiles and what, if anything, belongs directly in a role.

Then explain who should receive the access, how the intended accounts are selected, and what evidence would establish delivery.

Change one condition: a person already has part of the access, one source rejects a change, or another role still requires an entitlement during removal.

Explain the changed outcome without turning the access definition, the assignment, and the target operation into the same event.
