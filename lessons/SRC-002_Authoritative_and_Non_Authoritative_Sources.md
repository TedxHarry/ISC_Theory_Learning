# Authoritative for what: the person, a value, a login, or a change?

Devi, employee number `42002`, has moved from contract work into a permanent finance role. Her employee record says Finance, but SailPoint Identity Security Cloud (ISC) still shows Vendor Services as her department.

Both records have been collected. The employee record is on an authoritative source. So why hasn't its department simply won?

“Authoritative” doesn't mean every value from that system overrides every other value. We need to distinguish the source that establishes an identity, the identity profile that applies, and the mappings that produce its attributes.

That distinction also prevents a different mistake: making every application authoritative just because its account data is useful.

## First separate a person from the accounts representing them

An **identity** is ISC's representation of a person or another entity, connecting relevant information, accounts, and access.

An **account** is a record in a particular system. The source account record in ISC represents that external account; it isn't a second person.

A **source** is ISC's configured representation of a system or collection of account data. Its **connector** supplies supported integration behavior, such as reading accounts or changing access.

**Aggregation** collects account or entitlement information into ISC. An **entitlement** is an assignable access right, such as an application permission or group membership.

Reading an application account answers “what account and access information does this source provide?” It doesn't, by itself, answer “should this account establish a new personnel identity?”

One person can have employee, contractor, directory and business-application records. Their source roles and ownership relationships determine how ISC uses them.

## An authoritative source establishes identities through its profile

An **authoritative source** provides the accounts used to establish identities through an **identity profile**.

The identity profile is configuration for those identities. It connects the source to identity establishment and defines how their attributes, sign-in settings and identity-state behavior are managed.

An **attribute** is a named value. An account attribute belongs to a source account, such as an employee record's department. An **identity attribute** belongs to the ISC identity, such as its represented department.

A **mapping** specifies how an identity attribute obtains its value. It can select an account attribute from a source or use supported calculation logic.

Marking a source authoritative isn't the whole setup. The source also needs its identity profile and appropriate mappings. Without that configuration, the checkbox alone isn't a completed identity-onboarding design.

For a new employee, the personnel system first holds an account record. Aggregation brings that record into ISC. The authoritative-source/profile arrangement lets ISC establish the represented identity, using mapped values that must satisfy the identity requirements. Additional application accounts can then be associated with that identity through correlation.

These are dependencies, not a fixed schedule: an application account collected before its owner can be matched may remain uncorrelated. A successful account read doesn't prove that identity establishment or matching has succeeded.

The relationship is:

```text
[Authoritative account + identity profile]
                    |
     identity establishment and mappings
                    |
                    v
[ISC person identity]
                    ^
     ownership association where matched
                    |
[Additional collected application accounts]
```

The upper relationship establishes a profile-backed identity from the relevant authoritative arrangement. The lower relationship links other accounts to their owner. These aren't interchangeable purposes.

The arrows describe relationships, not a private execution sequence or a promise that every input produces a valid identity or every account matches.

**Account correlation** matches and associates a source account with the appropriate ISC identity under configured rules. It doesn't make an ordinary application's account inventory the origin of new employee identities.

A **non-authoritative source** isn't designated as that profile-backed identity origin. Its collected accounts can be associated with identities established through the organization's authoritative arrangements.

If an additional account cannot be matched, it can remain **uncorrelated**. ISC can use a placeholder, or **shadow identity**, to represent uncorrelated accounts. That isn't equivalent to successfully onboarding a new person through an authoritative identity profile.

So avoid the absolute claim that no internal identity representation can exist for non-authoritative data. The useful distinction is whether the source establishes the intended profile-backed person identity.

## The system's name doesn't choose its responsibility

A Human Resources (HR) system is a common authoritative source because it records employment relationships. A contractor register can establish a different population.

But a directory can also be authoritative when that is the organization's deliberate design. The choice isn't restricted to products with “HR” in their name.

Likewise, a finance application isn't automatically authoritative simply because finance owns valuable business data.

Ask what its accounts represent. Are they the records from which the organization intends to establish people in ISC, or additional accounts belonging to people represented elsewhere?

Source authority isn't a security score. Calling a source non-authoritative doesn't mean its data is untrusted, its owner is unimportant, or its accounts are outside governance.

Nor is it a connector capability level. A file-fed personnel source can establish identities through a configured profile without automatically changing external accounts. A non-authoritative application source can support configured provisioning.

**Provisioning** carries out supported account or access changes. That operation's support and authority remain separate from identity establishment.

## Give Devi's records their separate roles

For this fictional setup, the relevant records are:

| Source | Devi's account | Responsibility in this design |
|---|---|---|
| Workforce HR | `emp-42002` | Authoritative source associated with the Employees identity profile |
| Contractor Registry | `ctr-42002` | Authoritative source associated with the Contractors identity profile |
| Corporate Directory | `corp-42002` | Non-authoritative account source, corporate email input, and configured directory-based authentication source |
| ExpenseDesk | `expense-42002` | Non-authoritative application account and access information |

Assume all four records concern the same person, have been collected, and are correctly associated with one ISC identity, represented here by fictional ID `I-42`.

The two authoritative accounts are already associated with that same identity in this example. We aren't assuming that matching names automatically joined them.

The external account identifiers are different. A shared person reference, employee number `42002`, can support an approved matching design; it isn't a universal account identifier for all four systems.

The contractor record is still present during the transition. Its department says Vendor Services. The employee record's department says Finance.

The business intent is for the employee arrangement to apply while the two records overlap. That intent must be reflected in profile configuration, not inferred from whichever source was read most recently.

## An identity has one applicable identity profile

ISC associates an identity with one identity profile at a time.

Where the same identity has accounts on multiple authoritative sources, the documented rule selects the highest-priority identity profile among those whose authoritative sources contain its accounts.

That last condition matters. A high-priority profile isn't applicable to every person just because it exists.

A **profile priority** is the ordering used for this selection. Lower numerical priority values have higher precedence. It isn't an ISC administrator privilege or a measure of the source's data quality.

Profiles are prioritized by creation order by default: earlier-created profiles have higher priority. A default order isn't automatically the organization's intended employee-versus-contractor policy.

Suppose the project created Contractors first. The supplied configuration is:

| Profile | Initial priority | Priority after an approved correction |
|---|---|---|
| Contractors | 10, higher precedence | 20, lower precedence |
| Employees | 20, lower precedence | 10, higher precedence |

The values are this example's configuration, not mandatory values for every tenant.

With both authoritative accounts associated with `I-42`, the initial order selects Contractors. Merely loading the newer HR record doesn't make Employees the applicable profile.

That explains why we inspect profile association and priority before changing the correct Finance value in HR.

Priority doesn't merge two identities. If the accounts were incorrectly attached to two separate identities, those identity relationships would need investigation first.

## Now follow the department value

In the supplied configuration:

- Contractors maps identity department from Contractor Registry's department.
- Employees maps identity department from Workforce HR's department.
- Both profiles map identity email from the appropriate Corporate Directory account's mail value.

Assume one intended directory account is available, its association is correct, and the supported mappings are valid. We aren't introducing a multiple-directory-account selection problem.

While Contractors applies, its department mapping produces Vendor Services for `I-42`. HR can simultaneously hold Finance on `emp-42002`.

Those facts don't contradict each other. One is a value on the HR account; the other is the value produced on the identity by the currently applicable mapping.

A later aggregation isn't a general “last source wins” operation. It collects data; identity values follow their configured mappings and applicable processing.

**Identity processing** evaluates the identity against relevant configuration, including its attribute mappings and applicable access logic.

A **lifecycle state** is a configured identity state used in identity-management and access behavior, such as an organization's active or leaving arrangements. A **role** bundles access for a business purpose and can use assignment conditions. Changes in identity data can affect that configured logic.

Therefore, correcting profile priority isn't just making a department label look nicer. It can change applicable mappings, sign-in or lifecycle settings, and resulting access decisions for affected identities.

It needs impact assessment, approved configuration, appropriate processing and verification.

## Correct the profile choice without rewriting the right source data

Assume the responsible owners approve the Employees-first priority order after assessing the affected overlapping population.

The source accounts, their ownership associations and their values remain unchanged. The project uses the supported configuration and processing path.

The supplied verification now shows `I-42` associated with Employees. Its department evaluates to Finance from HR. Its email remains `devi42002@corp.example` from Corporate Directory.

This is the same identity in the supplied result, not a newly created replacement employee. Don't generalize the example into a promise that every population migration preserves every relationship without preparation.

The meaningful checks are connected: correct account associations, intended profile priority, observed profile association, correct mapping inputs and processed identity values.

If the identity value still shows Vendor Services, investigate which configuration and processing evidence applies. Don't immediately edit HR to duplicate a stale identity value or run an unrelated application change.

## A non-authoritative source can supply an identity attribute

Being the identity's authoritative origin doesn't mean a source must provide every attribute.

The applicable identity profile can map an identity attribute from a different source using supported configuration.

After the correction, Employees obtains department from HR and email from Corporate Directory:

```text
[Employees profile mappings for I-42]
                  |
        +---------+----------+
        |                    |
        v                    v
   [department]           [email]
        |                    |
        v                    v
 [HR: Finance]    [Directory: corporate mail]
```

The branches show two configured attribute inputs. They aren't competing profile selections or a priority rule that chooses the newest non-null value across every connected source.

Corporate Directory doesn't need to become authoritative merely to supply the configured email value.

A **transform** calculates or formats a value under supported logic. A mapping can use one where a direct account value isn't enough. A **fallback** is an explicitly designed alternative when a preferred input cannot be used.

Don't confuse such value logic with profile priority. A lower-priority profile isn't automatically a fallback value provider for every null attribute on the selected profile.

If a mapping needs fallback behavior, establish the supported logic, its inputs and conditions. Don't assume that another source's useful value is considered without configuration.

Manager relationships also have their own mechanism. **Manager correlation** links an identity to its manager's identity under configured matching rules. Don't extend this department/email example into an undocumented universal rule for every identity relationship.

## Missing required values are a data or mapping problem

ISC requires the identity attributes User Name (`uid`), Work Email (`email`) and Last Name (`lastname`) to be mapped and populated. User Name must be unique across identities, not merely unique within one source or profile.

An **identity exception** reports a problem such as missing required identity-attribute values or a duplicate User Name.

A successful collection can therefore coexist with an identity that isn't complete. Reading a record and establishing valid identity values are different outcomes.

Suppose the Employees email mapping expects directory mail, but that input is unavailable. The fact that Contractor Registry contains an alternative address doesn't establish automatic fallback to it.

Inspect the actual mapped input, account association and configured calculation. Resolve the responsible data or design issue using the supported process.

Don't invent an email value merely to suppress an exception. The documented required-value check needs a non-null Work Email; it doesn't validate email format. Passing that check isn't proof that the address is correct, deliverable or appropriate for sign-in and notifications.

An **account schema** defines the represented fields on account records. A field existing in the schema doesn't prove that the current account has a usable value. Inspect the record, not just the field definition.

## The authentication source answers a different question

**Authentication** establishes the accepted user or credential context. An **authentication source** is the supported source selected for checking user credentials in ISC's Directory Connection arrangement, also called **pass-through authentication**, or PTA.

In this example, Corporate Directory has that configured role. Assume the supported authentication connection and relevant directory account are correctly configured.

Workforce HR can establish the identity while Corporate Directory checks its directory-based sign-in proof. HR doesn't become the place where Devi's password is checked merely because Employees is the applicable identity profile.

Likewise, making a source authoritative doesn't copy its users' passwords into ISC or configure single sign-on for every application.

**Single sign-on**, or SSO, is a configured authentication arrangement shared by participating services. Its trust and operation are separate from an authoritative source's identity-establishment role. We aren't adding SSO to the example's directory-based sign-in path.

Profile settings can influence sign-in configuration. That's a reason to review a profile change, not a reason to treat all forms of authority as one setting.

## Source authority doesn't grant target write privileges

A connector still needs a supported operation, correct destination, applicable configuration and target permissions to change an external account.

**Authorization** determines what the accepted caller may do. The connector's external integration credential and a user's employee identity have different responsibilities.

A **read-only source** collects supported data without configured automatic target changes. Marking that source authoritative isn't a substitute for a write-capable connector, provisioning configuration or approved target authority.

Conversely, an application can remain non-authoritative while supporting account creation, permission updates or other configured operations.

An **access profile** bundles entitlements from one source. Despite the similar names, it isn't an identity profile: one groups access, while the other configures identities and their mapped values. Access may be assigned through configured roles, lifecycle behavior or requests. None of those relationships says that every authoritative account automatically receives every application permission.

Identity processing can initiate applicable provisioning work. It doesn't itself validate that every downstream change succeeded.

A correct profile and a calculated Finance department establish identity-side results. Delivery activity and the intended target account need their own evidence.

## Presence, status and removal aren't the same condition

The priority rule concerns the identity's authoritative-account relationships. An employment-status value changing on an account isn't the same event as that account being removed from ISC.

Suppose `emp-42002` remains associated with `I-42` while its employment status changes. Don't assume that its status alone makes Contractors the applicable profile. Inspect the configured state/processing behavior and the actual profile association.

Likewise, a temporary source outage doesn't, by itself, prove that an authoritative account was deleted or that ISC should switch profiles.

Under the documented full-aggregation and account-deletion conditions, removal of an authoritative account can cause the identity to be reassessed. If it has an account on another authoritative source, it can be reassigned to the appropriate remaining profile and its values recalculated.

If no authoritative account remains, identity deletion or hidden-identity handling has additional conditions and dependency checks. It's not a universal immediate removal of every external account.

**Deprovisioning** removes or reduces external access through applicable account-changing behavior. A profile association change, deletion of an identity profile, or disappearance from one personnel feed isn't proof that every external permission or session ended.

Do not delete a profile to investigate the department mismatch. The documented deletion behavior can change source authority, remove identities unless reassignment is possible, and leave source accounts uncorrelated. It doesn't automatically delete the source's accounts or deprovision them externally.

Those consequences require a planned change, not a shortcut for selecting the intended profile.

## Use the screens as evidence of specific records

The **user interface**, or UI, displays configuration and represented state.

The identity-profile view can show profiles, priority, exceptions and processing status. Profile mapping previews can help evaluate selected identity values using available data.

A preview is evidence of that evaluation, not proof that all affected identities have been processed or their external access changed.

An identity profile marked Needs Processing indicates that relevant configuration changes still need to be applied through the supported processing path. Saving a mapping isn't sufficient evidence of every downstream outcome.

When investigating Devi, inspect the collected authoritative accounts and their associations, `I-42`'s actual profile, the relevant priorities, the mapping configuration and its input values, then the processed identity result.

If access was expected to change, continue into its delivery evidence. If sign-in failed, inspect its actual authentication path. The same employee name doesn't turn those into the same investigation.

## Work through these situations

Treat each case as a separate variation.

### 1. HR contains Finance, but Contractors still applies

Both authoritative accounts are correctly associated with `I-42`. Contractors has priority 10, Employees 20. Contractors maps department from Contractor Registry, where the value is Vendor Services.

Should another HR aggregation force Finance onto the identity merely because HR is authoritative?

**Worked reasoning:** No. The supplied profile choice and mapping explain Vendor Services. Check the intended profile order and approved processing impact rather than assuming newest input wins. Correct HR data doesn't need to be rewritten to match the identity's current value.

### 2. The directory supplies email but isn't authoritative

Employees maps email from the correct Corporate Directory account. The supported mapping produces `devi42002@corp.example`.

Must Corporate Directory become authoritative to make that mapping legitimate?

**Worked reasoning:** No. Identity establishment and selected attribute sourcing are different responsibilities. The profile can use that supported directory input without making directory accounts the origin of employee identities.

### 3. An authoritative record has no usable required email input

The relevant collection succeeds, but the configured identity email mapping produces no value and an identity exception reports missing email. A lower-priority source has a different address.

Can the team assume that source priority will automatically supply the alternative email?

**Worked reasoning:** No. Inspect the selected profile's actual mapping and any explicit fallback logic. The supplied exception establishes that a required value is unresolved. Correct the responsible data or supported mapping; don't equate collection success with a complete identity or invent automatic cross-profile fallback.

### 4. Two authoritative accounts belong to two different identities

An employee record and contractor record for the same confirmed person were incorrectly associated with separate identities. The team proposes changing priority to merge them.

Will priority alone resolve that identity relationship?

**Worked reasoning:** No. Priority selects the applicable profile among authoritative accounts already associated with an identity. It isn't a general identity-merging mechanism. Investigate identifiers, account associations and the supported duplicate-identity correction process before changing population-wide ordering.

### 5. HR is authoritative, but directory sign-in fails

Employees is correctly associated and its mapped values are valid. The configured PTA path uses Corporate Directory, whose authentication connection is unavailable.

Does making HR authoritative establish that the sign-in check should bypass the directory?

**Worked reasoning:** No. The failure concerns a separately configured authentication dependency. Verify that path and its reported result. The identity-origin role doesn't provide a replacement credential-check mechanism.

### 6. An application is made authoritative to obtain provisioning

A separate application connector supports reads only. Someone proposes making its source authoritative so it can create target accounts.

Does that supply the missing capability?

**Worked reasoning:** No. It changes identity-establishment responsibility, not the connector's operation support or target privileges. It can also create unwanted personnel-identity consequences. Establish a supported, approved provisioning design rather than changing authority to bypass a capability limit.

### 7. The higher-priority account still exists after a status change

The employee account remains correctly associated, Employees still has higher priority, and its employment-status value changes. No removal of the authoritative account is supplied.

Can the team declare that Contractors must now apply?

**Worked reasoning:** No. A changed value isn't the same as removal of the account relationship used by the priority rule. Inspect applicable lifecycle/processing configuration and observed profile association. Don't use a status change as evidence of an undocumented fallback or completed external access removal.

## Review the next population before adding its profile

An organization acquires another company. The proposal says: “Make the acquired directory authoritative, keep the existing employee HR profile, and let whichever source aggregates last decide the person and their values.”

What would you establish before approving that design?

**Worked reasoning:** Determine which records establish each intended population, where people overlap, and how stable identifiers and supported account correlation preserve the intended person relationships.

Define the profile priority where one identity has accounts on both authoritative sources. Review creation-order defaults instead of relying on read timing.

Specify attribute responsibility through each applicable profile's mappings. Identify required values, unique usernames, usable email inputs and any explicitly designed fallback.

Keep authentication and external change authority separate. Assess the sign-in, lifecycle, role and provisioning consequences before applying the configuration, then verify identity-side and target-side outcomes under their own evidence.

You can explain the design simply: “Authoritative tells us which source/profile arrangement establishes the identity. Priority chooses the applicable profile when authoritative accounts overlap on that identity. Mappings produce its values, correlation connects its other accounts, and authentication and provisioning still use their own configured paths.”
