# Building access management is only the beginning

Lesson ID: SYS-005  
Revision: 1.1

An invoice application has been connected to SailPoint Identity Security Cloud, or ISC. Its accounts are visible, a connection check succeeds, and the project team says the application is ready.

Then the first employee asks for access.

Who decides whether she should receive it? Which permission should be added? What happens if the application rejects the change? Who notices? And when she no longer needs the permission, how does it get removed?

A working connection doesn't answer those questions.

Connecting the application is part of building an access-management service. That service also needs an agreed design, people who can operate it, a way to investigate failures, and decisions about whether access remains appropriate.

These are connected kinds of work. They don't stop being connected when a project goes live.

## Four kinds of work, not four isolated teams

**Implementation** turns an agreed requirement into a working, tested arrangement. In ISC, that can include connecting systems, representing their access, configuring how access is approved and delivered, and establishing how the result will be checked.

**Administration** keeps that arrangement operating. It includes maintaining approved configuration, monitoring scheduled work, managing assigned tasks, and coordinating planned changes to the integration.

**Support** investigates a reported or detected problem. It establishes what failed, how widely it failed, and what authorized action can restore the required outcome.

**Governance** establishes and reviews the rules and decisions about access: who should have it, why they need it, who may approve it, and whether it should continue.

Those descriptions concern the work, not job titles. One engineer can contribute to implementation, administration, and support on the same day. A manager's access decision can be governance work without the manager being part of a team called “Governance.”

The distinction helps you recognize what a task needs before choosing an action.

| Work | Question it needs to answer | Useful output |
|---|---|---|
| Implementation | How will the approved requirement work in this environment? | A tested design, configured integration, and operating instructions |
| Administration | Is the agreed service operating, and what needs planned maintenance? | Monitored operation, maintained configuration, and tracked follow-up |
| Support | Why is the expected outcome missing or wrong? | Evidence-based diagnosis, authorized recovery, and verified result |
| Governance | Is this access justified, and what decision should govern it? | An approved requirement, review decision, or documented exception |

A support ticket can reveal a design defect. A governance decision can require an implementation change. Administration can detect a failure before a user reports it.

These connections matter more than finding one permanent label for every task.

## Start with what the application must allow

Consider a fictional invoice application. Devi is a finance employee assigned to check supplier invoices. She needs to read an invoice and mark it as reviewed. She must not be able to release a payment.

The application already has an enabled account for her, `inv-15005`, but it does not yet have the invoice-review permissions.

An **account** is a record through which a person or service uses a particular system. An **identity** in ISC represents the person and brings together information about their accounts and access.

The application owner has confirmed these permission meanings:

| Application permission | What it allows |
|---|---|
| `INVOICE_READ` | Read invoices within the account's assigned business scope |
| `INVOICE_MARK_REVIEWED` | Mark an invoice as reviewed within that scope |
| `PAYMENT_RELEASE` | Release a payment |

These names and behaviors are invented for the example. A real application might combine or separate permissions differently.

The approved requirement is that an employee with invoice-checking duties can request the first two permissions, subject to a manager's approval. Payment release is outside this request.

An **access request** asks for specified access for a person. Approval is the decision that the requested access should be provided under the applicable conditions. It is not the application change itself.

Notice what governance has already contributed. It has established the permitted work, the decision authority, and a boundary that must not be crossed.

If the implementation starts by copying an application's “Finance Administrator” permission because its name sounds suitable, it has skipped that reasoning. A permission that allows invoice review and payment release would not satisfy this requirement.

## Translate the requirement into a design that can run

A **source** is ISC's configured representation of an external system or collection of account data. A **connector** provides the integration for reading data and, where supported and configured, making changes.

The project creates an invoice source. It must establish what the selected integration can actually do.

A **technical account** is an account used by the integration to communicate with the application. Its permissions determine what the integration can do. It is separate from Devi's account and the permissions she needs for her work.

Can it read the required accounts and permissions? Can it add and remove those permissions? Does the application's technical account have the privileges needed for each operation? Is the needed ISC capability available in the organization's environment?

Those are separate questions. A connector's supported operation can still fail if its configured technical account lacks the required privilege.

**Aggregation** reads account information into ISC. **Account correlation** associates an account with the appropriate identity using the applicable matching configuration. An **attribute** is a named value on a record, such as an employee number.

For this example, Devi's identity and application account both contain employee number `15005`. The implementation uses an agreed employee-number match, with checks that the values are present and identify the right person.

The purpose is not merely to make a record appear. It is to associate `inv-15005` with Devi, so subsequent decisions and changes refer to the intended person's account.

An **entitlement** is an access item represented from a source, such as one of the application's permissions. An **access profile** bundles related entitlements from a single source.

Here, the team defines an access profile called “Invoice review,” containing `INVOICE_READ` and `INVOICE_MARK_REVIEWED`. It configures the profile for requests with the approved manager-review process.

**Provisioning** performs account or access changes in a target system. The **target system** is the system receiving the change. For this example, the invoice integration supports adding and removing the two permissions on existing accounts.

The initial design deliberately covers people who already have one correctly associated invoice account. Creating new application accounts is outside this release. That boundary must be visible to support and to the people requesting access, not hidden in an engineer's memory.

We also assume that no other access assignment requires these two permissions, and that the application enforces them as described. That keeps later removal behavior clear.

The design now has a causal path:

An eligible employee asks for Invoice review. The configured reviewer makes a decision. If approval allows fulfillment to proceed, ISC attempts the supported permission changes on the associated account. The application applies or rejects those changes. Engineers examine the result and verify the required target behavior.

Configuring those objects is implementation work. Deciding whether invoice review is appropriate for that employee remains governance work.

## What would make you accept the implementation?

Suppose a project demonstration shows one approved request and a green connection check.

Would you accept the service on that evidence alone?

You know that a connection check succeeded and an approval was recorded. You still need evidence for delivery, boundaries, failure handling, and removal.

**Acceptance criteria** are the observable conditions that must be satisfied before the agreed work is accepted. They translate “make access management work” into checks that can pass or fail.

For the invoice design, useful criteria include:

- The request changes `inv-15005`, not another employee's account.
- Approved invoice-review access permits the intended invoice operations.
- `PAYMENT_RELEASE` is not granted.
- A denied request doesn't grant the requested permissions.
- A delivery failure is visible to the people expected to handle it.
- An authorized removal can remove the review permissions without deleting the account or changing unrelated access.
- A person without a suitable existing account is handled through the agreed exception path, rather than being treated as a successful fulfillment.

These checks don't have to use real invoices or real payments. Use authorized test accounts and non-sensitive test records in an appropriate environment.

An **exception path** is the agreed way to handle a case the normal design doesn't cover. It might direct someone to an existing account-creation process. It is not automatic permission to bypass the access decision.

A **test environment** is a separate place for checking changes without exposing ordinary production work to those experiments. **Production** is the environment used for real operations. Differences between them still need examination: account permissions, connection details, and source data can differ.

Testing in one environment is evidence about what was tested there. It is not a guarantee that an unexamined production configuration behaves identically.

A connection check also has a limited meaning. Its behavior depends on the connector. Don't assume it tests every read, grant, and removal operation. Verify the capabilities required by the design with evidence appropriate to those operations.

The project should test an expected denial as carefully as an expected grant. Otherwise, it can demonstrate that access can be added without demonstrating that inappropriate access can be prevented or removed.

## The handover needs more than screenshots

**Go-live** is the point at which the agreed service starts being used for real work. It does not mean every future change has already been designed or every future failure has been eliminated.

Before go-live, the people operating the service need to understand its assumptions and limits.

A **runbook** is an operating guide for a defined task or problem. A useful runbook states when to use it, what to check, what actions are authorized, what result to expect, and when to stop or escalate.

Compare two instructions:

> “If access is missing, run aggregation.”

> “Confirm the person, target account, and requested access. Check the request decision and delivery result. If the target already has the correct permission but ISC's collected account data is older, investigate the collection. If delivery failed, inspect the reported error before choosing recovery.”

The second instruction explains how to choose the action. The first could send an operator toward a data collection when the actual problem is an application rejecting a write.

For the invoice service, a handover should make these facts available:

| Operating fact | Why the next person needs it |
|---|---|
| Existing accounts only; one associated account in this release | Prevents treating unsupported account creation as a routine retry |
| The two permissions in Invoice review and their business scope | Lets support distinguish missing review access from a different requirement |
| Manager approval is configured | Establishes the expected decision route |
| Read, grant, and removal capabilities and required privileges | Supports operation-specific validation after maintenance |
| Where to find request, activity, and target evidence | Makes diagnosis possible without reconstructing the implementation |
| Collection schedule and expected freshness agreed for this source | Helps distinguish old observations from delivery failures |
| Failure owner, escalation contact, and manual fallback conditions | Prevents failed work from remaining unowned |

Store references to approved credential-management procedures, not passwords or tokens in the runbook. A **credential** is information used by an account or integration to prove its identity, such as a password or token.

The support team also needs known limitations and unresolved risks. A handover that says “everything works” but omits an untested removal path transfers uncertainty without telling anyone.

## Administration keeps the design usable

After go-live, requests continue to arrive. Scheduled collections run. Owners change jobs. Credentials need renewal. The application team changes its maintenance schedule.

Administration handles this continuing work within agreed authority.

For the invoice source, an administrator can check whether scheduled collection completed, whether the expected account population was included, and whether failed changes or manual tasks need attention.

A **manual task** assigns a change to a person when that part of fulfillment is not performed automatically. Its existence means work has been assigned, not that the application has already changed.

Don't make “no user complaints” your only measure of service health. A person can be unaware that access should have been removed, and a failed removal might not generate a complaint from them.

Useful monitoring asks questions that lead to action:

How many delivery operations failed, on which source, and since when? Are removal tasks waiting beyond the agreed handling time? Is a collection recent but missing a portion of the expected population? Has an owner departed without a replacement?

The organization decides which signals require an alert and who responds. ISC provides activity, task, and source information; a notification and response arrangement still needs to be designed and operated.

A planned maintenance action also needs a defined result. **Credential rotation** replaces the credential used by an integration. After rotation, checking only that the connector can read accounts leaves its write operations unverified.

“Routine” describes how familiar the work is. It does not describe how little harm a mistake can cause.

## When expected access doesn't arrive, the work changes

A month after go-live, Devi submits an Invoice review request. Her manager approves it, but she still cannot review an invoice.

This is a fictional incident. An **incident** is an interruption or failure of an expected service. The report is a starting observation, not a diagnosis.

“Devi can't review invoices” could describe a missing permission, the wrong account, a delivery failure, or a restriction inside the application. It could also be a misunderstanding of what Invoice review is supposed to allow.

Support first establishes the intended operation and checks the specific request.

In this case, the evidence is:

| Evidence | What the investigation finds |
|---|---|
| Request | Invoice review for Devi, approved by the configured manager |
| Target account | `inv-15005`, confirmed as the intended account |
| Provisioning activity | Attempts to add both permissions were rejected for insufficient integration privilege |
| Current target permissions | Neither requested permission is present |
| Recent maintenance | The integration was moved to a replacement technical account |
| Replacement account privileges | Account reading is allowed, but permission changes are not |

The target rejected both additions before applying them. A different incident could involve partial delivery, so don't copy that conclusion without inspecting the individual operations.

Here, the recent maintenance is relevant because its changed privilege set explains the failed writes. Merely occurring shortly before a failure would not, by itself, prove causation.

A connection check still succeeds because, in this fictional integration, that check doesn't exercise the missing permission-change privilege.

The important distinction is between Devi's application account and the integration's technical account. Resetting Devi's password does not supply the connector with the missing write privilege.

Changing the manager approval process would not fix it either. The intended reviewer already approved the request.

## Recovery is a controlled change, not a guess

Support has identified the failing boundary: the application rejects writes from the replacement integration account.

The authorized application administrator and ISC operator now need an approved correction. That could mean granting the replacement account the required, limited integration privileges and checking the configured connection.

It does not mean granting unrestricted application administration because that seems easier. The required privileges should follow the connector's documented needs and the approved operation scope.

Before recovering the failed requests, inspect their current state. Check for partial changes, manual work already performed, or retries still in progress. An operator should not submit duplicate access changes while another recovery is already running.

The exact recovery action depends on the supported behavior for that operation and its current status. There is no single retry instruction that is safe for every failure.

For this example, the team confirms that neither permission was added and that no recovery is still pending. After correcting the integration privilege, it uses an authorized supported recovery path. Target checks then confirm that Devi can perform invoice review and has not received payment-release access.

Support should check the affected population too. If the replacement technical account serves the whole source, Devi might be the first person to report a wider failure. Inspect operations during the affected period, including removals, rather than assuming the issue ended with her ticket.

The **scope of impact** is the set of people, accounts, operations, and time period affected by the fault. It determines how much recovery and verification are needed.

A service can be restored for Devi while other failed work remains unresolved.

## Fixing the incident doesn't automatically prevent the next one

What made this incident possible?

The immediate cause was the missing privilege on the replacement technical account. But the maintenance procedure accepted a successful connection check as sufficient verification.

Correcting the privilege restores the capability. Correcting the maintenance procedure reduces the chance of repeating the same mistake.

**Problem investigation** examines the cause behind incidents and what would prevent recurrence. It can continue after the immediate service interruption has been resolved.

For this example, the follow-up is to revise the runbook so replacement integration accounts are validated against the required read, add, and remove operations. The team also adds a review of failed work after the change.

That follow-up draws on implementation knowledge: which operations were designed and tested in the first place? It becomes administration guidance: what must be verified during future maintenance? It gives support better evidence when a failure recurs.

If investigation instead reveals that the chosen integration cannot support a required operation, that is a design limitation. Repeating the same attempted write won't turn an unsupported capability into a supported one.

The service needs a revised design, such as an approved manual fulfillment path, with its own ownership and evidence requirements.

## Governance continues while the service is running

Later, Devi moves to supplier coordination. She remains employed and still needs her invoice account for another permitted activity, but invoice checking is no longer part of her duties.

Nothing about a healthy connection or successful past approval proves that Invoice review remains appropriate.

A **certification campaign** organizes the review of existing access. A **certification** is an assigned review within it. The designated reviewer examines its access items and makes the decisions supported for them, such as retaining or removing the requested access in this example.

In this example, the review includes Devi's Invoice review access. The reviewer has her current responsibilities and the permission description, and decides it should be removed.

That decision is governance work. **Remediation** is the work required to carry out the decision, such as removing access that was marked for revocation.

The approved removal must proceed through the applicable supported process, and someone must verify the result. A recorded revoke decision isn't evidence that the application has already removed the permissions.

Our example assumes the profile was granted through a request and that no other assignment requires its permissions. Real assignments must be inspected before reasoning about removal. Those conditions don't describe every combination of access assignments or overlapping permissions.

A **role** groups access for a responsibility and can be assigned through configured criteria or requests. Where ongoing criteria still require access, the decision and the assignment design need attention together. Don't falsify correct employee data to force a desired result.

Governance can therefore generate new implementation work. The **access model** is how access is defined, grouped, and assigned. If reviews repeatedly find that the same access is too broad, that model may need redesign. If the permissions are appropriate but their descriptions mislead reviewers, the descriptions need correction and review.

A recurring review is not a substitute for handling a known urgent removal. The organization needs a route for acting when the requirement changes, not only when the next campaign happens.

## Follow the information around the loop

The connections look like this:

```text
Governance: approved need and access boundaries
                         |
                         | requirement
                         v
Implementation: design, configure, test, and hand over
                         |
                         | accepted service and operating guide
                         v
Administration: operate, monitor, and maintain
                         |
                         | detected or reported failure
                         v
Support: diagnose, recover, and verify
             |                         |
             | corrected operation     | design defect or new need
             v                         v
      Administration              Implementation

Access reviews and operating evidence
                         |
                         v
Governance: retain, remove, or revise the requirement
                         |
                         v
Authorized execution and verification of the decision

These are human work and evidence handoffs,
not automatic ISC execution stages.
```

The arrows show what one kind of work provides to another. Implementation passes on an accepted service and operating knowledge. Administration passes failures and evidence into support. Support can return a restored service or identify a design change.

Governance receives information from operation and access reviews, then decides whether the requirement or existing access should change.

This is not a fixed sequence in which an organization finishes governance, then finishes implementation, and never returns to either. The work overlaps because both the business and its systems keep changing.

## Separate the screen action from the consequence

A visible action in ISC can start work beyond the page you're looking at.

Editing an access definition changes configuration. **Identity processing** evaluates identity information and applicable access configuration; applying changes can cause wider access recalculation and provisioning. Its completion doesn't prove every target operation succeeded.

Opening a request shows recorded request information. Provisioning Activity and Account Activity help investigate delivery. A manual-task page shows assigned work. A review page records decisions.

These views help you operate the service, but they aren't interchangeable evidence.

This distinction also matters when someone says, “Just undo the change.”

**Rollback** means returning a change to an earlier state. Restoring an earlier configuration doesn't necessarily reverse access changes that have already reached applications.

For example, deleting an ISC access profile does not remove its entitlements from people who previously held it. Removing granted access is called **deprovisioning**. Removing the definition and removing the target access are different actions.

Before releasing a change, plan for both: how to stop further unwanted effects and how to correct effects already delivered. Identify what can be reversed, what requires separate remediation, and what evidence must be preserved.

That is implementation planning, administration execution, support recovery, and governance authority meeting in one change.

## A different application may need a different delivery model

Now replace the invoice application with a supplier portal whose approved integration can only read an account file. It cannot add or remove portal permissions.

Can ISC still contribute to governing that access?

Yes, within the capabilities configured for the source and the available services. Collected access can inform reviews, and a supported manual fulfillment arrangement can assign work to an operator. The actual portal change must still be made and verified.

Implementation must describe that arrangement honestly. Administration tracks file freshness and assigned work. Support investigates missing files or overdue fulfillment. Governance decides who should hold the access and whether the manual control is acceptable.

Don't describe the service as automatic removal merely because a removal task is created automatically.

The accepted design might require a portal administrator to remove access, record the target evidence, and provide an updated file. If the business requires a removal speed that the proposed manual process cannot reliably meet, the gap needs a decision before go-live.

You either change the design or have the appropriate authority address the risk. Silently treating an unmet requirement as “a connector limitation” leaves the service unable to meet its promise.

## Decide what work is actually needed

### Case 1: requests are approved, but the account is missing

An employee's approved Invoice review request has not completed. Support is told that the employee has no invoice account. The first release explicitly supports existing accounts only. Someone suggests rerunning the same request until it works.

What should happen?

**Reasoning:** First confirm that the account is genuinely absent, rather than merely uncollected or associated incorrectly. If it is absent, use the documented exception route. The current design doesn't promise automatic account creation.

If the organization now wants account creation included, that needs a requirement and implementation change covering required account data, supported creation behavior, testing, and operations. Repeatedly attempting an unsupported path is not a design.

### Case 2: a reviewer asks support to keep access

A reviewer selected removal during a review, then informally asks a support engineer to ignore it because the employee might need it someday.

Should the engineer quietly stop the removal?

**Reasoning:** No. The request conflicts with the recorded decision and gives no approved current justification. The authorized decision owner must resolve the change through the organization's supported process, including any required exception and review date.

Support should establish whether removal is pending, running, or already complete and communicate that state. It must not assume a chat message cancels a submitted operation. If access has already been removed, restoring it is a separate access action requiring appropriate authorization.

### Case 3: Devi's request works after the repair

After correcting integration privileges, Devi's recovered request succeeds. Twelve other operations failed during the same period, including three removals. Their current states haven't been checked.

Is the incident fully resolved?

**Reasoning:** Devi's recovery is one verified result, not evidence about the other operations. Identify the affected accounts, inspect operation and target states, determine whether recovery is already underway, and coordinate the outstanding work.

The removals need attention according to their risk and required timing. Do not treat them as less important simply because no employee has complained.

### Case 4: delete the profile to undo a mistaken grant

An access profile was configured with an excessive permission and granted to users. An administrator proposes deleting the profile as the complete fix.

What is missing?

**Reasoning:** Deleting the definition doesn't remove the entitlements already granted. The team needs to identify the affected population and target permissions, stop further unwanted grants through an appropriate controlled change, and arrange authorized remediation of existing access.

Preserve evidence of the faulty definition and delivered effects. Verify that excessive access is removed without losing access that remains justified. Updating configuration and repairing target state are separate parts of the correction.

## Plan the work for a new service

A warehouse portal is being added to access management. The approved requirement is that supervisors may adjust stock quantities after approval, while other warehouse staff may only read them.

The integration can read accounts. Automated permission changes have not been confirmed. The business wants a pilot next week.

Write what you would need before accepting that pilot, what operations must receive at handover, and what happens if access removal fails afterward.

**One defensible approach:** First agree the pilot population, permission meanings, approvers, and required removal timing. Establish whether the integration supports the necessary writes with the required privileges. Don't infer that from successful reading.

If automated changes aren't available, evaluate a supported manual process with a named operator and realistic completion expectations. The decision owner must accept the actual delivery model, not an assumption of automation.

Test the intended grants, expected denials, removal, failure visibility, and account association using safe test records. Confirm that stock adjustment is unavailable to read-only users. Record any untested requirement as a gap, not a passed check.

At handover, provide the design boundaries, evidence locations, operating procedures, owner coverage, and recovery/escalation conditions. When a removal later fails, support establishes the affected account, permission, operation state, and current target access. Authorized operators restore the required state and verify it. Governance resolves any disputed entitlement to retain access, while a recurring design or maintenance defect becomes tracked corrective work.

Different teams may divide those tasks differently. What cannot disappear is the connection between the decision, its implementation, daily operation, and verified correction.

If a colleague asks how these kinds of work fit together, you can explain it this way:

> Governance establishes what access should be allowed and reviews whether it remains justified. Implementation turns that requirement into a tested service. Administration keeps the service operating, and support investigates and corrects failures. Evidence from operation and support feeds back into both the design and the access decisions. Go-live starts real operation; it doesn't end responsibility for the result.
