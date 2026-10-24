# The entitlement name changed. Is it still the same access?

Devi, employee number `100202`, reads assigned case files in RecordsVault. Her account is `rv-100202`. She already belongs to the application's group `G-6202`.

The application owner renames that group's label from Case Review to Case Review Readers. Its identifying key stays G-6202, its members stay the same, and its permission still allows reading assigned cases, not editing them.

In SailPoint Identity Security Cloud (ISC), someone sees the old name and proposes creating a second access item with the new name.

Would that represent new access, or give us two names for a situation we haven't properly checked?

Let's first separate what identifies the group from what describes it.

The RecordsVault records, configuration, changes and results below are fictional. The example supplies supported account and group collection and verified object continuity. Short labels such as S-102 and E-102 stand in for ISC technical IDs; they are not actual tenant IDs or values to paste into an interface.

## When someone says “the ID,” ask which one

An **entitlement** is an access right represented in ISC from a source, such as membership in an application group. A **source** is ISC's configured representation of a system or collection of account data. Here it is RecordsVault Production.

An **account** is a record in an external system. A **group** collects members, such as accounts, and an application can use that membership to grant permissions. Devi's account and G-6202 are different objects.

The external application has its own objects. ISC has records representing them. Each system needs to identify the records it manages.

A **native identifier** identifies the access object in the external integration's context. RecordsVault's group key is G-6202.

An **ISC entitlement object ID** identifies the entitlement record in ISC. In this example, we call it E-102.

Those identifiers point to related things, but they are not interchangeable.

G-6202 isn't Devi's employee number. E-102 isn't the source's identifier. And neither value is the group's friendly name.

Here is the selected context:

| Value in this example | What it identifies or describes |
|---|---|
| S-102 | ISC's RecordsVault Production source configuration |
| SC-102 | The group schema record in ISC |
| E-102 | ISC's represented entitlement record |
| G-6202 | The external group's identifying value in this integration |
| groups | The supported group entitlement type and linked account membership attribute here |
| Case Review Readers | The group's new human-readable label |
| rv-100202 | Devi's external account, not the group |

An **object** is a particular record. A **reference** points to another object, for example an entitlement's reference to its source.

If an operation expects an ISC entitlement ID, supplying G-6202 because it is “the group's ID” supplies the wrong kind of value. If an external membership value is expected, substituting E-102 confuses ISC's representation with the application's own key.

The receiving interface determines what identifier it expects. Don't choose by which value looks most technical.

## The schema selects a field; the record supplies its value

An **attribute** is a named piece of information on a record. A **schema** describes the attributes represented for a kind of object and their designated uses.

RecordsVault exposes these group attributes:

- groupKey contains G-6202.
- technicalName contains case.review.
- label contains Case Review Readers.
- description contains “Read assigned case files; no editing.”

The group's schema selects groupKey as its **Entitlement ID** attribute. That designation means “use this attribute's value to identify the represented source object.”

It selects label as its **Entitlement Name** attribute. That means “use this attribute's value for human-readable display.”

The distinction between a field and its contents matters. groupKey is a field name. G-6202 is one record's value in that field.

Similarly, label is a field name; Case Review Readers is the supplied display value.

Why retain technicalName if we already have an identifier and a label? It is additional source information that may help the application team recognize the object. Calling it technical doesn't make it the selected identifying key.

An **API**, or application programming interface, lets software read information or request operations. A schema representation can use properties named identityAttribute and displayAttribute. In our example, their values are groupKey and label.

The word identity in identityAttribute concerns identification of objects described by that schema. It does not mean “find Devi's person record.”

Nor does the schema record's own id, SC-102, identify this individual group. One schema describes how a whole kind of object is represented. Many group records can use it.

You now have three different things that might be called an entitlement ID in conversation: ISC's entitlement object ID, the schema's selected identifying field, and the external identifying value. Ask for the context before copying anything.

## Follow the value through the relationship

A **membership** connects an account to a group.

An **identity** is ISC's representation of a person or another entity. **Account correlation** associates a collected account with the appropriate identity. Here, rv-100202 is correctly associated with Devi.

**Aggregation** collects external data into ISC. Account aggregation collects account information, including represented membership values. Entitlement aggregation collects the access objects and their supported details.

For this source, the account schema has an attribute named groups. It is marked as entitlement information, is multi-valued so it can hold a collection, and its Type connects it to the groups entitlement type.

The account's collected groups value includes G-6202. The group record's selected identifying value is also G-6202.

That agreement connects the membership to the represented group details. The comparison isn't with the text Case Review Readers.

```text
RecordsVault Production / S-102

Account rv-100202
  groups: [G-6202]
              |
              | linked type: groups
              | matching source value
              v
Group schema SC-102
  identityAttribute: groupKey
  displayAttribute: label
              |
              | describes source objects
              v
ISC entitlement E-102
  source value: G-6202
  displayed: Case Review Readers
```

The arrows show identification and representation relationships, not an order in which private backend jobs must run. The schema supplies the interpretation; the collected records supply the values.

In the supplied design, account attribute and entitlement type are both named groups, and the account attribute's Type points to that supported type. These are explicit configuration facts, not a rule that every connector must call its group data groups.

The integration's membership values have to agree with its selected group identifier. Replacing G-6202 with a readable label would break that agreement even if a person understands which group was intended.

## Read an entitlement record in its own context

ISC's entitlement representation can include fields such as id, name, attribute, value, sourceSchemaObjectType and source.

For the selected teaching record:

- id is E-102, the ISC entitlement record's ID.
- name is Case Review Readers, the readable entitlement name.
- attribute is groups, the entitlement attribute name.
- value is G-6202, the represented source value.
- sourceSchemaObjectType is groups, the object type represented by the source schema.
- source refers to S-102, RecordsVault Production.

These are selected field meanings, not a complete API response or a request to create an entitlement. Actual interfaces can expose different representations, so inspect their field definitions rather than expecting every screen to show the same labels.

Notice the two kinds of selection again. On the schema, identityAttribute names groupKey. On the represented entitlement, value contains G-6202.

Changing the literal text groupKey into G-6202 in a schema setting would confuse a field designation with one object's data. Supplying the schema ID SC-102 where an entitlement record ID is needed would select a different kind of record altogether.

This is also why copying an ID from a test environment isn't a migration design. Identify the corresponding source, schema and access object in the receiving environment. A familiar name does not establish matching ISC records across environments.

## “Type” can answer different questions

An **entitlement type** identifies a supported kind of access object, such as the groups objects in our example. A **native object type** is the corresponding category exposed by the external integration.

The type name must fit the supported source model. It isn't a category you invent because a new label would look better.

A schema attribute also has a **data type**. For example, a string is text; a Boolean represents true or false. G-6202 is a text value. That doesn't make string the name of the entitlement type.

The account attribute's Type can instead identify a linked entitlement type. That is the job it performs when groups points to the groups schema.

A broader access listing may also identify an item's access-model category as an entitlement rather than an access profile or an ISC role. An **access profile** bundles related entitlements from one source. An **ISC role** groups access for a business purpose.

So “type is entitlement,” “native type is groups,” and “groupKey is text” can all describe different aspects of the same situation.

Do not collapse them into one field.

Some integrations support only accounts or a restricted set of entitlement objects. Giving an unsupported object a plausible type name doesn't add connector capability. A **connector** is the integration providing the supported reads and changes.

## The same name doesn't make two items the same object

Suppose RecordsVault Test also has a group labeled Case Review Readers. It is not the production group merely because the words match.

Now suppose one supported source exposes both groups and native application roles. A group value 42 and a role value 42 can refer to different source objects. The native role is an external access object, not automatically an ISC role.

For investigation, retain the source, relevant type or membership attribute, and identifying value together. Retain the ISC entitlement ID when referring to its specific ISC record.

This is an identification discipline, not a claim about ISC's private database key or a universal deduplication algorithm.

A screenshot containing only a name strips away this context. A better investigation record says which source and entitlement record it shows, which source value is represented, and when the observation was made.

## A rename, a replacement and a schema change are different

Return to the supplied rename.

The application owner confirms that the same G-6202 group was relabeled. Its permissions and members did not change. Entitlement collection later reads the new label, and the current ISC record is verified as E-102 with source value G-6202 and the new name.

Devi's current account evidence still includes G-6202. No new membership is required merely because the label became clearer.

```text
Before: supplied verified records
  E-102 -> G-6202
  label: Case Review
  rv-100202 groups: [G-6202]

Rename label; retain group key
  |
  v
After: supplied verified records
  E-102 -> G-6202
  label: Case Review Readers
  rv-100202 groups: [G-6202]

Same group and membership here.
Permissions independently unchanged.

New key G-9202 is a different question.
Do not infer continuity from the label.
```

The after-state is supplied verified evidence. It is not a promise that every rename on every connector preserves every reference or updates every view immediately.

If the application instead deletes the old group and creates G-9202 with the same label, matching words don't prove continuity. Verify the new group's permissions, members and intended replacement relationships.

An **access requirement** states what someone should receive. A stored reference in an access profile or role must be checked against the intended access object during a replacement. A new group doesn't automatically inherit approval, correct membership or every old access-model reference because its name is familiar.

**Provisioning** performs supported account or access changes. Reading a renamed label is different from provisioning new membership. A replacement can need reviewed changes and outcome checks that a descriptive rename doesn't.

Changing which field the schema selects as Entitlement ID is a third situation. Switching from groupKey to technicalName changes the identification contract. It is not simply changing the label on one group.

Changing selected ID or name attributes after collection can cause duplicate entitlement records. Review the supported change procedure, membership linkage and dependent references before making such changes. Don't switch identifying fields to make the screen prettier.

There is no universally safe identifier just because it contains letters and numbers. A connector may identify a group using a name or directory path that can change. Verify the actual integration contract and rename behavior before predicting continuity.

## Metadata needs a purpose and an owner

**Metadata** is information about an access item that helps people or configured processes understand and govern it.

Consider the different jobs:

| Information | What it is for, and what it doesn't establish |
|---|---|
| Description | Explain permission meaning and boundaries; it does not change the application's permission rules |
| Owner | Identify responsibility and, where configured, a reviewer; ownership is not group membership |
| Requestable setting | Help control availability for direct requests under the applicable configuration; it is not an existing grant or completed approval |
| Collected source attributes | Preserve supported details from the source; their meaning and freshness still need checking |
| Custom access-model metadata | Add organization-defined context; a classification alone doesn't change native permissions |

An **access request** asks for an access item for a recipient. An **approval** is a decision within the configured request process. If that process uses an entitlement owner as reviewer, changing the owner can affect later routing. It isn't necessarily a purely cosmetic edit.

Likewise, marking access requestable concerns request behavior, not the label's appearance. It does not itself add the group to Devi's account.

For descriptive metadata, a useful statement is concrete: “Read assigned case files; no editing.” “Standard access” doesn't tell a reviewer what action is being retained or granted.

ISC also supports custom metadata for access-model objects. An organization could define a classification to support its review practices. Such a classification needs an agreed meaning; typing a value doesn't make it an application-enforced restriction.

Keep collected source attributes separate from these managed access-model details. In entitlement representations, attributes can contain source-supplied key-value details, while accessModelMetadata concerns access-model metadata. They are not interchangeable places to put a native membership key.

## Why does ISC still show the old description?

Different fields can have different maintenance paths.

**Provenance** means where a value came from and how it was maintained. Was the description collected from the application, manually edited in ISC, or selected through the wrong schema field?

Entitlement aggregation can collect descriptions and display names, but manually updated fields are protected from being overwritten by later aggregation. Do not assume repeating collection must replace a manually maintained value.

For a stale description, compare the current source detail, schema selection, relevant collection and the field's manual-update state. The exact representation of that state depends on the interface being inspected.

A protected manual description may be deliberately better than the application's text. Or it may now be outdated. Decide which value should govern before using a supported update process. Don't remove a maintenance protection merely to make two screens agree.

Also separate a name changed in the application from a display name edited only in ISC. Editing a local label isn't proof that the native group was renamed. Neither edit, by itself, proves a permission change.

## Work through the differences

Each case supplies its own change. Keep the identifiers attached to the records they describe.

### Case 1: The engineer sends the native key

**Facts:** A read operation expects the ISC entitlement object ID. The investigation record contains E-102 and source value G-6202. A colleague proposes sending G-6202.

Which value fits the operation?

**Reasoning:** E-102 is the teaching label for the required ISC record ID. G-6202 is the source value. In a real operation use the actual retrieved ID, not either teaching label. Establish the expected identifier kind before interpreting any resulting error as missing access.

### Case 2: The label changed, and continuity was verified

**Facts:** The owner confirms the same native group G-6202, unchanged permissions and members. Current ISC evidence shows E-102 with the new label and source value G-6202. Devi's account still references G-6202.

Does the new wording require another group grant?

**Reasoning:** No. The supplied evidence establishes an existing unchanged membership and the same represented object in this case. A new grant would not be justified by a descriptive rename alone.

### Case 3: A familiar name hides a new object

**Facts:** The old G-6202 was deleted. A new G-9202 uses the same friendly name. Devi's fresh account data has no G-9202 membership. A configured access profile still references the old represented entitlement.

Can the access profile be declared correct because its visible name looks right?

**Reasoning:** No. Native object continuity is absent and the stored reference needs review. Establish the approved new requirement, correct configuration and supported delivery path, then verify the selected account's outcome. Matching words don't migrate memberships or references.

### Case 4: A field name is replaced with a field value

**Facts:** groupKey is the selected Entitlement ID attribute. A proposed schema edit sets identityAttribute to G-6202. There is no source attribute named G-6202.

Would this make the reference more precise?

**Reasoning:** No. The schema setting needs an attribute name. The edit confuses a record's identifying value with the instruction selecting that value. Keep the supported groupKey designation unless a reviewed identification change is genuinely required.

### Case 5: Someone fixes the label by changing identification

**Facts:** The schema correctly identifies groups through groupKey but displays technicalName. The requirement is a friendly label. A proposed change selects label as both the identifying and display attribute.

What is the safer question to resolve first?

**Reasoning:** Which selection actually needs changing? The readability issue concerns display selection; it doesn't establish a defect in groupKey. Review a supported display correction and its impacts rather than changing the identifying contract unnecessarily. Even display-schema changes need controlled verification; they aren't automatically risk-free.

### Case 6: Two types share the same value

**Facts:** A source supports groups and native roles. Its groups object 42 and roles object 42 have different permissions. An export keeps only value 42 and drops the source/type information.

Can you reconstruct the intended entitlement from 42 alone?

**Reasoning:** Not from these facts. The export discarded necessary context. Recover the original record's source, type or attribute and ISC entitlement reference before acting. Guessing the more familiar label doesn't repair the evidence.

### Case 7: Collection doesn't replace a manual description

**Facts:** The source has the approved new description. Correct mapping and completed entitlement collection are verified. ISC still shows an older description, and the field is recorded as manually updated.

Does the unchanged text prove the connector never read the source?

**Reasoning:** No. The supplied manual-update protection explains why aggregation doesn't overwrite that field. Review the intended maintenance authority and supported correction for this item. A stale description alone does not establish a missing membership or failed provisioning.

### Case 8: The owner changed

**Facts:** A future direct entitlement request is configured to use the entitlement owner as reviewer. The owner is changed from one responsible identity to another. No native membership or permission change is requested.

Is the edit harmless display text?

**Reasoning:** It changes a relationship used by that configured approval process, so review routing implications. It does not mean the new owner receives the group or that existing requests have been rerouted. Inspect any already-created work separately; current ownership alone doesn't prove its recipient changed.

## Try a license instead of a group

A **license** gives an account the right to use a product or feature set under the application's licensing model. A supported application integration represents these licenses as entitlements. A license has native code LIC-17, ISC entitlement record E-L17 and readable name Report Editor. Its selected identifying field is licenseCode and its display field is title.

The vendor changes the title to Report Author but retains LIC-17 and the same licensed capabilities. Current represented evidence confirms E-L17, source value LIC-17 and the new name. An account still holds LIC-17. No new request or grant is supplied.

Explain what changed and what did not. Then consider a separate proposal to replace LIC-17 with LIC-29, which has a different feature set.

For the rename, the supplied evidence changes the display value, not the source key, represented entitlement or existing account holding. The schema still selects licenseCode for identification and title for display. A new grant is not established or required by that wording alone.

LIC-29 is a different proposed access item with different capabilities. Review its intended holders, configuration references and supported fulfillment before describing it as an equivalent rename.

When you explain an entitlement to a colleague, give each value its job: the ISC record, the source context, the supported type, the native value and the readable description. Then explain what a proposed change affects. That is what lets you distinguish a clearer name from a different access object.
