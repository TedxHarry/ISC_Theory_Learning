# The job started. Why do the screens still disagree?

Devi is due to receive access for an evening support assignment. The job reevaluating her identity has started, but the search screen still shows the earlier value. An account change is waiting, and an account report does not show the new group.

Should you wait, start processing again, reload the account, or investigate a failed change?

The answer depends on which work has actually happened.

SailPoint Identity Security Cloud (ISC) does not turn every participating record and screen into one simultaneous observation. A business condition becoming true, an identity value being applied, an access change reaching a target, and a view displaying the result are different boundaries.

**Identity processing** reevaluates mapped person-level information and applicable relationships and access requirements. **Search** provides a searchable representation of identity and access information; it is not a direct query of every connected target system.

Let's follow the evidence without assuming that every old value has the same cause.

## Establish the dependency before looking at the clock

Devi's employee number is 97007. Her ISC **identity** is the person record. We will label it I-97007; this is a teaching label, not an actual ISC object ID.

Her worker account `sr-97007` on StaffingRegister Production is correctly associated with that identity. A **source** is ISC's configured representation of a system's account data. StaffingRegister is authoritative for this population, meaning its worker records establish and maintain the related identities.

The Employees **identity profile** holds shared instructions for calculating their identity values. An identity **mapping** specifies where a value comes from. A **transform** performs a calculation when direct copying is not sufficient.

A custom **identity attribute**, supportWindow, is a field on the person record. Its approved calculation is:

- Read assignmentStart from Devi's selected StaffingRegister account.
- Compare the evaluation time with that instant.
- Return Scheduled before it, and On duty at or after it.

The selected input is already collected into ISC and contains `2026-10-23T20:00:00.000Z`. The Z means UTC, the shared time reference used for all observations in this example.

The comparison reads its required account input directly. It does not depend on another identity field being calculated first.

Devi's **identity state**, the setting controlling participation in particular ISC processes, is Active. The tenant's configured time zone is UTC.

An enabled automatic **role**, Night Support, tests whether identity supportWindow equals the exact text On duty. A role groups access requirements and can assign them through configured conditions.

Night Support contains the enabled Night Tools **access profile**, a bundle of related access from OperationsDirectory. Its required **entitlement**, the governed access item, is ordinary membership in group `NIGHT-BASE`.

Devi already has correctly associated OperationsDirectory account `od-97007`. Initially, it lacks NIGHT-BASE. The source supports group addition and has provisioning enabled. There is no separate activation step, new account creation, access removal or attribute-sync write in this example.

**Provisioning** performs the required change in the connected system. The role assignment records the requirement; it does not itself prove membership on od-97007.

The calculation's periodic reevaluation requirement is configured, and roles are implemented in this tenant. Devi therefore meets the Active-state condition for the evening recurring identity-processing population.

The input, saved instructions and assignment configuration were applied and checked before this evening. No configuration changes or competing data changes occur during the observations below.

These records, configuration and outcomes are fictional. No real tenant, job or target account is changed.

## A dependency tells you what must be available

For this calculation to produce the intended result, ISC needs the selected account's assignmentStart and an evaluation at or after that instant.

For Night Support to qualify through this condition, the relevant identity supportWindow must be On duty. Delivering the role's group membership then requires a supported provisioning operation to the intended account.

**Dependency** means a result relies on particular information or a preceding outcome. It does not mean you can prescribe a universal internal execution order for every ISC field or service.

The useful relationship is:

```text
Collected assignmentStart + current time
  -> supportWindow calculation
  -> verify applied identity value
       |
       +-> Night Support role condition
       |     -> NIGHT-BASE requirement
       |     -> provisioning
       |     -> verify target membership
       |
       +-> updated identity view in Search

Later account collection
  -> fresh collected membership evidence
```

The arrows describe inputs, consumers and evidence boundaries. They do not show private worker services or queues, and they do not promise that Search updates before or after provisioning.

The separate account-collection path is a way to obtain fresh account evidence. It does not claim every connector waits for another aggregation before ISC can represent its own provisioning changes.

**Aggregation** collects account data from a source. A fresh account read can establish what a target returned at that read. An old account snapshot cannot establish what the target contains now.

You can reason that correct inputs and configuration call for On duty and Night Support after the boundary. You still need evidence that the relevant calculation was applied and the required membership was delivered.

## Queued is not running, and running is not finished

Work is **asynchronous** when initiating it and receiving its completed result are separate events. The initiating action does not establish that every dependent operation has completed before you inspect another screen.

A job being **queued** means it is waiting to execute. A job being **running** means execution has begun. A completed job has reached its own completion boundary, which you must identify.

These are reasoning terms, not a universal set of status values used by every ISC page or API.

Recurring identity-processing jobs are queued at their configured times. Other queued or in-progress work can delay their start. Here the relevant evening queue time is 20:00 in the configured UTC tenant.

A queued job does not mean that Devi's identity value changed at 20:00. A running job does not prove that her identity has already been reached or that her access change finished.

If the business requires usable access exactly at 20:00, the 20:00 queue time is not a readiness guarantee. That requirement needs an appropriate supported design and delivery verification; the schedule alone cannot establish it.

Completion of identity processing does not validate that provisioning subsequently delivered the access successfully.

The Active Jobs view helps you inspect running work. Relevant job records, current identity information and individual provisioning activities answer further questions. Do not use one broad status to replace all of them.

## Put the observations in order, not the imagined backend

At 19:58, Devi's current supportWindow is Scheduled and Night Support is not assigned. The configured start instant is still in the future.

The supplied observations on October 23, 2026, are:

```text
All times UTC; October 23, 2026

20:00 recurring processing job queued
20:04 job observed running
20:06 current supportWindow: On duty
      Night Support assignment verified
20:07 Search still shows Scheduled
20:08 group-add activity Status: Pending
20:09 add confirmed; target group seen
20:12 Search shows On duty
20:21 fresh collected account shows group
```

At 20:06, relevant identity processing and Devi's current value and role are verified. That observation does not state that every identity in the tenant has finished processing.

At 20:08, Pending is the overall account-activity Status field for this specific group addition. It says the activity has not yet been attempted and is scheduled for an attempt. It is not a failed result.

At 20:09, both the specific addition result and a fresh target check confirm NIGHT-BASE on od-97007. We can now establish that membership at that time.

The later 20:12 Search observation establishes that its identity result now shows On duty. The 20:21 account collection supplies another membership observation.

These are supplied observation times, not a promise that jobs wait four minutes, processing takes two minutes, provisioning takes one minute or Search catches up within six minutes.

A target change and a view update can become observable in a different order in another case. The dependency diagram does not require these timestamps.

## Separate a stale view from an unapplied result

Search results are evidence from that view, rather than a live observation of every source account.

ISC synchronizes updated identity data across services, including Search. That visibility can lag an update. This is **visibility delay**: an available view has not yet displayed a change established elsewhere.

At 20:07, we have a current identity observation from 20:06 showing On duty, while Search still shows Scheduled for the same identity.

The disagreement supports investigating propagation to that view. It does not, by itself, justify changing the transform or adding the role manually.

Now change the facts. Suppose there is no verified current identity result, and both the identity detail and Search still show Scheduled.

You have not established a visibility-only problem. The selected input could be wrong, the job could still be waiting, the identity might not have been included, or the mapping could have returned another result. Check those possibilities before labelling the result stale.

The same discipline applies when a result is missing rather than old. Verify the exact identity, query, filters, permissions and observation time. A query that excludes On duty records will not become correct by waiting.

There is no fixed delay that proves success or failure for every change. Time passing is a reason to check progress against the operational requirement, not proof that the intended result exists.

## An old account report is a different kind of old evidence

Suppose the OperationsDirectory account report you are reading at 20:10 was captured at 19:50. It shows no NIGHT-BASE.

The report is consistent with the initial state. It cannot contradict the fresh 20:09 target observation merely because you opened the report later.

Separate the **observation time**, when data was actually checked, from the time you opened or downloaded a view containing it.

At 20:21, a fresh collection shows the group too. That makes the collected account evidence more recent; it is not what originally created the membership.

In a real investigation, compare the same source, account identifier and group identifier. A personal account and an administrator account on one identity are not interchangeable. Neither are two groups with similar display names.

If ISC's current account view and a target observation disagree, investigate their actual update paths and freshness. Do not assume all source-account changes have one universal write-back or collection rule.

A generic connection test also cannot settle the membership question. It checks a connection capability, not whether this particular account currently has this particular group.

## Read the status field, not just its word

The word Pending does not have one meaning everywhere.

ISC distinguishes overall account-activity Status, the activity's Stage and the status of an individual account request within that activity. A broad activity can involve more than one account or action.

Use the field and record together:

A **connector** is the integration that communicates with the source system. Sending work to it is not the same observation as a successful group addition.

| Field and value | Meaning relevant to investigation |
|---|---|
| Account-activity Status: Pending | The activity has not been attempted yet; it is scheduled for an attempt. |
| Individual account-request status: Pending | Actions on that account are in progress. This is a different field from overall Status. |
| Individual account-request status: Committed | Requests have been sent to the connectors. That is not confirmed successful delivery. |
| Individual account-request status: Finished | Results were confirmed on the source, whether successful or failed. Inspect the actual result. |

At 20:08 in our timeline, the evidence explicitly names the overall Status field. Without that context, “it says Pending” would be ambiguous.

Finished is another word worth inspecting closely. It does not turn a failed permission check into a successful write just because the attempt has reached an end.

An activity's overall Complete badge also needs its context. For example, an access request asks for access for a person; a rejected request can still show a Completed badge although no account changes took place. Completion of the request's handling does not mean the requested access was granted.

Use the specific operation, account, outcome and any error details to explain what completed.

## Waiting cannot manufacture a missing dependency

Suppose the real StaffingRegister assignmentStart is 20:00, but ISC's selected collected account still contains tomorrow's date.

Waiting for Search will not correct the calculation's input. A successful evaluation using that later date could correctly return Scheduled according to the data available to it.

Trace the dependency: the approved producer value must reach the selected source account data; then relevant identity processing must evaluate the intended input; then applicable access delivery must complete.

Likewise, a saved mapping correction is not proof that the current identity value has been recalculated. A correct Preview is evidence of a selected evaluation, not proof of an applied identity or delivered group.

There is also an unsupported dependency you should avoid creating. The identityAttribute transform is not intended for use inside another identity-profile attribute calculation. Such a design cannot assume that a peer field has already been calculated and contains current data.

If one identity field is built by reading a supposedly “just calculated” peer field, a longer wait or repeated processing is not a substitute for a supported input design. Use the required account inputs and a suitable calculation rather than assuming field order.

This is different from a real cross-system dependency, such as needing an account identifier generated by a target before another integration can use it. In that case, establish how the identifier is produced, collected and made available to the next consumer. A guessed sleep interval does not establish that the identifier exists.

## Choose the next action from the boundary that is missing

Use a small evidence record for the issue: identity identifier, source and account, expected value or membership, relevant configuration, job or activity reference, field-level status, observation time and last confirmed result.

Do not invent one common transaction identifier joining all systems. Use the actual references available for each operation and connect them through the intended identity, account and change.

| Last confirmed boundary | Useful next check |
|---|---|
| Expected job is queued, with no start evidence | Check that job's current execution state and selection requirements before submitting more work. |
| Current identity is correct; only Search is old | Verify the same record/query and follow view-update evidence rather than recalculating a correct value. |
| Role is assigned; target operation is Pending | Inspect the specific activity's field, stage and progress. Target membership is not yet established. |
| Attempt ended with an error, or target state is wrong | Investigate that operation and approved recovery; do not rename the problem “visibility delay.” |

Repeated submission can add work without addressing the cause. It can also make it harder to determine which observation belongs to which attempt.

Before repeating anything, establish whether the earlier operation is still running, whether it failed, whether the new attempt has an appropriate scope, and whether the operation is safe and supported to repeat.

Retry handling is process-specific. Provisioning recognizes particular retryable errors; that does not make every failure retryable or guarantee completion at the next nominal retry time.

A fixed sleep is therefore a weak completion test. A useful check asks whether the required result has been established. If progress is absent or the required access deadline is at risk, use the approved operational escalation path with the evidence gathered.

Waiting should have a reason, an expected next observation and a review point. It should not hide an uninvestigated failure.

## Work through the competing explanations

Treat these variations independently.

### 1. The schedule says 20:00

**Facts:** The job is queued at 20:00. At 20:02, no execution start or current On duty result has been verified.

**Reasoning:** Queue time is not completion time. Check execution and the specific identity's inclusion and result. The facts do not establish a failed transform, a completed role assignment or a two-minute processing guarantee.

### 2. Search still says Scheduled

**Facts:** At 20:07, the same identity's current applied supportWindow was verified as On duty at 20:06, but Search still shows Scheduled.

**Reasoning:** Investigate the view's update and exact query rather than assuming the calculation failed. The current identity observation provides the distinction. Without it, a visibility-only explanation would remain unproven.

### 3. The report does not show the group

**Facts:** A report opened at 20:10 contains account data captured at 19:50. A fresh target check confirmed NIGHT-BASE at 20:09.

**Reasoning:** The old report does not contradict the later target observation. Compare observation times, not opening times. Use a fresh account read if current collected evidence is required.

### 4. Two records say Pending

**Facts:** One record shows overall account-activity Status Pending. Another shows an individual account-request status Pending.

**Reasoning:** The first describes an activity not attempted yet; the second describes account actions in progress. Neither establishes successful membership, and neither word alone proves failure. Inspect each field and the exact related operation.

### 5. Finished includes a permission failure

**Facts:** The individual account request is Finished, and its result says the group addition failed for insufficient permission.

**Reasoning:** The attempt reached its result boundary; it did not deliver the group successfully. Investigate the permission and supported recovery. Waiting for Search cannot convert that failed write into a successful one.

### 6. The mapping reads a peer field first

**Facts:** A proposed supportWindow calculation reads a newly calculated identity assignmentStart using identityAttribute. The designer assumes the assignmentStart mapping always runs first.

**Reasoning:** That order is not a supported guarantee for another identity-profile calculation. Use a supported dependency design based on the required available inputs. A successful run once does not validate the ordering assumption.

### 7. The intended date was never collected

**Facts:** The producer has the approved 20:00 start, but the account input selected in ISC still contains tomorrow's start. The calculation uses that collected input.

**Reasoning:** Investigate collection and input selection first. An evaluation returning Scheduled can be consistent with that wrong input. Neither waiting for Search nor manually granting access repairs the data dependency.

### 8. The aggregation was cancelled partway through

**Facts:** An aggregation is terminated. Its execution details show account data was collected before termination, including an updated record for one employee.

**Reasoning:** Termination does not establish that nothing changed. Review the collected records and any resulting identity or delivery evidence. Do not assume cancellation reverses completed effects or proves every account in the intended population was reached.

## Try a more urgent disagreement

A departing employee's assigned **lifecycle state**, the business-stage configuration that can drive access and account actions, is Terminated. Its reviewed configuration requires disabling an existing directory account.

The current identity shows the expected lifecycle assignment. Search still shows the earlier business stage. The exact account-disable activity has ended with a permission error, and a fresh target check finds the account enabled.

An administrator proposes waiting for Search to catch up before taking any other action.

What does that proposal miss?

There are two separate issues. Search has an old representation of an assignment already verified elsewhere. The directory disable has a specific failed attempt and a fresh incorrect target state.

A later Search update could resolve the visibility disagreement without disabling the account. Follow the approved urgent recovery or escalation process for the failed disable, using the exact account, operation and error evidence. Do not claim the account was secured because the lifecycle label changed.

After recovery, verify the target account's required state separately from the view. Do not assume the recovery mechanism or its outcome from the supplied facts.

For Devi, we can state that On duty and Night Support were verified at 20:06, NIGHT-BASE was confirmed at 20:09, and Search displayed the updated value at 20:12. We cannot replace those separate observations with “everything finished at 20:00.”

That is the difference between following a dependency and guessing from a clock.
