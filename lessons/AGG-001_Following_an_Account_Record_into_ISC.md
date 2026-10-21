# The account changed. What should change in ISC?

Devi, employee number `51001`, reviews operational cases. Her existing ReviewBoard account, `rb-51001`, has moved from office code BLR to HYD in the application.

SailPoint Identity Security Cloud (ISC) still shows BLR on its collected account record. Someone starts an account read to bring in the change.

What should happen next?

The expected result is an updated representation of that existing account. It isn't another ReviewBoard account, another employee, or a request to grant access.

There is one more detail: Devi's ISC identity has an office value of CHN, supplied by Human Resources (HR). The organization intentionally uses HR for that value.

So a successful result can show HYD on the ReviewBoard account and CHN on the identity. Let's follow the records before deciding whether those values disagree.

The systems, data, mappings and outcomes below are fictional. The example assumes a supported account read, valid account identification and an existing correctly associated identity.

## First identify which record we're talking about

An **account** is a record in an external system. An **identity** is ISC's representation of a person or another entity, connecting information, accounts and access.

A **source** is ISC's configured representation of a system or collection of account data. A **connector** provides the supported integration behavior for that source.

Our source is ReviewBoard Production. The external application account already exists. ISC also has a representation of that account, associated with Devi's existing identity.

**Account aggregation** collects account records and their attributes into ISC. An **attribute** is a named piece of information, such as office or employeeRef.

**Provisioning** performs supported changes to external accounts or access. Reading an account and changing it are different operations.

The source account representation is not the external account itself. It records what the integration has collected under its configuration.

That is why the application can already show HYD while ISC's account still shows BLR. The latest application change hasn't yet been represented by the relevant collection.

An **identity attribute** is a value on the identity rather than on one external account. Identical names don't turn an account attribute and an identity attribute into one shared field.

## Starting the read doesn't establish the result

A supported aggregation can be started manually or on a configured schedule. An authorized API operation can also initiate supported collection. An **API**, application programming interface, lets software interact with a system.

The trigger asks ISC to perform work using a source's configuration. It isn't the account data and doesn't prove that the read has completed.

Before following the work, establish:

The source and environment, the supported operation, its configured population, the integration actor and the applicable execution record.

The **integration actor** is the account or application identity used to access the external system. Its permissions determine what it is allowed to read.

An administrator seeing the account in ReviewBoard doesn't prove that this actor can read it. A successful connection check also doesn't establish that the account-read operation has the correct scope and permissions.

**Collection scope** identifies which records and information the operation is intended to read. A **filter** selects or excludes records under supported conditions.

For this example, ReviewBoard Production's account read includes rb-51001. No filter excludes Devi's account, and the integration actor can read the required fields.

Those are supplied conditions, not conclusions we draw merely because a Start Aggregation button was available.

## Follow the response, not a picture of the application screen

In a direct connection, the connector uses the supported external interface to obtain account information. A **direct-connect source** reads through that configured connection.

A **flat-file source** instead imports supplied files. In either case, ISC needs actual delivered data, not a person's observation that the application screen looks correct.

Our fictional integration uses a supported Web Services account response. **Web Services** here means an integration using the application's web API.

Here is a selected response fragment in **JSON**, JavaScript Object Notation. Curly braces contain objects with named properties. Square brackets contain arrays, which are collections.

```json
{
  "items": [
    {
      "accountKey": "rb-51001",
      "login": "devi51001",
      "employeeRef": "51001",
      "profile": {
        "siteCode": "HYD"
      },
      "groups": ["G-51"]
    }
  ]
}
```

The outer object isn't itself Devi's account. Its items collection contains account objects. Inside the selected account, profile is another object, and siteCode contains HYD.

The groups array contains G-51, the existing identifier for the case-reviewers group in this example. It describes access the account already holds, not a new assignment instruction.

A **response** is the information returned by the read operation. A successful response still needs to contain the intended records and values.

This fragment doesn't establish the source's complete account population. If the operation returns multiple pages, the connector must follow its supported continuation behavior.

**Pagination** splits a result into pages. The first successful request doesn't prove that every page was read. Nor does the length of this selected fragment tell you how many accounts the real operation should collect.

In the supplied successful trace, the response contains rb-51001 and the complete intended read is confirmed. We aren't using a missing page to explain the old office value.

## Select the account, then trace its fields

**Extraction** selects the relevant records or values from delivered data. A **mapping** determines which input supplies a represented attribute, with supported conversion where needed.

A **schema** defines the represented attributes and their designated uses.

For ReviewBoard, the intended account extraction selects entries from items. Within each account, the response mappings supply these selected attributes:

| Delivered field | Represented account attribute | Job in this example |
|---|---|---|
| accountKey | accountKey | Identifies the ReviewBoard account |
| login | login | Supplies the designated account naming value |
| employeeRef | employeeRef | Supplies the person reference used by ownership matching |
| profile.siteCode | office | Supplies the collected account's office code |
| groups | groups | Supplies the account's group-membership identifiers |

The field paths show the relationship in this selected response, not a complete connector configuration to copy.

The office schema attribute doesn't need to have the same name as the application's siteCode property. The configured mapping connects them.

These selected represented account attributes make that change of structure visible:

```json
{
  "accountKey": "rb-51001",
  "login": "devi51001",
  "employeeRef": "51001",
  "office": "HYD",
  "groups": ["G-51"]
}
```

This is an illustration of selected attributes on the collected account, not a complete ISC account API response. The nested siteCode input supplies office; the source and account context still matter.

Creating an office attribute in the schema doesn't fetch HYD by itself. The read must return the value, and the extraction and mapping must select it correctly.

A **data type** describes the kind of value, such as text or a whole number. **Cardinality** describes whether an attribute holds one value or a collection.

HYD is one text value. groups is a collection containing one text identifier, G-51. Preserving those shapes is part of correct collection.

If a mapping selects profile.branchCode but the response contains only profile.siteCode, the intended value wasn't selected. Investigate the configured path, resulting record and errors. Don't assume every connector rejects, skips or clears the field in exactly the same way.

The useful read-side relationship is:

```text
[ISC requests account collection]
               |
[Connector reads ReviewBoard]
               |
[Response selected and mapped]
               |
[ISC account representation]
```

The lines describe logical dependencies in this read. They aren't separate private ISC jobs, a storage-commit sequence, or a guarantee that every connector uses the same execution host.

The connector supplies the supported read behavior. ISC records the represented account information. A person clicking the button isn't manually copying each application field into an identity.

## Recognize the existing account without confusing it with its owner

The schema selects attributes for **Account ID** and **Account Name**. In this fictional design, those are accountKey and login.

Their supplied values remain rb-51001 and devi51001. They haven't changed with the office move.

The supplied successful result updates the existing account representation from BLR to HYD. It doesn't add another account.

That outcome assumes the supported account-identification design is intact. Don't generalize it into a private storage-key algorithm or assume every connector handles missing, duplicated or renamed identifiers identically.

The selected account identifiers, ISC's own account-record ID and the person's employee number identify different things.

**Account correlation** matches and assigns a source account to its owning identity using configured account-to-identity attribute comparisons.

For this source, the configured person-reference comparison pairs account employeeRef with identity employeeNumber. Both contain the text 51001.

Devi is the supplied unique existing match. The association is verified as part of the result; we aren't inferring that any equal-looking number anywhere in the tenant automatically establishes ownership.

I-51 is a teaching label for this ISC identity, not a runnable API identifier.

The office value doesn't identify the person. Another employee can also work in HYD without owning Devi's account.

Collecting an account, identifying which account it is, and associating it with a person are related responsibilities, but they answer different questions.

If an account can't be matched to an established identity, it can be collected as **uncorrelated**. That means the intended ownership association is unresolved, not that the connector necessarily failed to read it.

The source's account view can represent such an account with a technical **shadow identity**, a placeholder rather than a verified match to the intended established identity. Don't confuse that placeholder with proof that HR has established another employee.

## Now ask which source supplies the identity's office

An **authoritative source** participates in establishing identities through an **identity profile**. The profile configures the identity population and the mappings supplying its attributes.

ReviewBoard is non-authoritative in this example. Devi's identity already exists through the separate HR-backed profile.

Non-authoritative doesn't mean its information is useless. Its accounts and access can be collected and associated with identities. It means we shouldn't assume this source is establishing the employee population.

The profile maps identity office from the HR source, where the agreed value remains CHN. It doesn't map identity office from ReviewBoard's office attribute.

Here are the two selected value paths:

```text
[ReviewBoard office HYD]  [HR office CHN]
          |                    |
[Account office HYD]   [Identity office CHN]
```

The left path describes the ReviewBoard account value. The right path describes the configured HR-to-identity value. Neither path instructs one source to overwrite the other.

So HYD and CHN can both be correct under the supplied configuration. The labels need business meanings too: an application's operating office and an HR home office needn't be the same fact.

If the requirement instead says identity office must come from ReviewBoard, investigate the profile's mapping and processing. Don't edit HR or reaggregate blindly merely because two screens have different values.

A **transform** calculates or formats a value using supported logic. A mapping can include a transform, so the identity result needn't be a literal copy of one raw field.

The important question is which configuration supplies this output and what it is meant to mean.

## Processing identity data is another responsibility

**Identity processing** evaluates identity information and relevant access configuration. It can update mapped identity attributes and evaluate configured access consequences.

When an aggregation or provisioning process modifies an identity, that event initiates identity processing. Other supported processing mechanisms also exist.

That isn't a rule that every returned account triggers every identity calculation or every external write. Check what changed and what configuration applies.

An **optimized aggregation** can skip further processing for an existing account whose read data hasn't changed. A supported **delta aggregation** reads changes rather than a complete configured population.

A **single-account aggregation** is another operation, not a shorter name for every population-wide behavior. The documented single-account action updates collected account information but doesn't synchronize the new data with identity attributes or perform provisioning.

For Devi's main trace, an applicable source aggregation represents the changed ReviewBoard office. The verified identity office remains HR-supplied CHN. We don't use a successful single-account read as proof that identity values were recalculated.

If someone changes correlation criteria or identity mappings, rereading unchanged data isn't automatically sufficient. Establish the documented re-evaluation or processing required for that configuration change.

This is why “run aggregation again” is a proposed action, not a diagnosis.

## Observing membership isn't granting membership

An **entitlement** represents an access right. A **membership** associates an account with an access object, such as a group.

G-51 is the supplied existing ReviewBoard group identifier. In this example, it represents the case-reviewers group. Its membership already exists in the application before the read.

The account aggregation collects that membership value. It doesn't create G-51 in ReviewBoard or add Devi to it.

An **entitlement aggregation** collects information about access objects themselves, such as group identifiers, names and descriptions. Account membership values and the detailed group inventory have different responsibilities.

Creating an application account, adding a group membership or changing an application field requires the relevant provisioning operation, not merely a read of its current state.

There can still be downstream effects from collected data. An ISC **role** groups access for business assignment, and a **lifecycle state** represents organizational status with configured access behavior.

If collected information changes identity data used by those configurations, processing can lead to separate provisioning work. Reading and changing remain distinct operations even when one workflow connects them.

Don't label an entire configured workflow harmless simply because its first action is a read. Equally, don't report that an aggregation granted a group just because it discovered an existing membership.

In our supplied successful case, no access-changing operation is part of the result. The group membership remains the same while account office changes.

## Compare the evidence for the specific question

The completed example has these supplied observations:

ReviewBoard's account response contains siteCode HYD. The mapping supplies account office HYD. The existing rb-51001 representation is updated, its association to I-51 is correct, and identity office remains HR-supplied CHN.

No new ReviewBoard account is created, and no membership change is reported.

Different questions need different evidence:

| Question | Useful evidence | What it doesn't establish alone |
|---|---|---|
| Did the target return HYD? | Correct actor's account response or controlled source export | That ISC selected or represented it correctly |
| Did the account field update? | Identified source account and its collected office value | That the identity's office uses that field |
| Is this Devi's account? | Actual association, correlation configuration and compared values | That matching on office or a repeated friendly name would be safe |
| Why is identity office CHN? | Profile mapping, HR input and resulting identity value | That ReviewBoard collection failed |
| Was external access changed? | Applicable provisioning outcome and resulting target state | That a collected membership was newly granted |

**Aggregation History** shows an execution's status, timing, counts and relevant warnings or errors. Those facts describe the execution, not every business conclusion someone wants to draw from it.

The source's Accounts view shows collected account records and their associations. Account details let you inspect the represented values for rb-51001. The identity's Details view shows identity values, and profile mappings explain their configured inputs.

A source-level count doesn't prove that this particular account changed. A generic success label doesn't identify which office field you inspected.

ISC Search results can have indexing delays separate from the account read. If one search view still looks old, compare the identified account record, execution evidence, viewing conditions and freshness before repeating work.

## If the expected record isn't there, narrow the investigation

If rb-51001 isn't in the external response, investigate the destination, integration actor, scope, filters, response pages and source data.

If it is in the response but not selected for representation, investigate extraction, schema mapping and relevant errors.

If the account exists but office is old, compare the actual delivered value with the configured mapping, operation and collection evidence. A later job time doesn't prove that the input itself was current.

If account office is HYD but identity office is CHN, inspect the identity mapping before calling that a fault.

If the owner is unresolved, investigate correlation separately from whether the source delivered the record.

If a target change was expected, first identify the configured change operation and whether it was actually initiated. Then inspect its outcome and target evidence rather than substituting the aggregation result for it.

These are investigation branches, not universal connector failure codes or a claim that every error stops at the same internal stage.

Keep existing-record and deletion consequences in view before rerunning a wider source operation. A narrower response or a failed read isn't proof that an external account was deleted.

## Trace these variations

### 1. HYD and CHN remain different

The ReviewBoard account now shows HYD. Identity office remains CHN, mapped from HR, whose input is still CHN.

Must one value be wrong?

**Worked reasoning:** No. The supplied mappings describe different record values and business meanings. Verify those mappings and requirements; don't use equal field names as a reason to overwrite either source.

### 2. A collected account appears for the first time

In this separate first-collection variation, the external rb-51001 account already exists. The supplied collection result creates its account representation in ISC.

What was created, and what already existed?

**Worked reasoning:** The ISC representation was created. The external ReviewBoard account already existed. Discovering or representing that account isn't external account creation; provisioning is a separate capability.

### 3. The raw field exists but the path is wrong

The response contains profile.siteCode HYD. The configured office mapping selects profile.branchCode, which isn't present.

Should the team first ask the application owner to change HYD?

**Worked reasoning:** No. The supplied defect is in selecting the delivered input. Inspect the mapping, resulting record and errors. Don't invent a universal reject, clear or retry behavior for every connector.

### 4. The person reference doesn't match

The intended identity employeeNumber is 51001. A separate account variation supplies employeeRef 51010, and no other matching evidence is given.

Does a successful read establish the intended ownership link?

**Worked reasoning:** No. Reading the account and assigning its owner are different questions. Check the actual compared values, association and supported correlation configuration; don't silently swap the reference or choose a person by office.

### 5. One response page succeeds

The read returns a successful first page, but continuation hasn't been checked.

Can that establish that the complete intended account population was collected?

**Worked reasoning:** No. Verify scope and supported page continuation through completion. An individual response status isn't a population-completeness result.

### 6. Correlation configuration changes but account data doesn't

The account's delivered attributes are unchanged. The source uses optimized aggregation, and someone expects a reread alone to apply new correlation criteria to every unchanged account.

Is that expectation safe?

**Worked reasoning:** No. Optimized aggregation can skip unchanged records and their correlation evaluation. Follow the documented supported re-evaluation approach for changed correlation configuration, with appropriate scope and existing-record review; don't infer it from a new run's timestamp.

### 7. A read is followed by an access change

Collected information changes an identity value used by a configured role. Separate supported provisioning work then adds access.

Which operation performed the membership change?

**Worked reasoning:** The separate provisioning work performed the change. The read supplied information to the configured decision process. Preserve those operation boundaries and verify the target result separately. The complete workflow still has access-changing consequences.

### 8. A file is newly delivered but contains old data

A file-based source imports a new delivery whose identified account row still contains BLR. The application currently shows HYD.

Should identity processing be expected to reconstruct HYD from that old input?

**Worked reasoning:** No. Check the producer's export, its source state and field selection. Calculation under a mapping doesn't manufacture an unsupplied current value. A fresh file timestamp doesn't prove fresh record contents.

## Trace a different HR record

A new project receives a worker record from HR and expects an ISC identity plus a downstream application account. The proposal says, “Once the row is read, all three records exist and their fields match.”

What would you separate?

**Worked reasoning:** Confirm the actual delivered worker record, source/schema identification, required values and intended population. Establish the authoritative source and identity-profile configuration for identity establishment; don't reuse the non-authoritative ReviewBoard assumption.

Check identity mappings and the resulting identity, including any required-value exceptions. Then identify the separately configured account-creation or access-changing mechanism, its inputs and authority, and verify the external result.

A collected HR row, a correctly established identity and a provisioned target account are different outcomes. If a field differs, trace its own mapping and meaning before treating the difference as a failure.

Explain the trace to the owner: “The read tells ISC about an account. Its identifiers tell us which account, correlation tells us whose account, and mappings tell us which identity values depend on it. An external change needs its own operation and evidence.”
