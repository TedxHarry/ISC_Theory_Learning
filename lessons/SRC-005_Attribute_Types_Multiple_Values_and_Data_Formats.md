# The value looks right. Is it the right kind of value?

Devi, employee number `45005`, coordinates deliveries. Her RouteBoard account, `route-45005`, belongs to cost centre `007` and has two group memberships: `route.read` and `route.dispatch`.

In SailPoint Identity Security Cloud (ISC), the collected account instead shows cost centre `7` and one combined group value, `route.read;route.dispatch`.

The application owner confirms that neither the cost centre nor the memberships changed.

So why is ISC representing something different?

Before changing access or editing a rule, look at how the values crossed the integration. The letters and digits alone don't tell you their type, how many values they represent, or what an empty value means.

## First give each piece of data a job

An **account** is a record in an external system. An **identity** is ISC's representation of a person or another entity, connecting information, accounts and access.

A **source** is ISC's configured representation of a system or collection of account data. Its **connector** provides supported integration behavior. **Aggregation** collects account or entitlement information into ISC.

An **attribute** is a named piece of information. A source account's **schema** defines its represented attributes and their designated uses.

A **data type** describes the kind of value an attribute represents, such as text, a whole number or true/false. **Cardinality** describes whether the attribute holds one value or a collection.

Those are separate questions. “Text” doesn't tell you whether there is one text value or a list of text values.

An **entitlement** is an assignable access right. In this fictional setup, RouteBoard's two existing groups represent different rights. Their identifiers must remain separate when they are represented as memberships.

The supplied application data, mappings, defects and results are examples, not observations from a real tenant.

## Read the structure, not just the visible words

RouteBoard exposes an **API**, or application programming interface, through which software can read its account data.

Here is a selected part of the fictional account response in **JSON**, JavaScript Object Notation. A JSON **object**, enclosed in curly braces, contains named properties and their values.

```json
{
  "accountKey": "route-45005",
  "employeeNumber": "45005",
  "costCentre": "007",
  "isActive": true,
  "openTaskCount": 4,
  "groups": ["route.read", "route.dispatch"],
  "contractEnd": "04/11/2026",
  "backupPhone": null
}
```

Read one line at a time.

The quotation marks around `"007"` mean it is text in this response. The unquoted `4` is a number. The unquoted `true` is a Boolean.

Square brackets surround a JSON **array**, an ordered collection. The groups array contains two separate text values.

The property contractEnd is text at this boundary. Its spelling looks like a date, but the response hasn't told a reader whether the day or month comes first.

The property backupPhone is explicitly present with `null`. It isn't a phone number, an empty string or a Boolean false.

JSON has no separate built-in date value. Date-like information is carried using a representation such as text or a number, whose meaning must be agreed.

This sample isn't a complete source configuration or a request to change an account. It gives us evidence about the input.

## Text and numbers aren't interchangeable labels

A **string** is a text value. It can contain digits without becoming a quantity.

Cost centre `007` is a business code in our example. Its leading zeros are significant. The agreement doesn't define `7` as an equivalent code.

A numeric conversion can lose that distinction. Once an earlier stage has reduced the value to `7`, changing a later field to text doesn't reconstruct the original `007`.

You need the original value or an explicitly agreed formatting rule. Don't invent padding based on the one account you happen to be inspecting.

The same reasoning applies to employee references, postal codes and account identifiers. Their purpose, not their appearance, determines whether arithmetic makes sense.

By contrast, openTaskCount = `4` represents a quantity. An **integer** is a whole number. The source attribute-type model includes `INT` and `LONG` for integer representations, alongside `STRING`, `BOOLEAN` and `DATE`.

LONG supports a larger integer range than INT. Choose the supported type and range required by the field, rather than treating every digit-containing value as INT.

A fractional measurement isn't a whole number. Don't silently truncate it merely to fit an integer definition. Establish the representation supported by the particular connector and consuming configuration.

The available schema types don't establish that every connector accepts every wire format for them. A **wire format** is how a value is written in the exchanged response or file. The field's meaning, transport representation and schema definition need to agree.

## Boolean false is a value, not missing information

A **Boolean** has two values: true and false.

In JSON, `false` is Boolean false. `"false"` is a string containing five letters. JSON's Boolean literals are lowercase; a source file's own yes/no convention is a separate contract.

A **conversion** changes a representation into another agreed representation. **Coercion** is conversion performed implicitly by software. Don't assume ISC or every connector will coerce each text convention into the Boolean you intended.

Suppose another export uses `Y` and `N`. The integration needs a supported interpretation, such as Y meaning true and N meaning false. It also needs an agreed response to an unexpected value.

A non-empty string isn't automatically a correct true value. Mapping every non-empty input to true would misinterpret the string `"false"` and an N marker.

That is an example of faulty conversion logic, not a claim about ISC's default Boolean parser.

Also check the attribute's direction. isActive = false and isDisabled = false have different business meanings. The first says “not active”; the second says “not disabled.”

A status field isn't automatically an instruction to disable an external account. **Provisioning** performs supported account or access changes. Reading a status value and executing a disable operation are different responsibilities.

## One text value and two text values need different handling

For the RouteBoard memberships, the intended representation is a collection of text values.

Compare these three shapes:

- `"route.read;route.dispatch"`: one string containing a semicolon.
- `["route.read", "route.dispatch"]`: an array containing two strings.
- `["route.read;route.dispatch"]`: an array containing one combined string.

Putting brackets around a combined string doesn't turn it into two memberships.

A **multi-valued attribute** permits a collection of values. It doesn't, by itself, define how a connector should parse every incoming string.

The source attribute-definition model records type and a separate multi-value flag. That is why a string-valued group attribute can also be multi-valued: each member is text, and the attribute can contain multiple members.

Multi-valued and Entitlement are separate settings. A collection of phone numbers isn't automatically access. The account-schema documentation also specifies that Boolean attributes cannot be marked as entitlements; a true/false status field isn't a substitute for the supported membership representation.

For the supplied design, the intended choices are:

| Attribute | Meaning and type | Cardinality |
|---|---|---|
| costCentre | Business code, text | One value |
| isActive | True/false status, Boolean | One value |
| openTaskCount | Whole-number quantity | One value |
| groups | Existing group identifiers, text | Collection |
| contractEnd | Date representation under an agreed format | One value |

A collection holding one item is still a collection. An empty collection has zero items. Neither condition means the field should be redefined as single-valued.

Two elements also need not mean two distinct rights. `["route.read", "route.read"]` repeats one identifier. Investigate duplicated input and the consumer's supported treatment of duplicates; don't invent a universal ISC deduplication rule or count the repeated identifier as an extra kind of access.

Nor should a membership design depend on an incidental item order unless its documented contract makes order meaningful. “The first group” isn't a substitute for identifying the required right.

Here is the loss of structure in Devi's case:

```text
[Two group values from RouteBoard]
                |
        +-------+--------+
        |                |
   [Keep list]     [Join with ;]
        |                |
 [Two entries]     [One text value]
```

The branches compare two conversion choices. The right branch changes the shape; it doesn't add or remove a group in RouteBoard.

If the joined string is then wrapped in a list, ISC still receives one item. Check the actual elements, not whether a UI field visually contains both familiar group names.

An API can also return a collection of objects, each with an identifier and a descriptive label, rather than an array of identifier strings. The mapping must extract the intended identifiers in the supported shape. Serializing each whole object into text or selecting its label isn't automatically equivalent to extracting its identifier.

A path selecting only the first element also doesn't collect the whole list. Compare the actual response and extraction path before changing the multi-value setting. In Devi's supplied case, extraction was correct; the later join caused the defect.

## A delimiter separates values only under a parsing agreement

A **delimiter** is a character or sequence used to separate pieces of data. A **parser** interprets the encoded structure under agreed rules.

Consider an alternative, limited export of the same account in **CSV**, comma-separated values:

```csv
accountKey,costCentre,displayName,groups
route-45005,007,"Rao, Devi",route.read;route.dispatch
```

Under this example's agreed CSV format, the comma separates columns. The quotation marks keep Rao, Devi inside one displayName field, despite its internal comma.

The row has four fields, not five.

There is a second agreement inside the groups field: the producer uses a semicolon to separate group identifiers. The supported import path needs to interpret that convention if it is to produce two values.

Parsing the CSV columns and splitting the membership field are different jobs. The inner semicolon isn't a universal ISC delimiter.

A **serialization** writes a value or structure into a transport format. The reverse interpretation must agree with the producer, including delimiters, quoting and escaping.

**Escaping** represents a character that would otherwise be interpreted as structure. CSV quoting and JSON string escaping have their own rules. Copying a separator rule from one into the other can change the data.

If a legitimate identifier can contain the chosen delimiter, blindly splitting on every occurrence is unsafe. Agree a representation that preserves complete identifiers and that the actual connector supports.

Opening a file in a spreadsheet can also change its data. Check the actual exported content, not just a cell's displayed formatting. A display format showing 007 doesn't establish that the saved value still contains those zeros.

## Missing, null and empty need their own meanings

Look at a property named groups. These inputs are structurally different:

| Input state | What is present | What it doesn't establish alone |
|---|---|---|
| groups omitted | No groups property in that input object | That the account has no memberships |
| `"groups": null` | Property with an explicit null value | An empty collection or a removal instruction |
| `"groups": []` | Property with a collection containing no items | Successful external removal of every group |
| `"groups": [""]` | Collection containing one empty string | A collection with zero items |
| `"groups": ""` | Property containing zero-character text | A valid group list |
| `"groups": " "` | Property containing a space | An empty string before any agreed trimming |
| `"groups": "null"` | Property containing literal text | JSON null |

The first question is what arrived. The next is what that state means for this particular operation.

An absent property could reflect a response scope, an extraction path that didn't find it, or the producer's documented omission behavior. You need evidence to identify which explanation applies.

An empty list can be a valid assertion of no values in a complete, correctly scoped read. It can also appear in a defective or incomplete integration. Confirm the read contract before treating it as a trustworthy account-state statement.

The **read scope** is the agreed set of accounts and information that this operation is intended and permitted to return. A response limited to selected memberships isn't automatically a complete inventory of the account's access.

A **snapshot** describes state for an agreed scope and time. A partial update can describe only selected changes. An omitted property in those two situations need not have the same meaning.

**Update semantics** are the operation's rules for interpreting supplied and omitted values. An API can require an explicit removal operation rather than treating omission or null as “clear everything.”

Don't transfer assumptions between account aggregation, identity-attribute mapping and external provisioning. The same-looking input can pass through different mechanisms.

Likewise, numeric zero and Boolean false are valid values. Treating either as “missing” can erase useful information. A fallback that substitutes a default for every false-looking input is not automatically appropriate.

A **fallback** supplies an agreed alternative under specified conditions. Define those conditions rather than using a default to conceal a broken read or unknown value.

## Dates need a format and a business boundary

The RouteBoard contractEnd example is `04/11/2026`. The fictional producer's agreed format is day/month/year, so it means **4 November 2026**, not 11 April.

A **date format** specifies how to interpret the parts. Seeing a DATE type doesn't choose day/month order for an arbitrary input string.

A **timestamp** identifies a date and time. An **offset** states how a local time differs from Coordinated Universal Time, or UTC.

For example, `2026-11-04T18:00:00+05:30` and `2026-11-04T12:30:00Z` identify the same instant. Z indicates UTC here.

Dropping the offset changes the information available to the consumer. A **time zone** can carry regional clock rules; a numeric offset describes the displacement for the stated time, not every future regional rule.

A date-only value such as `2026-11-04` doesn't, by itself, specify a termination hour or zone. The organization must establish what “ends on this date” means before an access-changing design relies on it.

Another representation is an **epoch timestamp**, a count from a defined starting instant. Seconds and milliseconds are different units. A numeric type alone doesn't tell you which unit the producer used.

ISC provides a dateFormat transform for supported datetime-string conversion using documented input and output formats. A **transform** calculates or formats a value under supported logic.

For the agreed day-first input, a dateFormat design can interpret `dd/MM/yyyy` and produce `yyyy-MM-dd`. Those are documented transform-pattern conventions, not universal settings for every connector field.

The result for this example is `2026-11-04`. Reformatting it still doesn't decide a termination time, schedule the business event or prove access removal.

Validate the input meaning first. Converting a date that was already interpreted under the wrong month/day assumption can produce a neatly formatted wrong date.

## Trace where Devi's values changed

Return to the selected RouteBoard response. It contains costCentre as `"007"` and groups as two separate strings.

In this fictional investigation, the schema supports the intended text costCentre and multi-valued text groups. The response extraction finds the correct fields.

A project-added conversion step then treats costCentre as a number and joins the groups with a semicolon. The represented result contains `"7"` and a one-item collection containing `"route.read;route.dispatch"`.

Those outcomes are supplied facts about this deliberately faulty design. They aren't ISC's default conversion behavior.

A **mapping** specifies which input supplies an output value. Web Services integrations, for example, configure response attribute paths against represented schema attributes. A wrong path can select the wrong value, no value or an unintended shape.

Follow the evidence across the boundaries:

```text
[External response: value and shape]
                 |
[Extraction and configured conversions]
                 |
[Source schema and collected attributes]
                 |
[Configured consumers and their results]
```

The arrows guide an investigation. They aren't a private ISC execution sequence or a claim that the schema alone performs every conversion.

An **identity attribute** is a value on the ISC identity, not on one source account. An **identity profile** configures identities and the mappings that supply their attributes. **Identity processing** evaluates identities under relevant configuration.

If the identity maps costCentre directly from this bad account value, the wrong representation can travel into the identity. A **role**, a grouping of access for a business purpose, can then have assignment conditions that depend on the identity value.

For a supplied condition requiring the literal text 007, the value 7 isn't the intended input. Inspect the actual identity mapping, processed value and condition before concluding why an access decision differed.

The account's malformed group item has a separate problem. An **entitlement schema** describes access objects and their identifying attributes. Membership values need the appropriate source/type relationship and matching identifiers to link to the intended entitlements.

Two valid identifiers joined into one string aren't automatically either existing entitlement. Correct cardinality is part of the representation, not a cosmetic display choice.

## Repair the conversion and verify its consumers

Assume the responsible owners approve a supported correction that preserves the cost-centre text and the separate membership values.

The supplied supported re-read now represents costCentre as `"007"` and groups as the two intended entries. The external account key and its actual target memberships remain unchanged.

This repairs the stated read-side representation. It isn't a provisioning request to add duplicate memberships or recreate Devi's account.

If an identity mapping consumes the corrected value, check the applicable processing and resulting identity value. If access logic consumes it, verify the decision and any resulting delivery separately. Saving the conversion configuration doesn't establish every downstream outcome.

The **user interface**, or UI, can make different input states look similar. A blank cell doesn't tell you whether the original property was absent, null, empty text or a value that failed to display.

The source's Account Schema view describes the declared fields and multi-value settings. Account details show represented values for a particular record. Neither view alone proves that the producer sent a correctly typed and complete response.

Use the raw response or file, extracted values, schema definition, configured conversion, collected account record and relevant errors together. Check the actual source, account, operation and time.

A parsing failure isn't a valid assertion that an account has no groups. Don't silently turn an invalid input into an empty list just to make processing continue. Establish the supported failure handling, responsible owner and correction path; whether a particular connector rejects a record or fails a larger operation requires its own evidence.

A **character encoding** specifies how bytes represent characters. If an exported name is corrupted because producer and reader disagree on encoding, trimming spaces won't restore the original characters. Preserve an agreed encoding, such as UTF-8 where supported, and inspect the original file before applying replacement logic.

**Normalization** applies agreed consistency rules, such as removing permitted surrounding whitespace. It isn't permission to lowercase every identifier, remove zeros or merge values that the application treats as distinct.

Trimming can be useful; indiscriminate cleanup can also change the key you meant to preserve. Establish the business and connector contract before normalizing.

## Work through these variations

### 1. The code changed from 007 to 7

A file originally contains costCentre 007. An intermediate tool saves it as 7. The source later defines costCentre as text.

Will that later type definition restore the missing zeros?

**Worked reasoning:** No. The original representation has already lost information. Recover the authoritative original or apply a deliberately agreed formatting rule with suitable validation. Don't invent padding from a single example or assume changing the schema reconstructs source data.

### 2. The export supplies the text false

A producer supplies `"false"`. The field is intended to express Boolean false, but the conversion treats every non-empty string as true.

Should the result be accepted because the source value was present?

**Worked reasoning:** No. The supplied conversion uses the wrong meaning. Establish supported parsing of the producer's Boolean convention and treatment of unexpected values. Presence isn't truth, and this faulty conversion isn't evidence of ISC's default parser behavior.

### 3. A list contains one joined membership

The collected groups value is `["route.read;route.dispatch"]`. The schema is already marked multi-valued.

Does that setting establish two memberships?

**Worked reasoning:** No. The collection contains one combined string. Inspect the producer's structure, extraction and conversion. Preserve or parse the two identifiers under the supported contract; wrapping joined text in a list doesn't split it.

### 4. A display name contains a comma

The sample CSV row contains `"Rao, Devi"` inside one quoted field. The groups field uses a semicolon by agreement.

Should the comma in the name produce an extra column, or should every semicolon anywhere become a new column?

**Worked reasoning:** Neither follows from this format. CSV quoting preserves the name as one field. The outer column separator and the inner group-list convention have different scopes. Use the agreed parser and field-specific conversion, not a global character split.

### 5. An input omits groups

The latest response has no groups property. No complete-membership read guarantee or explicit removal operation is supplied.

Can the team conclude that all RouteBoard access has been removed?

**Worked reasoning:** No. Establish the read scope, extraction and omission semantics. The missing property isn't evidence of a successful external remove operation. Even an actual empty list needs its operation and completeness context before being used as evidence of current memberships.

### 6. A date is reformatted without checking its meaning

The producer defines `04/11/2026` as day/month/year. A configuration interprets it as month/day/year and then outputs a standardized date.

Is the result correct because the output looks consistent?

**Worked reasoning:** No. It has interpreted the wrong day and month. The intended result is 2026-11-04. Verify producer format, configured parser and output, plus any separate time/zone business requirement. Clean formatting doesn't correct a wrong interpretation.

### 7. A cell looks blank

A UI field appears blank. One investigator proposes substituting false for every blank-looking input.

What evidence is missing?

**Worked reasoning:** Inspect the actual field type and original state: omitted, null, empty text, whitespace or a display problem. Establish the required business meaning and supported fallback conditions. Boolean false is a particular value, not a universal replacement for unavailable information.

## Review a different HR feed

A Human Resources (HR) feed uses employee references with leading zeros, active status Y/N, pipe-separated group codes and a date-only contract expiry. The team proposes: “Convert digit fields to numbers, treat any non-empty status as true, split every separator, and use null to clear old access.”

What would you change in the agreement?

**Worked reasoning:** Identify each field's meaning, supported type and single-value or collection shape. Preserve identifier text and significant zeros. Define supported Y/N conversion and an explicit outcome for unexpected or missing inputs.

Separate file-column parsing from field-specific list parsing, including quoting, escaping and identifiers containing separators. Establish whether the membership data is complete for its scope and time.

Define absent, null, empty-text and empty-collection semantics for the actual read and update operations. Don't invent access-clearing behavior from null.

Specify the date's input format and the business time/zone boundary needed for expiry logic. Agree any supported conversion, then validate representative and problematic records across raw input, extraction, schema, collected values and dependent processing.

Explain it to the owner this way: “We need to preserve what each value means, what kind of value it is and how many values it contains. Conversion should implement that agreement, not guess from what the text happens to look like.”
