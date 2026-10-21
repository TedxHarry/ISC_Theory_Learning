# What will this source actually represent?

Devi coordinates warehouse work, employee number `41001`. She uses a fictional application called DispatchHub in the West region. Her standard account is `depot-41001`; she also has `depot-admin-41001` for approved administrative work.

The project team connects DispatchHub to SailPoint Identity Security Cloud (ISC). The connection test passes, and the first account collection finishes successfully.

Neither of Devi's accounts appears in the collected production accounts.

Should someone create another account for her? Not yet. Her accounts already exist. We first need to establish which system and account population the source was configured to represent.

A working connection can still have the wrong boundary.

## The application, the connector, and the source have different jobs

DispatchHub is the external business application. It holds accounts and permissions and enforces its own access rules.

A **source** is ISC's configured representation of a system or collection of account data. It establishes the context under which ISC collects and manages that data.

A **connector** supplies the integration behavior: how supported information is read and, where supported and configured, how changes are made.

The connector is not a second DispatchHub installation. Creating a source doesn't create the external application, import every account automatically, or grant everyone access.

An **account** is a record in a particular system. A **source account record** is ISC's representation of that external account.

An **identity** is ISC's representation of a person or another entity, connecting relevant information, accounts, and access. Devi's employee identity already exists in ISC through the organization's personnel-data arrangement.

We want the source to represent the appropriate DispatchHub accounts, then associate them with their owners where the configured matching succeeds. We aren't trying to replace DispatchHub with ISC.

## Be precise about which DispatchHub you mean

An **environment** is a particular operational setting, such as production or a testing sandbox. An application can also contain separate external organizations, directories, or workspaces.

In this example, DispatchHub has a production organization called Dispatch-Prod and a separate sandbox organization called Dispatch-Test.

A **tenant** is an organization's environment within a hosted service. The ISC tenant and DispatchHub's external organization are different contexts. Signing into the correct ISC tenant doesn't prove that its source points to the correct DispatchHub organization.

An **endpoint** is the address of an interface used by the integration. The actual destination can depend on that address plus an organization identifier, credential context, or other connector-specific settings.

The project chooses separate source configurations for production and sandbox. We use `S-41P` and `S-41T` as fictional source-ID stand-ins:

```text
[Dispatch-Prod]          [Dispatch-Test]
       |                       |
       v                       v
[Source S-41P]          [Source S-41T]
       |                       |
       v                       v
[Production records]   [Sandbox records]
```

The arrows show which external data each configured source represents. They aren't a complete network architecture or a rule that every external partition must always have its own ISC source.

Source `S-41P` is named DispatchHub Production. That name helps an administrator recognize it. The connection settings and actual returned data establish whether the name is truthful.

If someone copies the name but leaves the destination pointing to Dispatch-Test, a successful test proves connectivity to the configured test destination. It doesn't turn sandbox accounts into production evidence.

The same account string can exist in both environments. Finding `depot-41001` in Dispatch-Test is not proof that the production account was collected.

## Define the population before judging the count

A **population** here means the set of accounts the project intends this source to represent. It is a design description, not an instruction to create a separate ISC object named Population.

The **coverage boundary** states what belongs inside that set and what is deliberately outside it.

For the main example, the agreed source purpose is:

“Represent all human-operated standard and administrative accounts in Dispatch-Prod, across East and West, including disabled accounts. Keep Dispatch-Test outside this source.”

The application owner supplies this complete production inventory for one fixed observation time:

| Account category | Count | Included in this source's agreed coverage? |
|---|---|---|
| Standard human accounts | 100 | Yes |
| Additional administrative human accounts | 10 | Yes |
| Integration service accounts | 10 | No, separately owned and tracked in this project |
| Total production accounts | 120 | 110 included; 10 deliberately outside this source |

A **service account** is used by software or an integration rather than for a person's ordinary interactive work. Its exclusion from this source's agreed scope does not mean it is harmless, approved, or exempt from governance. The project needs a separately accountable treatment for those ten accounts.

The administrative accounts belong to ten of the same people who have standard accounts. Therefore, the 110 human-operated accounts belong to 100 people in this supplied inventory.

Account count and person count are different measurements.

Devi's two accounts are both within coverage. An account's administrative purpose doesn't remove its ownership relationship to her, and a second account doesn't require a second employee identity.

## “All users” can hide different assumptions

When an application owner says “all users,” ask what they counted.

Do they mean people, account records, currently enabled accounts, a region, an external organization, or everyone visible to their own administrator login?

Those are different sets.

A **disabled account** remains an account record even when its sign-in or use is restricted. Under this project's agreement, disabled human accounts remain in coverage. Excluding them because they aren't currently usable would change the agreed population.

Similarly, a missing HR employment record doesn't prove that an external application account doesn't exist. Former workers, contractors, test records, orphaned accounts, and service accounts need classification rather than assumptions based only on a current employee list.

An **orphaned account**, in this operational sense, is an account without an established responsible owner under the organization's records and process. It isn't automatically deleted just because the owner is unknown.

The coverage agreement tells you what should be represented. It doesn't decide every account's legitimacy or grant a reason to retain its access.

## Separate intended coverage from readable coverage

A **credential** is proof used by an integration to authenticate. **Authentication** establishes the accepted caller context. **Authorization** determines what that caller may read or change.

For the fictional connection, `svc-dispatch-isc` is the external integration actor. It isn't Devi's standard account or her administrative account.

A credential might be valid while its external permissions expose only one region. A connection can therefore succeed without permitting a complete read of the intended population.

A **filter** narrows the selected set of records. The actual filtering mechanism and supported fields depend on the chosen connector and external system.

A connector might have a configured account filter, an external interface might restrict results, or an exported file might already contain only a subset. Don't assume that every source has an identical filter field or syntax.

The **collection scope** is the set of records and information the read is configured and able to collect. To satisfy the project, it must cover the agreed population under the supported configuration.

You need to distinguish:

- The accounts the project intends to include.
- The accounts the integration's destination and authority make available.
- The accounts selected by the supported read configuration or supplied file.
- The accounts actually returned and processed by the particular run.

These are different questions even when the numbers happen to match.

## Follow the missing West accounts

**Aggregation** collects source account or entitlement information into ISC. An **entitlement** is an assignable access right, such as a group membership or an application permission.

An account record's presence doesn't prove that all its access information was read. A connector can return account names while required membership values are missing or outside its supported read. The source's purpose must specify the information needed, not just which account rows to count.

In the supplied incident, the external production inventory is stable while we compare it with the collection. The integration actor can read the full intended production population.

The fictional connector supports selecting human-operated accounts and applying a region condition. Its saved read condition includes only East.

Of the 110 human-operated accounts, 70 belong to East and 40 to West. Devi's two accounts are among the 40 West accounts.

**Pagination** divides a result set into pages. The supplied run finishes all pages, has no record-processing failures, and returns the complete 70-account set selected by that condition. We aren't inferring a filter problem merely from a low count; the configuration and returned records establish it.

```text
[Agreed human-account coverage: 110]
                 |
         East and West required
          /                 \
         v                   v
[East accounts: 70]    [West accounts: 40]
         |                   |
    selected             excluded
         |                   |
         v                   v
[Collected: 70]       [Devi's accounts absent]
```

The branches show the supplied population split and the incorrect selection. They don't represent parallel provisioning, account deletion, or a universal ISC filtering pipeline.

The run succeeded at collecting its configured East set. The source failed the project's wider coverage requirement.

That's why restarting the connection or creating new accounts for Devi would address the wrong problem.

## Check the source records before changing the matching logic

**Account correlation** associates a collected source account with the appropriate ISC identity under configured matching rules.

A rule can compare an account value with the corresponding identity value. In this example, both of Devi's accounts carry employee number `41001`, and the approved matching configuration can use that value to associate them with her existing identity.

Their external account identifiers are still different: `depot-41001` and `depot-admin-41001`. The shared employee number identifies the person relationship, not one unique external account.

An **account identifier** distinguishes an account within the source's external context. A **schema** describes the attributes represented on its records, including the designated account identifier. An **attribute** is a named value, such as employee number or region.

Do not make employee number the unique account key here simply because it is convenient for matching people. Two legitimate accounts share it.

Before troubleshooting correlation, ask whether the expected account record was collected at all.

If the record exists but has no appropriate identity association, investigate matching information and rules. If it was never returned because West was excluded, changing correlation cannot make the missing record appear.

An **uncorrelated account** has been collected but hasn't been matched to the intended person identity. It is different from an account absent from the collection.

The distinction tells you where the investigation belongs: reading the account versus associating the record already read.

## What should you see after the scope is corrected?

Assume the responsible owners approve correcting the read condition to include both regions while preserving the agreed human-account selection. The destination, credentials, account identifiers and ownership-matching rules remain unchanged.

A later supported collection returns all 110 intended accounts, with no missing pages or processing failures in this supplied example. Both `depot-41001` and `depot-admin-41001` are now represented, and the established matching configuration associates them with Devi.

Now the evidence supports the coverage claim for the compared inventory and observation time.

It doesn't mean every future run is complete, every account is correctly owned, or every entitlement is legitimate. Those are further checks under the same scope agreement.

The **user interface**, or UI, displays represented information such as the source's collected account list and account details. It can also show which identity is associated with an account.

If the same identity appears against multiple accounts on a source, that can represent a legitimate multiple-account relationship. It is not, by itself, duplicate-person evidence.

Be careful with the view itself. A Correlated-only filter hides uncorrelated accounts; another display filter can hide records that were collected. A list view's filter isn't necessarily the connector's collection filter.

Verify that you've inspected the complete intended result, not one page or a filtered view that happens to contain 70 records.

## Collecting access data doesn't authorize every change

**Provisioning** carries out supported account or access changes. Read coverage and change authority must be established separately.

Our initial DispatchHub onboarding is read-only: it collects account and access information. We aren't enabling automatic external account changes merely to fix an incomplete read.

A **direct connection** communicates with the external system through its configured integration. A **flat-file feed** supplies account information through an imported file. Neither label, by itself, establishes support or authority for every possible operation.

Supported sources have different read and change capabilities. The enabled configuration, target permissions and selected operation all matter. A read-only connector offering cannot be made write-capable by changing its display name.

A **SaaS connector** performs its integration work in SailPoint's hosted environment. A **Virtual Appliance**, or VA, is a customer-deployed virtual machine used by applicable VA-based integrations. Choose the supported execution path; don't infer it merely from whether DispatchHub has a cloud website.

For this fictional source, assume a supported SaaS connector. Its hosted runtime doesn't remove the need for a correct destination, readable account population and valid external authority.

Also don't treat a read filter as a universal security barrier against writes. If future provisioning is required, establish which destination and accounts that operation can affect under the connector's supported behavior.

Reading only East does not, by itself, prove that a powerful integration credential cannot modify West. Conversely, a credential's broad ability to modify accounts does not authorize the project to use it that way.

## A source's purpose determines what you can safely conclude

An **authoritative source** is used through an **identity profile**, configuration that establishes identities from that source's accounts and defines relevant identity settings and mappings.

A **non-authoritative source** supplies accounts to associate with identities established through the organization's authoritative arrangements.

DispatchHub is non-authoritative in this example. We need to govern existing application accounts, not treat every application account as an independent personnel record that creates a new employee identity.

That choice is about responsibility, not application size or how trusted its owner is.

Similarly, collecting permission information doesn't make every permission requestable. An **access request** asks for particular access for a recipient. An **access profile** bundles entitlements from one source and can participate in configured access-delivery arrangements.

Whether an item can be requested, approved, delivered or reviewed depends on its own supported configuration and available data. A source label doesn't establish those controls.

If West is missing and no other relevant data supplies those accounts, a review based on this source can't examine the omitted West account access. A clean result over the East set isn't evidence that West has no excessive access.

Coverage limits need to travel with the results they limit.

## Write down the boundary so another engineer can test it

A useful source definition answers operational questions. It doesn't stop at a product name.

A **source owner** is the assigned person responsible for that source under ISC's management arrangement. The organization must also identify who controls external accounts, credentials, account classification, data corrections, and integration support.

For DispatchHub Production, the design record can be concrete:

| Boundary question | Agreed answer in this example | Evidence needed |
|---|---|---|
| Which external system and environment? | DispatchHub, Dispatch-Prod, not Dispatch-Test | Saved destination context and returned production records |
| Which accounts? | Human-operated standard and admin accounts, East and West, including disabled | Complete comparable target inventory and inclusive read results |
| What is outside this source? | Sandbox and ten integration accounts | Explicit exclusions and named responsibility for separately tracking integration accounts |
| What identifies an account and its owner relationship? | Distinct external account key; employee number can connect a human account to its person | Schema/designated identifier and representative multi-account matching evidence |
| Which information must be read? | Account identifiers, region, classification, status, ownership reference and relevant access | Supported connector data, configured schema and actual record values |
| Which external changes are approved now? | None; read-only onboarding | Enabled source capabilities and actual integration authority |
| Who maintains correctness? | Assigned source owner with application, ISC and integration responsibilities explicitly agreed | Named owners, approved changes and evidence-review responsibilities |

This is an example design record, not a mandatory ISC object or a promise that every connector exposes these exact fields.

Assigning the owner doesn't automatically grant them external system privileges or make them the owner of every account. Where one person fills multiple roles, the responsibilities still differ.

If West disappears from the next collection, someone must be able to determine whether that is a new exclusion, a permission change, an external deletion, a failed read, or a display issue. The purpose statement and evidence give them a starting point.

## Counts help, but membership proves the boundary

Suppose another run also produces 110 records. Can you declare success just from the number?

No. A wrong set can have the right size.

It could omit ten required production accounts while including ten service accounts outside the agreement. It could point to another organization whose count happens to match. It could contain duplicates caused by an identifier problem.

Compare membership and context, not just totals. Check representative boundary cases such as West, disabled accounts, administrative accounts, and deliberately excluded service accounts. Representative checks help find mistakes; they don't by themselves prove that every record is correct.

For the full coverage claim, reconcile the expected set with the collected set under a comparable observation time and known read scope. Record missing and unexpected members and investigate why they differ.

If the external inventory changed between observations, explain that timing difference rather than forcing the counts to match.

## Preserve exclusions and changes as decisions

An intentional exclusion needs a reason, an accountable owner, and a statement of what the source's results no longer cover.

Don't hide missing West records by silently redefining “all users” to mean “whatever the connector returned.”

Likewise, don't broaden a collection blindly because more data sounds safer. Adding another region or account category can introduce sensitive information, new owners, additional account relationships, and downstream effects.

Review the supported change, permissions and dependent configuration before applying it. A change to collection scope isn't evidence that external accounts were deleted or their access was removed.

**Deprovisioning** removes or reduces access through the applicable account-changing process. Omitting an account from a read isn't itself that external operation.

What ISC does with a previously collected but now missing record depends on the operation, source configuration and applicable deletion safeguards. Do not assume a changed filter harmlessly hides data, always deletes data, or always leaves everything unchanged.

Resetting, deleting, or recreating a source can affect represented data and its dependent configuration. Those are not first diagnostic steps for this missing-West incident.

Start by verifying the actual destination, authority, selection and evidence. Preserve stable identifiers and dependencies while making the approved correction.

## Work through these decisions

Treat each case as a separate variation.

### 1. The connection passed, but only East was selected

Use the supplied incident: the credential can read the full intended set, the saved read condition selects East, all selected pages complete, and the result contains the 70 East accounts.

Does connection success establish the agreed 110-account coverage?

**Worked reasoning:** No. It establishes only the tested connection's scope. The supplied condition and results explain the missing 40 West accounts. Correct the approved read scope, then verify a later inclusive collection. Don't create new external accounts or change ownership matching to fix an account that was never read.

### 2. The source has a production name and a test destination

A source named DispatchHub Production returns records from Dispatch-Test. A sandbox record uses account string `depot-41001`.

Does finding that account establish Devi's production coverage?

**Worked reasoning:** No. The destination and returned environment disagree with the label. Match the actual external organization and account context to the intended production population. Renaming the source alone doesn't change the destination.

### 3. There are 110 accounts but only 100 people

The inventory contains the 100 standard human accounts and ten additional admin accounts belonging to ten of those same people.

Must the project delete ten accounts or create ten extra identities to make the totals equal?

**Worked reasoning:** Neither. Different account counts and person counts are legitimate here. Preserve each unique external account and establish its owner relationship. Inspect purpose and approval separately; unequal counts aren't evidence that an account should be deleted.

### 4. The account was collected but isn't correlated

The source account list contains `depot-41001`, but it isn't associated with Devi's intended identity. Its employee-number field is missing.

Should the team broaden the region filter again?

**Worked reasoning:** That account has already crossed the collection boundary. Investigate the missing ownership value and matching configuration, then use the supported correction process. A wider read doesn't supply a missing employee number or prove a correct identity match.

### 5. The read credential can modify more than the source reads

A separate design variation reads East accounts only, but the external integration credential has target authority to modify accounts in both regions. No approved West write requirement exists.

Does the East read filter establish a safe West-write prohibition?

**Worked reasoning:** No. Reading and writing have different operation boundaries. Verify the supported write configuration and effective target authority, then use justified least privilege and approved controls. Don't rely on a collection condition as an undocumented write security boundary.

### 6. A completed run has the expected count and the wrong members

A result contains 110 accounts. Comparing it with the agreed inventory shows ten required human accounts missing and ten excluded service accounts present.

Is the matching total enough to accept the source?

**Worked reasoning:** No. Equal size doesn't establish equal membership. Preserve both differences, identify the selection or classification problem, and verify the corrected set. The service accounts still need their separately agreed accountable treatment; excluding them from this source isn't permission to ignore them.

## Review a different application's proposal

A finance team proposes: “Use our payroll application's name for the source, import the monthly active-employee export, and call it complete payroll coverage. The same export can later drive account removal.”

What would you need to establish before accepting that design?

**Worked reasoning:** Identify which external payroll environment and account population the export actually represents. An employee export isn't automatically an inventory of application accounts; it might omit admin, disabled, contractor, former-worker, or service accounts.

Establish the intended account identifiers, ownership relationships, included statuses, data/access fields, observation time, export selection and responsible owners. Compare a known expected account set with the actual file rather than treating a successful import as coverage proof.

Clarify whether this source establishes personnel identities or supplies application accounts for existing identities. Those responsibilities need an explicit design, not a decision based on the payroll name.

Account removal is a separate supported change process with current authorization, appropriate evidence and safeguards. A missing row in an active-only monthly file isn't enough to prove that an external account should be deleted.

You could describe a source this way: “It represents this external system, in this environment, for this agreed set of accounts and information, with these supported operations. We can show which records it includes, why anything is excluded, and who is responsible when the boundary changes.”
