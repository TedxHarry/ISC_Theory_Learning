# What should be allowed, what ISC records, and what actually works

Lesson ID: SYS-004  
Revision: 1.1

Devi works in operations. She uses a reporting application to read daily reports. For a temporary assignment, she was also allowed to export those reports into a file.

That assignment ends at 09:00 today. From then on, she should still be able to read reports, but she should no longer be able to export them.

At 09:06, an engineer checks SailPoint Identity Security Cloud, or ISC. The access information still shows the export permission. An application administrator checks the reporting application and finds the same permission on Devi's account.

Both systems agree.

Is the access correct?

No. Their agreement tells us that their records match. It doesn't tell us whether Devi should still have that access.

Now imagine that the administrator removes the export permission correctly. The application stops allowing exports, but ISC's collected information hasn't yet caught up.

The systems disagree. Yet the application is now enforcing the right restriction.

When you're investigating access, you need more than a match between two screens. You need to know what each screen represents, when its information became true, and what the organization wanted to happen.

## First, make “access” specific enough to check

“Devi has access to reporting” is too broad for this investigation.

Does that mean she can sign in? Read one report? Read every report? Export data? Change another person's permissions?

Let's make the example precise. The names, times, records, and results here are fictional.

| Item | What it means in this example |
|---|---|
| Person | Devi, an operations employee |
| Application account | `report-14004`, the account Devi uses in the reporting application |
| `REPORT_READ` | Permission to read the daily operations reports |
| `REPORT_EXPORT` | Permission to export those reports to a file |
| Requirement from 09:00 | Keep reading available; stop exporting |
| Account requirement | Keep the existing account enabled |

An **account** is a record in a particular system through which a person or service uses that system. An **identity** in ISC represents the person and brings together information about their associated accounts and access. Devi's identity and her reporting account are related records, not the same object.

The account name matters. If you inspect one account while Devi uses another, you can produce a perfectly accurate answer about the wrong account.

The permission's scope matters too. Here, both permissions concern daily operations reports. A permission for a different report collection would not answer our question.

For this application, assume the administrator has confirmed that these are direct account permissions, that no other permission grants export, and that the application checks current permissions when handling each export operation. We'll change those conditions later.

The 09:00 deadline is a business requirement. It is not a claim that an ISC expiry setting guarantees enforcement in every application at that exact second.

## What should Devi be allowed to do?

The first view is **intended access**: what the organization has decided should be allowed, for whom, under which conditions, and for how long.

For Devi, the requirement is:

> From 09:00, account `report-14004` must retain `REPORT_READ` and must no longer be able to export the daily operations reports.

Notice that this states both what must stop and what must remain.

Disabling the entire account would stop exports, but it would also prevent legitimate reading. That would not satisfy the requirement.

Where does intended access come from? It can come from an approved job-access policy, a manager's approved request, an application owner's decision, or an approved removal instruction. The organization must identify which decision applies and who has authority to make it.

An **access request** asks for specified access for a specified person. Approval records a decision about that request. It doesn't, by itself, prove that an application has changed.

For temporary access, you also need the applicable period. An approval from last week can be genuine while no longer authorizing today's access.

Don't let the configured rule replace the business requirement in your reasoning.

Suppose an engineer configures permanent export access for every operations employee, although the approved policy permits export only during a temporary assignment. ISC can execute that configuration correctly and still produce the wrong business outcome.

There are two separate questions:

1. Does the configuration express the approved requirement?
2. Did the systems carry out that configuration correctly?

A successful answer to the second question cannot repair a mistake in the first.

## What does ISC actually know?

ISC holds information used to manage access, but that information does not all have the same meaning.

A **source** is ISC's configured representation of a connected system or collection of account data. A **connector** provides the integration that reads data and, where supported and configured, makes changes.

In this example, the reporting source represents the reporting application's accounts in ISC. It is not the reporting application itself.

An **entitlement** is an access item represented from a source, such as a group membership or application permission. Here, `REPORT_READ` and `REPORT_EXPORT` are represented as entitlements.

Now look at the kinds of information an engineer can encounter.

### A definition says what an access item means

An access item can exist in ISC's access model without being assigned to Devi.

For example, an **access profile** bundles related entitlements from one source. A profile named “Operations reporting” might contain `REPORT_READ`. Its definition tells us what the bundle contains. Finding that definition does not establish that Devi holds it.

A **role** can group access for a business responsibility. A configured role assignment can be a reason ISC seeks to provide access. Before treating that assignment as evidence of a completed target change, you still need to check what happened.

Names also need interpretation. “Basic reporting” sounds harmless, but its configured entitlements determine what is included. The application's own permission rules determine what those entitlements allow.

### A decision or assignment explains why access is being managed

A request record can tell you what someone asked for and the recorded decision. An assignment can show a relationship between an identity and an access item.

Neither should be read without context.

**Identity processing** evaluates identity information and applicable access configuration; it is distinct from the application enforcing a permission. During this processing, ISC can detect an access profile when a user already holds its required entitlements.

That detected profile is useful information about the access ISC recognizes. Its presence alone does not prove that ISC originally delivered those entitlements.

If you need to explain how access arrived, investigate its history. Don't invent a delivery story from a current access label.

### An activity record describes work, not every current condition

**Provisioning** is the process of making account or access changes in another system. Removing `REPORT_EXPORT` is a provisioning change when ISC sends that supported removal to the reporting application.

Provisioning activity can help establish which change was attempted, for which account, and what result or error was reported. In a manual fulfillment arrangement, a task instead records the work assigned to a person.

Read the actual operation and its stage. A request decision, a submitted change, and a reported successful operation answer different questions.

Even a genuine successful operation is historical evidence. A different administrator could change the account afterward. You also need to know whether the reported operation covered the exact permission and account being investigated.

### Collected account data describes what ISC obtained

**Aggregation** reads account data from a source into ISC. Depending on the integration and aggregation method, the collection can cover a full set of accounts or supported changes since an earlier collection.

If ISC collected `REPORT_EXPORT` on `report-14004` at 08:45, that gives us an observation of the permission in the collected data. It doesn't establish that the permission is still present at 09:15.

These are different meanings within “what ISC knows”: definitions, decisions, assignments, attempted operations, and collected observations. They aren't one universal current-state indicator.

The distinction is our way of reading evidence. “Intended,” “known,” and “effective” are not three ISC status fields you should expect to find on a screen.

This gives you a way to read the interface. An identity's Access tab presents represented access items. An account detail view presents account information and attributes. Provisioning reports and Account Activity help you inspect change activity. None of those screens is a live test of whether the reporting application will allow an export.

## What can the application actually allow?

**Effective access** is what the application will permit for the account, operation, resource, and conditions being considered.

The **target system** is the system receiving an account or access change. Here, the reporting application is the target.

Its account permissions are one part of the answer. Its enforcement rules determine how those permissions affect an operation.

**Authorization** is the application's decision about whether an operation is allowed. In our example, the application checks `REPORT_EXPORT` when the account attempts an export. With the permission present, the export is allowed. Without it, the export is denied.

The user-facing page is the **front end**. The trusted application services handling the export are the **back end**. Hiding an Export button on the front end is not sufficient evidence that the back end rejects an export request.

You want the actual permission check to enforce the restriction, including when a request reaches the back end through another supported interface.

A successful export establishes that the operation worked under the tested conditions. It does not prove access to every report or through every account.

A failed export needs more interpretation. An unavailable application, an expired sign-in session, and an authorization denial can all stop an operation. Only the last directly tells us that the tested operation was refused for a permission reason.

A **session** is the application's continuing context for a signed-in user. Applications differ in when they reevaluate permissions and how they end existing sessions. Don't assume that removing a permission automatically invalidates every session or every previously issued credential.

For our reporting application, we have explicitly assumed current-permission checks on each operation. That makes the main example straightforward. It is a condition to verify in a real project, not a property ISC can impose on every application.

## Follow the change in both directions

There are two useful directions to keep in view: changing the target and learning about the target.

```text
CHANGE PATH: seek the required target state

Approved business requirement
          |
          v
ISC configuration and authorized change
          |
          v
Provisioning attempt through supported integration
          |
          +-- rejected --> Required target change not completed
          |
          +-- applied ---> Target account permissions change
                                      |
                                      v
                         Application enforces its own rules
                                      |
                                      v
                         Operation permitted or denied

OBSERVATION PATH: collect information about the target

Target account data
          |
          v
Aggregation within configured collection scope
          |
          v
ISC account information

HUMAN CHECK: compare requirement, records, and target evidence.
These paths do not guarantee an immediate round trip.
```

The change path shows an attempted supported operation, not guaranteed delivery. Its rejection branch means the specific illustrated removal was not completed. A more complex change containing multiple operations can require checking each operation separately.

The observation path reads information back. Reading that information is not itself proof that the business requirement has been enforced.

The human check is shown separately because the diagram does not describe a universal automatic ISC comparison that corrects every difference. Nor does it describe ISC's internal service architecture.

Collection can lead to further configured processing, and that processing can initiate other changes. This is why “run aggregation” isn't always a harmless way to refresh a screen.

## At 09:06, agreement hides the problem

Let's inspect the fictional events. All times below are on the same day in the same time zone.

| Time | Event or observation | What it establishes |
|---|---|---|
| 08:45 | ISC collects both reporting permissions on `report-14004` | The collected account data includes read and export |
| 09:00 | The approved temporary export period ends | Export is no longer intended; reading remains intended |
| 09:02 | An authorized removal of `REPORT_EXPORT` is initiated through ISC | A change is being attempted |
| 09:03 | The target rejects the removal because the integration lacks the required removal privilege | This removal attempt did not complete |
| 09:05 | The application administrator reads the current account permissions | Read and export are both still present |
| 09:06 | An authorized check using non-sensitive test data successfully exports a report | The tested export operation is still permitted |

The **integration privilege** here is the reporting-system permission held by the technical account used by the connector. It is different from Devi's permission to export reports.

The connector can have enough privilege to read account data while lacking permission to remove an entitlement. Being able to collect the account is therefore not proof that the integration can make the required change.

What should you conclude at 09:06?

The business requirement is unmet. The current target record and the controlled operation establish that export remains available. The failed provisioning attempt explains why this particular attempted correction did not remove it.

ISC's older collected observation happens to agree with the current target. That agreement isn't evidence that the process worked. In this case, it is consistent with the change failing.

Could you resolve the issue simply by collecting the account again?

No. A new collection of the unchanged account would still find export. It could provide a newer observation, but reading the permission does not remove it.

The team needs an authorized correction to the failed delivery path or another approved way to perform the removal. If continued export creates an immediate risk, that also needs escalation under the organization's incident process. Waiting for a display to update is not a containment action.

## At 09:14, disagreement no longer means the same thing

For this example, the application owner authorizes a manual correction by the application administrator. The engineer confirms that there is no remaining configured assignment requiring export to be granted again.

The administrator removes only `REPORT_EXPORT`. This is an approved target-side change, not a second successful ISC provisioning attempt.

| Time | Event or observation | What it establishes |
|---|---|---|
| 09:12 | Administrator removes `REPORT_EXPORT` from `report-14004` | A separate corrective action is performed in the target |
| 09:13 | Target account check finds `REPORT_READ` present and `REPORT_EXPORT` absent | The inspected account permissions match the requirement |
| 09:14 | Controlled checks confirm reading succeeds and export is denied for a permission reason | The tested application behavior matches the requirement |
| 09:15 | ISC's collected account information still reflects the 08:45 observation | This ISC view hasn't yet incorporated the manual correction |
| 09:20 | A permitted collection obtains the corrected account data and updates the relevant ISC account information | The collected view now reflects the corrected permissions |

At 09:15, blindly trying to make the target match the older ISC observation would restore export. That would undo the correction.

Which view should direct the next action? The approved requirement tells you which outcome is wanted. Current, correctly scoped target evidence tells you whether it has been achieved. The older observation tells you that ISC's information needs attention.

This is why “make the systems match” is not a complete instruction.

The original provisioning failure should remain part of the history. A later manual correction does not turn the 09:03 operation into a success. Record how the requirement was ultimately satisfied and connect that evidence to the original issue.

The deadline was also missed. Correct access at 09:14 does not prove that the 09:00 restriction took effect on time. Preserve the known exposure period and investigate any required usage evidence under the organization's process; the permission records alone don't tell you whether real business data was exported.

The collection at 09:20 is a selected event in this example, not an ISC timing guarantee. A real integration might update information through other supported behavior. Check what actually happened rather than assuming every successful change is followed by the same collection sequence.

## A fresh-looking screen can still contain older information

You open an ISC page at 09:30. What does that timestamp tell you?

Only that you looked at the page at 09:30.

It doesn't tell you when the application account was last read or whether the displayed field has incorporated the change you're investigating.

Keep these times separate:

- **Effective time:** when the business requirement starts to apply.
- **Target event time:** when a change actually occurs in the application.
- **Collection time:** when the relevant account information is obtained.
- **Display or search availability time:** when that information becomes available in the view you're using.
- **Inspection time:** when you read the screen or export the report.

These are evidence labels, not a promise that every ISC screen supplies five timestamp fields. You may need to combine operation records, collection records, and application evidence.

ISC Search provides a searchable representation of information. Updates aren't guaranteed to appear in Search at the exact moment another view changes. Synchronization timing depends on what changed and system conditions.

**Synchronization** here means bringing information in another service or view up to date. It does not mean that Search is contacting the reporting application each time you submit a query.

If a query doesn't find Devi's export permission, check the query's scope, the identity and account relationship, and the freshness of the relevant information before concluding that the permission is absent.

When comparing times from different systems, convert them to a common time zone. SailPoint documents that date-based Search queries use Greenwich Mean Time, or GMT, while displayed Search dates use the browser's time zone. A displayed time and a query value can therefore look different while referring to the same instant.

A careful investigation records both the time and its meaning. “Screenshot taken at 09:30” and “target permission checked at 09:30” are not interchangeable statements.

## Fresh information can still be incomplete

Suppose an aggregation completed a minute ago. Does that mean ISC has a complete picture of every way Devi can export?

Not necessarily.

A collection reads the data its integration and configuration cover. A **filter** limits which records are included. An **attribute** is a named value on a record, such as an account identifier or a list of permissions. The account **schema** describes which attributes ISC represents and how they're organized.

You need to establish whether the relevant account and permission are actually included. A successful collection of one account population does not prove coverage of a separate administrator account or an application permission that the integration doesn't expose.

Consider a reporting application that grants export through either a direct permission or membership in a privileged application group. A **group** brings accounts together so the application can assign access to its members. Removing the direct permission doesn't remove the group's separate grant.

That changes the assumptions of our main example. It doesn't make the example's removal mechanism wrong. It means the real access requirement needs a wider check than that mechanism alone provides.

Likewise, if an application keeps permissions in an existing session, a fresh sign-in test and an old-session test can produce different results. Where the requirement includes stopping existing use, the verification must address existing sessions too.

Missing evidence should make your conclusion narrower:

> “I don't see export in the collected attributes for this account.”

That is more defensible than:

> “Devi cannot export anything.”

To reach the second conclusion, you need evidence covering the relevant accounts, grant paths, resources, and session conditions. Even then, state the scope and time of the checks rather than promising that access can never change again.

## Decide what kind of gap you're looking at

Before changing anything, separate four questions.

**Is the requirement clear and authorized?** If one owner says export must stop and another says it must continue, a data refresh won't resolve that disagreement. The decision needs resolution by the appropriate authority.

**Does the configuration express that requirement?** If an ongoing assignment still requires export, a manual removal can conflict with future configured processing. Inspect the applicable assignment logic before deciding that removal is a lasting correction.

**Did the required target change occur?** A rejection, a manual task awaiting completion, or a change sent to the wrong account belongs here. Read operation-level evidence and current target information.

**Do ISC's relevant views reflect the target evidence?** If the target is correct but the collected view is older, investigate collection scope, results, and subsequent visibility. Don't undo a correct target change just to match an old record.

The term **reconciliation** is used for comparing records or states and addressing differences. When someone asks you to “reconcile the access,” ask what is being compared, which requirement should govern the outcome, and whether they mean investigation or an actual corrective change. Don't assume they are naming one universal ISC action.

Start with read-only checks where they can answer the question. A retry repeats an operation; it isn't merely another observation. If the first attempt's outcome is uncertain, understand the current state and the operation's behavior before repeating it.

The same caution applies to aggregation and identity processing. Processing can evaluate configured access and start provisioning, but its completion does not validate successful target provisioning.

Choose an action because its mechanism addresses the diagnosed gap, not because its name sounds like “refresh everything.”

## What evidence would let you close the issue?

For Devi's requirement, an adequate closure explanation needs to join the decision to the outcome.

First, identify the authorized restriction and its effective time. Then identify `report-14004` and the reporting permissions in scope.

Explain that the initial ISC removal failed, that an authorized administrator performed a separate correction, and that current target evidence confirmed export absent while read remained present.

Include the controlled behavioral checks and their conditions. Here, the application checks current permissions, there are no alternate grants in scope, reading works, and export is denied for a permission reason.

Finally, account for ISC's information. If collection is still pending, say so and assign the remaining follow-up. Don't report every record synchronized when only the target correction has been confirmed.

A short operational update at 09:15 could say:

> Export removal is confirmed for reporting account `report-14004`; reading remains available. The administrator performed the approved correction after the ISC operation failed. Target permissions and controlled application checks support the result. ISC's collected view still contains the earlier permission; collection follow-up remains open.

This distinguishes a confirmed target result from unfinished record maintenance. Whether the overall ticket can close with that follow-up separate depends on the organization's process.

## Work through these before checking the answers

### 1. The screenshot is newer than the change

An engineer initiates an export-removal operation at 11:00. A colleague opens ISC at 11:10 and sees export listed. The last relevant account collection was at 10:30. No target evidence after 11:00 is supplied.

Has the removal failed? What would you check next?

**Reasoning:** The screenshot cannot settle that question. It shows an observation older than the attempted change. The removal might have succeeded or failed.

Check the operation result and the current target permission for the exact account. If target evidence confirms the correct state, investigate updating ISC's relevant observation. If the permission remains, investigate the removal rather than treating collection as the corrective action.

### 2. Every configured step succeeded

The approved policy permits reading only. The configured access profile contains both read and export. The person receives both permissions, provisioning reports success, and the collected account data matches the target.

Where is the problem?

**Reasoning:** The configuration does not express the approved policy. Agreement and successful execution demonstrate that the wrong configured access was delivered, not that the requirement was satisfied.

Compare the approved requirement with the access profile's contents. Involve the decision owner and assess who else is affected before changing a shared definition. Correcting one account alone would leave the broader configuration problem unresolved.

### 3. Search returns no result

A search for export access returns no result for an employee. The application administrator finds export on an account believed to belong to that employee.

Should the administrator add another permission to make ISC recognize it?

**Reasoning:** No. There is no evidence that another grant is needed. Confirm the account's ownership and its relationship to the ISC identity, then check collection coverage, query scope, and synchronization.

The empty result establishes only that this search did not return the expected information. It doesn't establish target absence or authorize extra access.

### 4. The removal worked, but the test still exports

The application confirms that a direct export permission is absent. A controlled test still exports successfully. You don't yet know whether the account has group-based access or whether the existing session retains earlier permissions.

What can you conclude?

**Reasoning:** The direct permission is absent, but effective export access remains under the tested conditions. The business restriction has not been demonstrated.

Investigate the application's other grant paths and session behavior. Don't claim the removal operation failed merely because another route still permits export. Equally, don't claim the overall access-removal requirement succeeded merely because one direct grant disappeared.

## Try the same reasoning in an unfamiliar application

A supplier portal has two accounts for one employee: `supplier-218` and `supplier-admin-218`.

The approved requirement says the employee may read supplier records but must no longer change supplier bank details, through either account.

You receive this evidence:

- ISC Search shows no bank-edit entitlement on the employee's identity.
- A target administrator confirms that `supplier-218` has read-only permissions.
- A test of changing bank details fails with “service unavailable.”
- Nobody has inspected `supplier-admin-218`, and the relevant collection time is unknown.

Would you confirm that the requirement has been met? Write the next checks in the order you would pursue them.

**One defensible answer:** No. The evidence covers only part of the requirement. A service failure doesn't establish permission denial, and the second account is unexamined.

Confirm the two account identifiers and ownership with the portal administrator. Inspect current permissions and other grant paths for both accounts, including any session conditions relevant to continued use. Check whether the collected ISC information includes both accounts and when it was obtained.

Arrange authorized verification using a safe test record or equivalent application evidence, without changing real supplier bank information. Confirm that editing is rejected for an authorization reason while legitimate reading remains available. Record the scope and time of those checks.

These checks can be coordinated in parallel where responsibilities allow. The reasoning requirement is not one fixed order; it is that the unexamined account, unreliable test result, and unknown ISC observation are all addressed.

Now explain the distinction to a colleague without using the reporting example:

> Intended access tells us what should be allowed. ISC records definitions, decisions, activity, and information obtained about access; each record has a scope and a time. Effective access is what the application actually permits under the conditions being checked. We compare those views to find whether the problem is the requirement, its configuration, delivery, visibility, or enforcement. Matching records alone don't prove that access is appropriate.
