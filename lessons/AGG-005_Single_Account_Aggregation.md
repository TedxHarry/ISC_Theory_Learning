# The account refreshed. What actually changed?

Devi, employee number `55005`, coordinates support cases. Her existing account in the CaseHub application is `ch-55005`. SailPoint Identity Security Cloud, or ISC, already has a record of that account and correctly links it to her person record.

She calls the helpdesk because she can't sign in. CaseHub currently says her account is locked. ISC still displays the earlier unlocked state.

Should the administrator collect every CaseHub account just to check this one?

A **single-account aggregation** reads data for a specified account instead of collecting the integration's whole configured account population. It can bring ISC's recorded account data and supported status information up to date.

But “bring the account up to date” needs a careful meaning. Reading a locked account can make ISC show that it is locked. It does not unlock it.

## First, separate the account from the person

An **account** is a record in an application or directory. Here, `ch-55005` is Devi's CaseHub account. ISC keeps its own representation of that external account.

An **identity** is ISC's representation of the person. Devi's identity can connect to accounts from different systems and hold person-level information, such as an office value.

The CaseHub account's office and the identity's office are therefore two stored values, even when they contain the same text. They aren't one field shown in two places.

A **source** is ISC's configured representation of the system or account data it manages. Our source is named **CaseHub Production**. A **connector** supplies the supported integration operations used to read that system and, where supported, make changes.

For this fictional example, CaseHub Production uses a Web Services SaaS connector with a working single-account lookup. The lookup returns account data and lock status. A separate unlock operation is also supported and authorized, but nobody has requested it yet.

“Locked” means CaseHub has applied its account lock condition. “Disabled” is a separate account state. Removing a lock does not by itself establish that the account is enabled, the password is correct, or the person has every required application permission.

All records and results below are supplied teaching examples, not observations from a live tenant.

## What exactly are we asking to refresh?

The helpdesk selects Devi's identity, opens its Accounts view, and chooses **Aggregate Account** for the CaseHub Production account.

That selection matters. It identifies an existing ISC account record in a particular source. It isn't an instruction to find every account with a display name containing “Devi.”

Keep these references apart:

| Reference | What it identifies here |
|---|---|
| Employee number `55005` | The person in the example's employee data. |
| ISC account object ID | The account representation inside ISC. Its actual generated value is omitted here. |
| External account key `ch-55005` | The specific CaseHub account the connector must look up. |
| Source CaseHub Production | The integration and external environment in which that account key has meaning. |

The external key is also called the account's **native identity** in connector contexts. It is the identifying value used for that external account, not necessarily a person's name or employee number.

The account schema, which describes the account fields ISC represents, identifies `accountKey` as the account's identifying attribute in this example. Its value is `ch-55005`. The separate `employeeRef` field contains `55005`.

Why retain both? One identifies an application account; the other connects that record with employee information. Equal-looking digits do not make their responsibilities interchangeable.

If Devi also had an administrative account, selecting her ordinary account would not mean “refresh both.” You would have to identify which account's state you need.

## Follow the read, then look at what arrived

Before the action, the relevant values are:

| Location | Lock value | Office value |
|---|---|---|
| External CaseHub account `ch-55005` | `true` | `HYD` |
| ISC's collected representation of that account | `false` | `BLR` |
| Devi's ISC identity | Not the account's lock field | `BLR` |

Here, `true` and `false` are Boolean values meaning yes and no. `HYD` and `BLR` are fictional office codes used consistently by this configuration.

The selected fields below use **JSON**, a format that groups named fields and their values into a record. Quotation marks surround text; `true` is a Boolean, not text. Here is what the supported lookup returns:

```json
{
  "accountKey": "ch-55005",
  "employeeRef": "55005",
  "locked": true,
  "office": "HYD"
}
```

This is selected teaching data, not a complete system response. The field names and the mapping of the external lock condition into ISC status are supplied configuration choices, not universal connector defaults.

The connector must obtain the right external record, extract the relevant response fields, and provide values in the shapes expected by the configured schema and mappings. A successful response with an incorrectly extracted office field does not establish a correct office value in ISC.

Let's put the successful read on one path:

```text
[Helpdesk selects ISC account]
              |
              v
[CaseHub Production connector]
[Lookup native key ch-55005]
              |
              v
[CaseHub returns account data]
[locked true, office HYD]
              |
              v
[Extract and represent values]
              |
              v
[ISC account data is refreshed]

[Engineer verifies the record]
```

The arrows show the logical dependencies of the supported read and representation. They do not specify private service calls, queues, or database commit order. The connector performs the external lookup; ISC holds the resulting account representation. The separate final line is a human evidence check, not an automatic guarantee of correctness.

The operation's scope is one selected account. That does not mean it must use one network request. Authentication, response handling, or additional supported reads can require connector-specific work.

For example, the Web Services SaaS connector's **Get Object** operation supports retrieving a specified account using its native identity. Its configuration includes the request and response mapping. That operation can use an HTTP POST request. So the HTTP verb alone does not tell you whether the business operation reads an account or changes it.

Also, a connector's Get Object operation can participate in other workflows. Its existence does not make every workflow using it identical to the UI's Aggregate Account action.

## The account is current. Why is the identity office still BLR?

For this example, Devi's existing identity profile maps its person-level office value from the CaseHub account's office attribute. An **identity profile** provides configuration for identities, including mappings that determine where identity attribute values come from.

After the documented UI **Aggregate Account** action:

- ISC's CaseHub account data has `locked: true` and `office: HYD`.
- Devi's identity office remains `BLR`.
- The external CaseHub account remains locked.

The account read succeeded. The other values haven't failed to follow a universal refresh process. This particular action does not synchronize its new account data into identity attributes.

**Provisioning** is the supported process for making changes to external accounts or access. This action has no impact on provisioning. Unlocking an account is a change; observing its lock status is a read.

Here's the boundary:

```text
[UI Aggregate Account]
          |
          v
[ISC account representation]
[locked true, office HYD]

[Identity office remains BLR]
[No identity-attribute sync]

[External account stays locked]
[No provisioning from this action]
```

The arrow connects the selected action to the account data it updates. The separated blocks identify outcomes it does not perform. They are not later stages waiting for this action to finish.

This is why “the profile mapping is correct” and “the identity value changed during this operation” are different claims. A mapping defines the input relationship. It does not mean every account-data operation executes identity attribute synchronization.

If your actual task is to refresh identity values, inspect the identity profile and choose the appropriate supported identity-processing or source-aggregation path for that situation. **Identity processing** evaluates identity data under the relevant identity and access configuration. Changes to profile configuration can require manual identity processing even when source data has not changed.

Do not turn that into a universal recipe to press Process Identity after every account read. Establish the intended input, affected identities, required operation, and possible access consequences first. Then verify the resulting identity values and any separately initiated external changes.

A lifecycle state is an identity's configured state, such as an employment-related condition used to control access behavior. The single-account action is not a shortcut for recalculating every lifecycle state, role condition, or manager relationship.

If another process runs around the same time, inspect its evidence separately. A nearby identity or access change does not prove that this account action caused it.

## Reading the lock and removing the lock are separate jobs

Suppose the authorized support decision is now to unlock Devi's account.

The appropriate supported **Unlock Account** action asks the integration to change CaseHub's lock condition. It requires change capability and the permissions to perform that change. Permission to read the account does not establish permission to unlock it.

After a successful external unlock, a supported account read can confirm what the source now reports. Those are different questions:

“Did the change operation succeed?” needs its execution evidence.

“What does the application report about this account now?” needs current account evidence.

“Can Devi sign in and use the required function?” needs evidence from the actual sign-in and application authorization path.

**Authentication** establishes who is signing in. **Authorization** determines what that signed-in account may do. A lock value of `false` answers neither question completely.

The same distinction applies to enabling, disabling, changing a password, or modifying access. Repeatedly aggregating an account is not a substitute for the required approved change.

## What if the lookup says the account wasn't found?

For the documented UI single-account action, if the external account is not found, the existing ISC account remains unchanged.

Stop there before drawing a deletion conclusion.

A lookup can fail to find the expected record because the account was removed, but you also need to examine the source environment, external key, lookup configuration, and the integration actor's visibility. “Not found” does not establish which explanation is correct.

The **integration actor** is the external identity or credential under which the connector performs its operation. A person with broader application access might find a record that this actor cannot see. Evidence collected under different permissions needs that context.

An explicit access-denied error is also not a successful read of an absent account. Nor does an unchanged ISC record prove that the account still exists externally.

The account-loading guidance directs deletion handling for this single-account scenario to full source aggregation. A full source aggregation reads the source's configured population; its deletion behavior and safeguards need their own review. Do not launch a broad run without checking coverage and consequences.

That boundary does not mean every connector's delta mechanism lacks deletion support. **Delta aggregation** collects supported changes rather than the full population, and a connector can support explicit deletion information there. An explicit supported deletion event and an unsuccessful single-account lookup are different evidence.

There is another action called **Remove Account**. Removing an account representation from ISC is not the same as deleting the external account. If the external account still exists, a subsequent full aggregation can represent it again. It is not a routine fix for a stale lock indicator.

## Does a working full aggregation prove this lookup will work?

No. Listing accounts and retrieving one account are separate integration operations.

An application can expose a bulk account-list interface and a different single-account interface. Each needs the relevant operation support, request construction, credentials, permissions, and response handling.

A connection test proves only what that test actually exercises. It doesn't prove that a specified account lookup is configured correctly.

For a direct-connect source, check the supported single-account operation and the exact key it expects. With Web Services SaaS, inspect the configured Get Object request and response mapping rather than assuming the Account Aggregation configuration supplies everything.

For a file-based source, a file contains the records from its export. Loading data from yesterday's file cannot answer what the live application reports today. Do not promise an on-demand live lookup when the integration has no supported live read path.

The question is not simply, “Is this source connected?” It is, “Can this configured integration perform this operation on this account and represent the returned values correctly?”

## What does “reload” mean when an API is involved?

An **API** is an interface through which software requests an operation. Its operation definition matters more than a convenient label.

Fetching ISC's stored account details is not the same request as asking the connector to reload an account. Reading an old stored record again can return the same old value without consulting CaseHub.

SailPoint also documents an asynchronous account-reload operation that reads directly through the connector and performs a one-time aggregation. **Asynchronous** means the request and the completed work are separate events. An acceptance response or task reference is not evidence that the latest source data is already represented.

Use the ISC account object ID where the chosen API requires that ID. The connector's external lookup uses the account's native identity. Substituting the employee number for either identifier is not a safe shortcut.

Keep the exact API version and operation contract in view. The identity-attribute and provisioning limits explained above are the documented limits of the UI Aggregate Account action. Do not assume that every API, custom workflow, or connector hook with “reload” in its name has an identical set of side effects.

The useful habit is to ask what the selected entry point promises, which work it initiates, and which result confirms completion.

## Choose the operation from the question

A single-account read is a good fit when an already represented account needs current supported data or status. It does not establish the state of the entire source.

If your question is “Which new accounts now exist across CaseHub?”, you need population collection, not a sequence of guesses at account keys.

If you need the complete supported group inventory, account data alone is not that inventory. An **entitlement** represents a permission or access item, such as a group. **Entitlement aggregation** collects supported access-object information; account aggregation collects account data and supported held-access values. Reading one account does not refresh every group object.

If the problem is an incorrect ownership association, inspect **account correlation**, the configured matching that associates source accounts with identities. Do not promise that the single-account UI action will re-evaluate every match or correct an administrator's manual association.

Full aggregation and **unoptimized aggregation** are not interchangeable terms either. A full read concerns population coverage. Disabling optimization allows the documented re-evaluation of unchanged accounts, including correlation, rather than skipping their further processing. A one-account status refresh is not a replacement for that source-wide task.

One narrow successful read answers a narrow question well. Expanding its meaning creates uncertainty elsewhere.

## When the displayed result doesn't make sense

Follow one identified record instead of comparing screenshots from unrelated views.

Start with the source and native account key. Then inspect what the external system returned to the integration actor, what the response mapping extracted, and what ISC actually represents.

If CaseHub returns `locked: true` but ISC still shows unlocked, investigate the supported status mapping and the completed operation's evidence. A successful network response by itself is not proof that the status was represented correctly.

If the account office becomes `HYD` but the identity office remains `BLR`, that difference matches the documented single-account UI boundary. It is not enough evidence to declare the identity profile mapping broken.

If the source's account record is current but another view is old, identify the object and freshness of that other view before concluding that collection failed. Searching ISC is not a new read of the application.

Record when the account was observed and what operation produced that observation. A read establishes what was returned at that time, under that read's scope and authority. The application can change again afterward.

There is no reason to run the entire source merely because the browser still shows an old screen, just as refreshing the browser is not a reason to claim a new source read occurred.

## Work through these results

Treat each variation separately. Keep the supplied facts; don't assume that every defect below exists in Devi's main example.

### 1. The refresh now shows locked

The supported lookup returns `locked: true`. ISC represents that status correctly. The engineer says, “The aggregation failed because Devi still can't sign in.”

What did the action actually accomplish?

**Worked reasoning:** It updated the account evidence. CaseHub was locked before the read and remains locked afterward because the read did not request an unlock. Inspect a separately approved unlock operation if removing the lock is the support decision. Sign-in failure alone does not establish aggregation failure.

### 2. The account office changes, but the identity office doesn't

The UI action updates account office to `HYD`. Identity office stays `BLR`. The existing profile maps office from this account.

Must the profile mapping be wrong?

**Worked reasoning:** No. The documented action does not synchronize new account data into identity attributes. Verify the profile's actual source and attribute mapping, then choose and verify the appropriate supported identity-update path. Do not change a correct mapping merely to make this action behave like a different operation.

### 3. The source reports no matching account

A single-account lookup returns not found for `ch-55005`. The existing ISC representation remains visible.

Is ISC proving that the external account exists?

**Worked reasoning:** No. Keeping the record unchanged is the documented behavior of this action when the account is not found. Investigate the external record, key, environment, lookup and actor visibility. If deletion handling is required, review the supported population/deletion mechanism and safeguards; don't treat the retained representation as current existence evidence.

### 4. The wrong account was selected

In this independent variation, Devi has ordinary account `ch-55005` and administrative account `ch-55005-admin`. The administrator aggregates only the latter. Its data is current; the ordinary account's old status remains.

Was the ordinary account refresh unsuccessful?

**Worked reasoning:** It wasn't the account selected. Confirm the source and external key in the operation context. Two accounts associated with one identity are still two account records. Refreshing one does not establish that the other was read.

### 5. A script receives a task reference

A script requests the documented asynchronous connector reload and receives an acceptance result with a task reference. It immediately fetches ISC's stored account details and gets the earlier value. No completion evidence has been collected.

Can the engineer conclude that the connector ignored CaseHub's new value?

**Worked reasoning:** Not yet. Request acceptance and completed aggregation are separate events. Establish the task outcome and resulting account data before diagnosing the read. Fetching stored details does not force the external lookup to finish or perform another source read.

### 6. Listing works, but looking up one account is denied

The configured account-list operation succeeds. The single-account lookup returns access denied. The application team confirms that the integration actor lacks the permission needed for that lookup interface.

Should the engineer change the account's office mapping?

**Worked reasoning:** The supplied failure occurs before a valid account payload is available for that mapping. Resolve the approved operation-specific authority with the application team and retest the supported lookup. Bulk-list success does not prove permission for another interface. Do not grant broader rights than the operation needs.

### 7. The file was uploaded this morning

A source has no live account-lookup integration. This morning, an administrator imports a file exported yesterday. Devi's account changed in the application after that export.

Does the recent import time establish current application data?

**Worked reasoning:** No. The imported evidence is bounded by the file's export time and contents. Obtain an appropriately fresh export and supported import, or design a supported live integration if that is a project requirement. A newer load timestamp does not make older source content current.

### 8. The lock is gone, but a function is still unavailable

A separately verified unlock succeeds. A subsequent supported read reports `locked: false`. Devi signs in successfully but cannot close support cases. The application team confirms that the required case-closing permission is missing.

Should another single-account aggregation grant that permission?

**Worked reasoning:** No. The read can observe supported account data; it is not the permission-grant operation. Authentication succeeded, but the application denied the function through authorization. Inspect the approved access definition and supported provisioning path, then verify delivery and the application's actual permission behavior.

## A new project asks for “one refresh button”

A project team wants a support button for an existing application. Its requirements say:

“Refresh the selected account, update the person's office and manager, unlock the account if needed, and remove the ISC record if the application says not found.”

The integration supports a single-account read and a separately authorized unlock. No automatic deletion policy has been approved. The identity profile takes office from that application's account and manager information from HR.

Explain why mapping this whole requirement to Aggregate Account is unsafe. What would you ask the team to separate, and what evidence would confirm each result?

**Worked reasoning:** First separate observation from identity evaluation and external change. The supported UI account action can update the selected account's data. It does not perform the requested identity-attribute synchronization or unlock.

Office needs the correct account input and an appropriate supported identity-update process. Manager data comes from HR, so refreshing this application cannot establish a new HR manager relationship. Establish the HR input and the process that uses it.

Unlock requires its separate supported, authorized change and target outcome. “Not found” leaves the record unchanged in this UI action; it is not an approved deletion policy or proof of external deletion.

Agree the account-selection rules, operation permissions, completion evidence, identity-value checks and deletion safeguards before combining any operations behind a button. If the project later uses an API or workflow, verify that specific operation contract and its possible consequences.

When someone says “refresh,” ask which record they mean and which result they expect. That question tells you whether to read an account, evaluate identity data, request an external change, or investigate missing evidence.
