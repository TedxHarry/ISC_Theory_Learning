# The catalog has four items. Who actually holds them?

Devi, employee number `100303`, works with equipment records in AssetLedger. She has an ordinary account, `al-100303`, and a separate administrative account, `ala-100303`.

In SailPoint Identity Security Cloud (ISC), the source's entitlement catalog contains four groups. A report prepared from its account records also contains four group-membership relationships.

Someone concludes, “The totals match. All four catalog items must be assigned.”

Do matching totals establish that?

Let's inspect what each total counts before deciding who holds what.

AssetLedger, its records, collection results and later changes are fictional. The example uses a bounded pilot source with exactly three accounts and four groups, supported reads, correctly linked records and verified ownership. All access shown is ordinary standing membership, meaning it remains in place until removed. No temporary activation or inherited membership is included.

## A list of access items isn't a list of holders

An **account** is a record in an external system. A **group** collects members, such as accounts, and the application can use that membership when granting permissions.

An **entitlement** represents an access right in ISC. In this example, the application's groups are represented as entitlements.

A **catalog** is an inventory of represented access items. It answers which items ISC knows about in the selected context. A **membership** is a relationship between an account and a group. It answers which account belongs to which group.

Those are different kinds of information. A group can have many members, one member or no members without becoming a different kind of catalog item.

A **source** is ISC's configured representation of a system or collection of account data. Our source is AssetLedger Pilot Production, covering only the supplied pilot population, not every system or employee in the company.

The catalog contains these four native group identifiers and labels:

- G-7301: Asset Readers.
- G-7302: Asset Approvers.
- G-7303: Exception Reviewers.
- G-7304: Export Operators.

A **native identifier** is the identifying value used by the external integration. The labels help someone recognize the groups; they don't establish membership.

For the supplied application policy, Asset Readers permits reading equipment records. Asset Approvers permits approving equipment requests. The membership must be on the account being used. These meanings come from the fictional application owner's confirmed rules, not from the group names alone.

## Follow the account-to-group relationships

An **identity** is ISC's representation of a person or another entity. **Account correlation** associates a collected account with the appropriate identity.

Both al-100303 and ala-100303 are correctly associated with Devi. A third account, al-20402, is correctly associated with a different employee's identity. The usernames don't prove those relationships; verified ownership and association are supplied facts.

Here are the complete account membership records for the pilot baseline:

| Account and verified identity association | Represented group values |
|---|---|
| al-100303, Devi's ordinary account | G-7301 |
| ala-100303, Devi's administrative account | G-7301, G-7302 |
| al-20402, the other employee's account | G-7302 |

Now count the relationships, one account-group pair at a time.

al-100303 contributes one. ala-100303 contributes two. al-20402 contributes one. That gives us four memberships.

How many different groups appear among those memberships?

Only two: G-7301 and G-7302. Repeating G-7301 on another account adds another membership, not a new group definition.

G-7303 and G-7304 are present in the catalog but have no members anywhere within the supplied complete pilot population.

```text
Catalog: four group objects
  G-7301  Asset Readers
  G-7302  Asset Approvers
  G-7303  Exception Reviewers
  G-7304  Export Operators

Represented account memberships
  al-100303  --> G-7301
  ala-100303 --> G-7301
  ala-100303 --> G-7302
  al-20402   --> G-7302

Four arrows; two groups with holders.
G-7303 and G-7304 have no arrows here.
```

Each arrow means “this account has this represented membership.” It doesn't mean create the group, grant access or run a backend job.

Devi's administrative account has two memberships. Her ordinary account has one. Seeing G-7302 associated with Devi through the administrative account doesn't establish that al-100303 can approve equipment requests.

Keep the account attached to the access. A person-level view is useful, but it must not erase the difference between that person's accounts.

## Five totals can all be correct

For the supplied baseline, compare these measurements:

| Measurement | Result and reasoning |
|---|---|
| Catalog group objects | 4: G-7301 through G-7304 |
| Different groups held by at least one pilot account | 2: G-7301 and G-7302 |
| Account-group memberships | 4: the four pairs in the diagram |
| Accounts holding G-7301 | 2: Devi's ordinary and administrative accounts |
| Distinct identities with an account holding G-7301 | 1: both accounts belong to Devi |

These are calculations from the supplied records, not a claim that every ISC screen displays these exact counters or computes its totals this way.

An identity-oriented count and an account-oriented count can differ without either being wrong. Two accounts held by one person explain the difference here.

Likewise, four catalog objects and four membership pairs describe different things despite the numerical coincidence. Equal totals don't establish matching contents.

An aggregation summary also answers a different question from the catalog total. The summary describes items discovered in that run; the catalog can include items represented through other entitlement or account aggregations. A run's total is not automatically the current inventory size or the number of holders.

When two reports disagree, first ask what each counts. Then check their source, population, entitlement type, filters and observation times. Don't change access merely to make their totals equal.

## How ISC learns each side

A **connector** provides the supported integration behavior for a source. **Aggregation** collects external information into ISC.

In this integration, **account aggregation** reads account attributes, including the group references recorded for each account. An **attribute** is a named piece of information on a record.

**Entitlement aggregation** reads the group objects and their supported details, such as identifiers, names and descriptions. It can collect access items that no account currently holds.

The processes have related purposes, but a group-definition read is not automatically a current membership read.

A **schema** describes the represented attributes and their designated uses. The pilot account schema has an attribute named groups. It is marked as entitlement information, is multi-valued so it can hold a collection, and its Type points to the supported groups entitlement type.

An **entitlement type** identifies a supported kind of access object. Here, its native name is groups. The group schema selects groupKey as its Entitlement ID attribute and label as its Entitlement Name attribute.

For G-7301, the collected account value must match the group's selected identifying value G-7301 in the appropriate source/type relationship. The comparison is not with the label Asset Readers.

The source and schema relationship let ISC connect a membership reference with descriptive information about the right access object.

Account collection can itself create simple entitlement representations from the access values it encounters. Separate entitlement collection can add richer details and discover unused access objects.

So neither of these statements is sound:

“Only entitlement aggregation can create an entitlement record in ISC.”

“Everything in the catalog must have been found on someone's account.”

The documented collection model allows both account-derived representations and separately collected access objects. Creating an ISC representation is not creating the group in AssetLedger.

Different connectors can obtain membership information through different supported read paths. The pilot explicitly uses account groups values; don't assume every source reads relationships through the same request or field name.

## A fresh catalog can coexist with old membership data

Suppose the baseline accounts and groups are verified during a period with no changes, from 09:00 to 09:05 on October 24, 2026. All times below are UTC, a shared time reference.

At 10:00, an approved application-side change removes G-7302 from Devi's administrative account. Fresh application evidence confirms that removal. Her ordinary account remains a member of G-7301, and al-20402 still holds G-7302.

At 10:02, entitlement aggregation reads all four group definitions. In this integration, that read does not collect the account groups lists. The groups themselves still exist, so the catalog still has four items.

The latest collected account information in ISC is still the baseline. It still records G-7302 on ala-100303.

Would another read of those same group definitions prove that Devi's account memberships are current?

No. It would answer the wrong freshness question.

At 10:10, a supported account collection and inspection confirms the updated groups values. Both of Devi's accounts now contain G-7301 only; al-20402 still contains G-7302.

```text
09:00-09:05 verified baseline
  Catalog: 4 groups
  Memberships: 4 account-group pairs

10:00 native membership removed
  ala-100303 loses G-7302
  Other account keeps G-7302

10:02 group definitions collected
  Catalog: still 4 groups
  Account view: baseline evidence

10:10 account values collected/checked
  ala-100303 groups: [G-7301]
  Memberships: now 3 pairs
  Catalog: still 4 groups
```

This is an observed fictional sequence, not a required execution order or a latency guarantee. The recorded after-state is supplied evidence, not an instruction to wait ten minutes.

The removal changed one relationship. It did not delete G-7302, remove it from the other employee's account or reduce the catalog by one.

**Provisioning** performs supported account or access changes. The 10:00 removal occurred directly in the application under the supplied approval; later collection observes its result. It must not be described as a removal performed by the 10:02 entitlement read.

## Does an unused item belong in the catalog?

Yes, if the supported collection represents an existing access object within the intended scope.

Exception Reviewers can exist with no members. That makes it unused in the supplied membership population, not necessarily stale, invalid or safe to delete.

The application owner may be retaining it for a valid purpose. Or it may need a separate retirement review. The membership count alone doesn't establish the business decision.

Account aggregation does not delete entitlement catalog records merely because no account currently holds them. Lack of observed holders is not proof that an access object no longer exists.

Also distinguish the entitlement inventory from access offered for requests. An **access request** asks for an access item for a recipient. A **requestable** item has been made available through the applicable request configuration.

An existing catalog item is not automatically requestable. An unused group can be requestable, and an already-held group can be unavailable for direct requests. Discovery, existing membership and request availability answer separate questions.

## What if a membership has no detailed group record?

Take a separate variation. An account collection returns membership value G-7399, but the selected entitlement-definition read does not return a matching detailed group object.

Don't immediately conclude that the account has no access, or that ISC is unable to represent the membership.

Account collection can produce a simple entitlement representation without all the descriptive detail expected from a separate group read. Missing detail and missing membership are different problems.

Check the source and type, the exact membership value and the selected group identifier. Then inspect the definition-read scope and permissions.

Perhaps the read was limited to another type. Perhaps the integration actor couldn't read that group. Or the value no longer identifies a valid object. Those are possible explanations to test, not diagnoses established by the missing description.

A friendly name isn't the repair. Establish whether the source relationship is valid and why the expected object detail was not collected.

## An empty list and an unanswered question are different

A current, complete and correctly interpreted account groups list that contains no G-7302 supports absence of that represented direct membership on that account.

A missing field, incomplete response or old export does not automatically support the same conclusion.

**Scope** is the set of records and relationships an operation or report covers. A read can exclude accounts or entitlement types intentionally. A filter can hide a result in a view without removing the underlying membership.

**Pagination** means retrieving a collection in successive pages. If the read stops before the remaining pages arrive, the returned records are not evidence about every account.

Before saying “nobody holds G-7303,” establish that all relevant accounts and membership data were covered with adequate freshness. Our pilot baseline supplies that completeness. A normal production investigation must prove its own coverage.

Even a verified empty direct-membership list doesn't, by itself, establish that an account cannot perform an action. The application could allow it through another supported grant or inherited relationship. **Effective access** is what the account can actually do under the application's permission rules.

This example excludes those extra paths to make the direct relationships clear. A real investigation must check which paths the application actually uses.

## Investigate the relationship that is disputed

If the question is “Does Devi's ordinary account hold Asset Approvers now?”, identify that account, the source and the G-7302 relationship. Compare current application evidence with the collected account values and their observation times.

If the question is “What does Asset Approvers allow?”, inspect the group's permission meaning and application-owner evidence. A fresh membership list doesn't answer that policy question.

If the question is “Why isn't this group described properly?”, inspect object collection and descriptive mappings. Regranting membership doesn't repair a missing description.

If a person-level view doesn't show a known account membership, check account correlation and the view's scope. An account can hold native access even if its association with a person is missing or wrong in ISC.

Choose a correction only after locating the mismatch. Confirm a required native change through its approved path; confirm a collection issue through its relevant read and mapping; confirm a view issue through the actual records it displays.

Don't remove an unused group, add a missing-looking membership or repeat a broad collection just to manufacture agreement between unrelated totals.

## Work through the records

Each case changes only its supplied facts. The word absent always needs a record, relationship and scope attached to it.

### Case 1: Four equals four

**Facts:** The catalog contains G-7301 through G-7304. The three baseline accounts have the four membership pairs shown earlier.

Does this prove that every catalog item has a holder?

**Reasoning:** No. G-7301 and G-7302 account for all four pairs. G-7303 and G-7304 are unheld in this complete pilot population. Compare the actual identifiers and relationships, not just the totals.

### Case 2: Two accounts, one identity

**Facts:** al-100303 and ala-100303 both hold G-7301 and are correctly associated with Devi. No other pilot account holds G-7301.

Are two different people necessarily holding that group?

**Reasoning:** No. There are two account memberships and one distinct identity in the supplied data. Preserve both account references rather than treating one as a duplicate merely to make the account count match the identity count.

### Case 3: The person has it on the other account

**Facts:** Baseline ala-100303 holds G-7302. al-100303 does not. The supplied application policy requires G-7302 on the account used to approve a request.

Does the person-level association justify expecting approval through al-100303?

**Reasoning:** No. The required membership is on the administrative account, not the ordinary account being used. Establish the legitimate account-specific requirement before proposing an additional grant. “Devi has it somewhere” is not evidence of delivery to every account she owns.

### Case 4: The group read just finished

**Facts:** The approved native removal at 10:00 is confirmed. Group-definition collection at 10:02 completes successfully. The latest collected account list still comes from the baseline.

Does the fresh group-read status prove that the removal failed?

**Reasoning:** No. That read's supplied scope covers definitions, not refreshed account membership. Inspect the relevant account evidence. Its age explains why it can still show the removed relationship.

### Case 5: No members, but an existing group

**Facts:** All relevant accounts and their memberships are freshly covered. G-7303 has no holders. The application owner confirms the group still exists and is retained for an approved future use.

Should its catalog presence be classified as an error?

**Reasoning:** Not from these facts. The inventory represents a valid existing object. Zero holders doesn't mean missing data or a required deletion. Membership review and group-retirement decisions are different tasks.

### Case 6: A value arrived without the expected details

**Facts:** Account collection supplies G-7399. A separate group read returns no matching detailed object, but its permissions and type coverage haven't been verified.

Does a blank description prove that the account isn't a member?

**Reasoning:** No. The membership value and missing descriptive detail are separate evidence. Verify the intended object, linkage and definition-read coverage before deciding whether the value is valid, stale or misidentified. Do not substitute a label or grant the access again to hide the uncertainty.

### Case 7: The report covers only the first page

**Facts:** The first page of an account report contains no G-7304 memberships. The response indicates more pages, and no further pages were inspected.

Can we conclude nobody holds G-7304?

**Reasoning:** No. The population is incomplete. Complete the authorized read or obtain another suitably complete evidence set. A negative result within one page is not a source-wide negative result.

### Case 8: The membership is present, but the person link is missing

**Facts:** Fresh native and collected records both show G-7302 on one account. That account is uncorrelated in ISC, so no owning identity association has been established.

Would editing the entitlement's name repair the person-level evidence?

**Reasoning:** No. Investigate account ownership and correlation. The access relationship already exists on the account; the missing relationship is between the account and an identity. Do not guess an owner or assume a name edit changes either relationship.

## Try a license inventory

A supported application source has three license definitions: Basic, Editor and Analytics. Two accounts both hold Basic; neither holds Editor or Analytics. Both accounts are correctly associated with the same employee.

Complete current evidence is supplied for this source. No other account or licensing path is in scope.

Explain the catalog-item count, the number of different held license definitions, the account-license membership count and the number of distinct people holding Basic.

There are three definitions, one different held definition, two account-license relationships and one person holding Basic through two accounts. These counts differ because they measure different objects and relationships.

Now the administrator removes Basic from one account under an approved change, and current account evidence confirms it. The Basic definition and the other account's holding remain.

The catalog still has three definitions. There is still one held license definition and one person with Basic, but only one account-license relationship.

To explain a catalog or access report clearly, name what each row represents, which population it covers and when its evidence was obtained. Then trace the holder relationship to the correct account and identity. That is how a count becomes an explanation rather than a guess.
