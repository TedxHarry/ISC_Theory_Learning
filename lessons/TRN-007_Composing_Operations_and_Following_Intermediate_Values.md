# What does each operation pass to the next one?

Devi, employee `87007`, works in Finance. HR stores her department code as `" fin "`, with one ordinary space before the letters and one after them.

The organization wants SailPoint Identity Security Cloud (ISC) to produce a review label reading `"Department: Finance"`.

Getting there takes more than changing letter case. We need to remove the surrounding spaces, produce the agreed uppercase code, translate that code and add the label text.

Each operation receives a particular value. If we lose track of that value, a definition can look reasonable while doing the wrong work.

Let's follow what actually passes between the operations.

## Agree on the result before assembling the calculation

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a connected system. An **attribute** is a named field on one of those records.

The **PeopleCore Production source** is SailPoint Identity Security Cloud's configured representation of HR worker records. It is authoritative for this employee population: its accounts establish identities through the Employees **identity profile**.

The profile is shared configuration governing those identities, including how their identity fields receive values.

Devi already has one correctly associated PeopleCore account, `pc-87007`, on her identity. We'll label the identity `I-87007`; that is a teaching label, not an actual ISC object ID.

**Account aggregation** reads account data into ISC. The relevant account and its departmentCode value have already been collected. There is no competing PeopleCore account in this example.

HR has approved this input agreement: surrounding ordinary spaces and letter-case differences do not change these department codes. FIN means Finance, ENG means Engineering and OPS means Operations.

That permission applies to this code field. It is not permission to uppercase people's names or remove meaningful characters from identifiers.

The organization has added a custom identity field called **Department Review Label**, with internal name `departmentReviewLabel`. “Custom” means the organization defined the field; its name does not create special ISC behavior.

The owner approves a visible `"Department: UNMAPPED"` marker for an unrecognized non-null code. This field is review-only. It does not assign access, change employment status or establish account ownership.

Other required identity fields are already valid.

An **identity attribute mapping** defines how the custom field receives its value. The calculation supplies the label; the mapping supplies its destination.

## Give every operation a small, explicit job

A **transform** is a configurable ISC object that retrieves or manipulates attribute data and returns a result. **Composition** means combining operations so that a returned result supplies another operation.

The value supplied to an operation is its **input**. The result it returns is its **output**. An **intermediate value** is an output used inside the larger calculation before its final result is returned.

A **string** is text. Our main input, cleaned code, translated department and completed label are all strings, but they have different meanings.

The participating operations have these jobs:

- `accountAttribute` retrieves departmentCode from Devi's associated account on the named source.
- `trim` removes surrounding whitespace.
- `upper` converts letters to uppercase.
- `lookup` compares a string with configured keys and returns the paired output, or a configured default when no key matches.
- `concat` joins configured string parts in their listed order. It inserts no separator that you did not supply.

A lookup **key** is the code to recognize, such as FIN. Its paired **value** is the output to return, such as Finance. The **default** here is UNMAPPED, the approved review marker, not a real department.

For the supplied record, the value trace is:

| Operation or composition point | Returned value and meaning |
|---|---|
| accountAttribute | `" fin "`, the collected HR code text |
| trim | `"fin"`, surrounding spaces removed |
| upper | `"FIN"`, the approved code representation |
| lookup | `"Finance"`, the approved label for that code |
| concat with literal `"Department: "` first | `"Department: Finance"`, the final review label |

Notice that upper does not know Finance is the department name. It returns FIN. Lookup performs that translation.

Likewise, concat does not discover a person's department. It assembles the parts it receives.

A **literal** is fixed text written into the definition. The literal Department prefix includes the colon and exactly one trailing space. Those characters are data, not formatting around the JSON.

## Read the nesting by asking what value is needed

The complete illustrative definition below uses **JSON**, a structured text format. Braces group named properties into objects. Square brackets contain an **array**, an ordered list.

The root, or outermost, operation is concat because the final job is assembling the label.

Its second list item is a lookup instruction. Lookup's input is an upper instruction. Upper's input is trim, whose input retrieves the source field.

```json
{
  "name": "Department review label inline",
  "type": "concat",
  "attributes": {
    "values": [
      "Department: ",
      {
        "type": "lookup",
        "attributes": {
          "input": {
            "type": "upper",
            "attributes": {
              "input": {
                "type": "trim",
                "attributes": {
                  "input": {
                    "type": "accountAttribute",
                    "attributes": {
                      "sourceName": "PeopleCore Production",
                      "attributeName": "departmentCode",
                      "accountReturnFirstLink": true
                    }
                  }
                }
              }
            }
          },
          "table": {
            "FIN": "Finance",
            "ENG": "Engineering",
            "OPS": "Operations",
            "default": "UNMAPPED"
          }
        }
      }
    ]
  }
}
```

This is an illustrative definition, not a tenant upload or an observed execution.

The root name identifies the transform. Nested operations have type and configuration; they are not separate named objects that must each be saved first.

`accountReturnFirstLink: true` tells accountAttribute to return the first selected account's field even if it is null. The unquoted true is a **boolean**, a yes/no setting. It does not manufacture a missing code.

Here, one account supplies a successful non-null string result.

Read inward to find the source of the data, then follow the returned values outward. The outer instruction cannot assemble the intended label from an unevaluated lookup definition. It needs the lookup's returned text.

The arrows below show those value dependencies, not private ISC services, separate jobs or a guaranteed low-level execution schedule:

```text
PeopleCore Production / pc-87007
departmentCode = " fin "
                |
         trim returns "fin"
                |
         upper returns "FIN"
                |
       lookup returns "Finance"
                |
"Department: " + returned "Finance"
                |
        "Department: Finance"
                |
Mapping -> departmentReviewLabel

Each arrow carries a returned value.
```

The conceptual sequence explains why the result follows. It does not claim that ISC exposes a stored trace row for each arrow or runs unrelated calculations in this diagram's order.

Reordering name, type and attributes as JSON properties does not reverse the value dependencies. Moving an operation to a different nesting position can.

The values array has a different role: its order determines where the joined parts appear. Swapping its two items would produce `"FinanceDepartment: "`, including the final space.

## The location of an operation changes what it can affect

Suppose upper is moved outside the completed concat expression.

It would receive `"Department: Finance"` and return `"DEPARTMENT: FINANCE"`. The uppercase operation would affect the prefix and translated label, not only the original code.

That is a valid text calculation, but it does not meet our approved output requirement.

Similarly, trimming only the completed label is different from trimming the code before translation. A final trim cannot go backward and change which code lookup received.

If an earlier lookup selected UNMAPPED, trimming the final label does not turn it into Finance. Correct the relevant input preparation or translation, rather than expecting a later cosmetic operation to repair an earlier decision.

Do not assume that every pair of operations can be exchanged. For this supplied code, trim followed by upper and upper followed by trim both produce FIN. That one equivalence does not establish that all operation orders are interchangeable.

Ask a narrower question: what exact value will the moved operation receive, and what will its parent receive afterward?

## Check meaning and data kind at every connection

An **input/output contract** states what an operation expects and what its caller can rely on receiving. It includes the value's meaning and its data kind, not only whether the text looks readable.

In the main trace, lookup receives a single normalized code string. It does not receive an account object, a list of codes or the JSON instructions themselves.

A **list** contains multiple values. If a changed source representation contains both FIN and ENG, the business requirement now needs to say which department should supply this label, or whether a different multi-department representation is needed.

Do not let accidental first-item selection or text conversion make that decision. Verify actual mapping and operation behavior for the supplied representation before reusing the single-string design.

A **null** result means no value. An empty string is text with zero characters. Whitespace-only text contains characters even if it appears blank.

Trimming ordinary spaces can produce empty text. That does not automatically turn the result into null, make it a known department code or establish an approved missing-data policy.

An **evaluation error** means an operation could not produce its normal result. A failed source retrieval is not a successfully retrieved unknown code.

Our lookup's default handles an unmatched string. It is not a general error handler for every nested operation. No final label is established by the main success trace when an essential input evaluation fails.

A deeper chain does not add missing-data handling by itself. Define it deliberately, and keep error handling separate from a normal unknown-code result.

## Reuse instructions without pretending they are saved results

Suppose another mapping also needs the cleaned uppercase PeopleCore department code.

Copying the retrieval, trim and upper configuration into both definitions can work, but later corrections would have two places to maintain.

ISC's `reference` operation lets one transform use an existing named transform's logic. It returns the referenced transform's evaluated result as part of the current calculation. A **caller** is the calculation using that shared definition.

Here is a proposed shared definition containing the source-bound code preparation:

```json
{
  "name": "Workforce department code",
  "type": "upper",
  "attributes": {
    "input": {
      "type": "trim",
      "attributes": {
        "input": {
          "type": "accountAttribute",
          "attributes": {
            "sourceName": "PeopleCore Production",
            "attributeName": "departmentCode",
            "accountReturnFirstLink": true
          }
        }
      }
    }
  }
}
```

It returns FIN for Devi's supplied account. It does not return Finance or Department: Finance.

The shared definition has a precise contract: it retrieves this identity's PeopleCore departmentCode, removes surrounding whitespace and uppercases it.

It is source-bound, meaning its instructions choose PeopleCore. Its name alone does not make it a general-purpose normalizer for arbitrary callers.

The following alternative label definition uses that shared calculation. Assume the named shared definition already exists for this illustration.

```json
{
  "name": "Department review label with reference",
  "type": "concat",
  "attributes": {
    "values": [
      "Department: ",
      {
        "type": "lookup",
        "attributes": {
          "input": {
            "type": "reference",
            "attributes": {
              "id": "Workforce department code"
            }
          },
          "table": {
            "FIN": "Finance",
            "ENG": "Engineering",
            "OPS": "Operations",
            "default": "UNMAPPED"
          }
        }
      }
    ]
  }
}
```

For reference, `attributes.id` contains the **name** of the existing transform to use. Despite the property's spelling, this example does not place a generated object identifier there.

If that name is wrong or the referenced definition is unavailable, investigate the configuration dependency. It is not an unknown HR code that the lookup's default automatically handles. If the name resolves to the wrong existing definition, inspect that definition's actual inputs and output rather than trusting its presence alone.

Lookup receives the result returned through reference, FIN, then returns Finance. Concat builds the same approved label as the inline version.

A reference is not a request to read a previously saved identity attribute called Workforce department code. Nor does it capture a permanent copy of FIN for every person.

The same instructions operate in the context of the identity being evaluated. Another identity with a correctly associated PeopleCore code ENG can receive ENG from the shared definition.

These arrows show which definitions depend on the shared one. They do not mean two callers share a single cached result or are evaluated together:

```text
Review label            Proposed code mapping
     |                            |
     +----- references name ------+
                    |
       Workforce department code
                    |
      PeopleCore read -> trim -> upper

Shared definition, not a saved code.
Each use needs its own evaluation context.
```

Reference reduces duplicated instructions. It also creates a shared change dependency. Review every caller before changing the shared definition's input, meaning or returned kind.

If it begins returning Finance instead of FIN, the label caller's code-key lookup no longer receives the value its contract expected.

Avoid direct or indirect self-reference. A definition that needs its own unfinished result does not provide an independently obtainable input. Keep a clear path from source data to final result rather than relying on an invented circular evaluation order.

## Follow explicit inputs through the referenced definition

An **implicit input** is supplied by the surrounding mapping or calculation context when an operation does not specify its own input. An **explicit input** is an instruction inside the definition that chooses what value to use.

Our code-preparation definition explicitly retrieves PeopleCore departmentCode. A different visible source selector on the mapping does not rewrite that nested instruction.

For a separate comparison, suppose Devi also has a correctly associated DirectoryRoster account `dr-87007` with department `"Legal"`. Changing a mapping's selector to that field does not by itself turn our explicit PeopleCore retrieval into a DirectoryRoster retrieval.

Open the actual definition, including references, before deciding where its data came from.

The reference operation can accept an explicit input, and reusable operations can be designed around caller-supplied data. That is a different contract from the source-bound definition shown here.

Do not assume an added outer input replaces every explicit retrieval deeper in the referenced logic. Verify the called definition and actual use context.

| Proposed change | What needs checking |
|---|---|
| Copy the shared code-preparation instructions inline | Copies have their own configuration; later shared edits do not automatically edit those copies |
| Reference the named shared definition | Every caller depends on its maintained meaning, input source and returned value |
| Change the mapping's visible source selector | Inspect explicit nested retrievals and references; selector text alone does not establish provenance |
| Change the shared output from code FIN to label Finance | Find callers that still expect codes and verify their translations and outputs |
| Add a new mapping that needs the same business value | Verify the same authority, identity/account context, data kind and error policy actually apply |

Do not remove an operation merely because it appears elsewhere in another mapping. An intermediate result inside one expression is not automatically a stored field available to another.

## Investigate the earliest disagreement, then prove the final result

Suppose a review label shows Department: UNMAPPED for someone whose approved department is Finance.

Work backward through the actual definition to identify the inputs, then trace those inputs forward. Is the selected account correct? What exact text was returned? What should trim and upper return under the agreement? Does the active lookup contain the approved code?

If a supplied intermediate already differs from the expected value, that gives you a narrower cause to investigate.

You do not need to blame the final concat for a wrong source code. Equally, a correct FIN intermediate does not prove the lookup's table or literal prefix is correct.

Use source records, saved definitions and available evaluation results as evidence. Do not assume the UI stores or exposes every intermediate result. A local step-by-step calculation is a reasoning check, not proof that the tenant executed the same definition against the same record.

A well-placed **fallback**, an approved alternative when a defined condition occurs, can be part of a design. But a broad fallback around the whole expression can hide whether retrieval, normalization, translation or assembly failed.

An operation called `firstValid` chooses the first configured non-null result. Returning a plausible constant through such a selector would not prove that the underlying chain was correct. Its error policy also needs an explicit decision.

Keep the reason for a substitute visible through verified operational evidence rather than assuming a friendly output closes the defect.

The profile's **Preview** evaluates mappings for a selected identity using available data. It can support the expected final result, but it does not automatically establish every employee's result or a historical intermediate trace.

**Identity processing** reevaluates identity data and related decisions against applicable configuration. Saving a referenced definition does not prove that every affected identity now has a newly applied result.

In the fictional continuation, the team checks representative inputs and callers, previews the chosen label design, reviews shared impact and completes authorized processing. Current identity evidence then shows `I-87007.departmentReviewLabel = "Department: Finance"`.

The collected PeopleCore code remains `" fin "`. No separate fin, FIN or Finance identity attributes were created by these nested steps.

**Provisioning** makes account or access changes in a connected system. This applied review label does not establish a write to HR, an access assignment or a change in a target application.

A **consumer** is a configuration or system that uses a value. If a consumer uses this field, verify its configuration and actual outcome separately.

## Change the connection and predict the result

### 1. The nested definition is mistaken for data

**Facts:** The lookup input contains an upper instruction, which contains trim and accountAttribute. The supplied raw value is `" fin "`.

Does lookup receive a JSON object to translate?

**Reasoning:** No. Those objects describe the nested calculations. Under the supplied successful evaluations, lookup receives their returned string FIN. It can then return Finance.

### 2. The composition list is reversed

**Facts:** Lookup returns Finance. Concat's original parts are `"Department: "` followed by that result. A proposed version reverses the two items without adding any separator.

What changes?

**Reasoning:** The result becomes `"FinanceDepartment: "`, with a trailing space. Array order determines assembly, and concat inserts no corrective punctuation. Rearranging unrelated JSON object properties would not have this effect.

### 3. Upper receives the finished label

**Facts:** A proposed version uppercases the entire correctly assembled string Department: Finance instead of only preparing the HR code.

Does it preserve the required label?

**Reasoning:** No. It returns DEPARTMENT: FINANCE. Moving an operation changes its input and the part of the result it can affect.

### 4. An unknown code survives cleanup

**Facts:** The collected string is `" zzz "`. Approved trim and upper return ZZZ. The table has no ZZZ entry and retains the UNMAPPED default.

What does the main expression return?

**Reasoning:** Department: UNMAPPED. Cleanup succeeded, translation selected the configured marker and assembly succeeded. The result does not identify a real department; the unrecognized code still needs investigation.

### 5. Retrieval fails before a usable code exists

**Facts:** The departmentCode retrieval reports an evaluation error. No separate error-handling composition is configured. The lookup still has its UNMAPPED default.

Does that default prove the final label can be returned normally?

**Reasoning:** No. An unmatched successfully supplied string and a failed retrieval are different paths. Investigate the actual evaluation error and approved handling. The normal FIN-to-label trace does not establish a result for this failed input.

### 6. The referenced output contract changes

**Facts:** The shared definition is changed through an approved proposal to return Finance, not FIN. The caller still has code keys FIN, ENG and OPS, plus the UNMAPPED default.

What should the caller review reveal?

**Reasoning:** Its input no longer meets the code contract. Finance matches none of those code keys, so the caller selects UNMAPPED and assembles Department: UNMAPPED. An approved shared change still requires coordinated caller changes and evaluation.

### 7. A source selector changes, but nested retrieval does not

**Facts:** The mapping's visible selection is DirectoryRoster department Legal. The referenced definition still explicitly retrieves PeopleCore departmentCode `" fin "`.

Which source does the shown logic use for code preparation?

**Reasoning:** PeopleCore. The explicit retrieval remains inside the shared definition. Inspecting only the visible selector would misidentify the input. Confirm the actual saved reference and its target definition before applying this conclusion to a real observation.

### 8. Preview succeeds after a shared edit

**Facts:** The referenced definition is saved. Preview for Devi returns Department: Finance. No affected-population application or target-system outcome has been checked.

Can you report that every caller's stored results and external systems are updated?

**Reasoning:** No. The selected Preview result supports that evaluated context. Review other callers and representative records, verify relevant processing and current values, and investigate any separately configured target delivery. A shared dependency expands review scope; it does not supply completion evidence.

## Trace a different composition without borrowing its meaning

A facilities feed supplies site code `" lon "`. Its owner approves surrounding-space removal and uppercase normalization; the translation table says LON means London.

A display needs `"Office: London"`.

Trace the values: collected text `" lon "`, trimmed `"lon"`, normalized `"LON"`, translated `"London"`, then assembled `"Office: London"`.

Would referencing Workforce department code solve that job?

No. That shared definition explicitly retrieves PeopleCore departmentCode. Similar-looking cleanup does not make its source or business meaning suitable for site data.

Design the site calculation around the approved facilities input. Reuse a genuinely input-driven helper only after verifying that its input contract and error behavior suit the caller.

Then ask what happens if LON is unknown, retrieval fails, or someone uppercases the final display instead of the site code. Check calculation and application separately.

When you explain a composed transform, do not stop at “it uses trim, upper and lookup.” Explain what each receives, what it returns, why the next operation can use that result and what evidence connects the final string to the intended record.
