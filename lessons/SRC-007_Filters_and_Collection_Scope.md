# The read finished. Did it include the right accounts?

Devi, employee number `47007`, coordinates facilities work. Her ServiceDeskFlow account, `desk-47007`, is disabled during temporary leave, but it still exists and retains its recorded group memberships.

The organization wants SailPoint Identity Security Cloud (ISC) to govern every human account in the application's WEST region, including disabled accounts.

The first collection finishes with 110 accounts. The application owner's comparable inventory contains 120 accounts in that agreed population. Devi's account is one of the missing ten.

Has the connector failed? Has someone deleted the account? Or did the collection do exactly what its configuration asked?

The supplied configuration adds an active-only condition. All ten omitted accounts are disabled.

Let's separate a successful read from a correct population.

ServiceDeskFlow, its data, counts, configuration and corrected results are fictional. The example assumes a supported filtering mechanism and comparable reads of the same source state. No real tenant execution is claimed.

## Decide what belongs before deciding how to filter

An **account** is a record in an external system. An ISC **identity** represents a person or another entity and can connect that entity's accounts and access information.

A **source** is ISC's configured representation of a system or collection of account data. Its **connector** supplies the supported integration behavior.

An **attribute** is a named piece of information on a record. Region, kind and status are account attributes in this example.

Our source is ServiceDeskFlow Production. A successful connection to a test environment would tell us nothing about Devi's production account.

**Aggregation** collects account or entitlement information into ISC. An **entitlement** represents an access right; an account's membership values identify rights such as application groups.

The **population** is the set of records the integration is intended to cover. **Collection scope** is the boundary of a particular read: which system, accounts, access objects, information and time range it covers.

For this source, the agreed account population is:

Human accounts in WEST, whether active or disabled.

That statement excludes accounts outside WEST and accounts classified as service accounts. It doesn't claim those excluded accounts are safe, unimportant or governed nowhere. Their responsible governance process needs its own coverage.

A **service account** is an account used by software or a service rather than a person's everyday sign-in. The fictional application explicitly supplies the classification; don't infer it from a username prefix in a real project.

Here are four representative records:

| Account | Region | Kind and status | In the agreed population? |
|---|---|---|---|
| desk-47007 | WEST | HUMAN, DISABLED | Yes |
| desk-47008 | WEST | HUMAN, ACTIVE | Yes |
| desk-47009 | EAST | HUMAN, ACTIVE | No |
| desk-svc-47010 | WEST | SERVICE, ACTIVE | No |

The identifiers distinguish account records. Devi's employee number isn't a count of accounts, and 120 accounts wouldn't automatically mean 120 distinct people.

**Account correlation** associates a collected account with its owning ISC identity using configured matching. An account that was never collected and an account that was collected but not associated with a person are different problems.

## A filter is a decision with a direction

A **filter** evaluates conditions to select or exclude records. A **predicate** is a condition that evaluates a record, such as “region equals WEST.”

Before writing an expression, ask what a match means.

An **inclusion filter** keeps matching records. An **exclusion filter** discards matching records. The words “filter string” alone don't tell you which behavior a particular mechanism implements.

Our fictional query is an inclusion mechanism. It currently asks for:

Region WEST AND kind HUMAN AND status ACTIVE.

This is a statement of the supplied logic, not runnable ISC syntax or a connector property to copy.

**AND** requires every condition to hold. **OR** requires at least one condition to hold. **NOT** reverses a condition under the mechanism's supported evaluation rules.

Devi satisfies WEST and HUMAN but not ACTIVE, so this query excludes her account. The query can be correctly implemented and still contradict the business requirement.

The intended logic is:

Region WEST AND kind HUMAN.

The application has 500 accounts overall. Of those, 120 are WEST human accounts: 110 active and ten disabled. The other 380 are outside the agreed population.

That gives us:

```text
[WEST human accounts: 120]
             |
   [Add ACTIVE condition?]
       /             \
     Yes              No
      |                |
[110 included]   [120 included]
```

The branches compare two proposed inclusion conditions against the supplied inventory. They aren't two jobs running in ISC. The “No” branch still keeps WEST and HUMAN; it doesn't collect all 500 application accounts.

An OR mistake changes the population differently. “WEST OR ACTIVE” would include an active EAST account as well as a disabled WEST account. It isn't another spelling of “WEST AND ACTIVE.”

Parentheses matter when conditions are combined. Decide whether you mean WEST AND (ACTIVE OR DISABLED), or (WEST AND ACTIVE) OR DISABLED. The latter includes disabled accounts outside WEST.

Test the intended decision with actual representative records before translating it into the particular connector's syntax.

## Where is the selection happening?

A target application can limit what the integration sees before any explicit filter is evaluated.

The integration's **read actor** is the account or application identity used to read data. Its **authorization** determines what that actor is permitted to read.

An administrator viewing 500 accounts doesn't prove that the integration actor can read those same 500. Compare the actual destination, actor, permissions and operation.

A collection filter isn't a substitute for authorization controls. Selecting fewer records doesn't prove that the integration actor is forbidden from reading records outside that selection. Keep data-minimization choices and permission boundaries separate.

A **native filter** is a selection applied through the external system's supported query or search mechanism. It can narrow what the external system returns.

A **resource-object filter** evaluates records within a supported connector or integration implementation after retrieval. A **resource object** here is the connector's represented account or access object.

If filtering happens after retrieval, the data has already crossed the external read boundary. That doesn't automatically reduce the target's query work, network transfer or exposure in the way a native query can.

SailPoint's connector software development kit, or **SDK**, provides tools for building integrations and includes resource-object filtering facilities. That doesn't establish that every standard connector supports the same configuration, expression language or match direction.

**Extraction** selects records or values from a response. A **mapping** selects or converts incoming information into represented attributes.

The useful investigation boundaries are:

```text
[Correct target and read actor]
               |
[Native scope and returned records]
               |
[Supported filtering and extraction]
               |
[Collected records and access values]
               |
[Screen or query used to inspect them]
```

The lines tell you where to compare evidence. They aren't a private ISC processing pipeline, and not every connector has a separate configurable filter at every line.

A wrong extraction path can omit accounts from a returned collection. A wrong attribute mapping can leave a collected account's field empty. Neither problem is automatically an intentional population filter.

Keep these distinctions when you inspect a missing record:

| Boundary | Useful evidence | What it can help distinguish |
|---|---|---|
| External system and actor | Destination, same-actor query and permissions | Wrong environment or restricted visibility |
| Native request | Actual supported search scope and conditions | Intended or unintended upstream exclusion |
| Connector interpretation | Response pages, extraction, filtering and relevant errors | Unread data, wrong paths or post-read exclusion |
| ISC record and viewing query | Source account, timestamps and current view conditions | Collection absence versus display/query absence |

A filter on a screen or a read-only API query can hide an already collected record from your current result. An **API**, application programming interface, lets software interact with a system.

Clearing that viewing filter doesn't change the source's collection configuration. Likewise, a report containing only active accounts doesn't establish that disabled accounts weren't collected.

## Don't copy a condition between mechanisms

A connector's supported attributes, operators, quoting, case handling and null behavior belong to that mechanism.

For a concrete example, the Okta software-as-a-service (SaaS) connector supports an account aggregation filter such as `status eq "ACTIVE"`. In that documented filter, matching active accounts are selected.

That example doesn't establish syntax for ServiceDeskFlow, an ISC Search query, an SDK evaluator or a different connector's exclusion setting.

A **data type** describes the kind of value, such as text or a true/false Boolean. A missing field and Boolean false are different inputs.

If a source supplies region WEST but the expression tests a different field, you haven't evaluated the intended business value. If it supplies text "false", treating that as Boolean false requires a supported interpretation, not a guess.

A **null** value explicitly represents no value in formats that support it; an omitted property isn't the same structural input. Don't assume that “not WEST” safely classifies every null or missing region.

Establish how the actual mechanism handles missing attributes, comparisons and invalid expressions. Decide how unknown classifications will be investigated. Silently assigning every unknown account to the excluded population can hide a data-quality problem.

In our supplied example, region, kind and status are present, and their exact values are known. We can reason about the defect without inventing a parser's behavior.

## An included account can still have incomplete access information

Account scope answers which accounts are read. It doesn't, by itself, answer which access objects or membership values are read.

An **entitlement aggregation** collects access-object information, such as group identifiers, names and descriptions. An **entitlement type** identifies a supported category of access objects on a source.

An account's membership values answer which of those objects the account holds. A catalog of group definitions and an account's group memberships aren't the same dataset.

Where supported, account filters, entitlement-object filters and membership filters can select different information. An account can be included while selected memberships are omitted from its collected representation.

That omission hasn't removed the membership from the application. It has reduced visibility into it.

Likewise, collecting group definitions for a restricted catalog doesn't automatically prove that account membership reads use the same restriction. Inspect the actual supported settings and resulting values.

For example, the Microsoft Entra ID connector documents separate user, group and group-membership filters. It also gives account filters priority over group filters: a group outside the group filter can still be collected when associated with an included account.

That is a connector-specific interaction, not a universal rule that every filter is independent or that every connector behaves like Entra ID.

If an account references a group but the detailed group isn't collected, you can have a membership reference without complete descriptive information. Conversely, a collected group definition doesn't prove that a particular account holds it.

For the access you intend to govern, compare the expected account, its actual membership values, the related access-object identifiers and the scope of both reads. A correct account count alone cannot establish complete access coverage.

## Check completeness, not just the first successful response

**Pagination** splits results into pages. A **page size** limits the records returned in one page, not the total number of records in the agreed population.

An external API can return a successful first page and indicate that another page exists. The integration must follow the supported continuation mechanism to cover the intended result.

A **cursor** is a value identifying where a subsequent page should continue. Other interfaces use offsets or links. Don't assume every connector uses the same paging method.

Suppose a different read returns 100 accounts and supplies a continuation cursor. Stopping there doesn't prove that the population contains only 100 accounts.

**HTTP**, Hypertext Transfer Protocol, is the protocol used for these web requests and responses. An **HTTP status** describes the result of an individual request. HTTP 200 for page one isn't proof that later pages were requested or that every intended account was collected.

Compare continuation handling, stop conditions, duplicate identifiers, extraction and errors. Don't call a pagination defect a business filter merely because the final number is smaller.

Counts alone also hide substitutions. If one expected account is missing and one unintended account is included, the count can still be 120.

Compare identifiers and representative categories, not only totals. Check disabled accounts, missing classifications, boundary regions and accounts that changed categories.

For the ServiceDeskFlow case, the supplied evidence confirms that the active-only query's pages were fully read. The ten disabled accounts weren't lost on later pages; the native query never selected them.

That evidence identifies the cause more precisely than “110 is smaller than 120.”

## A full read is full within its scope

A **full aggregation** reads the configured source population rather than only a change feed. It doesn't bypass the target's read permissions, remove native conditions or include every application environment.

A supported **delta aggregation** reads changes since a defined point. An unchanged account can be absent from that change set without being absent from the source.

If you widen a filter, don't assume the next delta read backfills every newly included unchanged account. Establish the connector's supported handling and an appropriate collection plan before relying on the wider coverage.

An **optimized aggregation** can skip further processing for unchanged accounts after evaluating the read data. That is different from selecting only active accounts or reading only a change set.

A **single-account aggregation** reads one specified account where supported. Its result doesn't establish that the population-wide iteration selects the same account.

For example, an investigation can retrieve desk-47007 by its identifier while the broader active-only listing excludes it. That is possible because the operations ask different questions. Check the connector's supported operation-specific behavior; don't infer it from the word aggregation.

Manually starting a read and scheduling it are trigger choices. Neither changes what its configured scope means.

A **snapshot** describes state for an agreed scope and time. A file exported for one region or only changed accounts isn't automatically a complete replacement inventory for a wider source.

A **flat-file source** imports supplied files. Its effective input starts with the exporter's selection: report conditions, date range, columns and export time. A perfectly read file can faithfully reproduce an incomplete export.

Don't run a new full aggregation simply to discover what a risky production filter does. Review collection mode, existing records, deletion settings and supported change handling first.

## Excluding an existing account can have consequences

Devi's example concerns the first collection for this source. No pre-existing ISC account record for desk-47007 is assumed.

Now consider a different situation: the account was already represented in ISC, and a later filter change makes it disappear from the next read.

ISC's **Enable Account Deletion** setting can allow missing accounts to be removed from ISC during applicable full source aggregations. The **Percentage of Deleted Accounts Allowed** setting provides a deletion safeguard.

These settings concern represented accounts in ISC. They aren't an instruction to delete those accounts from the external application.

A **deletion threshold** is a configured limit used by that safeguard. It isn't proof that every disappearance is legitimate, and it doesn't make a partial response trustworthy.

Don't disable a safeguard merely to force an unexplained smaller result through. Investigate the cause and assess the intended scope change.

Deletion processing isn't the same for every operation. In the documented single-account aggregation action, an account not found on the source remains unchanged; account deletions are processed during full source aggregations.

If the affected source establishes identities, the consequences can extend beyond an account record. An **authoritative source** participates in establishing identities through an **identity profile**, which configures that identity population and its attribute mappings. Removing an authoritative account can lead to profile reassignment or identity-deletion analysis under the applicable conditions.

That isn't a universal promise that one filtered account deletes a person or every account they hold.

**Provisioning** performs supported changes to external accounts or access. A read-side filter doesn't itself disable an account or revoke its memberships.

A later access decision can depend on collected information, so changing visibility still requires dependency review. Don't turn a visibility change into an undocumented access-removal design.

Disabled is also not synonymous with empty. The target can retain memberships on a disabled account, as it does in our supplied case. Those rights can matter if the account is enabled again.

## Repair the agreed scope, then check what arrived

For ServiceDeskFlow, the evidence says:

The intended population contains 120 WEST human accounts. The integration actor can read those accounts. The native inclusion query adds ACTIVE and selects 110. Extraction and paging correctly collect that selected set.

The responsible owners approve removing the extra active-only condition while preserving WEST and HUMAN.

In the supplied corrected result, the appropriate collection represents all 120 intended accounts, including desk-47007. The comparable target state hasn't changed: Devi remains disabled and retains the same memberships.

This is a correction to visibility, not a re-enable or an access grant.

Verification includes the actual identifiers and status categories, not just a new total of 120. Accounts outside the agreement remain excluded.

Also check where you're looking. The source's Account Aggregation configuration describes the planned read and applicable safeguards. Aggregation History records an execution's status, timing and counts. Account details show a particular represented record.

ISC's Search results can have separate indexing delays. A missing search result immediately after a change doesn't, by itself, locate the defect in the connector. Compare the applicable account record, execution evidence, viewing conditions and freshness before rerunning work.

A **coverage gap** is a difference between intended governance coverage and the data actually available for it. A completed job can still leave one.

## Work through these changes

### 1. The result count is correct

The agreed population contains 120 accounts. The read returns 120, but it substitutes an EAST account for a disabled WEST account.

Has the count established correct coverage?

**Worked reasoning:** No. Compare identifiers and categories against the agreed population. Equal totals can conceal both an omission and an unintended inclusion.

### 2. The filter uses OR

The intention is WEST human accounts. A proposed inclusion condition uses WEST OR ACTIVE, with no human-account condition.

Would an active EAST service account be excluded?

**Worked reasoning:** No. ACTIVE satisfies the OR condition, and the missing kind condition provides no human-only boundary. Translate the full business agreement, then test representative records under the real mechanism.

### 3. The integration actor sees less

An administrator's screen shows desk-47007, but the same read operation using the integration actor cannot retrieve it. No filtering evidence is supplied.

Should the team immediately change the account's region?

**Worked reasoning:** No. Compare destination, operation and actor authorization before changing business data. The supplied difference concerns visibility; it doesn't establish an incorrect region value.

### 4. The first page succeeds

The API returns 100 accounts with a continuation cursor. Only that request is recorded.

Can the team call 100 the complete scoped population?

**Worked reasoning:** No. Establish supported continuation and terminal-page evidence, extraction and errors. A successful request isn't proof that the complete result was consumed.

### 5. A delta response omits Devi

The latest supported delta read contains changed accounts only. Devi's account hasn't changed.

Does her absence establish deletion?

**Worked reasoning:** No. Absence from this change set isn't absence from the source. Inspect the mode, applicable change state and correct account evidence. Don't interpret delta output as a replacement snapshot.

### 6. The screen hides disabled accounts

The source record for desk-47007 exists, but a viewing query selects active accounts only.

Will clearing that query repair collection?

**Worked reasoning:** It can reveal the already represented account in that view. It doesn't change collection configuration, and no collection defect was supplied. Distinguish the viewing result from the stored record.

### 7. A new production filter drops half the population

An existing source would return far fewer accounts after a proposed filter change. Someone suggests disabling deletion safeguards and running it to see what happens.

What should stop that experiment?

**Worked reasoning:** Unexplained scope loss and existing-record consequences require review before execution. Establish intended exclusions, representative IDs, completeness, mode and deletion behavior in a safe validation process. A safeguard isn't the cause of the missing data, and switching it off doesn't prove the new scope is correct.

### 8. An account is present, but a membership is filtered

The account read includes desk-47007. A supported membership filter omits one of its target groups from the collected representation. The application owner confirms that the account still belongs to that group.

Has the filter removed the account's external access?

**Worked reasoning:** No. It changed the access information available through that read, not the target membership. Inspect membership scope separately from account scope. Any intended removal needs its own supported operation and resulting-state evidence.

## Review a payroll export

A payroll project wants all current workers, future starters and recently terminated workers needed by its agreed joining/leaving process. This export classifies those groups as ACTIVE, FUTURE and TERMINATED respectively, but provides only ACTIVE workers changed today. The import finishes without errors, and the team proposes treating every absent worker as deleted.

What is wrong with that agreement?

**Worked reasoning:** The export doesn't represent the intended population or a complete snapshot. Active-only selection excludes required starters and terminated workers; changed-today selection excludes unchanged records. A successful import doesn't repair either omission.

Establish the required statuses, effective-date window, export time and full-versus-change contract. Agree stable identifiers, representative expected records, complete paging/export behavior and explicit handling of missing or unknown information.

Review existing-record and authoritative-identity consequences before choosing deletion settings. Never infer external termination completion or access removal solely from a missing row.

Explain the boundary to the owner: “We need evidence for the population we agreed to govern, not just evidence that the file or query finished. A record missing from a selected result hasn't automatically disappeared from the system.”
