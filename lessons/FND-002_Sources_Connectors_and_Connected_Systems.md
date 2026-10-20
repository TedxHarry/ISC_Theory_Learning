# Sources, connectors, and the systems they connect to

*Lesson FND-002 · Revision 1.0*

“The finance system is connected to ISC.”

That sounds reassuring. But what does “connected” establish?

Can SailPoint Identity Security Cloud, or ISC, read the system’s accounts? Can it read their permissions? Can it create an account, remove a permission, or disable an account? Is it looking at production, a test environment, or yesterday’s exported file?

Those are different questions. A useful answer identifies the system, the information being collected, and the operations the connection actually supports.

## The finance application still lives outside ISC

Devi works in Finance. Her employee number is `20002`, and she already has an account named `fin-20002` in the organization’s production finance application. She uses it to read invoices.

The organization wants ISC to record that account and its invoice permission. It also wants approved permission changes to reach the finance application.

These are fictional records and integration conditions. We’ll follow an existing account rather than assume that connecting the application creates one.

The finance application is the **external system**: the software that stores Devi’s finance account and uses its own rules to decide what that account can do.

An **account** is a record in that system. Here, it identifies Devi as a finance user and holds information about her access.

ISC needs a representation of the system it manages. That configured representation is a **source**.

We’ll call this source `Finance-Production`. It gives ISC a defined place for this integration’s settings and collected account data.

Creating that source does not install the finance application, move its database into ISC, or create Devi’s finance account. The account already exists in the application. ISC must obtain information about it.

The **connector** supplies the integration used to read that information and carry out supported changes. Its behavior depends on the connector type and its configuration.

Keep these distinctions beside the example:

| What we’re discussing | In this example | What it tells you |
|---|---|---|
| External system | Production finance application | Where the actual finance account and application enforcement exist |
| Source | `Finance-Production` in ISC | Which configured integration and collected records you’re examining |
| Connector | The integration used by that source | How supported exchanges with the finance application are performed |
| Account in the external system | `fin-20002` | The actual record a finance operation would affect |
| Account represented in ISC | The collected `fin-20002` record under `Finance-Production` | What ISC has recorded about that source account |

If someone says “the account is correct,” ask which of the last two rows they inspected. That small question can prevent a long investigation in the wrong place.

## A connector type is not the same thing as one configured source

A connector type provides integration behavior for a kind of system or interface. A source applies that integration to a particular configured situation.

For a concrete SailPoint example, the **Web Services SaaS connector** supports account collection and supported account or access changes through configured web-service operations.

A web-service **API**, or application programming interface, is a way for software to ask another system for information or request an operation. An **endpoint** is the address used for a particular API service or operation.

Knowing that a connector supports an operation does not establish that every system’s API offers it, that the operation has been configured correctly, or that the connection has permission to execute it.

For our finance example, assume that the chosen integration supports the account read and permission-add operations we use. Its source configuration and the finance API have been prepared for those operations. This is a teaching assumption, not a statement that every finance product has the same interface.

Now imagine a separate test copy of the finance application.

You can configure a `Finance-Test` source using the same connector type while pointing it at the test system. Its connection address and integration credentials differ from production.

**Credentials** are the information the integration presents to establish who is connecting, such as an API token. The external system separately controls what that credential is allowed to do.

A test connection’s credentials should not be treated as production credentials merely because the connector type matches.

Likewise, an account named `fin-20002` in test is not the production account just because the name is identical. The environment and source context are part of identifying the record.

One source can also include many accounts and access items. You do not create a separate source for every employee or every permission.

The design question is: which system instance and data scope does this source represent?

A deliberate separation between test and production answers that question. Accidentally configuring two integrations against the same production population does not solve an account-matching problem. It introduces another configuration and another set of represented records to investigate.

## What does the source configuration need to describe?

Let’s turn “connect finance” into questions you can answer.

**Where should the integration connect?**

The system address must identify the intended environment. A working connection to a test API is still the wrong connection when the requirement concerns production.

**What may the integration read or change?**

The connector’s supported features, the source’s enabled behavior, and the external system’s permissions all matter. A credential that reads accounts may lack permission to add invoice access.

**Which records are in scope?**

The integration may cover a particular organization, tenant, business unit, or filtered population, where the connector supports that selection. A **tenant** here means a particular customer or organizational instance of a hosted service.

For example, an agreed finance scope might include one regional company but exclude another. A missing account outside that scope does not establish that collection malfunctioned.

**How should the returned information be represented?**

An **attribute** is a named piece of information on a record. Our finance account has an account identifier, an employee number, and permission information.

The **account schema** describes the account attributes ISC uses and their organization. It identifies the attributes used as the account’s ID and name and describes details such as whether an attribute can contain multiple values.

The schema concerns the representation of data. Adding an attribute to a schema does not give the integration permission to read a hidden field, and it does not create that field in the finance application.

**When should ISC obtain the data?**

Collection has to run. A **direct connection** uses configured connectivity to communicate with the system, rather than relying on an uploaded account export. Account data can be collected on demand or on a schedule. Saving connection settings is not the same event as collecting accounts.

A direct connection does not specify one universal hosting arrangement. SailPoint supports virtual-appliance-based connectors, which use a configured virtual appliance deployment, and SaaS connectors, which do not require that on-premises appliance cluster. A **virtual appliance** is software deployed as a virtual machine to provide the applicable connectivity services. The connector choice determines which arrangement applies.

These questions describe the integration’s boundaries. A source name such as `Finance-Production` is helpful, but the name is not proof that the configured address, permissions, scope, and schema agree with it.

## Follow one account from finance into ISC

**Aggregation** means collecting source data into ISC. In this walkthrough, we’re collecting account data, including the account’s represented permission values.

Devi’s existing production account contains these fictional values:

| Account attribute | Value |
|---|---|
| Account identifier | `fin-20002` |
| Employee number | `20002` |
| Permissions | `InvoiceRead` |

An **entitlement** is an access item represented from a source, such as a permission or group membership. In this application, `InvoiceRead` is the permission that allows invoice reading. Its meaning comes from the finance application’s design.

For this example, the schema and integration represent the account’s permissions as entitlement values. We are not assuming that every field called “permissions” is automatically recognized as access.

The administrator starts an account aggregation. The selected integration reads the finance records within its configured scope, using the authority available to its credential.

Devi’s record is included. ISC records the returned account information under `Finance-Production`.

What has happened so far?

ISC has obtained a representation of an existing finance account. The read itself has not granted `InvoiceRead`. The account already held that permission when it was read.

Now we need another relationship: which person does the account belong to?

An **identity** is ISC’s person-level representation. Assume Devi’s identity already exists and its employee-number attribute contains `20002`.

Where did that identity come from? In this organization, a separate source, `HR-People`, supplies worker records. It is the **authoritative source** used to establish the employee population in ISC. An **identity profile** associates that population with configuration that includes mappings for its identity attributes. A mapping specifies how an identity value is obtained; our employee-number mapping supplies `20002` from Devi’s HR record.

Authoritative describes the source’s role in establishing identities. It does not mean that source has unrestricted write access, or that every identity attribute must come from it. Mappings can use other sources where appropriate.

`Finance-Production` has a different role in this example: it supplies existing finance accounts to associate with those identities. We have not configured it as another authoritative employee population. Connecting it does not mean each finance account should create another employee identity.

**Account correlation** matches and associates a source account with an identity. Our configured comparison uses the account’s employee number and the identity’s employee number. In this example, the values uniquely match Devi.

The account becomes associated with her identity.

Notice where the responsibilities separate. The connector obtained the finance data. Correlation used account and identity information to establish the relationship. A successful account read does not, by itself, establish a correct person match.

For the successful read, finance supplies the account information, ISC represents it under the source, and the matching configuration establishes its association with Devi. If any of those facts changes, investigate that particular boundary.

If the account was collected but did not become associated with Devi, examine the matching inputs and applicable correlation behavior. Do not repair the connector merely because the person-level view is missing the account.

If ISC never collected the account, first establish whether it was included in the intended environment, scope, and collection. Correlation cannot use an account record that the relevant collection has not supplied.

## Reading access and changing access use different operations

Suppose Devi now needs permission to export invoices.

An **access request** is a request for specified access for a particular recipient. Here, the desired change is adding `InvoiceExport` to Devi’s existing finance account.

Assume the organization has made that permission requestable, the required approval is complete, and ISC has a valid instruction to deliver it. There is exactly one intended finance account in this example, `fin-20002`.

**Provisioning** carries out account or access changes through the configured fulfillment method. For this example, it submits the supported permission-add operation to finance.

Finance is now the **target system** because it is receiving the attempted change. It was the source of information in the read direction. These descriptions refer to the direction of the work; we have not introduced a second finance application.

Before the write can accomplish its purpose, the integration must support the particular operation, provisioning must be enabled and configured as required, the correct account and permission must be identified, and the external system must allow the action.

That last condition is easy to overlook. The credential that successfully read `fin-20002` may still be forbidden from changing its permissions.

In the successful variation, finance accepts the operation and records `InvoiceExport` on the intended account.

In the rejected variation, finance refuses it because the integration credential lacks the required write permission. The earlier account aggregation can still have succeeded. The approval also remains a completed business decision. Neither fact overrides the rejection.

You would inspect the provisioning activity for the relevant recipient, source, account, operation, and reported result, then obtain the target evidence needed to establish what actually changed.

A later collection can supply an updated observation of the account. Do not assume every write automatically starts a complete account aggregation or immediately refreshes every ISC view.

And if Devi still cannot export invoices after the permission has been confirmed, the next question concerns the application’s requirements for that operation. This example establishes a permission change, not a universal guarantee about sessions, account restrictions, or every application rule.

Compare the collected-account path with the separately authorized change path:

```text
READ: collect an existing finance account

Production finance application
  Account fin-20002, permission InvoiceRead
            |
            | Connector reads data within configured scope
            v
ISC source: Finance-Production
  Collected account fin-20002, employee number 20002
            |
            | Correlation finds the intended unique match
            v
ISC identity: Devi, employee number 20002
  Finance account associated with this identity


WRITE: attempt a separately authorized permission change

ISC has a valid instruction to add InvoiceExport
  Selected source: Finance-Production
  Selected existing account: fin-20002
            |
            | Supported, enabled, configured provisioning
            | Connector submits the permitted operation
            v
Production finance application
  Accepts or rejects the change under its own requirements
            |
            | Operation response / reported result
            v
ISC activity information

Human follow-up:
  Inspect the result and relevant current target evidence.
  Check later collected data separately.
```

The downward arrows show information or an operation progressing through the stated path. They do not show private SailPoint services, network placement, or a guaranteed execution time.

The read and write are separate operations. The identity’s position in the read diagram does not make account correlation the trigger for every write.

## What changes when the input is a file?

Not every system is connected through a live API.

Consider a supplier portal. Its administrators provide an account export as a CSV file, a file containing rows and columns of data. ISC has a separate source named `Supplier-Portal-File` to represent that dataset.

Devi also has an existing portal account, `supplier-20002`. The file includes her employee number and portal permissions.

For this source, the configured **flat file connection** reads the supplied file. The file-based collection is disconnected from the portal’s running account-management interface.

Trace the information’s age:

- At 09:00, the portal administrator exports the accounts.
- At 11:00, someone changes Devi’s portal permission in the portal.
- At 12:00, the unchanged 09:00 file is imported into ISC.

All times belong to the same fictional day and time zone.

Which state can that import tell ISC about?

It supplies the exported values. Importing the file at 12:00 does not make its contents a 12:00 observation of the portal. The 11:00 change is absent unless the data supplied to ISC includes it.

This is why you ask when a file was produced as well as when it was imported.

Now suppose an access change is approved for that portal.

Uploading a changed CSV into this read-only connection does not write the requested change into the portal. It changes the information supplied to ISC. Depending on the source’s wider configuration, imported changes can also affect downstream identity or access processing. A file import is not a harmless way to pretend a target change happened.

The real portal change still needs an agreed delivery method.

ISC supports manual provisioning arrangements for applicable sources and actions. A manual provisioning task records work that a person must perform. For tasks involving entitlements, assignment goes to the entitlement owner, with the source owner as fallback.

An **entitlement owner** is the assigned owner of that access item. A **source owner** is the person assigned ownership of the source in ISC. Those assignments help route work; they do not automatically give someone administrative permission in the portal.

For a supported configured manual path, the assigned person performs the change in the portal and records completion. You still distinguish the task’s completion record from evidence of the correct current portal state.

A new export and import can then bring the changed information into ISC. They are additional steps, not consequences guaranteed merely by closing the task.

The portal remains manageable as an access-governance responsibility even when automatic writes are unavailable. The operating design must account for who makes changes, how they are checked, and how ISC receives refreshed information.

## Does “read-only” mean the connection is broken?

No. It can describe the intended capability.

A source configured to collect accounts and access data can support visibility and applicable reviews without directly executing target changes. Whether a particular review or request process is available still depends on the organization’s features and configuration.

The question is whether the connection meets the agreed requirement.

If the requirement is “show the portal’s exported accounts for review,” the file source may satisfy the collection portion.

If the requirement is “remove a portal permission automatically,” that same read-only file import does not supply the needed write mechanism.

Be precise about operations too. A connector supporting account updates does not mean that it supports deletion, every attribute update, or every type of membership change.

Disabling an account and deleting an account are different operations. A design that requires one cannot be accepted merely because the connector supports the other.

Before promising an integration, compare the required operations with the selected connector’s documented features, prerequisites, and restrictions. Then check the actual source configuration and the external system’s API and permissions.

A product name on a connector list is the beginning of that evaluation.

## What are you seeing on the ISC screen?

Suppose you open `Finance-Production` and see the account `fin-20002`.

The interface is displaying the ISC account representation associated with that source. It is not necessarily opening the finance application and querying the account at that moment.

Open Devi’s identity instead, and you see the person-level context and the accounts associated with it.

Open provisioning activity, and you examine information about attempted changes and their reported results.

These views answer different questions:

| What you need to establish | Evidence to examine | What that evidence does not establish alone |
|---|---|---|
| Which environment and scope the integration is intended to use | Source configuration, connection address, and relevant scope settings | That every expected record was successfully collected |
| Whether the relevant collection supplied Devi’s account | Account record and relevant aggregation history | That the account is associated with the correct identity |
| Whether the account is associated with Devi | The source account’s association and Devi’s identity context | That a new permission was delivered |
| What happened to a permission-add attempt | Relevant provisioning activity and any error or task details | That the current application permits every intended operation |
| Whether the permission is now on the correct production account | Relevant current evidence from production finance | That ISC’s collected representation has already caught up |

A successful **connection test** checks the connector’s configured test behavior. Treat it as that test’s result, not proof that every account, entitlement, and provisioning operation works.

The back-end work here consists of the configured collection, matching, and change processing, together with the external system’s handling of the operations it receives. The front end lets you inspect representations and activity from that work.

The screen is useful because it exposes evidence. Understanding what produced that evidence is what lets you interpret it.

## Work through these situations

**1. A test account looks correct.**

The `Finance-Test` source shows `fin-20002` with `InvoiceExport`. A production user still cannot export invoices. Both sources use the same connector type.

What has the test observation established? What production evidence is still missing?

**2. The account was collected, but the person’s view is incomplete.**

The `Finance-Production` source contains Devi’s account. It is not associated with her identity. Its employee-number field is empty.

Should you conclude that the connection failed? Does the empty field establish that no applicable matching behavior can find an identity?

**3. The latest import contains old information.**

An account export was produced at 09:00. A portal permission was removed at 11:00. The unchanged export was successfully imported at 12:00.

A colleague proposes editing that file so ISC will “remove the permission in the portal.” Explain what is wrong with that proposal and how to obtain useful evidence.

**4. Reading succeeds and writing fails.**

The finance account aggregation succeeds. The approved permission-add operation reaches finance, but finance rejects it because the integration credential lacks write permission.

Would another aggregation or another business approval resolve the supplied cause? What should the teams investigate?

**5. “Account management is supported.”**

A project requires account deletion. The selected connector’s documentation supports disabling accounts but does not support deleting them.

Can the project accept automatic deletion as covered? What decision is needed before the integration can meet the requirement?

## Compare your reasoning

**For the test account:** You have information about the test environment’s represented account. Matching names and connector types do not turn that into production evidence. Identify the production source and connection address, the actual production account, the relevant permission-change result, and current production permission information. Investigate application behavior only in the environment the user is actually using.

**For the missing association:** Collection of the account is established. The expected relationship is unresolved. The empty employee number prevents that particular employee-number comparison from establishing a match, but it does not describe every configured or default matching behavior. Inspect the account’s current association, all applicable matching logic, and the corresponding identity values. Repair verified data or configuration problems through the appropriate owners rather than assuming the connector cannot read accounts.

**For the old file:** Successful import establishes that the supplied data was loaded; it does not make the export current. Editing a read-only input does not issue a permission-removal operation to the portal and can misrepresent the observed state. Here, the supplied facts say the portal change happened at 11:00. Obtain relevant current portal evidence and a refreshed export that includes it, then check the subsequent import. If the removal had not actually happened, it would need a real supported change path, not a fabricated observation.

**For the rejected write:** Neither another read nor another approval supplies the missing write authority. The application and integration teams should check the exact attempted operation, the credential’s allowed actions, the source’s required configuration, and the external system’s requirements. Any permission correction should be authorized and limited to the needed operation, not an automatic grant of unrestricted administration. After correction, use the appropriate controlled retry or resubmission process and verify the actual outcome. Do not assume retries occur forever or that the previous approval caused a successful change.

**For the deletion requirement:** Disabling does not meet a deletion requirement simply because both concern an account. The teams need an agreed supported deletion method or an explicitly approved change to the business requirement. They must assess what evidence will confirm the chosen outcome. A connector’s broad label cannot fill the documented capability gap.

## Take an unfamiliar system and draw its boundaries

Choose a system you know, such as a learning platform or a support application.

Describe where its real accounts live and what one source in ISC would represent. Identify the integration method, the population being collected, and the specific operations the organization needs.

Then explain two paths in your own words:

How would an existing account become visible under the source and associated with a person?

How would an approved access change reach the external system, and what would you inspect to establish its result?

If information is missing, name it. “We still need to verify whether this connector can remove that membership” is a useful engineering conclusion. “It’s connected, so everything should work” leaves the actual requirement unanswered.
