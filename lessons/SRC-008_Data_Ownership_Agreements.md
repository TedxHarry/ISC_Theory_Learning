# HR approved the extension. Who makes sure the new date reaches the right place?

Devi, worker number `48008`, is a fixed-term project coordinator. Her approved contract end date has changed from 30 November to 31 December 2026.

Human Resources (HR) shows the extension. SailPoint Identity Security Cloud (ISC) still shows the earlier date. Her existing GrantDesk account, `grant-48008`, also retains the earlier expiry date.

The integration ran after HR approved the extension. So why isn't the date correct everywhere?

In this fictional investigation, the connector faithfully read the integration export. That export still contained the older worker record.

“HR fixed it” was true. “The integration received the correction” wasn't.

The worker records, export defect, responsibilities, times and corrected results below are supplied examples. No real tenant execution is claimed.

## Which value needs correcting, and where?

An **account** is a record in an external system. An **identity** is ISC's representation of a person or another entity, connecting information, accounts and access.

A **source** is ISC's configured representation of a system or collection of account data. Its **connector** provides the supported integration behavior.

Here, PeopleLedger Production supplies worker information. The selected PeopleLedger worker record is identified by `PL-W-48008`. GrantDesk Production is a separate source for application accounts.

Devi's PeopleLedger and GrantDesk records are already associated with her ISC identity in this example. That association is supplied, not inferred merely because their numbers look similar.

An **attribute** is a named piece of information, such as contractEnd on a worker record or expiryDate on an application account.

An **identity attribute** is a value on the ISC identity, rather than on one external account. A **mapping** selects or converts inputs into an output attribute. That mapping determines which input supplies the identity value; matching field names don't make all those records one shared value.

A **data ownership agreement** establishes who decides a value's meaning, who supplies it, who maintains its integration, and how errors are corrected and verified.

This is an engineering and operating agreement. It isn't a special ISC object that automatically validates every input or resolves disagreements between systems.

The useful question isn't simply, “Who owns PeopleLedger?”

Ask, “Who is allowed to decide this end date, and who is responsible for carrying that decision into each dependent record?”

## Give each responsibility a clear job

A **business data owner** decides the approved meaning and authoritative business value. A **data steward** handles agreed day-to-day data-quality and correction work.

A **producer** supplies the integration data, such as an export, report or API response. An **API**, application programming interface, allows software to read or change information through supported operations.

The producer's team can differ from the people who approve the HR record. A reporting team can operate an export without having authority to extend a contract.

An **integration owner** maintains the supported read, mapping and operational behavior. A **consumer** is a system or process that uses the supplied value.

For this example, the organization agrees these responsibilities:

| Responsibility | Assigned party in this example | Evidence of completing its part |
|---|---|---|
| Approve the contract end | HR data owner | Approved worker record and change history |
| Publish the approved worker data | PeopleLedger export team | Correct identified row in the delivered export |
| Represent and calculate the ISC values | Identity integration team | Collected source account, mapping and resulting identity value |
| Maintain the application's expiry behavior | GrantDesk application team with identity operations | Supported update result and actual target expiry configuration |

These are illustrative assignments, not mandatory SailPoint job titles. One team can hold more than one responsibility, but the separate decisions still exist.

ISC also records a **Source Owner** for a configured source. That assignment doesn't, by itself, document every field's business meaning, producer obligation or correction route.

Likewise, a person's access to an administration screen doesn't establish authority to approve a business change.

## “Authoritative” needs a field and a purpose

An **authoritative source** participates in establishing ISC identities through an **identity profile**. The profile configures an identity population and the mappings that supply its attributes.

A **transform** calculates or formats a value using supported logic.

Making PeopleLedger authoritative for identities doesn't mean that every identity attribute must come from it or that every application field must overwrite HR.

In our agreement:

HR owns the approved contract end and employment status. The corporate directory team supplies the work email address. The integration team implements the selected mappings, but doesn't approve a contract extension by editing a transform.

**Account correlation** associates an account with its owning identity using configured matching. It doesn't decide which competing end date is the approved business value.

If HR says 31 December and an application still says 30 November, don't select the later date just because it preserves access. Don't select whichever system was read last either.

Establish which field is responsible for which decision. Then investigate why the other value differs.

A downstream value can be an observation of what is configured today, rather than the authority for what should be configured.

## Write an agreement that a real record can satisfy

A **schema** defines represented attributes and their designated uses. It tells you more than a list of column headings, but it doesn't replace the business agreement behind those fields.

For PeopleLedger, the team records the following selected field rules:

| Field or concern | Agreed meaning | What needs verification |
|---|---|---|
| workerKey | Stable identifier of this PeopleLedger record | Present, unique in the intended source context, not casually reassigned |
| personNumber | Reference to the person under the agreed matching design | Correct owner, supported format and handling of multiple worker records |
| employmentStatus | Agreed worker status code | Meaning of each allowed code and handling of unknown values |
| contractEnd | Last authorized calendar day for this fixed-term record | Required for this worker category, correct date and agreed time-zone boundary |
| managerNumber | Reference to the responsible manager | Valid reference or an explicitly handled exception |
| recordRevision | Producer's version of this worker record | Which approved revision was published, not merely when a file was created |
| Delivery scope | Agreed worker population and full/change contract | Correct population, completeness, effective period and export time |

A **snapshot** represents the agreed population at a defined time. A **change feed** supplies selected changes rather than repeating that complete population. The delivery agreement must say which one it supplies.

Agree how corrections, deliberately deleted records and temporarily unavailable data are represented. A worker missing from a partial or changes-only delivery hasn't automatically been terminated, deleted from the source, or stripped of access.

workerKey identifies an HR record. personNumber identifies the person under this project's agreement. Multiple records for one person need a deliberate design; don't force those two identifiers to mean the same thing.

For managerNumber, agree whether the value is the manager's person reference, account key or another identifier, and which configured matching uses it. A non-empty reference doesn't itself establish the correct manager relationship.

A **data type** describes the kind of value, such as text, a whole number or a true/false Boolean. **Cardinality** describes whether a field holds one value or a collection.

Agree those properties alongside the business meaning. A textual reference isn't automatically a number suitable for arithmetic, and a list isn't automatically one joined string.

A selected corrected row could look like this in **JSON**, JavaScript Object Notation. Curly braces contain a named-property object; quoted values are text, and the unquoted revision is a number.

```json
{
  "workerKey": "PL-W-48008",
  "personNumber": "48008",
  "employmentStatus": "ACTIVE",
  "contractEnd": "2026-12-31",
  "managerNumber": "48001",
  "recordRevision": 18
}
```

This is a selected record fragment, not a complete authoritative-source feed or an instruction to create an identity. The other required attributes and supported account identification are assumed to be correctly configured.

A **record revision** is a version assigned by this fictional producer. Its presence doesn't make ISC automatically reject older rows or choose the highest version. Any ordering protection needs a supported, explicitly implemented design.

## Required for what?

A field can be required by the source schema, by an ISC feature, by a target operation, or by the organization's own decision logic. Those aren't interchangeable requirements.

ISC identity profiles require mapped, non-null User Name, Work Email and Last Name values. User Name must be unique across identities. Work Email being non-null doesn't mean ISC has verified that it is a usable email address.

Separately, this organization requires contractEnd for fixed-term workers. That is a project rule, not a claim that every ISC identity must have a contract end date.

**Validation** checks whether input meets specified conditions. Presence is only one condition. A manager reference can be present but identify the wrong person; an end date can parse correctly but contradict the approved record.

Decide where each check happens. The source, producer, integration and consumer can enforce different checks. A written requirement alone doesn't prove that software enforces it.

When a required value is missing, assign the investigation and correction route. Don't manufacture an email address, default every unknown status to ACTIVE, or give a fixed-term worker an invented distant expiry simply to make processing continue.

A **fallback** supplies an agreed alternative under specified conditions. It isn't permission to conceal a broken input.

If a record cannot be safely used, the organization needs an approved exception process. That might involve correcting or holding a delivery in the producer's process, or a supported integration-specific response. Don't assume ISC offers a universal automatic quarantine for every bad field.

The correct security response isn't always “keep all access” or “disable everyone.” Responsible owners must agree the response for the affected operation and risk.

## Empty doesn't settle the business meaning

An omitted property, an explicit null, empty text and an empty collection are different inputs.

**Null** is an explicit no-value representation in formats that support it. A missing managerNumber doesn't automatically mean “remove the manager relationship.” A missing contractEnd doesn't automatically mean “permanent employee.”

Define whether a supplied blank means unknown, unchanged, not applicable, or an intentional clearing instruction for the actual operation. If those meanings need separate representations, agree them rather than overloading one blank.

**Attribute synchronization** can keep configured existing account attributes aligned with corresponding identity values. It requires eligible account configuration and existing accounts correlated to identities.

The account field must be included in the **Create Account definition**, the configuration that supplies values for account creation, and mapped directly from an identity attribute. Synchronization uses that configured mapping for existing accounts; it doesn't create those accounts. An agreement or identity mapping alone doesn't enable synchronization.

In that documented mechanism, a null identity value from a profile mapping can propagate to the synchronized account attribute.

So “leave it blank and the application will keep its old value” isn't a safe universal assumption.

**Provisioning** performs supported changes to external accounts or access. Reading missing information, calculating an identity value and submitting an account update are different operations with different consequences.

An agreement needs both read meanings and write meanings where the project performs both.

## A date needs more than a format

An **effective date** states when a business fact applies. A **recorded time** states when that fact or correction was entered. A **delivery time** states when integration data was produced or sent.

Those times can differ without a processing failure. A future-approved change can be recorded today and become effective later. A late correction can describe something that should already have applied.

For Devi, HR approves the extension on 20 November 2026 at 08:45 UTC. **UTC**, Coordinated Universal Time, is the common time reference used for this example.

The agreed contractEnd value is date text in year-month-day format. The business interprets it as the last authorized day in UTC.

Under that specific agreement, 2026-12-31 gives a required access-ending boundary of 2027-01-01T00:00:00Z. The earlier 2026-11-30 value gives 2026-12-01T00:00:00Z. The Z indicates UTC.

These are supplied business boundaries, not ISC's default date interpretation or a promise that an external change executes at that exact instant.

Agree whether a target accepts a date or a timestamp, which clock rules apply, and what timing evidence satisfies the requirement. A regional time zone can have clock changes that a fixed numeric offset doesn't describe.

Formatting a date doesn't choose those policies. ISC's dateFormat transform can convert supported date representations; it doesn't approve an extension or decide what “last day” means.

A **lifecycle state** represents an identity's organizational status and can drive configured access changes. An HR status code and an ISC lifecycle state need a mapping or calculation; matching English labels alone doesn't implement that relationship.

**Account aggregation** collects account records and attributes into ISC. **Identity processing** evaluates identity information under the applicable profile and access configuration.

A date correction needs the relevant collection, calculation and access-change handling. Don't assume that merely storing a future date schedules every dependent operation.

## A fresh file can carry an old decision

On that same day, the PeopleLedger export is generated at 09:20 UTC, after the 08:45 approval. ISC reads it at 09:30 UTC.

But the row still contains revision 17 and contractEnd 2026-11-30. The approved HR record is revision 18 with contractEnd 2026-12-31.

```text
[Approved worker: revision 18]
[contractEnd: 2026-12-31]
              !=
[Exported worker: revision 17]
[contractEnd: 2026-11-30]
```

The comparison is between two identified records for PL-W-48008. It isn't a new matching algorithm or an automatic ISC revision check.

The export's new timestamp proves when that delivery was generated. It doesn't prove that the producer selected the latest approved worker revision.

The supplied defect is a stale export view. The connector and identity mapping faithfully use the old date they receive.

Reprocessing the same old input doesn't create the approved extension. Editing the calculated identity date to hide the discrepancy doesn't repair the producer's data either.

**Freshness** must therefore identify what is fresh: the delivery, the included business record, the collected account, the calculated identity value, or the target state.

A promised delivery every hour is a service expectation, not proof that each row's business value is at most an hour old. Define how missed deliveries, stale rows and late corrections will be detected and escalated.

## Fix the responsible boundary and follow the result

In this example, HR has approved the business change. The export still needs a correction: its team fixes the stale view and publishes the approved revision 18 for the same workerKey.

The integration team then checks the appropriate collection and identity-value calculation. Starting identity processing doesn't itself prove successful external delivery.

GrantDesk's expiryDate is assumed to support updates and to be configured for attribute synchronization from the agreed identity contract-end value. The applicable target operation and actual target expiry are checked separately.

The dependency and responsibility handoff is:

```text
[HR approves the business change]
                 |
[Producer publishes corrected data]
                 |
[ISC collects and calculates values]
                 |
[Supported target update is verified]
```

The lines describe required handoffs and evidence. They aren't one private transaction, a universal ISC execution order, or a guarantee that every downstream system supports the requested update.

In the supplied corrected result, the source account and identity both contain 2026-12-31, and GrantDesk's actual expiryDate is confirmed as 2026-12-31.

This confirms those stated values. It doesn't prove every future access decision, guarantee uninterrupted sign-in, or demonstrate a future expiry operation.

If the HR value is correct but the export is wrong, correct the producer. If the received value is correct but its mapping is wrong, correct the integration mapping through the supported change process. If the identity value is correct but the target update fails, investigate that operation, its inputs and authority.

Don't change approved HR data merely to compensate for a downstream permission error.

A **correction** fixes an incorrect fact or representation. A new business change approves a different fact. Keep those reasons distinct even when both travel through the same field.

The extension changes Devi's approved contract. Repairing the stale export corrects its representation of that approval. Those are different responsibilities, even though both concern contractEnd.

If a correction arrives after an access action already happened, correcting the record doesn't automatically undo every completed action. Establish what actually changed and the authorized recovery needed.

## Agree what a correction must carry

For an incident, the receiving team needs enough evidence to identify the record and the failed handoff.

Record the source and environment, stable identifiers, affected fields, previous and approved values, applicable effective date, approval evidence, producer revision if available, and relevant delivery or processing references.

Don't send an unrestricted HR export when the investigation only needs one controlled record and its references. Use approved access and handling for personal information.

Agree who acknowledges the issue, who fixes it, who checks downstream consumers, and what closes the incident. “Forwarded to HR” isn't evidence of a completed correction.

Also agree late, repeated and out-of-order delivery handling. A revision 17 file arriving after revision 18 doesn't become the approved business truth just because it arrived later.

Repeated delivery of the same correction shouldn't be used as a reason to create another account. Preserve stable identification and verify the supported repeated-processing behavior; don't invent an exactly-once guarantee.

If a temporary manual exception is approved, record its owner, reason, scope, expiry and reconciliation plan. A target-side edit can be overwritten by configured attribute synchronization if it differs from the identity value.

An undocumented permanent exception can leave two teams believing that the other system is responsible.

## Make acceptance mean more than “the job finished”

**Acceptance criteria** are observable conditions used to decide whether the integration meets its agreed requirement.

For the extension, those criteria include the approved worker revision, the correct exported row, the intended collected account, the calculated identity value and the confirmed GrantDesk expiry.

A successful aggregation, a mapping preview and a successful provisioning request each establish something different. Check the actual resulting state rather than combining those observations into one general success label.

The source's account details show collected attributes. The identity's details show identity values. Profile mappings explain where those values come from. Mapping Preview helps inspect a calculation using selected data; it isn't evidence that a target update completed.

A modified timestamp alone doesn't identify which field changed or whether the value agrees with HR.

Before accepting the agreement, test representative cases: a normal worker, a missing required field, duplicate identifiers, a future change, a late correction, a repeated delivery and a downstream update failure.

A **schema change** alters field definitions or designated uses. Changing selected account identification or naming attributes after aggregation is strongly discouraged: it can break references or create duplicates, and the designated Account Name is documented as immutable. Treat a proposed key or field redesign as a reviewed integration change, not routine data cleanup.

Version the agreement, identify affected consumers, and agree compatibility and recovery before a producer renames contractEnd or changes it from one date to a collection. A new column can still break a consumer if its old required input disappears.

The owner should be able to state which evidence demonstrates correct data and which evidence demonstrates correct access. One doesn't replace the other.

## Work through these handoffs

### 1. The job ran after the approval

HR approved revision 18 at 08:45 UTC. The 09:20 export still contains revision 17.

Does the export time prove that ISC received the extension?

**Worked reasoning:** No. Compare the identified row and approved revision, not just delivery time. In the supplied case, the producer's stale view is the defect. Re-reading that same old row won't supply revision 18.

### 2. Two systems disagree

HR approves 31 December. GrantDesk still shows 30 November. Someone proposes choosing the later date whenever systems disagree.

Is that an adequate authority rule?

**Worked reasoning:** No. Establish who approves this field and the intended source-to-consumer direction. Investigate the stale target or failed handoff. Choosing the later or last-read value can grant unauthorized time in a different case.

### 3. A required email is unavailable

A worker lacks a usable work email. A developer proposes a made-up address so the identity is no longer missing a value.

Has that solved the data requirement?

**Worked reasoning:** No. Non-null and usable are different conditions. ISC requires the mapped Work Email value to be non-null but doesn't validate it as an email address. Follow the approved missing-value process and obtain or calculate only an authorized, valid value.

### 4. The target is fixed by hand

An authorized temporary exception changes GrantDesk expiryDate while ISC still contains the earlier value. Attribute synchronization remains configured for that field.

Is the target edit guaranteed to persist?

**Worked reasoning:** No. Configured synchronization can enforce the identity value on the account. Correct the responsible input and calculation, and record the exception's ownership, duration and reconciliation plan.

### 5. A blank date arrives

The identity mapping produces null for a field configured for attribute synchronization. Someone says null always means “keep the target's old value.”

Can that assumption be used safely?

**Worked reasoning:** No. The documented synchronization mechanism can propagate a null identity value to the account attribute. Establish intended read/write meanings and supported handling before using blank data as an instruction.

### 6. Yesterday's file arrives later

Revision 18 has been approved and published. A delayed delivery contains revision 17.

Should later arrival alone make revision 17 authoritative?

**Worked reasoning:** No. Arrival order doesn't establish business authority or version precedence. Follow the agreed producer and integration ordering/recovery design. Merely including recordRevision doesn't make ISC implement that protection automatically.

### 7. The identity value is correct

The collected account and identity contain 31 December, but the target update is denied. The denial identifies insufficient write permission.

Should HR change the contract end date again?

**Worked reasoning:** No. The supplied defect is in the target-changing operation's authority, not the approved date. Investigate the supported operation and permissions through the responsible team; verify the resulting target state after an authorized correction.

### 8. The date is formatted correctly

contractEnd contains 2026-12-31, but nobody has agreed whether it means the start or end of that day, or which time zone applies.

Has formatting made the expiry requirement complete?

**Worked reasoning:** No. Agree the business boundary, target representation and required processing/delivery evidence. The example's next-day UTC boundary is an explicit agreement, not a universal ISC default.

## Review a different project's agreement

A laboratory application receives worker references, manager references and training status from separate providers. The proposal says, “The source owner owns everything. Missing values mean no change. The latest file wins. If the job is green, support can close the issue.”

What would you replace?

**Worked reasoning:** Assign field-specific business authority, producer responsibility, supported mappings, operational ownership and consumer verification. A configured Source Owner doesn't document all those decisions.

Agree stable identifiers and manager-reference meaning, requiredness for each use, allowed training-status values, and explicit missing/clearing semantics for each operation. Don't infer authority or ordering from file arrival.

Establish scope, completeness, freshness, effective times and approved responses to unknown or late data. Agree correction references and evidence for each handoff, with controlled handling of personal information.

Define acceptance for the source record, collected representation, identity calculation and each intended target change. Preserve unresolved outcomes instead of closing them under a general job-success label.

Explain it to the owner: “We need to know who decides each value, who delivers it, how ISC uses it, and what evidence proves the intended result. Owning a system and completing a job aren't substitutes for that agreement.”
