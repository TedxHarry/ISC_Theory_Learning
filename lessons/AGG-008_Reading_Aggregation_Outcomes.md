# The aggregation ended. What did it actually establish?

Devi, employee number `58008`, coordinates warehouse dispatches. Her WarehouseFlow account is `wf-58008`.

The application has changed that account's operating site from `EAST` to `CENTRAL`. SailPoint Identity Security Cloud, or ISC, still represents the earlier value.

An account collection ends with an error. Its history shows 60 accounts scanned, while the agreed population contains 100. Yet ISC's account inventory still contains 100 records.

Has the inventory count proved that the read was complete? Did the error mean that nothing changed?

Neither conclusion follows. The task result, the records read, and the records currently stored answer different questions.

## First, identify the work that produced the result

**Aggregation** reads supported account or access-object data and represents it in ISC. A **source** is ISC's configured representation of the system or data it manages. A **connector** supplies the integration operations that perform the supported reads.

An **account** is an external system's record, with its own identifying key and attributes. ISC stores a representation of it. An **identity** is ISC's person record, which can connect accounts belonging to the same person.

Our source is **WarehouseFlow Production**. It uses the Web Services SaaS connector to read the application's account interface. “SaaS” means software as a service; this connector runs in SailPoint's cloud. ISC already associates `wf-58008` correctly with Devi.

This run is intended to read the complete agreed population of 100 accounts, not only changed accounts. All 100 already have ISC representations. No account is created or deleted in this example, and the expected identifiers do not change between the two runs below.

The application's interface uses **pagination**: it returns the account population in portions called pages. The supplied configuration obtains pages of 30 records, except for the final page of ten.

These facts, error details, counts and outcomes are fictional teaching evidence. They are not measurements or screenshots from a live tenant.

Before interpreting a result in daily work, establish the source and environment, account versus entitlement collection, full versus changes-only scope, and the particular execution. “The latest aggregation” can point to the wrong source, object type, or later rerun.

We will call the two executions Run A and Run B. Those are teaching labels, not real task identifiers. Their times use UTC, a common reference clock, on the same day. No other operation changes the ISC account values between Run A and its post-run checks.

## Follow Run A until the read stops

Run A starts at 09:00. The first page returns 30 accounts and the second returns another 30.

The third page fails with a connection-reset error. The operation does not obtain the remaining required pages, and the task ends at 09:08 with an error.

Here is the supplied evidence:

| Evidence | What it says |
|---|---|
| Intended population | 100 specific existing accounts. |
| Successful page responses | Page 1: 30 unique accounts. Page 2: 30 different accounts. |
| Later response | Page 3 fails; no complete remaining population is obtained. |
| Task result | Error; 60 accounts scanned in this example. |
| Comparison of the 60 received inputs | 50 match their earlier values; ten contain changed values. |
| Devi's account | Among the 40 unread accounts; ISC still represents `EAST`. |
| Another received account, `wf-58009` | A separate post-run check confirms its new `CENTRAL` site is represented. |
| Post-run inventory | Still contains the same 100 account identifiers, including older representations of unread accounts. |

The ten changed inputs are not a claim that all ten resulting account updates have been verified. We have separately checked one, `wf-58009`.

The numbers describe different sets:

60 accounts were read. Of those received inputs, 50 were unchanged and ten differed. Another 40 expected accounts were not read.

So 50 plus ten explains the 60 received accounts. Adding the 40 unread accounts explains the intended population of 100.

The inventory still has 100 because already represented records do not become freshly read just by remaining in ISC. An old record can remain visible while this execution fails to obtain its current source values.

Trace the supplied read:

```text
[Expected population: 100 accounts]
                 |
                 v
[Page 1: 30] + [Page 2: 30]
                 |
                 v
[60 read: 50 same, 10 different]
                 |
                 v
[Page 3 fails: task ends in error]
[40 unread, including wf-58008]

[Engineer checks actual ISC values]
[wf-58009 new; wf-58008 still old]
```

The connector obtains the page responses. ISC reports the task outcome and represents data obtained through the integration. The arrow order is the supplied trace for this fictional connection, not a universal statement about every connector's request or persistence order.

The separate engineer checks are evidence collected after the task. They establish one represented update and one stale value. They are not an automatic success stage.

## An error describes a problem, not a universal rollback

The error tells us that Run A did not complete its intended read. The later record check tells us that an earlier received account's new value is already represented.

Those facts can coexist.

Do not infer that every aggregation is one indivisible transaction that either updates everything or restores every previous value. Nor should you assume that every failed aggregation always preserves all earlier work in the same way.

Inspect the actual result for the operation, connector and affected records.

Devi's unchanged `EAST` value has a specific explanation in this example: her account was not read. It is not evidence that the operating-site mapping rejected `CENTRAL`.

Conversely, `wf-58009` showing its new value does not prove that the remaining 39 unread accounts or all other changed inputs are correct. One successful record cannot certify an incomplete population.

A useful incident statement is therefore:

“Run A ended with an error while retrieving page 3. The supplied trace contains 60 unique accounts out of 100 expected. Account `wf-58009` has its new site value, but `wf-58008` was not obtained and remains stale. The remaining population and other changed-record outcomes require verification.”

That statement separates observed facts from work still needed.

## A count needs a subject and a meaning

When you read a number, ask what was counted and where.

The source application's population, responses received by the connector, records entering ISC processing, current account inventory, and number of identities are not interchangeable quantities.

| Number or label | Question it can help answer | What it does not establish alone |
|---|---|---|
| Accounts scanned | How much account input this execution reports scanning. | That every intended account was included or every output value is correct. |
| Unchanged accounts | How many inputs were classified as unchanged in this result. | That the accounts were never read or that all matching logic was reevaluated. |
| Processed records | What work the specific result defines as processed. | A universal count of unique people, successful external changes, or completed identity updates. |
| Added, updated or removed representations | What changes the particular result reports for ISC records. | Matching external create, update or delete operations. |
| Current source account inventory | What account representations exist in ISC now. | How many were freshly observed in this run. |
| Identities | How many person records exist in the stated view. | How many accounts a source read should return. |

Use the actual field definitions and scope for the screen or API result you are inspecting. An **API** is an interface through which software requests operations or retrieves data. Its response fields are not automatically identical to a screen's summary labels.

The 50-same/ten-different breakdown in Run A is our supplied comparison of received inputs. It is not an invented universal ISC counter schema.

Do not force every result into “scanned = updated + errors + unchanged.” Counts can refer to different stages, objects or categories, and categories can overlap. An error event can also prevent a whole later page from arriving.

A single connection failure in our trace leaves 40 expected accounts unread. “One error” would not mean “only one account needs attention.”

## Why can many scanned accounts be unchanged?

**Optimization** avoids further work for existing account records when no input changes are detected.

The documented optimized aggregation reads records and evaluates whether their data changed. For an existing unchanged record, it can skip further processing, including account correlation and manager correlation.

**Account correlation** associates a source account with the person it belongs to. **Manager correlation** establishes an identity's manager relationship. These are different matching responsibilities, even though both can depend on collected data.

Therefore, a high unchanged count can be consistent with a successful read of a stable population. It does not mean those records were absent from the read.

It also does not prove that a recently corrected correlation configuration was applied to unchanged records. That task can require an appropriately supported unoptimized aggregation, which reevaluates unchanged accounts rather than taking the shortcut.

Choose that operation because the required logic needs re-evaluation, not because a large unchanged count looks suspicious.

An unoptimized run still cannot process account data it never obtained. Disabling optimization would not repair Run A's failed page retrieval.

## Read the status together with its details

ISC's aggregation history distinguishes success, warning, error and terminated tasks. Treat the status as the beginning of the investigation, not the whole explanation.

**Success** means the task reported a successful outcome for the work it performed. To establish business completeness, also check the intended population, operation scope and output evidence.

A connector can successfully read an unintentionally narrow filter. If only 90 of 100 required accounts are selected, repeating that successful read does not make the other ten current.

**Warning** calls for the warning details. For example, source account-deletion safeguards can cancel a run and generate a warning when the proposed deletion volume reaches the applicable limit behavior. It would be unsafe to dismiss that as “not an error, so no action is needed.”

**Error** identifies an unsuccessful aspect of execution. Determine the affected stage, records and breadth. A connection failure before any response, a later-page failure after partial progress, and a record-conversion problem require different evidence.

**Terminated** means the execution was stopped. The history can identify the administrator who terminated it. A deliberate stop is not proof that the connector could not authenticate, and it does not prove that all earlier work was reversed.

If work is still waiting or running, a previous completed row is not its final result. A scheduled time or accepted request is not completion evidence either.

Do not assume one general rule for how every connector handles an invalid individual record. Establish whether that specific operation skipped a record, stopped further collection, or reported another documented outcome. Then inspect its consequences.

## Find the result that belongs to this execution

The cross-source **Aggregation Activity** page helps locate activity across sources. The source's **Aggregation History** provides execution-specific account history.

For an account aggregation, the history can show its start and stop, accounts scanned, status and whether optimization was enabled. Details for terminated work can also include duration and unchanged-account information.

For warning, error or terminated entries, inspect the available information on the status badge. When an administrator terminated the task, the information identifies who did it.

Connect each visible value to its meaning:

Start and stop establish this execution's time window. They do not give every account's individual observation time.

Scanned counts describe reported input work. Compare them with an independently established expected population and the identifiers actually obtained.

Optimization information explains the processing mode, not whether the read had correct permissions or complete page coverage.

Warning and error details identify reported problems. Preserve the exact message and relevant identifiers; don't replace them with a vague summary such as “source broken.”

Keep the particular task reference or execution time with your evidence. Comparing Run A's error to Run B's account output without identifying the two runs can produce a false diagnosis.

When sharing diagnostics, retain the facts needed to trace the operation without exposing passwords, access tokens or unnecessary personal data.

## A complete count can still hide incomplete coverage

Run A is visibly short: 60 unique accounts versus 100 expected.

Now imagine a separate result with 100 response rows but only 99 distinct account keys because one row is duplicated. If one expected key is absent, the raw row total is not proof of complete coverage.

Or imagine 100 distinct returned keys, with one expected account replaced by an out-of-scope account. The totals match, but the required set does not.

An **account key** identifies the external account within its source context. Compare keys from the agreed population, not only display names, which need not be unique.

Also establish which operation ran:

A **full aggregation** reads the configured population. It is still bounded by filters, integration permissions and the supported operation.

A **delta aggregation** collects supported changes. Ten returned changes cannot be compared with a 100-account population as though the other 90 were failed reads. An unchanged account can legitimately be absent.

A specified-account read addresses one account, not population coverage.

An empty result needs the same care. It can reflect a genuinely empty agreed scope, a filter or actor-visibility problem, an old or incomplete file, or an unsuccessful request. A failed request is not a successful empty population.

The **integration actor** is the external identity or credential under which the connector reads. An application's administrator seeing 100 accounts does not establish that the connector's actor can see those same 100.

Review source account-deletion settings before rerunning uncertain population reads. An unexpectedly empty or narrow response must not be approved as accurate merely because it is syntactically valid.

## Account counts are not entitlement counts

An **entitlement** is a represented access item, such as a group or permission. **Entitlement aggregation** collects supported access-object information. Account aggregation collects account data and supported held-access values.

A completed entitlement run's discovered count can differ from ISC's total entitlement inventory. That inventory can include information established through previous account or entitlement aggregations.

For example, a run that discovers five group objects does not, by that number alone, prove that a current inventory of eight is wrong. Check the selected source, object types, previous inventory and the meaning of that run's discovered count.

Account membership occurrences are different again. Two people holding one group produce two account-to-group relationships but only one distinct group identifier.

Do not add account, membership, group and identity counts to make a task total balance. First decide whether the quantities describe the same objects and stage.

## Keep source processing separate from identity and target results

A new value on an ISC account representation is not automatically a new value on the person's identity.

An **identity profile** defines the source mappings used for identity values. **Identity processing** evaluates an identity under its identity and access configuration. Its output needs the relevant input, mapping and processing evidence.

**Provisioning** makes supported changes to external accounts or access. Reading an existing membership is not granting that membership. A task's “updated account” result must not be casually rewritten as “the application account was changed.”

Identity processing can initiate provisioning, but it does not validate that the external change was successfully delivered.

For a request that extends beyond account collection, use a separate evidence check for each required result:

```text
[Engineer checks task outcome]
               |
               v
[Checks required read coverage]
               |
               v
[Checks selected account values]
               |
      if identity update required
               v
[Checks identity value and mapping]
               |
      if external change required
               v
[Checks actual target outcome]
```

These arrows show questions an engineer follows, not an automatic ISC execution pipeline. The conditional checks are needed only when the requirement includes those results. No stage borrows proof from a different stage's green status.

ISC **Search** presents indexed information used to find records. It is not a new source read. Its synchronization can lag account or identity updates, so identify the object and view being inspected before blaming collection for an older search result.

If the agreed task is only to refresh Devi's account site, the account value is the relevant output. Do not invent a requirement that her identity site or application permissions must also change.

## What should you check before retrying?

A **retry** repeats supported work after an unsuccessful attempt. A later success does not erase what happened in the earlier attempt.

ISC can recognize retryable aggregation errors on supported sources. Connection-reset errors are among the documented examples, but retry support and configured behavior are connector-specific.

Do not assume every source retries, every error is temporary, or every retry resumes exactly at the failed page without repeating previous work.

For Run A, the task has already ended with an error. Establish the connection problem and supported recovery rather than waiting indefinitely for a hypothetical automatic continuation.

In this fictional incident, the connection issue is resolved. The team reviews the unchanged population, source settings and consequences, then approves a new supported full aggregation.

Run B starts at 10:00 and ends successfully at 10:06. Its evidence shows all 100 expected unique account keys were obtained. At 10:07, a separate check confirms `wf-58008` now contains `CENTRAL`.

That gives us evidence of restored population coverage and the required account value. It does not establish that every possible identity calculation or target-access action succeeded, and none is part of this supplied recovery requirement.

For permission errors, invalid mapping inputs, page configuration problems or producer defects, resolve the identified cause through the appropriate owner. Do not grant broad privileges, disable deletion guards or reset delta tracking merely to obtain a green result.

A controlled test on a smaller population can help diagnose a connector operation, but a successful diagnostic subset is not proof of full production coverage. Keep that test separate from the required population and review any scope or deletion consequences.

## Work through these outcomes

### 1. Sixty scanned, one hundred in inventory

Run A read 60 of 100 expected accounts and ended with an error. ISC still contains all 100 account identifiers.

Can the engineer report that every account was refreshed?

**Worked reasoning:** No. The inventory includes previously represented records. The supplied read failed to obtain 40 expected accounts, including Devi's. Verify current values from the required population rather than treating inventory size as an execution count.

### 2. An earlier update remains after the error

After Run A, `wf-58009` contains its new site value. An engineer says this is impossible because the task failed.

What does the evidence establish?

**Worked reasoning:** It establishes an actual represented update despite the overall error. Do not infer universal rollback from the status. It also does not certify every other changed input; inspect those outcomes separately as needed.

### 3. Success returns only ninety accounts

In an independent variation, a mistaken filter selects 90 of 100 required accounts. The task reports success for that read.

Should the remaining ten be considered current?

**Worked reasoning:** No. The result completed its configured read, but the supplied scope misses the business requirement. Identify the omitted keys, correct the approved scope safely, and verify complete collection. Task success and required coverage are different conclusions.

### 4. Most received inputs are unchanged

A complete optimized read obtains 100 accounts. The supplied comparisons find 95 unchanged inputs. The engineer recently corrected account-correlation criteria.

Does the count prove that all 95 unchanged accounts used the corrected matching logic?

**Worked reasoning:** No. Optimized processing can skip further account and manager correlation for unchanged records. Establish the appropriate supported unchanged-record re-evaluation and inspect its results. The count does not mean those 95 accounts were never read.

### 5. One page failure, many unread accounts

One connection failure prevents page 3 and the remaining required pages from being obtained. Forty accounts are unread.

Does one reported failure mean only one account is affected?

**Worked reasoning:** No. An error event and affected accounts are different units. The expected keys and page evidence establish a 40-account coverage gap. Preserve the error context and identify the missing population instead of using event count as record count.

### 6. An administrator stops the run

A history entry is terminated, and its details identify an administrator who stopped it. No evidence of a credential failure is supplied.

Must the engineer replace the integration credential?

**Worked reasoning:** No. The supplied cause is an administrative stop, not failed authentication. Establish why it was stopped, what work occurred, and whether a supported rerun is appropriate. Do not change credentials or assume rollback without relevant evidence.

### 7. Five discovered groups, eight in inventory

An entitlement run reports five discovered objects. The current source entitlement view contains eight objects established across collections.

Does the mismatch alone prove three duplicates?

**Worked reasoning:** No. A per-run discovered count and accumulated inventory are different quantities. Check object keys, types, scope, previous collections and count meaning. Duplicates require identifier-level evidence, not subtraction alone.

### 8. One hundred rows contain ninety-nine keys

A fictional response has 100 rows but only 99 distinct account keys. One expected account is absent, and another account's row is duplicated.

Can the raw total certify complete coverage?

**Worked reasoning:** No. Compare the required and returned key sets. There are only 99 distinct returned keys, and the expected missing key still needs investigation. Determine how the specific connector handled the duplicate rather than inventing a universal overwrite or rejection rule.

## A project wants a single “healthy” indicator

A project proposes an operations dashboard. It will show healthy whenever the latest task has no error and its account count equals yesterday's inventory.

The requirement is that all in-scope worker accounts have current department information and that any required external disablement is confirmed. The project has not defined expected identifiers, freshness, identity mappings, warning handling or target verification.

Would you approve that rule? Explain the separate evidence the indicator would need.

**Worked reasoning:** No. A task can complete a wrong scope, a warning can require action, a repeated total can hide different or duplicate identifiers, and stored inventory can contain old values.

Define the source/object/mode and required key population, the producer's data cutoff and acceptable age, execution outcome and warning context, and checks of the account values. Where identity department matters, establish the profile mapping and processing output.

Where external disablement is required, confirm the supported target operation and actual external state. Task success or an identity decision alone is insufficient.

A dashboard can combine those checks into a useful operational conclusion, but it must retain what is verified, incomplete, failed or unknown. It should not convert missing evidence into healthy just because one number is familiar.

Before saying “aggregation worked,” finish the sentence: which execution, which population, which record or outcome, and which evidence?
