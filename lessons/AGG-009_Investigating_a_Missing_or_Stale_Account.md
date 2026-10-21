# Where did the account stop matching what we expected?

Devi, employee number `59009`, coordinates purchasing. She already has a person record in SailPoint Identity Security Cloud, or ISC.

Her PurchaseDesk account is `pd-59009`. The application team says it exists in production, but an administrator cannot find it under Devi's accounts in ISC.

The source's latest aggregation reports success.

Should the engineer create another application account, repeat the aggregation, or manually attach an account to Devi?

We don't yet have enough evidence to choose any of those actions. “Missing under this person” does not mean “missing from the application” or even “missing from ISC.”

## Make the symptom specific enough to investigate

An **account** is a record in an application or directory. ISC stores its own representation of it. An **identity** is ISC's person record, which can connect accounts belonging to that person.

A **source** is ISC's configured representation of a system or account population. A **connector** supplies the supported integration operations. **Aggregation** reads supported information and represents it in ISC.

Our source is **PurchaseDesk Production**. It uses the Web Services SaaS connector, a software-as-a-service integration that runs in SailPoint's cloud.

The account key `pd-59009` identifies the external account in that production source. Employee number `59009` identifies the person-related information. The two values do different jobs.

For this fictional incident, the application account exists, Devi's identity exists, and the requested outcome is to show the correct account under that existing identity. We are not investigating a request to create access.

The initial report can now be written precisely:

“Account `pd-59009` is not listed under the ISC identity for employee `59009` in the PurchaseDesk Production source context.”

That statement tells us what was observed without turning it into a diagnosis.

For a stale value, use the same precision: which source, account key, attribute, expected value, displayed value, observation time and view? An **attribute** is a named field on a record, such as an employee reference or office code.

“Devi is stale” leaves all of those questions open.

## Separate a possible explanation from a finding

A **hypothesis** is a possible explanation you can test. It becomes a finding only when the evidence supports it.

For the missing account report, possible explanations include:

The wrong environment was searched. The connector did not obtain the record. The record is represented but not associated with Devi. A view has not caught up with a newer result.

Each explanation needs a different check.

If the record is in the source's account inventory, repeating a connection test does not explain why it is absent from Devi's account list. If the connector never received it, editing ownership criteria cannot repair that missing input.

Choose a check that separates the remaining explanations. You do not need to change every part of the system to discover which part disagrees with the requirement.

Begin with read-only evidence where available. A rerun, manual association or configuration change can alter the state you are trying to explain and can have wider consequences.

## Find the record before deciding it is absent

The engineer checks the source's Accounts view using `pd-59009`, not just Devi's display name.

The record is present in PurchaseDesk Production and is marked uncorrelated.

**Account correlation** matches and associates source accounts with identities. **Uncorrelated** means the account has not been matched to the established person identity it should belong to.

The source view can show a technical shadow identity for an uncorrelated account. That placeholder is not evidence that the account has been matched to Devi's established identity.

This observation changes the investigation. We have located the ISC account representation, so the immediate symptom is an unresolved person-account relationship.

It does not prove that all collected fields are correct. An account can be present with an incorrect value needed for matching.

Here is the evidence collected as the investigation progresses:

| Observation | What it establishes or narrows |
|---|---|
| Production application contains `pd-59009`. | Another external account does not need to be created merely because this one is absent from Devi's list. |
| PurchaseDesk Production's Accounts view contains that key. | The record is represented in ISC; this is not simply an absent source account. |
| The account is uncorrelated. | The required association with Devi is unresolved. |
| Devi's identity contains employee number text `59009`. | The intended person record and relevant comparison value exist. |
| The collected account's employee reference is `devi59009`. | The collected matching input differs from the required person number. |
| The captured production read contains person number text `59009`. | The required number reached the connector response. |
| Response mapping selects `login` for the employee-reference field. | The configured extraction uses the wrong supplied value. |

These are supplied teaching observations, not results from a real tenant. They belong to one identified read and the corresponding stored account. No other operation changes these records during the comparison.

The latest task's success is useful context. The record-level evidence is what reveals the defect.

## Compare what was delivered with what ISC represents

The captured response is from the connector's actual production read, not an administrator's separate lookup. It uses **JSON**, a format for named fields and values. The square brackets hold a list of accounts; the nested `person` object holds its own `number` field. Quotation marks show that `59009` is text, not a numeric quantity. The response includes this selected data:

```json
{
  "data": [
    {
      "accountKey": "pd-59009",
      "login": "devi59009",
      "person": {
        "number": "59009"
      }
    }
  ]
}
```

An **API** is an interface through which software requests operations or retrieves data. The sample is selected application-response data, not a complete ISC API object.

The configured **Root Path** selects the response portion containing account records. Here, `$.data` selects the supplied account list.

**Response mapping** connects fields in the selected response to the account attributes ISC should represent. A dotted path such as `person.number` means the `number` field inside `person`; it is not the login field.

The **account schema** describes the represented fields and their identification. In this example, `accountKey` is the configured account-identifying attribute, `login` is the account name, and `employeeRef` holds the employee reference needed for correlation.

The mapping review finds:

| Represented account attribute | Current extraction | Required extraction under the agreed contract |
|---|---|---|
| `accountKey` | `accountKey` | `accountKey` |
| `login` | `login` | `login` |
| `employeeRef` | `login` | `person.number` |

The account-identifying value is correct. The error is the value supplied to `employeeRef`.

The connector received both `devi59009` and `59009`, but the configuration selected the login for a field that should contain the employee number.

Do not correct the application by replacing its valid login with the employee number. Do not change the account's identifying attribute to `employeeRef`. Those actions would change different responsibilities and would not repair the extraction contract.

An incorrect path does not have one universal outcome across every connector configuration. A path can produce an absent value, an unexpected value or a reported problem depending on the operation. Here, we have the actual supplied output: `employeeRef` contains the login.

## Test the configured comparison, not the names

The source has one configured correlation criterion:

The account's `employeeRef` must equal the identity's `employeeNumber`.

Both values are text. Devi is the only eligible identity with `employeeNumber` equal to `59009`, and no identity has employee number `devi59009`. No manual association overrides this example.

Compare the actual inputs:

`devi59009` does not equal `59009`.

The configured comparison therefore has no matching identity for this supplied account input. That explains why a represented account is not appearing under Devi.

The correlation configuration is using the intended employee-number relationship. Its input is wrong because response extraction used the login.

This distinction matters. Changing the comparison to a convenient name field could make this one case appear to work while weakening the matching design for other people.

Follow the relevant information:

```text
[Application: person.number = 59009]
                 |
                 v
[Production response reaches connector]
                 |
       wrong extraction selects login
                 v
[ISC employeeRef = devi59009]
                 |
                 v
[Compare to employeeNumber = 59009]
                 |
                 v
[No match: account is uncorrelated]
```

The application supplies data; the connector's configured extraction provides the represented account input; ISC applies the configured ownership comparison.

The arrows show logical dependencies for the supplied example, not private queues, database commit order or a guaranteed sequence for every connector. The failure is not that the source could not be reached. The wrong value crossed the extraction boundary.

## Choose the correction that fits the evidence

The finding is now narrower than “aggregation is broken”:

“PurchaseDesk Production extracts `employeeRef` from `login`. The response contains the agreed employee number at `person.number`. This supplies `devi59009` to a comparison that requires `59009`.”

The approved correction changes that extraction to `person.number`. It preserves the account key, valid login, comparison criterion and existing person record.

The team checks the affected population, expected field types, possible account-association consequences and source account-deletion settings before approving collection and re-evaluation. A shared mapping change can affect more than Devi.

The supported verification read obtains the corrected employee reference. The supplied result shows the account associated with Devi's existing identity. The engineer independently confirms that `pd-59009` appears under her accounts and that the represented `employeeRef` is text `59009`.

No other process edits the records between this correction and the checks. No external account is created, enabled or deleted.

Compare the before and after:

```text
[Same source and account key]
[PurchaseDesk Production: pd-59009]

Before: employeeRef = devi59009
Compare: employeeNumber = 59009
Result: uncorrelated

Approved extraction: person.number

After: employeeRef = 59009
Compare: employeeNumber = 59009
Verified: account associated with Devi
```

This is a supplied corrected outcome, not a promise that changing any mapping automatically fixes every relationship. The unique eligible match and absence of a manual override are stated conditions.

**Optimization** can skip further processing for existing unchanged account inputs. If the actual correction changes correlation criteria while the delivered data stays unchanged, appropriate supported unoptimized aggregation can be needed to reevaluate those accounts.

Do not prescribe unoptimized processing for every missing-account report. It cannot retrieve an unpublished value, grant a missing read permission, or repair a wrong field path.

Likewise, the UI **Aggregate Account** action is a specified-account read with documented limits: it does not synchronize new data into identity attributes or affect provisioning, and a not-found result leaves the existing ISC account unchanged. Do not treat it as a universal ownership-repair or deletion operation.

## What if the account is absent from the source view too?

Then follow the missing input rather than starting with ownership.

First confirm the environment and external key. A production account and a sandbox account can share a name without being the same managed object. Renames and changed identifiers also need connector-specific handling; changing the configured Account ID after aggregation is not a casual repair.

Next establish what the external system exposes to the **integration actor**, the credential or external identity used by the connector. An application administrator's broader view is not proof that this actor can read the same record.

Check the agreed **collection scope**, the population and information the integration should obtain. Compare it with actual filters, endpoint or query selection, and actor visibility.

Then establish the operation:

A **full aggregation** reads the configured population. “Full” does not override filters or permissions.

A **delta aggregation** collects supported changes, not every unchanged account. Omission from a delta response is not itself deletion evidence or proof that an existing account was not represented earlier.

A specified-account lookup needs its own supported operation and correct external key. A working bulk account list does not establish a working single-account lookup.

For paged reads, determine whether the record's required page was obtained. **Pagination** returns a large population in portions; success on early pages does not prove completion of later ones.

For file input, check the exact file contents, generation cutoff and import. A new upload time does not make old source data current.

Use the relevant **Aggregation History** entry for status, actual execution times, scanned information, optimization and available error or warning details. An accepted request, scheduled time or old successful execution is not proof that the current read completed.

If the external record truly no longer exists, distinguish that evidence from lookup denial, filter exclusion and incomplete collection before reviewing supported deletion handling. Do not raise a deletion threshold just to make an unexplained missing population disappear from ISC.

## What if the account exists, but one value is old?

Now trace that specific attribute through its boundaries.

Start with the producer's business value and the version available through the integration interface. Those can differ. A fresh read can accurately return an older published batch.

If the delivered response is old, investigate publication, file revision, scope and observation time. Do not begin by changing an identity mapping.

If the response is current but the account representation is wrong, compare the selected record, root, response path, schema and any configured conversion. A text code, a number, a list, an absent field and a null value are not interchangeable inputs. An absent field was not supplied; `null` explicitly supplies no value.

If the account representation is current but the identity value differs, inspect its **identity profile**, the configuration defining the source mappings used for the person. The identity's office may intentionally come from human resources (HR) while the application account's office describes a different business location.

**Identity processing** evaluates identity data under that configuration. Verify the required mapping and processing outcome rather than assuming every account read updates every person-level value.

ISC **Search** presents indexed information used to find records. Its synchronization can lag account or identity changes. An old Search result does not by itself prove the source account is still old.

Status fields need the same tracing. “Locked,” “disabled” and “enabled” describe different account conditions. Verify the application's meaning and the supported status mapping before deciding that an observed status is wrong.

**Provisioning** makes supported changes to external accounts or access. A read-side correction can improve ISC's information without changing the application. Making an account look current in ISC is not evidence that an external unlock or access removal occurred.

## Keep the next check small enough to answer a question

Suppose you know only that the source task succeeded and the identity's account list is empty.

Checking whether the exact account key exists in the source inventory separates “not represented” from “represented elsewhere or unresolved.” It gives you more useful direction than rerunning every source.

Once you have the raw number `59009` and represented `devi59009`, inspecting extraction directly tests where the values diverged. Rotating a working credential would not answer that question.

A diagnostic test is useful when its expected results distinguish explanations. State what you need to learn before you run it.

Use approved, supported tests and review their consequences. A narrower test can help inspect one record, but it does not certify full-population coverage. A source rerun can reevaluate relationships or other configured effects; it is not automatically a side-effect-free refresh.

Manual correlation can be an approved action for a specific ownership decision. It is not proof that the source data contract or general matching configuration is correct. Record why it is needed and review existing manual associations before expecting broad reprocessing to replace them.

Do not delete a representation, recreate a person, change an Account ID, broaden credentials or reset change tracking merely because those actions are available. Preserve enough evidence to explain the original symptom.

## Close the incident with the result that was required

For the PurchaseDesk incident, a useful finding and closure record names:

The production source and native account key. The existing intended identity. The delivered person number and incorrectly extracted employee reference. The responsible mapping. The approved correction. The resulting account input and verified person-account association.

It also states the boundary: no new external account was needed, and no access change was part of the request.

If a wider population shares the faulty mapping, record its impact review rather than assuming one successful sample closes every affected account.

Keep observations and conclusions separate when handing work to another team. “The connector's actor receives no matching record under this query” is more useful than “the application is wrong.” Include the source environment, relevant operation, key, time and expected versus actual data without sharing credentials or unnecessary personal information.

If evidence stops at a boundary you cannot inspect, name the uncertainty and ask the responsible team for the specific missing observation. Do not fill it with a guessed backend explanation.

## Test the next decision

### 1. Present in the source, absent under the person

The source view contains `pd-59009` as uncorrelated. The administrator cannot find it under Devi.

Should the next action be to create another PurchaseDesk account?

**Worked reasoning:** No. The represented record already exists. Inspect the intended identity and actual correlation inputs and criteria. Creating another external record would address a different problem and could introduce a duplicate.

### 2. Corrected criteria, unchanged inputs

In an independent variation, the source record has the correct employee number. The engineer corrects correlation criteria, then repeats an optimized aggregation. The unchanged record is skipped from further matching evaluation.

Does that result prove the new comparison cannot match?

**Worked reasoning:** No. Establish the supported unchanged-record re-evaluation and inspect the actual match result. A configuration change and an executed comparison are different facts. Also review any manual association and the eligible identity data.

### 3. A successful read returns an old batch

The integration response contains yesterday's office value. The producer confirms that today's business change has not reached the published interface.

Should the engineer edit ISC's office mapping first?

**Worked reasoning:** No. The delivered input is old. Verify publication and the later supported collection. A correct mapping cannot select a future value that the producer has not made available.

### 4. The administrator can see it, but the connector cannot

The external administrator sees the record. The configured integration actor lacks access to that record's business unit.

Does that prove ISC extraction is broken?

**Worked reasoning:** No. The read-visibility boundary differs between the two actors. Agree the intended coverage and approved least-privilege access, then verify the connector's actual response before investigating extraction.

### 5. The account is on a page that never arrived

The operation returns early pages, then fails before obtaining the page containing the required account. Its old ISC representation remains.

Would unoptimized processing of the same incomplete input make that account current?

**Worked reasoning:** No. Re-evaluation cannot operate on input that was not obtained. Investigate the read failure, review the supported recovery and deletion consequences, then verify the required account's delivered and represented data.

### 6. Account office and identity office differ

An application account correctly contains `HYD`. The identity correctly contains `BLR`, mapped from the current HR record. The agreed design gives those fields different responsibilities.

Which value must be corrected?

**Worked reasoning:** Neither, from these facts. Verify the meanings and source mappings before declaring a stale value. Different records can correctly hold different locations; changing HR to match the application would violate the supplied contract.

### 7. Search is old, but the underlying record is current

The account representation is current, and the required identity mapping output has been verified where applicable. Search still shows an earlier result.

Should the engineer reset source change tracking?

**Worked reasoning:** No. The evidence places the remaining discrepancy in the indexed view or its synchronization context, not a missing source read. Inspect the relevant object and synchronization evidence without assuming an exact completion deadline.

### 8. The name matches in another environment

A sandbox source contains an account with the same login as the requested production account. The engineer has not checked the production source key.

Can the sandbox result close the production incident?

**Worked reasoning:** No. Establish production environment, source and external identifier. Matching display names or logins across environments do not establish that the requested production record was collected or associated.

## Write a finding for a different field

A WorkOrders source has the correct external account key and person association. Its agreed cost-centre field is a text code, not a quantity.

The captured source response contains text `"0042"`. The integration's project conversion changes it to the number `42`, and that number is represented on the ISC account. The business team asks why the leading zeros disappeared.

Explain where the evidence places the defect, what correction you would review, and how you would verify it without changing the business code to suit the faulty representation.

**Worked reasoning:** The producer delivered the required text. The divergence occurs in the supplied conversion and representation path, not in external existence, read permission or account ownership.

Review the approved conversion and schema requirements so the code remains text `"0042"`. The zeros are part of the identifier's meaning, not decoration on a number.

Use supported collection and re-evaluation appropriate to the change, then verify the delivered value, represented type and text, stable account key and unchanged intended owner. Review related identity mappings only if they depend on this field.

Do not change the producer's valid code to `42`, recreate the account, or promise restoration merely from a successful task status. Confirm the specific corrected result and assess other records affected by the same conversion.

The useful question is not “Which refresh button should I try?” It is “At which boundary does the observed evidence first differ from the required result?”
