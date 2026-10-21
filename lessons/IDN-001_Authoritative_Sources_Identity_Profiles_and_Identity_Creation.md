# Where does an ISC identity come from?

Devi is a new logistics coordinator. Human Resources has created worker record `hr-61001`, with employee number `61001`. She doesn't yet have an identity in SailPoint Identity Security Cloud (ISC), and her DispatchDesk application account hasn't been created.

The onboarding team asks, “Once ISC reads the HR record, will Devi appear as an identity? And will that give her DispatchDesk access?”

Those are separate outcomes. Reading a worker record, establishing an identity, and creating an application account have different responsibilities. Let's follow the information between them.

## A worker record can be an account without being a login

An **identity** is ISC's representation of a person or another managed entity. Here, it represents Devi and connects her person-level information with her accounts and access.

An **account** is a record in a particular system. In a business application, that record can be a login. In our HR integration, it is a worker record. Devi doesn't need an HR login or an HR password for this worker record to supply her personnel information.

A **source** is ISC's configured representation of a system or account-data collection. The **connector** supplies its supported integration behavior, such as reading those records. **Account aggregation** reads account information into ISC, where ISC maintains source account records representing the collected data.

So we already have two distinct objects to look for: the HR source account and the ISC identity. Finding the first doesn't prove the second is complete.

For this fictional example, the source is **PeopleLedger Production**. It represents the organization's employee population, not every user of every application. The supplied connector supports account aggregation. The organization has approved this worker population for identity creation.

## What makes this source authoritative?

An **authoritative source** supplies the accounts from which ISC establishes identities through an **identity profile**. The identity profile is configuration for those identities, including how their person-level values are populated. Configuring an identity profile for a source makes that source authoritative.

PeopleLedger Production is associated with the **Employees** identity profile in this example. The profile is shared configuration for this employee population, not a separate personal profile created for Devi. That relationship gives its worker accounts a different responsibility from ordinary application accounts.

ISC doesn't choose that responsibility because a source has “HR” in its name. An organization can deliberately use a directory as an authoritative source. Equally, an application containing employee names doesn't automatically become authoritative.

Ask what the records are meant to establish. Are they the approved population of people to represent, or additional accounts belonging to people established elsewhere?

Making every application authoritative to fix missing ownership is a design mistake. You would be changing which records establish identities, rather than finding why existing accounts haven't been associated with their owners.

Authoritative also doesn't mean “permitted to write everywhere.” A read-only personnel feed can establish identities. Permission to create or disable an external account is a separate capability and configuration decision.

## The profile tells ISC how to populate the person

An **attribute** is a named piece of information. An account attribute describes the source record; an identity attribute describes the ISC identity.

For example, `familyName` on an HR account and `lastname` on an identity are different fields. Their values don't become connected merely because both describe a surname.

An **identity attribute mapping** tells ISC how to obtain an identity attribute's value. A direct mapping selects a source and an account attribute. Mappings can also use supported calculation logic, but this example uses direct values so you can see every input.

The selected HR account data is shown as **JSON**, a text format that pairs field names with values. Each quoted name below is a field, followed by its quoted text value:

```json
{
  "workerKey": "hr-61001",
  "workerNumber": "61001",
  "iscUserName": "worker61001",
  "givenName": "Devi",
  "familyName": "Rao",
  "workEmail": "devi61001@example.com",
  "departmentCode": "LOG"
}
```

This is a selected teaching record, not an API response or an upload template. The field names belong to this fictional HR integration. The organization's approved design supplies `iscUserName` and a usable work email at onboarding; don't assume every HR system has those fields.

The **account schema** describes the fields ISC expects for this source. Its configured **Account ID** identifies a source account. Here, it uses `workerKey`, so `hr-61001` identifies Devi's HR record within PeopleLedger Production.

The Employees profile uses these mappings:

| Identity value | Selected source input | Result for Devi |
|---|---|---|
| User Name, technical name `uid` | PeopleLedger Production: `iscUserName` | `worker61001` |
| Work Email, `email` | PeopleLedger Production: `workEmail` | `devi61001@example.com` |
| Last Name, `lastname` | PeopleLedger Production: `familyName` | `Rao` |
| First Name, `firstname` | PeopleLedger Production: `givenName` | `Devi` |
| Identification Number, `identificationNumber` | PeopleLedger Production: `workerNumber` | `61001` |
| Department, `department` | PeopleLedger Production: `departmentCode` | `LOG` |

User Name, Work Email and Last Name are required identity attributes. Each profile must map them, and their resulting values cannot be null. User Name must also be unique across identities in all identity profiles. Work Email being non-null does not mean ISC has validated that it is a correctly formatted or deliverable email address.

The remaining rows make this example useful; they aren't all universally required for creating every identity. A project can need additional attributes for its own downstream decisions.

Look at the three identifiers. `hr-61001` identifies the HR account. `worker61001` is the mapped ISC User Name. `61001` is the organization's worker number, mapped here to `identificationNumber`. ISC's identity object also has its own platform ID. These references have different jobs, even when a naming convention makes them look related.

Changing an account key isn't an appropriate repair for a missing email. Nor should you change a worker number merely to make a username collision disappear.

## Follow the first successful arrival

Assume the Employees profile and mappings have been saved and appropriately applied. No account aggregation is running during profile creation; ISC does not allow creating an identity profile while an account aggregation is running.

For Devi, there is no existing person identity to match, no conflicting username, and no competing authoritative profile. All required mapped inputs are available. These conditions let us examine a new identity without mixing in a migration or duplicate-person problem.

1. HR makes `hr-61001` available through the integration's approved read interface. The record must be visible to the integration account, meaning the account whose credentials the connector uses, and included in the configured collection scope.
2. Account aggregation collects that record. Its fields are interpreted through the source's configured schema and extraction behavior. A value visible in HR still needs to arrive in the corresponding ISC source account field.
3. The authoritative source and Employees profile participate in establishing Devi's identity. The profile's mappings supply the identity values; required-value and uniqueness requirements still apply.
4. We inspect the resulting identity, its associated HR account, profile and values. In this supplied successful outcome, Devi has one Employees identity with User Name `worker61001` and Identification Number `61001`.

The dependency is pictured below. Every arrow means that the next represented result depends on the preceding input or configuration. It does not specify private services, database transactions or an exact completion time.

```text
HR worker record
hr-61001
       |
       | connector account aggregation
       v
ISC HR source account
PeopleLedger Production
       |
       | authoritative source +
       | Employees identity profile
       | mapped inputs meet requirements
       v
ISC identity for Devi
uid: worker61001
identificationNumber: 61001
       |
       | does not itself prove
       v
DispatchDesk account or access
```

The final arrow marks a boundary, not an automatic creation step. Our supplied outcome confirms the identity and its HR association. It does not claim a DispatchDesk account exists.

**Identity processing** evaluates identity information against configuration, including identity attribute mappings and configured access-related decisions. Changes to identity data during aggregation can initiate this processing. A configured change can therefore lead to further work, but an aggregation result alone is not proof of every downstream outcome.

Likewise, saving changed mappings is not the same evidence as seeing the new values on existing identities. A profile can show **Needs Processing** when changes need applying. Check the actual represented values after the relevant processing, rather than treating a saved configuration as an already-observed result.

## What if the account arrives before all its values?

Suppose the HR account is collected, but `familyName` is missing. Our direct `lastname` mapping then lacks its required input.

ISC documents **identity exceptions** for missing required attributes and duplicate User Names. Identities missing required attributes also appear as **Incomplete Identities** on the Identities page. An incomplete identity is not the same as a fully populated identity, and an exception does not establish that account aggregation failed to read the worker record.

Don't collapse those observations into “Devi isn't in ISC.” Be precise: is her account missing, is the identity incomplete, or does an identity exist with a conflicting username?

Start with the profile's exception report and inspect the relevant source account and mapping. If HR never supplied `familyName`, the correction belongs with the HR data owner. If HR supplied `Rao` but the connector mapped the wrong field, changing the HR surname would repair the wrong layer. If the source account is correct but the profile selects a different attribute, inspect the identity mapping.

After the approved correction, verify collection and the relevant identity processing, then recheck the exception and represented identity values. Repeating a read without changing the defective input or mapping does not resolve the cause.

There is also an onboarding dependency worth catching during design. What if Work Email is mapped only from a directory account, while that account can be created only after the identity is established?

The initial identity then depends on a value that the chosen downstream process has not supplied. A diagram won't make that dependency disappear. Decide an approved way to provide the required initial value and later maintain the intended email. Don't insert fabricated addresses merely to silence exceptions, or assume an account will arrive because a mapping references it.

## Where does an ordinary application account fit?

Now assume DispatchDesk already has account `dd-61001`, created independently by its application administrator. Its account attribute `employeeRef` contains text `61001`.

DispatchDesk Production is a **non-authoritative source**: it is not the profile-backed origin of these employee identities. ISC can still collect and govern its accounts.

**Account correlation** matches and associates a source account with its identity using configured comparisons. For this variation, the only criterion compares DispatchDesk `employeeRef` with identity `identificationNumber`. Devi is the sole eligible matching identity, and no manual association overrides that comparison.

When that account is collected and evaluated for correlation, `61001` matches `61001`. The supplied result is an association between `dd-61001` and the existing Devi identity. It doesn't require a second person identity.

```text
Employees identity already exists
Devi: identificationNumber 61001
                  ^
                  |
      account correlation matches
      employeeRef to identificationNumber
                  |
                  |
Collected DispatchDesk account
Account ID: dd-61001
employeeRef: 61001
```

The upward arrow means ownership association performed by ISC, not a write back to DispatchDesk. Both records already exist in this variation.

If that application account arrives before Devi's identity is available, the required match may not exist. The account can remain **uncorrelated**, meaning not assigned to the intended person. A technical placeholder called a **shadow identity** can represent uncorrelated data; that does not mean the employee has been successfully established through the Employees profile.

Once the person and matching values are available, the account needs suitable correlation evaluation. An optimized full aggregation can skip further processing for unchanged accounts. Don't assume that simply waiting, or repeating that operation, must repair ownership. Re-evaluating unchanged accounts after a correlation configuration change requires the documented unoptimized aggregation approach, which re-examines those accounts. A manual association is a deliberately established ownership link; changing comparison inputs does not automatically move such an account to another identity.

## One person can have more than one authoritative account

An employee can have records in an employee system and a contractor register. That doesn't mean the organization wants two separate people represented in ISC.

Each identity is associated with only one identity profile. Where an identity has accounts on multiple authoritative sources, the highest-priority eligible profile governs that identity. The profile choice determines which mappings apply.

That rule assumes the relevant accounts belong to the same represented identity. A matching-looking name is not proof of that relationship, and changing profile priority is not a general-purpose merge operation for identities that were created separately.

If an existing contractor becomes an employee, investigate existing identities, account ownership and the approved continuity design before introducing the new authoritative population. Check the resulting association and governing profile rather than promising that an identical name, worker number or username will automatically merge every record.

For Devi's initial example, there was no existing identity and only one eligible profile. Keep that assumption in mind when comparing it with a migration.

## What should you inspect on the screen?

Each view answers a different question. Use the record it represents, not just its label.

| Evidence | What it helps establish | What it doesn't establish alone |
|---|---|---|
| PeopleLedger source Accounts entry for `hr-61001` | The collected worker record and its represented account values | A complete identity, correct profile or application access |
| Employees profile and Mappings | The authoritative-source relationship and selected identity-value inputs | That all source records are available or processing has applied every change |
| Profile exception report and Incomplete Identities view | Required-value or username issues needing investigation | That HR has no worker record or the entire read failed |
| Devi's identity Details and associated accounts | Current person-level values, profile and represented account ownership | That the external application accepts a sign-in or grants the expected permission |
| Application operation evidence and target observation | Whether the intended external change occurred | That unrelated identities, accounts or future changes are correct |

**Provisioning** performs supported account or access changes. To create DispatchDesk access from ISC, the design still needs the relevant access decision, supported integration, required account inputs and successful fulfillment. Account creation and permission assignment can also be separate outcomes.

Similarly, **authentication** verifies a sign-in. Creating an ISC identity is not proof that Devi has registered for ISC, can use its configured sign-in method, or can sign in to DispatchDesk. The organization's ISC environment is its **tenant**. Identity representation, tenant sign-in and application access must be checked against their own requirements.

## Try changing one condition

These are independent fictional cases. Use the supplied evidence; don't assume missing results.

### 1. HR has the worker, but the source has no account

**Facts:** HR shows `hr-61001`. The integration's approved view excludes newly hired workers until their start date. Today's read did not return Devi.

**Question:** Would changing the identity's Department mapping make her account arrive?

**Reasoning:** No. That mapping consumes represented account information; it doesn't expand the connector's read scope. Inspect the approved population and timing rule with its owner. Establish whether Devi should be included now before changing the filter. Then verify the intended account was collected.

### 2. The account exists, but Last Name is absent

**Facts:** The source account has no `familyName`. The direct mapping selects that attribute for `lastname`, and the profile reports a missing required Last Name.

**Question:** Does the source account entry prove successful, complete identity onboarding?

**Reasoning:** No. It proves the account was represented. The exception identifies a separate required-value problem. Have the owning team correct the missing source value, collect the corrected information through the appropriate process, and verify the identity's Last Name and exception outcome.

### 3. Two distinct workers receive the same User Name

**Facts:** Their HR account keys are different. Their worker numbers are different. Both map `uid` to `worker61001`, and an identity exception reports a duplicate User Name.

**Question:** Should you combine them because the usernames match?

**Reasoning:** No. The supplied facts describe different people with a naming collision. Distinct account keys don't remove the cross-profile username uniqueness requirement. Correct the approved username generation or input; do not merge people or change valid account keys merely to remove an exception.

### 4. The application account has no person match

**Facts:** DispatchDesk account `dd-61001` has been collected. There is no eligible identity with Identification Number `61001`. This source is non-authoritative.

**Question:** Does reading the account establish a new employee identity through the Employees profile?

**Reasoning:** No. The intended person match is unavailable. Investigate why the authoritative person and required matching values are missing. An uncorrelated account or shadow representation is not proof of successful employee onboarding. Don't change the application's authority just to hide that symptom.

### 5. Two profiles are eligible

**Facts:** One existing identity is correctly associated with employee and contractor authoritative accounts. The Employees profile has higher priority; its Department mapping selects PeopleLedger. The contractor account has a different department.

**Question:** Should the two departments automatically be combined?

**Reasoning:** No. The highest-priority eligible profile governs the identity, and its mapping selects the Department input. Profile priority is not a field-by-field vote. Verify the governing profile and mapping before concluding the contractor value was lost incorrectly.

### 6. The identity exists, but the application account doesn't

**Facts:** Devi has a complete Employees identity. No DispatchDesk account exists, and no access assignment or provisioning result has been supplied.

**Question:** Can you conclude that aggregation failed?

**Reasoning:** No. Identity establishment succeeded in the supplied facts. Investigate the intended access decision and fulfillment path separately. You don't yet know whether provisioning was requested, supported, attempted or successful.

### 7. Work Email is populated with an unsuitable value

**Facts:** The source supplies `not-an-email` and the Work Email mapping copies it. The value is non-null.

**Question:** Does the absence of a missing-email exception prove a usable mailbox?

**Reasoning:** No. ISC's required Work Email check does not validate email format. Validate the organization's data requirement at its owning boundary and verify the real address or mailbox where needed. A populated string is not evidence of mail delivery.

## Use the same reasoning on a contractor feed

A contractor register supplies account `ctr-C804`, person reference `C804`, username `contractorC804`, surname `Sen`, and a non-null approved work email. There is no existing identity for this person. The Contractors profile is configured for that authoritative source, its required mappings are valid and appropriately applied, and the account has been collected successfully. No other profile is eligible.

A project manager says, “The contractor is visible in ISC, so the project application's account and access must be ready.”

Explain the missing evidence. Name the objects you would inspect, and describe how your investigation changes if the contractor account is collected but the mapped surname is null.

A sound explanation separates the authoritative account, the resulting identity and any application account. Verify the contractor identity's profile, required values and authoritative association. Application readiness needs its own access-decision and fulfillment evidence, followed by confirmation of the required target state. Nothing in the supplied identity-creation facts proves those outcomes.

With a null mapped surname, investigate the required Last Name exception or incomplete identity and trace it back through the profile mapping and source account. Don't start by repairing application access when the person information itself isn't complete.

When someone asks why an identity exists, you should be able to point to its authoritative account and governing profile. When they ask why it contains a value, point to the mapping and actual input. When they ask what access works, follow the separate path to the application. Those questions are connected, but they don't have the same evidence.

