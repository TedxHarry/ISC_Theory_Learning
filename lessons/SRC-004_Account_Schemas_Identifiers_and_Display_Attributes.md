# An account schema: which fields describe the account, and which ones identify it?

Devi, employee number `44004`, works in billing operations. InvoiceTrack gives her a standard account for daily work and an approved administrative account for specific support tasks.

Both accounts belong to Devi. Both carry employee number `44004`.

An onboarding proposal says, “Use employee number as the account identifier. It's unique for each employee.”

Unique for each employee, yes. But does it distinguish these two accounts?

That is the problem an account schema must help us solve. Before deciding how to match an account to its owner, we need to represent the right account in the first place.

## Look at the records before choosing the fields

An **account** is a record in an external system. In SailPoint Identity Security Cloud (ISC), an **identity** represents a person or another entity, connecting relevant information, accounts and access.

Here, one person has two external account records. Two accounts don't require two employee identities.

A **source** is ISC's configured representation of a system or collection of account data. Its **connector** provides supported integration behavior. **Aggregation** collects account or entitlement information into ISC.

An **attribute** is a named piece of information. In the fictional InvoiceTrack setup, the relevant account data is:

| External field | Standard account | Administrative account |
|---|---|---|
| accountKey | inv-acct-44004 | inv-admin-acct-44004 |
| loginName | inv-44004 | inv-admin-44004 |
| employeeNumber | 44004 | 44004 |
| fullName | Devi Rao | Devi Rao |
| department | Billing Operations | Billing Operations |
| officeCode | BLR | BLR |
| costCentre | 044 | 044 |
| groups | invoice-read | invoice-support |

Assume these are separate, legitimate accounts in the intended production environment. Their account keys and login names are supplied as stable, distinct values under this fictional application's integration contract.

An **integration contract** is the agreed meaning and behavior of the data exchanged between systems. Here, it includes which field identifies an account, what values the connector returns and which changes the application supports.

Look at the accountKey row. It distinguishes the records.

Now look at employeeNumber. It tells us that both records refer to the same employee. That is useful information, but it answers a different question.

The fullName values don't distinguish either account. Neither does department, officeCode or costCentre.

A value can be correct and useful without being a suitable account identifier.

## The schema describes the shape and designated uses

An **account schema** defines the account attributes a source represents and how those attributes are organized. It includes field definitions and the attributes designated as Account ID and Account Name.

A field definition describes a named slot, such as office. A particular account supplies a value for that slot, such as BLR.

The definition and the value aren't the same thing. A schema can define office while an individual account has no office value.

The schema also records information needed to interpret fields. For example, a **string** represents text, a **Boolean** represents true or false, and a **multi-valued attribute** can hold a collection rather than one value.

If costCentre is a business code, `044` and `44` need not mean the same thing. Treating it as text can preserve the significant leading zero under the agreed data design. Don't choose a numeric type merely because a code contains digits.

An **entitlement** is an assignable access right. An account attribute can be designated as representing entitlements, such as the groups associated with an account. The relevant field settings and entitlement definitions must agree with the connector's supported representation.

Those settings describe how to interpret collected information. They don't grant the access or give the connector permission to change it.

The schema isn't a copy of every table or internal field in the target application. It describes the account data represented through this source. An application can hold information that its selected software interface, export or connector doesn't expose.

## Account ID and Account Name have designated jobs

The source schema selects one attribute as **Account ID** and one as **Account Name**.

Account ID provides the account-identifying value under the source's schema and connector arrangement. Account Name provides the designated naming/display value for that account representation.

For InvoiceTrack Production, the proposed design is:

| Use | Selected account attribute | Why it fits this example |
|---|---|---|
| Account ID | accountKey | Distinguishes the two accounts and is stable under the supplied application contract |
| Account Name | loginName | Supplies the distinct, supported account name for each record |
| Person-matching input | employeeNumber | Connects both accounts to the intended employee under configured matching |

The third row isn't another Account ID designation. It is an attribute used for a separate ownership relationship.

You can encounter the schema property names `identityAttribute` and `displayAttribute` in technical representations. For this example, the selected properties are:

```json
{
  "identityAttribute": "accountKey",
  "displayAttribute": "loginName"
}
```

These are selected schema properties, not a complete configuration request.

Read their values carefully. `accountKey` is the name of an attribute, not Devi's account key value. The standard account supplies `inv-acct-44004` in that attribute.

Likewise, `loginName` selects a field. The two account records supply different values for it.

The word “identity” in `identityAttribute` doesn't mean “select the employee's identity profile” or “correlate every account with this value.” In this schema context, it concerns identifying the represented object.

An **identity profile** configures ISC identities, including the mappings that supply their attributes. That is a different configuration object from the account schema, which describes separate source-account records.

Also don't confuse a field called id in external data with every ISC object ID. An **object ID** identifies a particular stored ISC object, such as a source, schema or account. A schema's own object ID identifies the schema definition; it isn't the external account key.

Always ask which object's identifier you are looking at.

## The displayed account name isn't any convenient friendly label

It is tempting to read displayAttribute and think, “This only affects what the page looks like.”

That assumption is unsafe.

SailPoint documents significant risks when changing the designated Account Name or Account ID after accounts have been aggregated. Its account-schema guidance identifies Account Name as immutable, meaning it is intended to remain fixed. Editing its designation after aggregation can produce duplicate accounts and identities. Account ID changes can break references across systems.

Therefore, don't treat the Account Name selection as an unrestricted cosmetic preference.

A normal descriptive field, such as fullName, can have a different purpose from the designated Account Name. A screen showing Devi Rao somewhere doesn't prove that fullName is the selected account-naming attribute.

Inspect the actual designation and the record behind the screen.

The selected account ID and naming fields need to satisfy the chosen connector's requirements. A human-readable full name isn't a safe substitute just because it is pleasant to read. People can share names, and a person can have multiple accounts.

In this fictional setup, loginName meets the agreed account-naming requirements. That doesn't establish that every application's username is stable, unique or suitable in the same way.

For a real source, establish the documented fields and supported behavior before the first collection. Don't replace a connector's required identifier simply because another application uses a different one.

## Follow the record into the represented account

InvoiceTrack holds the external records. Its **API**, or application programming interface, is the supported software interface used to read them in this example.

Assume the configured read operation returns the intended accounts. The connector's field mapping associates returned values with the account attributes represented in ISC.

A **mapping** specifies which input supplies a particular output value. Here, it connects external account fields to represented source-account fields. It isn't automatically an identity-attribute mapping or an external write instruction.

The relationship looks like this:

```text
[InvoiceTrack account record]
              |
   supported read and field mapping
              |
              v
[Values in source account attributes]
              |
   interpreted under account schema
              |
              v
[ISC representation of that account]
```

The arrows follow the data relationship, not a private sequence of internal processing stages.

In this example, the standard account is represented using accountKey `inv-acct-44004`, Account Name `inv-44004`, and its other collected attributes. The administrative record has its own identifying and naming values.

The schema doesn't create a new InvoiceTrack account when this happens. It helps define how the already-existing account is represented.

**Provisioning** carries out supported account or access changes in an external system. Reading and representing these records isn't that operation.

The **user interface**, or UI, can show a named account and its collected details. Those values came from an external read and the configured representation, not from the UI inventing the employee's current application state.

To interpret the screen, check the source context, actual account key, naming designation, attribute values and collection evidence. A friendly title alone doesn't establish which record you have opened.

The source's Account Schema view shows the definitions and selected uses. Its account records show values collected for particular accounts. Those views answer different questions: what should this source represent, and what information does this account currently contain?

Schema changes are captured in audit events, which record configuration changes. Such an event can establish that a definition changed; it isn't proof that all accounts were recollected or any external account was modified.

## Adding a field doesn't supply its value

Suppose the project wants an account attribute called office in ISC.

The source schema includes office. The external read returns officeCode with value BLR. But the supplied connector mapping still expects an old input called siteCode, which isn't present in this response.

The schema is present; the input mapping is wrong.

Adding office again won't repair that relationship. Nor will changing the displayed account name.

In this fictional investigation, the approved correction maps the returned officeCode to the represented office attribute. After an appropriate supported read, the inspected account contains office = BLR.

The application record itself didn't need changing. The information was already present in the response.

Now consider a different variation: the external API doesn't return officeCode at all under the integration's current permission or read configuration.

The same schema definition cannot manufacture BLR. Establish whether the field exists externally, whether this read exposes it, whether the integration can read it and whether the connector maps it correctly.

An **integration credential** is the proof used by the connector to authenticate to the external system. Its read scope can affect which data is available. A schema definition doesn't expand that scope.

A usable account attribute therefore depends on more than a field name in the schema. The external value, supported read, correct mapping and appropriate representation all matter.

A missing value can also be legitimate for a particular account. Don't invent a value merely to make every row look complete; establish the business requirement and the supported treatment of absence.

## Discovery helps with definitions, not with business decisions

**Schema discovery** is a supported way to inspect and import an external source's field definitions. It is available only on sources that support it.

Other sources need manual schema definition or connector-specific setup. Most connected sources provide a starting schema, but the selected connector determines what is available.

Discovery can save you from guessing which attributes are exposed. It doesn't decide whether employeeNumber uniquely identifies accounts in your organization's data.

That decision still requires actual records and their meaning.

Saving a discovered or edited schema also isn't evidence that every account now has its latest attribute values. The account-schema documentation describes subsequent aggregations following the saved schema.

Check the supported collection or processing needed for the change, and inspect the resulting records. Don't assume saving a definition rewrites every existing account or reruns every dependent process.

Discovery and replacement also need impact review. For example, the Delimited File connector documents preservation of settings for retained attributes and conditional removal of attributes absent from a newly uploaded or discovered schema. It isn't a promise that repeatedly replacing a schema has no effect on dependencies.

Before accepting a changed definition, compare what is being added, removed or redesignated and where those fields are used.

## Two account keys can lead to one person

Once the two InvoiceTrack accounts are represented correctly, we can consider their owner.

**Account correlation** matches and associates a source account with the appropriate ISC identity under configured matching rules.

Assume Devi's existing identity, represented by fictional ID `I-44`, has employee number `44004`. The approved matching arrangement uses the account's employeeNumber against the corresponding identity value.

Also assume the values are available and the intended identity is unambiguous. Equal-looking numbers alone aren't proof that every tenant already has this configuration.

The resulting relationships are:

```text
[Account inv-acct-44004]
     employeeNumber: 44004
                \
                 > [ISC identity I-44]
                /
[Account inv-admin-acct-44004]
     employeeNumber: 44004
```

Both accounts can belong to Devi while remaining different account records.

The arrows represent the supplied ownership associations. They aren't two account records being merged into one, and they don't imply an undocumented matching score.

This is why the original employee-number proposal fails for account identification. It confuses “which account is this?” with “who owns it?”

A missing or wrong employeeNumber can affect ownership matching even when the account key is valid. Conversely, correct employeeNumber doesn't repair a missing or unsuitable account key.

If an account is **uncorrelated**, its intended person association hasn't been established. That is different from an account that was never collected or couldn't be represented correctly.

Locate the problem before changing a matching rule. You cannot solve an unread record by changing correlation, and you shouldn't hide an identifier defect behind manual account association.

## Missing and duplicate identifiers need investigation, not guesses

Suppose an external row has no usable accountKey. The selected Account ID cannot obtain its intended value from that row.

That is a data or representation problem to resolve under the connector's documented requirements. Don't assume correlation will supply the key later.

Likewise, suppose two different external accounts return the same accountKey inside the same intended source context.

You have conflicting identification inputs. Don't plan around an invented rule such as “ISC always keeps the first” or “the last account automatically overwrites the earlier one.” Diagnose the actual returned records and documented connector outcome.

The practical checks are concrete: compare the original records, any export or API response, connector mapping, selected schema attributes and actual aggregation messages. Determine whether the records are duplicates, legitimate separate accounts or an incorrectly combined population.

**Source context** includes the configured external system and environment. The same local identifier can exist in two different applications or environments. That doesn't establish that the accounts are the same record.

If one source combines populations whose keys overlap, its account-identification design must still distinguish the represented accounts in a supported way. Do not silently switch to an unstable or unapproved composite value.

A **composite identifier** combines agreed components into one account key. Its uniqueness, stability and connector compatibility need design and validation; concatenating fields isn't automatically a safe repair for an existing source.

## Account attributes don't automatically become identity values

An **identity attribute** is a named value on the ISC identity. An account attribute belongs to the source account representation.

They can have the same English name without being the same field.

InvoiceTrack department describes the application account's collected department. The identity's department follows its applicable identity-profile mapping and processing.

Adding department to an account schema doesn't, by itself, replace the identity's department. It also doesn't establish that either value should be authoritative for the business.

An **authoritative source** provides accounts used to establish identities through an identity profile. Declaring source authority is separate from choosing this account's ID and Name fields.

An **identity mapping** specifies how an identity attribute obtains its value. **Identity processing** evaluates the identity under relevant configuration. Those mechanisms need their own inputs and conditions.

A **transform** calculates or formats a value under supported logic. It can participate in mapped-value designs, but merely defining a schema field isn't a transform.

Keep those responsibilities separate when someone asks, “Why hasn't the department changed everywhere?” Start by identifying which department value they mean.

## Review identifier changes before touching the definition

Imagine a request to replace loginName with fullName as Account Name so accounts “look nicer.”

That changes a designated naming field, not just the text on one account. After aggregation, the documented duplicate and reference risks apply.

Compare that with correcting a non-designated descriptive fullName value. In our example, accountKey and loginName remain unchanged. The change concerns the descriptive field, subject to its actual read or write configuration.

A third situation is an external application renaming the value used by an identifying or designated naming field.

That isn't automatically the same as changing which schema field is selected. But it still requires the connector's documented rename behavior and careful verification of existing account relationships and references. Don't promise it is harmless just because the schema selection stayed the same.

For a proposed schema change, identify dependent account associations, identity mappings, correlation inputs, entitlement representations, reports and provisioning configuration. Changing a field's purpose can affect more than its own column.

Use approved impact assessment and controlled validation. Do not reset or delete a source, remove its accounts or redesignate identifiers as an exploratory repair.

The useful result is not “the form saved.” It is correct representation of the intended accounts, retained or deliberately managed relationships, valid values and evidence that the approved change behaved as intended.

## Work through the field choices

### 1. One employee number, two accounts

InvoiceTrack returns `inv-acct-44004` and `inv-admin-acct-44004`. Both carry employeeNumber `44004`.

Can employeeNumber replace accountKey as the account identifier because it identifies Devi?

**Worked reasoning:** Not for this supplied two-account design. It doesn't distinguish the account records. Preserve the supported distinct account identifiers and use the approved employee-number relationship for ownership matching. One person can own both accounts.

### 2. Two accounts display the same full name

Both inspected records show fullName = Devi Rao, but have the correct distinct keys and login names. The designated Account Name remains loginName.

Does the repeated fullName prove duplicate account identification?

**Worked reasoning:** No. It is an ordinary descriptive field in this example. Inspect the actual Account ID and Account Name designations and values. Don't confuse a repeated human name with a duplicated account key, or assume every label on the screen is the designated Account Name.

### 3. The schema has office, but the account doesn't

The API response includes officeCode = BLR. The schema defines office. The supplied mapping reads missing siteCode instead.

Should the team add another office attribute?

**Worked reasoning:** No. The definition already exists. Correct the supported input-to-account-field mapping, perform appropriate collection and inspect the resulting account value. The external data was available; the stated mapping defect prevented it from reaching the intended field.

### 4. A record has a person reference but no account key

A row contains employeeNumber `44004` but lacks the value required by the selected Account ID.

Will account correlation supply the missing identifier?

**Worked reasoning:** No such repair follows. Correlation establishes ownership using configured comparisons; it doesn't invent a valid external account key. Investigate the data, read output and schema mapping under the connector's requirements before treating the record as correctly represented.

### 5. Account Name is changed after aggregation

The proposal replaces loginName with fullName as the designated Account Name on an existing source. Someone calls it a cosmetic label change.

Can it be approved on that description alone?

**Worked reasoning:** No. It changes the schema's designated naming attribute. The documented guidance strongly discourages such changes after aggregation and warns of duplicates and other serious effects. Assess dependencies and supported change handling; don't use a schema redesignation as a display-format shortcut.

### 6. A new schema field appears

The team adds costCentre to the source schema. No target operation or new collection result is supplied.

Has that created a field in InvoiceTrack or populated every existing ISC account?

**Worked reasoning:** Neither outcome is established. The schema defines representation. Check whether the external information exists, the supported read exposes it, the mapping supplies it and the necessary collection has occurred. An external field-creation or update capability would be a separate operation.

### 7. Account department is collected successfully

InvoiceTrack's account has department = Billing Operations in ISC. The identity's department still follows a separate personnel-source mapping.

Should adding the account field automatically overwrite the identity?

**Worked reasoning:** No. Identify the applicable identity mapping and processing. Account-schema definition, identity-value sourcing and external provisioning are separate responsibilities. The correct account value doesn't establish an instruction to replace the identity's value.

## Review a new payroll feed

A proposed payroll source combines two regional exports. Each region uses local account key `u17` for a different person. The proposal selects surname as Account Name and says employee number will “fix any duplicates during correlation.”

What would you establish before approving it?

**Worked reasoning:** Determine the intended source boundary and the identifiers' actual uniqueness and stability. Two different accounts returning the same selected key within one combined source are not resolved by assigning them to different people.

Establish supported account-identification and naming fields with the application owners. Separate source contexts or a deliberately designed supported key can be options, but neither is an automatic migration recipe for an already-loaded source.

Check representative records, schema definitions, exposed export fields, mapping behavior and the conditions for subsequent collection. Establish the employee-number matching arrangement separately, including whether each person can have multiple accounts.

Do not accept surname as a safe account name merely because it is readable. Confirm the connector's naming requirements and the actual data, and assess any post-aggregation change against the documented risks.

You can explain the design to the owner this way: “The schema defines what an account record represents and which fields identify and name it. The values must come from the supported read and mapping. Correlation then establishes who owns the account; it doesn't repair an account key that cannot distinguish the records.”
