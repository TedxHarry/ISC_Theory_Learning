# What change actually starts identity processing?

Devi moves from the Austin office to the Dallas office. HR saves the move, but SailPoint Identity Security Cloud (ISC) still shows Austin for her location.

Someone asks, “Why didn't the event update her?”

Before calling this a processing failure, we need to identify the event. HR saving a record outside ISC, ISC collecting that record, and ISC modifying the corresponding identity are not the same observation.

**Event-based identity processing** is ISC's automatic reevaluation of identity information in response to a qualifying change. The documented initiation condition is an aggregation or provisioning process modifying an identity.

That condition gives us something concrete to investigate. It does not mean that every save in every connected system immediately changes every dependent value.

## Give the change an exact person, record and requirement

Devi's employee number is 92002. Her ISC **identity**, the record representing her as a person, is labelled I-92002 here. That label is for explanation, not an actual ISC object ID.

Her HR account is `pl-92002` on the source called PeopleLedger Production.

A **source** is ISC's configured representation of a system's account data. An **account** is a record on that source. An **attribute** is a named field, such as location.

PeopleLedger is authoritative for this employee population: its worker records establish and maintain the related identities. Devi already has a valid identity and one correctly associated PeopleLedger account.

The Employees **identity profile** supplies shared configuration for this population. Its location **mapping** tells ISC to use the associated PeopleLedger account's location field for the identity's location.

The selected value is copied directly. There is no calculation, code translation or fallback between Austin and Dallas in this example.

Devi also has WorkDirectory account `wd-92002`, already correctly associated with her identity.

**Account correlation** is the matching and association of an account with an identity. We are not trying to correct ownership here. We need to follow a changed field on the right person's account.

The approved access requirement uses an enabled automatic role named Dallas Starter. Its condition is identity location equal to Dallas.

A **role** can assign configured access to identities meeting its conditions. Dallas Starter includes the enabled Dallas Tools **access profile**, a bundle of access from WorkDirectory. That profile contains an **entitlement**, the governed representation of membership in group `DL-TOOLS`.

This is ordinary ongoing membership, not access waiting for a separate activation step. WorkDirectory supports the group-add operation and has provisioning enabled. Its existing account initially lacks DL-TOOLS.

Devi's manager and employment stage are unchanged. There is no Austin-based access assignment to remove in this example, and no location-field synchronization to WorkDirectory is configured.

The records, configurations and observations below are fictional. No real identity, account or access is changed.

## A change outside ISC must become information ISC can use

**Account aggregation** reads account data into ISC. A **connector** supplies the integration that performs the supported collection from the external system.

HR publishing Dallas is the producer's change. If the account data available in ISC still says Austin, the identity mapping does not yet have Dallas as its selected input.

That is a collection or input-availability question before it is an identity-processing question.

For a direct connection, inspect the configured collection and its returned account data. For a file-based source, inspect the actual imported file and represented account. A new HR value cannot appear merely because an old file was imported successfully again.

When the relevant aggregation modifies the identity, that modification initiates event-based processing. The purpose is to bring other identity information and applicable access requirements into agreement with configuration.

This is automatic platform behavior. You do not need to create a custom workflow simply to establish this documented initiation path.

But “the aggregation ran” leaves questions unanswered. Was this source involved? Was pl-92002 included? Was the new location collected? Was the account associated with the intended identity? Did the relevant identity modification occur?

A collection summary does not answer all of those questions for one person.

An event is a change the relevant process acts on. It is not a substitute for naming the record and the changed information.

## Aggregation and provisioning can both supply the initiating change

**Provisioning** makes account or access changes through a supported integration or manual delivery path.

It can be an outcome of an identity decision, but it can also be part of a path that modifies identity information and initiates further evaluation.

The documented event-based condition includes identities modified during provisioning actions, not only identities changed during aggregation.

The shared condition is important. A provisioning request being submitted, a target operation succeeding and an ISC identity being modified are different claims.

For example, consider an approved update to a WorkDirectory account. Knowing only that the connector accepted the update does not prove which identity information changed, or that the location mapping should return a new office.

If the provisioning process modifies the corresponding identity, that modification supplies the documented initiation condition. Inspect the actual identity and related operation evidence rather than treating every attempted write as an identical trigger.

PeopleLedger remains the location authority in our main example. A WorkDirectory operation does not silently become permission to replace identity location with a different WorkDirectory field.

The diagram shows the two documented initiation paths. Each requires the stated identity modification; it is not a promise that every read or write reaches that point:

```text
Aggregation path        Provisioning path
        |                       |
        v                       v
process modifies        process modifies
an identity             an identity
        |                       |
        +-----------+-----------+
                    |
                    v
event-based identity processing
                    |
                    v
reevaluate applicable information
and configured access requirements

Submission alone is not this condition.
```

The arrows show causal responsibility, not private services, event queues, one fixed order between all operations, or a guaranteed successful external update.

## What processing evaluates after the change

For Devi, relevant processing can establish the mapped identity location as Dallas and evaluate whether Dallas Starter applies.

A **manager-correlation** configuration resolves manager information to an identity. A **lifecycle state** represents a business stage, such as active employment, and can drive configured access. Identity processing can evaluate these responsibilities too.

They do not all have to change because one location changes. A reevaluation asks what the applicable configuration requires now; it is not an instruction to make every field different.

If Dallas Starter now applies, its access requires a DL-TOOLS group addition for the existing WorkDirectory account.

The identity value, role assignment and target membership are separate pieces of state.

Processing can initiate provisioning for the required access. It does not validate that the provisioning succeeded.

This distinction matters even when processing begins automatically after the change. “Automatic” describes how work is initiated, not proof that its prerequisites were correct or its later writes completed.

A missing permission, unsupported operation or failed target request still needs its own investigation.

For the main scenario, suppose the required work is observed as follows. All times are on October 23, 2026, in UTC, Coordinated Universal Time:

| Observation | What it establishes |
|---|---|
| 11:00: HR publishes Dallas for employee 92002 | The producer's record changed; collection and identity processing are not yet established |
| 11:03: the available pl-92002 account still shows Austin | The mapping's new input has not reached that collected record |
| 11:05: the relevant source aggregation collects Dallas for pl-92002 and modifies I-92002 | The qualifying identity change in the aggregation path is established in this supplied case |
| 11:06: relevant processing, current identity location Dallas and Dallas Starter assignment are verified | The identity value and stated access requirement are established |
| 11:07: the DL-TOOLS addition is still pending | Delivery is not yet confirmed, even though the identity result is correct |
| 11:12: the add completes and a fresh WorkDirectory observation confirms DL-TOOLS on wd-92002 | The required membership is now verified |

These are supplied observations, not actual tenant measurements or promised delays.

At 11:03, nothing here establishes that processing failed. The needed input is not yet on the account available in ISC.

At 11:06, we can explain why the role applies. We still cannot claim the group exists externally.

At 11:07, pending means the work has not reached a confirmed delivery outcome in the supplied evidence. It does not justify changing the correct location mapping.

At 11:12, the fresh target observation completes the membership claim. It does not prove every other application, field or access item is correct.

Here is the evidence progression for this example:

```text
HR publishes Dallas
        |
new input not yet collected
        |
aggregation changes I-92002
        |
processing and current results verified
location Dallas / Dallas Starter
        |
group addition still pending
        |
add result + fresh target observation
DL-TOOLS on wd-92002 verified

Each observation supports its own claim.
This is not a timing guarantee.
```

This timeline does not prescribe a universal sequence of separate backend jobs. The relevant observations are deliberately separated so that one result is not mistaken for another.

## A run, a changed account and a changed result are different things

Suppose a later source run retrieves pl-92002 again with exactly the same data.

An **optimized aggregation** checks retrieved accounts for changes and can skip an existing unchanged record. The run's completion does not establish a fresh identity modification for Devi.

An **unoptimized aggregation** can reexamine records even when their account data is unchanged, including correlation evaluation. That is a different collection-processing choice, not a guarantee that every identity attribute or external permission must change.

Do not turn the skip rule into an unsupported global conclusion either. An unchanged account in one run does not prove that Devi could not have been processed for another reason.

Now consider a meaningful different event. PeopleLedger changes Devi's costCenter from the text `"0088"` to `"0090"`. The Employees profile maps that field too.

In this variation, the relevant aggregation modifies the identity and the subsequent current costCenter is verified as 0090. Location remains Dallas and the Dallas Starter condition is unchanged.

The new cost centre can be a real identity change while the access requirement stays the same. If DL-TOOLS is already correctly present, the unchanged location condition does not itself require another addition of that membership.

No new location or group change is needed merely to prove that processing ran.

Conversely, an unchanged displayed value does not prove execution. You still need the evidence appropriate to the question. It might be unchanged because evaluation correctly returned the same result, or because the relevant evaluation has not occurred.

That is why “I don't see a different value” is a symptom to investigate, not a complete processing history.

## The action's exact scope matters

The UI action named **Aggregate Account** reloads a selected account's data. Its documented behavior does not synchronize that new data into identity attributes or affect provisioning.

If someone uses that action on pl-92002 and sees Dallas on the account, do not claim that this action itself established current identity location Dallas or granted DL-TOOLS.

The narrower action and a source aggregation path that modifies identities do not have identical downstream scope simply because both names include aggregation.

Likewise, an **entitlement aggregation** collects access objects, such as the DL-TOOLS group. Reading the group definition is not a grant of membership and is not evidence of a location-driven identity modification for Devi.

A submitted provisioning request also needs its actual scope checked. A failure before the relevant identity modification does not establish the initiation condition described above.

Which records did the operation actually affect? That question is more useful than “was some job successful?”

## Not every reason to reevaluate is an event-based data change

A changed source record is not the only reason existing identity results can become outdated.

| Situation | Why it needs a separate distinction |
|---|---|
| A role condition or identity mapping is edited | Configuration changed, even if no account value changed. Use the supported application/processing path for the affected configuration and population. |
| A date-based condition crosses its boundary | The clock changed. Scheduled or configured time-based processing must account for it; no new HR edit is required. |
| A selected account is reloaded using the UI Aggregate Account action | The documented action's limited scope does not establish an identity-field update or provisioning. |
| An optimized source run skips an unchanged account | Run completion is not evidence of a fresh event-based identity modification for that record. |
| A current identity attribute stays the same after relevant processing | The evaluated result may legitimately be unchanged; inspect actual input, configuration and processing evidence. |

A **transform** is a calculation used to prepare an attribute value. A transform that compares today's date with a start date can have a different correct result tomorrow even when the stored start date never changes.

Waiting only for another HR edit would miss that dependency. Scheduled and time-based paths exist for reasons that are different from event-based changes.

Similarly, saving a corrected role condition does not guarantee that every unchanged identity immediately reflects the new role definition. Configuration application needs its own supported processing and scope review.

Do not manufacture a data event by changing an employee's field temporarily or adding a harmless-looking entitlement just to make something run.

That can introduce real data, access and audit consequences. Use the supported processing path that fits the actual reason for reevaluation.

## An event-based process is not a workflow subscription

The word event also appears in ISC automation.

A **workflow** is configured automation that starts from a selected trigger and performs defined actions. A trigger called **Identity Attributes Changed** can start such automation when matching identity-attribute changes occur.

That is a different configuration from the platform's documented event-based identity-processing behavior.

A workflow might send a notification after a location change. Sending the message does not establish that the DL-TOOLS provisioning completed, and the notification does not become a universal processing-completion signal.

Likewise, the absence of a custom workflow does not, by itself, disable the normal event-based path described here.

Do not invent a required subscription, webhook or custom “refresh workflow” before checking the actual change and platform behavior.

No workflow is configured in Devi's main example. These distinctions explain the terminology; they are not extra steps to add to the process.

## Use evidence to separate a missing event from a later problem

Start with the expected outcome and the observation that supports it.

For a location incident, identify the identity, the associated source account, the governing mapping and the exact before-and-after values.

Then distinguish the producer's save from the collected account value and the relevant identity modification. An HR screenshot does not show what ISC read.

Inspect the applicable operation and available processing evidence. A source-wide completion badge or a generic identity-modified timestamp cannot prove every field's cause, every decision's reevaluation or every provisioning result.

Do not assume that a supported screen exposes a unique trace entry for every internal stage. Use the available records and activity, state what they establish, and record where evidence is missing.

When the current identity is correct but access is wrong, follow the access requirement and its delivery. Repeated collection is not a substitute for resolving a missing target permission or a pending request.

When the current identity itself is wrong, inspect the selected source/account, actual mapping and any calculation, as well as whether relevant processing occurred.

**Preview** evaluates mapping results for a selected identity. A correct Preview helps test the calculation; it is not proof that the result was applied, that the original event occurred, or that access was delivered.

If the displayed view and current records differ, inspect their observation times. Search visibility and the underlying identity or target state need not be treated as the same evidence.

If you cannot determine whether the qualifying change occurred, keep the conclusion narrow: “The current evidence does not establish the initiating identity modification.” Do not replace missing evidence with either “the event definitely failed” or “everything processed.”

## Work through the initiation decisions

### 1. The producer has saved the change

**Facts:** HR shows Dallas, but ISC's available pl-92002 still shows Austin.

Has the supplied evidence established the qualifying aggregation change?

**Reasoning:** No. It establishes an external producer change, not the new collected value or identity modification. Investigate collection of the correct account and field before concluding that event-based identity processing failed.

### 2. The source run completed successfully

**Facts:** A source run is successful. It retrieves an unchanged pl-92002 and skips that record under optimization. No other change or processing evidence is supplied.

Does the success status prove a fresh event-based evaluation for Devi?

**Reasoning:** No. It describes the run, not a fresh identity modification for the skipped record. Also do not claim that no other processing could have occurred; that would require separate evidence.

### 3. The data changed, but the access condition did not

**Facts:** The supplied cost-centre variation establishes a qualifying identity change and current costCenter 0090 after relevant processing. Location stays Dallas, Dallas Starter still applies, and DL-TOOLS is already correctly present.

Must another group addition occur?

**Reasoning:** Not because of this unchanged location-based requirement. Processing can apply the new cost centre while leaving correct access unchanged. A new access write is not a mandatory sign that an event was handled.

### 4. A provisioning action is involved

**Facts:** An approved provisioning process is confirmed to modify the corresponding ISC identity. No new HR account collection is involved in that supplied case.

Can event-based processing have a documented initiation path?

**Reasoning:** Yes. The documented condition includes identity modifications during provisioning, not only aggregation. That does not mean every submitted or failed target request modifies an identity, and it does not change which source owns location.

### 5. One account was reloaded

**Facts:** The UI Aggregate Account action reloads pl-92002 with Dallas. Its completion is the only supplied operation evidence.

Has the action itself established current identity location Dallas and DL-TOOLS delivery?

**Reasoning:** No. Its documented scope is account-data loading without identity-attribute synchronization or provisioning impact. Check the current identity and appropriate supported processing path separately.

### 6. A role definition was saved

**Facts:** An administrator edits and saves a role condition. The affected identities' source-account data stays unchanged. No application/processing outcome is supplied.

Can the engineer assume every identity now reflects the role change?

**Reasoning:** No. Configuration application is a separate processing reason. Review scope and apply the configuration through the supported path, then verify current assignments and any required delivery. Do not create artificial worker-data changes to force an event.

### 7. A notification arrived

**Facts:** A configured Identity Attributes Changed workflow sends a message saying that location changed. The DL-TOOLS provisioning result is not included.

Does the message prove completed access delivery?

**Reasoning:** No. It establishes the stated automation observation, not the outcome of the group-add operation. Inspect the relevant provisioning result and actual target membership. Platform processing and the custom workflow are different responsibilities.

### 8. A date boundary passed

**Facts:** A stored start date stays unchanged. A date-dependent calculation would return a different result after midnight, but no new source or provisioning identity modification is supplied.

Does the clock passage itself establish this event-based initiation condition?

**Reasoning:** No. Review the scheduled or configured time-based processing design and actual execution. The correct result can change because of time without a new source edit. Repeatedly waiting for an account-data event is not a timing strategy.

## Trace an unfamiliar phone change

An employee's approved phone number changes in HR. The new number is collected into the correct associated account during a source aggregation, and the supplied case confirms a resulting identity modification.

Relevant processing later confirms the new identity workPhone. An external contact account still shows the old number.

Someone concludes, “The event did not run. We should change the phone again to trigger it.”

What does the evidence actually support?

The supplied identity modification and verified processed workPhone support the identity-update path. The unchanged external phone is a separate outcome to investigate.

Find the approved ongoing update mechanism for the contact account. If none is configured, the missing design is not repaired by another HR edit. If one exists, inspect eligibility, attempted delivery and the target result.

**Attribute synchronization** is configured identity-to-account field alignment delivered through provisioning. It can supply that ongoing update where supported, but the correct identity workPhone alone does not prove that sync is configured or successful.

Use the existing evidence before initiating anything else. Identify the unresolved responsibility and the next fact needed to verify it. That is how “an event should have happened” becomes an explanation of what changed, what was evaluated and what remains to be done.
