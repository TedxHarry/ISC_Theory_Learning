# Account, identity, and entitlement attributes: which value are you looking at?

*Lesson FND-003 · Revision 1.0*

“Devi’s department is wrong.”

Before changing anything, ask to see the record.

Is the value on her HR record, her finance account, or her identity in SailPoint Identity Security Cloud, or ISC? Is someone reading a property of the finance access item instead?

The word “department” is not enough to identify the information. You need to know which object holds it, where its value came from, and what is supposed to happen to it.

## Put the value beside its record

Devi has moved from Operations to Finance. Her employee number is `23003`. She already has an HR worker record, a directory account named `dir-23003`, and a finance account named `fin-23003`.

ISC has collected those records and associated them with her identity. The relevant account associations are correct for this example.

An **identity** is ISC’s person-level representation. An **account** is a record in a particular system, such as Devi’s finance user record or the worker record collected from HR.

A **source** is ISC’s configured representation of a system or account dataset. A **connector** supplies the integration used to obtain its data and perform supported changes.

Reading source data into ISC is **aggregation**. The account information you inspect in ISC is a collected representation, not necessarily a live query of the external system.

An **attribute** is a named piece of information on a record. The attribute’s **value** is the information it currently contains.

The following observations are fictional. They describe the selected records after ISC has collected the HR information and calculated the person-level values, before any finance-account department update has been established.

| Record being inspected | Attribute | Value |
|---|---|---|
| Devi’s collected worker account under the `HR-Workers` source | `orgCode` | `FIN` |
| Devi’s ISC identity | `department` | `Finance` |
| Her collected account `fin-23003` under the `Invoice-Service` source | `department` | `Operations` |

In the first row, the attribute is `orgCode` and its value is `FIN`. In the second, the attribute is `department` and its value is `Finance`.

These values belong to different records. They do not become one shared field merely because they concern the same employee.

Now the original report becomes more useful:

“ISC’s identity department is Finance, but the collected finance account department still says Operations.”

We can investigate that statement. It identifies the objects and the difference without yet declaring which process failed.

## What makes an attribute an account attribute?

An **account attribute** describes one particular account record on a source.

On the finance account, `department` describes what the finance record contains. On the HR worker record, `orgCode` describes what HR supplied. Neither is automatically the final person-level value ISC should use.

Here is a compact representation of Devi’s collected finance account:

```json
{
  "accountId": "fin-23003",
  "employeeNumber": "23003",
  "department": "Operations",
  "enabled": true,
  "groups": ["g-inv-read", "g-report-export"]
}
```

This is a teaching representation, not a promised connector response or a command to run.

The curly braces enclose one record. Each name before a colon identifies an attribute. The value comes after it. Quotation marks enclose text; square brackets hold a list. The list here contains two values.

The `groups` attribute tells us which group identifiers this account holds in our example. A **group** is a collection of accounts that the finance application uses to give its members access. Here, membership in `g-inv-read` permits invoice reading, and membership in `g-report-export` permits report export.

That is the fictional application’s access design. The operational meaning of a real group must be established from that system.

Notice the question each field answers.

`employeeNumber` helps identify the employee associated with the account. `department` supplies a department value recorded on that account. `groups` supplies membership values.

Having an attribute does not tell you how ISC will use it. An employee number is not automatically a matching instruction, and an account’s department is not automatically an instruction to grant every Finance permission.

**Account correlation** is the separate matching process that associates a source account with an ISC identity. Our account associations have already been verified. They allow us to inspect Devi’s finance account in her person-level context; they do not make all its attributes identity attributes.

If Devi also had an administrative account on this source, that account would carry its own attributes. “Devi’s finance department” would still need an account identifier when the distinction matters.

## The schema describes the information ISC expects

A **schema** describes a record’s attributes and their organization. The finance source’s **account schema** describes the attributes used for its account representation.

A **Boolean** has two logical values, true and false. **Multi-valued** means an attribute can contain more than one value.

For this example, it includes:

- A text account identifier, `accountId`.
- A text employee number and department.
- A Boolean `enabled` value.
- A multi-valued `groups` attribute configured to represent access memberships.

In our finance application’s design, `enabled: true` means the account is enabled. The group list contains two separate identifiers, not one identifier made by joining the two names.

The account schema identifies which attribute provides the Account ID and which provides the Account Name. Those roles help ISC identify and present the source account. They are not instructions to make the account identifier equal to the employee number.

Treat those account-identification settings carefully once data exists. Changing the schema’s Account ID or Account Name selection after aggregation can break references or create duplicate records. Do not use that kind of change as an experiment to repair an unrelated department value.

Adding `department` to a schema also does not create a department field in the finance application. The integration must actually obtain the value, and its representation must agree with the data being returned.

You therefore check the external field, connector configuration, and source schema together. A field visible in an application screen is not proof that the integration can read it.

Display labels require the same care. An HR screen might label a field “Worker Department,” while the collected attribute is `orgCode`. The visible label helps a person understand the field; mappings must refer to the appropriate configured attribute.

## How did FIN become Finance on the identity?

An **identity attribute** describes the person-level identity in ISC. Its value can come from a source account attribute or from a configured calculation.

An **identity profile** provides configuration for a population of identities, including the mappings that populate their identity attributes. Its **authoritative source** supplies the population from which those identities are established.

Here, the Employees identity profile uses `HR-Workers` as its authoritative source.

A **mapping** specifies how an identity attribute obtains its value. It is more precise than saying “the identity comes from HR,” because individual identity attributes can use different sources.

ISC includes default identity attributes, and administrators can add custom ones. A custom identity attribute becomes available across identity profiles, but each profile does not have to map and use it. Adding the attribute does not invent a value for it.

That shared definition also matters when removing a custom attribute: deletion affects all profiles, and other configurations may depend on the field. A wrong value is not a reason to delete the attribute before investigating its mapping and consumers.

Our example has these mappings:

| Identity attribute being populated | Input selected by the mapping | Treatment |
|---|---|---|
| `employeeNumber` | HR worker account’s `employeeNumber` | Use the supplied text value |
| `department` | HR worker account’s `orgCode` | Convert the agreed code into its department name |
| `email` | Associated directory account’s `mail` | Use the directory’s work-email value |

The directory account is already associated with Devi and contains the required mail value in this example. HR establishes the employee population; it does not have to supply every attribute.

The department mapping uses a **transform**: configured logic that calculates an output value from its input.

Our teaching example uses this agreed conversion:

| HR input code | Identity output |
|---|---|
| `FIN` | `Finance` |
| `OPS` | `Operations` |

This is the intended logic, not a complete transform definition. A real configuration also needs defined behavior for missing or unexpected input.

Let’s follow the successful case.

HR supplies `orgCode = FIN`. Aggregation makes that value available on the collected HR account. During the applicable **identity processing**, ISC evaluates identity information against its configuration, including the profile’s attribute mappings.

The mapping selects the HR account’s `orgCode`. The transform converts `FIN` to `Finance`. The identity’s `department` becomes `Finance`.

The collected HR account still says `FIN`. The transform calculated an identity value; it did not rewrite the HR input.

So those two different text values can both be correct.

This is why an engineer checks the mapping before trying to make every visible value identical. The relationship may deliberately preserve a source code in one place and use a readable name in another.

## Does the identity value update the finance account?

Not merely because both attributes are named `department`.

The identity mapping answers, “How does ISC calculate its identity department?” Writing a department into the finance application answers a different question: “Which operation should change the external account?”

**Provisioning** carries out supported account or access changes through the configured delivery method.

**Attribute synchronization** is a configured mechanism that provisions selected account-attribute values from corresponding identity attributes. It applies to existing, correlated accounts; it does not create a missing account.

The **Create Account definition** describes the values used when creating source accounts. Its configuration also supplies mappings used by attribute sync. For an attribute to be eligible for synchronization, that definition must include it and map it directly from the relevant identity attribute.

The presence of a Create Account mapping does not mean every existing account attribute is automatically synchronized. The intended attribute must be selected in the applicable sync configuration, and the required identity mapping must exist.

Return to our opening snapshot. An identity department of Finance and a collected finance-account department of Operations does not, alone, establish a failure.

We still need to know whether that finance field is meant to follow the identity department, whether the required configuration applies, whether a change was attempted, and what the finance application currently records.

For a successful continuation, assume the organization requires that alignment. The source supports the department update, the existing account is correctly correlated, and the required mappings and synchronization are configured. The update runs and succeeds.

Now the target finance account’s department becomes Finance.

The read, calculation, and write connect like this:

```text
HR worker record: employee 23003
  orgCode = FIN
          |
          | Account aggregation collects the value
          v
ISC HR account under HR-Workers
  orgCode = FIN
          |
          | Identity-profile mapping selects orgCode
          | Transform converts FIN to Finance
          v
ISC identity: Devi, employee number 23003
  department = Finance
          |
          | Only for the configured supported sync path
          | Attribute sync provisions the department value
          v
Finance application: existing account fin-23003
  department = Finance after the successful update

Separate human checks:
  Examine activity and the current finance record.
  Examine later collected account data for what ISC records.
```

The arrows trace the value through the selected successful conditions. They are not a private-service diagram or a claim that all sources run in this order.

The HR value remains `FIN`. The identity value is `Finance`. In this continuation, the finance value changes through the described supported update path.

A later collection can provide a refreshed finance-account observation. Do not assume the diagram guarantees a full aggregation immediately after the write or that every screen refreshes at once.

There is another boundary to preserve: changing an account’s department field is not, by itself, the same operation as adding or removing one of its groups. Whether department influences permissions depends on the application and the organization’s configured access logic.

## A membership value and an entitlement’s attributes answer different questions

An **entitlement** is an access item represented from a source, such as a group membership or permission.

On Devi’s finance account, the `groups` attribute lists `g-inv-read` and `g-report-export`. Those values identify the access items held by this account in our example.

But what does `g-inv-read` mean?

The finance system also supplies a group record:

| Attribute on the group record | Value |
|---|---|
| `id` | `g-inv-read` |
| `name` | `FIN_INV_READ` |
| `description` | `Allows invoice reading` |
| `businessArea` | `Finance` |

Those are **entitlement attributes**: information describing the access item itself.

The group’s description tells us about the group. The account’s membership value tells us that the account holds that group. The identity’s department tells us about Devi as represented in ISC.

If the group’s `businessArea` is Finance, that does not set Devi’s identity department to Finance. It describes the access item. If a separate mapping or decision is supposed to use that information, it needs its own defined logic.

An **entitlement type** distinguishes a kind of access item within a source, and its schema describes that item’s attributes.

For our `Invoice-Service` source, the configured entitlement type is named `groups`. Its schema uses `id` as the Entitlement ID and `name` as the Entitlement Name. The extra fields are included because this fictional integration supports returning them.

An **entitlement aggregation** collects information about those access items. Account aggregation supplies account information, including represented memberships. Entitlement aggregation can supply richer information about the items referenced by those memberships.

The account data and entitlement data must connect correctly.

You will also see an **Entitlement** setting on an account schema field. That setting marks the account attribute as carrying access values. The field still belongs to the account. It is different from a description or business-area attribute on the entitlement record itself.

In this example, the account schema’s `groups` attribute has the Entitlement setting selected, its name agrees with the configured `groups` entitlement type, and its type is linked to that entitlement type. Each collected membership value matches the corresponding Entitlement ID.

```text
Source context: Invoice-Service
Configured entitlement type: groups

Account fin-23003
  groups includes g-inv-read
                |
                | Matching membership value and Entitlement ID
                | Within the configured source/type relationship
                v
Entitlement record
  id = g-inv-read
  name = FIN_INV_READ
  description = Allows invoice reading
  businessArea = Finance
```

The arrow means that the membership reference links to the described access item. It is not an instruction to grant access.

Here, the reference is `g-inv-read`, not `FIN_INV_READ` and not a readable display label such as “Invoice reading.”

If the account supplies a display name while the entitlement’s designated ID contains a different value, that mismatch needs investigation. Renaming a label just to make a screen look consistent does not repair the reference design.

A real connector determines which attributes and entitlement types it supports. You should not expect every source to expose the fields used in this example, or assume every source supports a separate entitlement aggregation.

## What changes if you edit an entitlement description?

ISC lets administrators maintain an entitlement’s display name and description to make the access understandable.

For example, the collected name `FIN_INV_READ` can be presented with a more useful display name and an accurate description of the business access.

Editing that display name or description in ISC does not send those edits to the external source. It also does not add the group to Devi’s account.

The purpose is different: you are improving the information used to understand the access item, not carrying out an account-membership change.

Manually maintained names and descriptions also need consideration when comparing later collected data. Entitlement aggregation does not simply overwrite values that have been manually updated in ISC.

If the description differs from the application’s description, investigate where each came from and whether the ISC value was deliberately maintained. Do not decide the account’s access is wrong from that text difference alone.

Descriptions still matter. A reviewer who reads “Invoice reading” needs to understand the actual access behind it. Better wording cannot make an inaccurate access description safe.

## The shape of the value affects the reasoning

Two fields can look similar on a screen while supplying different kinds of data.

A **string** is text. `"0042"` can be a cost-center code that must retain its leading zeros. A numeric value `42` does not preserve those zeros as part of the value.

If the business identifier is `0042`, converting it to a number because it contains digits can change the identifier you later compare or send elsewhere.

A Boolean `false` and the text `"false"` are also different representations. Do not assume a connector, mapping, or comparison has converted one into the other.

An empty value needs attention too:

| Representation | What it expresses in this example |
|---|---|
| Attribute absent from the supplied record | No field was supplied in that record |
| `"department": null` | The field is present without a value |
| `"department": ""` | The field contains empty text |
| `"groups": []` | The field contains an empty list |
| `"enabled": false` | The field contains the Boolean value false |

These distinctions help you inspect the input. They do not promise that every connector preserves every representation unchanged or that ISC handles them identically in every feature.

Check the actual collected value and the applicable logic before predicting the result.

In particular, “missing department” must not silently become “Finance” because Finance seems a convenient default. The approved mapping needs a defined response to missing data.

A null output can matter downstream too. When an identity-profile mapping sets a configured synchronized identity attribute to null, attribute sync propagates that null value to the account attribute. The external system’s requirements and the operation result still matter. Do not assume clearing an identity value leaves the account’s old value untouched, or that every target accepts an empty value.

Likewise, an empty membership list and a missing membership field are not interchangeable evidence about the current application. Check what the connector returned, what population and fields were read, and how the relevant collection handles them.

Dates need the same discipline. Text such as `2026-10-20` needs an agreed format and meaning when a calculation uses it. If a value includes a time, establish the time zone as well. A date displayed on a screen is not proof that every process interprets it as the same instant.

Use the data types and multi-value settings supported by the actual schema and feature. The fact that one account attribute supports a list does not mean every identity attribute or decision feature accepts one.

## Trace the value before choosing a repair

Suppose the identity department unexpectedly shows Operations even though the HR team says Devi moved to Finance.

Start by identifying the expected mapping. In our agreed design, the input is `HR-Workers.orgCode`, and the conversion is `FIN` to `Finance`.

Then locate the first disagreement:

| Evidence | Question it helps answer |
|---|---|
| Relevant current HR record | Does HR actually supply `FIN` for the intended employee? |
| Collected HR account and relevant aggregation history | Did ISC receive the expected account value? |
| Identity profile, selected source attribute, and transform configuration | Is the identity department using that input and the intended conversion? |
| Mapping preview and current identity value | What does the mapping calculate, and what is currently recorded on the identity? |
| Applicable processing history or errors | Has the relevant change been processed, and what problem is reported? |

A preview is useful for evaluating a mapping. It does not establish that the configuration has been applied to the population or that a target-account update succeeded.

These checks combine records, configuration, and available activity. They do not require a single history screen to expose every attribute evaluation.

If HR currently contains `FIN` but the collected HR account still contains `OPS`, investigate the collection boundary before rewriting a correct conversion.

If ISC collected `FIN` but the mapping selects the directory account’s department, processing the identity again can reproduce the wrong result. Repeating processing does not correct a wrong input selection.

If the mapping calculates Finance but the finance account still says Operations, you have reached a different boundary. Investigate the expected write mechanism, its applicability, the attempted operation, and current target evidence.

Choose an authorized correction at the relevant point. A shared mapping can affect more people than Devi, so assess its wider effect before applying a change.

The front end gives you screens for account attributes, identity attributes, entitlement details, and activity. The back-end work includes obtaining source data, calculating identity values, linking access references, and carrying out configured changes. Understanding the producing process tells you what each screen can establish.

## Try these changes to the evidence

**1. Different values, correct mapping.**

The collected HR account has `orgCode = FIN`. The department mapping converts `FIN` to `Finance`, and the identity shows Finance. The finance account’s collected department is Operations.

Which part of the flow has the supplied evidence established? What must you check before calling the finance difference a synchronization failure?

**2. An entitlement name is mistaken for its identifier.**

The account’s `groups` list contains `FIN_INV_READ`. The relevant entitlement record has ID `g-inv-read` and name `FIN_INV_READ`. The intended integration design requires membership values to use the group IDs.

Would a matching visible name establish a correct ID reference? What needs investigation?

**3. HR did not supply a code.**

Devi’s collected HR account has an empty `orgCode`. The mapping description only documents conversions for FIN and OPS; no missing-input behavior has been established.

Can you confidently predict Finance, Operations, or a particular processing error? What information do you need?

**4. A value looks like a Boolean.**

A connector supplies `"enabled": "false"`, while a proposed comparison expects Boolean false. You have not checked whether any conversion occurs.

Can you treat the supplied value as a verified Boolean? What would you inspect before relying on the comparison?

**5. The description was improved.**

An administrator changes the entitlement’s ISC description to “Read invoices; does not permit invoice export.” No membership operation is requested.

Has that edit removed `g-report-export` from Devi’s account? Has it changed the source application’s group description?

## Compare your reasoning

**For the different department values:** The supplied HR value, conversion, and identity result agree with the stated mapping. That establishes the intended calculation for these observations. It does not establish what happened to the finance account. Check the required finance-field behavior, eligible mapping and attribute-sync configuration, existing account association, relevant activity, and current finance record. A stale collected account and a rejected update are different possibilities; neither is established by the values alone.

**For the mistaken reference:** No. The agreement with the entitlement name does not make it equal to the designated ID. Compare the raw membership values, connector mapping, account schema, entitlement type relationship, and the entitlement’s designated ID. Determine why names were supplied where the agreed design requires IDs. Do not change an established ID field just to conceal the mismatch; assess references and affected records before an authorized correction.

**For the missing HR code:** You do not yet have enough information to predict a specific result. Inspect the actual transform and mapping, including missing-input handling, then use appropriate preview or processing evidence. The description’s omission does not prove the running configuration has no handling. Also investigate why HR supplied no code. Any fallback must reflect an approved business meaning, not an assumption that a blank employee belongs in Finance.

**For the apparent Boolean:** The supplied representation is text. Inspect the source schema, connector output, collected account value, any conversion, and the consuming comparison’s supported types and behavior. The evidence does not yet establish the comparison’s result. A readable word on a screen is not enough to prove its data type.

**For the edited description:** Neither outcome follows from this edit. ISC’s display-name and description edits are not sent to the source, and editing descriptive information is not an account-membership removal. Inspect the membership and a supported removal operation if the account’s export access needs to change. Keep the description accurate, but do not confuse explaining access with changing it.

## Explain a value that someone else chooses

Ask someone to choose one visible field from an account, identity, or entitlement. If you are working alone, choose a field other than department.

Explain which object holds it, which source and record matter, what kind of value it contains, and how it became available.

Then change one condition. The input is missing, a mapping selects another source, a group has a new description, or the target update is rejected.

Explain what you can now predict and what evidence is still missing. Keep the object, input, calculation, and any write operation separate. That is what turns “the value looks wrong” into a question you can investigate.
