# Every account was read. Why wasn't this one re-evaluated?

Devi, employee number `53003`, coordinates equipment requests. She already has an AssetDesk account, `asset-53003`, and an established identity in SailPoint Identity Security Cloud (ISC).

ISC has collected the account but hasn't connected it to her identity. The old ownership comparison used an out-of-date email address.

The integration team corrects that comparison to use her employee number. Then a new account collection finishes successfully. Devi's account is still unassigned.

Does that prove the new comparison is wrong?

Not yet. We need to ask whether the run merely read the unchanged record or also re-evaluated its ownership.

AssetDesk and the records, executions and outcomes below are fictional. The main example uses a supported full-population account read, valid stable account identification, no manual ownership override and one unique existing identity match under the corrected comparison. It isn't a tenant test or an instruction to change real configuration.

## Follow the record and the rule separately

An **account** is a record in an external system. An **identity** is ISC's representation of a person or another entity, connecting information, accounts and access.

A **source** is ISC's configured representation of a system or collection of account data. Our source is AssetDesk Production. Its **connector** provides the supported integration behavior.

**Account aggregation** collects source accounts and their attributes into ISC. An **attribute** is a named piece of information, such as employeeRef or mail.

**Account correlation** matches and assigns a source account to its owning identity using configured comparisons. It answers whose account this is, not whether the account could be read.

Here are selected represented account values in **JSON**, JavaScript Object Notation, which writes named properties inside curly braces:

```json
{
  "accountKey": "asset-53003",
  "mail": "devi.old@example.invalid",
  "employeeRef": "53003",
  "department": "OPS"
}
```

This is illustrative selected data, not a complete ISC account response. The example email addresses aren't real contact details.

Devi's established identity has work email devi.current@example.invalid and employeeNumber 53003. The employee number is text in both records.

The old comparison paired account mail with identity work email. When this account was first collected, those values already differed. The account was collected without an established ownership association to Devi.

An **uncorrelated account** has unresolved ownership association to an established identity. A source view can represent it with a technical **shadow identity**, a placeholder rather than proof that Human Resources (HR) established another employee.

The corrected comparison pairs account employeeRef with identity employeeNumber. Both already contain 53003. No external account field changes when that configuration is saved.

That's the distinction to hold onto: the rule changed; the delivered account values didn't.

## “Full” answers a question about coverage

A **full aggregation** here means a read of the source's configured account population rather than only its reported changes. It doesn't mean every account in every connected system.

**Scope** identifies the records and information the read is meant to include. A **filter** selects or excludes records under supported conditions.

The **integration actor** is the account or application identity used to reach the external system. Its permissions affect what the read can obtain.

For AssetDesk, the configured population contains four accounts. All four are visible to the actor and returned through the supported read.

That is a supplied condition. Calling a run full doesn't prove that its filters, permissions or returned pages actually covered the intended business population.

**Pagination** splits a result into pages. A successful first response isn't proof that all pages were collected.

Now distinguish coverage from processing. Reading the whole configured population doesn't require ISC to repeat every calculation for every existing record.

## What optimization skips

An **optimized aggregation** retrieves the source's account population and checks the records for changes. It is the documented default behavior.

**Manager correlation** links an employee's identity to their manager's identity. It is a different relationship from linking an application account to its owner.

If an account already exists in ISC and its read data hasn't changed, optimization skips further processing of that record. Account correlation and manager correlation aren't evaluated for that unchanged account through this aggregation.

“Unchanged” isn't another word for inactive, disabled or unimportant. It describes the account data compared for this processing decision.

An active account can be unchanged. A disabled account can have changed attributes. Whether either account is included depends on scope, not a meaning hidden inside optimization.

Here is the logical decision:

```text
[Read configured account population]
                  |
       [Existing and unchanged?]
          no /             \ yes
 [Process record]   [Optimization enabled?]
                       yes /       \ no
             [Skip unchanged]   [Reprocess]
```

The lines show the processing choice after the relevant account data is available. The no branch includes newly represented accounts and existing accounts whose data changed.

This is a teaching model of documented behavior, not ISC's private implementation. It doesn't specify the private comparison algorithm or internal execution order.

The connector obtains the supported account data. ISC's account processing uses the applicable optimization behavior. The person starting the run doesn't choose an owner by hand for each returned row.

Why skip unchanged records? Repeating work that depends on unchanged inputs consumes processing resources without necessarily producing a different result.

But configuration can change independently of those inputs. That's where the default shortcut needs attention.

## Four accounts make the difference visible

For the first run after the approved correlation change, suppose the delivered data has these states:

| Account | State compared with its ISC record | Optimized handling |
|---|---|---|
| asset-53003, Devi's account | Existing, unchanged | Skip unchanged-record processing |
| asset-53004 | Existing, department changes OPS to FIN | Process the changed record |
| asset-53005 | Existing, unchanged | Skip unchanged-record processing |
| asset-53006 | Already exists externally; first represented in ISC | Process the newly collected record |

All four accounts were read. Two pass into record processing, and two take the unchanged skip path.

Devi's account is one of the skipped records. The new comparison wasn't evaluated for it through that run, even though its employee number would support the intended match.

The successful read and the unresolved association can therefore coexist. Neither observation cancels the other.

The first representation of asset-53006 isn't the creation of another external account. The account already exists in AssetDesk.

**Provisioning** performs supported changes to external accounts or access. Collecting an account, assigning its ISC owner and creating an account in the application are different outcomes.

These numbers describe the supplied teaching trace. They aren't universal names or formulas for every status counter shown by ISC.

## Reprocessing doesn't require fake account changes

An **unoptimized aggregation** scans the source's accounts and attributes and re-evaluates account and manager correlation logic even when account data hasn't changed.

For a supported source, that allows existing unchanged records to be examined under a changed correlation configuration.

It doesn't invent a new employee number, fix an incorrect comparison or guarantee that every account will find an owner.

For Devi, the team first confirms the approved comparison, the actual account and identity values, the intended unique match and the source operation.

It then initiates a supported unoptimized account aggregation. In the supplied completed result, the unchanged asset-53003 record is re-evaluated and associated with Devi's existing identity.

The external record still contains employeeRef 53003. The ownership result changes because the current comparison was applied to information already present.

No new external account or HR person record is required for this correction.

Don't change a correct department value merely to make an account look changed. That obscures the reason for the action and can introduce other consequences.

Don't reset a source, remove records or recreate identities as a routine substitute for the documented reprocessing mechanism either.

The successful correction here concerns an initially uncorrelated account without a manual override. It isn't a promise to move every previously associated account to a different owner.

## The request option applies to a run

An **API**, application programming interface, lets software interact with a system. ISC provides a supported account-aggregation API through which an authorized caller can request reprocessing.

The documented request option is `disableOptimization=true`.

Read that name carefully. The true value disables the unchanged-record shortcut. It doesn't enable a more aggressive optimization.

This is an aggregation request option, not a change to AssetDesk's account fields. The current account-aggregation API describes it as a form-data field, not a JSON attribute to patch onto an account.

**Authentication** establishes the caller's identity; **authorization** determines what that caller may do. The caller needs the supported authentication and permission for this operation. Identifying a source in a request isn't itself authority to run it.

The setting applies to that aggregation. A later API aggregation uses optimization unless the caller again requests that it be disabled. Scheduled and manual aggregations in the documented user interface (UI) run with optimization enabled.

So a previous unoptimized run doesn't establish that tomorrow's scheduled run will reprocess unchanged accounts.

Check the actual request and execution rather than someone's memory that optimization was “turned off.”

This explanation isn't a runnable request. Endpoint versions, authentication, content format, source capability and request scope must be checked before real execution.

## Compare the runs without changing the input story

After the first optimized run, asset-53004's changed data and asset-53006's new representation have been recorded.

A **mapping** determines which input supplies a represented value. Assume no further external or mapped account-value changes occur before the next read. All four account records now exist in ISC with unchanged read data.

The next run is explicitly unoptimized:

```text
Run A: 4 read / 2 processed / 2 skipped
Run B: 4 read / 4 reprocessed / 0 skipped
```

Run A is the first optimized run described by the table. Run B follows it under the supplied unchanged-data conditions. These are logical record counts, not screenshots or exact task-summary field labels.

The two reads cover the same four accounts. What differs is whether existing unchanged records are passed through re-evaluation.

Run B doesn't need a second change to asset-53004 to examine it. It also examines asset-53005, even though that account wasn't the reason the team requested reprocessing.

That wider effect matters when estimating the scope and impact of the action. Reprocessing is a source operation, not a repair performed only on the person who raised the ticket.

## Don't substitute delta or a single-account read

A **delta aggregation** uses a supported changes-only collection mechanism. Only supported sources provide it, with connector-specific behavior.

A changed ISC comparison doesn't, by itself, change the external employeeRef value or establish that the source's change mechanism will return that account.

If a changes-only operation doesn't deliver Devi's record, removing an unchanged-record processing shortcut isn't enough to prove that the missing record was read.

Ask two questions separately: which accounts will this operation deliver, and which delivered accounts will it reprocess?

Don't assume the disableOptimization option also resets every connector's delta state or changes a configured read scope. Our main example explicitly uses a full-population read.

A **single-account aggregation** reads a specified account. The documented UI action updates that account's collected data but doesn't synchronize the new data with identity attributes or perform provisioning.

It isn't a general replacement for population-wide re-evaluation after a configuration change. Establish the supported operation and intended result instead of choosing it only because it sounds smaller.

An **entitlement** represents an access right. **Entitlement aggregation** reads access-object information, such as group definitions. A successful group read doesn't prove that unchanged account ownership was re-evaluated.

## Identity processing answers another question

**Identity processing** evaluates identity information and relevant access configuration. When aggregation or provisioning modifies an identity, that event initiates identity processing.

It can update mapped identity attributes, values on the identity rather than on an individual source account, and evaluate configured access consequences. Starting that work doesn't confirm successful external provisioning.

An **identity profile** configures an identity population and the mappings supplying its attributes. Its mappings identify value inputs and supported calculations where needed.

If someone changes a profile's office mapping, the question isn't automatically the same as our changed account-correlation comparison.

ISC documents manual identity processing for applying identity-profile and access-model configuration changes, including changes when identities themselves haven't changed. Use the mechanism appropriate to what changed.

Don't translate “unoptimized aggregation re-evaluates unchanged accounts” into “it is the universal refresh for every ISC configuration.”

A source read, an account-ownership comparison, an identity calculation and a target change are different responsibilities, even when one workflow connects them.

If changed information affects configured access, it can lead to separate provisioning work. Don't call the complete workflow consequence-free just because it begins with collection.

## Look for evidence of the skipped work

The source's **Aggregation History** and account-aggregation details show execution information, including status, timing, scanned accounts and whether optimization was enabled. Relevant details can also report unchanged-account counts.

A count of four scanned accounts doesn't establish four repeated ownership evaluations. Compare the operation and optimization evidence with the actual record state.

The source's **Accounts** view shows collected records and their associations. For Devi, inspect AssetDesk Production, asset-53003, its employeeRef and its actual association.

The source's **Account Correlation** configuration shows which comparisons are configured. A saved change establishes configuration, not proof that every unchanged account subsequently used it.

The identity's account list provides another view of the association. ISC Search can have indexing delays, so a stale search result alone isn't enough to conclude that the re-evaluation failed.

Use the question to choose evidence:

| Question | Evidence to compare | What it doesn't prove alone |
|---|---|---|
| Was Devi's record delivered? | Source, actor, scope, actual returned record and completed read | That correlation was re-evaluated |
| Was unchanged processing requested? | Applicable aggregation request and execution's optimization information | That the comparison was correct |
| Should the comparison identify Devi? | Configured attribute pair, actual values and unique intended match | That the execution completed or association changed |
| Did the association change? | Identified account and actual identity/account relationship | That any external permission changed |
| Did a target change finish? | Separate provisioning outcome and resulting application state | That a successful aggregation establishes delivery |

No one screen answers all of these questions.

## If another run still doesn't produce the result

First confirm the record was in the intended read. A different environment, a filter, incomplete pages or insufficient visibility can prevent delivery before unchanged-record handling matters.

A **schema** defines represented attributes and their uses. If an external field isn't returned or represented through the applicable mapping, its change isn't automatically evidence of changed account data available to ISC.

Next inspect the actual values, not only their labels. Text 53030 doesn't match 53003 under the supplied comparison.

Check which configuration changed and what operation applies to it. Confirm the requested run actually disabled optimization when unchanged-record re-evaluation was required.

Inspect errors or partial completion before treating a requested rerun as a finished one.

Also distinguish automatic correlation from **manual correlation**, an administrator-supplied account ownership association. ISC documents that a manually correlated account won't be moved to another identity merely because its attributes change. That relationship requires its documented authorized handling; an unoptimized run isn't a universal override.

If the account is already attached to someone else, investigate that association and its history. Don't copy the initially uncorrelated example into an automatic mass-reassignment promise.

Finally, verify the result at the correct record and view. If the association is correct but an expected external grant is absent, identify and inspect the separate change process.

## Use reprocessing for a reason, not as a daily guess

An optimized full-population read still retrieves the configured account population. Its benefit is avoiding unnecessary unchanged-record processing, not turning that read into a changes-only query.

An unoptimized read adds re-evaluation for those unchanged records. On a large source, that is more processing work. It doesn't imply a fixed runtime, a specific increase in external calls or the same performance across connectors.

Choose the supported operation around the problem and account for the wider source population. Check expected ownership effects, applicable identity processing and downstream access configuration before initiating real work.

Keep account-deletion settings and safeguards in view when considering source scope or reruns. An omitted or unread record isn't the same as a processed unchanged record.

Don't disable safeguards to make an unexplained result disappear.

The useful incident note is specific: which configuration changed, which source records need re-evaluation, which operation was requested, what completed and what result was verified.

## Reason through these changes

### 1. Four read, two skipped

The optimized run reads the four accounts in the table. Devi's record and asset-53005 are unchanged.

How many records take the processing path in that supplied run?

**Worked reasoning:** Two: the changed asset-53004 record and newly represented asset-53006. All four were read, but two unchanged records were skipped. Reading and repeated processing aren't the same count.

### 2. The comparison is saved, but the account data is unchanged

employeeRef 53003 and identity employeeNumber 53003 already exist. The source's comparison has just been corrected. Another optimized run succeeds, but the account remains unassigned.

Must the employee number be edited?

**Worked reasoning:** No. Check whether unchanged-record processing was skipped. The supplied values can support the intended unique match without changing them. Use the supported re-evaluation mechanism after verifying configuration and scope.

### 3. The application screen changes, but the read doesn't include that field

An application-only comment changes. The supplied account response and represented attributes remain unchanged.

Should that screen change establish that optimization must process the record?

**Worked reasoning:** No. Compare the actual delivered and represented account data, schema and mappings. A change outside the information available to this processing decision isn't proof that ISC received a changed record.

### 4. Yesterday's request disabled optimization

An authorized API request used disableOptimization=true. The next scheduled UI aggregation runs tomorrow.

Does yesterday's option make tomorrow's run unoptimized?

**Worked reasoning:** No. The option applies to the requested aggregation. Confirm each relevant execution; the documented UI scheduling behavior remains optimized.

### 5. A delta read returns no Devi record

The external account hasn't changed. Only ISC's correlation configuration changed, and the selected changes-only operation doesn't deliver asset-53003.

What needs checking before promising re-evaluation?

**Worked reasoning:** Establish a supported read that includes the required record as well as appropriate unchanged-record processing. A processing option doesn't establish delivery of a record excluded by the selected read mechanism.

### 6. Reprocessing uses a mismatched value

A separate variation supplies account employeeRef 53030 and identity employeeNumber 53003. Unoptimized aggregation completes.

Does reprocessing guarantee the intended match?

**Worked reasoning:** No. It enables the comparison to be re-evaluated; it doesn't make unequal input values equal. Investigate the approved data and configuration without silently rewriting either identifier.

### 7. Ownership was assigned manually

An account has a manual association to one identity. Someone expects an unoptimized run to move it to another identity automatically.

Is that the same situation as Devi's initially uncorrelated account?

**Worked reasoning:** No. The manual association has documented handling and isn't overridden simply because account data changes. Verify ownership and use the authorized supported handling, rather than promising automatic reassignment or resetting the source.

### 8. The association is corrected, but access delivery fails

The correct identity now owns the account. A **group membership** associates an account with an application group. A separately initiated provisioning operation reports a denied group-membership change.

Which outcome succeeded, and which still needs investigation?

**Worked reasoning:** The account association succeeded in the supplied result. The target change didn't. Investigate the specific provisioning operation, authority and target state; another account read doesn't establish that the denied write succeeded.

## Apply the distinction to an identity-profile change

A different project already has current HR account data in ISC. Its identity profile has been changed to supply identity office from a different existing input. The proposed repair is to force unoptimized reads on every connected application.

What would you establish before accepting that plan?

**Worked reasoning:** Identify the affected profile, the changed mapping, the existing inputs and the expected identity output. Determine whether any source data is actually missing or stale.

The supplied problem concerns applying an identity-profile mapping change, not necessarily re-reading every external system or re-evaluating every account's owner. Follow the documented profile-related manual identity processing, with appropriate impact review, and verify the resulting identity value.

If fresh source data is also required, plan that collection separately. If the resulting identity value drives an external change, verify the separate provisioning outcome and target state.

Explain the distinction to the project owner: “A full read tells us about coverage. Optimization tells us whether unchanged accounts are reprocessed. The right follow-up depends on whether we changed source data, account matching or identity configuration.”
