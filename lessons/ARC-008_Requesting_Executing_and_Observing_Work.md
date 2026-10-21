# The request was accepted. What actually finished?

Devi, employee number `38008`, plans warehouse stock movements. She already has an account, `stock-38008`, in a fictional application called StockRoom. She needs permission to read stock information and export it for planning.

SailPoint Identity Security Cloud (ISC) accepts her access request. Her manager approves it. A later screen still doesn't show the access she expected.

Should you submit the request again, restart the connection, or wait?

You don't yet have enough information to choose. First identify what each observation describes. Acceptance, approval, execution, recorded outcome, collected account information, and actual application behavior answer different questions.

Let's follow the records until we can say exactly what happened.

## What change are we trying to make?

An **identity** is ISC's representation of a person. An **account** is a record in a particular system. The source account record in ISC represents Devi's external StockRoom account; it isn't the external account itself.

A **source** is ISC's configured representation of a system or collection of account data. A **connector** provides the integration used to read data and perform supported operations.

Here the source is StockRoom Production. Assume `stock-38008` already exists and is correctly associated with Devi's ISC identity. This ownership association is **account correlation**.

An **entitlement** is an assignable access right. Under StockRoom's fictional rules, `stock.read` permits reading stock information and `stock.export` permits exporting it.

An **access profile** bundles entitlements from one source. Stock planning access is a profile containing those two entitlements. Neither is initially present on Devi's account.

An **access request** asks for particular access for a recipient. In this case, Devi requests that profile for herself. **Provisioning** carries out the applicable account or access changes needed for delivery.

The intended result is therefore specific: both entitlements on `stock-38008` in the intended production StockRoom system. “The request exists” isn't that result.

Assume the profile is requestable for Devi, the applicable checks permit the request, and its configured approval is required. The source supports automatic delivery to her intended existing account. There is no account-creation dependency, future activation date, step requiring a person to make the external change, or custom script in this main example.

We'll use `AP-38` for the profile, `AR-38` for the request reference, and `ACT-38` for the related account activity. These are fictional stand-ins, not usable IDs or product status values.

## An accepted submission begins tracked work

The **user interface**, or UI, is the set of pages and controls a person uses. The **frontend** is the browser-facing interaction. The **backend** is the hosted processing behind the relevant operation.

An **API**, application programming interface, lets software request supported data or actions. Its **contract** documents the operation's inputs, permission requirements, response, and behavior.

A UI action and an authorized API submission can be alternative ways to start the relevant supported request. They don't remove the configured checks or guarantee identical screens, internal calls, or responses.

For the documented access-request submission API, a successful 202 Accepted response means the request was submitted and queued for processing. **Asynchronous** processing means the initiating interaction can finish before the requested work finishes.

A **queue** holds work awaiting processing. That explains the distinction between accepted and finished; it doesn't tell you ISC's private queue layout, processing order, or completion time.

Preserve the returned tracking references. When you inspect `AR-38` later, you're following the submitted request rather than creating a second one because the browser interaction ended.

Closing a browser or ending a client process doesn't, by itself, cancel accepted asynchronous work. Cancellation, where supported for the current stage, is a separate operation with its own rules.

Also avoid the opposite assumption: a caller-side error always means nothing was submitted. If the response was lost, the outcome can be uncertain. Use available request references and supported status checks to reconcile the attempt before repeating it.

## Approval is a decision, not the target change

An **approval** records the required reviewer's decision under the configured request process. It establishes that decision for the relevant item and recipient.

It doesn't give the connector new target privileges, create a missing account by itself, or prove an external change succeeded.

If `AR-38` is waiting for the required review, the appropriate evidence concerns that review. A connector restart can't supply the missing decision.

If the request has passed its required approvals but access is absent, inspect the delivery work. Sending the manager the same question again won't repair a target permission denial.

The main relationship is:

```text
[Request AR-38 for profile AP-38]
                 |
                 v
[ISC: applicable checks and approval]
                 |
                 v
[Configured connector delivery work]
                 |
                 v
[StockRoom: intended account changes]
                 |
                 v
[Engineer checks outcome and evidence]
```

The arrows show the intended dependency between stages, not a guarantee that each stage succeeds or ISC's private implementation sequence. The last box is human investigation and verification, not an automatic fresh application login.

A rejected request doesn't follow this example's approved delivery path. A request still waiting for a required decision hasn't reached the same point as an attempted change that the target refused.

## Execution has its own actor and result

The connector uses the configured integration path and target authority. In this example, `svc-stock-isc` is the external integration actor performing the supported change. Devi's `stock-38008` account receives the access.

The manager's business approval and the integration actor's technical permission are different. Approval can be correct while the external system refuses an operation because that actor lacks the necessary authority.

For this fictional source, assume a supported **SaaS connector**, which runs its integration work in SailPoint's hosted environment. A **Virtual Appliance**, or VA, is a customer-deployed virtual machine used by applicable VA-based integrations. Use the actual source's configured path when investigating execution; don't insert a VA into every operation.

**IQService** is a Windows service used by connectors for particular supported Windows-side operations. It is a dependency only when the selected connector and operation require it. Our fictional main trace does not require it.

An **account activity** is a tracked account action in ISC. A **status** reports a tracked record's condition or outcome. A **stage** indicates progress within the relevant action. A status on an account activity isn't automatically the status of every request item or the current state inside the target.

Relevant activity views can identify its action, requester, recipient, sources, stage, overall status, and last modification. Opening details provides more context, including reported provisioning errors.

The **requester** initiated the work; the **recipient** is the person or entity whose account the action concerns. Those can differ. Neither label alone proves which technical credential the connector used.

Read the detail at the right level. An overall error can coexist with a successful component change. A successful component doesn't establish that every component or the whole business requirement completed.

An **event** records something that happened. An **audit record** preserves relevant activity for investigation. Target audit evidence can therefore help distinguish an actual applied change from a submission or decision recorded in ISC.

## Follow the timestamps, not just the newest badge

The following evidence is fictional. All times use Coordinated Universal Time (UTC), one shared time reference, on the same day. They illustrate relationships, not ISC performance guarantees or a universal entitlement execution order.

For this StockRoom connector example, the supplied trace contains separate results for adding the two permissions. That doesn't mean every connector sends one network call per entitlement or creates one activity record for each.

| Time | Supplied evidence | What it establishes |
|---|---|---|
| 09:00 | Account data collected before the request shows neither entitlement | The represented account state at that earlier observation |
| 10:00 | `AR-38` is accepted for processing | Submitted request, not completed delivery |
| 10:05 | The required approval is recorded for the profile | The configured decision has been made |
| 10:06 | `ACT-38` details and target audit evidence show `stock.read` added to `stock-38008` | That component change succeeded on the intended account |
| 10:06 | The export change is refused because `svc-stock-isc` lacks the required target authority; target evidence shows `stock.export` absent | Delivery is incomplete despite the approval and successful read grant |
| 10:08 | The inspected account view still reflects the supplied 09:00 collection | That view can't disprove the later read grant |
| 10:20 | A separate successful collection includes `stock.read`, but not `stock.export` | This later represented state agrees with the supplied partial target outcome |

At 10:08, “neither entitlement was granted” would be wrong. The old account view doesn't erase the later target change.

“Everything succeeded because the manager approved” would also be wrong. The export permission is still missing.

The supported conclusion is narrower and more useful: the requested profile is approved, its read permission was delivered, and export delivery failed for the supplied integration-privilege reason.

The correct next action concerns the missing delivery authority and the unresolved export change. It doesn't concern re-correlating Devi, recreating her existing account, or repeating the manager's decision.

## A failed overall operation can leave a real change behind

A **partial outcome** means part of the intended work happened while another part did not.

For the supplied trace, the target keeps `stock.read` after the export failure. We have no evidence of a reversal. You must not report that nothing changed.

**Rollback** would undo earlier changes as part of a defined recovery or transactional behavior. Don't assume that every connector or multi-step ISC action provides it.

The relationship in this example is:

```text
[Approved Stock planning access]
                |
        required target changes
          /                \
         v                  v
[stock.read added]   [stock.export refused]
         |                  |
         +---------+--------+
                   |
                   v
[Partial target result: read only]
```

The branches represent required effects and their supplied results, not simultaneous execution, a fixed packet order, or two separate approved requests.

If the business requirement needs both permissions, read-only access doesn't satisfy it. But “requirement not satisfied” and “nothing changed” remain different conclusions.

The same reasoning applies when one request contains multiple items: inspect the relevant item and delivery evidence rather than assigning the outcome of one item to every other item.

## Reading the account is separate from changing it

**Aggregation** collects account or entitlement information into ISC. It changes what ISC represents about the source; it isn't a command to grant the missing export permission.

A **collection scope** defines which records and information a read includes. A source name alone doesn't prove that a particular run collected this account and its relevant entitlement values.

The 10:20 collection in our trace is explicitly supplied as successful and inclusive of `stock-38008` and both relevant membership values. That condition matters. A different run that excluded this account couldn't establish its later state.

You now have two directions of work:

```text
[ISC] -- supported change --> [StockRoom]

[ISC] <-- later collection -- [StockRoom]
```

The first arrow represents an outbound account change. The second represents reading target data into ISC. They aren't a guaranteed automatic cycle, and every write doesn't require immediate aggregation or a new source-wide scan.

ISC also has other supported ways of updating represented information. The example's old view is a supplied observation, not a claim that every account view must always wait for a full aggregation after provisioning.

An **identity attribute** is a named value on an identity, such as department. A supported single-account aggregation can refresh represented source-account data without being another provisioning attempt. Its documented scope doesn't synchronize those new values into identity attributes.

Refreshing the source account and recalculating identity values are different jobs. Don't use one operation's completion as evidence that the other ran.

Likewise, a browser refresh reloads a view. It doesn't, by itself, start aggregation, recalculate every identity value, or repeat an external change.

## Which evidence answers your question?

A **task** or **job** tracks a unit of work under its own rules. A request, an account activity and a collection task can be related, but they aren't interchangeable. Request review, connector activity, collection, and human fulfillment have different work objects.

Use the evidence that answers the current question:

| Question | Useful evidence | Limit to preserve |
|---|---|---|
| Was the request accepted, and what is it waiting for? | Relevant request reference, status details and review history | Acceptance or a reviewer decision isn't target completion |
| Which account operation ran, and what was reported? | Account activity, provisioning-event detail, source/account/action/error context | Overall or component status has a particular scope |
| Did a collection include this account and the required data? | Aggregation history, run scope, counts and relevant account result | A completed run name or count alone isn't proof of every expected record |
| What permission does the intended account currently hold? | Authorized target inspection and relevant target audit evidence | Wrong environment, wrong account, or older evidence answers a different question |
| Can Devi perform the intended business action? | An approved test under the intended user/application context | A successful sign-in or one visible page doesn't establish every permission |

ISC's request-tracking view can show the request's review steps and errors. Provisioning reports and account-activity details describe tracked account work. Aggregation history describes collection runs. They are different windows into the system.

When one view reports success, say what succeeded. “The collection completed” is more informative than “ISC is green.”

## A reference connects evidence. A matching name doesn't

Use the request's recorded relationships to find the relevant activity. Confirm recipient, source, intended external account, operation, entitlement and time.

`AR-38` and `ACT-38` are different record references. Their shared suffix here is a teaching convenience, not an ISC rule for deriving one ID from another.

An **object ID** identifies a particular ISC object. A display name is a label. Similar names can occur in different tenants or systems.

A **tenant** is an organization's ISC environment. StockRoom Production is our source label; the actual external production destination also needs to be correct.

Finding `stock-38008` in a test system doesn't prove the production operation succeeded. Finding a successful modification of a different attribute doesn't prove that `stock.export` was added.

An action's **last-modified time** identifies a change to that tracked record. It isn't automatically the exact time an external permission became effective. Use the meaning and time context of each record.

When combining evidence, compare time zones and the events those timestamps represent. A request's creation time, a target audit time, a collection time, and the moment you opened a page needn't be the same.

## What if you cannot find the expected record?

A missing search result is not yet proof that the work never existed.

**Filters** narrow a result set. **Pagination** divides results into pages. A user can also have permission to inspect their own work without authority to inspect every other user's work.

Check the supported operation or view, tenant, caller permissions, recipient, time range, filters, retained history and pagination. Don't broaden privileges simply to avoid understanding the required access.

Some access-request submissions for already-held access can be ignored or canceled as duplicates under the documented behavior and need not appear as ordinary new status entries. Therefore, even a legitimate query needs its contract and request context.

Already-held access also changes what you expect to execute. If the contract treats an equivalent request as a duplicate, you shouldn't demand a new target write as proof of success. Establish the existing account state and applicable assignment/request behavior instead. That isn't a failed connector merely because another grant wasn't sent.

Search is another represented view. **Indexing** prepares information for retrieval by a search system. Different kinds of updates have documented indexing behavior; don't promise that every record becomes searchable immediately.

If a direct record view and Search differ, check their scope and update timing before declaring that the account change was lost.

Record the limit honestly: “I haven't found this activity in the inspected view and time range.” That is different from “ISC never attempted it.”

## Repairing a dependency doesn't finish old work

Suppose the source owner corrects `svc-stock-isc`'s export-assignment privilege through the approved change process at 11:00.

That restores a missing prerequisite. It doesn't itself establish that the earlier failed export operation has been retried or completed.

A **retry** is another execution attempt. **Reconciliation** compares the recorded work and actual state so you can determine what remains unresolved and recover appropriately.

Before recovery, establish what changed already, whether anything is still in progress, the current request state, and the supported recovery options for this operation.

Also confirm that the access is still authorized now. An earlier approval isn't permission to replay a grant after the requirement has been withdrawn or the access has been removed through an approved process. Canceling pending work likewise isn't evidence that previously applied target effects were reversed.

Some operations and connectors support particular automatic retries. Others require different recovery. A configuration repair isn't proof that an automatic retry will happen, and one connector's retry behavior isn't an ISC-wide rule.

An operation is **idempotent** when repeating an equivalent request has the same intended target effect as one such request. Don't assume that every write, external action or script is idempotent. Duplicate protection also belongs to the chosen contract, not to the fact that the caller is automated.

For this incident, preserve the read grant and identify the supported way to resolve the missing export delivery under the current authorized state. Don't delete the account, remove unrelated access, or submit repeated new requests just to produce another success badge.

Continue the fictional incident with supplied recovery evidence. At 11:10, an approved supported recovery attempt reports that it added the missing `stock.export`. At 11:12, authorized target inspection confirms both required entitlements on `stock-38008` in production. At 11:15, an approved test confirms that Devi can perform the intended planning export.

Now you can distinguish the conclusions. The later attempt reports success, the target confirms the intended account state, and the business test confirms the required use. The 11:00 privilege repair alone established none of those later outcomes.

Preserve the original failure and its relationship to the recovery evidence. A historical failed attempt doesn't become a successful past event because later recovery succeeded. Nor does the current target result guarantee that every earlier status badge automatically changes. Document which work failed, what corrected it, and what evidence closes the requirement.

## A timeout is uncertainty, not an automatic reversal

A **timeout** means an expected response didn't arrive within the allowed waiting period.

It doesn't prove how far the work progressed. The target might not have received it, might have rejected it, or might have applied it before the response was lost.

Those are alternatives to investigate, not equal facts about every timeout.

In a timeout variation, compare the tracked activity with authorized target state and target audit evidence. Resolve whether the requested effect occurred before choosing the supported recovery action.

Don't turn uncertainty into either “nothing happened” or “everything completed.” Also don't interpret a failed response as a universal rollback instruction.

## Some fulfillment belongs to a person

**Manual fulfillment** means an assigned person performs the required external change rather than a connector completing it automatically. A disconnected or file-fed arrangement can use tracked manual provisioning tasks.

**Ticket-based fulfillment** coordinates work through a supported service-management integration. The exact completion contract depends on that configured integration.

These are alternate delivery arrangements, not extra stages every automatic request must pass through.

A manual task can identify the account, source and required change, then be marked complete when the responsible person completes it. The marked task records that completion assertion; it isn't an independent live measurement of the target.

Ask for the relevant completion evidence under the organization's process. A ticket number proves that a ticket exists, not that the correct account has the requested permission.

If the result isn't verified, communicate the boundary: task marked complete, target outcome not yet established. Don't silently promote the first statement into the second.

## Put the observations together

Treat each case as a separate variation.

### 1. Approved, but no delivery result yet

A request has passed its required approval. The relevant record still shows work in progress, and no account-level completion or target confirmation is supplied.

Can you declare delivery successful or diagnose a target rejection?

**Worked reasoning:** Neither conclusion follows. Approval establishes a decision, and the supplied work is not yet shown complete. Follow the relevant activity and dependencies using the supported status information. Don't invent a rejection, guarantee a completion time, or submit again merely because it isn't immediate.

### 2. Read granted, export refused

Use the main trace: target evidence confirms `stock.read` present and `stock.export` absent after a reported export-authority refusal.

Does the overall failure mean Devi still has neither permission?

**Worked reasoning:** No. It is a partial outcome. Read access exists, while the full planning requirement is unmet. Investigate and recover the missing export delivery without assuming rollback or undoing the successful component.

### 3. The aggregation completed successfully

A later collection includes the intended account and accurately reports that export is absent. Someone says the successful aggregation must have repaired the export assignment.

What actually succeeded?

**Worked reasoning:** Collection succeeded. It represented the missing permission accurately; it didn't add it. The unresolved work concerns access delivery, not making the read task produce a grant.

### 4. The target changed, but the response timed out

An account action records a timeout. Authorized target audit evidence and current inspection establish that the requested permission was added to the intended account.

Should the team repeat the change on the assumption that timeout means no effect?

**Worked reasoning:** No. The supplied target evidence establishes that the effect happened even though response tracking wasn't clean. Reconcile the activity through the supported process. Don't duplicate a write or infer rollback from the timeout.

### 5. A completed task points to the wrong account

A manual task is marked complete. The fulfillment note identifies a test account, while the approved request concerns `stock-38008` in production. No production confirmation is supplied.

Can the request be reported as verified delivery?

**Worked reasoning:** No. The completion assertion and supplied note don't establish the intended production outcome. Confirm the correct source, account and permission with the responsible fulfiller. Preserve the mismatch rather than closing the investigation on the task's badge.

### 6. The first page has no matching request

In an on-behalf-of variation, another authorized user requests access for Devi. A client inspects one page of a supported status list. Pagination shows more results, and the client filters for requests submitted by Devi rather than requests for Devi.

Does the missing entry prove that the access request was never submitted?

**Worked reasoning:** No. The inspected result is incomplete and asks a different population question. Use the known references and supported query context, permissions and pagination. Missing evidence in that view isn't proof of no work.

## Decide what “done” should mean for a new project

A payroll team proposes: “When our automation receives a successful submission response, we'll mark payroll access complete. If someone still can't use payroll, we'll repeat the request and run an aggregation.”

What would you change?

**Worked reasoning:** Define completion for the intended account and business requirement, not just for the initiating interaction. Preserve request references and distinguish required decisions, account execution, reported results and target verification.

Establish the actual delivery arrangement: automatic, manual, or supported ticket-based fulfillment. Identify dependencies, responsibility for waiting or failed work, and the evidence needed to close it.

Aggregation can help refresh represented account information. It isn't a substitute for delivering missing access. Repeated requests need the selected contract's duplicate and recovery behavior; they are not a general repair method.

The design also needs to handle partial and uncertain outcomes. Decide how it identifies already-completed effects, still-running work and unresolved target state before another write.

A useful completion statement is: “The required decision is recorded, the intended account change has the appropriate completion evidence, and the agreed target or business check confirms the expected result.” If one part is missing, say which part remains unproven.
