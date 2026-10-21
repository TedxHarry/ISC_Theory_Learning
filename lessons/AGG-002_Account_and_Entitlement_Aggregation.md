# The group is in ISC. Does Devi have it?

Devi, employee number `52002`, reviews invoices. Her existing InvoiceDesk account is `inv-52002`.

The application says her account belongs to two groups: G-520 and G-521. SailPoint Identity Security Cloud (ISC) has collected those values, but their descriptions aren't useful yet. The application team also identifies a third group, G-599, which no account currently holds.

Someone proposes reading all the group definitions into ISC and then reporting that Devi has all three groups.

Let's separate the two questions hidden in that proposal. Which groups exist, and which groups does her account hold?

Those questions need connected information, but they don't have the same answer.

InvoiceDesk, its data and the results below are fictional. The example assumes supported account and group reads, correct configuration and a verified existing association between Devi's account and her ISC identity. No real source or access is changed.

## First separate the account from the access object

An **account** is a record in an external system. An **identity** is ISC's representation of a person or another entity, connecting information, accounts and access.

A **source** is ISC's configured representation of a system or collection of account data. Our source is InvoiceDesk Production. A **connector** provides its supported integration behavior.

A **group** is an application object that can associate accounts with access. A **membership** is the relationship between an account and that group.

An **entitlement** represents an access right in ISC. In our example, the InvoiceDesk groups are represented as entitlements.

G-520 identifies Invoice Reviewers. G-521 identifies Archive Readers. G-599 identifies Exception Reviewers.

The group identifier and its readable name do different jobs. The identifier tells us which object a membership refers to. The name helps someone understand it.

Devi's account holds the first two identifiers. Knowing the third group's name doesn't add a relationship between her account and that group.

An **attribute** is a named piece of information, such as groups on the account or description on a group. A **schema** defines the represented attributes and their uses. An **entitlement type** identifies a supported access-object category, such as groups.

**Aggregation** collects information into ISC. The two collection responsibilities are:

**Account aggregation** collects accounts and their attributes, including supported access values associated with those accounts.

**Entitlement aggregation** collects information about access objects under the source's supported entitlement types and schemas. That can include objects no collected account holds.

Keep those meanings connected to the records. An account's groups attribute describes its memberships. A group's description describes the group.

## What the account read tells us

Here are selected attributes from Devi's account as represented by the fictional account read:

```json
{
  "accountKey": "inv-52002",
  "employeeRef": "52002",
  "groups": ["G-520", "G-521"]
}
```

This is illustrative account data, not a complete ISC Accounts API response. An **API**, application programming interface, lets software interact with a system. **JSON**, JavaScript Object Notation, uses named properties inside curly braces. The square brackets contain an array, a collection of values.

accountKey identifies the external account. employeeRef supplies the person reference used by the configured ownership comparison. groups contains the access identifiers associated with this account.

**Account correlation** matches and assigns a source account to an owning identity under configured comparisons. For this example, the correct association to Devi is supplied and verified. The digits in an account name don't establish it by themselves.

The account schema marks groups as an entitlement attribute and connects it to the supported groups type. It is **multi-valued**, meaning it can hold a collection rather than just one value.

This configuration tells ISC how to interpret the values. A list of backup phone numbers wouldn't become access merely because it also used square brackets.

Under the supplied successful collection, ISC represents G-520 and G-521 on inv-52002. Entitlement records can arise from these account values even before a separate read supplies richer group details. In our example, this account collection has established those two entitlement representations with limited descriptive information.

So it is wrong to say, “Account aggregation never creates entitlements.” It can create their ISC representations from collected access values.

It hasn't created those groups in InvoiceDesk. They already existed.

**Provisioning** performs supported changes to external accounts or access. Discovering existing membership isn't an instruction to add it again.

## What the group read adds

The supported group read supplies these selected objects:

```json
[
  {
    "groupKey": "G-520",
    "label": "Invoice Reviewers",
    "description": "Review invoices awaiting approval."
  },
  {
    "groupKey": "G-521",
    "label": "Archive Readers",
    "description": "Read archived invoice records."
  },
  {
    "groupKey": "G-599",
    "label": "Exception Reviewers",
    "description": "Review invoices marked as exceptions."
  }
]
```

This array illustrates selected group data, not a complete API response or connector configuration.

The group schema designates groupKey as the **Entitlement ID**, the attribute supplying the object's identifying value. It designates label as the **Entitlement Name**, the attribute supplying its naming value.

The description explains the access item's purpose. These are object details rather than a list of assignments to Devi.

The configured read returns all three groups, including G-599. That third object doesn't disappear from the application just because it has no members. The example assumes no manually maintained description blocks the intended descriptive update.

The **entitlement catalog** is ISC's recorded inventory of access items. In our supplied result, the catalog contains these three objects, with their collected descriptions.

Two existing representations gain details, and G-599 becomes known through the object read. Don't translate “three definitions returned” into “three newly granted memberships” or even “three newly created ISC entitlement records.”

A returned-object count, a newly created-record count and an assignment count are different measurements.

## How the two kinds of information meet

The account has G-520. The group object's designated ID is G-520.

The supported relationship must agree on the source, entitlement type and identifying value. In this example, the account attribute is named groups, is marked as an entitlement, and points to the groups type. Its element G-520 agrees with groupKey G-520.

That lets the collected membership connect with the detailed Invoice Reviewers object.

Here's the relationship:

```text
[InvoiceDesk accounts]  [InvoiceDesk groups]
          |                     |
[Account aggregation]  [Entitlement aggregation]
          |                     |
[Held group IDs]        [Group definitions]
          |                     |
          +----------+----------+
                     |
        [Linked access information]
```

Each branch shows what its supported collection supplies. The meeting point shows how the information connects. It isn't an external grant or a rule that the two jobs run simultaneously, and it doesn't describe ISC's private storage implementation.

The account branch establishes the held values. The object branch supplies the objects' details. Neither branch replaces the other.

This example describes direct group memberships. Supported object data can also describe relationships between groups or other access objects. An indirect access path isn't the same as a direct membership on Devi's account.

A **permission** is an allowed operation on a resource. **Effective access** concerns what an account can actually do after applicable grants and restrictions. Don't claim a complete effective-access calculation from these two direct membership values alone; first establish the relationships the integration actually represents.

The same G-520 text from InvoiceDesk Test isn't established as this Production group. Likewise, a group and an application-defined role with the same short code aren't automatically one object.

An **application role** is a role defined in the external application. It differs from an ISC **role**, which groups access for business assignment. If a source supports both groups and application roles, each needs its supported type, schema and collection coverage.

A readable label isn't an alternative identifying value just because it looks better on screen.

A **mapping** determines which input supplies a represented attribute. If someone changes the account mapping to return Invoice Reviewers while groupKey remains G-520, compare that mismatch before rerunning either job.

Don't rename a working ID designation to disguise the mismatch. Changing Entitlement ID or Entitlement Name designations after collection can produce duplicate entitlements and affect dependent references. Treat that as a reviewed design change.

## Count relationships before comparing totals

Suppose these are all three accounts in the selected population:

| Account | Collected groups | Number of held values |
|---|---|---|
| inv-52002, Devi's account | G-520, G-521 | 2 |
| inv-52003 | G-520 | 1 |
| inv-52004 | G-521 | 1 |

There are three account records and four membership occurrences. Only two distinct group identifiers appear on accounts.

The group read returns three group definitions. G-599 has no membership in the supplied complete account population.

So the relevant totals are three accounts, four account-to-group relationships, two distinct held groups and three known group objects.

They aren't supposed to be equal.

One group can have many members. One account can hold many groups. A group can have none.

The completed entitlement-aggregation summary also needn't equal the entire Entitlements list. That list can include records from previous account and entitlement aggregations, while a particular run reports its own discovered population.

Before using a number as evidence, identify what it counts and which execution, source, type and population it describes.

“No supplied account holds G-599” is valid for our stated complete population. In a real investigation, a filtered or incomplete account read wouldn't justify saying that no account anywhere holds it.

## Which read should run, and when?

A **direct-connect source** reads through a configured connection. Supported entitlement collection can be started manually or scheduled. A schedule is a request for recurring work, not proof that the intended records were collected.

Account and entitlement aggregation have separate controls. On supported sources, an entitlement run can include all configured types or selected types.

If only groups is selected, success doesn't establish that application roles were read too.

The **integration actor** is the account or application identity used to reach the external system. Its authority can differ by operation. Reading accounts doesn't prove permission to list groups or obtain their descriptions.

**Scope** identifies the records and information the read is intended to include. A **filter** selects or excludes records under supported conditions. Check both account scope and object scope, rather than assuming one setting describes the whole integration.

**Extraction** selects records or values from delivered data. A valid group schema can't supply a description that the actor didn't receive or the mapping didn't select.

**Pagination** splits results into pages. A successful first response doesn't establish that the rest were collected. The selected data, extraction, field mappings and supported continuation all matter.

An **endpoint** is a particular external interface address used by an operation. Don't infer the operation from an endpoint's name alone. A supported connector can use multiple external calls during account collection to assemble account information. Calling an interface associated with groups doesn't by itself prove that ISC's separate entitlement-aggregation responsibility has completed.

Also avoid a universal “entitlements must always run first” rule. Account collection can establish access values before richer objects are read. Object collection can establish groups before any membership is collected.

Plan the dependency around the outcome you need. To review Devi's access meaningfully, you need the right account relationship and usable object details. To inventory unassigned groups, you need object coverage that isn't limited to values found on accounts.

For our successful trace, account collection happens first and supported group collection follows. The supplied verification confirms their final link. That is this example's sequence, not every connector's required order or an instant-refresh guarantee.

## The two reads aren't one frozen snapshot

Consider a separate timing variation. All times below use Coordinated Universal Time (UTC), the shared time reference:

```text
09:00  Account read: G-520, G-521
09:20  Target removes G-520 from Devi
09:30  Group read: G-520 still exists
```

The lines are observations and an external change in time order. They aren't stages within one aggregation. The target application, not the later read, performs the supplied removal.

At 09:30, the group definition can be correct while the collected account still reflects 09:00 membership. Removing one person's membership doesn't require deleting the group.

The later entitlement read isn't evidence that the account membership was refreshed. Check the operation that represents current account access and then verify its result.

**Freshness** concerns when the relevant fact was observed. One recent timestamp doesn't make every related field current.

The same issue occurs with two files produced at different times. A new group file doesn't make an older account export current.

This is why you should record each input's context and observation time before treating the combined picture as current access.

## File imports still need both kinds of information

A **flat-file source** imports supplied files rather than making a live direct connection.

An account file describes accounts and their access values. An entitlement file describes access objects. Uploading names and descriptions in the second file doesn't assign every row to every account.

**CSV**, comma-separated values, stores records as rows and fields as columns. File structure and the configured schema still determine how those fields are interpreted.

Use the source's own downloaded entitlement template and required identifying column. Its ID values must agree with the account's entitlement values. Don't assume arbitrary CSV headings work across source types.

The documented flat-file entitlement mechanism is manual. It doesn't support recurring entitlement schedules or multiple entitlement types through that mechanism.

If a project needs groups and application roles with independent collection, establish a supported design rather than promising that adding two files gives a flat-file source every direct-connect capability.

An account-only connector is another boundary. Creating a type/schema doesn't manufacture an unsupported object-read operation.

## Connect each screen to the evidence behind it

The source's **Accounts** view and account details concern collected account records. Inspect the actual source and inv-52002, not just an employee's name in a search result.

The source's **Entitlements** view and the wider Entitlements page concern recorded access items. A group appearing there establishes inventory information, not Devi's membership.

**Entitlement Types and Schemas** shows configuration. It doesn't prove that G-599 was delivered by a completed read.

**Aggregation History** and the latest aggregation information describe executions. Check the operation, selected types, status, counts and relevant warnings or errors. A start request isn't completion, and completion needs to be interpreted within the run's scope.

When investigating, keep the questions separate:

| Question | Compare these records | What the observation doesn't prove |
|---|---|---|
| Does ISC know G-599? | Identified entitlement record and applicable group read | That Devi holds it |
| Which values does Devi's account hold? | Source, inv-52002 and its collected groups | That all object descriptions are current |
| Whose account is it? | Actual account-to-identity association and correlation evidence | That group inventory established ownership |
| Why is a description old? | Delivered object, mapping, collection and manual-update state | That account collection failed |
| Was access changed in InvoiceDesk? | Applicable change operation and resulting target membership | That a catalog update granted or removed access |

ISC Search can have indexing delays separate from collection. If a search result looks old, compare the identified records, their collection evidence and view freshness before repeating work.

## An old description doesn't always mean an unread group

**Metadata** is descriptive or governance information about an access item.

An administrator can edit an entitlement's Display Name or Description in ISC. Those edits aren't sent to the external source. Manually maintained values can be preserved against later aggregations.

Suppose the group read returns an updated description, but ISC still shows a manually maintained explanation. Check that manual-update state before calling the read a failure.

The correction could concern ownership of descriptive information rather than missing data. Don't clear a protected manual value or change a schema merely to force the screen to match.

An **access request** asks for access to be assigned through a configured process. A **certification** is a responsible person's review of recorded access.

Clear object details help those decisions. Collecting them doesn't itself approve a request, make an item available for everyone to request or prove that its members should retain access.

## Don't confuse a missing relationship with a deleted object

If account collection no longer reports G-520 for Devi, that doesn't prove G-520 has been deleted. Other accounts can still hold it, or it can exist without members.

Account aggregations don't delete entitlement records merely because accounts no longer hold their values.

Conversely, if a group read doesn't return G-520, first establish whether the object is actually absent from the target or outside that read's scope. Permissions, filters, pages and stale input can produce different evidence.

Don't turn a partial read into a cleanup plan. Review the supported operation and existing-record consequences before rerunning wider reads or changing scope.

Removing access requires its own authorized change mechanism and target evidence. Collected information can feed configured decisions that lead to separate provisioning, but observation and external change remain different operations.

## Test the distinction against these situations

### 1. Three accounts, four memberships

The complete supplied account population contains the three rows above. The group read returns G-520, G-521 and G-599.

How many distinct held groups are there, and how many group definitions?

**Worked reasoning:** Two held identifiers and three definitions. Count repeated G-520 and G-521 memberships as separate relationships, not separate group objects. G-599 exists without a supplied member.

### 2. A new group appears in the inventory

The object read discovers G-599. Devi's collected account remains groups = ["G-520", "G-521"].

What changed about her represented memberships?

**Worked reasoning:** Nothing in the supplied result. The inventory gained an object. No new membership or provisioning operation was supplied.

### 3. The membership is collected before its description

Account collection represents G-520, but separate group collection hasn't been confirmed. The entitlement's description is missing.

Which investigation fits the evidence?

**Worked reasoning:** Establish supported object collection, its delivered fields, scope and mappings. The missing description doesn't negate the collected membership, and repeated account reads aren't a substitute for identifying where descriptive data should come from.

### 4. The group label matches

The account mapping supplies Invoice Reviewers instead of G-520. The group schema still identifies the object by groupKey G-520.

Does another group aggregation fix that disagreement?

**Worked reasoning:** Rereading the same definition doesn't correct the account-side identifying value. Compare the mapping and supported schema relationship. Preserve the intended ID rather than changing designations without reviewing existing references.

### 5. Accounts succeed; groups are denied

The configured actor can list accounts. Its group-list request is denied by the application, and no successful group read is supplied.

Should the team change Devi's memberships to repair the inventory?

**Worked reasoning:** No. The supplied failure concerns read authority for group information. Establish the required operation and least necessary permission through the authorized owner. Don't invent missing memberships or treat account-read success as group-read permission.

### 6. The group read is later than the removal

At 09:20, InvoiceDesk removes Devi from G-520. The latest account observation is 09:00; group collection at 09:30 still returns G-520.

What does the later result establish?

**Worked reasoning:** The group still exists at the supplied observation. It doesn't refresh the older account membership or undo the removal. Obtain and verify the applicable current account-access evidence.

### 7. A description survives a fresh read

A supported group read returns a new description. The identified ISC entitlement retains its manually updated description.

Is another account aggregation the first correction?

**Worked reasoning:** Inspect manual-update protection and descriptive-data responsibility. The supplied observation can be consistent with preservation of a manual value. Account collection doesn't resolve that policy choice.

### 8. One access type finishes

A source supports groups and application roles. A successful entitlement run selected only groups.

Can the project sign off its application-role inventory too?

**Worked reasoning:** No. Verify the other type's supported schema, read configuration, actor visibility and completed coverage. A successful scoped operation doesn't establish work it didn't include.

## Apply the reasoning to a project file

A project supplies an account export with teams = ["T-22"] and an independently produced team file containing T-22 and T-90. T-22 is Regional Reviewers; T-90 is Emergency Reviewers.

The proposal says, “Import both teams, assign both to the employee, and schedule this flat-file entitlement import every hour.” No account association or current target-state evidence is supplied.

What would you correct before accepting that design?

**Worked reasoning:** Preserve T-22 as the supplied membership identifier and connect it to the matching team object under the supported source/schema relationship. T-90's presence in the object file doesn't assign it to this account.

Establish whose account the row represents, which population and time each export covers, and whether the identifying values and source-specific template agree. Verify the actual collected records rather than treating a file's existence as a successful import.

The documented flat-file entitlement mechanism doesn't provide the proposed recurring schedule. Select a supported ingestion design instead of describing an unimplemented scheduler as a native feature.

If the project truly requires a new membership, identify the separately authorized change mechanism and verify its target result. Don't change access to compensate for incomplete inventory evidence.

Explain it to the project owner: “The account record tells us which team identifiers it holds. The team records tell us what those identifiers mean, including teams nobody holds. We need both sets of evidence, but importing the second set doesn't assign its contents to the first.”
