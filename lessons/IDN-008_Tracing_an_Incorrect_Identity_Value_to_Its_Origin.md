# Where did this identity value come from?

Devi, employee number `68008`, should have cost-centre code `0042`. Human Resources (HR) confirms that value, and the HR account already collected into SailPoint Identity Security Cloud (ISC) contains it.

Her ISC identity still shows `0900`.

The mapping screen has the HR source selected. Another HR read has completed. Neither observation explains why the identity is different.

Before changing HR, let's establish which input the saved calculation actually uses.

## Name the person, the field and the disagreement

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a particular connected system.

A **source** is ISC's configured representation of a system or account-data collection. Its **connector** supplies supported integration behavior. **Account aggregation** reads account information into ISC.

An **attribute** is a named piece of information. An account attribute belongs to a source account; an identity attribute belongs to the ISC identity. Matching labels do not make them the same field.

An **identity profile** supplies shared configuration, including the mappings used to populate identity values. An **authoritative source** supplies accounts used to establish identities through that profile. An **identity attribute mapping** selects or calculates an identity value.

In this fictional environment, **StaffLedger Production** is authoritative for Employees. Employees governs Devi's identity, and Finance has approved StaffLedger's published cost-centre field as the current input.

The disputed identity attribute is Cost Center, technical name `costCenter`. Its expected value is text `0042`; its current value is text `0900`.

Those leading zeros are part of the code. We aren't comparing the numbers forty-two and nine hundred.

Identify the exact identity reference and governing profile before tracing the mapping. A display name alone is not enough: two people can share a name, and a person can have more than one account.

**Account correlation** matches and associates accounts with identities using configured comparisons. In the supplied main example, account ownership has already been verified, and Devi has exactly one associated account on each relevant source.

We will use `I-68008` as a short teaching label for her identity, not a real ISC object ID.

## Gather evidence that can distinguish the causes

The following evidence is fictional and uses October 21, 2026, with all times in Coordinated Universal Time (UTC).

A **Preview** evaluates mapping results for selected identity data. It helps us compare the current calculation with the identity's already-applied value; it does not apply a change by itself.

| Evidence | Supplied observation |
|---|---|
| Approved HR input | StaffLedger published current `costCenter = "0042"`, effective at 09:00. This is not a future proposal. |
| Collected StaffLedger account `sl-68008` | Read at 09:05; `costCenter` is text `0042`. It belongs to `I-68008`. |
| Collected Corporate Directory account `cd-68008` | Read at 09:08; `costCenter` is text `" 0900 "`, including surrounding spaces. It also belongs to `I-68008`. |
| Current identity observation at 09:10 | Employees governs; identity `costCenter = "0900"`. |
| Mapping selections inspected at 09:12 | StaffLedger Production and account field `costCenter` are selected, with the transform named `Trim Cost Center`. |
| Current Preview at 09:13 | Evaluates to `0900`, using the currently saved definition and available account data. |

A **producer** is the system or process publishing integration data. Its effective time says when a business fact applies; collection time says when ISC observed it.

The later directory read is a newer observation of a different value. It does not make the directory the approved owner of the cost-centre decision.

Likewise, a successful HR aggregation does not prove that the identity mapping uses HR. It establishes evidence about the read, which you must connect to the selected account and calculation.

Let's keep competing explanations open until the evidence separates them.

## Check the governing profile before editing it

An identity is associated with one identity profile at a time. **Profile priority** is the configured ranking of profiles. ISC uses the highest-priority profile whose authoritative source has an account associated with that identity. A lower number means higher priority, so 10 takes precedence over 20.

That selection is different from choosing the input for an individual identity attribute. A governing profile can use account information from other sources.

If you inspect Employees' mapping while the disputed identity is governed by Contractors, you may be analyzing configuration that doesn't produce this identity's value.

Verify the current association and relevant authoritative accounts. Don't change profile priority merely because a familiar source appears in the story.

For Devi, the supplied evidence confirms Employees. We can now inspect its Cost Center mapping without assuming that another profile is secretly supplying a fallback.

## Read the definition, not just its name

A **transform** is a configured calculation or lookup used to produce a value. A name such as `Trim Cost Center` describes the object to a reader; it does not prove its input.

The **Trim transform** removes whitespace from the beginning and end of text. **Normalization** means converting data into an agreed representation. Trimming surrounding spaces is normalization; replacing a cost-centre code with another code is a different decision.

A transform can contain an **explicit input**, meaning an input defined inside the calculation instead of relying on the source and attribute selected in the interface.

The **Account Attribute transform** looks up an account field on the identity's associated accounts for a specified source. The definition below nests that lookup inside Trim.

Here is the supplied saved transform definition. **JSON** represents named fields and values; braces group objects, and quoted values are text. This is a reading example, not an instruction to upload a change.

```json
{
  "name": "Trim Cost Center",
  "type": "trim",
  "attributes": {
    "input": {
      "type": "accountAttribute",
      "attributes": {
        "sourceName": "Corporate Directory",
        "attributeName": "costCenter"
      }
    }
  }
}
```

Read from the input outward.

Here it explicitly names Corporate Directory and `costCenter`. The outer Trim transform receives that result. It does not take StaffLedger's `0042` merely because StaffLedger is selected in the mapping interface.

For the supplied single directory account, the calculation is:

- Look up `cd-68008` on Corporate Directory.
- Read the text `" 0900 "`.
- Remove its surrounding spaces.
- Return text `0900`.

The calculation succeeds technically. It uses the wrong supplier for the approved business requirement.

Do not describe this as “Trim converted 0042 into 0900.” StaffLedger's `0042` was not the input being trimmed.

```text
Approved field, but not the active input:
  StaffLedger sl-68008 costCenter 0042

Saved explicit transform input:
  Corporate Directory cd-68008
    -> costCenter " 0900 "
      -> Trim removes surrounding spaces
        -> current Preview "0900"
          -> matches identity observation

Human conclusion:
  current calculation uses wrong supplier
  historical execution needs its own evidence
```

The arrows trace the selected data and calculation, not a private ISC service pipeline. The final match compares current evidence; it does not claim that today's Preview caused the identity value already observed at 09:10.

## Establish which account supplied the input

A source can contain more than one account associated with a person. Proving that the source is correct does not prove that the selected account is correct.

The Account Attribute transform supports account filtering, ordering and null handling. **Null** means no value is present.

Its documented default ordering uses account-created date, oldest first. By default, it continues to a later account when the selected attribute value is null. Explicit configuration can change those choices.

These defaults belong to this lookup. They are not a rule that ISC always chooses the oldest account in every operation, or that an old account is the approved business record.

If an ordinary and an administration directory account are both associated with an identity, inspect which record survives the filter and order. Don't diagnose “HR is stale” from a value that came from the administration account instead.

A filter inside this lookup narrows the value calculation. It does not remove accounts from ISC or change which records a connector collects.

In Devi's main example, there is only one relevant associated account on each source. That rules out an account-selection ambiguity for this supplied trace; it doesn't eliminate the need to check selection in another case.

## Follow every calculation that can change the path

The saved definition may be nested more deeply than this example. A **Reference transform** reuses an existing transform. Follow the referenced definition as well as the mapping that invokes it.

Also inspect constant values, conditional branches, fallback choices and conversions. A fallback can return a technically populated value while bypassing the preferred source. An error in a calculation is different from a successful result containing the wrong code.

Keep text, numbers, lists, missing values and empty strings distinct. If a producer supplies numeric `42`, a simple text conversion does not establish that the original business identifier was `0042`.

An **account schema** defines the fields used to represent collected accounts. If the raw producer response has the right code but the represented account has another field or type, inspect extraction and schema representation before blaming the identity calculation. **Extraction** selects relevant data from the producer's response for the integration.

If the represented account already contains the correct value but the mapping selects a different field or explicit input, correct the mapping rather than editing the producer's good data.

The useful question is not “Which part of ISC is broken?” It is “At which boundary does the observed information stop matching the approved path?”

## Compare hypotheses with the observations

A **hypothesis** is a proposed explanation that needs evidence.

| Possible explanation | Evidence that supports, weakens or separates it |
|---|---|
| HR has not published the correction | Check the current producer record, publication and effective time. Here the approved current code was published and collected. |
| ISC's HR account is stale or incorrectly represented | Inspect `sl-68008`, its exact field, type and read evidence. Here it already contains text `0042`. |
| The wrong profile or account supplies the value | Inspect profile association, account ownership and lookup selection. Here Employees and the two supplied single accounts are verified. |
| The saved calculation reads an unexpected source | Inspect the actual explicit input. Here it names Corporate Directory and explains the current `0900` preview. |
| A correction is saved but not applied | Compare corrected Preview with current identity and relevant processing evidence. In the initial evidence, Preview itself still produces `0900`, so unapplied correct output does not explain that result. |
| Only a search view is old | Compare current identity details with the disputed search result and observation time. Here the current identity and current Preview both show `0900`; a stale search view alone does not explain both. |
| An external writer changed a receiving account | Inspect the configured write path and target history. It may explain a source value's origin, but it does not change which input this saved transform reads. |

Eliminating one explanation doesn't automatically prove all details of another.

For example, matching current Preview and identity values makes the current mapping a strong explanation for the present result. To establish exactly what happened in an earlier execution, you also need the configuration revision, selected input and execution evidence available at that time.

Today's definition can have changed since that run. Today's account can contain a value collected after it. Reconstruct the earlier context rather than treating a current screen as a complete history.

If that history is unavailable, state the limit: the current configuration reproduces the disputed value, but the precise earlier execution has not been established.

## Separate preview, applied value and external effects

Preview doesn't persist a proposed output onto every identity or prove external delivery.

**Identity processing** reevaluates mapped identity data and configured access requirements. It can be initiated after profile configuration changes; identity changes during aggregation can also initiate processing.

**Apply Changes** on an identity profile starts processing for identities associated with that profile. Saving a mapping, starting processing and observing a completed result are separate facts.

The current identity record shows represented identity values. Search and downloaded reports are other views of information and can reflect different observation times. Inspect the current record, view scope and relevant processing before classifying a discrepancy as either failure or delayed visibility.

A **consumer** is a process or system using the identity value. A **role** can use identity attributes as access-membership conditions. A **lifecycle state (LCS)** describes a business stage with configured access or account actions.

A corrected field can therefore affect configured decisions beyond its display. Identify those real dependencies before applying a shared correction.

**Attribute synchronization** is a configured identity-to-account write path. **Provisioning** attempts supported account or access changes in a connected system, the **target system**.

A correct identity value does not prove that a target received it. Conversely, a target showing an old value does not by itself establish that the identity calculation is wrong.

In Devi's main example, cost-centre synchronization to Corporate Directory is not configured. The directory is not expected to change merely because the identity correction succeeds.

## Correct the proven defect and verify the same identity

For the supplied requirement, the approved correction changes the transform's explicit source to StaffLedger Production, keeping `attributeName = costCenter` and the intended Trim operation.

That makes the actual calculation use the approved input. Simply reselecting the already-selected HR source in the interface would not remove an explicit directory lookup still saved inside the transform.

Before applying the correction, establish where the transform is used. If it is reused across fields or profiles, the scope may be broader than Employees. Preserve the earlier definition and compare representative records, including missing values and multiple-account cases.

Also confirm that the code remains text. Trimming `0042` should leave `0042`; dropping its leading zeros would be another defect.

The following before-and-after results are supplied fictional evidence, not a tenant test:

```text
Before correction:
  explicit input -> directory " 0900 "
    -> Trim -> Preview "0900"
    -> observed identity "0900"

Approved definition correction:
  explicit input -> StaffLedger "0042"
    -> Trim -> Preview "0042"

After appropriate processing completes:
  same I-68008 identity costCenter "0042"
  directory unchanged; no sync configured

Human verification:
  correct person, profile and input?
  expected consumers and other fields?
  required external outcomes checked?
```

The first two sections show calculations. The third supplies an observed applied result after processing. The arrows do not promise that a preview automatically updates the identity.

For the corrected Preview, record the source account, exact input and definition used. After processing, verify `I-68008` rather than another identity with the same name, and check current `costCenter = "0042"`.

Confirm relevant processing evidence and inspect any configured consumers. Keep User Name, Work Email and Last Name intact; they remain required identity values, and User Name must be unique across identities.

No HR code was rewritten. No account was moved to another identity. No directory write was required by this example. A changed mapping scope, an ownership defect or a required target synchronization would need additional verification.

If the corrected value later changes again, inspect the next input, definition and execution that could account for it. A repeated symptom does not automatically mean the first correction never applied.

## Keep a compact trace you can hand to another engineer

Use these eight evidence questions:

1. **Identity and output:** Which exact identity, governing profile and technical attribute disagree with the approved value?
2. **Configured input:** What source, field and saved calculation actually supply it, including explicit or referenced inputs?
3. **Account selection:** Which associated account is eligible and selected, with what filter, order and null behavior?
4. **Represented input:** What value, type and number of values exist on that account, and when were they observed?
5. **Calculation:** Which operations and branches connect that input to the output?
6. **Proposed result:** What does Preview produce for the selected data and representative changed conditions?
7. **Applied result:** What processing and current identity evidence establish the saved correction's outcome?
8. **Consumers:** Which configured decisions or external changes depend on the value, and what evidence establishes their outcomes?

This is a human investigation order, not the backend's execution sequence. Stop at the first unverified assumption and collect the evidence needed to resolve it.

A useful diagnosis for the main example is: “Employees' Cost Center calculation explicitly reads Corporate Directory account `cd-68008`, where `" 0900 "` trims to `0900`. StaffLedger account `sl-68008` already contains approved text `0042`. Correcting the explicit input produces `0042` in Preview, and the supplied completed processing leaves the same intended identity at `0042`. No directory sync is configured.”

That explanation names the defective relationship between configuration and input. “We refreshed it and the value changed” doesn't.

## Test the trace with changed evidence

### 1. The selected source looks right

**Facts:** The interface selects StaffLedger, but the saved Trim definition contains explicit Corporate Directory input. Current Preview is `0900`.

Which input must you inspect first?

**Reasoning:** The explicit directory lookup. The transform's saved input determines what Trim receives in this example. Rereading HR or changing its correct `0042` cannot make the unchanged lookup use HR.

### 2. The profile is not the one you inspected

**Facts:** An identity is governed by Contractors. An engineer inspects Employees' Cost Center mapping and finds the desired HR input.

Does that mapping explain the identity's current calculation?

**Reasoning:** Not from these facts. Inspect Contractors' actual mapping and relevant account relationships. A correct mapping in another profile is not proof of what governs this identity, and priority is not a general field-by-field fallback.

### 3. The right source has two accounts

**Facts:** A lookup has no filtering or custom ordering. The identity has two associated accounts on that source. The older account contains non-null `0900`; the newer contains `0042`.

Can you assume the newest account supplies `0042`?

**Reasoning:** No. The Account Attribute lookup's default is oldest-created first, with continuation after a null selected value. Here the older value is non-null. Compare the approved account-selection requirement with the actual definition rather than calling the newer value an automatic winner.

### 4. The producer is correct, but the account is not

**Facts:** The approved producer field contains text `0042`. ISC's represented source account contains `0900`. The identity mapping directly reads that represented field.

Where does the trace first disagree with the approved path?

**Reasoning:** Between the producer evidence and represented account. Investigate publication, exact record selection, collection, extraction, type and observation time. Editing a correct identity input selection does not repair wrongly represented or stale source data.

### 5. Correct Preview, old identity

**Facts:** The approved corrected definition previews `0042`. The current identity still shows `0900`. No evidence of processing after the correction has been supplied.

Can you conclude that the calculation ignores the correction?

**Reasoning:** No. The preview and applied record describe different boundaries. Establish whether the correction was saved, which identities were processed and what the relevant execution did. Don't classify a lack of application evidence as proof that the new calculation is wrong.

### 6. The current identity is right, but Search is old

**Facts:** Current details for the exact identity show `0042`. An earlier search view shows `0900`.

Should you immediately rewrite the mapping?

**Reasoning:** No. Compare view scope, observation time and synchronization evidence. A stale or different view is a candidate explanation, not an automatic conclusion. The current correct record does not justify changing the input without new contradictory evidence.

### 7. Today's preview matches yesterday's result

**Facts:** Today's saved configuration and current inputs preview `0900`. Yesterday's report also contains `0900`, but yesterday's configuration revision and inputs are unavailable.

Does this prove yesterday's exact execution path?

**Reasoning:** No. It shows that today's calculation can reproduce that value. Different earlier inputs or definitions could have produced the same result. Record the missing historical evidence instead of inventing an event sequence.

### 8. The identity is fixed, but an application is not

**Facts:** The identity now has `0042`. A receiving application's account still shows `0900`. Whether a cost-centre write is configured has not been established.

What should you check before calling the mapping correction a failure?

**Reasoning:** Establish the actual consumer and supported write path, then any provisioning and target evidence. The identity calculation can be correct while no write is configured or a separate write fails. The application's old value alone doesn't identify which condition applies.

## Trace a work-email complaint the same way

A user reports that a business application still displays an old email address after the identity's Work Email mapping was corrected.

First establish whether the complaint concerns ISC's identity value, a collected account value, a message recipient or the application's own stored contact address. Those are different observations.

Identify the exact person and account, inspect the governing mapping and any explicit inputs, and compare current Preview with the applied identity value. Then establish whether the application should receive a configured update and whether that operation completed.

Include a different-person same-name case, an unavailable source account, a shared transform and an earlier report. For each, name the evidence that would change the diagnosis.

The trace should let another engineer follow the result without guessing: which record supplied the value, which definition used it, which evidence is current, what was corrected and which outcome remains unverified.
