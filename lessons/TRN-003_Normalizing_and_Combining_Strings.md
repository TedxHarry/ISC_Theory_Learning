# Which characters should this calculation keep?

Devi, employee `83003`, already has an employee identity in SailPoint Identity Security Cloud (ISC). HR supplies her given name as `" Devi "` and family name as `" Rao "`.

The approved display name is `"Devi Rao"`: preserve the supplied spelling and letter case, remove surrounding spaces from each part, and put one space between them.

You could combine the raw fields first and remove spaces only from the outside of the finished result. Or you could remove surrounding spaces from each part before combining them.

Would those instructions produce the same text?

Let's follow the characters. A calculation can look reasonable while leaving exactly the defect it was supposed to remove.

## First agree what the result is meant to be

A **string** is a text value. Letters, digits and spaces can all be characters in that value. In our examples, quotation marks show where a string starts and ends; the marks themselves are not part of the stored name.

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a connected system, and an **attribute** is a named field on that record.

A **source** is ISC's configured representation of a system or account-data collection. Here, **WorkforceBook Production** represents HR worker records.

The Employees **identity profile** is the shared configuration governing employee identities, including their attribute mappings. WorkforceBook is authoritative for this population: its worker accounts establish employee identities through that profile.

Devi's account `wb-83003` is already correctly associated with her identity. We'll call the identity `I-83003`, a teaching label rather than an actual ISC object ID.

**Account aggregation** reads account data into ISC. It has already collected the following single-valued strings from the correct WorkforceBook account. No other account on that source competes to supply these fields.

| Field or requirement | Supplied value or approved rule |
|---|---|
| WorkforceBook `givenName` | `" Devi "`, with one space at each end |
| WorkforceBook `familyName` | `" Rao "`, with one space at each end |
| Identity Display Name, `displayName` | `"Devi Rao"` for these supplied inputs |
| Permitted changes | Remove surrounding spaces from each part; insert one space between the parts |
| Characters to preserve | Supplied letters, case and meaningful punctuation or interior spaces |
| Scope | Display text only; no username, email, employee-number or account-ownership change |
| Other identity data | Required attributes are already valid; both name parts are available |

This rule is an example agreement, not a universal naming convention. Another population may need family name first, a preferred name, a single name or a different display format.

The source owner's agreement tells us which changes preserve the intended name. The availability of a string operation does not authorize every possible alteration.

## Normalization changes a representation, not a person's facts

**Normalization** means converting agreed equivalent forms into a consistent representation.

Removing accidental surrounding spaces can be normalization. Changing every name to lowercase is not automatically appropriate just because lowercase text is consistent.

A **transform** is a configurable ISC object that retrieves or manipulates attribute values and returns a result. Its **input** is the data it receives; its **output** is the result it returns.

For this work, distinguish the operations by what they actually change:

- `trim` removes whitespace from the beginning and end of a string.
- `lower` converts letters to lowercase.
- `upper` converts letters to uppercase.
- `concat`, short for concatenation, assembles strings in the configured order.

Whitespace includes spaces and other spacing characters. Our worked calculations use ordinary spaces, so we can count the exact characters without assuming how every possible invisible character will be handled.

Trim does not remove spaces inside a name. Lower and upper do not remove surrounding spaces or insert a separator.

For Devi's approved display format, we need trim and concatenation. We do not need lower or upper.

If the source contains `"devi"` but the approved spelling is `"Devi"`, do not claim that the main calculation will discover the intended spelling. It preserves the supplied case. Either the approved input or the agreed formatting requirement needs attention.

## Combining text requires an explicit order and separator

A **separator** is text placed between components. For this display name, it is one literal space, `" "`.

**Literal** means the configuration contains the actual characters to use, rather than an instruction to retrieve them from a record.

The intended composition is:

`"Devi"` followed by `" "` followed by `"Rao"`.

The result is `"Devi Rao"`.

Concatenation does not recognize which values are names. It does not insert a space because two people would expect one, or swap the components because a family name appears first in another convention.

If you omit the separator, the same components produce `"DeviRao"`. If you reverse the components while retaining the space, they produce `"Rao Devi"`.

The separator is part of the result, not formatting decoration around the configuration.

Now compare the raw values. Combining `" Devi "`, one literal space and `" Rao "` produces `" Devi   Rao "`.

There are three spaces between the words: the first field's trailing space, the literal separator and the second field's leading space.

Trimming that combined string removes its outside spaces, leaving `"Devi   Rao"`. The three interior spaces survive.

This conceptual comparison counts returned text, not private ISC processing stages.

```text
Trim only after combining:
" Devi " + " " + " Rao "
              |
       " Devi   Rao "
              |
          trim outside
              |
        "Devi   Rao"
    Three spaces remain inside.

Trim each component first:
" Devi "              " Rao "
    |                     |
   trim                  trim
    |                     |
 "Devi"                 "Rao"
    +------ " " ----------+
              |
            concat
              |
         "Devi Rao"
      One separator inserted.
```

The plus signs in the diagram mean “assemble these strings”; they are not ISC configuration syntax or arithmetic.

The difference follows from where trim is placed. Once unwanted spaces sit inside the combined string, an outside-only operation cannot remove them.

## Read the calculation that implements the approved rule

An **identity attribute mapping** tells ISC how to supply an identity field. Employees uses the following illustrative transform for `displayName`.

The `accountAttribute` operation retrieves a named field from an account associated with the identity being evaluated, on the configured source. Each trim below explicitly retrieves its own field.

These are **nested transforms**: an operation's result supplies another operation's input. No branch is relying on an unexplained default name value.

The definition uses **JSON**, a structured text format. Braces group named settings. The `values` setting contains an **array**, an ordered list inside square brackets. Its order determines the composition.

```json
{
  "name": "Approved employee display name",
  "type": "concat",
  "attributes": {
    "values": [
      {
        "type": "trim",
        "attributes": {
          "input": {
            "type": "accountAttribute",
            "attributes": {
              "sourceName": "WorkforceBook Production",
              "attributeName": "givenName"
            }
          }
        }
      },
      " ",
      {
        "type": "trim",
        "attributes": {
          "input": {
            "type": "accountAttribute",
            "attributes": {
              "sourceName": "WorkforceBook Production",
              "attributeName": "familyName"
            }
          }
        }
      }
    ]
  }
}
```

This is a complete illustrative definition, not a tenant upload or a report of actual execution.

The root `type` is `concat`. Its `attributes.values` array contains three items: the first trimmed result, the literal space and the second trimmed result.

The first accountAttribute retrieves `givenName = " Devi "`; its enclosing trim returns `"Devi"`. The other retrieves `familyName = " Rao "`; its trim returns `"Rao"`.

Concat places those returned strings around the literal space in array order. It returns `"Devi Rao"`.

The transform name does not choose the destination field. The identity-profile mapping establishes that use.

Both retrievals explicitly name WorkforceBook and their respective account fields. A different source selector on the mapping screen would not replace those explicit input references. Investigate the actual definition and associated accounts when the result does not match the expected source data.

The selected identity matters too. The same instructions can return a different person's name when evaluated for that person's associated account. Formatting does not prove that the account belongs to the correct identity; that relationship needs its own evidence.

## What is different about the join operation?

ISC also provides `join`. It assembles a configured list of values with a separator between the items.

With concat, our space is an item in the `values` list. With join, it can instead be the `separator` setting.

This separate fixed-value illustration returns `"Devi Rao"`:

```json
{
  "name": "Illustrate a name separator",
  "type": "join",
  "attributes": {
    "values": ["Devi", "Rao"],
    "separator": " "
  }
}
```

Those literal names are there to show the operation. They are not a replacement for dynamic per-person account retrieval in the main definition.

Join defaults to a comma separator when no separator is supplied. For the two fixed values above, omitting `separator` would yield `"Devi,Rao"`, not the approved display name.

Neither operation makes its own business decision about which name parts are required or in what order they belong.

The configured `values` array also does not mean “automatically transform every value of a multi-valued account field.” A **multi-valued attribute** holds a list rather than one scalar value. Identity-profile mapping transforms have a documented first-value/single-result boundary for multi-valued input.

Our fields each contain one string. If that changes, verify the actual input handling and intended result before reusing this design for a list.

## Choose case conversion for a specific field, not for every field

Consider a separate department field. Its approved representation is lowercase, and the selected input is `" Finance "`.

Trimming then lowercasing gives `"finance"`. That is a different requirement from preserving the spelling and case of a display name.

For a region code whose approved representation is uppercase, `" us "` can become `"US"` through trim and upper. This does not prove that US is a valid code for every field: changing case is not validating or translating its meaning.

These are independent field agreements, not new facts about Devi's employment.

| Proposed operation on the supplied text | Result and boundary |
|---|---|
| Trim `" Finance "` | `"Finance"`; case is unchanged |
| Lower `" Finance "` | `" finance "`; surrounding spaces remain |
| Upper `"us"` | `"US"`; the letters change case, but their business meaning is not checked |
| Trim `"De la Cruz"` | `"De la Cruz"`; interior spaces remain |
| Main display calculation with family name `" O'Neil "` | `"Devi O'Neil"`; meaningful punctuation is preserved |
| Concat `"PLANT-"` with code string `"0073"` | `"PLANT-0073"`; digits remain text, not the number 73 |

A display name with accents or a hyphen does not become invalid merely because another system accepts fewer characters. Establish that system's rule and the approved adaptation separately.

For instance, converting `"A-B"` and `"AB"` to the same punctuation-free form `"AB"` loses a distinction. If those were identifiers, two different inputs would now collide.

A **collision** occurs when different records receive the same supposedly distinguishing value. A normalization decision can create one even when the source inputs were distinct.

Do not remove characters just because a shorter result looks cleaner. Identify the requirement, allowed change and information lost.

## A completed string is not necessarily a complete business value

Our successful trace assumes both components exist and contain usable names.

An **empty string**, `""`, has no characters. **Null** means no value. Whitespace-only text contains characters that may disappear when trimmed. These are different input conditions.

If `familyName` contains only ordinary spaces, trim returns an empty string. Keeping the same literal separator would compose `"Devi "`.

Trimming the final result as well could hide that trailing space, but it would not establish whether `"Devi"` alone is an acceptable display name for this population.

Some people legitimately have a single name. Others have missing data that needs correction. The calculation cannot decide which case applies from “there is no family-name text” alone.

A **fallback** is an agreed alternative used under specified conditions. If a single-name format is approved, the design needs to express when that format applies. It must not invent a family name or silently classify every missing input as a legitimate single-name record.

An operation error is different again. Do not assume every missing value becomes an empty string or that every transform silently skips it. Our main definition provides no missing-data policy and no universal null-handling guarantee.

Inspect the actual inputs and evaluation before deciding whether the problem is missing data, unsupported input, a failed operation or a successful but unacceptable string.

## Does a readable name make a safe username?

No. Display text helps people recognize a record. It is not necessarily unique, immutable or suitable for another system's identifier rules.

Two different employees can both be called Devi Rao. Trimming and joining their names can correctly produce the same display name for both.

That does not mean their accounts should share an owner or login.

If a project proposes a name-derived target login, it needs the target's character and length rules, a uniqueness strategy, handling for name changes, and a response when a candidate is already in use.

An email-shaped result also does not prove that a mailbox exists or that the address was assigned by the system that owns email.

The main definition does none of that work. It supplies displayName. Do not turn a display calculation into account creation, email ownership or account matching by changing its label.

## Verify the returned text and its separate effects

The identity-profile **Preview** evaluates mappings for a selected identity using available data. For Devi and the main definition, the expected display result is `"Devi Rao"`.

Compare exact characters, not just how closely the text resembles a name. Extra spaces can be hard to spot in a normal page.

An **intermediate value** is a result passed between operations. Here, `"Devi"` and `"Rao"` are the trimmed intermediate values. Writing them out with boundaries helps locate a defect without pretending ISC exposes a separate log line for each calculation.

**Identity processing** reevaluates identity data and related decisions against the applicable configuration. Applying a shared mapping change can affect other identities governed by that profile, not only the person selected in Preview.

A **consumer** is a configuration or system using the result. **Provisioning** makes account or access changes in a connected system. A returned display string does not establish that a consumer ran or that a target field was updated.

This is a human evidence sequence, not a guaranteed ISC backend pipeline:

```text
Human checks for this display value
               |
Correct identity, source and account?
               |
Exact givenName and familyName inputs?
               |
Each trim result preserves meaning?
               |
Array order and separator correct?
               |
Preview returns "Devi Rao"?
               |
Authorized processing applied it?
               |
Current identity displayName correct?
               |
External change actually required?
        /                  \
       no                  yes
       |                    |
No write inferred    Check configured path,
                     operation and target
```

In the supplied fictional continuation, the team checks the shared change, previews the intended inputs and completes authorized processing. Current identity evidence then shows `I-83003.displayName = "Devi Rao"`.

The collected HR fields remain `" Devi "` and `" Rao "`. The calculation did not repair HR or write those trimmed strings back to its record.

No target update, login creation, mailbox creation or account-ownership change is supplied.

## Work through the changed conditions

### 1. Only the finished name is trimmed

**Facts:** The calculation concatenates raw `" Devi "`, `" "` and `" Rao "`, then trims the result.

Does it meet the approved one-space-between-components rule?

**Reasoning:** No. Concatenation returns `" Devi   Rao "`; trim returns `"Devi   Rao"`. Outside spaces are removed, but the three interior spaces survive. Trim the components before combining them for this requirement.

### 2. The separator is removed

**Facts:** Each component is correctly trimmed to `"Devi"` and `"Rao"`. The concat values list contains only those two results.

What is returned?

**Reasoning:** `"DeviRao"`. Concat does not infer a missing space. Add the approved literal separator as an item, or use join with the correct separator and the same selected component values.

### 3. A family name contains meaningful spaces

**Facts:** Given name is `" Devi "`; family name is `" De la Cruz "`. The main trim-per-component and single-separator design is used.

Should the interior spaces disappear?

**Reasoning:** No. The trimmed family component is `"De la Cruz"`, so the final result is `"Devi De la Cruz"`. Trim removes surrounding whitespace, not interior word boundaries.

### 4. Lowercase is added around the whole display calculation

**Facts:** The main definition returns `"Devi Rao"`. A separate proposed definition applies lower to that result. The approved display rule still requires supplied case.

Is the new result acceptable?

**Reasoning:** Lower returns `"devi rao"`, which violates the stated rule. The operation can work correctly while the design is wrong. Retain case unless an approved requirement calls for changing it.

### 5. Join has no separator setting

**Facts:** A join definition has fixed values `["Devi", "Rao"]` and no `separator`.

Will it return the same text as the main display calculation?

**Reasoning:** No. Join's default comma produces `"Devi,Rao"`. Set a space explicitly for this requirement. Do not assume a default is selected from the field's meaning.

### 6. One component contains only spaces

**Facts:** Given name is `"Devi"`; family name is three ordinary spaces. Each is trimmed before combination with one literal separator. The organization has not approved a single-name fallback.

Would an extra final trim solve the business problem?

**Reasoning:** It could remove the trailing separator from the composed `"Devi "`, but it would not establish whether a single-name display is legitimate or HR data is missing. Agree on the condition and response. A more polished result is not evidence that the required information exists.

### 7. The result is proposed as a unique login

**Facts:** Two distinct employees have the same supplied name components. Both display calculations return `"Devi Rao"`. A target system requires distinct logins.

Can concatenation alone meet the target requirement?

**Reasoning:** No. The identical outputs demonstrate that name composition is not a uniqueness strategy. Keep the people and their account relationships distinct, and design approved target-identifier generation and collision handling separately.

### 8. The identity is correct but a target still has old text

**Facts:** Current identity displayName is `"Devi Rao"` after relevant processing. A connected application's display field still contains extra spaces. No configured write path or operation evidence is supplied.

Which result has been established?

**Reasoning:** The identity value is correct. Target delivery has not been established. Check whether that field should be updated through a configured consumer, then inspect the relevant operation and current target record. Repeating string normalization does not create an absent delivery path.

## Apply the same reasoning to a different display requirement

A second population requires `family name + ", " + given name`, preserving supplied case and interior punctuation.

For the supplied components `" Ana "` and `" O'Neil "`, what should the calculation do? What would you check before accepting the result?

Trim each component, keep the apostrophe, put family name first, insert the literal comma-and-space separator, then add the given name. The expected text is `"O'Neil, Ana"`.

Check the approved field meanings and actual associated-account inputs, component results, ordering and exact separator. Test a missing component and a legitimate name containing spaces; do not silently invent a new naming policy for either.

Use Preview for the selected calculation, then verify application to the identity after authorized processing. Check external effects only where a separate configured use requires them.

The useful question is not “Which cleaning operations can I add?” It is “Which characters must change, which must remain, and how does each instruction produce that exact result?”
