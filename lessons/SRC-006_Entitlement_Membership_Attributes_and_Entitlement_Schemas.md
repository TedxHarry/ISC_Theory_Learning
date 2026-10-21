# The group exists. Why doesn't the account's access connect to it?

Devi, employee number `46006`, reviews expenses in SpendLedger. Her account, `spend-46006`, already belongs to the application's Expense Approvers group.

In SailPoint Identity Security Cloud (ISC), the integration has collected that group's details. It has also collected a membership value on Devi's account. Yet the account's value doesn't connect to the detailed group record as intended.

The group record is identified by `G-206`. The account's collected membership says `expense.approvers`.

Both values refer to the same group in the application owner's vocabulary. Does that make them interchangeable in the integration?

No. Let's look at what each record is meant to say, and which value connects them.

The SpendLedger records, configuration, defect and corrected results below are fictional. The example assumes supported account and entitlement reads; no real tenant execution or default connector configuration is claimed.

## One record says who has access. Another describes the access

An **account** is a record in an external system. An **identity** is ISC's representation of a person or another entity. Accounts can be associated with that identity.

A **source** is ISC's configured representation of a system or collection of account data. Its **connector** provides the supported integration behavior. Our source is SpendLedger Production, not a test environment.

An **entitlement** represents an access right. In this example, membership in Expense Approvers allows an account to review expenses under the application's agreed approval rules.

A **membership** connects an account to an access object, such as that group. It answers, “Which group does this account belong to?”

The group object answers a different question: “What is this group?”

The group exists independently of Devi's membership. Other accounts can belong to it. It can also exist when no account belongs to it.

An **attribute** is a named piece of information on a record. A **schema** defines the represented attributes and their designated uses.

So we have two schemas to consider:

| Schema | Record it describes | Example information |
|---|---|---|
| Account schema | One SpendLedger account | Account key, employee reference and group-membership values |
| Entitlement schema | One access object of a supported type | Group identifier, name and description |

The groups attribute on an account doesn't need to repeat the group's whole description for every member. It carries the values that identify the memberships. The entitlement records supply the related details.

## Follow the account's membership value

A **mapping** selects or converts incoming information into represented attributes. Here is a selected fictional response from SpendLedger before the project's faulty mapping changes it.

**JSON**, JavaScript Object Notation, is a structured data format. The curly braces contain an object with named properties. Square brackets contain an array, a collection of values.

```json
{
  "accountKey": "spend-46006",
  "employeeNumber": "46006",
  "groups": ["G-206"]
}
```

Here, groups contains one text value, G-206. That is the application's group identifier in this integration contract.

The **membership attribute** is the account attribute carrying those access references. In this design, its name is groups.

It is marked as an **Entitlement** in the account schema, so its values are treated as access information rather than ordinary descriptive text.

It is also **multi-valued**, meaning it can hold a collection. Devi has one membership in the selected response, but another account can have several. A collection with one item is still a collection. **Cardinality** is this distinction between a single value and a collection.

These settings do different jobs. A list of phone numbers can be multi-valued without representing access. An entitlement attribute can be single-valued when the supported model allows only one access value.

Marking an attribute as an entitlement doesn't add its value to the target account. It changes how the collected information is represented and used in ISC.

## Now inspect the object that G-206 identifies

An **entitlement type** identifies a supported kind of access object on the source. Its schema describes the information collected for objects of that kind.

In our fictional integration, the native object type for the application groups is named groups. **Native object type** means the object category exposed by the external integration, not an arbitrary friendly label.

This is the selected group data:

```json
{
  "groupKey": "G-206",
  "technicalName": "expense.approvers",
  "label": "Expense Approvers",
  "description": "Review expenses within the account's approval limits."
}
```

The entitlement schema designates groupKey as the **Entitlement ID**. This selects the attribute whose value identifies the access object.

It designates label as the **Entitlement Name**, the attribute used for the object's display value.

The technicalName attribute is additional descriptive information in this example. The fact that it sounds technical doesn't make it the selected identifier.

Read those choices carefully:

| Item | Supplied choice or value | Job |
|---|---|---|
| Entitlement type | groups | Identifies this supported category of access objects |
| Entitlement ID attribute | groupKey | Selects where an object's identifying value comes from |
| Entitlement ID value | G-206 | Identifies this particular group |
| Entitlement Name attribute | label | Selects the displayed name value |
| Selected name value | Expense Approvers | Helps a person recognize the group |
| Additional technical name | expense.approvers | Describes the group without replacing the selected ID |

The field designation and the field value aren't the same thing. groupKey is an attribute name; G-206 is a value on one group record.

If you inspect a schema through an API, or application programming interface, you can encounter the properties identityAttribute and displayAttribute. They name the attributes selected for identification and display. In this design, they correspond to groupKey and label.

The word identity in identityAttribute doesn't mean “find Devi's ISC identity.” It concerns identification of the object described by that schema.

Nor is G-206 automatically ISC's own object ID. ISC records have their own identifiers. When someone asks for “the entitlement ID,” establish whether they mean the selected source identifier, an ISC entitlement-record ID, or the schema's ID. Substituting one for another can point at a different object or fail to identify it.

## The connection needs an agreement on both sides

For the documented account-attribute linking model, the account attribute is marked as an entitlement, its name matches the entitlement type's name, and each collected value matches the designated Entitlement ID value.

The entitlement-type configuration also connects the account attribute's Type to the appropriate entitlement type.

In our design, that means:

- The account attribute is named groups and marked Entitlement.
- The connected entitlement type is groups, matching the supported native object type.
- The collected membership value G-206 matches the group's groupKey value G-206.
- The account and entitlement data belong to the same intended source context.

The schema editor's Type can therefore express a relationship to another schema, not only a primitive kind of value such as text or a true/false Boolean. Selecting a named entitlement type connects the representation; it doesn't replace the membership's identifier with the type's name.

Existing connectors have their own supported default schemas and mappings. Inspect those relationships before editing them. Don't rename a production groups field merely because another connector uses a different name.

Here is Devi's intended relationship:

```text
[Account spend-46006]
          |
[groups contains G-206]
          |
[Same source + type groups]
          |
[Entitlement ID G-206]
          |
[Expense Approvers + description]
```

The lines connect an account's membership to the matching access object and its details. They aren't a sequence of backend jobs. ISC isn't granting the membership at each line.

Nothing in that relationship requires a comparison with Devi's employee number. The membership value identifies a group, not a person.

**Account correlation** associates an account with its owning ISC identity using configured matching. That is a separate relationship. Correctly associating spend-46006 with Devi doesn't make a wrong group identifier correct.

## Why a readable name can break the connection

Return to the defect.

The supplied account response contains G-206, but a project-added mapping replaces it with the group's technicalName, expense.approvers. That is the value collected on Devi's account.

The detailed entitlement record still uses G-206 as its selected identifier.

The comparison is now:

`expense.approvers` is not `G-206`.

A person can understand that these names describe the same business group. That doesn't satisfy the configured identifier relationship.

Changing the displayed name to expense.approvers wouldn't repair that mismatch either. The account value needs to agree with the designated ID, not merely with a field that is easy to read.

In this fictional investigation, the owners approve correcting the account mapping to preserve the original G-206. Appropriate subsequent collection represents that membership value, and the supplied verified result links it to the existing detailed group.

The target account and its real membership haven't changed. The correction repairs ISC's read-side representation.

The alternative of changing which entitlement attribute is designated as ID is not a harmless shortcut. Changing Entitlement ID or Entitlement Name designations after aggregation can cause duplicate entitlements. Review supported change handling and dependent access references before considering such a redesign.

Choose correct designations before the first collection. When creating a new entitlement schema, the first attribute is initially designated as both ID and Name. That initial choice still needs review; the order in which you happened to add fields isn't a business identification decision.

## There are two reads, not one complete story

**Aggregation** collects information into ISC.

An **account aggregation** collects accounts and their attributes, including the represented membership values. Entitlements can be created from those account values even when richer entitlement details haven't been collected separately.

An **entitlement aggregation** collects access-object information under the supported entitlement schemas. It can provide names, descriptions and other attributes, including details for access objects no account currently holds.

The **entitlement catalog** is the inventory of access items recorded in ISC. Knowing an item exists in that inventory doesn't establish that Devi holds it.

The two read responsibilities meet through the configured relationship:

```text
[Account read]       [Entitlement read]
      |                      |
[Membership values]  [Access-object details]
      |                      |
      +----------+-----------+
                 |
     [Link under schema agreement]
```

The branches represent the information each supported read supplies. They don't prescribe which must always execute first, run simultaneously, or use a particular internal queue.

Separate these observations:

An entitlement record exists, but no account has its value. You have an access object, not evidence that a particular account holds it.

An account has a membership value, but its detailed object information is missing. You have a collected access reference, not necessarily a complete description.

Both reads supply the expected values and schema relationship. Now the membership can connect with the detailed object as intended.

Don't assume the exact screen appearance or duplicate-handling behavior for every mismatch. Examine the collected records. A raw-looking entitlement name can indicate limited descriptive data, but that symptom alone doesn't identify the cause.

A **direct-connect source** reads through a configured connector connection. It can support manual or scheduled entitlement aggregation. A **flat-file source** imports supplied files; its supported entitlement imports are manual and don't support multiple entitlement types through that flat-file mechanism. An account-only connector doesn't acquire entitlement-object aggregation merely because someone adds a schema.

A completed read is also scoped. Confirm which source, object types and data were included. A successful groups aggregation doesn't prove a second entitlement type was collected.

## Different access types can use the same-looking value

Suppose a supported direct-connect integration exposes another native object type named appRoles. An **application role** here is a role defined in SpendLedger. It isn't an ISC role, which groups access for business assignment.

Our extended example has:

- groups containing G-206, identifying Expense Approvers.
- appRoles containing R-51, identifying Audit Exporter.

Each type has its own schema and supported account relationship. The groups attribute points to groups; appRoles points to appRoles.

Don't send both fields to groups simply because both describe access. ISC's account-schema configuration doesn't allow multiple attributes to be marked with the same entitlement type.

Likewise, the text 51 could identify one group and one application role in another integration. That doesn't make them the same access object. Keep source, entitlement type and value together when reasoning about identity of access.

The same applies across environments. A G-206 group in SpendLedger Test is not established as the same governed object as G-206 in SpendLedger Production.

There can also be relationships between entitlement objects. Where supported, a group can grant an application role. A group-schema attribute carrying role references can link to the role entitlement type, with appropriate cardinality.

That is an entitlement-to-entitlement relationship, not an extra direct role membership read from Devi's account. Don't invent a direct assignment just because an indirect path exists.

**Hierarchy** describes parent/child relationships between access objects. Supported hierarchy representation depends on the connector and schema. A group's friendly name doesn't encode those relationships, and importing a list of group names doesn't discover every inherited permission.

A **permission** is an individual allowed operation, such as reading or writing a resource. Supported sources distinguish direct account permissions from permissions granted through entitlements. Their collection model isn't replaced by inventing an ordinary entitlement type called permission; that name is reserved for specially handled direct permissions.

**Effective access** concerns what an account can actually do, taking relevant grants and restrictions into account. For routine schema design, establish which access objects and relationships the connector actually exposes. Don't flatten groups, application roles and permissions into one invented category or promise a complete effective-access calculation from membership values alone.

## Look at what the screen is showing you

The source's **Account Schema** view describes the account attributes and their settings. It doesn't list every current membership on every account.

**Entitlement Types and Schemas** describes supported access-object categories, attributes and selected ID/Name designations. It isn't evidence that all corresponding objects have been collected successfully.

Account details show represented values for a particular collected account. The Entitlements view shows recorded access objects and their details.

For Devi's mismatch, compare the actual source and account, the collected groups elements, the entitlement-type relationship, groupKey, and the group details from the applicable collection. Include read scope, collection results and relevant errors.

A schema audit event can establish that configuration changed. It doesn't prove the intended data was subsequently collected or linked correctly.

If a description is absent, ask whether the source supplied it, the supported mapping selected it and the relevant entitlement collection read it. A good schema definition can't supply missing upstream information.

Also distinguish an ordinary display-name or description edit on an entitlement record from changing the schema's selected identifying/naming attributes.

Editing an entitlement's Display Name or Description in ISC doesn't send that edit to the external source. This is **metadata**, descriptive or governance information about the access item, rather than an assignment of that access.

Manually maintained names and descriptions can also be preserved against subsequent aggregations. If the source has a new description but ISC retains an older one, investigate manual-update state as well as mapping and collection.

Don't conclude that the connector never read the new description solely from the visible text.

If an account references a group that the entitlement read doesn't return, compare both read scopes and collection times, the exact identifiers and the target's current records. The group may be outside the read scope, the reference may be stale, or one mapping may be wrong. Those are alternative investigations, not interchangeable diagnoses. Confirm which evidence explains this case before changing access or deleting records.

## Readability supports decisions. It doesn't grant access

An **access request** asks for access to be assigned through the configured request process. A **certification** is a review in which a responsible person evaluates recorded access.

Useful entitlement names, descriptions and populated attributes help people understand what they're requesting or reviewing. “G-206” alone tells a reviewer much less than a clear explanation of Expense Approvers.

An **entitlement owner** is the responsible party recorded for that access item. Depending on configuration, an owner can participate in request or review decisions. Owning the entitlement doesn't mean personally holding it.

An **access profile** groups entitlements from one source. An ISC **role** can group access profiles and direct entitlements. These definitions can refer to entitlement records, so an identifier redesign needs more care than changing a label for readability.

An entitlement's presence in the catalog doesn't automatically make it requestable to every employee. Request configuration and the applicable access policies still matter.

**Provisioning** performs supported changes to accounts or access. Reading a group definition, linking its membership value, improving its description, and assigning that group to a target account are different actions.

Deleting an entitlement type is different again. It removes that type's schema configuration, not the associated entitlement records or every target membership. Objects of that type won't be aggregated or updated until another type is created for them.

An account aggregation also doesn't delete an entitlement simply because no accounts currently hold it. The access object may still exist.

So don't use schema deletion, an absent membership or a catalog cleanup as proof of revoked target access. Identify the required external change and verify that operation and resulting state separately.

## Try changing one fact at a time

### 1. The label matches, but the ID doesn't

An account contains Expense Approvers. The detailed group has groupKey G-206 and label Expense Approvers. groupKey remains the selected Entitlement ID.

Does the matching label establish the intended identifier link?

**Worked reasoning:** No. The account value must agree with the designated ID under the supported schema relationship. Compare the raw membership and mapping. Don't change a working ID designation merely to accommodate an incorrectly mapped label.

### 2. The field contains two phone numbers

backupPhones is multi-valued. Someone proposes marking it as an entitlement because it contains a list.

Does collection shape establish access meaning?

**Worked reasoning:** No. Multi-valued describes cardinality. An entitlement designation expresses access interpretation and requires the appropriate supported model. First establish what the values mean; phone numbers aren't access rights just because there are two.

### 3. The group is in the catalog

An entitlement aggregation collects G-999. No supplied account record contains G-999.

Can the team report that Devi has it?

**Worked reasoning:** No. Collecting an access object establishes inventory information, not Devi's membership. Inspect the correct account's collected access values and account-to-identity association. If effective access is the question, also establish relevant indirect paths rather than inventing a direct membership.

### 4. There is a membership value but no useful description

The account has G-206. Its entitlement record has a raw-looking name and no description. Only account aggregation is confirmed.

Should the team conclude that the group is invalid?

**Worked reasoning:** No. Entitlements can arise from account aggregation without richer object details. Check supported entitlement collection, its scope, schema mapping and supplied object data. Missing descriptive information doesn't, by itself, prove an invalid external group or a failed membership.

### 5. Two types reuse a short code

A supported source has a group 51 and an application role 51, with separate types and schemas.

Should they be merged because their values match?

**Worked reasoning:** No. Keep source, type and identifier together. Follow each account attribute's supported type relationship. Equal text across different categories doesn't prove one access object.

### 6. The owner changes the description

An administrator edits an entitlement's Description in ISC. The external group description remains unchanged. A later collection doesn't replace the manual wording.

Does that establish a failed provisioning operation?

**Worked reasoning:** No provisioning operation was supplied. Editing this ISC metadata doesn't send the change to the source, and manually updated names/descriptions can be preserved against aggregation. Inspect manual-update state and intended responsibility before diagnosing a connector failure.

### 7. The schema type is deleted

A team deletes an entitlement type and says, “That removes everyone's access.”

What has that action actually established?

**Worked reasoning:** It removes the type/schema configuration, not the associated entitlements or target memberships. Collection/update for that type is interrupted until another type is created. Access removal needs its own supported operation and evidence of the resulting target state.

## Review a different application's design

A new application supplies accounts with teams = ["T-8"]. A separate team export contains teamCode T-8, displayLabel Regional Reviewers and a description. The native entitlement type in the supported integration is teams.

The proposal maps account memberships to Regional Reviewers, designates teamCode as the entitlement ID, assumes every imported team belongs to every account, and makes both teams and emergencyTeams point to the same entitlement type.

What would you challenge?

**Worked reasoning:** Preserve the agreed identifying value T-8 on the account's teams attribute. Connect that entitlement-marked attribute to the supported teams type and match it against teamCode. Select an appropriate name/display attribute without substituting its label for the ID.

Reject the inference from inventory to membership. Read the relevant account values; a team definition alone doesn't establish an account's access.

The proposed two-account-attribute relationship to one entitlement type conflicts with the account-schema constraint. Investigate what emergencyTeams actually represents and the connector's supported model. Don't invent a second native type or silently merge the fields to satisfy a diagram.

Establish read scope, identity association where needed, data quality, representative linking results and safe handling of existing identifiers. If the project also needs access changes, establish those capabilities and permissions separately.

Explain the core distinction to the application owner: “The account tells us which access identifiers it holds. The entitlement schema tells us how to identify and describe those access objects. The connection works when those references agree within the supported source and type.”
