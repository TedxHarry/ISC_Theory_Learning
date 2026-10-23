# The calculation returned a value. What actually went wrong?

Devi works in Engineering. Her employee number is 89009. HR supplies her department through the source called WorkforceLedger Production, which represents worker account data in SailPoint Identity Security Cloud, or ISC.

Her one WorkforceLedger account, `wl-89009`, is already correctly associated with her ISC identity. We will label that identity `I-89009` to keep the records distinct; this is a teaching label, not an actual ISC object ID.

The account data available in ISC contains `departmentCode = " ENG "`. There is one ordinary space before ENG and one after it. HR confirms that ENG means Engineering. The organization approves FIN as Finance. It does not approve Finance as a substitute when a department is missing or cannot be calculated.

Yet Preview shows Finance for Devi's identity department.

Where would you begin?

Changing Finance to Engineering in a fallback would make this one result look right. It would not tell us why the calculation failed to use the department already present on the account.

The records, configurations and investigation results below are fictional. They let us follow an incident without claiming that any change was made in a real tenant.

## First establish what “wrong” means

An **identity attribute** is a field on ISC's identity record, such as department. An **account attribute** is a field on a particular source account, such as departmentCode. They are separate fields even when one supplies the other.

An **identity profile** defines shared identity configuration for a population. Devi belongs to the Employees profile. Its department **mapping** tells ISC how to obtain the identity department value.

A **transform** is a calculation used to prepare a value. It can retrieve account data, change text, translate a code, or combine operations. Its returned value still needs to satisfy the business requirement.

In this example, three outcomes would mean different things:

| Observation | What you can conclude |
|---|---|
| The selected calculation reports an error | That evaluation did not successfully produce its normal result; investigate the failing operation and input |
| Preview returns Finance for Devi | A value was returned, but it contradicts the approved Engineering department |
| Preview returns Engineering, but the last checked identity department was Finance | The calculation result and historical applied evidence differ; check current identity data and relevant processing |

**Preview** evaluates mappings for a selected identity using available information. It does not prove that every identity has received the result.

An **applied value** is the value established on the identity record. **Identity processing** reevaluates identity data against applicable configuration and can update mapped fields.

At the beginning of this incident, Finance is a Preview observation. The current applied department has not yet been checked. We must not silently turn that into a claim that the live identity, every employee or an external account is wrong.

Write the expected result as a testable statement: “For I-89009, using account wl-89009 with departmentCode `" ENG "`, the approved department calculation should return Engineering.”

Now we have a specific result to explain.

## Keep the evidence before changing the definition

Before making a correction, preserve the affected identity and account identifiers, the governing profile and field, the saved mapping and transform definition, the available input, and the time and context of the observation.

If an error is visible, keep its actual text and surrounding activity context. Do not replace a specific error with “transform broken.”

For sensitive values, retain only the information needed in an appropriately protected investigation record. An exact string can matter without making an employee's entire record suitable for a public ticket.

Also record what has not been checked. For Devi, we initially have Preview Finance and the associated account's spaced code. We do not yet have current applied or external-system evidence.

Why preserve the saved definition?

Because changing it can remove the conditions that produced the incident. A successful test of your edited version does not explain which version produced yesterday's result.

If the previous definition or input was not retained, say so. Do not claim a historical reconstruction from today's configuration alone.

This is not a requirement to find a hidden trace screen. Use supported configuration, record, Preview and activity evidence that is actually available. ISC does not need to expose every intermediate value for you to reason about a small expression.

## Read the instructions that actually supply the value

The saved department calculation is:

```json
{
  "name": "Worker department with substitute",
  "type": "firstValid",
  "attributes": {
    "ignoreErrors": true,
    "values": [
      {
        "type": "lookup",
        "attributes": {
          "input": {
            "type": "accountAttribute",
            "attributes": {
              "sourceName": "WorkforceLedger Production",
              "attributeName": "departmentCode",
              "accountReturnFirstLink": true
            }
          },
          "table": {
            "ENG": "Engineering",
            "FIN": "Finance"
          }
        }
      },
      "Finance"
    ]
  }
}
```

This is a complete illustrative transform definition, not a deployed configuration.

JSON is the structured notation used here. Braces group properties; square brackets hold an ordered list. Quoted text is a string. The unquoted true is a boolean setting.

The root `type` is `firstValid`: the outer operation selects a result. Inside its values list, the first candidate is another calculation. The second is the literal string Finance.

The inner **accountAttribute** operation retrieves a named field from an account associated with the identity being evaluated. Its sourceName explicitly selects WorkforceLedger Production, and attributeName selects departmentCode.

The `accountReturnFirstLink: true` setting returns the first selected account's value even if it is null. Null means no value, rather than the text `"null"`. Here there is exactly one associated account on this source, so the example does not depend on choosing between several accounts.

The **lookup** operation translates an incoming string by matching a table key and returning its paired value. ENG maps to Engineering; FIN maps to Finance. No default is configured in this table. An input that matches no key produces an error.

The outer **firstValid** operation chooses the first candidate that evaluates to a non-null value. With `ignoreErrors: true`, it can proceed to the next candidate after a candidate errors.

“Valid” in this operation's name does not mean “HR has approved this as the employee's real department.”

Finally, the input is **explicit**: the definition itself says where to retrieve it. An **implicit input** would come from the surrounding mapping.

Changing a visible source selector on the mapping does not rewrite that nested sourceName instruction. Inspect both the mapping and the saved expression before concluding which source supplied the result.

## Follow the value until it stops meeting the contract

An **input contract** states what an operation needs from its input. Here, the lookup expects an exact approved code such as ENG or FIN.

What does the account read supply?

It supplies `" ENG "`, including both spaces. Retrieving the field does not itself normalize it.

Does that string match the key `"ENG"`?

No. The actual input contains additional characters. The supplied investigation confirms that evaluating this lookup candidate with that input reports an unmatched-key error. This is a fictional diagnostic observation, not a quotation of a tenant error message.

The candidate therefore does not successfully return Engineering. The enclosing firstValid is allowed to continue because ignoreErrors is true. Its next candidate is the non-null string Finance, so the outer calculation returns Finance.

Here is that value dependency. Arrows mean “supplies input or an outcome to,” not separate background jobs:

```text
I-89009 / account wl-89009
departmentCode = " ENG "
            |
            v
lookup keys: ENG / FIN
no match; no table default
            |
            v
candidate reports an error
            |
firstValid / ignoreErrors: true
            |
            v
next candidate: "Finance"
            |
            v
returned department: Finance

Returned text is not proof
of a correct department.
```

We have two defects with different responsibilities.

The lookup was given an unprepared code even though this field's agreement permits surrounding spaces to be removed.

The error-handling design then converted a calculation failure into an ordinary department. That substitute contradicts the business policy.

Correcting only one can leave the other behind. Adding trim while retaining the Finance substitute fixes the supplied spaced ENG case, but an unrecognized code can still be disguised as Finance.

Changing ignoreErrors to false would expose a candidate error. It would not remove the spaces or make the lookup accept the code. A diagnostic improvement is not yet a complete data correction.

## Test the explanation against competing causes

A final value of Finance does not, by itself, prove that fallback was used.

Suppose the account read returned FIN. The lookup could legitimately return Finance as its first candidate, without needing the substitute. You would then investigate why the selected account supplied FIN for this person.

Similarly, a lookup table could incorrectly contain `"ENG": "Finance"`. That calculation could run successfully while implementing the wrong business translation.

A diagnosis needs evidence that separates these possibilities.

For Devi, the supplied checks establish the exact associated account, the spaced ENG input, the saved ENG-to-Engineering table, the unmatched-key candidate error, and the outer Finance result. Together they support the missing-normalization and masking explanation.

If several source accounts exist, inspect which accounts are eligible and how the account retrieval filters, sorts and handles null values. A perfectly functioning lookup can translate the wrong account's code.

If the source display name changed, review the saved sourceName reference. It depends on that display name. Do not assume a similar-looking source is interchangeable.

If the expression uses **reference**, that operation reuses an existing named transform. Inspect the referenced definition as well as the calling calculation. A caller is simply a calculation that uses the shared logic.

Changing the shared definition can affect other callers. Editing a copied expression changes that copy instead. The visible outer JSON may not contain all the instructions involved.

If a date or clock comparison is involved, preserve the input representation and evaluation time too. A later test can differ legitimately when its time-dependent input differs.

Our main example does not use reference or the clock. These are additional dependencies to look for, not assumed causes of Devi's incident.

## Do not treat every kind of “blank” as the same failure

The repair must distinguish data states rather than making everything look populated.

| Available evidence | What still needs investigation |
|---|---|
| The field is absent, or an account read returns null | Collection, schema, account selection and the approved missing-value policy |
| The input is the empty string `""` | Whether empty text is allowed and how the actual operations handle it; non-null does not mean usable |
| The input contains only ordinary spaces | Normalization and the policy for the resulting empty text |
| The input is non-empty but unrecognized, such as OPS | Whether the code is legitimate, erroneous or not yet included in the approved translation |
| The account retrieval or nested operation reports an error | The failing dependency and its actual error; it is not proof of ordinary missing business data |

Missing means the needed information is unavailable. Empty means a string exists with no characters. A failure means an operation could not complete as intended. Those conditions can require different corrections.

FirstValid is not a general-purpose check for empty text, placeholders, business validity or correct account ownership.

Trim removes surrounding whitespace from a string. It does not decide whether an empty result is acceptable, whether OPS is a real department, or whether a list of values should be reduced to one string.

If an operation expects a single string but the selected field provides several values, review the schema, actual representation and approved selection rule. Do not silently choose the first entry just to avoid an error.

Likewise, “Unknown” can be a legitimate label in one business process and misleading data in another. A sentinel is an agreed marker for a special state, not an automatically safe fallback.

A sentinel needs defined meaning, consumers and follow-up. Replacing Finance with Unknown without that agreement is another unsupported design choice.

For this example, the owner requires a recognized department code. No missing-value substitute is approved. We must keep unresolved values visible for correction without inventing a department or prescribing an unverified universal clearing or retention behavior.

## Correct the cause and preserve the error policy

HR confirms that surrounding ordinary spaces are insignificant for this field. ENG and FIN remain the only approved codes in this example.

A proposed replacement explicitly trims the retrieved code before lookup and removes the unsupported substitute:

```json
{
  "name": "Worker department from approved code",
  "type": "lookup",
  "attributes": {
    "input": {
      "type": "trim",
      "attributes": {
        "input": {
          "type": "accountAttribute",
          "attributes": {
            "sourceName": "WorkforceLedger Production",
            "attributeName": "departmentCode",
            "accountReturnFirstLink": true
          }
        }
      }
    },
    "table": {
      "ENG": "Engineering",
      "FIN": "Finance"
    }
  }
}
```

Here the root operation is lookup. Its input is the result of trim, whose input is the retrieved account field.

For Devi, the successive values are `" ENG "`, then `"ENG"`, then `"Engineering"`. The output remains text; no number conversion or invented department is involved.

For a supplied FIN code, the result is Finance. Finance remains a valid translation, but it is no longer an unconditional rescue value.

For a supplied OPS string, trim leaves OPS unchanged. It matches neither approved key. With no lookup default or enclosing error-skipping fallback, the definition exposes an unmatched-key failure rather than returning Finance.

That is intentional visibility, not a claim that errors are desirable final business outcomes. Someone still needs to determine whether HR must correct OPS or the approved table must be extended.

Do not add OPS-to-Engineering merely because it makes a test green. A mapping between business codes and departments needs the responsible owner's approval.

The replacement also does not specify a complete null/empty policy. Before applying it to a population that can contain those states, establish the required handling and verify the relevant operations in that context. Do not claim that any failure automatically clears, preserves or replaces the stored identity department.

## Verify a correction at the place it is supposed to work

First test the explanation against representative inputs: spaced ENG, ordinary ENG, FIN, an unknown code, empty text, null, and any supported multiple-account situation. Not every case is expected to succeed.

For unknown or unusable inputs, verify that the approved failure or exception handling remains visible and actionable. A test passes when the observed behavior meets the requirement, not merely when an output box contains text.

Use the intended context. Devi's example is an Employees identity-profile department mapping. A test of one field in a separate account-creation configuration is not evidence that this mapping works.

Then review the change's scope before applying it. A shared profile mapping can affect many identities. A referenced transform can affect multiple mappings. Identify consumers of department, especially configurations that use it to decide access, before changing shared logic.

A **consumer** is a process or system that uses the field. **Provisioning** makes account or access changes in a connected system. **Attribute synchronization** is separately configured identity-to-account updating for selected attributes.

Correcting the identity calculation does not establish any of those external outcomes.

The following is a human investigation and verification path, not a guaranteed ISC execution sequence:

```text
Preserve the observed evidence
              |
              v
Identify actual context and input
              |
              v
Explain the failing or wrong step
              |
              v
Approve a cause-based correction
              |
              v
Test intended and exception cases
              |
              v
Check relevant application
and current identity value
              |
              v
Verify each required consumer

Do not skip from a good Preview
to a confirmed external outcome.
```

In our fictional continuation, the corrected definition returns Engineering in Preview for Devi. Relevant identity processing and a separate current identity observation then confirm department Engineering.

These are supplied observations, not a promise of immediate processing or a recipe requiring a manual step after every account update.

Devi also has a ProjectDirectory account, `pd-89009`, whose department is Finance. No ongoing department update is configured for that account in this example.

Its unchanged Finance does not refute the corrected identity calculation. If the business requires an account update, it needs a separately authorized, supported update mechanism and result verification.

An identity department used in an access condition requires another distinction: a corrected field does not prove that every dependent assignment was reevaluated or that every resulting external change completed.

A useful incident conclusion states the original defect, the correction and the verified boundary. For example:

“The selected lookup received spaced ENG, failed to match, and the error-skipping fallback returned Finance. The approved replacement trims the source string and removes that substitute. Preview and current identity evidence confirm Engineering for I-89009. ProjectDirectory department has not been updated; no ongoing update is configured.”

That conclusion explains more than “transform fixed.”

## Work through the investigation decisions

### 1. The returned value is plausible

**Facts:** Preview returns Finance. The saved definition contains the Finance substitute, but the selected account input has not been checked.

Can you conclude that fallback was used?

**Reasoning:** No. FIN could have matched successfully, a translation could be wrong, or the substitute could have been selected after a failure. Inspect the exact input, selected account and saved operations. A plausible output alone does not establish its path.

### 2. The failing candidate is now known

**Facts:** The selected account supplies `" ENG "`. The lookup has only ENG and FIN keys, with no default. The supplied diagnostic confirms an unmatched-key error. The enclosing firstValid has ignoreErrors true and Finance next.

Why can the outer result still be Finance?

**Reasoning:** The error-skipping setting permits continuation. The literal next candidate is non-null and is returned. The nested candidate failed while the outer expression still supplied text; that text violates Devi's approved department requirement.

### 3. Error visibility is restored

**Facts:** Someone changes ignoreErrors to false. The spaced input and lookup remain unchanged.

Has the department calculation been repaired?

**Reasoning:** Not completely. The unmatched input remains. The change stops this firstValid from skipping the error, but the input still needs approved preparation or correction. Error policy and data correctness are separate responsibilities.

### 4. One example passes after adding trim

**Facts:** Trim is added before lookup, but the original error-skipping Finance substitute remains. Devi now gets Engineering. A supplied OPS code still causes an unmatched-key error inside lookup.

Is the unsupported-department problem resolved?

**Reasoning:** No. The same fallback can still turn OPS's failed translation into Finance. Remove or redesign the substitute according to approved policy, and keep unknown codes visible for investigation. One successful record does not cover exception behavior.

### 5. The corrected input is an empty string

**Facts:** A collected string contains only ordinary spaces. Trimming produces `""`. The owner has not approved an empty department or substitute.

Should the engineer treat it as a usable department because it is non-null?

**Reasoning:** No. The business requirement is a recognized code, not merely a non-null value. Establish how empty input is handled in the actual calculation and agree the missing-data response. Do not assert an unverified stored-value outcome.

### 6. The source record looks correct

**Facts:** HR's own record now contains ENG, but the exact associated account available in ISC still contains FIN. The saved lookup correctly translates FIN to Finance.

Must the lookup table change?

**Reasoning:** No. It is translating its available input correctly. Investigate collection, observation times and account selection. Account aggregation reads account data into ISC; evaluating an accountAttribute expression is not itself a fresh live HR read.

### 7. Preview is correct after the repair

**Facts:** Preview returns Engineering. The last checked identity department was Finance before the repair. No new current identity observation or processing evidence has been collected.

Is the applied department definitely Engineering, or definitely still Finance?

**Reasoning:** Neither conclusion follows yet. Check the current identity field and relevant processing. A good Preview is not application evidence, and a historical Finance observation is not proof of today's current value.

### 8. An external account has not changed

**Facts:** Current identity department is verified as Engineering. ProjectDirectory pd-89009 remains Finance. No ongoing department update is configured.

What remains unresolved?

**Reasoning:** The identity result is verified. Whether the target should change is a separate requirement. If required, identify and authorize the supported update path, then verify its result. Do not alter a correct identity transform merely to conceal an absent target-update mechanism.

## Investigate an unfamiliar value without hiding it

A facilities team reports that an employee is assigned to the wrong building in ISC.

The selected account supplies `siteCode = " DAL "`. The approved lookup contains DAL-to-Dallas and AUS-to-Austin, with no default. An outer firstValid skips errors and supplies Austin as its next candidate.

The current selected Preview returns Austin. No current applied or external-system observations are supplied. Surrounding ordinary spaces are confirmed insignificant for siteCode.

Would replacing the substitute with Dallas resolve the design?

Trace the string first. The spaced value does not match DAL. The failed candidate can be skipped, allowing Austin to be returned. Changing the substitute to Dallas would hide the same defect for another site.

Prepare the approved input before translation and remove or redesign the unsupported substitute. Test both sites and an unrecognized code such as BOS. An unknown building must not silently become a known one just to populate the field.

Before applying shared changes, identify other mappings and consumers. Then distinguish the selected calculation result, current identity field and any required external update.

The investigation is complete only to the boundary supported by evidence. If a required input, historical definition or consumer result is unavailable, state what remains unknown and who must supply it. A truthful unresolved item is more useful than a confident but invented explanation.
