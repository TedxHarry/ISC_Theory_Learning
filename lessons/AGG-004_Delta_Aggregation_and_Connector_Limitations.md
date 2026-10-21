# Only the changed accounts arrived. What does that tell us?

Devi, employee number `54004`, coordinates service work. Her existing WorkQueue account is `wq-54004`.

The application's department value changes from OPS to FIN. SailPoint Identity Security Cloud (ISC) still has the earlier account value, so the next collection needs to bring in that change.

Two other things happen in WorkQueue: account wq-54007 is created, and account wq-54006 is deleted. Another existing account, wq-54005, doesn't change.

The next read reports the three changes. It doesn't return wq-54005.

Should ISC treat that omitted account as deleted?

No. First establish what kind of read was performed. A changes-only result isn't a complete list of accounts that still exist.

WorkQueue, its data and the outcomes below are fictional. The example assumes a completed initial population read, continuous correct change capture, supported account identification and deletion handling, and a verified existing association between Devi's account and her ISC identity. No database, permission, tracking state or real account is changed.

## What “delta” means here

An **account** is a record in an external system. An **identity** is ISC's representation of a person or another entity, connecting information, accounts and access.

A **source** is ISC's configured representation of a system or collection of account data. Our source is WorkQueue Production. Its **connector** supplies the supported integration behavior.

**Account aggregation** collects source accounts and their attributes into ISC. An **attribute** is a named piece of information, such as department.

A **full aggregation** reads the configured account population. A **delta aggregation** uses a supported changes-only mechanism to collect relevant changes since an established starting point.

Delta describes a difference. It doesn't mean “a full list with fewer columns” or “read only active accounts.”

A changes-only collection still needs a supported trigger, such as a manual start or configured schedule. Delta doesn't, by itself, promise that every application event immediately starts an ISC read.

**Scope** identifies the records and information intended for collection. A **filter** selects or excludes records under supported conditions. Both full and delta reads still have scope.

The benefit comes from avoiding repeated collection of the whole population when the supported change mechanism can identify the required work. That can reduce collection time and load. It doesn't guarantee a fixed duration or complete coverage of every kind of change.

## Start with something the differences can update

A **baseline** is an established starting representation against which later changes can be understood. For our example, a completed full read has represented these accounts:

wq-54004, wq-54005 and wq-54006.

The relevant starting point for subsequent collection must also be established through the connector's supported mechanism.

Don't assume an arbitrary date typed by an administrator is equivalent to that starting point. Don't assume every connector stores one field called lastAggregation and uses it in the same way.

A connector can use a saved reference to a position in a change sequence, a time boundary, or a database change table. The actual mechanism determines what has to remain valid.

An empty ISC account list followed by a changes-only read doesn't automatically establish every unchanged account that already exists externally.

For Microsoft Active Directory, a directory service managing accounts and groups, the documented setup establishes a reference point through a full aggregation before collecting subsequent changes. The database change-table approach below also begins with a full aggregation and its required capture configuration.

In a project, review the transition between initial collection and ongoing capture. A change that happens in a gap between them must not be assumed to appear in a later read merely because both jobs eventually show success.

## Follow the change information, not just the current table

**JDBC**, Java Database Connectivity, is a standard way for software to work with databases. **SaaS**, software as a service, identifies the cloud-based connector variant here.

Our WorkQueue example uses the documented JDBC SaaS change-table mechanism.

A **database table** stores records as rows with named columns. WorkQueue's account table is WORKQUEUE_ACCOUNTS.

The configured **account key** identifies each external account. Here, accountKey supplies values such as wq-54004. It isn't the same identifier as Devi's employee number.

A separate **change table**, WORKQUEUE_DELTA, records which accounts changed and the action associated with each change.

Its selected teaching rows are:

| accountKey | action |
|---|---|
| wq-54004 | Update |
| wq-54007 | Insert |
| wq-54006 | Delete |

These are illustrative column names and rows, not database creation commands or universal connector defaults.

Update identifies an account whose data changed. Insert identifies a newly added external record. Delete preserves the identifying reference to a record that has been removed.

The application changes happen first. These rows report them; they aren't requests for ISC to create or delete the external accounts again.

A **database trigger** runs configured database logic in response to a specified table event. In a supported approved design, triggers record the relevant inserts, updates and deletes in the change table.

The connector doesn't acquire a working capture mechanism merely because someone enables a delta checkbox. The table, capture logic, account identification, configured read and permissions must agree.

In this supplied successful example, each of the three changes is captured correctly.

## Turn a reported change into the right collected result

For an updated account, knowing the key isn't the same as knowing the new department.

A **query** asks the database for selected information. The supported query must obtain the required account data for that key.

A **schema** defines the represented attributes and their uses. A **mapping** determines which input supplies a represented value.

For Devi, the selected account result is written here in **JSON**, JavaScript Object Notation, which uses named properties inside curly braces:

```json
{
  "accountKey": "wq-54004",
  "employeeRef": "54004",
  "department": "FIN"
}
```

This is selected teaching data, not a complete ISC API response or runnable query. An **API**, application programming interface, lets software interact with a system.

The Update row identifies wq-54004. The supported read and mapping supply FIN. ISC's collected account representation now reflects FIN under the supplied completed result.

The change row, returned account data and final represented record aren't interchangeable formats. Establish what the supported response contains before interpreting an omitted attribute as an instruction to clear its value.

**Account correlation** matches and assigns a source account to its owning identity under configured comparisons. Devi's existing correct association is supplied, not inferred from equal-looking digits in an account name.

For wq-54007, the external account already exists when the read discovers it. ISC represents it; collection hasn't created another application account.

For wq-54006, the explicit Delete information identifies the already-deleted external record. In the supplied verified result, the connector's supported deletion handling removes its ISC account representation under the reviewed configuration.

That outcome isn't inferred from an empty response. It also isn't a universal instruction to delete an employee identity or every related account on other systems.

Disabling an account is different again. It changes an account's status; the external record can still exist. Don't equate a reported status update with a Delete action, or infer that one application-account deletion establishes a person's employment status.

The main information responsibilities look like this:

```text
[Database captures account changes]
                 |
[Connector reads change information]
                 |
[ISC handles reported account changes]

[Engineer checks resulting records]
```

The connected lines show logical dependencies in collection. They aren't private transaction stages or a guarantee that every connector uses the same internal order.

The separate final line is human verification, not an automatic success stage. The engineer checks the resulting records against the intended changes.

## Keep the unchanged account in the picture

Our supplied before-and-after account inventory is:

```text
ISC before: wq-54004, wq-54005, wq-54006
Observed:   Update wq-54004
            Insert wq-54007
            Delete wq-54006
ISC after:  wq-54004, wq-54005, wq-54007
```

The account sets describe ISC's representations before and after the supplied successful handling. The observed actions describe changes that already occurred in WorkQueue.

The unchanged wq-54005 remains represented. Its absence from this delta result doesn't establish deletion.

The final account count is still three: three before, plus one newly represented external account, minus one removed representation.

But the contents changed, and Devi's department value changed. Equal before-and-after totals don't establish that nothing happened.

The three change rows aren't three newly created accounts, three full account objects or the whole current population. Two refer to live account records; one is deletion information about a removed record.

This is why a small delta count can't be compared directly with a full-read account count without first identifying what each number describes.

## Change capture can fail while collection looks healthy

Consider a separate variation: WorkQueue's account row changes to FIN, but the configured trigger fails to record that update.

The account query can be correct, and the integration can reach the database. Yet a delta run that depends on the change table doesn't know to fetch wq-54004.

A completed run with no applicable change entries wouldn't prove that the application had no changes.

Trace the producer of the change information. Was the relevant table covered? Did the approved capture logic execute? Does the recorded key identify the same account used by the account query?

An **integration actor** is the account or application identity used to access the external system. Its authority must cover the supported delta operation, not merely an ordinary account read.

The JDBC change-table design documents read/write and cleanup permissions for its tracking mechanism. It also describes re-initializing the change tracking after a delta aggregation.

That is bookkeeping for collection, not permission to perform every business change in WorkQueue.

Don't assume every collection integration needs only read permission, or grant unrestricted database access to avoid investigating the documented requirement. Have the authorized database owner review the specific supported design.

Don't manually empty the change table to make an incident disappear. Removing unread change information can remove the evidence needed to catch up.

## One connector's delta isn't another's

An **entitlement** represents an access right. An **entitlement aggregation** collects information about access objects themselves, such as groups.

A **group** is an access object that can associate accounts with permissions. A **permission** is an allowed operation on a resource.

A **membership** associates an account with an access object. Detecting a membership change and collecting the group's definition are different coverage questions.

**DirSync** is Active Directory's directory-change synchronization feature.

These documented examples illustrate why you must check the actual connector and object type:

| Connector context | Documented delta mechanism or boundary | Practical implication |
|---|---|---|
| Active Directory | Default DirSync change tracking; initial full aggregation and additional delta permissions | An ordinary account read doesn't establish a valid starting reference or authority to read the required change/deletion information |
| JDBC SaaS | Account change table with identifying value and Insert/Update/Delete actions; group delta isn't supported by this mechanism | Account-delta support doesn't establish group-object delta coverage |
| Okta SaaS | User profile changes use the users API; entitlement changes and deleted users use the logs API; delta is for accounts | Profile visibility alone doesn't establish that access/deletion changes were captured |

Active Directory's documented delta permissions include Replicating Directory Changes and read access to the Deleted Objects container, where deleted directory objects are represented for the supported read.

Don't copy a permission recipe from a database connector to a directory, or infer full delta permission from a successful connection check.

In Active Directory, an **organizational unit**, or **OU**, is a directory container used to organize objects. ISC's account-loading guidance warns that OU moves aren't supported through delta handling and require full account aggregations to avoid unexpected results, including duplicate accounts.

An organizational move isn't automatically equivalent to an ordinary department attribute edit.

Okta's documented log retention excludes data older than 90 days. A gap extending beyond the retained change information can require full account aggregation; repeated delta runs don't recover logs that are no longer available.

The separate Okta interfaces matter because a user's profile and their access relationships aren't one set of change evidence. Check the required interface's authority, coverage and completed results rather than treating a successful profile read as proof of collected membership changes.

The supported change mechanism and limitations belong to the particular connector. They aren't one universal deletion model, token lifetime or account/group capability.

## Progress through a run isn't proof that every change was applied

**Pagination** divides a result into pages. A page-continuation reference helps obtain further results in a supported read.

A starting reference for changes across executions answers a different question: which changes should this run ask for?

Don't assume the two references are interchangeable or that they have the same lifetime. Some sources use tracking tables instead of tokens.

A **checkpoint** here means a recorded progress reference used by a supported mechanism. It isn't a universal ISC property name or a claim about when a private transaction commits.

If a read stops after processing part of the available information, inspect both the execution and the actual account results. Don't assume all earlier work rolled back, every change was applied, or a later run will replay exactly the same records once.

The connector's documented recovery and change-retention behavior matter. A job's start time doesn't establish the last safely completed collection boundary.

Don't invent a new timestamp, clear a tracking reference or replay a change table manually without understanding the supported recovery path and existing results.

If a supported recovery uses a full aggregation, review its scope and existing-record/deletion consequences first. A larger read isn't a reason to disable safeguards.

## Time and scope are part of the meaning

For a time-based mechanism, establish which time value drives detection. A record's last-modified time and a business event's effective date describe different things.

An employee change recorded today but effective next month isn't necessarily found by searching only for records whose effective date is today.

Use the connector's documented field, format, time zone and boundary behavior. Don't invent an inclusive or exclusive comparison from the phrase “since the last run.”

For a tracking-table design, the equivalent question is whether every relevant operation produces the identifying change information. A recent schedule time doesn't prove it did.

Scope changes deserve their own review. If a filter is widened to include accounts that haven't changed, don't assume the next changes-only result will establish all newly included accounts.

Likewise, changing a mapping in ISC doesn't, by itself, change an external record or create a native change event.

An **optimized aggregation** can read the full configured account population while skipping further processing of existing unchanged data. An **unoptimized aggregation** re-evaluates account correlation for unchanged records too. These describe processing choices, not proof that a changes-only mechanism delivered a particular account.

A **single-account aggregation** reads one specified account. A delta mechanism instead selects records through its supported change information; it isn't another name for a person manually choosing an account to refresh.

Plan the supported population refresh and any required re-evaluation rather than treating the next scheduled delta as a universal repair.

## A group change can expose a different gap

Suppose a database-backed application stores account rows in one table and group memberships in another.

A membership is added in the second table. The application account row isn't updated, and the supplied capture design watches only account-row changes.

Nothing supplied establishes that the affected account key enters the delta change table.

The account query might return correct membership values if asked for that account. The problem is that the change mechanism didn't identify it for collection.

Establish the connector's supported access representation, query and change-capture coverage for the affected accounts. Don't assume a trigger on one table observes changes to every related table.

Collecting a complete group inventory is a separate task. It doesn't, by itself, repair a missing account-membership update.

## Delta collection doesn't finish every downstream job

An **identity attribute** is a value on the identity rather than on one application account. Whether Devi's account department supplies her identity department depends on the configured mapping.

**Provisioning** performs supported external account or access changes. Reading FIN from WorkQueue is different from writing FIN to another system.

**Identity processing** evaluates identity information and relevant access configuration. When aggregation or provisioning modifies an identity, that event initiates identity processing.

The main supplied result updates the WorkQueue account representation, preserves its correct ownership and handles the stated new/deleted account representations. It doesn't establish that every identity value or downstream application has changed.

Collected data can feed configured decisions that lead to separate access-changing work. Observe those outcomes separately; don't label an entire connected workflow harmless merely because its first operation collects information.

## Choose evidence for the question you're asking

The source's aggregation configuration describes intended behavior. It doesn't prove that a particular execution actually used the expected starting information and scope.

**Aggregation History** and account-aggregation details describe executions, including status, timing, counts and relevant warnings or errors.

The source's **Accounts** view and account details show represented records and associations. Inspect WorkQueue Production and wq-54004 rather than relying on a person-name search alone.

Use the relevant comparison:

| Question | Evidence that helps | What it doesn't establish alone |
|---|---|---|
| Was FIN available for collection? | Identified current account row and the actual query result | That change capture selected the account |
| Did the delta identify it? | Applicable change entry or supported change-response evidence, with scope and progress context | That all resulting values were represented correctly |
| Did ISC update the account? | Identified account, department and applicable completed execution | That every identity attribute uses this value |
| Was an account deleted? | Supported deletion information, target context and resulting ISC record state | That an omitted unchanged account was deleted |
| Did an external change complete? | Separate change-operation outcome and resulting target state | That aggregation success proves provisioning |

ISC Search can have indexing delays separate from collection. If one view looks old, compare the actual identified account, execution evidence and view freshness before repeating work.

## Test what a delta result lets you conclude

### 1. One account is omitted

wq-54005 is in the completed baseline and hasn't changed. It doesn't appear in the supplied delta rows.

Should it be removed from ISC because it wasn't returned?

**Worked reasoning:** No. This is a changes-only result, not a complete current population. Preserve the distinction between omission and explicit supported deletion information.

### 2. The run reports no changes

The application row changed, but the supplied trigger failed to record it. The next change-table read has no corresponding entry.

Does a successful empty read establish current account data?

**Worked reasoning:** No. Inspect capture coverage and the actual row/query, then choose supported recovery and verify the resulting account. Repeating a read of the same incomplete change information doesn't manufacture the missing entry.

### 3. Three change rows arrive

The baseline contains three accounts. The supplied rows contain one Update, one Insert and one Delete, as above.

How many account representations remain after the verified successful handling?

**Worked reasoning:** Three: retain wq-54004 and unchanged wq-54005, represent externally created wq-54007, and remove the representation of already-deleted wq-54006. Equal totals don't mean unchanged contents or attributes.

### 4. A read stops after its first page

Only part of a supported change response has been processed. No completed recovery or final record comparison is supplied.

Can the team safely advance a progress timestamp to the current time?

**Worked reasoning:** Not from those facts. Preserve execution/change evidence, inspect actual results and follow the connector's documented recovery path. Don't infer rollback, complete application or exactly-once replay from an interrupted read.

### 5. The account filter is widened

A source now includes another region, but the newly included accounts have no reported changes in the selected interval.

Does the new scope prove the next delta establishes the expanded population?

**Worked reasoning:** No. Establish the supported full-population or reinitialization approach for that configuration change, with safe existing-record review. A filter change isn't evidence that all newly included accounts were returned.

### 6. Only the membership table changes

The capture design records account-table modifications. A new membership changes a separate table but doesn't record the affected account key.

What should you investigate first?

**Worked reasoning:** The supported query and change-capture coverage for that relationship. A correct query is insufficient if the account is never selected. Don't substitute group-object inventory for account-membership evidence.

### 7. The required logs are outside retention

A separate Okta SaaS investigation needs change information older than the documented 90-day log-retention window.

Will another delta run recover that missing history?

**Worked reasoning:** No. Follow the supported full account-aggregation recovery for current state, with the proper scope and review. Rebuilding a current representation doesn't reconstruct a complete historical event trail from expired logs.

### 8. Only ISC's comparison changes

An account's external data hasn't changed. ISC's ownership comparison is corrected, and the next delta doesn't return that account.

Does disabling unchanged-record optimization prove the account will be re-evaluated?

**Worked reasoning:** No. First establish a supported read that includes the required record. Then establish the appropriate unchanged-record re-evaluation. Read coverage and processing choice are separate responsibilities.

## Review a different application's proposal

A project stores employees in STAFF and their group memberships in STAFF_GROUPS. Its delta capture watches only STAFF inserts and updates, not deletes or STAFF_GROUPS changes.

The proposal says, “The connection test passes, so delta covers all access changes. We'll clear the tracking table after any failed run and treat every missing employee as deleted.”

What would you challenge?

**Worked reasoning:** A connection test doesn't establish complete capture, deletion information, membership coverage or correct account representation.

Identify the supported account key, account query, access mappings, baseline and capture responsibilities. Verify how account deletions and membership changes select the affected account under the approved supported design. Check required tracking-table permissions without granting unrestricted business-data writes.

Reject deletion by absence from a changes-only result. Don't clear unread change evidence after failure. Establish documented recovery, inspect actual results and review the scope and safeguards of any required full read.

If current state can be recovered, verify it. Don't claim that recovery recreates every lost historical event or proves completion of separate target changes.

Explain the plan to the application owner: “Delta can save repeated reading only when its change information is complete for the job. We need a valid starting point, supported coverage of the changes we care about, and evidence that the resulting records are correct.”
