# What access does this responsibility actually require?

Devi, employee `120101`, has started handling customer-request intake. She needs to read incoming requests, prepare an intake draft and consult published support instructions.

She does not approve refunds, publish instructions or administer either application.

Someone asks the identity team to “give Devi the same access as another support specialist.”

Before copying anything, ask what that other person actually does. They may approve refunds, cover a second queue or retain permissions from an earlier job. Their current access is evidence to investigate, not the definition of Devi's responsibility.

The better starting point is the work: what must Devi be able to do, on which information, and what must stay outside her authority?

In SailPoint Identity Security Cloud, or ISC, we can represent the resulting access requirement with a **role**: an access-model object grouping related access for a business responsibility. A role can cover one system or several.

That gives the identity team a maintained requirement to assign, review and investigate. It does not turn a job title into an application permission.

All people, systems, identifiers, business rules, configurations and observations here are fictional. The example assumes the tenant has the Provisioning capability needed for roles, an authorized administrator and supported integrations. It uses a standard role and standing access, without separate Just-In-Time activation.

## Make the work specific enough to test

“Customer support access” is too broad to decide what should be granted.

For this responsibility, the approved work is:

- Read customer requests in the employee's assigned queue.
- Create and edit an intake draft in that queue.
- Read published support instructions.

The exclusions are equally concrete: no refund approval, no bulk customer export, no instruction publishing and no application administration.

The business owner confirms the responsibility. The application teams explain how their systems authorize those actions. The identity engineer connects those approved needs to the exact access objects ISC can manage.

These are different kinds of knowledge. A business owner can confirm that draft intake is needed without knowing the native group key. An integration team can identify a writable group without knowing whether every support employee should hold it.

Let's name the two systems:

**RequestDesk Production** handles incoming requests and intake drafts.

**KnowledgeShelf Production** stores the published instructions.

Devi already has one account in each: `rd-120101` and `ks-120101`. Both accounts are enabled and sign-in works. Her RequestDesk account is assigned to queue North.

An ISC **identity** represents the person. An **account** is the system's login record. **Account correlation** associates each source account with the correct identity. Both accounts are correctly correlated to Devi.

The application accounts exist, but the three required memberships are initially absent. Devi has no assignment to this role yet, and no other grant supplies these rights. Account creation is therefore not part of this example's delivery.

## Translate each action into verified native access

A **source** represents a connected system or account-data collection in ISC. A **connector** provides the integration that reads data and, where supported and configured, makes changes.

Here there is one source for each application. Their supplied integrations support reading accounts and adding or removing the memberships used below.

An **entitlement** represents an access right, such as membership in a group. “Native” access means the membership and its effect in the application itself.

The application teams verify this mapping:

| Approved work | Verified native access requirement |
|---|---|
| Read requests in the assigned queue | RequestDesk `RD-8101`, Queue Readers. |
| Create and edit intake drafts in that queue | RequestDesk `RD-8102`, Intake Drafts, together with Queue Readers on the same account. |
| Read published support instructions | KnowledgeShelf `KS-8101`, Published Guide Readers. No publishing permission. |

Notice the dependency in the second row. Intake Drafts alone is not enough for the intended action. The role needs the full justified combination, not merely the entitlement whose name sounds closest to “create draft.”

Also notice what the table does not promise. Queue Readers does not grant every queue. RequestDesk separately enforces the account's assigned-queue setting. Devi must be able to work in North, not in an unrelated queue.

These are fictional application rules supplied for this example. Another system can use different groups, licenses, native roles or resource conditions.

Do not infer those meanings from labels alone. Verify actual rights, dependencies and source identifiers with the application team.

A similarly named Readers group in a test environment is not interchangeable with Production. Nor is a KnowledgeShelf reader reference the same object as a RequestDesk reader reference.

## Put the justified access into an ISC role

An **access profile** is a named bundle of related entitlements from one source.

We define **RequestDesk intake**, containing the two RequestDesk entitlements. They belong together because both are needed for the same intake task in that source.

The proposed ISC role is **Customer request intake**. It contains:

- The RequestDesk intake access profile.
- The KnowledgeShelf Published Guide Readers entitlement directly.

Roles can contain access profiles and direct entitlements. A single-source access profile is not compulsory for every entitlement in a role, and a role can combine access across sources.

Here the RequestDesk profile groups a meaningful two-item capability. The direct KnowledgeShelf entitlement supplies one justified right. Creating a separate KnowledgeShelf profile could also be a valid design if it has a useful maintained purpose; it is not a technical requirement just to place this right in the role.

We will call the role `R-1201`, the RequestDesk profile `AP-8101`, and the entitlement records `E-RD-8101`, `E-RD-8102` and `E-KS-8101`. These short identifiers are teaching labels, not real ISC ID formats or an API payload.

The role and profile are enabled. All included access is standing, meaning no separate activation is needed before use.

```text
Work: customer request intake
                |
     role Customer request intake
        /                  \
  RequestDesk         KnowledgeShelf
       |                    |
  intake profile      direct entitlement
  Readers + Drafts    Guide Readers
       |                    |
  rd-120101           ks-120101
       |                    |
  North read/draft    published guide read
```

Read the upper arrows as “this requirement is represented by these access references.” The account branches show the intended delivery targets and native capabilities, not a guarantee of writes or a fixed processing order.

The role itself is an ISC object. It is not a new native group spanning both applications. RequestDesk still evaluates RequestDesk permissions; KnowledgeShelf still evaluates KnowledgeShelf permissions.

If RequestDesk has a feature called Role, that native role would be a separate object. Do not confuse the application's terminology with ISC's role.

## Decide who qualifies separately from what the role contains

The contents answer “what access?”

The assignment configuration answers “for whom?”

Making the role's name Customer request intake does not select Devi. Writing “for working intake staff” in its description does not create a matching condition.

For this example, the business approves automatic assignment only when all of these current identity values are present:

- `department = CustomerOps`.
- `jobCode = SUP-INTAKE`.
- Lifecycle state technical name `working`.

An **identity attribute** is a field on the ISC identity, such as department or job code. A **lifecycle state** represents a stage such as working or departed. Here it is an eligibility input, not a separate grant of this role's access.

The values are compared in one criteria group using **AND**. That means every condition must be met. Using OR would allow someone to qualify by meeting just one condition and would broaden the selected population beyond this approved rule.

For lifecycle-state criteria, the configured value is the state's technical name, here `working`, not an assumed display label.

These conditions are a supplied business policy, not a universal SailPoint rule for support staff. Another organization may need different reliable evidence of responsibility.

Let's test the policy against a few records:

| Current ISC identity values | Result under this rule |
|---|---|
| Devi: CustomerOps, SUP-INTAKE, working | Meets all conditions. |
| CustomerOps, SUP-OBS, working | Does not meet the intake job-code condition, even if the job title says Support specialist. |
| CustomerOps, SUP-INTAKE, prehire | Does not meet the working-state condition. |
| Finance, SUP-INTAKE, working | Does not meet the department condition. |
| CustomerOps, missing job code, working | Cannot satisfy the required job-code comparison; investigate the missing value rather than assuming eligibility. |

The title of the role and a person's friendly job title are not substitutes for the selected fields.

Before applying a shared rule, test expected members and expected nonmembers. A rule selecting everybody in CustomerOps could be technically valid configuration and still implement the wrong business decision.

ISC also supports an explicitly maintained identity list for automatic role assignment. That is a different way to select recipients, not a substitute for knowing why each listed identity should qualify.

## Make sure the rule is reading the right information

A correct condition can still produce an unexpected result if its input is stale, missing or wrong.

An **identity profile** defines how a population's identities are created and managed. Its attribute mappings determine how source information supplies identity fields. An identity profile is different from the access profile holding the RequestDesk entitlement pair.

In this example, an approved HR record supplies Devi's department and job code through configured mappings. The lifecycle configuration supplies her current working-state value.

**Account aggregation** reads configured account data into ISC. **Identity processing** evaluates identity information and applicable configuration, including role requirements.

A value approved in HR, a collected source value and the currently applied identity value are different observations. They can disagree while a change is still moving through the system.

Suppose HR already shows `SUP-INTAKE`, but Devi's current identity still has `SUP-OBS`. The role rule evaluates the configured available input, not the fact that somebody approved a change elsewhere.

Do not broaden the rule to include SUP-OBS merely to make Devi match. Follow the approved value through collection, mapping and relevant processing, and correct the actual fault.

Nor should you change correct HR information to satisfy a badly designed rule. Decide whether the source record, mapping or approved policy is wrong before changing it.

## Follow assignment and delivery as different outcomes

**Role assignment** associates the role with the identity through an applicable assignment route.

**Provisioning** carries out required account or access changes through a supported automatic or manual fulfillment path.

Automatic selection can establish the requirement without successful delivery to every source. A role is not an all-or-nothing transaction across the applications.

Here is a supplied timeline, all on one date in UTC:

- At 08:00, HR contains CustomerOps and SUP-INTAKE, but Devi's applied ISC job code is still SUP-OBS.
- At 08:10, after the relevant collection and processing, her current identity shows CustomerOps, SUP-INTAKE and working.
- At 08:15, the applied role configuration selects Devi and the role assignment is recorded.
- At 08:18, activity reports both RequestDesk memberships added successfully. KnowledgeShelf's reader addition is rejected because the integration actor lacks the required update permission on that account.
- At 08:25, native checks confirm Devi can read and create intake drafts in North. KnowledgeShelf guide access is denied. Refund approval remains denied.

We can now locate the incomplete part.

The rule correctly selected Devi. RequestDesk delivery succeeded. KnowledgeShelf delivery failed. The complete intake responsibility is not yet supported because she cannot consult its instructions.

Removing KnowledgeShelf from the role to make the incident look successful would change the requirement, not repair the rejected operation.

```text
Approved input and saved role
                |
      relevant identity evaluation
                |
     all conditions satisfied?
          /              \
        no               yes
        |                 |
 no assignment       role assigned
 by this rule              |
                required source changes
                    /            \
              RequestDesk   KnowledgeShelf
                 result        result
                    \            /
                 verify each native task
```

The branches show separate decisions and outcomes. They are not an undocumented backend sequence. “No assignment” refers only to this rule; other configured assignment routes would need their own assessment.

The role-assignment view answers whether the role is associated with Devi. Provisioning activity answers what account changes were attempted and reported. Current source-account data and native application checks help establish what access is actually there.

Use the exact identity, source, account, entitlement and observation time. Another employee's success is not evidence that Devi's operation succeeded.

If fulfillment is manual, inspect the work item and completed target change. Automatic role assignment does not imply that every connector performs an automated write.

In a supported account-creation scenario, missing accounts could require additional configuration and operations. The main example deliberately starts with existing accounts; do not infer an account-creation guarantee from its successful membership additions.

## Do not mix automatic eligibility with a request decision

An **access request** asks for specified access for an identity. A requestable role has a request route with its applicable review and fulfillment conditions.

The main role is not requestable. It uses the approved automatic criteria. No separate direct-role-request approval occurs in the supplied timeline.

In an independent design, a temporary cover worker might request an appropriately configured role through an authorized request route. The person does not become an automatic criteria match merely because a request is approved.

Conversely, marking a role requestable does not mean everybody can receive it without review or that every automatic membership criterion becomes a request-eligibility filter.

Keep the route explicit. What selected this identity: current criteria, an identity list or an approved request? That history matters when investigating why access exists and how it should end.

For requested roles, the applicable role-request configuration governs review; do not assume each included access profile runs its own separate approval chain.

A role owner can be configured as a reviewer, but assigning an owner is not proof that every automatic assignment waited for that person's approval.

## Keep the role narrow enough to explain and maintain

A role needs an accountable owner who understands the responsibility and can review its access and recipient policy.

Its description should say what work it enables and where its boundary lies. “Customer request intake: read assigned-queue requests, prepare drafts and read published guides; excludes refund approval and guide publishing” helps a reviewer understand the intended package.

The description informs a decision. The references, assignment configuration and application permissions enforce the actual behavior.

Do not add refund approval just because three senior intake workers need it. Decide whether approval is a different responsibility or a justified exception, with its own eligibility and review.

Likewise, do not create a new role for every person solely because each account has a different assigned queue. First determine whether the access requirements genuinely differ or whether the application already applies the queue scope. This example uses the same two RequestDesk groups with account-specific queue authorization.

The role's contents also do not describe all access Devi currently holds. If she already has an unrelated export permission, assigning Customer request intake does not establish that it was removed.

**Least privilege** means limiting access to what is justified for the authorized work. Omitting a dangerous entitlement from this role is part of that design, not proof that every other assignment or old grant on the account is appropriate.

Plan the ending too. If Devi stops performing intake, identify how the governing assignment ends and which access remains required elsewhere. Role revocation does not itself mean account deletion, and overlapping requirements can affect which entitlements are retained.

Editing the shared role's contents and removing one person's assignment are different changes. Do not use one as an unexplained substitute for the other.

## Work through the decisions

### Case 1: The experienced colleague has refund approval

**Facts:** A colleague with the same job title has the three intake rights plus refund approval. Devi's approved work excludes refunds.

**Reasoning:** Do not copy the colleague's entire access. Confirm the native rights and keep only the justified intake combination in this role. Investigate the colleague's additional responsibility separately; identical titles do not prove identical need.

### Case 2: The rule selects everyone in CustomerOps

**Facts:** The proposed rule checks only department. The department also contains observers who must not create intake drafts.

**Reasoning:** The rule is broader than the supplied responsibility policy. Test the agreed job-code and working-state conditions as well. Changing the role's name will not narrow membership.

### Case 3: HR is correct but the identity is old

**Facts:** HR shows SUP-INTAKE. The applied ISC identity still shows SUP-OBS. The configured criteria use identity jobCode.

**Reasoning:** The required input has not reached the record being evaluated. Trace collection, mapping and application before changing eligibility. A correct HR screenshot alone does not prove the role's current input matches.

### Case 4: The role is saved and enabled

**Facts:** The access contents are correct, but no assignment criteria, identity list or request has selected Devi.

**Reasoning:** An enabled definition does not identify a recipient by itself. Establish an approved assignment route. Do not report a source failure before showing that a requirement for Devi was selected.

### Case 5: The reader reference is from Test

**Facts:** The proposed RequestDesk profile uses the Test source and its reader/draft entitlements, not the verified Production source and references. The names look familiar.

**Reasoning:** Correct the source-specific package before application. A role can span sources, but that does not make Test access satisfy a Production requirement. Each access profile must still group entitlements from its own selected source.

### Case 6: The role is present but guides are unavailable

**Facts:** Devi matches the criteria and holds the role. RequestDesk works; KnowledgeShelf's addition reports a permission rejection.

**Reasoning:** Preserve the valid requirement and investigate KnowledgeShelf's exact account operation and authorized recovery. Verify guide reading after correction. Do not treat role presence as delivered access or remove a needed right merely to hide the failure.

### Case 7: A cover worker's request is approved

**Facts:** In a separate requestable-role design, the worker receives an approved role assignment but does not match the automatic intake criteria.

**Reasoning:** Identify the request as the assignment origin. Approval does not rewrite identity attributes or prove an automatic match. Check the applicable request conditions, scope and delivered native rights.

### Case 8: Refund approval already existed

**Facts:** Before receiving the narrow intake role, Devi's account already held a refund-approval group through an unrelated grant. No refund-removal operation occurred.

**Reasoning:** The role's exclusions do not withdraw that old membership. Investigate its origin and current justification, then plan any authorized removal with the relevant retained requirements. Do not claim least privilege from this role's definition alone.

## Try the same reasoning in a laboratory

A laboratory sample-intake responsibility requires reading assigned-lab sample records, creating draft intake records and reading published handling instructions.

Releasing test results is a separate responsibility. A senior colleague already has result release, and a vendor demonstration shows a convenient “all laboratory staff” group.

The laboratory system also requires a named-user license before draft creation can work. License capacity and the exact rights of the broad group have not yet been verified.

What can you approve now, and what is still missing before an engineer can define a complete role and promise delivery?

The responsibility and exclusions are clear enough to guide discovery. They are not yet a verified entitlement list.

Confirm the exact reader, draft and instruction rights, the license dependency, native resource scope and intended recipients. Do not copy result release or choose the broad group just because it is convenient.

A role may combine the justified references across sources. Its assignment rule needs reliable evidence of the sample-intake responsibility, not the fact that someone works somewhere in the laboratory.

Unknown license capacity prevents a delivery promise even after the reference is included. Establish the required configuration, then verify each account's fulfillment and the actual draft-creation action.

You now have a defensible chain: the work explains the access; the policy explains the recipients; the configured role represents that requirement; separate account evidence establishes what was delivered. If one link is missing, you can name what still needs to be established instead of treating “the role is there” as the whole answer.
