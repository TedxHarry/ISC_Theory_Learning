# The connection works. Why does the change still fail?

An administrator opens an application successfully. SailPoint Identity Security Cloud (ISC) reports a successful connection test. An account read completes.

Then an access change fails.

These observations can all be true. They tested different things, from different places, using different authority.

Before changing a password, ask a more precise question: what operation failed, which component attempted it, and what does the available evidence actually establish?

## Give “the connection” an exact meaning

A **connector** is the integration software that communicates with a managed system. A **source** is the configured representation of that connection and its account data in ISC.

A source can contain correct credentials but point to the wrong environment. It can read accounts without permission to change them. Its connector can support one operation and not another.

There is no single condition called “everything is connected” that settles all of those questions.

A **connection test** executes the checks implemented by the selected connector. Its success means those checks succeeded under that configuration at that time. Read the result in that scope.

A subsequent operation has its own destination, inputs, privileges, and **dependencies**, the conditions and components it relies on. It can fail even though the test was accurate.

## Let's make the required change specific

Devi coordinates operations reporting, employee number `35005`. She already has account `orders-35005` in a fictional application called OrderDesk.

She can view order summaries. She now needs permission to export them.

OrderDesk represents that extra permission as `orders.export`. It is an **entitlement**, an access right that can be assigned to an account. Under this example's rules, viewing and exporting are separate permissions.

ISC has an **identity** representing Devi and a source account record representing `orders-35005`. The account is correctly associated with her identity. This association is **account correlation**; it identifies the represented owner, not a permission grant.

The source is OrderDesk Production. Its configuration selects the external workspace `Orders-Prod`. A workspace is a separately identified area of this fictional application.

An **access request** asks for particular access for a recipient. Devi's request is for Export order summaries, an **access profile** containing only `orders.export` from this source. An access profile bundles entitlements from one source.

Assume the configured review approves the request, the intended existing account is selected, and the source is configured for automatic delivery of this supported change. No account creation or custom script is required.

**Provisioning** is the work of carrying out an account or access change. Here, the required result is `orders.export` assigned to `orders-35005` in `Orders-Prod`.

That's the operation we're investigating. “OrderDesk isn't working” would be much less useful.

## Locate the software making the call

The **runtime** is the environment where connector software executes. Your browser isn't automatically that environment.

For a VA-based source, a **Virtual Appliance**, or VA, is a customer-deployed virtual machine used for integration work. A **VA cluster** groups appliances associated with sources. An operation can involve a particular running cluster member, so a check from another machine doesn't establish that member's connectivity.

A **SaaS connector** runs its connector work in SailPoint's hosted environment without a customer-deployed VA cluster for that connection. SaaS means software as a service. The business application's hosting location alone doesn't decide which connector path is configured.

**IQService** is a Windows service used by supported connectors for particular Windows-side operations. In an applicable VA-based path, the VA must reach IQService, and IQService needs its own required connection to the target.

An **API**, or application programming interface, lets software request data or actions. In an API-based integration, it can be different from the website a human uses.

Compare these conceptual paths:

```text
VA-based API operation
[ISC] -> [VA connector work] -> [Target API]

SaaS connector operation
[ISC: hosted connector work] -> [Target API]

Applicable IQService operation
[ISC] -> [VA] -> [IQService] -> [Target]
```

The arrows represent work interactions and returning results, not complete packet routes. The VA initiates its required communication with the hosted service. The picture doesn't introduce unsolicited inbound internet connections to customer servers.

Intermediaries can also be part of the configured path. A **proxy** forwards traffic on another component's behalf. A **gateway** can receive and control requests before they reach the underlying application.

With a configured web proxy route, applicable source web traffic can pass through that proxy. Supported exceptions and the actual deployment configuration matter. Don't assume that a successful direct test reproduces the integration's route.

For OrderDesk Production, assume a supported fictional VA-based connector calls the management API. Cluster `C-Order-Prod` has `va-order-01` and `va-order-02`. Operation evidence identifies `va-order-02` as the member handling this attempt, using the configured direct target path.

IQService isn't part of this OrderDesk example. Add components to an investigation because the actual operation uses them, not because their names appear elsewhere in the tenant.

## Does the address identify the right destination?

An **endpoint** is the address an integration calls. The destination can also depend on a workspace identifier, region, API path, or another resource setting.

OrderDesk Production is an ISC source label. `Orders-Prod` identifies the external workspace. The label doesn't force the endpoint or credential to select that workspace.

An **account identifier** distinguishes an account in the relevant source context. The same account string in a test workspace wouldn't prove that a production account was changed.

**DNS**, the Domain Name System, helps resolve a hostname to the network address needed to contact it. **Name resolution** is that lookup process. Different machines or network environments can use different resolvers or have different access to them.

If `va-order-02` cannot resolve the configured hostname, supplying a new OrderDesk password doesn't repair the missing lookup.

Successful resolution is only one dependency. It doesn't establish that the returned destination is intended, that the service is reachable, or that later security checks will succeed.

Check the source's actual destination and the resolution evidence from the relevant execution environment. Don't substitute a laptop result.

## Can that environment reach the required service?

**Network reachability** means the calling environment can communicate with the required destination service over the intended path.

A **port** identifies a network service endpoint on a host. The **listener** is the service accepting connections there.

A **route** determines how traffic travels toward the destination. A **firewall** controls which traffic is permitted. An **allowlist** admits specified destinations, callers, or network origins under its rules.

These controls can differ between `va-order-01` and `va-order-02`, or between a VA and an administrator's laptop.

For the example's protected web API, the intended service port could be 443. That doesn't make 443 the only port every connector needs. Directory, database, IQService, and other interfaces have their own requirements.

Nor does allowing the VA's outbound cloud communication prove target reachability. Those are different destinations.

A **timeout** means an expected response wasn't received within an allowed wait. During connection setup, it doesn't identify one unique cause. An unavailable listener, blocked traffic, routing trouble, or an unresponsive dependency can require different corrections. A “connection refused” result isn't the same observation as a name-resolution failure.

Even a successful network connection establishes only that interaction. It doesn't prove that the right service was selected or that application authentication succeeded.

Don't open every port or remove network restrictions to replace a specific reachability investigation.

## Can the caller trust the service it reached?

**Transport Layer Security**, or TLS, protects communication in transit and supports checking the server's identity.

**HTTP**, the Hypertext Transfer Protocol, is a request-and-response protocol used by web interfaces and many APIs. **HTTPS** is HTTP over TLS. A secure channel doesn't supply the application's operation privileges.

A **certificate** binds an identity, such as a hostname, to a public key under a trust model. A **certificate authority**, or CA, issues certificates. A trust chain connects the service certificate to an authority the client trusts.

For an applicable certificate check, consider the endpoint identity, validity period, trusted chain, and the relevant machine's trust configuration. Time-related validation errors also require checking the relevant clock context.

The browser can trust a certificate that the VA doesn't trust. That is a difference between execution environments, not evidence that the recipient entered the wrong password.

An approved inspection proxy can also affect which certificate a client sees. Follow the supported trust design for that route rather than assuming every connection presents the same certificate chain.

A TLS failure should lead you to the reported trust or channel problem. Disabling validation hides that protection instead of establishing a correct integration.

For an IQService operation, distinguish VA-to-IQService protection from IQService-to-target communication. One secured leg doesn't configure or prove the other.

## Who is presenting the credential?

A **credential** is proof used to establish an accepted identity or access context, such as an applicable password, token, or certificate-based credential.

**Authentication** establishes that accepted caller context. **Authorization** determines whether the caller can perform the particular action on the particular resource.

OrderDesk's integration actor is `svc-order-isc`. It uses a configured **API token**, a credential for software access to OrderDesk. Devi's `orders-35005` account is the recipient of the change, not the caller performing it.

An ISC administrator's own authority is another context. Being allowed to administer a source in ISC doesn't grant the external integration account permission to administer OrderDesk.

Tokens also have a service context. A token used to call ISC's API isn't automatically a token for OrderDesk.

Other connectors can use **OAuth 2.0**, an authorization framework under which an integration obtains or uses access tokens. A token's **scopes** describe authorized API access boundaries, but external roles, consent, account context, and resource restrictions can also matter. Here, external roles are the application's permission groupings, not ISC's role objects.

Don't infer the complete permission model from a scope name containing “write.”

Credential rejection can involve an expired or revoked token, a locked integration account, an incorrect secret, or a credential intended for another destination. Which explanation applies needs evidence.

Replacing a secret in the target doesn't automatically update a source still using the old value. Follow the supported update procedure and protect the secret while validating the result.

For IQService, the registered user admitting incoming requests, the Windows service logon account, and the source's target-management account have different roles. A successful client-authentication check at IQService doesn't settle target authorization.

## Allowed to read isn't allowed to change

**Aggregation** collects account or entitlement information into ISC. A successful read establishes the result of that collection, within its scope. It isn't a test of every possible write.

OrderDesk can permit `svc-order-isc` to read account information but refuse permission-assignment changes. It can also restrict changes to particular workspaces or resource types.

The question isn't only “Is this account privileged?” Ask whether the actual caller has the required authority for this operation on this object in this environment.

Business approval is separate. ISC approving Devi's export access doesn't change the integration actor's external privileges.

**Least privilege** means assigning only the authority needed for approved work. Adding unrestricted target administration isn't a suitable first response to an unidentified connection failure.

A connector must also support the requested operation. Permissions can't make an unimplemented operation appear.

SailPoint offers read-only connector configurations as well as configurations supporting access changes. A target API offering account disable doesn't prove that the configured ISC connector supports it.

Support can depend on account type and feature configuration. For example, the Salesforce SaaS connector's enable/disable capability excludes portal and partner users. A general “supports account management” description doesn't replace that distinction.

Check applicable source configuration, connector features, and activation or licensing conditions before treating every failed operation as a privilege defect.

## Does the operation contain valid information?

A supported operation with sufficient authority can still contain invalid data.

A **payload** is the information carried in a request. Its required fields and values depend on the target operation and the connector's mapping.

A **mapping** connects information in one representation to the field needed in another. For example, an ISC account value can supply the target's required account key.

The source's **account schema** describes its represented account fields and their relevant meanings, including which field identifies an account. A human-readable display label isn't automatically the key an API expects.

Check the source, account, entitlement reference, and required values for the actual operation. Don't repair a wrong account key by expanding privileges.

Target rules also matter. An account can be in a state that prevents a particular change; an application can require another resource first or reject an unavailable license assignment.

Connector support, valid input, target state, and external service availability are dependencies alongside network access and credentials.

They aren't mutually exclusive failure categories. One attempt can expose a missing field after an earlier credential problem is corrected. That doesn't mean the first correction was wrong.

## Passing one check doesn't cancel the others

For the approved OrderDesk change, these conditions must fit together:

| Required condition | Evidence to examine |
|---|---|
| The intended source, workspace, account, and access item are selected | Source destination settings and precise object references |
| The configured connector supports and is enabled for the change | Operation and account-type support, applicable source features and configuration |
| The required integration path is usable and protected | Relevant runtime's resolution, service connectivity, and trust results |
| The actual integration caller is accepted | Credential context and authentication evidence at the relevant service |
| That caller may perform this action on this resource | Target privileges, resource scope, and operation-specific audit detail |
| Required input and target conditions are satisfied | Mapped values, target validation, resource availability, and operation result |

This is a dependency map, not a fixed order of backend execution. A connector can reject unsupported work or invalid configuration before making a target call. A target can perform its own validation after receiving a request.

Passing authentication doesn't remove an input requirement. Correcting a mapping doesn't grant a missing external privilege. You need the conditions relevant to the selected operation, not one successful check standing in for all of them.

## Find out who produced the error

An **HTTP status code** classifies a response. Its accompanying detail and the component producing it matter.

Here are a few useful distinctions, not a complete error catalog:

| Response | Meaning to start from | What not to infer |
|---|---|---|
| 400 Bad Request | The responder identifies a client-request problem | Every 400 is a password problem |
| 401 Unauthorized | Valid authentication credentials for the resource are lacking | Devi's personal password must be wrong |
| 403 Forbidden | The responder refuses the understood request | A particular target role is definitely missing |
| 407 Proxy Authentication Required | Authentication is required to use the proxy | The target application rejected its own credential |
| 429 Too Many Requests | The responder is limiting request rate | Repeating immediately will fix the operation |

A 403 can involve a gateway or another policy boundary. Locate the responder and examine the supplied reason instead of prescribing permissions from the number alone.

A **rate limit** restricts permitted API usage. **Throttling** is the service limiting work under those rules. Follow the selected connector's documented handling and the target's current constraints; don't invent one universal delay or retry count.

Other interfaces, including IQService and directory protocols, have their own messages. Don't force them into an HTTP-code explanation.

Keep enough context to correlate evidence: source, recipient account, operation, intended environment, actual execution component, timestamp with time zone, and available request reference. A **request reference** is an identifier used to relate records for the same request where the involved systems provide it.

A missing log entry alone isn't proof that no call occurred. Logging scope, retention, and which component you inspected can affect what is visible.

## Return to Devi's failed export grant

Now add these fictional incident facts:

- Operation evidence identifies `va-order-02` and the production API destination.
- That attempt resolves the hostname and establishes the required protected connection.
- The OrderDesk audit identifies caller `svc-order-isc`, workspace `Orders-Prod`, and account `orders-35005`.
- It explicitly denies the `orders.export` assignment because this integration actor lacks the required permission-assignment privilege.
- The target confirms the entitlement remains absent.

What correction does that evidence support?

Investigate the integration actor's operation-specific target authority with the application owner. The denied write isn't explained by Devi's password, a failed DNS lookup, or an unsupported connector operation in this supplied case.

The successful read didn't prove this privilege. It exercised a different action.

The failed attempt's successful path doesn't certify every future operation or every cluster member. It establishes what happened for this attempt. Another attempt could fail earlier after a configuration change.

After the approved scoped privilege correction, recover the affected change through the supported process and verify its intended target outcome.

If those incident facts weren't supplied, the initial green connection test and successful read wouldn't be enough to select the same correction.

## Choose the next check from the evidence

An investigation shouldn't restart from zero every time an error changes.

Use the last established facts to narrow what remains unresolved:

```text
[Exact operation + intended result identified]
                      |
                      v
[Actual path and relevant evidence located]
                      |
                      v
[Enough evidence for a scoped next action?]
       | no                      | yes
       v                         v
[Get missing evidence]    [Validate scoped action]
       |                         |
       v                         v
[Reassess evidence]       [Recover or reconcile]
                                 |
                                 v
                         [Verify target outcome]
```

These are investigation decisions made by an engineer. They aren't ISC's private processing sequence. The “no” branch gathers missing evidence and returns to assessment. It doesn't authorize a change or mean that all prerequisites passed.

A scoped correction addresses the established defect without changing unrelated security or business decisions.

Suppose a corrected network route lets a previously blocked request reach the target, which then rejects its token. The new observation identifies another unresolved prerequisite. Investigate that credential context; don't undo the valid route correction merely because the whole task isn't complete yet.

## A timeout doesn't settle the outcome

An operation timing out doesn't always tell you whether the target performed the requested action.

The target can apply a change and lose the response before the integration receives it. A broader operation can also have one successful part and another failed part.

An account-creation step succeeding while an access assignment fails isn't the same as nothing happening. Nor does the failed overall result establish automatic rollback of the created account.

Before repeating work, reconcile the actual target state and the recorded operation details.

**Idempotent** describes an operation whose repeated equivalent requests have the same intended target effect as one request. That property is operation-specific. Don't assume every connector action has it, or that repeated calls produce identical responses and no additional records.

Use the documented recovery path. A retry can be appropriate, but it isn't a substitute for understanding what already changed.

Once a dependency is repaired, distinguish these outcomes:

- The integration can communicate again.
- The failed work has been recovered or otherwise reconciled.
- The intended target state has been verified.

An ISC page can still display earlier collected data. **Collected state** is information represented from a read; it isn't a continuous live target inspection. Compare its timing with the provisioning result and a relevant target check.

## Make the handoff useful to the next person

“Please check the firewall” asks another team to guess.

A useful handoff says which source operation failed, from which runtime, toward which endpoint and service, at what time, and with which relevant error. It states what was established and what remains unknown.

If a target audit confirms an authorization denial, involve the application owner with the identified caller, resource, and operation. If the runtime cannot resolve a hostname, provide that context to the team responsible for name resolution.

Ownership depends on your organization's operating model. Don't assign blame from a generic error label.

Exclude passwords, complete tokens, private keys, and unrestricted sensitive trace files. Explain credential identity and configuration context without disclosing the secret itself.

## Work through these investigations

Treat each case as a separate situation.

### 1. The same hostname works from one place

The source uses a two-member VA cluster. The laptop and `va-order-01` resolve the target hostname successfully. Operation evidence identifies `va-order-02`, whose resolver returns a name-resolution failure before any target session starts.

Which check is relevant, and would target-password rotation address the supplied defect?

**Worked reasoning:** Investigate the configured resolution path from `va-order-02`, including its resolver reachability and the intended hostname. Other machines' success doesn't establish that member's result. Target-password rotation doesn't repair a failure before target contact. Verify the supported resolution correction, then recover and check the affected operation.

### 2. Correcting trust reveals another refusal

For a separate IQService operation, a certificate-trust problem is corrected through the approved process. The next attempt establishes TLS, but IQService explicitly rejects an unregistered client user. No target request is admitted.

Did the certificate correction fail, and should you add target administration rights?

**Worked reasoning:** The new attempt establishes that the reported TLS hurdle was passed for that interaction. The supplied failure is now client registration at IQService. Correct the approved registered-user and source-credential configuration, not unrelated target privileges. A repaired prerequisite doesn't guarantee all remaining prerequisites were already satisfied.

### 3. The target rejects missing information

A supported fictional change reaches the correct target under a permitted integration actor. The target returns 400 with an explicit validation message: the required workspace identifier is missing. No change is applied.

Should you replace credentials or examine how the operation gets its required value?

**Worked reasoning:** Examine the source's operation configuration, input values, and mapping that should supply the workspace identifier. The supplied detail identifies invalid input, not credential rejection. Correct and validate that value through the supported process. The status code alone wouldn't have established this exact cause; the accompanying validation detail does.

### 4. The response came from the proxy

In another deployment, the VA uses the supported HTTP proxy path. Evidence shows a 407 response generated by the proxy, requiring its configured authentication. No request is forwarded to OrderDesk in this supplied attempt.

Which credentials and path should the investigation distinguish?

**Worked reasoning:** Investigate the approved proxy connection configuration and its supported authentication requirements. Proxy admission and OrderDesk authentication are different boundaries. Replacing the target token doesn't supply proxy authentication. The no-forwarding conclusion comes from the supplied path evidence, not from assuming every error number proves what the target did.

### 5. The change happened, but the response was lost

The recorded attempt times out. The target audit and a current target check confirm `orders.export` was assigned to `orders-35005` in `Orders-Prod` during that attempt. ISC's account page still shows an older collection.

Should you repeat the grant solely because of the timeout or the older account view?

**Worked reasoning:** No. The supplied target evidence establishes the assignment. Reconcile the tracked operation and collected view using the supported process. Neither the timeout nor older represented data proves absence. Don't create another business request or repeat effects without understanding their recovery and duplicate-handling behavior.

## Review a new project's design

A team wants ISC to disable departed contractors in a fictional hosted application called ResearchArchive.

Its existing source uses a read-only SaaS connector configuration. Account aggregation works. The application's API offers a disable operation, but the team hasn't established a supported write-capable connector path or the required external privileges for that operation.

The proposal says: “We will put administrator credentials into the current source. The green connection test and successful reads prove that this will support disable.”

What would you accept as established, what is missing, and what evidence would you request before approving the design?

**Worked reasoning:** The current configuration can perform the reported reads. Its SaaS runtime is part of that established path. Those observations don't add write capability to a read-only connector.

First establish a supported integration design for the exact disable operation and relevant account types. Then validate the actual destination, required connectivity, source configuration, external caller authority, valid operation inputs, and target outcome under that design. Applicable activation or licensing requirements also need confirmation.

Administrator credentials alone don't implement the missing operation and can introduce unnecessary exposure. A sound design needs operation-specific evidence rather than a broad promise that “the connection works.”

Explain the distinction to the team this way: “Reachability gets the integration to a service. Authentication establishes its caller context. Authorization permits an action on a resource. The connector still needs to support that action, and the request still needs valid information. We verify the intended result separately.”
