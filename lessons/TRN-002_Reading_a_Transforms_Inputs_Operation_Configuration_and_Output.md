# What is this transform actually going to return?

Devi, employee `82002`, already has an employee identity in SailPoint Identity Security Cloud (ISC). Her collected HR account contains the department text `" Finance "`, with one space before the word and one after it.

The approved identity value is `"finance"`: lowercase, without those surrounding spaces.

Someone gives you a transform named **Department text for Employees**. Its name sounds suitable. But how would you establish what it reads, what it does and whether its result meets that requirement?

We need to read the instructions, not guess from the label.

## Establish which data the instructions can use

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a connected system. An **attribute** is a named piece of information on a record.

A **source** is ISC's configured representation of a system or collection of account data. In this fictional design, **StaffRoster Production** represents employee records from HR.

The Employees **identity profile** is the shared configuration governing these employee identities, including how their identity attributes receive values. StaffRoster is authoritative for this population: its worker accounts establish employee identities through that profile.

Devi's StaffRoster account `sr-82002` is already associated with her identity. We'll label that identity `I-82002` for the explanation; this is not an actual ISC object ID.

**Account aggregation** reads account data into ISC. It has already collected the correct StaffRoster record. The available account attribute `departmentLabel` contains a single text value, `" Finance "`.

A text value is also called a **string**. The quotation marks in our displayed values mark the beginning and end of the string; they are not part of Devi's department. The spaces inside them are part of the input.

The organization has approved removing surrounding spaces and converting the department label to lowercase. We are not inventing a new department or translating a code.

Employees maps identity Department, whose internal field name is `department`, using the supplied transform. Other required identity fields are already valid. Devi has exactly one associated StaffRoster account.

That establishes the data and requirement. Now we can interpret the calculation.

## Read the object as a set of instructions

A **transform** is a configurable ISC object that retrieves or manipulates attribute data and returns a result.

An **input** is the value an operation receives. An **operation** is the action it performs. Its **output** is the result it returns. **Configuration** supplies the settings that tell that operation which data to use or how to behave.

Here is a complete illustrative transform definition for this example. It is not a command, an API response or evidence that anything has been uploaded to a tenant.

ISC represents transform definitions using **JSON**, a text format for structured data. A JSON **object** groups named properties and their values inside braces, `{` and `}`.

Each property has a name, a colon, then its value. A value can be another object, which is how one instruction can contain another. Commas separate properties. Double quotes identify property names and string values.

Three operation names appear below. `accountAttribute` retrieves a named field from an associated account on a selected source. `trim` removes surrounding whitespace. `lower` converts letters to lowercase. Their nesting determines how one operation supplies another's input.

```json
{
  "name": "Department text for Employees",
  "type": "lower",
  "attributes": {
    "input": {
      "type": "trim",
      "attributes": {
        "input": {
          "type": "accountAttribute",
          "attributes": {
            "sourceName": "StaffRoster Production",
            "attributeName": "departmentLabel"
          }
        }
      }
    }
  }
}
```

Don't try to memorize the brace pattern. Follow what belongs to each object.

The outermost object is the **root** transform. It has `name`, `type` and `attributes` properties.

The name, `Department text for Employees`, identifies the transform to a person selecting or inspecting it. The name does not perform any calculation.

The root `type` is `lower`. That selects lowercase conversion. Naming a transform “Uppercase Department” would not make this definition uppercase anything while its type remained `lower`.

The root `attributes` object contains configuration for that lower operation. Its `input` property supplies another transform object, whose type is `trim`.

The trim operation removes whitespace from the beginning and end of its input string. It has its own `attributes` object and its own `input`.

That next input is an `accountAttribute` transform. Its job is to find an account on the specified source associated with the identity being evaluated and return the named account field.

Here, `sourceName` selects `StaffRoster Production`, and `attributeName` selects `departmentLabel`. Neither property contains Devi's actual department value. They describe where to obtain it.

These inner objects are **nested transforms**: transform instructions placed inside other transform instructions. In this definition, only the root has a name. The nested objects use their types and settings directly; they are not separate named definitions that you need to find elsewhere.

## The same word can describe different things

Look at `attributes` and `attributeName` carefully.

The transform's `attributes` object is a settings container. It does not mean “all identity attributes,” and it does not copy the HR account's fields into the identity.

The `attributeName` setting inside `accountAttribute` identifies a particular account field to retrieve. Its value is the literal field name `departmentLabel`.

Identity `department` is a different field. The identity-profile mapping tells ISC where the transform's final result belongs.

Nothing in the root name automatically chooses identity Department. The same definition's use must be established from the mapping or other configuration that calls it.

| Part of this definition or its use | What it controls |
|---|---|
| Root `name` | The human-readable name of this transform, not the returned department |
| Root `type: lower` | The outer operation: lowercase conversion |
| Root `attributes.input` | The trim calculation that supplies lower's input |
| Trim's `attributes.input` | The account-field retrieval that supplies trim's input |
| Retrieval's `sourceName` | The named source on which to find the identity's associated account |
| Retrieval's `attributeName` | The account field to return: `departmentLabel` |
| Identity-profile mapping | The use of the final result for identity `department` |

When someone says “the attribute is wrong,” ask which one they mean. A wrong account-field reference, a wrong transform setting and a wrong identity destination need different corrections.

## Follow the values from the inside outward

The root operation appears near the top of the JSON, but it needs the result of its input.

Lower cannot convert the letters until trim supplies a string. Trim cannot remove the surrounding spaces until the account-field retrieval supplies a string.

For these instructions, the dependency is:

1. Obtain StaffRoster `departmentLabel` from the account associated with the identity being evaluated.
2. Give that value to trim.
3. Give trim's result to lower.
4. Return lower's result to the configuration using this transform.

These are value dependencies, not a claim that ISC implements four private services or exposes four corresponding log events.

For Devi, the retrieved value is `" Finance "`. Trim returns `"Finance"`. Lower returns `"finance"`.

The diagram follows that value dependency. Arrows mean “returns the input needed by the next operation.” They do not mean “writes a changed value back to the previous record.”

```text
Evaluating for identity I-82002
              |
StaffRoster Production / sr-82002
              |
Read departmentLabel
         " Finance "
              |
trim receives " Finance "
trim returns "Finance"
              |
lower receives "Finance"
lower returns "finance"
              |
Result for the department mapping

HR input is not rewritten.
Returned result is not delivery proof.
```

We can now justify the result without relying on the transform's name.

Also notice the intermediate value `"Finance"`. It is the output of trim and the input of lower. An **intermediate value** is a result passed between operations before the final result.

That intermediate value helps you explain a problem. If the final string still has surrounding spaces, ask whether the definition actually includes trim in the input path being evaluated. Don't assume a transform called “Clean Department” contains the necessary operation.

These calculations return values. They do not store each intermediate value as a new identity attribute merely because it appears in our trace.

## What if the input is not written inside the definition?

Compare the previous definition with this separate example:

```json
{
  "name": "Lowercase mapped department",
  "type": "lower",
  "attributes": {}
}
```

The empty object `{}` contains no additional settings. In particular, it has no `input` property.

This lower transform uses an **implicit input**: the value supplied by the source and attribute selected in its identity-profile mapping.

If that mapping selects StaffRoster's `departmentLabel`, the supplied string is `" Finance "`. Lower returns `" finance "`, with the spaces still present. No trim operation appears in this definition.

The main definition uses an **explicit input**. It says exactly how lower obtains its input: evaluate trim, which explicitly obtains its input through the StaffRoster account-field retrieval.

An explicit input overrides the implicitly supplied value. Therefore, a visible mapping selector is not always the final answer to “where does this calculation get its data?”

Let's change a condition. Suppose Devi also has an associated account `db-82002` on **DirectoryBridge Production**. Its collected `departmentLabel` is `"Legal"`.

For this comparison only, someone changes the mapping's selected source and attribute to DirectoryBridge's `departmentLabel`. They do not change either transform definition.

The separate implicit-input lower transform now receives `"Legal"` and returns `"legal"`.

The main explicit-input definition still retrieves StaffRoster's `" Finance "`, trims it and returns `"finance"`. Its internal `sourceName` did not change.

This diagram compares the two configurations under that changed mapping. It is a dependency comparison, not a suggestion to redirect the approved HR mapping.

```text
Mapping selector: DirectoryBridge
departmentLabel = "Legal"
              |
      Which input is defined?
         /               \
     implicit          explicit
        |                 |
mapped "Legal"     main nested definition
        |                 |
      lower         StaffRoster read
        |            " Finance "
     "legal"              |
                         trim
                      "Finance"
                          |
                         lower
                      "finance"

Explicit input replaces mapped input.
```

This is why a screenshot of the source selector alone cannot establish the actual input for a custom transform. You need the definition that was actually used as well.

## The input also depends on the identity and account selection

The same main definition can return different values for different people because `accountAttribute` reads accounts associated with the identity being evaluated. It is not a tenant-wide search for any record with a convenient department.

If another employee's selected StaffRoster record contains `" Operations "`, the same operations return `"operations"`. The JSON has not changed. The available input has.

If the required StaffRoster account is absent, not associated with that identity, or does not supply a usable field, we no longer have the input assumed by our successful trace.

Do not invent `"finance"` as the expected result in that situation. Inspect the actual evaluation and each operation's documented missing-input behavior. The main definition contains no approved fallback.

A **fallback** is an alternative input or result used under specified conditions. It is not implied by a friendly transform name, nor by an empty configuration object.

If multiple accounts exist on the selected source, account selection becomes part of the calculation. The accountAttribute operation has documented sorting, first-non-null and filtering behavior.

For example, its default sorting starts with the oldest account by account-created date. With two non-null department values and no selection overrides, the oldest account's value is used, not automatically the newest active worker record.

Our main facts supply exactly one StaffRoster account. A second account would require reviewing that assumption and the selection settings, not just the word `lower`.

The `sourceName` reference also uses the source's display name. If that display name changes, this reference needs updating. The operation supports other documented source-reference options, but changing a visible source name does not rewrite a literal reference merely because a reader understands they represent the same system.

Keep the distinction between a human naming change and an updated technical dependency.

## A readable file is not yet a correct configuration

JSON gives structure to the instructions. It does not establish that the instructions are valid for ISC or correct for the business.

Separate these questions:

- Can a JSON reader parse the text?
- Are the operation types, property names and value types supported in these positions?
- Do the referenced source, account and field supply the intended information in this context?
- Does the returned value meet the approved requirement?

For example, moving `sourceName` to the root could still produce valid JSON. It would no longer be the documented source setting inside the accountAttribute operation's `attributes`.

Likewise, `"departmentLabel"` is valid JSON text even when it names the wrong account field. A parser cannot approve the field's meaning.

Property spelling and location matter. Use documented operation identifiers such as `accountAttribute`; don't treat `type` values as casual descriptions you can rewrite.

Whitespace outside strings, including indentation, helps people read the object. It does not add a trim operation or change the nesting. Whitespace inside `" Finance "` belongs to the data.

JSON object properties are not an execution checklist. Reordering `name` and `type` within the same object does not reverse the operations. Moving an entire object to a different input position changes the dependency, which is a different action.

## Where would you look when the displayed value disagrees?

A transform definition describes a calculation. Its **execution context** is the situation in which that calculation is used, including the identity and configuration supplying or selecting its data.

For this example, the context is Employees' identity Department mapping, evaluated for Devi. Other uses, such as calculating an account-creation field, are separately configured. Do not assume the input and destination are identical across those contexts.

The identity-profile **Preview** evaluates mappings for a selected identity using available data. It can help check the result before applying a shared mapping change.

**Identity processing** reevaluates identity data and related decisions against the applicable configuration. It can update applied identity values when relevant events or authorized manual processing occur.

A saved definition, a selected mapping, a preview result and a current identity value describe different evidence.

| Evidence | The question it helps answer |
|---|---|
| Definition used by the mapping | What operations and input dependencies were configured? |
| Exact associated account and collected field | What data was available to the retrieval for this identity? |
| Preview for this identity and configuration | What result does that selected evaluation produce? |
| Relevant processing outcome and current identity field | Was the intended value applied to the identity? |
| A dependent decision or target-system observation | Did the separate consumer produce its required outcome? |

A **consumer** is a configuration or system that uses a value. For instance, an access assignment might depend on an identity's department.

**Provisioning** makes account or access changes in a connected system. A transform returning `"finance"` does not prove that a provisioning operation exists or that a target received anything.

In the supplied fictional continuation, the team verifies the main definition and mapping, previews Devi, reviews the affected shared configuration and completes authorized processing. Current identity evidence then shows `I-82002.department = "finance"`.

The collected StaffRoster field remains `" Finance "`. Neither trim nor lower wrote back to HR.

No external write, access assignment or application-use result is supplied. That boundary is part of the answer, not an unfinished calculation.

## Check whether you can explain the result

### 1. The name promises something the type does not do

**Facts:** A separate proposed definition uses root name `Uppercase Department` but otherwise has the main definition's types and nested inputs. The mapping destination and available data are unchanged. This compares proposed definitions; it is not an attempt to rename an existing tenant object.

What result follows?

**Reasoning:** `"finance"`. The root still performs lower after trim retrieves StaffRoster data. The name is misleading, but it did not change the operation. Check types and inputs rather than inferring behavior from a label.

### 2. The braces contain another instruction

**Facts:** In the main definition, root `attributes.input` is a trim object. Trim's `attributes.input` is an accountAttribute object.

Is lower receiving an account object as its final text input?

**Reasoning:** No. These are configuration objects describing how to obtain a value. The retrieval returns `" Finance "`, trim returns `"Finance"`, and lower receives that string. An instruction object and its evaluated result are different things.

### 3. The input has changed but the definition has not

**Facts:** The correctly associated StaffRoster account now supplies `" Operations "`. The main definition and approved normalization requirement remain unchanged.

Predict the intermediate and final values.

**Reasoning:** Retrieval returns `" Operations "`; trim returns `"Operations"`; lower returns `"operations"`. A different output is explained by a changed input, not necessarily a changed transform.

### 4. A source selector appears to have no effect

**Facts:** The mapping selector is changed to DirectoryBridge `departmentLabel = "Legal"`. The main definition still explicitly reads StaffRoster `departmentLabel = " Finance "`.

Should the result become `"legal"`?

**Reasoning:** No. The explicit nested input still supplies StaffRoster data, so the result is `"finance"`. Compare the mapping selector with the actual input path. Whether changing the mapping is authorized is a separate design question.

### 5. There is no input property

**Facts:** The separate implicit-input definition is used with mapped StaffRoster input `" Finance "`. Its `attributes` object is empty.

Does empty configuration mean the output is empty?

**Reasoning:** No. Lower uses the mapped input and returns `" finance "`. Empty settings are not an empty input string, and the lack of trim leaves the surrounding spaces. The input context still matters.

### 6. The file parses after a setting is moved

**Facts:** A JSON reader accepts a proposed definition. In it, `sourceName` has been removed from the accountAttribute settings and placed on the root object. No other source-reference option is supplied.

Can parsing establish that account retrieval is correctly configured?

**Reasoning:** No. The text is structurally JSON, but the documented accountAttribute source reference is no longer in its required configuration position. Review the operation's settings before attempting execution. This evidence does not establish a successful lookup or any particular error message.

### 7. The source display name changes

**Facts:** StaffRoster Production is renamed to `StaffRoster Live`. The main transform still contains `"sourceName": "StaffRoster Production"`.

Is the unchanged definition enough to establish a valid reference to the renamed source?

**Reasoning:** No. This reference uses the display name and must be updated when that name changes. Locate the affected definition and its uses, then verify the corrected reference. A name change is not proof that dependent text references changed with it.

### 8. Preview succeeds while the identity still shows an older value

**Facts:** Preview with the intended main definition returns `"finance"`. The current identity still displays `"Finance"`. No relevant application or processing evidence has been supplied.

Which conclusion is supported?

**Reasoning:** The selected calculation returns the expected string, but application to the identity has not been established. Verify the saved mapping/definition being used, relevant processing and current identity evidence. Do not rewrite a working calculation solely to compensate for an unverified application step, or infer a target write from Preview.

## Read another definition without relying on its name

A colleague proposes using the main definition for a different identity field, **Department Code**. Its approved value is `"FIN"`.

The colleague's proposed definition uses root name `Department Code`, with Department Code as its intended mapping destination. The source reference and selected account field inside the transform remain the same as in the main definition. The source still supplies `" Finance "`.

What would you say before accepting the proposal?

The output remains `"finance"`. Changing the name and destination did not change retrieval, trim or lower. The result does not meet the required code.

Ask for the approved source of the code, or an approved translation from label to code with a policy for unknown labels. Then examine the actual input and operations that implement that requirement.

Before declaring success, distinguish a supported definition, correct per-identity input, expected calculation and applied identity value. Verify any dependent use separately.

You should be able to point to each instruction and explain the value it contributes: StaffRoster supplies the text, trim removes the surrounding spaces, lower changes letter case, and the mapping determines which identity field uses the final result.
