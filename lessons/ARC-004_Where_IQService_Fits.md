# Where does IQService fit?

An access change is approved in SailPoint Identity Security Cloud (ISC). The integration appliance appears healthy. Yet the change fails before it reaches Active Directory, the directory holding the employee's account and group membership.

A message mentions IQService. What is this extra service doing in the path, and why didn't a healthy appliance prevent the failure?

**IQService**, also called the Integration Service, is a Windows service used by supported connectors for operations that need its Windows-side capabilities. A Windows service is a program managed by Windows that can run without someone keeping an interactive desktop session open.

IQService gives the integration access to supported Windows APIs and related operations. An **API**, or application programming interface, is an interface software uses to request information or actions from another component.

Installing IQService doesn't move ISC onto a Windows server. It adds a component to particular integration paths.

## Start with the job, not the server name

A **connector** is the integration software that communicates with a managed system. A **source** is the configured representation of that connection and its account data inside ISC.

Whether IQService is needed depends on the connector and the operation.

For the ISC Active Directory connector, IQService is required for provisioning. **Provisioning** means carrying out account or access changes, such as creating an account or changing a supported group assignment. The connector also uses IQService when reading particular information, such as Terminal Services attributes related to Windows remote-session use.

**Aggregation** means collecting account or entitlement information into ISC. It reads information rather than instructing the target to grant access. But “this is a read” doesn't, by itself, establish that IQService is outside the path. The fields and connector features involved matter.

Those attributes are feature-specific reads with an IQService dependency. You don't need that feature in your environment for ordinary group provisioning to need IQService.

Don't turn these Active Directory requirements into a rule for every ISC connector. A supported SaaS connector can run its integration work in SailPoint's hosted environment without this Windows service. Another connector can have its own operation-specific requirements.

The question to ask is: “For this configured source, which component performs the operation we're investigating?”

## Give the components different jobs

ISC's hosted service holds the relevant configuration, represented identity information, access decisions, and operation tracking.

A **Virtual Appliance**, or VA, is a customer-deployed virtual machine used for VA-based integration work. A **VA cluster** groups appliances associated with sources. The VA environment performs connector work and communicates with the required systems.

IQService runs as a service on a supported Windows server with connectivity to the targets it manages. It performs the supported Windows-side work requested through the integration.

The **target system** holds the account or permission being managed. For Active Directory, a **domain controller** is a server that provides the directory service for a domain, including its account and group information.

These roles aren't interchangeable.

IQService isn't a VA installed on Windows. Adding it doesn't remove the VA dependency from a VA-based source. It also isn't the domain controller itself: a Windows server hosting IQService needs appropriate connectivity to the relevant target.

Nor does IQService decide whether an employee should receive access. It participates in executing supported work after the applicable ISC decisions and preparation.

## Follow one group assignment

Devi is an engineering coordinator, employee number `34004`. She already has Active Directory account `eng-34004`. She needs access to read engineering documents.

In this fictional environment, membership in the directory security group `ENG-Docs-Readers` provides the relevant document-reading permission, subject to the document system's own access checks.

A **group** is a directory object that collects members. ISC can represent the relevant group membership as an **entitlement**, an access right assignable to an account. The group, the member account, and Devi's person record are different objects.

ISC has an **identity** representing Devi and a source account record representing `eng-34004`. The account is correctly associated with her identity. That relationship is **account correlation**. It identifies the represented owner; it doesn't grant group membership.

The source is Engineering Directory. It uses the ISC Active Directory connector and VA cluster `C-Eng-Prod`. That cluster has two appliances, `va-eng-01` and `va-eng-02`.

The source's IQService settings point to Windows host `iq-win-01.corp.example` and its configured secure listening port. This hostname is fictional. A **port** identifies a network service endpoint on a host; the source configuration must select the port on which the intended service actually listens. The **listener** is the endpoint accepting those network connections.

An **access request** asks for particular access for a recipient. Here, Devi requests Read engineering documents, an **access profile** containing only the relevant group entitlement from Engineering Directory. An access profile bundles related entitlements from one source.

Assume the request passes its configured review, the intended account is selected, automatic provisioning is enabled for this supported operation, and no account creation or custom script is needed.

The required external change is precise: add `eng-34004` to `ENG-Docs-Readers` in the intended production directory.

## Here's the path for that operation

```text
[ISC: approved, supported access change]
                |
                | work and returned results
                v
[VA: Active Directory connector work]
                |
                | request to configured IQService
                v
[Windows host: IQService]
                |
                | supported directory operation
                v
[Active Directory: account + group]
```

This is the conceptual path for the stated group-provisioning operation, not a map of every read or every packet. Results and errors return through the integration path.

The VA initiates its required communication with ISC's hosted service. A request originating in ISC doesn't imply a new unsolicited inbound connection from the internet to the Windows server.

For the Windows-side interaction, the VA needs to reach the configured IQService endpoint. IQService then needs the connectivity and authority required for its target operation. Those are separate network boundaries.

Conceptually, ISC prepares the supported change for the identified source and account. Connector work in the VA environment sends the applicable request to IQService. IQService accepts only requests meeting its configured security requirements, then performs the supported target work under the applicable credentials.

Active Directory evaluates the target operation. With valid input, sufficient authority, and the required dependencies available, the membership change is applied. The integration returns a result for ISC's activity tracking.

Approval, delivery to IQService, and an applied directory change are different events. A failure between any two of them can leave the business decision intact while the requested membership remains absent.

## Which account is doing which part?

A **service account** is an account used by software for a particular operational purpose, rather than a person's everyday login.

**Authentication** establishes the caller's accepted identity or credential context. **Authorization** determines whether that caller can perform the particular action. Authenticating to IQService isn't proof of authorization to change the target group.

The example has four account roles:

| Role | Fictional account | What it contributes |
|---|---|---|
| Recipient | `eng-34004` | Receives the group membership |
| Source's target-management account | `CORP\svc-ad-isc` | Provides the configured authority for the Active Directory operation |
| IQService client-authentication user | `CORP\svc-iq-client` | Authenticates incoming integration requests to IQService |
| IQService Windows service logon account | `CORP\svc-iq-run` | Runs the IQService process under Windows |

`CORP` is the fictional Windows domain label in these account names. The names aren't credentials or commands.

The IQService client user must be registered with IQService and able to authenticate through Windows under the documented configuration. Registration identifies which Windows user identities IQService is configured to accept as clients. It doesn't create the Windows account or grant target privileges. That admission check is different from Active Directory permitting a group-membership change.

The Windows service logon account needs the applicable local operating permissions, including access to the files and resources required by the service. A service process that starts isn't automatically authorized to administer every directory object.

For the supported target operations described in IQService's requirements, the service account configured on the source supplies the target-management context. Don't assume that changing the IQService client user grants the source's target account more privileges.

Scripts can introduce another execution-context dependency. **PowerShell** is a Windows automation environment used by supported integration scripts and operations. Applicable scripts can run under the IQService service logon context when they don't use the source account.

These are roles, not a rule demanding four different usernames in every deployment. Documentation permits certain roles to share an account. If they do, the permission boundaries still exist; one username is being used for more than one purpose.

## Protect the channel before trusting the request

**Transport Layer Security**, or TLS, protects communication in transit and supports checking the server's identity. For the VA-to-IQService connection, the VA must trust the certificate presented by the intended IQService endpoint.

A **certificate** binds an identity, such as a hostname, to a public key under a trust model. The corresponding **private key** is secret material used by the server. A certificate copied onto a server without the required associated private key and access permissions isn't a complete server configuration.

The IQService service logon account must have the required access to that private key. The certificate can be installed correctly while the service's execution account still can't use it.

A **certificate authority**, or CA, issues certificates. A trust chain connects the endpoint certificate to an authority the client trusts. The configured endpoint name must also meet the certificate's identity requirements.

For the example, the source calls `iq-win-01.corp.example`. A certificate for a different host doesn't become correct merely because that host is also owned by the organization.

TLS and client authentication answer different questions. TLS protects the channel and validates the intended server under its trust requirements. **Client authentication** checks the identity presenting the incoming integration request.

In the documented IQService mechanism, a request carries the configured registered user's credentials. IQService checks registration and authenticates those credentials with Windows before processing the request.

The resulting reasoning checkpoints are:

```text
[VA reaches intended IQService endpoint]
                     |
                     v
[TLS: trusted server + protected channel]
                     |
                     v
[Registered client authenticates in Windows]
                     |
                     v
[Required IQService capability available]
                     |
                     v
[Target permits the requested operation]
                     |
                     v
[Target change and reported result examined]
```

The arrows express prerequisites for this secured operation and the evidence to examine afterward. This isn't a complete TLS handshake, private processing algorithm, or guarantee that every request reaches the final box.

The final box includes an engineer's verification. It doesn't promise an automatic target read after every write.

Use the supported TLS and client-authentication configuration. Current Active Directory connector requirements make TLS mandatory for IQService. A connection problem isn't a reason to disable certificate validation, remove client authentication, or expose an unprotected listener.

The VA-to-IQService channel and IQService-to-target communication are also different legs. Securing the first doesn't automatically configure the second. Check the target interface and its documented security requirements separately.

## Now let one dependency fail

In a separate fictional incident, the source still points to `iq-win-01.corp.example`, but that endpoint's certificate has expired.

The supplied evidence establishes that:

- Both VAs can communicate with ISC.
- A basic directory-account read using the configured read path succeeds.
- The provisioning attempt reaches the IQService endpoint, but the VA rejects its expired certificate during TLS setup.
- The request isn't admitted for target execution through that connection.
- The intended group membership remains absent in Active Directory.

What has failed?

The VA-to-IQService trust boundary for the provisioning path. Neither Devi's business approval nor her own password explains the supplied certificate rejection.

The successful basic read doesn't contradict this. That read used a path and fields that didn't require the failed IQService interaction. It isn't evidence that every directory attribute read can bypass IQService.

For that supplied read, the VA connector communicates with the directory without using IQService, and the returned account data becomes available to ISC through the VA integration path. The provisioning operation takes the additional IQService leg. Changing the requested fields or source features can change a read's dependencies.

Replacing the endpoint certificate through the approved process addresses this dependency only if the new certificate, endpoint identity, trust chain, private-key access, and source connection settings are correct.

After that correction, the earlier operation still needs to be reconciled and recovered through the supported process. Verify the intended target membership and the recorded operation result. Restored trust doesn't retroactively complete a failed change.

These facts are supplied for the example. Without the certificate error and operation context, a healthy VA alone wouldn't identify this failure.

## What does the screen actually establish?

An ISC source configuration page shows the host, port, security settings, and credentials selected for the integration. Saved values establish configuration, not successful execution.

The **Connected** state of a VA concerns that appliance's operating state. It doesn't certify the IQService listener, its Windows authentication, its target permissions, or every operation using it.

A Windows service shown as Running establishes that Windows reports the process as running. The listener can still be unreachable from a VA, the wrong endpoint can be selected, or the requested capability can be unavailable.

A **connection test** executes the checks implemented by the connector. Read its result in that scope. Don't turn a green test into proof that every group, account type, script, and password operation will succeed.

For an incident, match evidence to the boundary:

| Evidence | What it helps establish | What it doesn't establish alone |
|---|---|---|
| Actual VA and source association | Which connector environment handles the work | Successful IQService or target interaction |
| Endpoint, port, and TLS error | Which connection failed and at what reported boundary | That the recipient's credentials are wrong |
| IQService registration or Windows authentication error | Whether the incoming client was admitted | Correct target-management privileges |
| IQService operation detail and target audit evidence | Which target action was attempted under which context | That every other step or script succeeded |
| ISC provisioning activity | The tracked source, recipient, action, progress, result, and available errors | A continuously current view of target membership |
| Directory membership checked on the intended target | Whether the assignment exists when observed | That ISC's collected account view is already refreshed |

Keep the operation's timestamp and target context with the evidence. A successful check from before a certificate change doesn't establish current behavior. A check from an administrator's laptop isn't a test from the VA.

Logs can contain account information or sensitive operational data. Collect the relevant error and context without exposing passwords, private keys, or unrestricted trace files.

## When a script is part of the design

A **native before/after script** is connector-side customization executed through the supported IQService mechanism around applicable provisioning work. A before script can prepare or adjust work; an after script can perform defined follow-up actions.

A script can also change applicable request or result information. Its configured behavior is therefore part of the operation you need to understand, not a harmless label attached to it.

Neither is automatically needed for an ordinary account or group operation. The example's group assignment uses no custom script.

If a deployment does use one, it has additional dependencies: the required IQService capability must be enabled, the approved script and supporting files must be available, and its execution account must have the required authority.

A **handler** is the part of IQService that supports a particular category of requests. IQService can be running while an operation-specific handler is disabled.

Current IQService documentation disables `ScriptExecutor`, the handler for native before/after provisioning scripts, by default. Related script functionality requires TLS and explicit enablement of that capability. Enabling every handler isn't an appropriate response to a failed request.

Also, “after” doesn't mean “only after success.” IQService's documented after-provisioning rule behavior can execute regardless of the provisioning result. A message produced by an after script therefore doesn't prove the primary target change succeeded.

Examine the primary operation result and the script's result separately. If a workflow has multiple effects, don't assume a failure rolls back everything already done.

## Who keeps this component healthy?

Your organization hosts the Windows server and maintains the required operating environment, accounts, connectivity, certificates, and operational controls.

SailPoint supplies IQService software and its supported update mechanism. IQService has an automatic-update capability, but the required **UpdateService**, a companion service used for software updates, must be configured for the supported arrangement.

For the documented VA-based update path, the VA obtains the update package and the IQService/UpdateService arrangement applies it. IQService doesn't require a separate internet path merely to download that package in this arrangement.

Don't translate that into “Windows services update themselves without preparation.” Applicable deployment support, update configuration, credentials, certificate access, backups, and change validation still need attention. Supported versions and platform requirements must be checked against current documentation, not remembered from an old installation.

A **shared dependency** is a component on which multiple operations or sources rely. One IQService instance can serve more than one source, but that also creates a common failure and maintenance boundary.

Two VAs don't remove a single shared IQService dependency. In this example, both members ultimately call the same Windows endpoint. If it stops, another healthy VA doesn't supply an alternative IQService instance by itself.

Redundancy for the Windows-side service needs its own supported design, including consistent configuration and security. It isn't created simply by adding a second appliance to the VA cluster.

## Narrow the fault before changing anything

If the error says IQService couldn't be reached, establish the actual hostname, port, listener, and relevant network path.

If it identifies certificate rejection, investigate server identity, validity, trust, and required private-key access at the relevant endpoint.

If it says the client isn't registered or Windows authentication failed, inspect the IQService client identity and the registration or account condition identified by the error.

If the target rejects the group change after the request is admitted, examine the actual target-management account and authority over the intended object.

These aren't guaranteed error stages or a required sequence of random tests. They're different explanations supported by different evidence.

An engineer shouldn't grant broad directory administration to repair a certificate mismatch. Nor should they reset Devi's password because an unrelated integration client is locked.

Use the documented permissions for the connector, operation, and service arrangement. **Least privilege** means giving each role the authority needed for its approved work. It doesn't mean inventing a permission model that omits required local service or connector privileges.

Restarting the service can interrupt other work. Reinstalling it can change configuration or remove useful evidence. Neither is a substitute for identifying the failed dependency and the scope of the intended correction.

## Work through these separate cases

### 1. The account read succeeded

Engineering Directory collects basic account fields successfully. An access change requiring IQService fails to connect to its configured endpoint. A colleague concludes IQService isn't necessary because accounts are visible in ISC.

Does the read establish that conclusion?

**Worked reasoning:** No. The supplied read covers its own path and fields. The Active Directory connector uses IQService for provisioning and particular reads. Inspect the actual failed operation and endpoint evidence; don't infer complete connector health from a visible account record or a narrower successful read.

### 2. The endpoint presents an expired certificate

The VA records the expired-certificate rejection from the main incident. No request is admitted for target execution through that connection, and the target membership is absent. Someone proposes disabling TLS until the access change completes.

What should change instead?

**Worked reasoning:** Correct the certificate and supported trust configuration through the approved process while retaining TLS and client authentication. The error identifies trust failure, not insufficient directory administration. After validating the repaired connection, recover the affected operation and verify the intended target result. The supplied failure occurred before execution through this connection; that isn't a universal conclusion for every timeout or TLS-related incident.

### 3. Windows knows the account, but IQService doesn't

In a different attempt, TLS succeeds. The error explicitly says `CORP\svc-iq-client` isn't registered with IQService. The account exists in Windows and is enabled. No target operation is admitted.

Would adding directory privileges to `CORP\svc-ad-isc` fix the stated problem?

**Worked reasoning:** No. Windows account existence doesn't complete IQService registration. Correct the approved client-registration and source-credential configuration, preserving the distinction between the client user and the target-management account. Target privileges may matter later, but the supplied failure is at request admission.

### 4. The request is admitted, but the group change is denied

In a separate attempt, TLS and client authentication succeed. The target audit identifies `CORP\svc-ad-isc` and denies the requested membership change on `ENG-Docs-Readers`. The IQService process runs under `CORP\svc-iq-run`.

Which account's target authority does the evidence identify?

**Worked reasoning:** The supplied target audit identifies `CORP\svc-ad-isc`. Investigate its required authority over the intended group and the source's target credential context. Changing the Windows process account or IQService client user doesn't automatically repair that denial. Validate the scoped correction with the directory owner, then recover and verify the change.

### 5. The after script wrote a success-looking message

A separate configured after script writes “follow-up completed.” The primary provisioning result reports failure, and the directory confirms the intended membership is absent.

Did the script message establish successful provisioning?

**Worked reasoning:** No. The documented after-provisioning behavior doesn't restrict execution to successful provisioning. The message is evidence about that script's activity, not the directory assignment. Inspect the primary result, actual script effects, and target state separately. Don't assume that one result cancels or rolls back other effects.

### 6. Both VAs are healthy during Windows maintenance

Both VAs are Connected. The source still points to the one IQService endpoint, which has been stopped for planned maintenance. Two source owners report failures in operations using that service.

Why didn't the second VA prevent the interruption?

**Worked reasoning:** The appliances share the same unavailable downstream component. VA redundancy doesn't supply IQService redundancy. Identify affected sources and operations, follow the maintenance and supported recovery plan, and verify outcomes when service is restored. If continuity is required, it needs a separately validated Windows-side availability design.

## Try the reasoning with a different connector

A new source's connector documentation says it uses IQService for a particular account-data read. A design reviewer rejects that requirement because “IQService is only for writes.”

The team installs IQService anyway. Windows reports it as Running, but the required handler is disabled. No completed read is supplied.

Explain both mistakes and what evidence you would ask for.

**Worked reasoning:** First, the operation-specific connector requirement decides whether IQService participates. The label “read” doesn't exclude it. Establish which fields and features are required and which supported path supplies them.

Second, a Running process isn't proof that the requested capability is enabled or usable. Check the required handler and its security prerequisites, the configured endpoint, the admitted request, and the actual read outcome. Enable only the capabilities justified by the approved design.

You could describe IQService's role this way: “For this operation, the connector needs supported Windows-side work. The VA carries the integration work to IQService; IQService performs its part against the target. Each connection, credential, and target permission still has to be correct.”
