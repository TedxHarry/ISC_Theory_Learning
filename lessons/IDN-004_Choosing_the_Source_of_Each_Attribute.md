# Which source should supply this identity attribute?

Devi, employee number `64004`, has moved from Operations to Engineering. Her personnel record, maintained by Human Resources (HR), now says `ENG`. Her directory account still says `OPS`, while a project application has a field called Department containing `PRJ-17`.

SailPoint Identity Security Cloud (ISC) has collected all three records. Which value should become Department on Devi's identity?

“Use the newest record” sounds reasonable until you ask what each field means. “Use HR for everything” also misses the point: HR can own the employment department while another team supplies the work email.

Let's make the choice for a particular field, population and purpose.

## Separate population authority from attribute authority

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a particular system. An HR worker record can be an account in the integration without being an employee login.

A **source** is ISC's configured representation of a system or account-data collection. Its **connector** supplies the supported integration behavior. **Account aggregation** reads account information into ISC.

An **attribute** is a named piece of information. An account attribute belongs to a source account; an identity attribute belongs to the ISC identity.

An **identity profile** is shared configuration for the identities it governs, including their identity attribute mappings. An **authoritative source** supplies the accounts used to establish identities through that profile.

For this fictional example, **PersonnelHub Production** is authoritative for the employee population, and **Employees** governs Devi's identity.

That establishes where this population comes from. It does not automatically make PersonnelHub the approved supplier of every identity attribute.

An **identity attribute mapping** selects or calculates a value for an identity attribute. It can use account information from different sources. **Account correlation** matches and associates accounts with their intended identities.

Assume Devi's relevant accounts have already been correctly associated with one identity. We are deciding which information they should supply, not using a preferred-looking value to repair ownership.

## First ask whether the fields mean the same thing

Here is selected fictional evidence from October 21, 2026. All times use Coordinated Universal Time (UTC), so the comparisons don't mix local time zones.

| Collected account | Value and meaning in this design |
|---|---|
| PersonnelHub Production, `ph-64004` | `homeDepartment = ENG`. HR approved the current employment department effective at 09:00. The account was read at 09:05. |
| Corporate Directory, `cd-64004` | `department = OPS`. A downstream copy of the previous employment department. The record was modified at 09:08 for a phone correction and read at 09:10. |
| ProjectFlow Production, `pf-64004` | `department = PRJ-17`. A project resource group, not the employment department. The account was read at 09:11. |
| CostLedger Production, `fc-64004` | `allocationCostCenter = 0042`. Finance's approved current cost-centre identifier, represented as text. The account was read at 08:45. |

The profile currently maps identity Department from Corporate Directory, so the represented identity value is `OPS`. There is no hidden competition in which ISC automatically compares all three department-like fields and chooses the best one.

The **business data owner** decides the approved meaning and business value. The **integration owner** implements and maintains the supported path carrying that value into ISC. Those responsibilities can belong to different teams.

For employment Department in this design, HR owns the decision and PersonnelHub `homeDepartment` supplies it. The directory is a receiving copy, and ProjectFlow's similarly named field describes something else.

Selecting `PRJ-17` because it was read last would replace an employment fact with a project grouping. Selecting `OPS` because the directory record was modified most recently would mistake a phone correction for a new department decision.

Even two fields containing `ENG` are not necessarily interchangeable. One could mean an employment department, another a project assignment. Agreement in one example is not evidence that their meanings stay aligned.

The same question applies to legal names versus preferred names, a contractual work location versus today's project site, or a manager of employment versus a project lead. Start with the intended meaning, not the nearest familiar label.

## Choose the input for each field

A useful source decision identifies the field's approved supplier and why that supplier can meet the requirement.

For Employees, suppose the owners agree:

| Identity attribute | Approved input and reason |
|---|---|
| Identification Number, `identificationNumber` | PersonnelHub `workerNumber`, text `64004`. It is the approved person reference for this population. |
| User Name, `uid` | PersonnelHub `iscUserName`, `employee64004`. The design supplies a unique, stable ISC username before directory account creation. |
| Last Name, `lastname` | PersonnelHub `familyName`, `Rao`. HR maintains the surname required by this identity design. |
| Department, `department` | PersonnelHub `homeDepartment`, `ENG`. It represents the approved current employment department. |
| Work Email, `email` | Corporate Directory `mail`, `devi64004@example.com`. The messaging team maintains the assigned work address; initial availability needs a separate onboarding design. |
| Cost Center, `costCenter` | CostLedger `allocationCostCenter`, text `0042`. Finance maintains the approved allocation, rather than a stale copy in another system. |

PersonnelHub in the table means PersonnelHub Production; CostLedger means CostLedger Production. These are selected fictional mappings, not mandatory SailPoint source names or a complete profile template.

The choice is field-specific. A non-authoritative source can supply an approved identity value without becoming the origin of employee identities.

An ISC source records a **Source Owner** for responsibilities such as completing manual fulfillment tasks or reviewing access. That assignment is different from business ownership of each field. It does not, by itself, document who may approve an employment department, an email address or a financial allocation.

For a source decision you can defend, establish:

- **Meaning:** What exactly does this field represent? What codes, formats and effective dates are allowed?
- **Coverage:** Does the input exist for every relevant person and account case, including contractors, pre-hires and people with more than one account?
- **Availability:** Is the value present when the consuming process needs it, or only after a later account-creation step?
- **Freshness:** How soon is an approved business change published, collected and applied?
- **Correction:** Which owner fixes a wrong or missing value, and what evidence proves the repair?
- **Direction:** Is this the origin of the value, an approved calculated value or merely a copy receiving updates?

These questions are design criteria. They are not a product feature that ISC automatically checks before accepting a mapping.

## A later timestamp does not create authority

A **producer** is the system or process that publishes the integration data. An **effective time** says when a business fact should apply. A **publication time** says when the producer made it available to the integration. A **collection time** says when ISC read it. These times answer different questions.

In Devi's case, the department change is effective at 09:00, and the approved value has reached the PersonnelHub account read at 09:05. The later directory read at 09:10 still contains `OPS`.

That later read establishes a newer observation of an older copy. It does not approve a new employment department.

Likewise, a record-level modification time may concern another field. You cannot infer a field's approved revision merely from the account's latest modification timestamp.

A source can also publish future changes in advance. If a transfer is approved for November 1, a field describing the next department is not automatically today's department. Establish how the producer exposes current and future values and how the mapping should respect the business date and time zone.

A direct mapping copies the selected value. It does not infer every effective-date rule just because another field contains a date.

If HR is the agreed owner but its export is late, that is a delivery problem to investigate. Switching to a stale downstream copy can conceal the problem without meeting the requirement.

## Make the approved path explicit

For identity Department, the approved correction is to select PersonnelHub `homeDepartment`, not to copy whichever candidate is available first.

A **transform** performs configured calculations or conversions on input values. A direct mapping needs no additional conversion when the supplied value already meets the requirement. A transform may help with an approved code conversion, but it doesn't decide business ownership for you.

**Identity processing** evaluates identity information against configuration, including its profile mappings and applicable access requirements.

Assume the shared mapping change has been approved, saved, checked against representative employees and applied through the relevant identity processing. In the supplied outcome, Devi's identity Department becomes `ENG`.

```text
HR-approved current department
PersonnelHub homeDepartment: ENG
               |
               | Employees Department mapping
               | selects this agreed input
               v
ISC identity Department: ENG

Other collected values:
Directory department: OPS
ProjectFlow department: PRJ-17

They do not vote on Department.
```

The arrow shows the configured value dependency when the mapping is evaluated and applied. It is not a private execution sequence or a claim that every employee's data has been verified by checking Devi.

The directory still contains `OPS` in this supplied outcome. No directory Department synchronization write is configured in this primary example.

**Provisioning** carries out supported account or access changes. **Attribute synchronization** is separately configured behavior that writes selected identity values to existing correlated source accounts through provisioning.

If the design also requires the directory copy to become `ENG`, review that separate write path and verify its operation and target result. A correct identity Department does not prove that a directory update occurred.

The selected source can affect access too. A **role** can package access and use identity attributes as membership criteria. A **lifecycle state** describes a business stage, such as active employment or termination, and can drive configured access changes.

Review those consumers before changing a shared mapping. Source selection can alter decisions that use the value, even when you didn't edit their definitions.

## Plan for the time before downstream data exists

Work Email is different from employment Department. Its approved long-term supplier may be the directory or messaging system that assigns the address.

For a new hire, that account might not exist yet. User Name `uid`, Work Email `email` and Last Name `lastname` are required identity attributes and cannot be null, meaning no value is present. User Name must also be unique across identities from all profiles.

Now suppose this project's directory-account creation process requires an established identity with its required information, but Work Email is mapped only from that future account. No initial alternative is supplied.

```text
Identity needs required Work Email
              |
              | selected input requires
              v
Directory account with mail
              |
              | this project's creation path
              | requires the identity first
              v
Identity needs required Work Email
```

The arrows mean “depends on.” This is a circular dependency in the stated project design, not a universal description of every ISC deployment or an internal retry loop.

Waiting for the same unchanged inputs cannot supply the missing starting value. Decide how the dependency will be broken before treating the setup as complete.

An approved design can supply a real initial address from an upstream process, establish the directory account through another authorized onboarding path, or deliberately use an initial technical value with controlled consumers. Each option needs its own verified requirements.

The distinction about a technical value matters. Work Email's required-value check does not validate email format. A supported transform can return a static `none` value when directory mail is not yet available.

That can supply a non-null string; it does not create a mailbox, a contact address or proof that the person can receive an invitation. If a project deliberately uses such a placeholder, it must define when it is allowed, prevent unsuitable use by affected consumers, replace it under the approved design and verify the transition.

An **invitation** asks a person to register for ISC. Registration invitations use Work Email, and invitation behavior has more than one trigger. Setting a profile's ordinary invitations to manual is not proof that every possible email consumer has been controlled.

Don't invent an address, reuse another person's address or assume a placeholder is safe merely because it clears a required-field problem. “The value exists” and “the value is fit for this use” are different claims.

## A fallback needs a business rule as well as a transform

A **fallback** supplies an alternative input or result under a configured condition.

ISC's **First Valid transform**, technical operation `firstValid`, evaluates an ordered list and returns the first result that is not null. Put the preferred candidate first when that is the approved policy.

“Valid” here describes the transform's non-null selection condition. It does not mean the chosen value is current, approved, uniquely owned or suitable as an email address.

Suppose an approved policy says to prefer the assigned directory address, then an approved initial-address field from the personnel process. If both are non-null, their order determines the selected result. The transform does not choose the one with the newest timestamp unless appropriate selection logic is deliberately included.

An empty string contains zero characters but is still a string; it is different from null. A space is also a character. Don't assume that a first-non-null test performs the business validation needed for these values.

Errors are another condition. First Valid's `ignoreErrors` option controls whether evaluation proceeds after an input error; its default is false. An error is not automatically the same thing as a null input. Don't suppress errors merely to hide a broken source or calculation.

For each fallback, specify the trigger, acceptable alternate supplier, relevant population, duration and transition back to the preferred input. Ask what happens if the preferred value returns after the alternate has already been used.

A changing User Name deserves particular care. Preferring a directory login over an initial personnel-based username can change the identity's `uid` when that directory input becomes available. Review sign-in, matching and other consumers before approving that behavior; don't treat it as an invisible implementation detail.

Fallback can express an approved policy. It cannot replace one.

## Check that the same source choice works for the population

Devi has all the accounts in our main example. A contractor or pre-hire may not.

If CostLedger has employee allocations but no contractor records, that input cannot meet a requirement covering every contractor merely because it works for Devi.

The governing identity profile can have its own mappings, so different populations can use deliberately different input policies. That does not require every population to use every available source. Establish the correct scope before changing shared configuration.

Within a source, one person can also have an ordinary account and an administrator account. The source's name alone doesn't tell the mapping which account is the approved supplier.

A supported **Account Attribute transform** can select an attribute from associated accounts on a chosen source, with account filtering and sorting options. Account filtering narrows which accounts may supply the value; sorting orders the remaining candidates. This input-selection filter is separate from a connector's collection filter.

Check the intended account, not simply the first non-null result. A former contractor account or an administrator account can contain a perfectly well-formed but unsuitable value.

A **data type** describes what kind of value is represented, such as text or a number. Keep the format and number of values consistent with the requirement too. Finance's identifier `0042` must remain text if its leading zeros are meaningful. A list of office locations is not automatically one primary office.

## Don't feed a receiving copy back as the authority

Suppose identity Department is supposed to come from PersonnelHub and then be synchronized to the directory. That is a directional design: approved personnel fact, identity representation, receiving account copy.

If you instead map Department from the directory merely because that copy is convenient, the identity can preserve the outdated `OPS`. A configured write of that same value back to the directory would not repair the missing `ENG` decision.

Conflicting writers or incompatible conversions can also create repeated resynchronization attempts. ISC documents synchronization safeguards, so don't assume every bidirectional design enters an endless loop. The engineering task is still to define the intended owner and compatible direction of updates.

Ask who may change the receiving copy independently, whether such a change should be retained or corrected, and how the source and identity values will converge under the approved policy.

The value displayed in a target application is evidence of current target state. It is not automatically the authority for what that state should be.

## Review the choice before applying it

**Preview** evaluates identity mappings for selected data and shows proposed results. It does not prove coverage across the population or completed changes to identities and applications.

**Apply Changes** on the profile initiates identity processing for its associated identities. Processing can reevaluate access as well as update mapped values, so review the affected consumers and representative cases before initiating an approved change.

For Department, inspect an existing employee, a recent transfer, a future-dated change and a missing input. For Work Email, include someone with no directory account, one with multiple accounts and the transition from the initial input to the assigned address.

You also need a correction route. If PersonnelHub publishes the wrong approved department, involve its business owner. If it publishes `ENG` but the connector represents a different field, investigate extraction. If the source account is correct but the profile selects the directory, investigate the identity mapping.

After the approved correction, check the actual identity result. Verify required provisioning separately; identity processing does not validate that started provisioning has succeeded.

A useful source-decision record therefore states the attribute's meaning, population, approved owner and field, account-selection rule, effective-time and freshness requirements, fallback behavior, consumers and evidence of acceptance.

These are the facts behind the mapping. A dropdown selection alone doesn't contain the whole decision.

## Work through these source choices

Each case is fictional and supplies its own relevant facts.

### 1. The latest read contains the older copy

**Facts:** HR approved `ENG`, effective at 09:00. PersonnelHub was read at 09:05 with `ENG`. Corporate Directory was read at 09:10 with old `OPS`. HR owns employment Department.

**Question:** Should the later directory read win?

**Reasoning:** No. It establishes a later observation, not a later approved department. Verify the agreed PersonnelHub field and mapping. Investigate the receiving copy separately if it also needs updating.

### 2. Two fields share a label but not a meaning

**Facts:** ProjectFlow's Department field contains resource group `PRJ-17`. Identity Department is defined as employment department, owned by HR.

**Question:** Can ProjectFlow supply Department because its field has the same label?

**Reasoning:** No. The meanings differ. Keep a project grouping separate if it is needed; don't substitute it for employment Department. An identical label does not establish the agreed meaning of an input.

### 3. One good employee doesn't establish contractor coverage

**Facts:** A proposed Cost Center mapping reads CostLedger. Its employee records are complete, but the contractor population has no accounts there. No alternate policy is approved.

**Question:** Does a successful preview for Devi approve the mapping for contractors?

**Reasoning:** No. Establish population coverage and an approved contractor input or exception policy. Do not select an unowned alternate value simply to make the output non-null.

### 4. The preferred result is an empty string

**Facts:** A First Valid calculation receives an empty string from its first candidate and a real address from its second candidate. No logic converts the empty string to null or otherwise rejects it.

**Question:** Does the documented first-non-null rule skip that first result?

**Reasoning:** No. Empty text is not null. The selection condition alone does not implement a usable-email check. Establish the approved input validation and missing-value handling rather than assuming the transform's name guarantees them.

### 5. The preferred input errors

**Facts:** The first input calculation fails with an error. First Valid has its default `ignoreErrors = false`. A later candidate would be non-null.

**Question:** Is a successful fallback guaranteed?

**Reasoning:** No. With `ignoreErrors = false`, the input error is not ignored just because a later candidate exists. An error is not simply a null result that must be skipped. Investigate the failing input and approved error policy. Setting error suppression changes behavior; it doesn't repair the original defect or approve the alternate value.

### 6. The required field contains a placeholder

**Facts:** A deliberate initial Work Email mapping produces `none`. The required-value check is satisfied. No consumer safeguards, usable address or invitation-delivery evidence is supplied.

**Question:** Is the person ready to receive ISC registration mail?

**Reasoning:** The supplied evidence doesn't establish that. A non-null string isn't an address or a mailbox. Review the approved initial-value policy, all relevant consumers and the verified transition to the assigned address before treating email-dependent tasks as ready.

### 7. The receiving copy supplies the write-back value

**Facts:** Approved department is PersonnelHub `ENG`. Identity Department instead reads directory `OPS`, and a proposed synchronization would write identity Department back to that directory field.

**Question:** Would that path, by itself, apply the approved HR change?

**Reasoning:** No. It feeds the receiving copy back into itself through the identity. Restore the approved input design through normal review, then verify the identity and any required target write separately. Don't assume configuring synchronization identifies the correct owner.

### 8. The future fact is published early

**Facts:** A producer supplies current Department `OPS` and next Department `ENG`, effective November 1. The observation is October 21. The approved requirement is today's employment department.

**Question:** Should `ENG` be selected because the future-change record is newly published?

**Reasoning:** No. Respect the approved effective-time meaning and current-value design. Publishing a future fact is not the same as making it effective now. Verify date and time-zone handling where the change crosses a business boundary.

## Transfer the decision to a contract end date

A contractor sponsor owns the last authorized day of work. The approved current contract ends November 30. An application contains December 31 from a proposed extension, but no approval exists for that extension. The application was read more recently than the sponsor register.

Identity End Date is intended to represent the approved last authorized day, not the application's currently configured expiry. Someone proposes choosing the later date “to avoid an interruption.”

Which source should govern this identity attribute, and what would you investigate?

The sponsor's approved record supplies the business fact under the stated agreement. The application's later observation is not approval of an extension. Investigate how an unapproved proposed date reached the application and which corrections and access decisions the responsible owners authorize.

Also establish how the approved calendar date is interpreted by each consumer, including its time zone and whether an expiry represents the start or end of a day. Mapping the identity date and changing the target's expiry are separate outcomes.

Do not extend access or overwrite business records merely to make the screens agree. A defensible source choice preserves the agreed meaning and authority, then follows the evidence through collection, mapping, processing and any required target change.
