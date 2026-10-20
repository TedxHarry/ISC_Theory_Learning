# Object IDs, account identifiers, and names: which record are we talking about?

Devi works in Finance. Her employee number is `26006`, and she uses the account `fin-26006` in an invoice system called Ledger. She needs to read invoices, not release payments.

An engineer is checking her access in SailPoint Identity Security Cloud, or ISC. The screen shows an entitlement called **Invoice reader**. An entitlement is an access item represented from a source, such as a group or permission.

A second search result also says **Invoice reader**.

Which one belongs to Ledger production? Which one is included in the access package intended for Devi? Would changing the visible name change the permission itself?

The names help you read the screen. They don't answer those questions on their own. Let's follow the records behind them.

## Start with what each number identifies

An **object** is a particular record that ISC manages: an identity, a source, an account representation, an entitlement, or an access configuration.

An **object ID** identifies that record. It lets another record or operation refer to a specific object without depending only on a name that people recognize.

An **identity** is ISC's person-level representation of Devi. An **account** is her record in Ledger. ISC also holds a representation of that account, collected through its Ledger integration. Those are different records with different purposes.

Her employee number belongs to yet another context. It is a business identifier supplied by the organization, not automatically the ID that ISC assigns to her identity.

Here are the records for this fictional example. The short labels `I-26`, `A-26`, and the other letter-number labels stand in for technical IDs. They are not real tenant IDs or values to paste into an API.

| Record or value | Example | What it identifies here |
|---|---|---|
| Employee number | `26006` | Devi's employment record under this organization's numbering policy |
| ISC identity ID | `I-26` | Devi's identity record in ISC |
| ISC source ID | `S-26` | The Ledger production source configuration in ISC |
| ISC account object ID | `A-26` | ISC's representation of one Ledger production account |
| External account identifier | `u-778` | The Ledger production account as identified by this integration |
| Account login name | `fin-26006` | The username Devi uses in Ledger |
| Identity display name | Devi Rao | A readable label for the person |

A **source** is ISC's configured representation of a system or collection of account data. Here, `S-26` represents Ledger production. A **connector** is the integration used to read that data and perform supported changes.

Look at the employee number and the identity ID. Both concern Devi, but they don't identify the same kind of record.

If a field asks for an ISC identity ID, supplying `26006` because it is “Devi's ID” gives it the wrong kind of identifier. If a target operation expects Ledger's account key, supplying `I-26` gives it an identity ID where it needs a source-account identifier.

The useful question is: **ID of what, in which system?**

## An account can have more than one identifier

Ledger has given Devi's account the external key `u-778`. Its login is `fin-26006`. In this example, Ledger keeps that key when the login changes.

ISC's account representation has its own object ID, `A-26`. It records the source relationship and information read from Ledger. These values coexist; one doesn't replace the others.

An **API** is an interface software uses to read information or request operations. An **endpoint** is the address for a particular operation or resource.

In account API representations, you can encounter fields such as `id`, `sourceId`, `identityId`, and `nativeIdentity`.

Read them in the account's context:

- `id` identifies the ISC account object.
- `sourceId` identifies the source to which that account belongs.
- `identityId`, when populated, identifies the ISC identity associated with it.
- `nativeIdentity` identifies the account in its source-system context.

For our Ledger integration, the native identity is `u-778`. It is not the login name `fin-26006`, the employee number `26006`, or the ISC account object ID `A-26`.

That separation is a condition of this example, not a promise that every connector uses the same kind of native identity. A connector can use a username, a distinguished name, or another system-specific key. A distinguished name is a directory-style location/name for an object. If that location or name changes, the identifier itself can change.

You may also encounter `uuid` as a separate account field. The account model describes it as the account's unique ID determined by its schema. Don't collapse `uuid`, `nativeIdentity`, and the ISC object `id` into one meaning because all three look technical.

An **attribute** is a named piece of information on a record, such as its login or employee number. A **schema** describes the attributes represented for an object and their designated uses. A source account schema includes attributes designated as **Account ID** and **Account Name**. Those designations concern the source's account data. They aren't an instruction to put ISC's account object ID into an external account field.

For a real source, inspect its schema, connector documentation, and returned account data together. Check which source values are used for each identifier. Don't infer the mapping from the field's English name alone.

Even `accountId` needs context. In ISC Search, the account field with that name uses the source's `aiqAccountName` when available, otherwise the account's display name. It must not automatically be read as the account API object's `id`. A search document and an account API response are different representations, with their own field definitions.

Before copying a value from one screen or interface to another, establish what the receiving field expects.

## A reference connects records without making them the same record

A **reference** points from one record to another. It answers a relationship question: which source, which identity, which entitlement?

For `A-26`, a source reference to `S-26` means “this represented account belongs to the Ledger production source.” An identity reference to `I-26` means “this represented account is associated with Devi's identity.”

That association is **account correlation**: matching and assigning a source account to the appropriate ISC identity.

Suppose Ledger's collected account has an employee-number attribute of `26006`. The configured correlation compares it with Devi's identity employee-number attribute. In this example the values match one intended identity, and the account is associated with `I-26`.

The number helps make the match. The resulting relationship points to the identity record. It doesn't change the account's ISC ID to `26006` or turn Devi's identity into a Ledger account.

The organization still has to govern that business identifier. If employee numbers can be reused or supplied incorrectly, a matching value alone doesn't establish that the intended person was selected. Check the data and matching design; don't treat the word employee as a guarantee of uniqueness or accuracy.

Here is the relationship after the account has been collected and correlated:

```text
ISC account object A-26
  login shown: fin-26006
  native identity: u-778
  employee number attribute: 26006
  |
  +-- source reference --------> S-26
  |                              Ledger production source
  |
  +-- correlated identity -----> I-26
                                 Devi Rao
                                 employee number: 26006

External account represented by A-26:
  Ledger production / native key u-778
```

The arrows mean “refers to,” not “creates,” “copies every attribute,” or “signs in.” The last lines identify the external record represented by the account object; they don't describe a live query.

Correlation is also separate from identifying an account within its source. A correct source-account key can identify an account whose association with a person is wrong. A correct person association can coexist with a failed target change.

Keep those checks separate.

The same reference idea appears elsewhere. An access object's owner reference identifies the responsible identity, not that person's application account. A manager identity reference identifies another person-level identity. Neither relationship means the owner or manager receives the access being described.

## The entitlement has an ID and a source value too

Ledger contains a group with the key `g-41`. A group collects accounts into a named membership that the system can use to assign access. In this fictional application, membership permits invoice reading. It doesn't permit payment release.

ISC represents that group as entitlement object `E-26`, with the display name **Invoice reader**. Its source is `S-26`, its entitlement type is `group`, and its source value is `g-41`.

An **entitlement type** identifies the kind of access item within a source. A source can expose different kinds of items, such as groups and permissions.

Now compare these two facts:

- `E-26` identifies the entitlement record in ISC.
- `g-41` identifies the group in the source data used by this integration.

If Devi's collected account contains a group-membership value of `g-41`, it doesn't need to contain the ISC entitlement ID `E-26`. Ledger knows its own group key, not the ID ISC uses for the represented entitlement.

How does ISC connect the membership value with the entitlement's details?

For the account-attribute linking pattern here, the account attribute is marked as an entitlement, its name matches the entitlement type, and the collected membership value matches the attribute designated as the entitlement ID in the entitlement schema. The source context must also be the intended one.

In our example, the account's entitlement-marked `group` attribute contains `g-41`, and the separately collected `group` entitlement has designated ID value `g-41`. That supplies the link to the represented group and its readable details.

The comparison isn't “does the screen say Invoice reader?” It is about the configured source/type relationship and the source values.

This explains a useful failure case. The source sends `g-41`, but an export or mapping replaces it with the label `Invoice reader`. If the entitlement's designated ID remains `g-41`, the displayed words don't repair the mismatch. The supplied membership value no longer matches the expected ID value.

Check the raw collected membership, the account schema, and the entitlement record. A friendly label can hide a reference problem.

## Follow the access profile to the permission it actually contains

An **access profile** is a bundle of related entitlements from one source. The profile **Read invoices**, represented here by `P-26`, contains entitlement `E-26` from source `S-26`.

A **role** groups access needed for a responsibility or population. Our example role **Invoice checking**, `R-26`, includes that access profile. This is one illustrated relationship; it doesn't mean every role must contain only access profiles.

These are access definitions. Their existence alone doesn't prove Devi has received the access.

```text
Role R-26: Invoice checking
  |
  +-- includes access profile --> P-26: Read invoices
                                   |
                                   +-- source reference --> S-26
                                   |                        Ledger production
                                   |
                                   +-- entitlement -------> E-26
                                                            display: Invoice reader
                                                            type: group
                                                            source value: g-41
                                                            source: S-26

Account A-26, on source S-26
  |
  +-- collected group value g-41
        |
        +-- links to E-26 when schema/type/ID conditions match

Role/profile inclusion describes the access definition.
Collected membership describes the account observation.
Neither line alone proves the original grant or current usable access.
```

The inclusion arrows describe configuration. The membership branch describes collected data. These are not steps that run from top to bottom each time someone signs in.

Notice that the profile points to `E-26`. Its meaning depends on that entitlement's source and source value, not just its label.

An engineer can select a familiar-looking item from the wrong source. The reference can be technically valid and still be wrong for the business requirement.

That is why checking only “the profile contains one entitlement called Invoice reader” is incomplete. Resolve the referenced entitlement and verify what it represents.

## Two matching names can mean different access

Consider two collected entitlements:

| ISC entitlement ID | Display name | Source context | Type and source value |
|---|---|---|---|
| `E-26` | Invoice reader | `S-26`, Ledger production | `group`, `g-41` |
| `E-27` | Invoice reader | `S-27`, Ledger test | `group`, `g-41` |

The source value matches too. Does that make these one entitlement?

No. The key `g-41` belongs to two separate system contexts here. A test environment can contain copied names and copied native keys. Its permission doesn't thereby grant production access.

An **environment** is a separate operating context, such as a production system or a test system. A **tenant** is a particular hosted ISC environment. You must know which tenant and source you're examining.

Within a source, entitlement type also matters. A group key and a permission key aren't interchangeable merely because their characters match. Read the enclosing record and the relationship definition.

The same discipline applies to account investigation. “Update `u-778`” is incomplete if nobody has established which system and environment owns that key.

For moving a design from an ISC test tenant to production, map the intended objects in the destination. Matching names are useful clues. They aren't proof that copying technical IDs will reproduce the intended relationships.

## What happens when only the display name changes?

Suppose an administrator edits the ISC display name of `E-26` from **Invoice reader** to **Ledger invoice reading**. Its source, type, and value remain `S-26`, `group`, and `g-41`.

The object is still `E-26`. The profile still refers to `E-26`. Ledger's group remains `g-41`.

SailPoint's entitlement editing behavior is specific here: changes to the entitlement display name and description in ISC are not sent to the source. This edit improves what people read in ISC; it isn't a request to rename Ledger's group or change its membership.

A saved label change also isn't evidence that every search result or open page has refreshed. Check the current record and the relevant view before concluding that a label discrepancy represents a different object.

Now reverse the direction. Someone renames a group in the external system.

Can you assume this is equally harmless?

No. First establish what the connector uses as the source identifier. If it uses a persistent group key and only an unrelated display label changes, that is different from a source whose designated identifier is the name itself.

Collecting account or entitlement data into ISC is called **aggregation**. For example, SailPoint's Snowflake connector documentation warns against changing source user/role `name` values used as account/entitlement IDs after aggregation. A readable-looking name can be an identifier with integration consequences.

“Names can change” is not permission to change every field containing the word name.

## Changing an identifier is a different kind of change

Separate two operations that can sound deceptively similar.

**Changing the schema selection** means changing which attribute ISC treats as Account ID, Account Name, or an entitlement's designated ID/Name. You are changing how account or entitlement records are identified in that integration.

**Changing a value in the external system** means altering an actual account or group's identifier value. The connector's behavior and supported rename procedures determine how that change can be handled.

Neither operation is the same as editing an ISC entitlement's display label.

SailPoint strongly discourages changing source Account ID or Account Name designations after accounts have been aggregated. Its schema documentation warns about duplicate accounts and identities and broken account references. Entitlement schema documentation also warns that changing designated entitlement name/ID attributes after aggregation can create duplicate entitlements.

Don't turn those warnings into a prediction that every change produces exactly the same symptom. The consequence depends on what changed and the integration involved. The practical lesson is to investigate dependencies and the supported change procedure before touching identification settings.

For Ledger, imagine the external key changes from `u-778` to `u-991`. The human tells you, “It's still Devi's account.”

That may describe the business intention. It doesn't establish how the connector will recognize the changed record, preserve its ISC association, or address a pending operation that names the old key.

You need the actual before-and-after data and connector behavior. Don't assume ISC will automatically follow the change, create a second account, or delete the old one. Those are possible questions to investigate, not outcomes established by that sentence.

## Deleting and recreating is not a rename

An administrator removes the test entitlement record `E-27`. Later, the test environment presents an entitlement with the same display name, but the current ISC record has ID `E-28`.

The supplied facts now identify a different ISC object. Matching text doesn't make `E-28` the old record `E-27`.

If a saved configuration or investigation note still refers to `E-27`, you must inspect and reconcile that dependency. Don't assume it automatically retargets by visible name. Whether an operation rejects a missing reference or another cleanup mechanism applies depends on the particular feature.

An ID is a precise reference to an object in context, not a promise that the object survives deletion, source resets, or a migration.

This is also why deleting and recreating a source is not a safe first response to an account-data mismatch. It changes the situation you're trying to understand and can affect dependent configurations and records. Begin with read-only evidence.

## What should you check on the screen and behind it?

A screen needs readable names. A person reviewing **Ledger invoice reading** can understand it more easily than a long technical ID.

The **front end** is the interface you see. The **backend** is the trusted application processing behind it.

The backend needs enough information to operate on the intended record. Access-profile data includes source and entitlement references. Account data includes its source and, when correlated, the associated identity. The user interface can show the names of those related records without exposing every ID beside them.

Don't infer a private database layout from that description. These are documented object relationships, not a claim about SailPoint's internal storage implementation.

When you investigate an access issue, keep the relationship chain intact:

1. Establish the tenant and business environment.
2. Identify the particular ISC object and its type. Read its current details rather than relying only on a remembered label.
3. Follow its source and other relevant references.
4. For an account or entitlement, inspect the source identifier and the schema/connector meaning of that value.
5. Compare the intended relationship with the actual one, then check the operation and target evidence if a change was attempted.

**Provisioning** is carrying out supported account or access changes. For example, after the applicable access decision, a supported Ledger integration could attempt to add `g-41` to Devi's intended account.

Correct references are necessary to address the intended records. They don't prove authorization to make the change, connector support, successful execution, or current application access. A provisioning result and a collected membership answer different questions; using the application tests another boundary.

For a support handoff, “Invoice reader failed” leaves too much unresolved. A useful note identifies the tenant, production source `S-26`, profile `P-26`, entitlement `E-26` with source value `g-41`, and account `A-26` representing `u-778`. Add the observed operation, time, result, and missing evidence.

Share only through approved channels and omit credentials. An object ID is not a password or an authorization grant, but account and identity details still need appropriate handling.

## Try these against the actual relationships

### 1. Which ID belongs in the field?

A documented operation asks for the ISC identity ID of the recipient. You have employee number `26006`, account object ID `A-26`, native identity `u-778`, and identity ID `I-26`.

Which value belongs there, and what would you verify before using it?

**Worked reasoning:** Use the real ISC identity ID represented by `I-26`. Verify that it resolves to Devi's intended identity in the intended tenant. The other values identify employment data or account records in different contexts. A correct-looking string doesn't replace that object check.

### 2. The names match, but access doesn't

A request raised for Devi's production work selects a profile from Ledger test, `S-27`. Its entitlement reference resolves to `E-27`, labeled Invoice reader. Devi needs Ledger production, `S-26`.

Does the matching name establish the correct permission? Should you retry immediately?

**Worked reasoning:** No. The supplied reference resolves to the wrong environment for the requirement. Check the profile's source and entitlement configuration and the actual request/fulfillment record. A single-source profile must use its own source's entitlements; don't assume the saved configuration secretly means production. Repeating the request doesn't repair the wrong access definition. The facts don't prove which account was changed or whether any change succeeded.

### 3. The new label looks like a new permission

The administrator changes `E-26`'s ISC display name to Ledger invoice reading. Its ID, source, type, and value remain unchanged. A colleague asks whether Devi needs a new Ledger group.

**Worked reasoning:** The supplied change is to ISC's entitlement label. It isn't sent to Ledger and doesn't establish a new group or membership requirement. Inspect the referenced record if necessary: `E-26` still represents source `S-26`'s `group` value `g-41`. A new label alone is not new access.

### 4. A membership contains the friendly words

The collected account's entitlement-marked `group` attribute contains `Invoice reader`. The corresponding source/type entitlement has designated ID value `g-41`.

Can the display name make those values equivalent?

**Worked reasoning:** No. The stated linking condition requires the membership value to match the designated entitlement ID value. Inspect the external data, export or connector mapping, schema, and entitlement record to locate where the value changed. Don't change the entitlement schema to its label just to make this one record appear to match; that can disturb existing identification and references.

### 5. The source account was renamed

Ledger's login changes from `fin-26006` to `finance.devi`. Its native key remains `u-778`. A separate source instead identifies accounts by their login, and its login changes too.

Are these the same technical change? Can you guarantee that every reference survives?

**Worked reasoning:** They aren't the same identifier change. In the stated Ledger case, the external key remains unchanged while the login changes. In the other source, the value used to identify the account changes. For each integration, verify the schema, supported rename behavior, returned account values, current ISC record, association, and relevant operation results. The facts do not establish the handling of every reference or pending operation.

## Take the same reasoning into another system

A warehouse platform has these fictional records:

| Record | Supplied facts |
|---|---|
| Production source | `S-81`, Warehouse production |
| Test source | `S-82`, Warehouse test |
| Production account representation | `A-81`, native identity `w-305`, login `stock.operator`, correlated identity `I-81` |
| Production entitlement | `E-81`, label Stock reader, type `permission`, source value `stock.read`, source `S-81` |
| Test entitlement | `E-82`, same label/type/value, source `S-82` |
| Production access profile | `P-81`, source `S-81`, entitlement reference `E-81` |

Explain which record a production permission change must concern. Then consider a proposal to replace `E-81` with `E-82` because “the names and values match.” Finally, say what you can conclude if the only observed change is the ISC display name of `E-81`.

**Worked reasoning:** Follow `P-81` to source `S-81` and entitlement `E-81`. For the stated account, distinguish ISC object `A-81` from source account `w-305` and person identity `I-81`. A supported production write must address the intended external account and permission within the correct source context. The exact operation format comes from that connector, not from these teaching labels.

Substituting `E-82` is wrong for the stated production profile: it belongs to another source. Equal native values in separate environments don't make the entitlement references interchangeable.

Changing only `E-81`'s ISC display name doesn't change the represented source permission or send a rename to the warehouse platform. It also doesn't prove a grant or removal occurred. To establish delivered access, inspect the supported operation and current target evidence separately.

If you were explaining this to a teammate, start with one sentence: “The name helps us recognize it; the identifier and its context tell us which record it is.” Then follow one complete relationship from the access profile to the source permission and intended account. That is the difference between recognizing a label and knowing what the system is addressing.
