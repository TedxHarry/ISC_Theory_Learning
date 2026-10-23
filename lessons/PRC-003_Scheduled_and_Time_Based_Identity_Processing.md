# The date arrived. When will ISC process the identity?

Devi's assignment is due for review at 16:00 UTC. At 16:01, her review label in SailPoint Identity Security Cloud (ISC) still says Before review.

Does that mean the date comparison is wrong?

Not necessarily. A stored label is the result of a previous calculation. It does not keep running just because the clock moves.

We need to separate the rule for calculating the value from the mechanism that runs that rule again.

**Scheduled identity processing** reevaluates eligible identities through recurring platform jobs. **Time-based identity processing** uses an identity's configured Next Processing Date to arrange another reevaluation at a particular future time.

Neither name, by itself, proves that a result has already been applied or that a connected system has completed a change.

## Establish the person, input and intended result

Devi's employee number is 93003. She already has a valid ISC **identity**, the record representing her as a person. I-93003 is our teaching label for it, not an actual ISC object ID.

She has one correctly associated account, `ar-93003`, on AssignmentRegister Production.

A **source** is ISC's configured representation of a system's account data. An **account attribute** is a named field on a particular account. An **identity attribute** is a field on the identity.

The Employees **identity profile** supplies shared configuration for this identity population. Its **mappings** define how identity fields receive their values.

The account field `reviewAt` contains `2026-10-23T16:00:00.000Z`. This value is already collected into ISC.

ISO 8601 is a standard date-and-time representation. In this timestamp, Z means UTC, Coordinated Universal Time. The value identifies an exact moment, not an unspecified local “review day.”

A custom identity field, `assignmentReviewStatus`, uses a **transform**, a calculation that prepares an attribute value. The business rule is:

- Before reviewAt, return Before review.
- At or after reviewAt, return Review due.

This is a review label only. It does not terminate employment, disable an account, remove access or send a notification.

The calculation explicitly reads reviewAt from Devi's associated AssignmentRegister account. It compares the evaluation's current time with that timestamp. It does not depend on another identity field finishing first.

Devi's **identity state** is Active. Identity state controls participation in ISC features and processing; it is not the same thing as our review label. A lifecycle state is a separate business-stage configuration that can drive access and assign an identity state. We are not changing either state here.

A **role** groups configured access and can assign it using identity conditions. **Attribute synchronization** keeps selected account fields aligned with identity fields through configured account updates.

For the first design, the tenant's time zone is explicitly configured as UTC. No roles are implemented, and Devi has no account on a source configured for attribute synchronization.

The review calculation is marked as requiring periodic refresh. No Next Processing Date is configured for her in this first design.

These facts matter when we decide which recurring job includes her. They are not background details to guess from the word employee.

All records, configuration and processing observations below are fictional. No tenant or external account is changed.

## The clock can change the answer without changing the source

At 15:59 UTC, an evaluation of the rule returns Before review.

At 16:00 UTC, the comparison is true for “at or after,” so an evaluation returns Review due. At 16:01 it still returns Review due.

The reviewAt field has not changed between these evaluations. The changing input is the evaluation time.

ISC's dateCompare operation supports comparing a supplied date with `now`, meaning the moment the expression is evaluated. A greater-than-or-equal comparison includes the boundary itself.

That explains the calculation. It does not arrange those evaluations.

If the last applied result was Before review at 13:00, passing 16:00 does not by itself overwrite the stored identity field.

**Account aggregation** reads account information into ISC. Another unchanged read of reviewAt is not the only way, or necessarily the right way, to address a time-dependent result.

**Identity processing** reevaluates identity information and applicable requirements using available inputs and configuration. The recurring and per-identity paths supply reasons to perform that evaluation without requiring HR to edit the same date again.

Here are the separate responsibilities:

```text
Source input: reviewAt = 16:00 UTC
                  |
                  v
Rule compares evaluation time
with the supplied review moment
                  |
   BEFORE -> Before review
   AT/AFTER -> Review due

A processing mechanism runs the rule.
Application establishes the stored result.
A clock boundary alone proves neither.
```

The diagram describes the calculation and its application boundary. It is not a background timer running continuously for every stored field.

## The recurring schedule has selection rules

ISC's documented scheduled identity processing has morning and evening jobs at 08:00 and 20:00 in the tenant's configured time zone.

Those are scheduled queue times, not a guarantee that every selected identity finishes processing at that instant. Other work can delay the job's start.

The job's population also matters:

| Scheduled job | Documented population rule |
|---|---|
| 08:00, morning | Active and Inactive (short-term) identities with an account on a source configured for attribute synchronization |
| 20:00, evening, when the tenant has roles implemented | Active and Inactive (short-term) identities |
| 20:00, evening, when the tenant has no roles defined | Active and Inactive (short-term) identities in profiles with an identity attribute marked as requiring periodic refresh |

**Inactive (short-term)** is another identity state that can participate in these scheduled paths. Do not assume the same recurring population includes Inactive (long-term) identities.

Selection for processing also does not mean every field or access assignment must change. Processing can preserve a result that is still correct.

Attribute synchronization is relevant to the morning selection rule, but it is not another name for scheduled identity processing.

For Devi's first design, the morning sync-account condition is not met. The evening no-roles condition is met because her profile has a time-dependent attribute marked for periodic refresh.

At 16:01, expecting the recurring evening job to have already applied Review due would be a timing mistake. Its scheduled time in this UTC tenant is 20:00.

Nor should we say “it always runs every twelve hours for everyone.” That loses both the population conditions and the distinction between due, started and completed work.

The tenant having roles is a selection condition for the documented evening path. It does not mean Devi must be a member of a particular role to meet that population rule.

## Periodic refresh declares a reevaluation need, not a deadline

The transform option `requiresPeriodicRefresh` is a boolean, a true-or-false configuration setting. It identifies a need for periodic reevaluation of time-dependent logic.

In this example, the review mapping has that periodic requirement.

It does not mean “run at every reviewAt value.” It does not mean “run every minute.” It also does not independently make a long-term inactive identity part of the Active/short-term recurring population.

A calculation can be correct at the moment it runs while the stored value becomes outdated before its next run. That is why the business timing requirement must be part of the design.

If a review label appearing after the evening run is acceptable, the recurring path may meet the requirement.

If the business requires a reevaluation around 16:00, the recurring evening path alone is not an explanation of how that requirement will be met.

Making the comparison more complicated cannot turn an evening schedule into a 16:00 schedule. The comparison and its processing mechanism solve different problems.

Similarly, if roles happen to make a population eligible today, that is not a reason to leave a real time dependency undocumented. Review what will happen if the access-model configuration or profile eligibility changes.

## Do not use your own clock as the tenant's clock

The browser's display time, the tenant's recurring schedule time and a source timestamp's time zone can differ.

Our example uses an explicitly UTC-configured tenant, so 20:00 on that schedule is 20:00 UTC. That is an example assumption, not a claim that every tenant defaults to UTC.

The documented default schedule zone is CST/CDT. Check the actual tenant configuration instead of treating that default or the administrator's location as evidence for this tenant.

A source value with an offset also identifies its own moment. For example, `2026-10-23T11:00:00.000-05:00` is the same instant as our 16:00 UTC reviewAt.

The five-hour difference is a representation difference, not an extra five hours of processing delay.

A date-only value such as `2026-10-23` needs an approved time and zone before it can represent this exact review moment. Do not silently add midnight or assume “end date” means the start of that date.

For a named local time zone, daylight-saving rules can change the offset across dates. Preserve the intended local business time and convert using the correct rules for that date, rather than carrying one fixed offset into every future event.

For an incident, normalize the relevant observations to a shared time reference before comparing them. Preserve the original zone information too.

## A Next Processing Date adds a per-identity processing time

Now consider an alternative design for the same review requirement.

ISC's **Next Processing Date**, technical name `nextProcessing`, is an identity attribute used by time-based processing. Its mapping is configured per identity profile.

It is not the same attribute as reviewAt. ReviewAt supplies the business boundary; nextProcessing supplies the planned next identity-processing time.

They can contain the same timestamp when that is the approved plan. They still have different responsibilities.

For this alternative, the Employees nextProcessing mapping receives the approved future processing timestamp from available source data, with any required conversion. The time-dependent review calculation still reads the associated account's reviewAt independently.

Do not build this around an assumption that one identity-field calculation can read a newly calculated peer field because it appears earlier in a screen. Identity calculations can overlap; such a dependency does not establish readiness.

The required nextProcessing value must be:

- In the future.
- In ISO 8601 form.
- At least one hour after the time the nextProcessing identity attribute was updated in ISC.

The last condition uses the identity attribute's update in ISC, not merely HR's earlier approval or publication time.

Suppose the applied identity nextProcessing is verified as `2026-10-23T16:00:00.000Z` after it is updated at 13:30 UTC. That gives two hours and thirty minutes of lead time.

The same 16:00 value first updated at 15:30 provides only thirty minutes. It does not meet the one-hour requirement.

Do not present a too-soon, current or past timestamp as a supported exact-time rescue plan. Resolve the operational need through an approved supported path, and verify its outcome.

Saving a profile mapping or seeing the value in Preview is not proof that the identity has an applied nextProcessing value. **Preview** evaluates selected mapping results; population application and current identity data need separate evidence.

The alternative supplies another processing time in addition to scheduled processing. It does not remove the recurring jobs or replace their other responsibilities.

## Compare the two designs without combining their histories

Both designs use the same unchanged reviewAt. The following are alternative fictional observations on October 23, 2026, not one continuous run.

| Design and observation | What it establishes |
|---|---|
| Recurring-only: initial configuration application and current Before review are verified at 13:00 UTC | The initial stored label is established before the boundary |
| Recurring-only: at 16:01, selected Preview returns Review due; current identity is separately checked and still says Before review | The calculation is correct at that time, but the current applied label has not changed |
| Recurring-only: the eligible evening job is queued at 20:00, starts at 20:04 and current Review due is verified after relevant processing at 20:06 | The scheduled path has applied the changed result in this supplied example |
| Time-based alternative: nextProcessing 16:00 is applied and verified after its 13:30 update | The planned per-identity time meets the stated future-format and lead-time conditions |
| Time-based alternative: relevant processing and current Review due are verified at 16:02 | The per-identity path has produced the applied label in this supplied example; this is not a two-minute service guarantee |

The 13:00 observation comes from the initial configuration application. It is not attributed to a morning scheduled job whose selection condition is absent.

At 16:01 in that history, we have actually checked the current identity. Unlike an old screenshot alone, that supplies current evidence of the retained Before review label.

It still does not make the comparison defective. The Preview and schedule explain the difference.

In the time-based alternative, the supplied observations confirm relevant execution and current state. A due timestamp alone would not establish either.

The intended processing time is not a guarantee that every dependent operation completes at that exact second. Keep execution and application evidence even when the per-identity time is correctly configured.

The two paths fit together like this:

```text
Recurring scheduled path
eligible population + tenant time zone
                  |
        scheduled job is queued
                  |
        observed execution/results

Additional time-based path
profile mapping -> identity nextProcessing
                  |
future ISO time + one-hour lead
                  |
        relevant processing
                  |
        observed current result

Both evaluate applicable configuration.
Neither is proof of external delivery.
```

This is a responsibility comparison. It does not describe undocumented internal queues or promise identical timing behavior for both paths.

## One next time is not a permanent recurrence rule

The attribute is called nextProcessing because it identifies a next processing time for an identity. A single timestamp is not a list of all future business events.

If an employee has a start, an assignment-review point and an end date, the design needs to determine which future milestone is relevant next.

After a milestone passes, review whether the calculation will produce the next applicable future time and meet the lead requirement.

Do not assume ISC invents a daily recurrence, advances the timestamp by a fixed number of days, or handles every later milestone because the first date was valid.

Also do not make up a universal automatic clearing or retention behavior for a past value. Inspect the actual configuration and current nextProcessing data, and verify the required next event.

A cancellation, extension or corrected date can change the plan. The revised business input must reach ISC, the nextProcessing value must be applied, and the new timing must still meet the requirements.

For example, if HR moves reviewAt from 16:00 to 18:00, a correct independent calculation should evaluate the revised reviewAt. A still-planned 16:00 processing time does not itself change that business boundary.

An early run might correctly return Before review for the new 18:00 boundary. You still need a plan for reevaluation at the revised relevant time.

This is why the business date and processing date must be traced separately, even when the first design used the same timestamp for both.

## Processing time is not an access-removal guarantee

**Provisioning** carries out an account or access change in a connected system through supported automatic or manual delivery.

If a time-dependent **lifecycle state**, a business stage that can drive configured access, changes during processing, required account or access operations can follow.

Their success still depends on the configured actions, connector capabilities, authorization and target result.

Processing an identity does not validate that the resulting provisioning succeeded.

Our Review due label has no such actions configured. It changes no account state or access. Reading the label as “Devi has been disabled” would invent both a requirement and a result.

For an actual cutoff requirement, specify what must be true at the target: which account is disabled, which membership is removed, or which application behavior must stop.

Then establish an approved timing and delivery design with sufficient operational margin and verification. Do not promise “access is gone exactly at the date” merely because a transform compares with now or nextProcessing has that date.

A disconnected target may require a human to complete a task. A failed write may need correction. A current identity stage and a target's effective access are different evidence.

## Investigate a missed-looking boundary in the right order

First verify the approved boundary, including the time zone and whether equality belongs before or after it.

Then check that the correct source value is already available to the calculation. A perfectly timed run using an old end date can return the wrong business result for reasons unrelated to the scheduler.

Inspect the governing profile, the time-dependent mapping and the intended processing path.

For the recurring path, check the identity state, applicable population rule, periodic-refresh need where relevant, tenant time zone and actual job execution.

For the time-based path, check the applied nextProcessing value, when that identity attribute was updated, the future-time requirement and the actual processing evidence. Do not substitute a proposed value from Preview for current identity data.

Then check the current calculated field. An unchanged result can be legitimate before the boundary or after a corrected future boundary. It does not independently prove a skipped job.

Finally, follow separately required consumers. Search visibility, an email, a target field and removed access are not interchangeable completion signals.

If a deadline was missed, preserve the original observations before applying a correction. Avoid artificially changing worker data or choosing a past nextProcessing time to manufacture an event. Use an authorized supported recovery path and verify the real required state.

## Work through the timing decisions

### 1. The stored value did not change at 16:00

**Facts:** Devi has the recurring-only design: UTC tenant, no roles, no account on a sync-configured source, Active identity and a periodically refreshed review attribute. At 16:01, Preview is Review due while the separately checked current label is Before review.

Is the comparison necessarily wrong?

**Reasoning:** No. The evening path selects her profile population, but it is scheduled for 20:00 UTC. The facts establish different proposed and current results before that run. Check actual processing and the approved business timing requirement, not just the expression.

### 2. The tenant has no roles

**Facts:** Another tenant has no roles. An Active identity's profile has no attribute marked for periodic refresh. The engineer points only to “the evening job.”

Has the supplied information established inclusion in that documented evening population?

**Reasoning:** No. In the no-roles path, the profile's periodic-refresh condition matters. Identify the actual timing need and appropriate configuration. Do not assume every Active identity is included just because an evening job exists.

### 3. The timestamp is valid but too close

**Facts:** nextProcessing is first updated in ISC at 15:30 UTC with a value of 16:00 UTC on the same date. The value is valid ISO text.

Does correct formatting make the plan valid?

**Reasoning:** No. Thirty minutes does not meet the required one-hour lead from the identity attribute's update. Review a supported recovery or future plan; do not claim that a well-formed timestamp overrides the timing condition.

### 4. HR approved the date much earlier

**Facts:** HR approves a 16:00 processing time at 09:00, but the nextProcessing identity value is not updated in ISC until 15:30.

Which update matters for the lead requirement?

**Reasoning:** The nextProcessing identity attribute's update in ISC matters. HR's approval time does not provide the missing ISC lead time. Inspect collection, mapping and application timestamps rather than treating publication as application.

### 5. Two timestamps look different

**Facts:** One record shows 16:00 UTC. Another explicitly shows 11:00 with offset minus five hours on the same date.

Are those necessarily different processing moments?

**Reasoning:** No. With the supplied offset, 11:00 minus05:00 represents 16:00 UTC. Normalize the instants before diagnosing delay. Do not generalize that fixed offset to every future date in a named daylight-saving zone.

### 6. The scheduled time has arrived

**Facts:** The eligible evening job is queued at 20:00 and begins at 20:04. Current Review due is verified at 20:06.

Does this prove the transform failed at 20:00?

**Reasoning:** No. Queued, started and applied are different observations. The supplied calculation and result are consistent with later execution. Evaluate whether that timing meets the business requirement; do not relabel a delivery or timing gap as an arithmetic error.

### 7. The review was postponed

**Facts:** reviewAt is corrected to 18:00 and that input reaches ISC. A previously planned 16:00 run evaluates the new input and returns Before review.

Is returning Before review evidence of a skipped calculation?

**Reasoning:** No. It is the correct result for a 16:00 evaluation against an 18:00 boundary. Verify the revised nextProcessing or other timing plan and its application so another relevant evaluation is not left unplanned.

### 8. A later action has not completed

**Facts:** In a separate offboarding case, current lifecycle state is verified after processing, but a required target disable operation reports an error.

Can the identity-processing completion close the access-cutoff requirement?

**Reasoning:** No. The current stage and failed target operation are separate outcomes. Resolve and verify the authorized disable path, including actual target state. A nextProcessing time is not proof that the account is disabled.

## Design the next reminder without confusing the clocks

A project wants a review label at 09:00 in each employee's business location. Its proposal is to use a date-only HR value, mark a transform for periodic refresh and assume every label changes at local 09:00.

What would you ask before accepting that design?

Establish the intended local time zone for each employee and the exact instant for each date, including daylight-saving rules where applicable. A date alone does not identify 09:00 anywhere.

Then decide whether the recurring tenant schedule meets the accepted delay. A tenant-wide morning or evening job is not a separate 09:00 job for every employee's location.

If the design uses nextProcessing, confirm how the per-identity future instant is calculated, collected or derived, applied early enough, and revised after changes or completed milestones.

Test the calculation separately from timing. Use observations before, at and after the boundary. Confirm the applied label after relevant processing.

If the project also wants an email, identify the configured notification mechanism and its delivery evidence. A review field changing is not itself a sent reminder.

The explanation should name the business boundary, the processing plan, the observed identity result and each separately required action. Once those are distinct, a date-related incident becomes something you can investigate without guessing which clock or process was responsible.
