# SaaS connectors: where does the connection work happen?

A project application opens in your browser. Its vendor hosts it in the cloud. Does that mean SailPoint Identity Security Cloud (ISC) can manage its accounts without an appliance in your organization's network?

You can't answer that from the application's location alone. You need to know which connector the ISC source uses and where that connector runs.

A **connector** is the integration software that communicates with a managed system. It understands the supported ways to read account information and, where supported, send changes. A **source** is the configured representation of that connection and its account data inside ISC.

The same business application can have different supported connector options. Those options can use different execution paths, authentication settings, and supported features. Choosing the application's name is only the beginning of the connection design.

## Two uses of “SaaS” that we need to keep apart

**Software as a service**, or SaaS, describes software operated as a hosted service by its vendor. Your organization uses the service rather than running the whole application itself.

A **SaaS connector** describes a particular ISC integration path. Its connector work runs in SailPoint's hosted environment, without a customer-deployed Virtual Appliance cluster for that connection. The **runtime** is the environment where the connector software executes.

A **Virtual Appliance**, or VA, is a customer-deployed virtual machine used for VA-based integration work. A **VA cluster** groups appliances for sources associated with that cluster. In that path, connector work uses the VA environment to communicate with the managed system.

So there are two different questions:

- Who hosts the business application?
- Where does this source's connector work execute?

A cloud-hosted application can be reached through a VA-based connector. The presence of “cloud” in an application's name doesn't select the execution path.

Conversely, a source configured with a supported SaaS connector doesn't need a VA cluster simply because another source in the tenant uses one. An **ISC tenant** is your organization's environment in the hosted ISC service. One tenant can contain sources using different connection paths.

## Put the two paths beside each other

An **API**, short for application programming interface, is an interface software uses to request data or actions from another system. An application can expose an API for account management as well as a browser interface for human users.

For an API-based integration, the conceptual paths look like this:

```text
SaaS connector path

[ISC: hosted connector runtime]
              |
              | API calls and responses
              v
[External application's API]


VA-based connector path

[ISC: hosted service]
              |
              | work and results
              v
[Customer VA cluster: connector work]
              |
              | API calls and responses
              v
[External application's API]
```

Each vertical line represents an interaction and its returning information, not a one-way packet stream. In the VA path, the VA initiates its required cloud communication; the diagram doesn't introduce unsolicited inbound connections from ISC.

The lower API interaction is an example of an API-based VA connector. VA-based connectors also use other documented interfaces. Don't read this picture as a claim that every managed system has the same API.

The difference is the connector's execution boundary. In the first path, your organization doesn't provide a VA for this connection. In the second, the VA's hosting and connectivity are part of the path.

Neither picture removes the external application. Its API still has to be available, accept the integration's credentials, and permit the requested operation.

## Let's give the connection an actual job

Devi works in project coordination, employee number `33003`. She already has account `project-33003` in a fictional cloud application called ProjectBoard. She needs permission to view project records.

ProjectBoard's production workspace is `Delivery-Prod`. A workspace is a separately identified area of that application. The organization also has a test workspace, `Delivery-Test`.

In this example, ProjectBoard offers an account-management API reachable from the supported SailPoint-hosted connector environment. The selected fictional SaaS connector supports reading accounts and adding or removing the access value `project.view`.

That value is an **entitlement**: an access right that can be assigned to an account. Under ProjectBoard's fictional rules, `project.view` allows viewing project records, not editing them.

ISC already has an **identity** representing Devi and a source account record representing her ProjectBoard account. The account is correctly associated with her identity. That association is called **account correlation**. It establishes which represented person the account belongs to; it doesn't grant the account a permission.

The relevant ISC source is named ProjectBoard Production. Its configuration points to `Delivery-Prod`.

Those are example assumptions, not claims that ProjectBoard is an available SailPoint connector or that all cloud applications support these operations.

## What does the source configuration actually contribute?

The connector supplies the integration's supported behavior. The source configuration supplies the details needed to use that behavior against the intended system.

For ProjectBoard Production, those details answer questions like these:

| Question | Example information | Why it matters |
|---|---|---|
| Which external environment? | Production API endpoint and workspace `Delivery-Prod` | A valid connection to test would still be the wrong destination |
| Which integration actor? | Application client `isc-project-prod` | The external system needs to identify the software making the call |
| How does it prove authority to connect? | An API token stored through the supported secret setting | A source name or administrator's browser session isn't that proof |
| What can that actor do? | Read accounts and change the relevant access assignments | Reading successfully doesn't establish permission to write |
| How are returned records understood? | Account schema and account identifier | ISC must distinguish accounts and interpret their returned fields |
| Which operations are available? | Account reads and supported entitlement changes | Credentials cannot add an operation the connector doesn't implement |

An **endpoint** is the address an integration calls. Its destination can depend on more than a hostname: a workspace, organization identifier, region, or path can matter too. Read the relevant connector's requirements instead of assuming every application identifies production in the same way.

An **account schema** describes the fields ISC expects in account records and their relevant meanings, including which field identifies an account. It helps ISC interpret returned data. It doesn't create the API route or give the integration permission to read that data.

A source display name is a label inside ISC. Renaming a source to ProjectBoard Production doesn't turn test credentials into production credentials or redirect an endpoint.

## Whose credentials are these?

There are three actors in the example.

Devi's account, `project-33003`, receives the access. The application client, `isc-project-prod`, performs integration operations. An ISC administrator configures the source.

Those actors don't acquire one another's authority.

The integration doesn't use Devi's password in this example. It presents an **API token**, a credential the external application accepts for software access. Treat that token as a secret, not as a value to paste into a screenshot, lesson, or support conversation.

This is a credential for ProjectBoard's API. A token that lets someone call ISC's own API doesn't automatically authorize that person or integration to call ProjectBoard. Each service checks authority at its own boundary.

**Authentication** establishes the caller's accepted identity or credential context. **Authorization** determines whether that caller can perform the particular action on the particular resource.

ProjectBoard can accept the token and allow account reads while refusing access-assignment changes. A valid credential and sufficient operation privileges are separate requirements.

Real connectors can use different supported authentication methods. With **OAuth 2.0**, an authorization framework, the integration obtains or uses access tokens under the application's supported grant and permission model. A **client ID** identifies a registered application; a **client secret** is a secret credential used in applicable authentication flows. A client ID alone isn't a password.

An access token can carry **scopes**, meaning limits on the API access authorized for that token. External application roles, consent, resource restrictions, or the user context behind a token can also affect effective permissions. Don't reduce authorization to “the scope text contains write.”

A **refresh token**, where the selected method supports it, can be used to obtain another access token. It isn't interchangeable with an access token or a client secret. Not every connector uses refresh tokens, and not every token renews automatically.

For ProjectBoard, keep the model simple: the example uses a configured API token. It doesn't silently switch to an OAuth refresh flow when that token becomes invalid.

## Follow an account read into ISC

**Aggregation** is the process of collecting account or entitlement information from a source into ISC. An account aggregation reads account information; it isn't an instruction to grant access.

Suppose an account aggregation starts for ProjectBoard Production. It could be started through configured scheduling or an authorized on-demand action. A user opening an already collected account record isn't, by itself, a fresh aggregation.

Conceptually, the source's selected connector uses the configured production destination and integration credentials to request account data. ProjectBoard checks the call under its API rules and returns the information the integration is allowed to read.

The connector interprets the response using its supported integration behavior and the source's applicable schema. ISC then has collected information to represent the source accounts.

The **account identifier** is the value that distinguishes the account within the relevant source. In this example, `project-33003` identifies Devi's ProjectBoard account. Her employee number is a separate person-related value. Matching strings across unrelated fields isn't a substitute for the configured correlation logic.

If ProjectBoard returns accounts in pages, **pagination** means the integration must obtain the relevant pages rather than treat the first response as the entire account population. Filters and API permissions can also limit what it can see.

That doesn't mean every connector uses pagination or the same page size. It means a successful API response and a complete intended collection are different claims.

Once collected, account data supports ISC's identity and access view. It doesn't move ProjectBoard's application into ISC. ProjectBoard remains the system holding and enforcing the actual permission.

## Now follow the access change in the other direction

An **access request** asks for particular access for a recipient. It records what is wanted; it isn't the external permission itself.

For this example, ISC has a requestable **access profile**, a bundle of entitlements from one source. The profile is named View projects and contains only `project.view` from ProjectBoard Production. The request is for Devi and her existing, correctly selected account `project-33003`.

Assume the configured request review approves it, the source is configured for the supported change, and no account creation or additional access dependency is needed.

**Provisioning** is the work of carrying out an account or access change. Here, the supported operation is adding `project.view` to the existing account.

The two directions can be pictured together:

```text
READ: observe the external account

[ProjectBoard: project-33003]
              |
              | account data through SaaS connector
              v
[ISC: collected account representation]


CHANGE: deliver an approved access assignment

[ISC: supported provisioning work]
              |
              | SaaS connector calls production API
              v
[ProjectBoard: project-33003]
              |
              | target accepts and applies change
              v
[project.view held by external account]
```

These are different operations, not a mandatory repeating cycle. The lower path assumes the prerequisites and successful target result stated here. The diagram doesn't promise that every approval becomes a successful API call.

ISC prepares the applicable supported change for the identified source and account. Connector work runs in the hosted SaaS connector environment and communicates with ProjectBoard's API.

ProjectBoard evaluates the integration actor's authority to make that change. If the request is valid, authorized, and accepted under the application's rules, it applies the entitlement assignment. The connector returns a result for ISC's operation tracking.

Approval answered whether the organization permitted Devi to receive the access. ProjectBoard's API authorization answers whether the integration can perform the operation. One doesn't replace the other.

There is no customer VA in this example's path. There is still a recipient, an operation, a destination, and an external authorization decision.

For a removal, the intended change is different: remove `project.view` from the identified account through the supported operation. A decision that access should end isn't the removal itself. The connection still needs authority to perform that operation, and you still need evidence of the target outcome. Where the connector runs doesn't decide whether Devi should retain access.

## Where does the browser fit?

Your browser displays ISC pages and sends authorized actions to the hosted service. It isn't the connector runtime that performs the subsequent ProjectBoard integration work.

An ISC account page shows information represented in ISC. The record can remain visible after the last successful collection, including while a later connection attempt fails.

A provisioning activity view shows information about the tracked operation: its source, recipient, action, progress, result, and available error detail. That evidence helps you establish what ISC recorded about the attempted change.

Neither screen is a continuous view inside every external API call.

Suppose ProjectBoard confirms `project.view` on `project-33003`, but an ISC account page still shows the earlier collection. Compare the operation details, target evidence, and the relevant collection or refresh timing. Don't add the entitlement again merely because one screen hasn't reflected the change.

Different connectors have different post-change behavior. An operation result, a later collected account view, and the employee's ability to perform a business action need to be interpreted separately.

Even a correctly assigned entitlement doesn't prove that an unrelated sign-in restriction, application license, or business-data rule has been satisfied. Those checks belong to the actual application's access model.

## “Connected” needs a question after it

Connected to what, as whom, and for which operation?

A connection test exercises the checks implemented by that connector. Its success establishes those checks succeeded under that configuration at that time. It isn't evidence that every account can be read, every resource can be changed, or every later call will work.

Use evidence at the level of the question:

| Observation | What you can establish | What you still need to check |
|---|---|---|
| An administrator opens ProjectBoard in a browser | That browser session reached the application's human interface | Hosted connector API reachability and integration authority |
| The source connection test succeeds | The connector's test checks succeeded | Intended destination and actual read/write operation coverage |
| An account aggregation completes | That collection completed as reported | Intended population, filters, identifiers, and relevant data |
| Request review approves View projects | The configured business review allowed the assignment | Supported delivery, API result, and target account state |
| An operation reports a target permission error | The available error identifies an authorization problem in that operation | Correct caller, destination, required privilege, and affected work |
| ProjectBoard confirms the intended account holds the entitlement | That target assignment exists when checked | Whether ISC's represented view is current and the intended business action works |

Don't use the table as a fixed order of diagnostic steps. Choose the evidence that answers the unresolved question.

## What hasn't disappeared just because there's no VA?

SailPoint operates the hosted connector runtime. Your organization still owns the connection design and the external integration setup it controls.

Someone must maintain the correct application registration or service account, its approved privileges, its credentials, and its intended resource scope. A service account is a dedicated account used by software rather than a person's everyday login. The exact supported caller model depends on the application. Someone must also coordinate relevant target changes with the application owner.

**Credential rotation** replaces a credential. If an API token is replaced and the old token is revoked, a source still configured with the old token doesn't become current just because the replacement exists in the external application.

Follow the supported credential-update procedure for the selected connector and validate the affected operations. Don't assume a successful read proves the write path survived the change.

External API restrictions still matter. An **allowlist** is a rule admitting only specified callers or network origins. A laptop can be allowed while the hosted connector's calls are refused. Establish the actual source of the failed call and use current supported connectivity guidance; don't guess outbound IP addresses or remove all restrictions.

A private API available only inside an organization's intranet isn't made reachable by choosing a SaaS connector. The supported connection path must actually reach the required interface.

This is also why a public browser sign-in page isn't enough. The account-management API can have different addresses, restrictions, and credentials.

## When the API slows down or stops answering

A **rate limit** restricts how many API calls a caller can make within the target's rules. **Throttling** is the target limiting or refusing work when those rules are exceeded.

Suppose ProjectBoard returns a throttling response after part of a collection. That supplied response identifies a capacity or request-rate boundary; it doesn't establish that Devi left the company or that her account was deleted.

Inspect the operation result, the affected scope, and the connector's documented handling. Retry behavior and recovery aren't universal. Adding a VA wouldn't automatically increase an external application's API allowance.

A **timeout** means an expected response wasn't received within the allowed wait. For a change operation, that alone doesn't establish whether the target applied the change.

If the target applied `project.view` but its response didn't reach the integration, blindly repeating work assumes facts you haven't checked. Reconcile target state and available activity evidence before selecting the supported recovery action.

After a dependency is corrected, verify the affected work. Restoring connectivity or replacing a token repairs a prerequisite; it doesn't retroactively prove that every failed read or write completed.

## A SaaS path doesn't guarantee a write-capable source

Where the connector runs and what it can do are separate dimensions.

SailPoint offers SaaS-based read-only connector configurations as well as configurations with deeper management capabilities. Read-only collection can support visibility without automatically provisioning changes.

Even a write-capable connector has an operation-specific feature list. Supporting account creation doesn't prove support for every account type, group association, disable operation, or password action.

For example, current Salesforce SaaS documentation distinguishes supported account-management operations from exceptions for particular user types. The lesson here isn't to memorize its feature table. Before designing a change, check the precise operation, account type, target requirements, and applicable feature activation.

A connector's advertised operation support is one prerequisite. Source configuration, external privileges, valid input, and applicable licensing or activation requirements still have to fit.

Giving an integration unrestricted administrator privileges isn't a way to add a missing connector operation.

## What changes when an existing source moves away from a VA?

SailPoint provides a supported VA-to-SaaS migration process for listed sources. That isn't a universal conversion switch for every connector.

In that process, configuration is prepared on a draft while the live source continues operating. Encrypted connection values need to be entered again for the new path. Applying the migration is permanent, not an experiment with a guaranteed undo button.

The account schema also needs review. Retained configuration doesn't mean every attribute, data type, authentication option, or feature behaves identically across the two connector implementations.

A **dependency** is something another configuration or operation relies on. Attribute mappings, correlation settings, and provisioning configuration can depend on schema fields. Changing a field's type or meaning can therefore affect more than the connection test.

A migration review should establish destination, credentials, supported operations, account interpretation, and scheduling effects before the change is applied. Timing deserves attention because the VA cluster's time zone and the SaaS connection's time zone can differ.

Nor does migrating one source authorize deleting the old VA cluster. Other sources can still use that cluster. Identify its remaining associations before making a separate infrastructure decision.

The practical question is “Does this supported new path preserve our required behavior?” not “Can we make the VA disappear?”

## Work through these situations

Treat the situations below as separate variations, not one incident timeline.

### 1. The application is already in the cloud

A cloud application has a source configured with a VA-based connector. Its documentation requires a VA cluster. A colleague says the cluster can be retired because the application vendor hosts the application.

What evidence decides whether this connection needs a VA?

**Worked reasoning:** The configured connector's execution mode and requirements decide the current path. The application's hosting location doesn't replace those requirements. Check whether a supported SaaS option and migration route exist, then review their conditions. Until a supported change is completed, the existing VA dependency remains.

### 2. Reading works; adding access fails

ProjectBoard Production reads Devi's account successfully. The change to add `project.view` fails. The supplied target audit record identifies `isc-project-prod`, workspace `Delivery-Prod`, and an explicit denial because access-assignment changes aren't permitted for that caller. The target confirms the entitlement is absent.

Should you change Devi's password, reapprove her request, or investigate the integration's permissions?

**Worked reasoning:** Investigate the integration's operation-specific authority. The supplied evidence identifies the correct production caller and an authorization denial. The successful read only proves read access. Devi's password isn't the credential used here, and business approval doesn't supply the missing API privilege. Validate the required correction with the application owner using **least privilege**: grant only the authority needed for the approved operations. Recover through the supported process and verify the target result.

### 3. The write succeeded in the wrong workspace

In a separate test, the source is labeled ProjectBoard Production, but its configuration points to `Delivery-Test`. That workspace contains a test account also named `project-33003`. The API accepts the write there. Production remains unchanged.

Did the successful call establish a correct production grant?

**Worked reasoning:** No. It establishes a change in the configured test destination. The account string alone doesn't identify its workspace. Check destination configuration and target audit context alongside source and account identifiers. Correct the configuration through change control, review the unintended test change, and separately verify the required production outcome. A label change alone wouldn't repair the destination.

### 4. The application owner rotated the token

ProjectBoard revokes the old integration token after creating its replacement. The source still contains the old token. The target's supplied error says that credential is no longer accepted.

Would adding another VA solve this?

**Worked reasoning:** No. This source uses the SaaS path, and the supplied failure is credential rejection. Update the secret through the supported connector procedure and validate the affected operations. Don't expose the secret while collecting evidence. Restoring valid authentication doesn't by itself establish that earlier failed work has completed.

### 5. The first page came back

The fictional API returns 100 account records and a continuation marker indicating more results exist. A later call receives a throttling response. No completed collection result is supplied. Someone concludes that all accounts missing from the first page were removed from ProjectBoard.

Is that conclusion supported?

**Worked reasoning:** No. The returned page is only part of the population, and the continuation marker explicitly establishes more results. Throttling explains an interrupted attempt, not account deletion. Investigate collection completeness, target limits, filters, and supported recovery. The facts don't establish how ISC will treat absent records in a completed aggregation, so don't invent a deletion outcome.

### 6. The migration test is green

An eligible source's migration draft passes its connection test. It hasn't been applied. A second production source still uses the existing VA cluster. A colleague proposes applying the migration immediately and deleting the cluster afterward.

What remains unresolved?

**Worked reasoning:** The test doesn't validate all required reads, writes, schema dependencies, or scheduling effects. Review those conditions and the non-reversible migration before approval. The draft hasn't replaced the live path yet. Even after this source migrates, the second source still needs its VA path; deleting the cluster would be a different, damaging change.

## Try the same reasoning on a different application

A payroll provider hosts its application in the cloud. Human users sign in through a public website. Its account-management API is available only through a private network route from your organization.

The existing integration uses a supported VA-based connector on that route. A new design proposes a SaaS connector running in SailPoint's hosted environment, but supplies no supported route from that environment to the private API.

The design also says: “The connection test will prove every payroll access change works.”

Explain the two gaps and what evidence a sound design would need.

**Worked reasoning:** First, application hosting doesn't establish connector reachability. The proposed runtime needs a supported path to the actual management API. A public human website doesn't provide that path. Validate the supported connector and connectivity design; otherwise retain a suitable supported integration path rather than assuming a private interface is reachable.

Second, a connection test proves its implemented checks, not every business operation. The design needs evidence for required account types, read/write capabilities, external integration permissions, correct production destination, representative operation outcomes, and target verification.

You could explain the distinction this way: “A SaaS connector removes the customer VA from that supported connection path. It doesn't remove the target API, the integration's permissions, or the need to prove the intended change on the intended account.”
