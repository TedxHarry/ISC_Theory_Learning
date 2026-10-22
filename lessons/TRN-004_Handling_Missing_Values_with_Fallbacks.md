# A fallback returned a value. Is it the right value?

Devi, employee `84004`, already has an employee identity in SailPoint Identity Security Cloud (ISC). HR has no preferred given name for her, but her given name is `"Devi"`.

The organization wants a display field to use the preferred name when one is recorded, otherwise the given name. Using the approved alternative is reasonable.

But what if the preferred-name field contains an empty string rather than no value? What if reading it fails? What if it contains `"UNKNOWN"`?

Those conditions can look similar on a screen. They do not represent the same input or lead to the same calculation.

## Establish what the alternative is allowed to mean

A **fallback** is an alternative input or result used when a defined condition prevents using the preferred one.

The condition matters as much as the alternative. “Use given name when no preferred name is recorded” is not the same instruction as “use given name whenever anything goes wrong.”

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a connected system. An **attribute** is a named field on a record.

A **source** is ISC's configured representation of a system or collection of account data. Here, **StaffBase Production** represents HR worker records.

The Employees **identity profile** is shared configuration governing employee identities, including how their identity fields receive values. StaffBase is authoritative for that population: its worker accounts establish employee identities through the profile.

Devi's collected account `sb-84004` already belongs to her identity, which we'll label `I-84004`. That is a teaching label, not an actual ISC object ID. Exactly one StaffBase account supplies the fields in this example.

**Account aggregation** reads account data into ISC. The relevant record is already collected. We are reasoning about using its data, not claiming a fallback repairs a failed collection.

The organization has added a custom identity field called **Display Given Name**, with internal name `displayGivenName`. A custom field is an organization-defined identity attribute, not a special built-in behavior implied by its name.

Its approved rule is:

- Use StaffBase `preferredName` first.
- If that value is null, use StaffBase `givenName`.
- Do not invent a person's name if neither supplies an acceptable value.
- Treat a failed read or calculation as an error to investigate, not ordinary absence.

A **string** is text. The HR agreement says an unrecorded preferred name is null, while a recorded one is a usable name string. For the main supplied evaluation, preferredName returns null without an error, and givenName returns `"Devi"`.

Other required identity attributes are already valid. This custom field does not determine employment status, access or account ownership.

These conditions make the fallback meaningful: both fields describe this person's given name, and the owner has approved their priority.

## First separate absence, text and failure

**Null** means no value. An **empty string**, `""`, is a text value with no characters. **Whitespace-only text**, such as `"   "`, contains characters even though they are hard to see. The text `"null"` contains four letters; it is a string, not a null value.

An **absent field** is not present in the supplied record or response. That observation alone does not tell you whether a particular retrieval operation returns null or reports an error.

An **invalid value** exists but fails the field's business requirement. For this naming agreement, `"UNKNOWN"` is invalid even though it is a nonempty string.

An **evaluation error** means an operation could not produce its normal result. A null result and a failed operation are different outcomes.

| Observation or returned result | What it tells us |
|---|---|
| Field absent from a response | Check collection, field extraction and retrieval behavior; do not assume a successful null result |
| Retrieval returns null | No value was returned by that option; null-based fallback can consider the next option |
| Retrieval returns `""` | A non-null empty string exists; it is not automatically skipped by a null-based selector |
| Retrieval returns `"   "` | Non-null text containing three ordinary spaces; it needs a separate suitability decision |
| Retrieval returns `"UNKNOWN"` | Text exists, but this example's naming rule rejects its meaning |
| Retrieval reports an error | There is a failed operation, not merely an unrecorded preferred name |

If a screen shows a blank, use evidence that distinguishes these cases. The visible blank alone cannot tell you whether there is null, empty text, spaces or an error elsewhere in the calculation.

## What does firstValid actually select?

A **transform** is a configurable ISC object that retrieves or manipulates attribute data and returns a result. Its **inputs** are the values supplied to it; its **output** is the result it returns.

ISC's `firstValid` operation considers configured options in order and returns the first one that evaluates to a non-null value.

The word “valid” in its name does not mean “approved business data.” Its selection test is non-null, not “a name that looks right,” “a real email address” or “the correct department.”

The options belong in descending preference order. For Devi, preferredName comes before givenName.

If both are available, that order chooses the preferred name. If the preferred result is null, it allows the given name to supply the result.

It does not combine the fields or vote between them. It does not search for the newest or most trustworthy value among all non-null results.

This conceptual flow shows the selection decision for the supplied null-and-name case. Arrows mean which value is considered or returned, not separate private ISC services.

```text
Evaluating for identity I-84004
StaffBase Production / sb-84004
                |
Option 1: preferredName returns null
                |
         No value to select
                |
Option 2: givenName returns "Devi"
                |
           Non-null result
                |
         Return "Devi"

Order expresses approved preference.
Returned text still needs valid meaning.
```

A later option cannot replace an earlier non-null result just because you consider it better. The array order expresses that preference before selection.

Putting a literal value such as `"Not supplied"` first would select that non-null text before the dynamic name options. A constant intended only as a last resort belongs after preferred choices, and only if its meaning is approved.

## Read the definition and its error policy together

An **identity attribute mapping** supplies an identity field from selected data or a calculation. Employees uses the following illustrative definition for displayGivenName.

The `accountAttribute` operation retrieves a named field from an associated account on the configured source. Here, each option explicitly names StaffBase and its account field.

The definition uses **JSON**, a structured text format. The `values` property contains an **array**, an ordered list. Nested objects describe the retrieval calculations whose returned results are considered.

`ignoreErrors` is the firstValid setting controlling whether a failed option can be skipped so the next option is considered. We set it explicitly to `false` because this agreement does not treat a failed retrieval as ordinary absence.

JSON `true` and `false` are boolean values, meaning yes/no settings, not quoted strings. Each retrieval also sets `accountReturnFirstLink` to true so it can return the first selected account's field even when that value is null.

```json
{
  "name": "Display given name with HR fallback",
  "type": "firstValid",
  "attributes": {
    "ignoreErrors": false,
    "values": [
      {
        "type": "accountAttribute",
        "attributes": {
          "sourceName": "StaffBase Production",
          "attributeName": "preferredName",
          "accountReturnFirstLink": true
        }
      },
      {
        "type": "accountAttribute",
        "attributes": {
          "sourceName": "StaffBase Production",
          "attributeName": "givenName",
          "accountReturnFirstLink": true
        }
      }
    ]
  }
}
```

This is a complete illustrative definition, not a tenant upload or evidence of an actual run.

The `accountReturnFirstLink` setting belongs to accountAttribute, not firstValid. Setting it to true tells that retrieval to return the first selected account's attribute value even if it is null, rather than searching later accounts for a non-null value.

The example has one associated account, so there is no competing-account choice. The setting makes the null-return intent explicit; it is not an instruction to suppress retrieval errors.

Notice the two levels of selection. AccountAttribute selects account data for each option. FirstValid then selects among the returned option values. Changing firstValid's preference order does not repair a wrong account selection inside one option.

For the supplied evaluation, the first retrieval successfully returns null. That is not an error, so ignoreErrors false does not prevent trying the next option. The second retrieval returns `"Devi"`, which firstValid returns.

The mapping determines that this result belongs in displayGivenName. The transform name does not choose the destination or create an automatic display convention.

## Empty text will not trigger this null fallback

Here is a separate fixed-value illustration:

```json
{
  "name": "Illustrate empty text selection",
  "type": "firstValid",
  "attributes": {
    "ignoreErrors": false,
    "values": ["", "Devi"]
  }
}
```

The result is `""`, not `"Devi"`. The first item is already non-null.

These literals demonstrate selection; they are not a replacement for per-person source retrieval.

Likewise, if the preferred-name option returns three spaces, firstValid can select those spaces. If it returns `"UNKNOWN"`, it can select that string.

An operation called `trim` removes surrounding whitespace. Trimming three ordinary spaces returns an empty string, not null. Therefore, adding trim does not by itself make firstValid skip that option.

You need a separate **suitability check**: a defined decision about whether the returned text meets the field's requirement. “Non-null” and “usable name after approved trimming” are different tests.

For example, an agreed decision could treat null and whitespace-only text as “no preferred name,” while rejecting designated placeholder text for correction. That decision needs to be expressed in supported configuration or enforced by the producing data process.

Do not describe that additional decision as behavior built into firstValid. If you prepare candidates for a null-based selector, an approved rejected candidate must actually become null for selection purposes, not merely become an empty string.

A retrieval error needs its own branch; it must not silently become “no preference” unless the error policy explicitly authorizes that treatment.

The main HR agreement already supplies null for an unrecorded preference. If HR starts sending empty strings instead, that is a changed input contract. Revisit the producer agreement or implement the approved suitability decision, rather than insisting the original two-option definition already handles it.

## A failed option is a different branch

Suppose the preferred-name retrieval now throws an evaluation error. The given-name option could return `"Devi"`.

With ignoreErrors false, firstValid does not proceed past that failed option to use the alternative. The selection fails at that point; this does not mean the entire tenant stops processing.

With ignoreErrors true, firstValid can skip the failed option and consider the next one. Under the supplied second-option result, it returns `"Devi"`.

Both behaviors can be intentional. They express different decisions about whether a name should remain available while a preferred input is broken.

Setting true does not repair the failed read, prove the error is harmless or validate the replacement. If you allow continued operation, define how the underlying defect remains visible and who corrects it.

Set the error policy explicitly and test it. Do not infer it from a transform's friendly name or assume every failure is caught by one option-handling setting.

| Supplied first-option outcome, with second option `"Devi"` | Result of this selection |
|---|---|
| Successful null result, ignoreErrors false | Consider the second option; return `"Devi"` |
| Successful empty-string result, ignoreErrors false | Return `""`; there was no error and no null |
| Error, ignoreErrors false | Do not continue past that option; the selection reports failure |
| Error, ignoreErrors true | Skip that failed option and consider the second; return `"Devi"` under these facts |
| Successful `"UNKNOWN"` result, either setting | Select `"UNKNOWN"`; ignoreErrors does not reject business-invalid text |

This is why “turn on ignoreErrors” is not a general cure for missing data. It affects failed evaluation, not whether empty or misleading text counts as non-null.

## What if no acceptable alternative exists?

Suppose both name retrievals successfully return null. There is no non-null name option to select.

The design has not supplied a usable name. Verify the actual evaluation result or error in its use context, and resolve the missing information or agree on an explicit no-name policy. Do not infer that the identity is automatically cleared, that an old value is safely retained, or that a target should receive a blank.

A final fixed string can ensure that a later option is non-null, but it changes what the field means.

For a field explicitly defined as a display label, an owner might approve `"Name not supplied"` as a visible marker. That does not make the marker a person's actual name. It also needs a correction process and restrictions on where it may be reused.

For an employee number, a made-up fallback can destroy uniqueness or link the wrong records. For a department used in access decisions, defaulting unknown people to Finance can create an unjustified business fact.

A safe fallback is not necessarily a constant, and a constant is not safe simply because it removes a visible error.

The alternative should have the right meaning, an approved authority and a defined scope. If the field influences security decisions, inspect those decisions before introducing a default.

## Keep the unresolved condition visible

A **consumer** is a configuration or system that uses a value. A name label displayed to a reader and a department used to assign access are different consumers with different risks.

If a fallback masks missing data or an operation error, the current field value alone may no longer reveal why the preferred option was not used.

Keep evidence of the actual selected source and field, the option outcomes where available, the reason an alternative was allowed and the correction responsibility. Do not assume ISC stores a dedicated history of every firstValid branch or exposes a log for each candidate.

You can distinguish normal absence from defects through reviewed source records, collection evidence, actual evaluation errors and your operational checks. If branch-specific monitoring is required, design and verify it; a fallback definition does not create it automatically.

This diagram is a human investigation sequence, not a second algorithm that firstValid performs automatically:

```text
Fallback result is visible
             |
Which option supplied that result?
             |
Why was the preferred option not used?
       /           |            \
     null      rejected text     error
      |             |             |
Approved       Suitability     Explicit
absence?       rule applied?   error policy?
      |             |             |
Check data      Check rule      Investigate
contract        and producer    failed operation
       \            |            /
        Is the alternative approved?
                    |
        Verify applied value and uses

Non-null output does not close a defect.
```

The “rejected text” branch requires an implemented suitability rule. It is not a claim that bare firstValid rejected that text.

## A preview and an applied value answer different questions

The identity-profile **Preview** evaluates mappings for a selected identity using available data. In the main case, the expected preview result is `"Devi"` from givenName.

**Identity processing** reevaluates identity data and related decisions against the applicable configuration. Applying shared mapping changes can affect other identities governed by Employees, not just Devi.

**Provisioning** makes account or access changes in a connected system. A returned fallback value does not establish that a target change was configured or completed.

In the supplied fictional continuation, the team verifies the null-return case and error policy, checks the shared mapping's affected uses, previews Devi and completes authorized processing. Current identity evidence shows `I-84004.displayGivenName = "Devi"`.

The collected HR account still has preferredName null and givenName `"Devi"`. The fallback did not fill the preferred-name field in HR.

If HR later records preferredName `"Dee"`, the same ordered definition can return `"Dee"` when evaluated using that updated available data. Choosing a fallback once does not permanently lock the lower-priority value into the calculation.

Collection, relevant reevaluation and application still need evidence. No target update, account matching, employment-status change or access grant is supplied in this example.

## Test the distinction with changed facts

### 1. The first option returns null successfully

**Facts:** Preferred-name retrieval returns null without an error. Given-name retrieval returns `"Devi"`. The main definition explicitly sets ignoreErrors false.

Does false prevent the fallback?

**Reasoning:** No. The first outcome is null, not an error. FirstValid can consider the next option and return `"Devi"`. Error policy and null selection are separate decisions.

### 2. Both options contain names

**Facts:** Preferred-name retrieval returns `"Dee"`; given-name retrieval returns `"Devi"`. Both are approved strings, and the preferred option is first.

Which one is selected?

**Reasoning:** `"Dee"`. It is the first non-null result. FirstValid does not prefer the longer string or combine the names. Reversing the options would change the agreed priority.

### 3. The first option returns an empty string

**Facts:** Preferred-name retrieval returns `""`, given name is `"Devi"`, and ignoreErrors is true.

Will true make firstValid use the given name?

**Reasoning:** No. Empty text is a non-null result, not a failed operation. FirstValid selects it. A blank-aware business requirement needs a separate suitability decision; ignoreErrors does not supply one.

### 4. Spaces have been trimmed

**Facts:** A separately proposed candidate calculation trims preferred text `"   "` to `""`, then supplies that result as firstValid's first option. The second option is `"Devi"`.

Has trimming made the fallback work?

**Reasoning:** No. The trimmed result is still non-null. It must be converted into the approved “unavailable candidate” representation or handled by an explicit selection decision if the policy says whitespace-only preference should fall back. Do not describe trim as returning null here.

### 5. A placeholder looks present

**Facts:** Preferred-name retrieval returns `"UNKNOWN"`. Given-name retrieval could return `"Devi"`. The naming agreement rejects UNKNOWN as a name.

Does firstValid enforce that rejection?

**Reasoning:** No. It selects the non-null placeholder. Inspect the producer contract and any implemented suitability rule. A business-invalid string is not automatically an evaluation error.

### 6. The preferred retrieval fails

**Facts:** The first retrieval reports an evaluation error. The next option returns `"Devi"` if considered.

Compare explicit ignoreErrors false and true.

**Reasoning:** False stops selection at the failed option. True allows the next option to be considered and, under the supplied facts, returns `"Devi"`. With true, the underlying error still needs investigation and visibility; the alternative's availability does not repair it.

### 7. Every supplied option returns null

**Facts:** Both retrievals successfully return null. No final constant or approved no-name policy is configured.

Can you call the mapping successful because firstValid has two options?

**Reasoning:** No. There is no non-null candidate to supply the required business value. Inspect the actual evaluation result/error and correct the input or agree on an explicit response. The option count does not establish success, clearing, retention or delivery.

### 8. The preferred value arrives later

**Facts:** The main supplied continuation applied `"Devi"` from givenName. HR later supplies preferredName `"Dee"`, the updated value is collected, and Preview returns `"Dee"`. No subsequent application or target evidence is supplied.

What can you conclude?

**Reasoning:** The current evaluation follows the higher-priority option and returns `"Dee"`. Preview does not establish that the new value is applied to the identity or delivered elsewhere. Verify relevant processing and current identity evidence before extending that conclusion.

## Review a proposed department fallback

A project proposes this rule: use the recorded department when non-null; otherwise use the literal `"Finance"`. Department can influence access assignments. The owner has approved no such default.

For one record the department is null. For another it is `"UNKNOWN"`.

Would firstValid solve both records safely?

No. It could select Finance for the null case, but that would fabricate an unapproved department. It would select UNKNOWN for the other case because the string is non-null. Neither result establishes the person's real department.

Ask for the approved department authority, the meaning of missing and placeholder values, the response when no usable department exists, and the dependent access decisions. Define error handling separately from missing-value handling.

If an approved alternative source is introduced, verify the person/account selection, field meaning, freshness and priority before treating it as a fallback. Another available value is not automatically an authorized one.

A fallback is complete only when you can explain why the preferred option was not used, why the selected alternative is permitted and what happens to any unresolved defect.
