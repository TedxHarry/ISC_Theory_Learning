# The source already has a value. Do we need a transform?

Devi, employee `81001`, already has an employee identity in SailPoint Identity Security Cloud (ISC). Her HR record says her department is `Finance` and her cost centre is `0042`.

The team needs two identity fields. Cost Centre must retain `0042` exactly. Department must contain a lowercase department label, so `Finance` must become `finance`.

Should both fields have a transform because transforms are available?

Let's start with what each field needs to mean. One value already meets its requirement. The other needs a specific change. That difference determines the design.

## First separate the records we are working with

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record belonging to a connected system. An **attribute** is a named field on a record, such as department.

A **source** is ISC's configured representation of a system or collection of account data. In this fictional design, **PeopleLedger Production** represents the HR worker records. It is authoritative for the Employees population: those worker records establish employee identities through the Employees **identity profile**.

The identity profile is shared configuration governing that population, including how its identity attributes receive values. An **identity attribute mapping** identifies the data or calculation that supplies one of those fields.

Devi's collected HR account is `pl-81001`. It is already correctly associated with her identity, which we'll call `I-81001`. That is a teaching label, not an actual ISC object ID. She has exactly one account on this source.

**Account aggregation** reads account data into ISC. For the main example, it has already collected the correct record and values. We are deciding how identity fields should use those values, not investigating a failed collection.

The HR owner has approved the following meanings. A **string** is text; digits in a string do not make it a number for arithmetic.

| Item | Supplied fact or requirement |
|---|---|
| HR account | PeopleLedger Production, account `pl-81001`, belongs to Devi |
| HR field `costCentreCode` | One string: `0042`; the leading zeros are part of the code |
| HR field `departmentLabel` | One string: `Finance`; an approved department label |
| Identity Cost Centre, `costCenter` | Must contain the HR code unchanged |
| Identity Department, `department` | Must contain the approved label in lowercase: `finance` |
| Selection and ownership | One associated HR account; no competing account or alternate input |
| Other identity fields | Already valid; no changes to username, email, manager or lifecycle configuration are proposed |

These are example agreements, not universal ISC requirements. Another organization can require the Department value `Finance` unchanged, or use a department code rather than a label. You cannot choose the calculation from the field's name alone.

## What does a direct mapping actually do?

A **direct mapping** supplies an identity attribute from a selected source account attribute without adding a value-changing calculation.

For Cost Centre, Employees selects PeopleLedger Production and `costCentreCode`. The intended identity value is the same string, `0042`.

There is still processing involved. ISC must use the applicable identity profile and the relevant source account data. “Direct” does not mean that ISC continuously watches the HR database, bypasses collection, or copies every field automatically.

It means that this mapping does not need a calculation to turn the selected value into a different value.

Why keep it direct? Because the approved source already supplies exactly the information required. An extra calculation would introduce another instruction to maintain without solving a demonstrated problem.

Now consider removing those leading zeros because `0042` “looks like 42.” That would change an identifier's representation. If a consuming system expects the four-character code, `42` is wrong even though both strings could describe the same quantity in arithmetic.

A business code is not necessarily a quantity. Preserve its agreed meaning and type.

Direct mapping also does not repair bad data. If HR accidentally supplies `0043`, a direct mapping can faithfully carry the wrong code. “No transform” is not a statement that the source is always correct. It is a statement that no calculation is needed when the selected input meets the agreed requirement.

## When is a calculated value justified?

A **transform** is a configurable ISC object that obtains or manipulates attribute data and returns a result. Its operation determines what it does.

Here, the selected **input** is `Finance`. The **operation** is lowercase conversion. The **output**, meaning the returned result, is `finance`.

ISC's `lower` transform converts letters to lowercase. The identity-profile interface also provides a simple **ToLower** choice for this purpose.

That is a justified calculation: the source owns the department label, while this identity field's approved representation is lowercase. We are not changing Devi's department. We are expressing the same approved label in the required form.

A transform is not always a mathematical formula, and it does not always change the characters. Lowercase conversion returns `finance` unchanged if its input is already `finance`. It is still a calculation because the configured operation is evaluated.

There are also transforms that retrieve a value rather than alter it. The `accountAttribute` operation, for example, selects a field from an account associated with the identity. So “transform” does not mean “the text must visibly change.”

The useful distinction here is whether a simple source-field mapping meets the requirement or whether an additional retrieval, formatting or decision instruction is necessary.

The following is a conceptual value-flow diagram. Arrows mean “supplies the next value,” not private ISC services or guaranteed completion. Both branches start from the already collected, correctly associated HR account.

```text
Employees mapping for I-81001
PeopleLedger Production / pl-81001
                |
       selected account fields
                |
      +---------+---------+
      |                   |
 costCentreCode     departmentLabel
     "0042"              "Finance"
      |                   |
 direct mapping       lower operation
      |                   |
 costCenter           department
     "0042"              "finance"

Calculated values require application.
No HR or target write is shown here.
```

The left branch preserves the code. The right branch changes letter case. Neither branch changes HR's stored record.

The reason for the right branch is the approved lowercase requirement, not the existence of a transform menu.

## The input matters as much as the operation

Let's keep the lowercase operation but change its input to `Legal`.

The result is `legal`. The operation works correctly, yet the result is wrong for Devi if her approved department is Finance.

That is why you investigate both selection and calculation. A working operation can produce a believable wrong value from the wrong input.

A transform can use an **implicit input**, supplied by the source and attribute selected in the identity-profile mapping. It can instead define an **explicit input**, its own instruction for where to obtain the value.

For the main design, ToLower uses the mapping's selected PeopleLedger `departmentLabel` as its implicit input. No explicit input overrides it.

If a custom transform explicitly reads a different account field, changing only the mapping's visible source selector will not redirect that explicit read. You need to inspect the transform's actual input configuration as well.

For example, suppose a separately associated directory account contains `departmentLabel = Legal`, left over from an earlier job. A lowercase transform explicitly reading that directory field returns `legal`, even if the mapping screen also shows PeopleLedger.

The right correction is to restore the approved input, not replace the word `legal` with `finance` inside a special case for Devi.

That special case would conceal the dependency error. It would also stop representing future legitimate department changes.

Account selection matters within a source too. If an identity has multiple accounts, you need to know which account supplies the input. The `accountAttribute` transform has documented sorting and filtering controls; it does not select an account because its visible name looks most appropriate to a person.

Our main example deliberately has one associated HR account. That removes selection ambiguity; it does not establish a universal one-account-per-person rule.

## A cleaner-looking value can still be wrong

**Normalization** means converting agreed equivalent representations into a consistent form. Lowercasing an approved department label is normalization in this example.

It is not permission to invent business equivalence.

Suppose HR supplies `FIN`, while the identity field requires the full label `finance`. Lowercasing produces `fin`. It does not expand the abbreviation.

A **lookup** is a configured translation from an input key to an output value. An approved lookup could translate `FIN` to `finance`, but the business owner must establish what the code means and how unknown codes should be handled.

Do not add that lookup simply because two values look related. `FIN` might mean a division in one system and a legal entity in another.

The same care applies to missing data. **Null** means no value, an **empty string** contains no characters, and whitespace-only text contains spaces or similar characters. They are not interchangeable evidence.

A lowercase instruction alone does not define an acceptable department for an absent input. A **fallback** is a deliberately chosen alternative when the intended input is unavailable or unsuitable. It needs an agreed condition and meaning.

Defaulting every missing department to `finance` could make an empty field appear valid while misclassifying people. A nonempty output is not proof of a correct output.

Also distinguish a failed calculation from a successful calculation that returns the wrong business value. An error requires evidence about the operation and its inputs. A wrong value may require correcting source ownership, account selection or the requirement itself. Do not assume every problem is a syntax error.

For each proposed calculation, ask what information it preserves and what information it discards. Case conversion discards the original letter case. Converting a code to a number can discard leading zeros. Taking one value from a list discards the others.

A **multi-valued attribute** holds a list rather than one value. Identity-profile mapping transforms do not automatically transform an entire list into an equivalent list: adding a multi-value attribute to a mapping transform takes its first value and produces a single value.

Our example supplies single strings. If that assumption changes, revisit the design before treating one returned department as the person's complete set of departments.

## Where does the result become real?

A saved transform definition is an instruction. A mapping attaches an instruction to a particular use. Neither observation alone proves that the identity now contains the intended result.

**Preview** lets you inspect how the mappings populate attributes for a selected identity using available data. In the example, we expect Cost Centre `0042` and Department `finance`.

That is evidence about the selected calculation. It is not evidence that all Employees identities were updated or that an external application received anything.

**Identity processing** reevaluates identity data and related decisions against the applicable configuration. It can follow relevant aggregation or provisioning changes, or be initiated manually. A saved mapping change needs to be applied through the appropriate processing; saving is not the same outcome as applying it.

The identity-profile **Apply Changes** action processes identities associated with that profile. Therefore, a shared mapping change is not a one-person edit merely because you previewed Devi.

Check the affected population and dependent uses before applying it.

A **consumer** is a configuration or system that uses the resulting value. For example, a role can assign access when identity attributes meet its membership conditions. A role is a configured access bundle; its condition might distinguish the string `Finance` from the string `finance`.

Changing representation without reviewing consumers can change those decisions.

**Provisioning** is the work of making account or access changes in a connected system. **Attribute synchronization** is separately configured propagation of identity values to eligible source account fields. An identity calculation does not, by itself, establish either delivery path or its success.

Transforms also have uses in account-creation configuration. Those are separate uses: a calculation attached to an identity mapping is not automatically attached to every target account field.

Here is a human verification sequence, not a claim that ISC implements these boxes as internal services. Each check needs evidence for its own outcome.

```text
Human verification for this change
                |
  Approved meaning and input selected?
                |
  Preview: "0042" and "finance"?
                |
  Authorized processing completed?
                |
  Applied identity has both values?
                |
      Consumer needs a change?
          /             \
        no              yes
        |                |
  No write inferred   Check its decision
                         |
                   Write configured?
                     /         \
                    no         yes
                    |           |
                No delivery  Check operation
                inferred     and target state

A preview is not target confirmation.
```

For a supplied successful continuation, assume the team approved the shared change, checked other affected identities and consumers, and completed the relevant processing. Current identity evidence then shows `I-81001.costCenter = 0042` as text and `I-81001.department = finance`.

The collected HR account still shows `costCentreCode = 0042` and `departmentLabel = Finance`. That difference is expected. The identity calculation did not rewrite its input.

No external write or application-use test is supplied in this continuation. Do not extend the result beyond the evidence.

| Observation | What it establishes, and what remains unproved |
|---|---|
| Saved source, attribute and transform configuration | The intended instructions exist; execution and actual input selection still need checking |
| Preview returns `finance` for Devi | That selected evaluation returns the expected representation; it does not establish population-wide application |
| Current identity shows `finance` after the relevant processing | The identity value is applied; a role decision or external update still needs its own evidence |
| A consumer reports a successful write | That operation reports success; confirm the intended target account and current field or permission |
| The intended target has the expected current value | That target outcome is confirmed; it does not prove every other identity or target succeeded |

## Choose the smallest design that meets the actual requirement

“Always use direct mappings” is too broad. A source might supply dates in a different format or only provide components that need combining.

“Always use transforms to clean the data” is too broad as well. Cleaning can hide a broken feed or replace meaning without authorization.

Start with the required field meaning, its approved owner and the consumer's accepted representation. Then compare that requirement with the selected account value.

If they already agree, direct mapping is a complete design decision.

If they differ in an approved, precisely described way, choose a calculation that implements that difference. Explain its input, operation and expected output with concrete examples.

If the input is wrong, missing without an agreed policy, or attached to the wrong person, resolve that problem rather than hiding it behind a plausible result.

Before changing shared configuration, test changed conditions as well as the comfortable example: an already lowercase value, another valid department, a missing value, an unexpected code and an identity with multiple accounts.

For a proposed fallback or conversion, establish how an unacceptable input becomes visible to the people who must correct it. Silently producing an access-bearing default is not a substitute for that decision.

## Try the decision with changed facts

### 1. A valid code is already available

**Facts:** HR supplies single text value `0042`. The identity field and its consumer both require `0042`. Ownership and account selection are verified. Someone proposes removing zeros and adding them back.

Which design would you choose?

**Reasoning:** Use the direct mapping. The selected value already meets the requirement. Removing and recreating characters adds failure opportunities without supplying missing information. Retain evidence that the value remains text with its zeros intact.

### 2. The department arrives in a different case

**Facts:** The approved identity representation is lowercase. The selected HR value is `FINANCE`, with no spaces. The mapping uses ToLower with that implicit input.

What result should the operation return?

**Reasoning:** `finance`. The operation changes letter case, and the requirement authorizes that change. This expected result says nothing yet about whether identity processing has applied the mapping or any consumer acted.

### 3. The code needs a meaning, not a new case

**Facts:** The selected field contains `FIN`. The identity field requires the full label `finance`. The owner has not yet confirmed a code-to-label translation.

Would ToLower solve the requirement?

**Reasoning:** No. It produces `fin`, not `finance`. Confirm the code's meaning and approved translation, including unknown-code handling, before choosing a lookup or another source field. Lowercase conversion cannot supply the missing agreement.

### 4. The mapping screen and the result disagree

**Facts:** PeopleLedger has `Finance`. A custom lower transform explicitly reads an associated directory account's `departmentLabel`, which contains `Legal`. Preview returns `legal`.

Where is the first useful check?

**Reasoning:** Inspect the explicit input and selected directory account. That input explains `legal` without a failure of lowercase conversion. Check the approved field authority, then correct the input dependency if it violates that agreement. Changing only the visible mapping source does not override the explicit input.

### 5. A space survives the calculation

**Facts:** The input is `Finance `, with one trailing space. Only lowercase conversion is configured. The consumer requires exactly `finance`.

Is the result acceptable?

**Reasoning:** No. Lower changes case; it is not a trim instruction. The resulting text is `finance `, still containing the trailing space. Determine whether the producer should correct the data or whether approved normalization should also remove surrounding whitespace. Do not claim the current operation already does both.

### 6. Missing data becomes a believable department

**Facts:** The HR department is null. A proposed fallback returns `finance` whenever no department exists. Department can influence access decisions, and the owner has not authorized this default.

Should you accept the design because it always returns text?

**Reasoning:** No. It substitutes an unverified business fact. Agree on the missing-data policy and correction responsibility, and assess dependent access before implementing any fallback. No universal null behavior for lower is needed to reach this design conclusion.

### 7. Preview looks right, but the target is unchanged

**Facts:** Preview returns `finance`. No relevant application or processing evidence is supplied. A directory account still shows `Finance`, and no synchronization configuration has been checked.

Has the transform failed to provision?

**Reasoning:** That conclusion is unsupported. Preview establishes a calculated result, not an applied identity value or a configured directory write. Check application/processing and current identity evidence first, then whether an authorized consumer should send a change. If so, inspect its operation and target evidence separately.

### 8. A second account changes the question

**Facts:** A custom `accountAttribute` input uses its default account selection. An identity has two associated accounts on that source: the oldest contains `Legal`; the newer contains `Finance`. Both are non-null. The business requirement is to use the current active worker account, and the default selects the oldest.

Would another lowercase operation fix the result?

**Reasoning:** No. Lowercase converts the selected `Legal` into `legal`; repeating it leaves `legal`. Review the retrieval's sorting/filtering against the active-worker requirement and verify the source records. The problem is which account supplies the input, not how letter case is converted.

## Explain your decision for another population

A project team gives you 100 proposed identity-field mappings. These are separate reviewed categories, not counts of failed identities:

- 40 already supply the exact required single text value.
- 25 require lowercase conversion of approved department labels.
- 15 contain department codes needing an approved label translation.
- 10 have no input and no approved missing-value policy.
- 10 draw from multiple accounts without an agreed selection rule.

What would you recommend, and what evidence would you require before declaring the work successful?

For the first 40, use direct mapping after confirming authority, type and selection. For the next 25, a lowercase calculation meets the stated difference; test representative inputs and dependent uses.

The 15 need a confirmed translation and unknown-code policy, not just case conversion. The missing-input group needs an agreed response and correction path. The multiple-account group needs an explicit selection design. Those last groups are not ready for a blind shared rollout.

For every accepted design, retain the requirement, selected source/account/field, calculation if needed, representative preview results and applied identity evidence after authorized processing. Verify any dependent decision or target change separately.

If someone asks why you chose a transform, your answer should identify the precise difference it resolves. For Devi's Department, that difference is `Finance` to `finance`. For her Cost Centre, there is no difference to resolve.
