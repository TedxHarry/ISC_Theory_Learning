# Two worker records. Which identity profile governs the person?

Devi has finished a contract and joined as an employee. Her new employee number is `65005`. Human Resources (HR) has an employee record for her, but the contractor register still retains her previous record.

SailPoint Identity Security Cloud (ISC) has collected both records and correctly associated them with one identity. The employee record says Department is `ENG`; the contractor record says `OPS`.

Which set of identity settings should ISC use?

The answer depends on the identity profiles and their priority. It doesn't depend on which record arrived last, or which department sounds more plausible. Before changing anything, we need to separate who owns each account from which profile governs the identity.

## An account and a profile answer different questions

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a particular connected system. Devi's HR worker record counts as an account in this integration even though she doesn't use it to sign in.

A **source** is ISC's configured representation of a system or account-data collection. Its **connector** provides the supported integration behavior. **Account aggregation** reads account information into ISC.

An **authoritative source** supplies accounts used to establish identities through an **identity profile**. The profile is shared configuration: it defines identity attribute mappings, relevant ISC sign-in and security settings, and lifecycle-related access settings.

An **attribute** is a named piece of information. Department on a collected HR account is an account attribute; Department on Devi's ISC identity is an identity attribute. A **mapping** selects or calculates the identity value.

**Account correlation** matches and associates source accounts with identities. That relationship answers, “Whose account is this?”

Profile priority answers a different question: “Of the profiles whose authoritative sources have accounts associated with this identity, which profile governs it?”

An identity can have accounts on more than one authoritative source. It is associated with only one identity profile at a time.

When we call a profile the **governing profile**, we mean that one associated profile. We aren't introducing a second kind of ISC profile.

## Establish the population before comparing priorities

A **population** here means a set of people the organization intends to manage, such as employees or contractors. It is a design description, not an automatic rule that reads a job title and assigns a profile.

Suppose this fictional environment has:

| Profile and priority | Authoritative source and intended population |
|---|---|
| Employees, `10` | PeopleCore Production: employee worker records maintained by HR. |
| Contractors, `20` | ContractRegister Production: external workers maintained by the contractor administration team. |
| Subsidiary Staff, `5` | SubsidiaryHR Production: workers of a separately integrated subsidiary. |

**Priority** is the configured ordering used when an identity has accounts on multiple authoritative sources. A lower priority number represents a higher priority: `10` takes precedence over `20`.

But don't start by picking the lowest number anywhere in the table. First establish which authoritative accounts belong to this identity.

In the example, Devi has PeopleCore account `h-65005` and ContractRegister account `c-65005`, both attached to her one ISC identity. She has no account on SubsidiaryHR.

Employees and Contractors therefore participate in her profile choice. Subsidiary Staff doesn't, even though its priority number is lower than either of theirs.

We'll use **eligible profile** as shorthand for a profile meeting that documented account-presence condition for the identity. It isn't a separate eligibility field you configure on the profile.

The highest-priority eligible profile governs Devi: Employees, priority `10`.

Two useful checks follow. A high-priority profile cannot govern everyone merely because it exists. And a person appearing in two source systems doesn't establish that both accounts are attached to one ISC identity.

The first is a priority misunderstanding. The second is an ownership question that you must investigate separately.

## See the account relationships and the winning profile

Assume the account associations and required identity values in this example have already been verified. Both worker accounts carry the approved person reference `P65005`, matching Identification Number on Devi's identity through the configured correlation. This reference is separate from her employee number and from either source's account identifier.

That matching setup belongs to this example; a familiar name or equal-looking account ID is not a universal ISC matching rule. The department values differ because the contractor record retains the previous assignment, not because ISC has compared and rejected either value.

We use `I-65005` below as a short teaching label for Devi's ISC identity, not as a real ISC object ID.

```text
Already attached to identity I-65005:
  PeopleCore h-65005
    -> Employees (10): eligible
  ContractRegister c-65005
    -> Contractors (20): eligible

No SubsidiaryHR account on I-65005:
    -> Subsidiary Staff (5): not eligible

ISC profile choice among eligible profiles:
  Employees (10) before Contractors (20)
    -> one governing profile: Employees
```

The account-to-profile arrows connect each authoritative account's source with its profile. The last arrow shows the profile-selection result, not an account moving to a different source.

ISC doesn't discard `c-65005` because Contractors has lower priority. That account can remain associated with Devi while Employees governs her identity.

This is a relationship and decision map, not a diagram of internal services or execution timing. It assumes correct account ownership; it doesn't show how those associations were originally established.

## The winning profile chooses mappings, not one source for everything

A **custom identity attribute** is an additional identity field defined for the tenant. Creating its definition makes it available across identity profiles; each profile's mapping determines how its identities receive the value. It doesn't create a private field that only one profile can see.

Here are selected mappings in the fictional profiles:

| Identity attribute | Employees mapping compared with Contractors mapping |
|---|---|
| Department, `department` | Employees uses PeopleCore `departmentCode`, currently `ENG`. Contractors uses ContractRegister `assignmentDepartment`, currently `OPS`. |
| Worker Type, custom `workerType` | Employees uses PeopleCore `workerCategory`, currently `EMPLOYEE`. Contractors uses ContractRegister `workerCategory`, currently `CONTRACTOR`. |
| Work Email, `email` | Both profiles use Corporate Directory `mail` on Devi's associated account `d-65005`, currently `devi65005@example.com`. |
| User Name, `uid` | Both mappings produce the approved stable ISC username `person65005`. That value is unique in this example. |

With Employees governing and its mappings successfully applied, the supplied example result is Department `ENG`, Worker Type `EMPLOYEE`, and Work Email `devi65005@example.com`.

Work Email still comes from Corporate Directory. That source doesn't have to become authoritative for identity creation to supply this approved field.

Contractors' Department mapping doesn't become a fallback simply because that profile is lower in priority. If Employees' chosen input is missing or its calculation fails, inspect that mapping and any explicitly configured fallback behavior. Profile priority is not a field-by-field search through other profiles.

Likewise, Employees can deliberately map a field from ContractRegister if that is the approved input and the account is associated correctly. Governing profile and attribute supplier remain separate decisions.

This matters when troubleshooting. If Employees governs but Department still comes from a directory account, inspect Employees' Department mapping. Moving Employees higher cannot correct an input choice already inside that profile.

## Keep three kinds of selection separate

There is another selection problem that can look similar.

Suppose Devi has two accounts on Corporate Directory: her normal work account and an administration account. Choosing Employees as the governing profile doesn't choose which directory account supplies Work Email.

For a mapping using the **Account Attribute transform**, ISC looks up a particular account attribute on an identity's accounts for a specified source. A **transform** is a configured calculation or lookup used to produce a value.

That transform can filter and order the associated accounts. Its documented default order uses the account-created date, oldest first; its default null handling continues to the next account when the selected attribute value is null, meaning no value is present. An explicit definition can change that behavior. This ordering isn't a comparison of HR hire dates unless you deliberately configure an appropriate input for that purpose.

Those defaults belong to that transform. They are not the rule for choosing a governing identity profile or a universal rule for every ISC operation.

Keep the questions distinct:

1. **Account ownership:** Is this source account attached to the intended identity?
2. **Profile selection:** Which eligible identity profile has the highest priority?
3. **Attribute input:** What source, account selection and calculation does that profile use for this field?

An account filter inside a transform narrows that value lookup. It doesn't remove the account from ISC, change the connector's collection scope, or by itself change the identity's governing profile.

If an administrator filters out an old contractor account while calculating one field, don't conclude that Contractors is no longer eligible. A value-lookup filter and the account relationship are different things.

## Why creation order can quietly become policy

When identity profiles are created, their initial priority follows creation order. The earlier profile gets higher priority. The documented defaults start at `10`, then `20`, and continue in that pattern.

That is a configuration default, not evidence that the organization approved the same business precedence.

Imagine Contractors was created first with priority `10`, and Employees was created later with priority `20`. If both authoritative accounts belong to Devi's identity, Contractors has higher priority.

A newer employee record, a more recent aggregation, or the word “Employees” in a profile name doesn't reverse that ordering.

An authorized administrator can change a profile's `priority` through the supported Update Identity Profile API. An **API** is a supported interface for software to read or change platform data. Here it changes shared profile configuration; it isn't a special per-person conversion button.

Use the current supported API specification and an approved change process. Avoid tied priorities in the design rather than inventing a tie-breaker or relying on list position.

Before changing a priority to fix one person, ask who else has accounts on the overlapping authoritative sources. The same ordering applies to those identities too.

For example, changing Employees from `20` to `5` may implement “employee profile takes precedence wherever employee and contractor accounts overlap.” It cannot express “Employees takes precedence for Devi, but Contractors takes precedence for another person with the same account-presence pattern.”

If the business needs different treatment for those two people, a single shared priority change doesn't encode that distinction. Revisit the population and transition design instead of repeatedly reversing the ordering.

## Follow a contractor-to-employee transition

Return to the main configuration: Employees `10`, Contractors `20`, Subsidiary Staff `5`.

Before HR supplies Devi's employee account, only her contractor account is associated with the identity. Contractors governs. Employees' higher priority doesn't help because its authoritative account isn't present on that identity.

When the new HR record is collected and correctly associated with that same identity, Employees becomes the highest-priority eligible profile. This transition depends on the account relationship being established, not just the record's arrival.

**Identity processing** reevaluates identity data and configured access requirements. Changes to identities during aggregation can initiate it. Configuration changes also have a manual processing path; saving configuration and applying it are separate concerns.

The following trace supplies successful processing and observed identity results as fictional facts. It does not promise a fixed delay or show a universal sequence of internal jobs.

```text
A. Observed before the employee record
   I-65005 has c-65005 only
     -> Contractors (20) governs
     -> Department OPS

B. HR account collected and associated
   Same I-65005 has c-65005 and h-65005
     -> Employees (10) has precedence

C. Processing completes successfully
   Employees mappings produce:
     Department ENG
     Worker Type EMPLOYEE
     Email from Corporate Directory

Human verification after processing:
   Same identity and correct accounts?
   Expected profile and mapped values?
   Separate access changes confirmed?
```

The arrows connect supplied conditions to the expected profile or mapped result. Stage C assumes the selected account inputs exist and the calculations succeed. The human checks are investigation work, not additional automated processing stages.

Look at what remains continuous: the ISC identity is still `I-65005`, and both worker accounts belong to it. The employee account hasn't overwritten the contractor account. The governing configuration has changed.

For a configuration change, **Preview** evaluates mapping results for a selected identity; it does not prove that the change is applied across the population. **Apply Changes** on an identity profile initiates processing for identities associated with that profile.

Don't assume that processing one profile's current members covers every identity affected by an ordering change. Establish the affected identities, the approved processing scope and the observed reassignment results. A successful configuration update response alone isn't evidence that every transition has completed.

## A different profile can affect more than Department

A **lifecycle state (LCS)** represents a stage such as active employment or termination, with configured access and account actions for the profile. A **role** can group access requirements and assign them according to configured membership criteria.

A profile change can alter mapped values used by lifecycle or role decisions. It also changes which profile's lifecycle configuration and relevant ISC security settings need to be considered.

Suppose both Employees and Contractors have a state named Active. Matching labels don't establish matching configuration. Compare the technical state names, enabled settings, account actions and access requirements in the relevant profile.

Nor does becoming an employee establish that all contractor access has disappeared. An **entitlement** is a permission or membership represented from a source. A **provisioning** operation attempts a supported account or access change in a connected system.

To establish what happened to a contractor entitlement, inspect its assignment basis, the applicable removal configuration, processing results, provisioning results and the target system's actual state. The **target system** is the external system receiving the attempted change.

Identity processing can initiate provisioning, but it doesn't itself validate successful delivery. “Employees now governs” and “the contractor permission was removed” are separate claims.

The same boundary applies to login names and email. A changed ISC username or email value does not by itself rename an external account, create a mailbox, or invalidate an application session.

During a conversion, compare old and new required mappings, stable identifiers, manager inputs, lifecycle values, security settings and consumers that use those values. A **consumer** here is a process or system using an identity value. Investigate the dependencies that actually exist in the project rather than assuming every attribute change causes every possible action.

## What if the person moves in the other direction?

Suppose an employee later becomes a contractor while both authoritative accounts remain attached. Employees still has priority `10`; Contractors still has `20`.

Changing a business field to `CONTRACTOR` does not itself reverse that ordering. A status attribute, a disabled account, an identity lifecycle state and an account's removal from ISC are not interchangeable conditions. Verify which relationship actually changed.

There is a documented reassignment path when the governing authoritative account is deleted from ISC through the applicable account-deletion aggregation behavior. If another lower-priority authoritative account remains on the identity, ISC reassigns it to that source's profile and recalculates attributes using the new mappings.

That explains why an old authoritative account's continued presence matters. It is not a recommendation to delete worker records to force a conversion.

A missing row in one export is not sufficient proof that the account was removed from ISC. Collection mode, deletion settings, safeguards and the recorded outcome matter. If no other authoritative account remains, identity deletion or hidden-identity handling can apply instead of a simple profile change.

Plan the approved transition with the data and access owners. Protect identity continuity and retained evidence, and account for the effects of any real account removal. Don't delete an identity or profile as an improvised way to fix Department.

## Investigate the recorded profile before changing configuration

The Identity Profiles view exposes each profile's authoritative source, priority, associated population information and processing status. The identity and account views help establish which records belong to the particular identity.

These screens describe different objects. A profile's priority is shared configuration. An identity's profile association is the result for that identity. A source account's status or department is source data.

For an unexpected governing profile, collect evidence in this order:

1. Identify the exact ISC identity, not just its display name. Record its current profile association.
2. Inspect the attached authoritative accounts with their source references and account identifiers.
3. Compare the relevant profiles' authoritative source references and actual priority values.
4. Separate an unexpected account association from an unexpected priority order.
5. Inspect the governing profile's mappings and selected account inputs for the disputed values.
6. Check the relevant processing execution and resulting identity state. Verify any access-changing work separately.

These are human evidence checks, not a claim about internal processing order.

If two different identities each display “Devi Rao,” don't combine their account lists on paper and then predict a single winning profile. Priority applies to the authoritative accounts of a particular identity. A matching name doesn't prove those two identity records are the same entity or authorize merging them.

Required User Name, Work Email and Last Name mappings still matter for each profile. User Name must be unique across identities from every profile. A duplicate username can produce an identity exception; it is not a supported instruction to merge identities.

An **identity exception** records a problem such as missing required identity values or a duplicate username. Correct the actual data or configuration issue using the approved identity-continuity design. Changing priority isn't a general cure for exceptions.

## Try the decisions against changed evidence

### 1. The highest-priority profile has no account

**Facts:** Employees is `10`, Contractors is `20`, and Subsidiary Staff is `5`. One identity has only a ContractRegister account. All required mappings succeed.

Which profile governs?

**Reasoning:** Contractors. Neither Employees nor Subsidiary Staff has an associated authoritative account for this identity. Ranking profiles before checking account presence would select an inapplicable profile.

### 2. The lower-priority record was read last

**Facts:** Devi's two authoritative accounts belong to one identity. Employees is `10`; Contractors is `20`. The contractor account was collected after the employee account. Successful processing has completed.

Does the later read make Contractors govern?

**Reasoning:** No. Employees has higher priority among the eligible profiles. Collection time describes when an input was observed, not the profile ordering. Investigate a wrong attribute through Employees' mapping rather than assuming “last read wins.”

### 3. The profile is correct but its input is wrong

**Facts:** Employees governs. Its Department mapping uses Corporate Directory, where the collected value is `OPS`. PeopleCore contains `ENG`. The agreed supplier is PeopleCore.

Should you lower Employees' priority number?

**Reasoning:** That doesn't repair the Department mapping. Employees already governs. Inspect and correct the approved input path, preview the calculation, apply the approved change and verify the resulting identity value. Directory changes require their own configured and verified write path.

### 4. Both records show Devi's name, but the identities differ

**Facts:** Identity A owns `c-65005`. Identity B owns `h-65005`. Both display “Devi Rao.” Employees has higher priority.

Will changing the priority merge A and B?

**Reasoning:** No. The accounts are attached to different identities; one priority comparison cannot combine them. Confirm person references, ownership history and correlation configuration, then use the approved correction process. Don't delete a record or reuse a username to force a result.

### 5. Creation order conflicts with the agreed policy

**Facts:** Contractors was created first at `10`, Employees second at `20`. Both accounts are attached to one identity. Policy says Employees should govern every such overlap.

What is wrong, and what must a proposed correction consider?

**Reasoning:** The configured ordering contradicts the agreed overlap policy. A supported priority change can align it, but it changes shared configuration. Identify all overlapping identities, compare profile mappings and lifecycle/security settings, preserve the previous configuration and verify processing and reassignment outcomes. Fixing one sample doesn't establish population-wide correctness.

### 6. A status changes but the account relationship remains

**Facts:** Employees `10` governs. Its authoritative account is still attached. HR now marks that account `inactive`; a ContractRegister account also remains.

Can you conclude Contractors now governs?

**Reasoning:** No. The supplied change is an account attribute, not evidence that the authoritative account relationship disappeared or the profile ordering changed. Inspect the profile association and configured lifecycle logic. Don't treat an inactive flag as proof of account deletion or profile transfer.

### 7. The governing authoritative account is actually removed

**Facts:** The approved aggregation deletion path has removed `h-65005` from ISC. The same identity still owns `c-65005`. Contractors is the remaining eligible profile, and its required mappings succeed.

What outcome follows from the documented reassignment behavior?

**Reasoning:** The identity is reassigned to Contractors and its attributes are recalculated from Contractors' mappings. This isn't identity merging. The condition is confirmed authoritative-account removal, not merely a missing export row. The resulting profile and attributes still don't prove that all external access changes succeeded.

### 8. A transition is visible but access remains

**Facts:** Employees now governs Devi. The applied identity shows Department `ENG`. A contractor-only group remains on the target application account.

Does the group prove that profile selection failed?

**Reasoning:** No. The profile and Department observations support the identity-side result. Investigate how the group was assigned, whether the transition requires its removal, what processing initiated, and what the application accepted. A remaining permission could involve removal configuration or fulfillment; its presence alone doesn't identify a profile-selection defect.

## Take the same reasoning to an acquisition

A company acquires a subsidiary. The initial proposal is to give Headquarters Employees priority `10` and Acquired Staff priority `20`. People will have records on both authoritative sources during migration.

Before accepting the design, what would you ask?

Establish whether those accounts will belong to the same identity and which stable person references support that continuity. Confirm whether Headquarters should govern every overlapping person, including people whose migration isn't yet effective.

Compare the two profiles' field meanings, required mappings, security settings and lifecycle requirements. Establish how future-dated records become eligible account relationships in the actual design. Priority doesn't read an acquisition date and postpone precedence on its own.

Then agree how the transition is processed and what evidence confirms identity continuity, governing profile, mapped values and separate access outcomes. Include people present only on one source, people present on both, and unexpected duplicate identities.

Try explaining the proposal back without saying “HR wins.” Say which accounts establish eligibility for which identity, which priority selects the governing profile, and which mappings produce the values. That explanation exposes whether the design actually represents the intended migration.
