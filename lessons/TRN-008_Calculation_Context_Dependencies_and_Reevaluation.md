# What has to change before this value is calculated again?

Devi, employee `88008`, has cost centre `"0042"` recorded on her identity in SailPoint Identity Security Cloud (ISC).

HR changes her cost centre to `"0090"`. A few minutes later, someone opens a calculation preview and still sees 0042.

Has the calculation failed?

Not necessarily. We need to establish which data it could read, which identity it was evaluating and whether we are looking at a preview or an applied value.

“The value changed” is incomplete information until you can say where it changed.

## Put the person, account and mapping in the same picture

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a connected system. An **attribute** is a named field on one of those records.

The **WorkforceRecord Production source** is ISC's configured representation of HR worker records. It is authoritative for this employee population: its accounts establish identities through the Employees **identity profile**.

The profile is shared configuration governing those identities, including how their identity fields receive values.

Devi already has one correctly associated WorkforceRecord account, `wr-88008`. We'll label her identity `I-88008`; this is a teaching label, not an actual ISC object ID.

An **identity attribute mapping** defines how an identity field receives its value. Employees maps the identity attribute `costCenter` from the account field with that same internal name.

The fields have the same spelling, but they belong to different records. The account field is collected HR data. The identity field is the applied value on ISC's representation of Devi.

The approved rule removes surrounding ordinary spaces and preserves the code's characters, including leading zeros. The account initially contains `" 0042 "`.

Other required identity fields are already valid. For this example, costCenter is used as business metadata and proposed new-account data, not as a condition assigning access or employment status.

## A definition needs an evaluation context

A **transform** is a configurable ISC object that retrieves or manipulates data and returns a result. The instructions alone do not identify every record needed to evaluate them.

**Calculation context** means the information and setting in which those instructions run: which identity is being evaluated, which mapping or account field is using them, what data is available and any time-dependent inputs.

An **input** is a supplied value. An **output** is the returned result. A **dependency** is information or configuration that must be available for that result to be calculated correctly.

ISC's `accountAttribute` operation retrieves a field from an associated account on the named source. The `trim` operation removes surrounding whitespace.

Here is the complete illustrative definition used by the identity mapping. It uses **JSON**, a structured text format whose named properties describe instructions and settings.

```json
{
  "name": "Trim HR cost center",
  "type": "trim",
  "attributes": {
    "input": {
      "type": "accountAttribute",
      "attributes": {
        "sourceName": "WorkforceRecord Production",
        "attributeName": "costCenter",
        "accountReturnFirstLink": true
      }
    }
  }
}
```

The definition does not contain Devi's employee number. When evaluated for Devi, the account retrieval uses her associated WorkforceRecord account.

`accountReturnFirstLink: true` tells that retrieval to return the first selected account's field even if it is **null**, meaning no value. The unquoted true is a **boolean**, a yes/no setting, not replacement data. We have supplied one associated account, so there is no competing-account choice here.

A failed retrieval is an **evaluation error**, an operation that could not produce its normal result. It is not a successfully retrieved value. Check that condition separately rather than assuming a missing or failed input supplies a usable cost centre.

The returned `" 0042 "` is a **string**, meaning text. Trim returns `"0042"`. It does not turn the code into the number 42.

Now consider another employee, `88009`, whose teaching identity `I-88009` has one correctly associated account `wr-88009` on the same source. Its costCenter text is `" 0088 "`.

The same definition returns `"0088"` in that employee's context.

This diagram compares two evaluations of the same instructions. The arrows carry each evaluation's own input and result; they do not show one shared cached value or a private processing schedule:

```text
Same definition: Trim HR cost center

I-88008 / wr-88008     I-88009 / wr-88009
         |                     |
     " 0042 "              " 0088 "
         |                     |
       trim                  trim
         |                     |
      "0042"                "0088"

Each result belongs to its own evaluation.
Mapping/application still need evidence.
```

A transform name is not a stored result for one person. Reusing the definition does not make every identity receive 0042.

If an identity has no eligible associated account, or has multiple accounts that could supply the field, investigate retrieval and selection. Do not assume the one-account result applies unchanged.

## Available data is not necessarily the producer's newest data

**Account aggregation** reads account data into ISC. A transform retrieving an associated source-account attribute uses the account data available in ISC; it is not a fresh live query to HR just because it is evaluated now.

HR's approval time, the account-data collection time and the calculation time are different observations.

Suppose HR publishes `" 0090 "` at 09:00 UTC. The UTC label means Coordinated Universal Time, the common time reference. The already collected account still contains `" 0042 "`.

A 09:02 evaluation using that account can correctly return 0042. The transform has not been given the new HR value yet.

Changing the calculation is not the right repair for an uncollected update. First establish whether the approved source value reached the exact associated account field.

The following supplied observations all occur on October 23, 2026:

| Observation | What it establishes |
|---|---|
| 08:50: current identity costCenter verified as 0042 | An applied value existed at that observation time |
| 09:00: HR publishes cost centre 0090 | The producing system changed; collection in ISC is not yet established |
| 09:02: available account still has spaced 0042; Preview returns 0042 | The selected calculation used the older available input |
| 09:05: collected account verified with spaced 0090 | The new account data is now available in ISC |
| 09:06: Preview returns 0090 | That evaluation produces the expected result; the last checked applied identity evidence is still from 08:50 |
| 09:10: relevant processing and current identity value 0090 verified | The changed value has been applied to this identity |

The identity profile's **Preview** evaluates mappings for a selected identity using available data. It is not proof that new data was collected from HR, and it is not population-wide application.

**Identity processing** reevaluates identity data and related decisions against applicable configuration. It can update mapped identity fields.

A changed account collected during aggregation can initiate event-based identity processing. The table does not claim that aggregation and identity processing are unrelated, or that processing could not already have occurred before 09:06.

It says the applied value had not been checked again. A historical observation of 0042 is not proof that the current identity still has 0042.

In this fictional continuation, the 09:10 evidence confirms relevant processing and the current value. The timestamp is supplied evidence, not a promise that processing always takes five minutes.

Here is the same evidence sequence as a timeline, not a guaranteed sequence of separate ISC backend jobs:

```text
October 23, 2026 / UTC

09:00  HR publishes 0090
          |
09:02  Available account still has 0042
       Preview -> 0042
          |
09:05  Account data verified as 0090
          |
09:06  Preview -> 0090
       Applied evidence not rechecked yet
          |
09:10  Relevant processing verified
       Current identity -> 0090

New input, new result and applied value
are distinct claims.
```

## Different dependencies require different evidence

The result can depend on more than the source value.

A **data dependency** is a value or relationship used by the calculation, such as the selected account's costCenter and its association with the identity.

A **configuration dependency** is an instruction or selection that affects the result, such as the governing mapping, an explicit source reference or a translation table.

A **time dependency** exists when the result uses the clock, even if collected account data stays unchanged.

An **implicit input** comes from the surrounding mapping or calculation context. An **explicit input** is an instruction inside the definition that chooses what data to use.

Our trim definition explicitly retrieves WorkforceRecord costCenter. Changing a mapping's visible source selector does not rewrite that nested instruction. Inspect the saved definition as well as the mapping.

If a source display name changes, a sourceName reference using that display name needs corresponding review. A successful save of the outer mapping does not prove every nested dependency still resolves correctly.

ISC's `reference` operation reuses an existing named transform's logic. A **caller** is a calculation that uses that shared definition.

Editing a shared transform can affect multiple callers and identities. It does not edit separately copied instructions, and it does not prove all affected results have already been reevaluated.

Before applying such a change, identify the affected definitions, mappings and populations. Test representative records and review what uses the resulting values.

A **consumer** is a configuration or system that uses a value. A corrected cost centre used only for display has a different impact from a corrected value used to decide access.

## Reading another identity field is not a calculation-order guarantee

A proposal adds a custom identity field, `costCenterReviewText`, intended to show a label based on the new costCenter.

Someone suggests: “Calculate costCenter first, then use an identityAttribute transform to read it while calculating costCenterReviewText.”

ISC's `identityAttribute` operation reads a named attribute from the identity. That sounds convenient, but this proposed identity-mapping use relies on an ordering assumption.

Identity attribute calculations can run concurrently, meaning work on different attributes can overlap. They are not guaranteed to finish in the visible mapping-list order.

The value another calculation reads is therefore not guaranteed to be newly calculated, or even available at that point. SailPoint does not intend identityAttribute for use inside another identity-profile attribute's calculation.

Moving costCenter above costCenterReviewText in a screen does not create a supported “finish this one first” instruction.

Instead, design both calculations around independently available authoritative input. Where the same preparation is needed, a properly designed shared transform can reuse the instructions without reading a supposedly completed identity field.

That still requires the right identity/account context. Reuse does not make unavailable source data appear.

Also look for a **circular dependency**: A needs B's result while B needs A's result. Neither has an independent starting value in that design.

Do not attempt to repair the circle with repeated processing or a made-up default. Establish an authoritative starting input and remove the dependency cycle.

The same concern appears across systems. If HR identity creation needs an email that exists only after a target account is created, but target creation requires the completed identity, the design needs an approved initial-value or alternative-input strategy.

## Account creation is a different place to use the value

An **account create profile** defines how fields for a new account are calculated during account provisioning. It is configured separately from identity-profile mappings.

**Provisioning** makes account or access changes in a connected system. Calculating a proposed account-field value is not proof that the target accepted the account creation.

For future ProjectDirectory accounts, a proposed cost-centre field calculation can read the available identity costCenter:

```json
{
  "name": "Initial ProjectDirectory cost center",
  "type": "identityAttribute",
  "attributes": {
    "name": "costCenter"
  }
}
```

This is a complete illustrative transform definition for a field, not a complete create profile or an account-creation operation.

The root name identifies the transform. The inner attributes.name identifies the identity field to read.

In this use, the operation is consuming available identity data for a new account. It is not asking another identity-field calculation to finish first within the same mapping evaluation.

If the available identity costCenter is 0090 when this field is evaluated, the operation can supply 0090. If it is still 0042, do not assume it will independently recalculate HR's mapping before returning a value.

Check readiness and application before the consuming operation uses the field.

Context also affects what supporting information is available. In identity-mapping calculations, the documented context includes the identity, the attribute being calculated and its previous value. Account-profile calculations additionally have account-field and target-source context.

A previous value is historical input, not proof of the correct current value. An existing account-field value is not automatically a freshly calculated identity field. Do not move a template between contexts while assuming every variable retains the same meaning.

For this example, Devi already has a ProjectDirectory account, `pd-88008`, with cost centre 0042. There is no configured ongoing cost-centre update for it.

After the identity changes to 0090, the new-account calculation does not automatically run as an update against that existing account. Its retained 0042 does not prove the identity calculation failed.

An **attribute synchronization** configuration can separately send selected identity-field changes to account attributes where supported and configured. Other approved update mechanisms can have their own triggers and policies. Neither is supplied here.

The main continuation therefore establishes identity costCenter 0090 while the existing ProjectDirectory account remains 0042. No target write or account creation is claimed.

## The clock can change a result without a new account value

Consider a separate review-only field called `assignmentBoundaryReview`. WorkforceRecord supplies `reviewAt = "2026-10-23T17:00:00.000Z"` for Devi.

This timestamp identifies an exact UTC moment. The organization approves `"Review point reached"` at or after that moment and `"Before review point"` before it. This label does not end employment or remove access.

ISC's `dateCompare` operation compares two supported date values. Its `"now"` keyword means the time when the expression is evaluated.

The `gte` operator tests whether the first date is greater than or equal to the second. `positiveCondition` supplies the string for a true comparison; `negativeCondition` supplies the string for a false comparison.

```json
{
  "name": "Review point in the current context",
  "type": "dateCompare",
  "attributes": {
    "firstDate": "now",
    "secondDate": {
      "type": "accountAttribute",
      "attributes": {
        "sourceName": "WorkforceRecord Production",
        "attributeName": "reviewAt",
        "accountReturnFirstLink": true
      }
    },
    "operator": "gte",
    "positiveCondition": "Review point reached",
    "negativeCondition": "Before review point"
  }
}
```

ISO 8601 is a standard for representing dates and times. The supplied timestamp uses a supported ISO representation for this comparison; Z identifies UTC. This is a separate illustrative calculation, not a clock input to the cost-centre trim definition.

An evaluation at 16:59 UTC returns Before review point. At 17:01 UTC it returns Review point reached. The account's reviewAt did not need to change.

But a stored identity label is an applied result, not a continuously running expression. The clock passing 17:00 does not by itself establish another evaluation or an applied update.

ISC supports scheduled identity processing for eligible identities. The `requiresPeriodicRefresh` option marks time-dependent calculation needs for periodic reevaluation. It is not a second-by-second timer or a guarantee of execution at every business cutoff.

Time-based processing can use the **Next Processing Date** attribute, `nextProcessing`, mapped per identity profile. That is separate configuration with future-time requirements, including at least an hour between updating that attribute and the processing time it specifies.

The example dateCompare definition does not configure a schedule. Check processing eligibility, the applicable timing configuration and actual execution evidence. Scheduled work can be queued; intended time and observed completion are different facts.

Recalculating the cost centre cannot be assumed to mean every time-dependent field, target field and external action has been verified too.

## Select reevaluation for the dependency that changed

If HR publishes a new cost centre, first establish that it was collected. Reprocessing the same old available account value cannot supply HR's uncollected update.

If a mapping or transform changes, inspect the saved configuration and apply the relevant shared configuration changes through supported identity processing. Reaggregating data is not a substitute for checking whether a changed mapping was applied.

If now is the changing input, verify the time-dependent processing design. Waiting for a source value to change may never supply the needed trigger.

If the result is destined for a new account, inspect the account-create configuration and the relevant provisioning event. Identity Preview is not a create-profile execution test.

A **reevaluation** runs the calculation again against its actual context. **Applying the result** establishes the updated mapped value. A **delivery outcome** establishes what happened in a separate consuming system.

A reevaluation can legitimately return the same value. Running again and producing a changed result are different facts; an unchanged result alone does not prove that processing was skipped.

Keep those claims separate, especially after a shared change. One successful Preview cannot establish population coverage, and a current identity field cannot establish target acceptance.

For an incident, collect evidence that answers:

- Which identity and associated account were evaluated?
- Which use context, mapping and saved definition were involved?
- What data, references and clock values were actually available?
- Which dependency changed, and which relevant processing occurred?
- What current value and separate consumer outcome have been verified?

Do not infer a complete processing history from a generic modified timestamp. It tells you that a record changed, not automatically which input, definition or branch produced every field.

## Test which context the evidence actually supports

### 1. The same definition evaluates another identity

**Facts:** Devi's associated account contains spaced 0042. Employee 88009's associated account contains spaced 0088. Both use the shown trim definition and have exactly one matching source account.

Should both receive 0042?

**Reasoning:** No. Each evaluation retrieves its identity's associated account field. The expected returned strings are 0042 and 0088. The shared definition does not capture Devi's value for everyone.

### 2. HR changed, but ISC's available account did not

**Facts:** HR publishes spaced 0090 at 09:00. At 09:02 the associated account in ISC still contains spaced 0042. Preview returns 0042.

Must trim be corrected?

**Reasoning:** Not from these facts. It returned the expected result for the available input. Investigate collection and the selected account before changing correct calculation logic.

### 3. Preview changed, while applied evidence is historical

**Facts:** At 09:06 Preview returns 0090 from the new collected account value. The last checked applied identity observation is 0042 at 08:50.

Does this prove the current identity is still wrong?

**Reasoning:** No. It establishes the Preview result and an earlier observation. Recheck current identity data and relevant processing. Do not treat missing evidence of application as proof that application failed or never occurred.

### 4. Another mapping depends on a newly calculated field

**Facts:** costCenterReviewText uses identityAttribute to read costCenter while both identity-profile attributes are being calculated. The proposed assurance is that costCenter appears first in the mapping list.

Is that assurance sufficient?

**Reasoning:** No. Identity attribute calculations can overlap; list position does not guarantee newly available values. Avoid this identityAttribute dependency in identity-profile calculations. Use independently available authoritative inputs and a supported composition or shared definition where appropriate.

### 5. A create-profile field reads the applied identity

**Facts:** A proposed new-account field uses the shown identityAttribute definition. The available identity costCenter at that evaluation is 0042, although HR has approved 0090.

Can the read be assumed to return 0090?

**Reasoning:** No. It reads the available identity field; it is not an instruction to collect HR data and apply the identity mapping first. Establish readiness and application before the consuming creation event. No actual account creation is supplied.

### 6. An existing account retains its earlier value

**Facts:** The identity now has verified costCenter 0090. ProjectDirectory account pd-88008 still has 0042. Only a proposed create-field calculation exists; no ongoing cost-centre update is configured.

Is that evidence that the identity transform failed?

**Reasoning:** No. New-account calculation and existing-account updates are separate responsibilities. The identity result is verified. An approved target update needs its own supported configuration, authorization and result evidence.

### 7. Time changed, not the source value

**Facts:** reviewAt stays at October 23, 17:00 UTC. One evaluation occurs at 16:59 and another at 17:01. Both use the shown now gte reviewAt comparison.

Why do their results differ?

**Reasoning:** Now is a changing input. The results are Before review point and Review point reached. A stored label changes only when relevant evaluation and application occur; the comparison itself does not create a schedule.

### 8. A shared definition was saved

**Facts:** Multiple mappings reference a shared transform. Its saved configuration changes. Preview for Devi succeeds, but other callers and applied results have not been checked.

What remains unproven?

**Reasoning:** Compatibility for other callers, representative-record coverage and relevant application remain unproven. Any separately configured external delivery also needs evidence. Review the actual dependency scope rather than claiming that saving the shared definition completed every use.

## Review a new request without inventing an execution order

A project asks for an email calculated from a login. The login is calculated from an account that will exist only after the email-dependent account-creation process succeeds.

The proposed fix is: put login first on the identity mapping screen and run processing twice.

What would you ask before approving that design?

Identify which input exists before either account is created, which system owns the initial login and email, and whether an approved temporary or independent value is allowed. Drawing an arrow between unavailable values does not make either one available.

Then separate identity mappings from account-create fields. Check where each expression runs and what data that context can actually read.

Resolve the circular dependency through an authoritative initial input or a supported redesign. Repeated runs are not a substitute for a valid starting point.

Finally, state the acceptance evidence for collection, calculation, applied identity values and any account creation. The order you can explain on paper must come from supported dependencies, not a guessed order of screen fields.
