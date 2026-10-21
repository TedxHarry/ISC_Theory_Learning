# How does an account value become an identity value?

Devi, employee number `63003`, is a payroll analyst. Her collected directory account contains Work Email input `Devi63003@Example.com`, but her identity in SailPoint Identity Security Cloud (ISC) shows `devi63003@example.com`.

Has ISC changed the directory account? Has it read a different account? Or has a configured calculation changed the value used on the identity?

The lowercase result can be correct. To explain it, we need the account ISC used, the field it read and the mapping that produced the identity value. Looking at two screens and noticing a difference isn't enough.

## Start with the two records

An **account** is a record in a particular system. An **identity** is ISC's representation of a person or another managed entity. Here, the identity represents Devi and connects her person-level information with her accounts and access.

A **source** is ISC's configured representation of a system or account-data collection. The source's **connector** supplies its supported integration behavior. **Account aggregation** reads account information into ISC; the collected source account represents what ISC obtained through that integration.

An **attribute** is a named piece of information. `mail` on a directory account is an account attribute. Work Email, whose technical name is `email`, is an identity attribute. They are fields on different objects.

An **identity profile** is shared configuration for the identities governed by it, including their identity attribute mappings. An **authoritative source** supplies the accounts from which ISC establishes identities through that profile. Devi's governing profile is **Employees**, associated with **WorkerLedger Production**.

Our fictional example already has a complete identity and correctly associated accounts: worker account `hr-63003` and **Corporate Directory** account `cd-63003`. **Account correlation** is the matching and association of accounts with their identities. We assume that association is correct here, rather than using a value calculation to repair account ownership.

Corporate Directory is non-authoritative for this employee population. It can still supply Work Email. The source that establishes a person does not have to supply every person-level value.

## The account schema and the identity mapping do different work

An **account schema** describes the account fields ISC expects on a source, including their types and whether a field can hold multiple values. It also designates account-identifying fields.

Corporate Directory's configured Account ID uses `accountKey`. Its value `cd-63003` identifies this source account; `devi63003` is the login name. Neither is the identity attribute's technical name `email`.

These selected account values are shown as **JSON**, a text format using named fields and values. Quoted values are text; square brackets enclose a list.

```json
{
  "accountKey": "cd-63003",
  "login": "devi63003",
  "mail": "Devi63003@Example.com",
  "officeCodes": ["blr", "hyd"]
}
```

This is a fictional teaching record, not an ISC API response or upload template. The directory schema includes `mail` as a text field and `officeCodes` as a multi-valued text field.

The schema makes these fields available as represented account data. It does not decide that `mail` populates Work Email, or that the first office code should become identity Location.

An **identity attribute mapping** supplies that separate instruction. It selects the input for a person-level field and, where configured, the calculation that produces the result.

Adding a field named `email` to an account schema does not automatically create a correctly configured identity Work Email mapping. Likewise, changing the identity mapping doesn't repair a connector that extracted the wrong account field during collection.

## A direct mapping uses the selected value

A **direct mapping** obtains an identity value from the configured source account attribute without an additional conversion in that mapping.

Suppose WorkerLedger supplies `workerNumber` as text `63003`. The Employees profile maps identity Identification Number, technical name `identificationNumber`, from that account attribute. With the intended associated worker account selected, the result is `63003`.

The source field and destination field have different names. A mapping connects them; matching names are not required.

Here are selected mappings for Devi. Assume the required account data is available, each source has only the intended eligible account for this primary example, and no other configured input overrides these selections.

| Identity attribute | Source input | Mapping operation | Expected result |
|---|---|---|---|
| Identification Number, `identificationNumber` | WorkerLedger `workerNumber`: `63003` | Direct | `63003` |
| User Name, `uid` | WorkerLedger `iscUserName`: `employee63003` | Direct | `employee63003` |
| Last Name, `lastname` | WorkerLedger `familyName`: `Rao` | Direct | `Rao` |
| Work Email, `email` | Corporate Directory `mail`: `Devi63003@Example.com` | Convert to lowercase | `devi63003@example.com` |

The table's WorkerLedger label refers to WorkerLedger Production. These are selected fields, not the complete profile configuration.

The first row answers, “Where did this identity number come from?” The last row needs one more explanation: how did the input become lowercase?

## A transform calculates the output

A **transform** performs a configured calculation or conversion on input data. For Work Email, Employees selects the directory's `mail` and applies the supported lowercase conversion.

**Normalization** means converting information into an agreed representation. Here, the agreed representation uses lowercase letters. It changes how the value is represented, not which mailbox the organization intends to identify.

The administration interface provides a **ToLower** option. The developer transform operation is named `lower`. Both describe converting text to lowercase; don't confuse a friendly display label with a technical operation name.

For this mapping, the input is `Devi63003@Example.com`. Converting its letters to lowercase produces `devi63003@example.com`. That is the expected identity value.

The transform doesn't change the account's `mail` merely by producing this result. It also doesn't check that the mailbox exists or accepts mail. The organization's approved email convention supplies the reason for this conversion; lowercase is not a universal repair for every data problem.

**Identity processing** evaluates identity information against configuration, including its profile mappings and applicable access requirements. The route for this mapping is:

```text
Corporate Directory account cd-63003
mail: Devi63003@Example.com
                 |
                 | Employees Work Email mapping
                 | selects collected mail input
                 v
ToLower conversion
devi63003@example.com
                 |
                 | mapping result used in
                 | identity processing
                 v
ISC identity Work Email
email: devi63003@example.com

Directory mail is not rewritten here.
```

The diagram shows the value dependencies when this mapping is evaluated and applied. It doesn't prescribe private service calls, database transactions or a fixed processing duration.

The input is ISC's collected account information. Evaluating the mapping isn't proof that the connector has just made a fresh call to the directory. If the directory changed after the last relevant account read, inspect that freshness separately.

Transforms can also combine inputs, make decisions or convert formats. If a requirement needs supported code-based calculation, an identity mapping can use a **rule**. That is a separate extension mechanism, not a reason to write custom code for a straightforward direct mapping or lowercase conversion. Applicable cloud rule review and approval requirements still apply.

There is one detail you should inspect when a calculation appears to ignore the visible Source and Attribute selections. A transform can define an **explicit input**, meaning its definition supplies the input rather than relying on the interface's selected source/attribute combination.

In that situation, trace the configured transform definition too. A familiar mapping label doesn't prove which value the calculation actually consumed.

## Which account supplied that field?

The primary example has one eligible directory account. Now change that condition.

Suppose Devi has two correctly associated accounts on Corporate Directory: ordinary account `cd-63003` and administrative account `adm-63003`. Their `mail` values differ.

Choosing Corporate Directory and `mail` identifies a source and field. It does not, by itself, express the business requirement “use the ordinary employee account, never the administrator account.”

The supported **Account Attribute transform**, technical operation `accountAttribute`, looks up an account on a specified source for the identity and returns a selected attribute. Its account-selection options matter when more than one account is eligible.

For this transform, the documented default sorts accounts by their `created` attribute in ascending order, so the oldest is considered first. If that account's requested value is null, meaning no value is present, the default can continue to another account with a non-null value.

Those are this transform's defaults, not a universal “oldest record wins” rule for every ISC feature or calculation. Don't read `created` as the employee's hire date or assume it is the business date you intended.

The transform supports configured filtering and sorting. **Filtering** narrows the eligible accounts. **Sorting** orders the remaining accounts. Its `accountReturnFirstLink` option also controls whether the first account's value is returned even when null, rather than continuing to a non-null value on another eligible account.

For example, an approved filter can limit selection to the intended ordinary account classification. Sorting alone cannot express “never use an administrator account” unless the resulting eligibility and ordering actually establish that requirement.

These account-selection filters apply to choosing among the identity's accounts for the calculation. They are not connector collection filters and don't change which external accounts aggregation reads.

If no account meets the approved selection, investigate that missing eligible input. Don't silently accept an unrelated account's value because it makes the field look populated.

## One account can still contain more than one value

**Cardinality** means how many values a field can hold. A single-valued field holds one value; a multi-valued field can hold a list.

In Devi's selected record, `mail` is one text value, while `officeCodes` contains `["blr", "hyd"]`. Choosing the correct account doesn't decide what a one-value identity Location should mean when the account lists two offices.

For the identity-profile mapping-transform behavior documented in the administration guide, adding a multi-valued attribute takes its first value and transforms it into a single value.

If that list is `["blr", "hyd"]` and the mapping uses uppercase conversion, the resulting single value is `BLR`, not both offices and not automatically the employee's primary office. `HYD` has not become an additional identity Location through that operation.

This does not mean every transform or API treats every list the same way. Trace the specific supported operation and the required result.

If the business needs one primary location, obtain a reliable primary-location input or an approved selection rule. If it needs the complete set, design for that requirement. Taking the first item isn't a business definition of “primary.”

## Check the kind of value, not just how it looks

A **data type** describes what kind of value is represented, such as text, a number or a date. A conversion can preserve or destroy information depending on what that value means.

Suppose a cost-centre identifier is text `0042`. Converting it to a number produces `42`; the leading zeros are lost. If another system treats `0042` and `42` as different identifiers, that conversion changed the meaning needed for a match.

Don't solve this by adding zeros without knowing the identifier's approved format. Trace the original representation and the consumer's actual requirement.

A **fallback** is an alternative input or result used under a configured condition. It needs an approved meaning. An old email address, a fabricated surname or a generic identifier is not automatically valid just because it avoids a blank.

Also separate missing, null and empty values. A missing field isn't supplied. Null represents no value. An empty string is text containing zero characters; a space is a character. These are not interchangeable inputs, and a fallback calculation's behavior must be checked rather than assumed.

User Name `uid`, Work Email `email` and Last Name `lastname` are required identity attributes. Their mappings must produce non-null values; `uid` must also be unique across identities from all profiles. Missing required values and duplicate usernames generate identity exceptions, which report identity-data problems. Missing required attributes also appear as Incomplete Identities.

A non-null Work Email is not proof of email-format validation or a usable mailbox. Don't use an arbitrary string to turn an incomplete record into an apparently complete one.

## What runs after the account changes?

When aggregation changes identity data, event-based identity processing can update mapped values according to the profile. A change to configuration is a different event: after editing an identity mapping, you must apply that configuration through the relevant identity processing.

**Preview** evaluates mappings for a selected identity using available data and shows proposed results. It does not establish that those values have been persisted, meaning stored on the identity, or written to an application.

For a saved mapping change, **Apply Changes** on the profile initiates processing for identities associated with that profile. A profile showing **Needs Processing** is not evidence that the saved change already affected every identity.

Processing also evaluates applicable access requirements. Review those dependencies before applying a shared mapping change; this is more than reloading a page.

A **role** can package access and use identity values as membership criteria. A **lifecycle state** describes a business stage such as active employment and can drive configured access changes. **Attribute synchronization** can send selected identity values to existing correlated source accounts. **Provisioning** carries out supported account or access changes.

These consumers explain why a correct-looking mapping can have effects beyond the field you're investigating. They do not mean every mapping change must change a role, state or target account.

Keep the direction clear:

```text
Collected account value
          |
          | profile input and calculation
          v
Identity attribute value
          |
          +-- Configured role/state decisions
          |
          +-- Configured account synchronization
                  |
                  | supported provisioning
                  v
              Target account value

Each required outcome needs evidence.
```

The upper path calculates identity information. The lower branches describe possible configured consumers, not mandatory stages for every mapping. Verify an external result separately; identity processing does not validate successful provisioning after starting that work.

In our main example, the profile and lowercase mapping are already applied, and the supplied identity Work Email is confirmed as `devi63003@example.com`. Directory `mail` remains `Devi63003@Example.com`; no email synchronization write is configured. The difference is explained by the mapping, not by an assumed directory update.

## Write down the value's route

Use the same questions when reviewing a proposed mapping or investigating an unexpected value. Record observations rather than filling gaps with assumptions.

1. Name the identity and output. Record the identity reference, governing profile, identity attribute's technical name, expected value and actual value. A matching display name alone does not identify the person or field.
2. Identify the configured input. Record the source and account attribute, plus any calculation or explicit input that changes where the value comes from. Inspect the saved definition, not just a familiar label.
3. Establish the account selection. Record the eligible associated account or accounts, their identifiers and any filter, sorting or null-selection behavior. One source can contain more than one account for a person.
4. Inspect the represented input. Record the actual collected value, whether it is text or another type, whether it is one value or a list, and when it was observed. Compare live producer data separately if freshness is in question.
5. Work through the calculation. Show the selected input and each relevant conversion or decision. Distinguish approved normalization from an incorrect field, missing data or an unjustified fallback.
6. Check the proposed result. Compare Preview with the expected value for this identity and representative population variations. A successful sample does not prove coverage, persistence or target delivery.
7. Verify the applied identity value. Record the relevant processing evidence and the value now shown on the identity. Separate a saved mapping, completed processing and the observed result.
8. Follow the consumers when required. Identify any matching, lifecycle, role, synchronization or provisioning behavior that uses this value. Verify each required downstream outcome with its own evidence; a correct identity value does not prove a successful target change.

For Devi's Work Email, the filled trace is: Employees governs the identity; `email` selects Corporate Directory account `cd-63003`, attribute `mail`, input `Devi63003@Example.com`; ToLower produces `devi63003@example.com`; the applied identity value matches; no directory write is configured or implied.

If the investigation stops at “Corporate Directory is selected,” the account, field, calculation and observation evidence are still missing.

## Use the screen that represents the right stage

| Evidence | What it helps establish | What it cannot establish alone |
|---|---|---|
| Source account details | Collected account, represented fields and association | That the application currently has the same value or the profile selects this account |
| Account schema | Available field names, expected types and value counts | The identity mapping's selected field or calculation |
| Governing profile's mapping and transform definition | Intended source/attribute, explicit input and selection/calculation behavior | That every required account/input exists or processing finished |
| Mapping Preview | Proposed values for the selected identity and current inputs | Population coverage, stored values or target changes |
| Identity Details after processing | The represented person-level output | Correct source authority, business approval or successful external delivery |

A correct calculation can still implement the wrong requirement. If the approved source or field has not been established, escalate that design question to its owner. Don't choose the value you personally prefer and call it a technical fix.

## Try tracing these changed conditions

These are fictional variations with their own supplied facts.

### 1. The live directory changed after the collected account

**Facts:** The live directory has a new email. ISC's collected `mail` is still the old value. The mapping correctly lowercases that collected input.

**Question:** Does another mapping preview prove the new directory value has been read?

**Reasoning:** No. Inspect when and through which operation the account data was collected. The calculation can be correct for an old input. Verify the approved account-data update path and the relevant processing, then check the identity output.

### 2. The right field exists, but the mapping selects another one

**Facts:** The source account contains valid `mail`, but the profile's Work Email mapping selects `login`. No other calculation changes the input.

**Question:** Should you rename the source schema's `mail` field to repair the identity?

**Reasoning:** No. The evidence points to input selection. Confirm the approved mapping, correct it through the normal review process and verify its effects. Renaming a correctly represented field can break other consumers without changing the mistaken selection.

### 3. The calculation has an explicit input

**Facts:** The mapping screen shows Corporate Directory and `mail`. The saved transform definition instead supplies explicit text input `EXAMPLE` to lowercase conversion.

**Question:** What output should you expect from that calculation?

**Reasoning:** `example`. The transform consumes its explicit input, not the directory value you expected from the screen. Inspect the complete definition before changing account data. That text is not a valid Work Email merely because it can be lowercased.

### 4. The first eligible account has no value

**Facts:** An Account Attribute transform has two eligible accounts, oldest first. The first account's requested field is null; the second is non-null. Default null-selection behavior is unchanged.

**Question:** Does the oldest account's null force a null result?

**Reasoning:** No. The documented default returns the first non-null value in that ordered set. With `accountReturnFirstLink` set to true, the first account's value would be returned even if null. Verify which behavior the requirement needs, not just which one produces a populated field.

### 5. The intended directory account doesn't exist

**Facts:** Work Email requires an input from an associated directory account, but no eligible directory account is present. The configured mapping has no alternative input, and a missing required email exception is reported.

**Question:** Does selecting a different letter-case conversion create the missing input?

**Reasoning:** No. The dependency is missing before conversion. Establish how the required account and email should become available, or review an approved initial-value design. A transform cannot turn absent account data into a verified mailbox.

### 6. The source supplies two office codes

**Facts:** `officeCodes` is `["blr", "hyd"]`. The specified identity-profile mapping transform takes its first value and converts it to uppercase.

**Question:** Does the resulting `BLR` prove BLR is the employee's approved primary office?

**Reasoning:** No. It proves the calculation used the first listed value under the supplied behavior. You still need the business meaning and ordering guarantee, or a deliberate primary-office selection design.

### 7. A numeric conversion removes zeros

**Facts:** A source supplies cost-centre identifier text `0042`. A conversion produces `42`. The receiving comparison expects the exact identifier `0042`.

**Question:** Is the conversion harmless because both can describe the number forty-two?

**Reasoning:** No. The consumer expects a particular identifier representation. Preserve or deliberately produce the approved text format; don't substitute arithmetic equivalence for identifier equality.

### 8. The preview matches, but the stored identity doesn't

**Facts:** A saved mapping preview is correct. The profile shows Needs Processing. No completed application of the change or current stored value has been verified.

**Question:** What evidence is still missing?

**Reasoning:** Check the approved change's processing and the actual identity result. Also inspect relevant consumers if the field affects access or synchronization. A good preview is evidence for the proposed mapping, not proof of its completed effects.

## Transfer the reasoning to a returning contractor

A contractor has two correctly associated accounts on ContractorHub Production. The older account is inactive and has an old email address. The current account is active, but its email is null.

The approved requirement says “use the current active account's email.” An Account Attribute transform filters to active accounts, leaving only the current account. No approved fallback is configured.

Someone proposes removing the filter so the older non-null email can fill Work Email and clear the exception.

Explain why that changes the requirement, and what evidence you would request instead.

The filter establishes which account is allowed to supply the input. Removing it makes an ineligible historical account available; a populated result would not prove current contact information. The default non-null selection behavior cannot select the excluded old account while the approved filter remains in place.

Investigate who supplies and validates the current email, when it should be available, and how the approved account-data and identity updates will be verified. If onboarding needs an initial alternative, that is a design decision requiring an approved source and meaning, not permission to reuse an old address.

The useful explanation follows the whole route: this identity, this profile, this eligible account, this field, this calculation and this observed result. Once you can point to each part, a difference between account and identity values becomes something you can explain and investigate.
