# What does an identity profile actually control?

Devi, employee number `62002`, is a benefits coordinator in Human Resources. Her worker record says `HR`, but her identity in SailPoint Identity Security Cloud (ISC) shows Department `FIN`.

Both her worker record and her directory account have already been collected and correctly associated with her identity. The directory account still says `FIN`. Her identity uses the **Employees** identity profile.

The support team asks, “Should we change the Employees profile? And would that also fix her sign-in and give her the BenefitsDesk access she needs?”

Let's separate those questions. A profile can influence identity values, tenant sign-in settings and lifecycle-driven access, but each responsibility has its own inputs and conditions.

## The profile is shared configuration, not Devi's personal record

An **identity** is ISC's representation of a person or another managed entity. Here, it represents Devi. An **account** is a record in a particular system, such as her directory login or HR worker record.

A **source** is ISC's configured representation of a system or collection of account data. Its **connector** supplies the supported integration behavior, such as reading accounts or performing account changes. **Aggregation** collects account or access information into ISC.

An **identity profile** is configuration applied to identities associated with an authoritative source. An **authoritative source** supplies the accounts from which ISC establishes those identities through the profile. In this fictional design, **PeopleCore Production** supplies worker accounts, and Employees is its identity profile.

Employees is not a separate profile created for each employee. Devi and other identities governed by it share its configuration. A change made while investigating her can therefore affect a population, not just the person whose incident brought you to the screen.

**Account correlation** matches and associates source accounts with their intended identities. Devi's worker account `hr-62002` and directory account `cd-62002` are already correctly associated in our example. We aren't trying to repair ownership.

Each identity has one governing identity profile. If the identity has accounts on more than one authoritative source, the highest-priority eligible profile applies. That rule concerns accounts already associated with the identity; priority is not an instruction to merge separately created people.

The first check is therefore, “Which profile actually governs this identity?” A profile named Employees doesn't control someone merely because their job title sounds like an employee's.

## It chooses how identity values are populated

An **attribute** is a named value. An account attribute belongs to the collected source account. An identity attribute belongs to the ISC identity.

An **identity attribute mapping** specifies how an identity attribute gets its value. A direct mapping selects a source and an account attribute. A mapping can also use a **transform**, which calculates or converts a value using configured operations, or supported **rule** logic for a requirement that needs code.

For Devi, these are selected fictional inputs and mappings. They aren't a complete account record or an upload template.

| Identity attribute | Current selected input | Devi's current result |
|---|---|---|
| Identification Number, `identificationNumber` | PeopleCore Production, `workerNumber` = `62002` | `62002` |
| User Name, `uid` | PeopleCore Production, `iscUserName` = `employee62002` | `employee62002` |
| Work Email, `email` | Corporate Directory, `mail` = `devi62002@example.com` | `devi62002@example.com` |
| Last Name, `lastname` | PeopleCore Production, `familyName` = `Rao` | `Rao` |
| Department, `department` | Corporate Directory, `department` = `FIN` | `FIN` |
| Lifecycle State, `cloudLifecycleState` | PeopleCore Production, `workerState` = `active` | `active` |

PeopleCore's `workDepartment` contains `HR`, but the current Department mapping doesn't select it. That explains why the identity shows `FIN` even though the worker source is authoritative.

Authority establishes the population. It doesn't mean every attribute from that source overrides every other input.

The Work Email row also shows why a non-authoritative source can still matter. Corporate Directory is not the origin of these employee identities, but it supplies their email values. A profile can map identity attributes from accounts on different sources.

User Name, Work Email and Last Name must be mapped and non-null. User Name must be unique across identities from all profiles. Missing required values or duplicate usernames can produce **identity exceptions**, which report problems with identity information. A profile's existence doesn't remove these requirements.

The mapping belongs to the profile, but the identity attribute's definition is shared across the tenant, meaning the organization's ISC environment. If you add a custom identity attribute while editing Employees, it also appears in other profiles. Those profiles don't all have to map it.

Deleting a custom identity attribute is likewise a tenant-wide definition change, not just clearing one profile's value. Review its consumers before deletion. Don't delete a shared attribute to repair a single mapping, and don't delete default attributes.

Manager information has another dependency. A profile can map the Manager Name input, but establishing the reporting relationship also needs **manager correlation**, which matches the supplied manager reference to a manager's identity under configuration on the source. A populated manager-looking string alone isn't proof that ISC has established the intended manager relationship.

## A mapping change is not a write back to the source

Suppose the organization confirms that PeopleCore's `workDepartment` is the approved input for identity Department. An authorized change replaces the Department mapping's input with that field.

For Devi, the proposed result changes from `FIN` to `HR`. The directory account does not automatically change just because the identity mapping changes.

**Attribute synchronization** is separately configured behavior that sends selected identity values to source account attributes through supported provisioning. Without an applicable synchronization configuration and a successful write, you cannot conclude that the directory's Department has changed.

**Provisioning** carries out supported account or access changes. Reading an input, calculating a person-level value and writing that value to another account are different operations.

That distinction matters when someone says “fix the department everywhere.” First decide which records should change, who owns each value and which approved process will maintain it. One mapping edit is not evidence of all those outcomes.

## It also participates in how people sign in to ISC

**Authentication** verifies a sign-in. Signing in to ISC is different from ISC representing a person's accounts or granting application permissions.

Identity profiles contain sign-in and security settings for their populations. The actual sign-in path also depends on the tenant's wider authentication configuration.

For a tenant using its own username-and-password registration, the invitation and registration process matters. A complete identity does not itself prove that the person has received an invitation or completed registration.

A profile can instead use **Directory Connection**, also called **pass-through authentication**. That means ISC uses a supported authentication source to verify the person's network password. The authentication source must support this operation, and the source and relevant accounts must have been aggregated before it is configured.

In our example, Corporate Directory is the configured, supported authentication source for Employees. Devi has the correct associated directory account. This does not make Corporate Directory the employee population's authoritative source. It has a different responsibility.

Nor does selecting it copy the network password into an identity attribute. Department and Work Email mappings aren't password-verification instructions.

**Single sign-on (SSO)** is another sign-in arrangement in which an external identity provider authenticates the user. An **identity provider** is the service that verifies that sign-in and supplies the authentication result. When SSO is configured, investigate that actual path rather than assuming a profile's local-password settings explain every sign-in.

Other profile settings include **multifactor authentication (MFA)**, which requires more than one authentication factor, password-reset and unlock verification methods, and network or geographic restrictions. These are security requirements, not account-creation rules. Administrator MFA requirements still apply even if the profile's MFA checkbox is disabled.

Take the **Off Network** restriction. It relies on the tenant's configured network definition. Enabling it without a network definition blocks all users associated with the profile from accessing ISC. Don't interpret a population-wide sign-in failure after a security change as proof that their HR records disappeared.

Profile settings are not the whole security model, and changing them is not a troubleshooting shortcut. In particular, changing a production pass-through authentication source can prevent users from authenticating; SailPoint directs organizations to consult Support before that change.

## Where lifecycle-driven access enters the picture

A **lifecycle state**, or **LCS**, describes a person's business stage, such as pre-hire, active employment or termination. It can drive configured access changes.

The identity profile defines the lifecycle states available to its population and their configured behavior. It also supplies the mapping for the Lifecycle State identity attribute, `cloudLifecycleState`, used for automatic assignment.

With the provisioning service enabled, the profile can also configure automatic registration invitations when people enter a specified enabled lifecycle state. That is an invitation rule, not proof that the email was delivered or the user completed registration.

Those are two connected pieces: a value that selects the state, and the state's configuration that describes what should happen.

For Employees, suppose a lifecycle state with technical name `active` is enabled. The direct mapping in the table supplies `active` from PeopleCore's `workerState`. The value must match the state's technical name exactly, including letter case. `Active` and `active` are not interchangeable for this match.

Creating a lifecycle state doesn't enable it automatically. A correctly named field and a disabled state are not a completed lifecycle setup.

An **entitlement** is an assignable access right, such as an application's group membership. An **access profile** groups entitlements from one source into a named access bundle.

Suppose **Benefits Self-Service** is an access profile containing entitlement `benefits-selfservice` on **BenefitsDesk Production**. It gives employees access to their own benefits information, not benefits-administration permissions.

The Employees profile's enabled active lifecycle state is configured to grant Benefits Self-Service. This is how the identity profile connects a person's stage to an access bundle. The identity profile and the access profile are still different objects.

The lifecycle state can also configure account actions on selected sources, access-removal behavior and notifications. An **identity state** is a separate ISC processing and service-participation classification, such as Active or Inactive (long-term), selected in lifecycle configuration. It isn't the same thing as an application's enabled/disabled account flag.

Don't assume a state named Terminated disables every account, or that an identity classified Active proves every application account is enabled. Inspect the actual configured actions and their results.

## Trace one lifecycle-driven assignment to the application

For this independent fictional variation, Devi already has one correctly associated BenefitsDesk account, `bd-62002`. It doesn't yet have `benefits-selfservice`.

Assume provisioning is enabled for the organization, the relevant lifecycle configuration has been saved and applied, and Devi is automatically assigned to the enabled `active` state. BenefitsDesk's integration supports the required entitlement change, its credentials have permission, and the existing account is the unambiguous intended account. No competing assignment or removal is present.

**Identity processing** evaluates identity information and access requirements against configuration. It can be triggered by identity changes during aggregation or initiated to apply configuration changes.

In this variation, processing evaluates the mapped state and its configured access. Provisioning performs the supported change. We then check the operation evidence and target account to establish whether the intended membership exists.

```text
PeopleCore workerState: active
              |
              | Employees profile mapping
              v
Lifecycle State value: active
              |
              | matches enabled state
              v
Active state's configured access
Benefits Self-Service access profile
              |
              | identity processing
              | evaluates required access
              v
Supported provisioning operation
BenefitsDesk account bd-62002
              |
              | verify operation and target
              v
Does benefits-selfservice exist?
```

The arrows show dependencies between input, configured decisions and an external result. They don't promise private execution stages, a fixed duration or successful delivery. The final check is human verification, not another automatic grant.

In the supplied successful outcome, the provisioning evidence reports success and the application account is confirmed to have `benefits-selfservice`. Those observations support this access change. They don't prove Devi can pass every application sign-in requirement or use unrelated benefits-administration functions.

If the operation fails, a correct state value does not repair connector permissions. Identity processing does not validate that access was successfully provisioned after initiating provisioning.

Lifecycle account actions, such as enable or disable, are also not a permanent monitoring loop that continually repairs account state. Error handling has its own supported behavior; don't promise that a state label guarantees endless retries until every target agrees.

Access profiles assigned by the current lifecycle state are enforced while the identity remains in that state. When someone leaves a state, access profiles granted by it are revoked unless the new state also assigns them. Other assignment paths and configured removal behavior still need examination before predicting all effective access.

## Keep the profile's branches separate

By now we have followed different responsibilities attached to Employees:

```text
Employees identity profile
  |
  +-- Authoritative source
  |   PeopleCore employee population
  |
  +-- Identity attribute mappings
  |   Department input and other values
  |
  +-- ISC sign-in/security settings
  |   Supported authentication path
  |
  +-- Lifecycle configuration
      State mapping and enabled states
      Access requirements and actions
```

This is a responsibility map, not an execution sequence. ISC uses the relevant settings in their applicable processes. A Department correction doesn't itself send a registration invitation, change an authentication source or grant every access bundle.

An **access request** asks ISC to arrange specified access for an identity. It follows the applicable request policy and fulfillment path. It isn't an identity profile.

A **role** represents an access package or business responsibility and can assign access according to configured membership criteria. The profile can supply values those criteria consume, but a profile is not itself a role.

For example, a role could use identity Department `HR` as a membership condition. Correcting the profile's mapping can therefore affect role evaluation even when no role definition is edited. That dependency is a reason to review the change's impact, not a reason to assume every department change must assign a particular role.

## Saving, previewing and applying answer different questions

Let's return to Devi's Department correction. The only intended edit is to select PeopleCore `workDepartment` for identity Department.

First, inspect who else uses Employees and which downstream decisions consume Department. The same mapping is shared across that population. Check representative records where the new input is present, absent or different from the old one.

**Preview** evaluates identity mappings against a selected identity's data so you can inspect the proposed values. A preview showing `HR` for Devi does not prove that every employee has a valid value. It also isn't evidence that directory attributes or application permissions have changed.

After saving a mapping change, the profile can show **Needs Processing**. **Apply Changes** initiates identity processing for identities associated with that profile. It is not a harmless screen refresh: processing can reevaluate access requirements as well as update mapped values.

In our supplied corrected outcome, the approved change is applied and Devi's identity Department is verified as `HR`. Her identity still uses Employees, and her existing source account associations are unchanged. Corporate Directory still contains `FIN`; no synchronization write is configured in this example.

That result answers the reported identity-value problem. It doesn't establish a sign-in repair, directory update or BenefitsDesk access change.

Use each observation for the question it can actually answer:

| Observation | What it establishes | What still needs checking |
|---|---|---|
| Identity shows Employees | Which profile governs this identity | Whether each relevant setting and mapping is correct |
| Saved Department mapping selects PeopleCore | Intended input configuration | Preview results, applied processing and represented identity value |
| Preview shows `HR` | Proposed result for that selected identity and current data | Other population cases and actual post-processing values |
| Identity Department becomes `HR` | The represented person-level value changed | Any required account synchronization or access changes |
| Lifecycle State shows `active` | The represented state assignment | Enabled-state configuration, applicable access and provisioning results |
| BenefitsDesk account has the entitlement | The observed target membership | Separate authentication, authorization and other account requirements |

**Authorization** is the application's decision about what the signed-in account may do. Observing a membership, authenticating and successfully performing an allowed action are related evidence, not interchangeable observations.

Don't delete and recreate a profile to clear a stale value. Deleting it makes its source non-authoritative and can delete identities unless they can be reassigned to other profiles. It does not itself delete or deprovision external source accounts. A population-defining configuration change is far larger than the Department repair.

## Work through these support questions

Consider these fictional support cases.

### 1. HR changed, but the identity still follows the directory

**Facts:** PeopleCore `workDepartment` is `HR`. Corporate Directory `department` is `FIN`. Employees still maps identity Department from the directory.

**Question:** Is another HR aggregation sufficient evidence that Department will become `HR`?

**Reasoning:** No. The selected mapping still consumes `FIN`. Confirm the approved field owner and mapping. A new read of a different, unselected field doesn't change that selection.

### 2. The preview looks right

**Facts:** The new mapping's preview shows `HR` for Devi. Employees still shows Needs Processing, and the stored identity value has not been checked.

**Question:** Can you close the incident as fixed?

**Reasoning:** No. Preview establishes a proposed result, not completed application of the change. Review population impact, apply the approved change through identity processing, and check the represented identity value and any relevant downstream results.

### 3. The state value differs by one capital letter

**Facts:** The enabled lifecycle state's technical name is `active`. The mapped value is `Active`; an administrator hasn't manually chosen a different lifecycle state.

**Question:** Is that an exact state match?

**Reasoning:** No. This comparison is case-sensitive. Inspect the mapping and approved normalization, meaning conversion into the required representation. Verify the corrected value and state assignment rather than merely renaming the display label.

### 4. The right bundle is in the wrong profile

**Facts:** Contractors governs an identity. Benefits Self-Service is configured only on Employees' active lifecycle state. No other assignment path is supplied.

**Question:** Does an active contractor inherit it because both states are called Active?

**Reasoning:** No. Lifecycle configuration is defined per profile. Inspect the governing profile and its enabled state. The same display label does not copy another profile's access requirements.

### 5. The target rejects the change

**Facts:** Devi is correctly assigned to active. The configured access requires `benefits-selfservice`, but the provisioning result reports insufficient target permissions.

**Question:** Should you repair the Lifecycle State mapping first?

**Reasoning:** The supplied evidence points to the execution boundary, not an incorrect state. Investigate the integration's approved permissions and supported operation. After authorized correction and appropriate recovery, verify the result and target membership. Don't broaden permissions or repeat changes without understanding the failure.

### 6. Everyone in Employees suddenly cannot sign in

**Facts:** Off Network was enabled for Employees, but no tenant network definition was configured. Worker accounts and identities remain present.

**Question:** Should the team recreate those identities?

**Reasoning:** No. The documented restriction can block the profile's users from ISC access under these conditions. Investigate the security configuration through the approved security-change process. Do not infer identity deletion or change credentials from this sign-in symptom.

### 7. A custom field seems unused in Employees

**Facts:** A custom identity attribute is unmapped in Employees but used by a Contractors mapping and a role condition.

**Question:** Is deleting it from the Employees editing screen local cleanup?

**Reasoning:** No. Its definition is tenant-wide. Deletion affects other profiles and consumers. Review dependencies and the approved requirement instead of treating one profile's empty mapping as proof the attribute is unused everywhere.

## Explain a profile change before approving it

A project proposes moving Work Email for a contractor population from a register's `emailAddress` to a directory account's `mail`. Some contractors don't yet have directory accounts. The profile's local-registration invitations use Work Email, and email is a required identity attribute. No fallback input or complete directory-coverage evidence is supplied.

The proposal says, “It's only one mapping. Preview one person and apply it.”

What would you need to know before agreeing?

A sound review starts with the affected population, existing account associations and availability of `mail` for every required case. One successful preview doesn't cover contractors without directory accounts. Trace the proposed email value for those people and check required-value exceptions, invitation dependencies and any other consumers.

Also establish how the directory account becomes available. Don't assume a downstream account will supply the very value needed earlier in onboarding. The field's owner, initial-value design and approved correction path must be clear.

Review representative cases and expected effects before applying the change. Then verify actual identity values and the applicable downstream outcomes. If the supplied evidence can't establish complete coverage, say what is missing; don't replace that uncertainty with a successful sample.

A profile change is ready to reason about when you can say which identities it governs, which input or setting changes, which processes consume that change and what observations will prove the intended result. “The profile was saved” answers only one part of that explanation.
