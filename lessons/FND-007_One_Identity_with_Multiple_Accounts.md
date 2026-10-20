# One identity, multiple accounts: which account are we talking about?

Devi works in warehouse operations. Her employee number is `27007`. She checks stock each day and, under a separate authorization, maintains settings in the Stockroom application.

She uses `stock-27007` for daily work and `stock-admin-27007` for the approved settings work. The organization deliberately keeps those accounts separate so that ordinary work doesn't require administrative privileges.

Now she needs permission to export stock reports from her daily account.

An engineer opens her details in SailPoint Identity Security Cloud, or ISC, and sees both Stockroom accounts associated with the same person.

Is that a duplicate to clean up? Should new access go to both accounts? If one account is disabled, has Devi lost access to the whole application?

Let's inspect what those relationships actually mean before changing anything.

## One person doesn't imply one account

An **identity** is ISC's person-level representation of Devi. It connects information about her with the accounts and access associated with her.

An **account** is a record in a particular system. The external system uses that record for its own account and access behavior. ISC holds a representation of it, including the data collected through the integration.

Devi can have an HR record, a corporate directory account, and application accounts while still being one person. She can also have two accounts in the same application for different purposes.

Here is the fictional situation we will inspect. Each row is one account represented in ISC.

| Account shown | Source and purpose | Teaching account ID |
|---|---|---|
| `hr-27007` | People HR, employment information | `A-71` |
| `dir-27007` | Corporate Directory, ordinary corporate account | `A-72` |
| `stock-27007` | Stockroom production, daily work | `A-73` |
| `stock-admin-27007` | Stockroom production, approved settings administration | `A-74` |

A **source** is ISC's configured representation of a system or collection of account data. The **connector** is the integration used to read its information and perform supported changes.

There are three sources in this example, not four. Stockroom production supplies two account records through the same source.

Devi's ISC identity has the teaching ID `I-71`. The short letter-number IDs in this explanation stand in for real ISC object IDs. They aren't identifiers for real operations.

All four accounts are already associated with `I-71` in the supplied example. They aren't accounts created by opening the identity page.

```text
Identity I-71: Devi
Employee number: 27007
  |
  +-- People HR / S-71
  |     +-- A-71: hr-27007
  |
  +-- Corporate Directory / S-72
  |     +-- A-72: dir-27007
  |
  +-- Stockroom production / S-73
        +-- A-73: stock-27007
        +-- A-74: stock-admin-27007

One identity, three sources, four account records.
Both Stockroom accounts remain separate.
```

The branches show associations and source context. They don't mean the identity logs in through HR, that every account receives the same permissions, or that the accounts share a password.

This is a **one-to-many relationship**: one identity can be associated with multiple account records. For the personal accounts here, each account has one associated person-level identity.

Don't reverse that into a rule that a shared service account should be correlated to every human who uses it. Responsibility for a shared or non-human account is a different relationship from the personal-account associations shown here.

## Why would the same source have two accounts?

Separate administrative and daily accounts are one reason. The administrative account can carry rights that should not be present during ordinary work.

Other situations need investigation. A replacement account can coexist with an old account during a controlled migration. A former account can remain disabled for a retention period. An accidental duplicate can also exist.

Those examples don't have the same business meaning.

“Two accounts” tells you how many represented accounts exist. It doesn't tell you whether the arrangement is approved, whether both are needed, or whether one is a mistake.

For Devi, the supplied policy permits both Stockroom accounts and defines different uses for them. The account names are helpful clues, but the policy and account records establish the intended purposes. ISC doesn't infer an approved administrative design merely because a username contains `admin`.

Before describing an account as a duplicate, establish what makes it redundant. Does it represent the same external account twice, or a genuinely separate external account? Does it have an approved purpose? Is it still enabled? Does it contain access that must be reviewed?

A duplicate ISC representation and an unnecessary external account are different problems. Deleting something before you distinguish them can hide the evidence or disrupt legitimate work.

## Correlation connects the accounts; it doesn't merge them

**Aggregation** collects account or entitlement information from a source into ISC. An **attribute** is a named value on a record, such as an employee number, login, or account-purpose value.

**Account correlation** matches and assigns a source account to an ISC identity. Configuration determines which account and identity attributes are compared.

Suppose both Stockroom accounts carry an employee-number attribute of `27007`. The configured comparison finds the intended identity with employee number `27007`. In this example each account becomes associated with `I-71`.

Read that as two account associations:

- `A-73` is associated with `I-71`.
- `A-74` is associated with `I-71`.

It isn't a command to combine `A-73` and `A-74` into one account.

Their account identifiers, permissions, and states remain distinct. Correlation doesn't copy administrative permissions into the daily account, share their credentials, or sign Devi into either account.

The example assumes the employee-number data identifies the intended person correctly. A value can be copied to the wrong account or reused under a poor numbering policy. A successful configured match is not independent proof that the business data is correct.

If the admin account actually belongs to another employee, its association with Devi is wrong even if a configured comparison found a matching value. Check the source account and authoritative person evidence before correcting the association.

An **authoritative source** supplies a population through which ISC establishes person identities. In this example People HR has that role. An **identity profile** provides the configuration for that population, including mappings for identity information.

Two Stockroom accounts associated with one existing identity are not the same as two authoritative person identities for Devi. If two person-level identity records appear, investigate identity creation and authoritative-source design as a separate issue. Don't treat account correlation as a general-purpose identity merge.

## Each account keeps its own information

An identity attribute describes the person-level record. An account attribute describes one represented account.

For Devi, the identity's department can be Warehouse Operations. Her Stockroom daily account can have the account-purpose attribute `usage=Daily`, while the admin account has `usage=Admin`.

Those account values aren't contradictory person departments. They answer a different question: what is this account used for?

Likewise, the identity's display name doesn't require every account to have an identical login. A person can be represented as Devi while using different usernames in different systems.

How does an identity attribute obtain a value? Through its configured mapping and any calculation involved. The presence of multiple correlated accounts doesn't mean ISC concatenates all their attributes or automatically makes their values agree.

For a concrete value-lookup example, an **Account Attribute transform** is configured logic that reads an attribute from an account on a specified source. With multiple accounts, its documented default starts with the oldest account by creation date. If that attribute is null, meaning no value, the default behavior looks for a non-null value on a later account. Filtering, sorting, and first-account settings can change that behavior.

That oldest-account default belongs to this value lookup. It is not a universal rule for choosing where to grant permission.

If an identity mapping reads from a source with multiple accounts for that person, inspect its input-selection logic. Don't assume the provisioning selection setting also selects the input for every identity calculation. These are different uses of account data.

A collected attribute also isn't automatically a write instruction. Changing the person-level department does not, by correlation alone, update every connected account. A supported, configured provisioning mechanism is needed for an external change.

## Access belongs to a particular account in a particular system

An **entitlement** is an access item represented from a source, such as a group membership or permission.

In this fictional Stockroom application, the permissions have these meanings:

- `stock.read` permits viewing stock information.
- `stock.configure` permits maintaining application settings.
- `stock.export` permits exporting stock reports.

Before the new export requirement, the collected account data says:

| Stockroom account | Purpose value | Collected entitlement values |
|---|---|---|
| `stock-27007`, `A-73` | `Daily` | `stock.read` |
| `stock-admin-27007`, `A-74` | `Admin` | `stock.configure` |

Both rows are associated with Devi. The permissions are not interchangeable between the rows.

If an identity-level view shows access associated with a person, follow the details to the source and account before deciding which login has that access. “Devi has Stockroom settings access” is useful person-level information. “Her daily account has settings access” is a more specific claim that requires account-level evidence.

The same applies in the other direction. The absence of `stock.configure` on her daily account does not prove that she has no administrative access anywhere. Her admin account is another path to inspect.

This is why a review or support investigation needs both views: the person's overall exposure and the specific accounts carrying it.

The front end is the interface you read. The backend is the application processing behind it. An identity page can bring related records together for a readable person-level view while the underlying account records still describe different accounts. A source's account list can show Devi's identity beside more than one row because more than one account is associated with her.

Repeated person names in that account list don't, by themselves, prove duplicate identity records. Inspect the account identifiers and source context.

Also remember what produced the information. Collected access is an observation from aggregation, not a live guarantee that every external account still has exactly that state.

## Which account should receive the export permission?

An **access profile** bundles related entitlements from one source. For this example, the profile **Export stock reports** contains `stock.export` from Stockroom production.

The business requirement is precise: add export access to `stock-27007`, Devi's daily account. It does not authorize giving export access to her admin account.

**Provisioning** is carrying out supported account or access changes. Identifying Devi as the recipient is necessary, but it isn't the whole provisioning target. The process must also resolve the relevant source account.

There are two different paths to understand.

### An automatic assignment can use account criteria

A **role** groups access needed for a responsibility or population. A **lifecycle state** represents a configured business stage, such as active employment, that can drive applicable account and access actions.

When an access profile is automatically provisioned through an automated role assignment or lifecycle state, its **Multiple Account Options** can determine which of an identity's accounts on that source receives the access.

For Devi's two Stockroom accounts, imagine a configured criterion comparing the account attribute `usage` with `Daily`.

The supplied data makes `A-73` the single match. `A-74` has `usage=Admin`, so it doesn't match that criterion.

The reason for the selection is the configured comparison against account data. It isn't that `A-73` appears first on a screen, was created earlier, or has a shorter username.

For this automatic access-profile mechanism, no matching account or more than one matching account causes provisioning to fail. If manual account selection is enabled, the source owner can be asked to choose through a task form. Selection and fulfilling the access remain separate; an additional manual fulfillment task can be needed.

The source owner is the identity assigned responsibility for that source. That responsibility doesn't automatically give the owner administrator privileges in Stockroom.

### A request uses its own account selection

An **access request** asks for specified access for a specified recipient. The **requester** initiates the request; the **recipient** is the identity intended to receive the access. They can be different people.

For Request Center access requests involving multiple accounts on the source, the requester selects the account that should receive access. The automatic access-profile criteria just described do not govern that request selection.

So don't tell a requester, “Choose either account; the Daily filter will correct it later.”

The choice needs to reflect the intended account. Review should retain that account context, and the resulting provisioning evidence must identify what was actually attempted.

Here is the comparison for an identity with multiple accounts on the profile's source:

```text
Access profile: Export stock reports
Source: Stockroom production / S-73
Recipient: identity I-71
  |
  +-- Automatic role/lifecycle profile assignment
  |     |
  |     +-- Evaluate configured account criteria
  |           +-- One match --> Selected account
  |           +-- Zero/many --> Provisioning fails
  |                 Manual selection if enabled
  |
  +-- Request Center access request
        |
        +-- Requester selects intended account

Selecting an account is not proof of delivery.
Inspect the actual operation and target result.
```

The branches compare documented selection contexts. They aren't a universal processing sequence for every ISC feature. Other operations, direct role entitlements, and connector-specific changes need their own applicable behavior checked.

The automatic multiple-account criteria are not applied when the identity has only one account on that source. If the only remaining account is the administrative one, don't assume a `Daily` criterion is a universal safety gate. Validate the account population and the design's behavior for that condition.

“Which person qualifies?” and “which account should receive it?” are separate questions.

## Already having the profile creates another limit

Suppose Devi already has the access profile Export stock reports associated with her identity through a previous request for the admin account. The daily account still lacks `stock.export`.

Can she simply request the same profile again and select the daily account?

The documented access-profile request behavior does not allow that. An access profile can be associated with an identity only once, so an identity that already has it cannot request it again for another account.

SailPoint identifies individual entitlement requests or access bundled into roles as alternatives when the same access is needed on multiple accounts. Those alternatives still require a suitable design, account selection, authorization, and supported fulfillment. They aren't permission to bypass the original access controls.

First establish what the identity already holds and on which account the target permission exists. Don't treat a blocked repeat profile request as proof that the daily account already has the permission.

## Follow one complete change

Return to the original case: neither Stockroom account has `stock.export`, and Devi doesn't already hold the Export stock reports profile.

The configured source supports the required membership or permission update. The request process permits the requested access and uses the organization's required review. The requester selects the daily account `A-73`.

After approval, the integration attempts the supported change for that account. Approval is the decision to allow the requested work; it isn't the result of the external operation.

For the successful fictional outcome, current Stockroom account evidence confirms `stock.export` on `stock-27007`. A later collection records that permission on `A-73`. The admin account remains unchanged.

Notice the separate evidence:

- The request identifies the recipient, requested profile, and selected account.
- The provisioning activity identifies the source account, attempted change, and reported result.
- The target observation establishes the permission on the intended external account at the checked time.
- The later collected account data shows what ISC has recorded from the source.

These are not four names for one status. They answer different questions.

Now change one fact: the requester selected `A-74`, and the supplied target evidence confirms that the admin account received `stock.export`.

The system may have carried out that selected operation successfully while the business requirement remains unmet. Don't automatically repeat the grant on the daily account and ignore the extra admin permission. Establish the approved correction, preserve legitimate existing rights, and verify both accounts after the correction.

That is an account-targeting problem, not evidence that Devi needs another person-level identity.

## A sign-in uses an account, not a combined permission bag

**Authentication** verifies a claimed identity for sign-in. **Authorization** decides whether a particular operation is allowed.

In this example, Stockroom checks permissions on the account used for the current application context. When Devi signs in as `stock-27007`, her daily account's rights apply. Signing in as `stock-admin-27007` uses the admin account's rights.

ISC's correlation of both accounts to Devi doesn't merge those runtime permissions.

An external single-sign-on arrangement can map a sign-in to an application account. That mapping is separate from ISC account correlation. If the application signs Devi into the admin account when she expected the daily account, examine the actual sign-in mapping and application-account context rather than assuming an ISC correlation rerun will repair it.

Actual applications can have delegated access or other authorization rules. Check the application's design; don't generalize this fictional account-based permission model to every system.

## Disabling one account doesn't answer every access question

Suppose the admin account `stock-admin-27007` is confirmed disabled in Stockroom. The daily account remains enabled.

The account action concerns the admin record. It doesn't, by itself, disable the daily account, change Devi's employment status, or prove that she has lost access through every other account.

An identity's lifecycle state and an individual account's enabled/disabled state are different information. A lifecycle configuration can initiate actions across accounts, but you need to inspect the configured actions and their outcomes. The person-level state isn't proof that each external action succeeded.

Disabling an account is also different from ending every existing application session. A **session** is the application's continuing signed-in context. Verify how that application treats existing sessions when an account is disabled. Don't infer session termination from the ISC association or a collected disabled flag alone.

For a legitimate administrative-account retirement, the question isn't simply “does Devi still appear in ISC?” It is which account was retired, which access remains approved, what actions were completed, and whether she retains any unintended path.

## Don't remove the relationship to hide the problem

An account can exist in the external system without being matched to an authoritative identity in ISC. That is an **uncorrelated account**. It doesn't mean the external account has been disabled or deleted.

An account associated with the wrong person is a different case: the correlation is incorrect, rather than absent. Don't assume a search for uncorrelated accounts will reveal every wrong-person association.

Likewise, removing an account representation from ISC is different from deleting the external account. SailPoint documents that a source account removed from ISC can be collected again during the next complete source aggregation if it still exists on the source.

If the requirement is to stop an unnecessary external account from being used, deleting its displayed ISC row isn't evidence that the requirement has been met.

Start with read-only investigation:

1. Identify the external system, environment, account identifier, and corresponding ISC account record.
2. Confirm who the account represents and what purpose is approved.
3. Compare the source attributes with the person information and correlation configuration.
4. Inspect account-specific permissions, state, relevant assignments, and operation history.
5. Decide whether the defect is in source data, association, access design, fulfillment, or the actual external account.

Only then plan the authorized correction. An association error needs different work from an unnecessary but correctly associated account. An intended account receiving the wrong permission is a different problem again.

Also inspect continuing access requirements before deleting an external account. A role that still requires source access can cause account creation again under the documented provisioning behavior. Removing a record without resolving why access is required can produce a return of the symptom.

## Check your reading of the account map

### 1. Four rows, how many identities?

The four accounts in the opening table all refer to `I-71`. Two belong to Stockroom production. A colleague says that four rows prove four duplicate identities.

**Worked reasoning:** The supplied facts show one identity associated with four account representations across three sources. The two Stockroom rows are separate accounts on one source. Inspect identity IDs to investigate identity duplication; don't use an account-row count as an identity count.

### 2. The right permission is on the wrong login

An identity-level view shows `stock.export`. Account details and current target evidence place it only on `stock-admin-27007`. Devi cannot export while using `stock-27007`.

Should you conclude that the application's permission check is broken?

**Worked reasoning:** Not from these facts. The daily account lacks the permission in the supplied evidence, while the admin account has it. Check the intended account, request selection, provisioning activity, and current application-account context. The identity-level access observation does not make both accounts equivalent. A correction also needs to address whether the admin grant was approved.

### 3. Two accounts match the automatic criterion

For automatic profile provisioning, both Stockroom accounts have collected `usage=Daily`, and the configured criterion is `usage Equals Daily`.

Will ISC safely choose the older account?

**Worked reasoning:** No such tie-breaker follows from this mechanism. More than one match causes that provisioning to fail. Verify why both collected values match the criterion and whether the design correctly expresses the intended account purpose. If manual selection is enabled, inspect the relevant selection task. A manual choice still isn't proof that the permission was delivered.

### 4. The requester picked Admin

The automatic profile setting selects `usage=Daily`, but a Request Center request selects the admin account. A reviewer assumes the automatic setting will redirect the grant to the daily account.

**Worked reasoning:** That assumption is wrong for the documented request path. These automatic criteria don't apply to access-request account selection. Review the selected account against the business requirement and inspect what the provisioning record actually targets. Don't approve a knowingly wrong account on the assumption that the filter will repair it.

### 5. Only one account remains

The daily account has been retired. The only correlated Stockroom account is the admin account. An engineer argues that `usage Equals Daily` guarantees an automatic profile assignment cannot concern that admin account.

**Worked reasoning:** Multiple Account Options criteria are not applied for an identity with only one account on that source. The criterion alone doesn't establish the claimed protection. Review the assignment design, remaining account's purpose, and the applicable provisioning behavior. Don't infer a safe outcome from a filter whose documented scope doesn't cover this population.

### 6. The second account disappeared from ISC

Someone removes the admin account's representation from ISC. There is no supplied external delete/disable result, and the account still exists in Stockroom.

Has administrative access been removed?

**Worked reasoning:** No. Removing the ISC representation isn't an external disable or delete. It can be collected again during a complete source aggregation. Establish the authorized target change, the continuing assignment requirements, and current external account/access evidence. Hiding the account row doesn't resolve the access risk.

## Use a different application and trace it yourself

A payroll analyst has one ISC identity associated with two accounts on the Payroll production source:

| Account | Approved purpose | Supplied observation |
|---|---|---|
| `pay-review` | Daily payroll review | Enabled; `pay.view` |
| `pay-support` | Separately authorized technical support | Enabled; `pay.configure` and `pay.export` |

The new requirement is to allow exports from `pay-review`. The support account's existing export permission is approved for its separate duties.

The analyst's identity already has an Export payroll access profile from a prior request for `pay-support`. A colleague proposes requesting that same profile again for `pay-review`. Another proposes removing `pay-support` from ISC because “the second account is the problem.”

Explain what each proposal misses, what needs to be established before a change, and how you would verify a correct outcome.

**Worked reasoning:** One person can legitimately have both accounts. Their purposes and permissions are separate, and the support account's approved export right must be preserved.

The documented profile request limit prevents requesting an already-associated access profile again for another account. Investigate an approved design using the supported alternatives, such as an individual entitlement request or access bundled into roles. Confirm requestability, recipient and account selection, required authorization, and connector support. Don't assume the example authorizes any particular configuration change.

Removing the support account's ISC representation doesn't fulfill the export requirement on the daily account and doesn't delete the external support account.

A correct outcome requires `pay.export` on `pay-review`, preservation of the approved support access, and no unintended new permissions. Inspect the selected account and operation results, then current target evidence for both accounts. Later collected data should be read as the recorded observation, not substituted for the target check.

Explain the distinction to a teammate without the table: correlation tells you which person an account is associated with; account selection tells you which account an operation concerns. Neither statement, on its own, proves that the desired access has been delivered.
