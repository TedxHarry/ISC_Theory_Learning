# The run finished. How current is the data?

Devi, employee number `56006`, plans warehouse work. Human resources, or HR, changes her recorded department from Warehouse Planning (`WH`) to Distribution Planning (`DIST`) at 03:00.

At 03:30, SailPoint Identity Security Cloud, or ISC, still shows `WH`. Its latest collection of HR records finished successfully at 03:22.

Has ISC missed the change?

Before you rerun anything, ask a smaller question: what information was actually available to that collection?

HR's business screen and the interface ISC reads are not always updated at the same moment. A successful read can faithfully collect an older published record. A schedule cannot make information arrive before the producing system releases it.

## Give the schedule a precise job

**Aggregation** reads account or access-object data and represents the supported information in ISC. A **source** is ISC's configured representation of the system or data being managed. A **connector** supplies the integration operations used to collect that data.

A **schedule** defines when an aggregation should be submitted for execution. It does not certify that the operation started, finished, included a particular account, or obtained the latest business information.

For a supported direct-connect source, the account aggregation settings let you enable a schedule, choose its frequency and start time, and save it. Direct-connect means the integration can read the connected system through its supported operation rather than requiring an administrator to upload account data manually.

The scheduled time adds the aggregation to the processing queue. Other queued or running operations can delay its start. This is documented scheduling behavior, not a promise about a private queue design or fixed waiting time.

Keep the sequence straight:

The configured time becomes due. The work is submitted. Execution starts when it can. The connector reads the configured data. ISC processes the returned records. You inspect the outcome.

The time beside the schedule answers when work is due. The execution history answers what happened to a particular run.

## Follow Devi's record through two runs

Our fictional source is **PeopleRoster Production**. It uses a supported cloud-run SaaS connector to read HR's published worker-data interface. “SaaS” means software as a service; this connector runs in SailPoint's cloud rather than on a customer-hosted appliance.

HR publishes complete batches to that interface. The main HR screen changes at 03:00, but the batch containing Devi's new department is not available there until 03:40.

ISC already has worker account `pr-56006`, correctly associated with Devi. Here, **account** means the source record represented in ISC, even though this HR worker record is not a login Devi uses. Its `workerKey` identifies that record; its separate `employeeNumber` contains `56006`.

Devi's **identity** is ISC's person record. Its department is mapped from this HR account. The **identity profile** holds configuration that specifies that source-to-identity value relationship. The existing association and correct department mapping are supplied facts.

This source includes Devi in its agreed population and reads her department correctly. Its scheduled operation reads the full configured account population. The schedule starts at 00:10 and recurs hourly through the daily schedule window. The tenant is configured to UTC, the reference time standard used for every time in this example.

All times, batches, records and results are fictional evidence from one day. They do not describe a measured tenant or a guaranteed product duration.

| Time in UTC | Supplied event | What it establishes |
|---|---|---|
| 03:00 | HR changes Devi's department to `DIST` in its business system. | The business value changed, not that the collection interface has published it. |
| 03:10 | The first aggregation is due and queued. | Work has been submitted, not completed. |
| 03:15 | That aggregation starts. | Execution has begun. |
| 03:17 | The worker read returns the earlier batch, with department `WH`. | The connector observed the older published value. |
| 03:22 | The first run finishes successfully; the account and identity still show `WH`. | The supplied values are consistent with the input read. |
| 03:40 | HR publishes the batch containing `DIST`. | The new value is now available to this integration. |
| 04:10 | The next hourly aggregation is due and queued. | A new opportunity to read the published batch. |
| 04:15 | The second aggregation starts. | Actual start, five minutes after its scheduled time. |
| 04:18 | Its worker read returns `DIST`. | This read has observed the new published value. |
| 04:24 | The second run finishes; ISC's account representation is checked and contains `DIST`. | The new account value is represented. |
| 04:26 | Devi's mapped identity department is separately checked and contains `DIST`. | The intended person-level value is confirmed. |

At 03:30, the first read could not have collected the 03:40 batch. Changing ISC's department mapping would not make that batch arrive earlier.

At 04:26, the identity value is correct. That does not turn 04:26 into the time HR originally changed the record.

Here's the same dependency in a compact trace:

```text
03:00 HR changes WH to DIST
          |
          v
03:17 first read still gets WH
03:22 first run completes
          |
          v
03:40 HR publishes new batch
          |
          v
04:18 second read gets DIST
04:24 account value confirmed
04:26 identity value confirmed
```

Time moves downward. HR performs the business change and publication; the connector reads the published interface; ISC represents account and identity information under the supplied configuration. The confirmed values are human evidence checks, not automatic verification stages.

The diagram shows this example's events. It does not imply that every account is read at the run's start, that a whole run is an instantaneous snapshot, or that identity processing always waits for all source records to finish.

## Which “age” are you measuring?

**Data freshness** means how recent the relevant information is for the decision you need to make. It requires a subject and a reference time.

“Updated four minutes ago” is incomplete if you don't know what was updated.

At 04:30 in our example:

| Observation | Age at 04:30 | What that age does not prove |
|---|---|---|
| HR's business change at 03:00 | 90 minutes since the change | That ISC has spent all 90 minutes executing a read. |
| The integration batch published at 03:40 | 50 minutes since publication | That every field in it changed at 03:40. |
| The worker value returned at 04:18 | 12 minutes since that read | That HR has made no further changes since the batch was produced. |
| Identity value confirmed at 04:26 | 4 minutes since confirmation | That ISC consulted the live HR business screen at 04:26. |

A publication timestamp is not automatically the snapshot's effective time. The producer must explain what the batch contains and the cutoff it represents. A file generated today can still contain yesterday's business data.

The total delay from the HR change to the confirmed identity value is 86 minutes here. That includes 40 minutes before publication, 30 minutes waiting for the next scheduled submission, five minutes waiting to start, nine minutes of execution, and two minutes until the separate identity-value check.

Those intervals explain this trace. They are not a universal ISC timing formula. Reads and processing can overlap, and another integration may have different stages.

If the requirement is “new department visible on the identity within 60 minutes of HR approval,” this supplied trace misses it. An hourly aggregation setting alone never established that requirement.

## Read a daily recurrence as a daily window

ISC's daily account aggregation schedule uses a starting time and a **Reoccurs Every** interval. The recurrences end at midnight.

For example, a daily start of 14:00 with an eight-hour interval gives scheduled times of 14:00 and 22:00. The next day's first scheduled time is 14:00, not 06:00.

That produces a 16-hour gap across the daily boundary. “Every eight hours” would be a misleading description of continuous coverage.

Suppose a relevant change becomes available just after the 22:00 read, and no other read occurs. It waits until the next scheduled opportunity at 14:00. Execution and later processing still have to happen.

For weekly schedules, the selected day and time determine the recurring opportunity. Monthly account schedules select a date from 1 through 28 and a time. Neither setting promises that work will finish by that time.

Read the actual schedule settings and upcoming expected times. Don't infer them from a label copied into an operating document.

Supported frequency limits and available controls also depend on the source and administrative context. If a business requirement needs a frequency the current configuration does not support, that is a design issue to resolve, not a reason to claim an unsupported schedule exists.

## Check whose clock the schedule uses

A **time zone** tells you how a displayed local time relates to the reference clock. A GMT offset such as GMT-06:00 is six hours behind that reference.

ISC has more than one relevant clock context.

For a **Virtual Appliance**, or **VA**, connection, connector work runs through an appliance in the customer environment. A **VA cluster** groups appliances used for that connection. Account and entitlement aggregation scheduling for VA-based connections uses the cluster's configured GMT offset. These cluster offsets use standard time and do not shift for daylight saving time.

For SaaS connectors, scheduling uses the **tenant time zone**. The tenant is the organization's ISC environment. Tasks using a tenant zone that observes daylight saving follow that zone's time change; do not apply the VA fixed-offset rule to all connectors.

Imagine a VA cluster fixed at GMT-06:00 and an aggregation scheduled for 02:00 on that clock. Its scheduled reference time is 08:00 UTC.

If the business location changes from GMT-06:00 to GMT-05:00 for daylight saving, that same 08:00 UTC opportunity is now 03:00 on the business clock. The cluster schedule did not move; the relationship to the business clock changed.

A browser can display activity timestamps in its own local settings. That does not make the browser's zone the source schedule's zone. Audit reports and other displays can use another documented time basis.

When comparing evidence, retain the original zone or offset and convert the events to one reference. Also record the date. A conversion can move an event to the previous or next day.

Before moving a source from a VA-based connector to a SaaS connector, review its scheduling time basis. Preserving the text “02:00” does not necessarily preserve the same real-world execution opportunity.

## More frequent doesn't mean more complete

**Collection scope** is the population and information an operation is configured and permitted to read.

If PeopleRoster Production excludes Devi's record, an hourly schedule repeatedly collects the wrong population. A five-minute schedule does not correct the exclusion.

Check the intended population against connector filters, the endpoint or query being read, and the records visible to the **integration actor**, the external identity or credential used by the connector.

Then check what kind of read is scheduled.

A **full aggregation** reads the configured population. “Full” does not mean every account in the enterprise regardless of filters or permissions.

A **delta aggregation** collects supported changes. Its freshness depends on the connector's change capture and supported coverage. A recent delta run does not prove that every unchanged account was reread or that an earlier gap in change tracking has been recovered.

**Optimization** can skip further processing for existing accounts whose input has not changed. A recent full collection is therefore not proof that new matching logic was applied to every unchanged account. Request the appropriate supported re-evaluation when that is the actual task; don't keep increasing the schedule frequency.

A successfully completed job tells you something about that execution. To conclude “Devi's department is current,” you still need the right record, returned value, mapping and relevant time.

Review deletion handling before changing an existing source's read scope. Making a previously represented account disappear from the response can have consequences beyond making the read shorter.

## Account data and group details have separate clocks

An **entitlement** is a represented access item, such as a group or permission. Account data can include held entitlement values, for example a list of group identifiers.

**Account aggregation** collects account information and supported held-access values. **Entitlement aggregation** collects supported access-object information, such as the groups' names and descriptions.

Direct-connect sources that support entitlement aggregation have separate manual or recurring collection controls. Those controls can include all supported entitlement types or selected types. Account scheduling does not by itself establish the entitlement schedule or its type selection.

Suppose an application's account memberships were read at 09:00 and its group definitions at 09:30. The later group run can update a group's description without establishing who joined it at 09:20.

Likewise, refreshing memberships does not prove that a newly created, unused group has been collected as an object.

Use the source, object type and identifier to connect the related information, then retain the two observation times. Do not describe independently collected records as one synchronized snapshot merely because you view them on one screen.

The documented flat-file entitlement mechanism requires a manual file import; it does not provide recurring entitlement aggregation scheduling. Flat-file account loading also requires a supported file import or reuse of an uploaded file. An external producer's nightly export is not itself an ISC collection schedule.

If another tool automates an import, verify that specific supported mechanism and its completion. Do not assume a direct-connect scheduling control reaches into a folder and discovers fresh files.

## “Run B five minutes later” is not a dependency

A **dependency** means one operation needs another operation's result. Putting two times on a calendar establishes intended ordering, not successful handoff.

In our main example, collecting the current department depends on HR publishing the current batch. The 03:10 schedule cannot enforce a publication that happens at 03:40.

**Identity processing** evaluates identity data under its identity and access configuration. An aggregation that modifies an identity can initiate event-based processing, meaning processing triggered by that change. ISC also has separate scheduled, time-based and manual identity-processing mechanisms; they are not source collection schedules.

**Provisioning** makes supported changes to external accounts or access. An identity decision can initiate it, but identity processing does not validate that the external change was successfully delivered.

Here is a different, conditional chain used when a person's changed information should lead to an approved application change:

```text
[Producer publishes required data]
                |
                v
[Supported source read in ISC]
                |
                v
[Required identity values available]
                |
                v
[Configured access decision]
                |
      if a change is required
                v
[Separate supported provisioning]
                |
      if target change succeeds
                v
[Later read can observe target state]
```

Each arrow means the next stated result needs the preceding information or successful operation. It is not an ISC schedule definition. The producer, ISC's configured processing, and the external target have separate responsibilities.

The diagram therefore has conditions, not a promise that every collection grants access. Some records require no access change. A denied target operation also does not become successful because the source read completed.

If a downstream application aggregation runs before provisioning changes that application, it can correctly return the earlier state. It does not read a future result.

Nor should you force every source into one long serial chain. Independent application reads can have no data dependency on each other. Identify the real handoff first, then coordinate or monitor it using the supported design. A fixed time gap may provide operating margin; it is not a success check.

## Choose a freshness target before choosing a frequency

Start with the decision or outcome that needs current data.

A payroll review may need the agreed daily batch. A time-sensitive access removal may need a much shorter end-to-end response. Those requirements cannot be settled by saying, “We run all sources hourly.”

Agree when the clock starts: HR approval, the event's effective time, publication, or another defined trigger. Agree when it stops: account data represented, identity value confirmed, external account disabled, or access actually removed.

Those are different service commitments.

Then inspect the producing system's publication delay, the actual scheduling gaps, queue and execution durations, required processing, and any target operation. Use observed histories across representative operating conditions, including the busy period, rather than one unusually fast run.

Leave room for variation and define what happens when the target is missed. A measured maximum from last week is evidence for planning, not a product guarantee for next week.

Increasing frequency adds read and processing load. It can also increase demand on the external system. If work is repeatedly still running when another opportunity is due, inspect durations and actual scheduling behavior before adding more requests. Do not assume that ISC universally overlaps, skips, merges or retries every such request in one fixed way.

A supported delta design can reduce the work of collecting changes, but it needs valid tracking and coverage. A narrower scope can reduce work only if it still meets the governance requirement. Excluding disabled or departing workers merely to make a job faster can remove the information needed for an access decision.

Use the least frequent schedule that meets the verified business requirement, with appropriate capacity and recovery arrangements. If the producer is late, fix or redesign that dependency; repeated consumer reads do not publish the missing record.

## Verify the handoff, not just the green status

The source's **Aggregation History** connects the configured schedule to individual executions. For account runs, inspect the actual start and stop, status, scanned counts and optimization information. Review warning or error details where present.

Those fields help distinguish “not started,” “still executing,” and “finished with a problem.” Counts need the intended population for interpretation. A successful read of 90 records is incomplete for a requirement covering 100 if the other ten were excluded.

For a particular change, follow its key and value: producer revision or cutoff, source response, collected account, relevant identity output, and target evidence if a change was required.

In the main example, `pr-56006` and employee number `56006` help you follow the right worker. They do not make the HR account, person record and another application's account one object.

ISC **Search** presents indexed information, a separately maintained representation for finding records. It is not an instruction to reread HR. The account-loading guidance allows different Search update delays depending on whether the change affects identity data and on system activity.

If a source account is current but a search result is old, inspect the relevant representation and synchronization evidence before changing the source schedule. Conversely, a newly updated search result does not establish a new live source read.

For a missed freshness target, record where the delay occurred and who owns that handoff. “Aggregation is slow” is not an adequate diagnosis when the job read promptly but the producer published late.

## Test the explanation against these changes

### 1. The job succeeds before the batch exists

At 03:30, the administrator sees `WH` on Devi's account and identity. The first run succeeded at 03:22. HR confirms that the new published batch will arrive at 03:40.

Should the administrator correct the department mapping now?

**Worked reasoning:** The supplied input still contains `WH`, so that evidence does not establish a mapping error. Verify the producer's batch and the later supported read. Diagnose the publication delay against the agreed freshness requirement rather than changing a correct consumer mapping.

### 2. Eight-hour recurrence crosses midnight

A daily account aggregation starts at 14:00 and recurs every eight hours. A change is published at 22:01. No manual or other collection occurs, and the 22:00 read has already passed the record.

Is 06:00 the next scheduled opportunity?

**Worked reasoning:** No. Daily recurrences end at midnight; the next window starts at 14:00 the following day. The wait to that scheduled opportunity is 15 hours 59 minutes, before execution or downstream processing. Calculate the real daily gaps before promising an eight-hour freshness target.

### 3. The clocks disagree after daylight saving

A VA cluster remains fixed at GMT-06:00. Its scheduled time is 02:00. The business clock now uses GMT-05:00.

What time should the business expect the scheduled opportunity, before any queue delay?

**Worked reasoning:** The cluster's 02:00 corresponds to 08:00 UTC, which is 03:00 on the GMT-05:00 business clock. The fixed cluster offset did not change. Verify the connector path and clock basis rather than applying the browser's local time to the schedule.

### 4. A recent run excludes the person

The intended source population includes 100 workers. A mistaken connector filter returns 90, excluding Devi. The job finishes successfully every hour.

Would running it every ten minutes establish current information for all 100?

**Worked reasoning:** No. The schedule repeats the configured exclusion. Confirm the intended population, filter and integration actor visibility, correct the approved scope safely, and verify the missing records. More frequent execution of the same read does not expand coverage.

### 5. Group information is newer than membership information

Account membership was observed at 09:00. Devi joined group `G-56` externally at 09:20. A group-definition read at 09:30 returns its current description. No later account read occurred.

Does the 09:30 group result establish Devi's membership?

**Worked reasoning:** No. It establishes object information from that read, not a new account-to-group relationship observation. Obtain the supported account membership evidence and preserve its observation time separately.

### 6. The second schedule runs too early

In a separate application scenario, HR data is collected at 05:00. An approved access change is required. The application account is aggregated at 05:05, but the supplied target evidence confirms that provisioning changes it only at 05:12.

Must the 05:05 application read be defective because it returns the earlier state?

**Worked reasoning:** No. It precedes the target change. The requirement depends on identity evaluation, supported provisioning and target success, not just two calendar times. Verify those outcomes and collect later target evidence. Do not claim that scheduling the application read five minutes after HR guarantees delivery.

### 7. The account is current, but Search is older

The supported source read and account record contain `DIST`. Search still shows the earlier value, and no synchronization outcome has been checked.

Should a second source aggregation be the first conclusion?

**Worked reasoning:** No. The current account evidence shows that collection obtained the value. Identify whether Search is displaying account or identity data, verify the mapped identity value where relevant, and inspect synchronization freshness. The evidence is insufficient to blame the source read or promise an exact Search completion time.

### 8. A fresh upload contains an old export

A file is exported at 18:00 and imported the following morning at 08:00. The business system changed the worker at 20:00 after the export. The import succeeds.

Can the report say the worker was checked against the live system at 08:00?

**Worked reasoning:** No. The import time describes ingestion of the supplied file, not a live check of the later business state. Confirm the file's contents and cutoff, obtain current supported input if required, and report the actual evidence time.

## A project promises removal within 30 minutes

A contractor-access project proposes hourly source aggregation. The producer publishes changes once each hour, independently of ISC's schedule. Termination decisions can arrive at their effective time; the design does not preload every event or provide a separate timed action. Queue and execution time vary. Identity processing can request account disablement through a supported connector, but nobody has defined how to confirm target success.

The requirement is “disable the external account within 30 minutes of the approved termination becoming effective.”

Would you approve that design from the schedule description? Explain the missing evidence and what must change.

**Worked reasoning:** No. An event can wait almost an hour for producer publication before ISC can read it. It can then miss a scheduled opportunity and wait again. The proposed intervals already fail to support the promised bound, even before execution, processing and provisioning.

Define effective-time handling, timely producer publication, a supported collection or event-driven design, operation authority, and target confirmation. Measure the whole chain and agree capacity, exceptions and escalation. Do not equate an identity state or an accepted disable request with a disabled external account.

A faster supported design is an acceptable proposal only when it addresses those dependencies and proves the required target outcome. If the integrations cannot meet 30 minutes, change the design or negotiate the commitment explicitly.

When someone asks, “How often does it run?”, answer that question. Then ask which information or access outcome must be current, by when, and what evidence will show it.
