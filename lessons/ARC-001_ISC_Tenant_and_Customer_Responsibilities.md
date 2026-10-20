# The ISC tenant: what SailPoint runs, and what your organization still owns

Devi has joined Procurement. Her employee number is `31001`, and her existing account `supplier-31001` needs permission to view supplier records in an application called Supplier Register.

She asks for supplier-record viewing through SailPoint Identity Security Cloud, or ISC, and the configured reviewer approves it. The engineer can sign in to ISC, open the request, and read its activity. But Supplier Register rejects the attempted permission update.

Someone asks, “If ISC is software as a service, shouldn't SailPoint take care of this?”

Let's separate the hosted service from the complete access-management system. The difference tells you where to investigate and who needs to act.

## What is the tenant you sign in to?

A **tenant** is a particular organizational environment within the hosted ISC service. It contains the configuration and identity/access information available in that environment, subject to its enabled capabilities and permissions.

Think about what belongs there: source configurations, person-level identity records, represented accounts, access definitions, and recorded activity. These are information and configuration in the service. They are not the external business systems themselves.

ISC is **software as a service**, or **SaaS**. SailPoint operates the hosted application platform rather than asking your organization to install and administer the core ISC application servers as its own deployment.

The platform is multi-tenant: it serves multiple organizational environments while maintaining tenant boundaries for data and configuration. Your tenant isn't a separate physical computer that your ISC administrator owns.

You also don't get administrator access to another organization's data because both organizations use ISC.

For your work, the tenant establishes the environment in which a configuration, record, or operation exists. “I changed the source” is incomplete until you know which tenant contains that source.

A company can use separate sandbox and production tenants. A **sandbox** is an environment used for configuration and testing; **production** is the environment used for live operations. What environments your organization actually has must be established, not guessed from another project's setup.

One tenant can contain many sources and identity populations. Creating another source or another identity profile does not create another tenant.

A **source** is ISC's configured representation of a system or collection of account data. An **identity profile** configures an authoritative population and its identity information. An **authoritative source** supplies the population used to establish those identities.

These are configurations within a tenant. A tenant is the wider environment that contains them.

## The external account does not move into ISC

An **identity** is ISC's representation of a person, such as Devi. An **account** is a record used in a particular system. ISC also holds a representation of that account, obtained through its integration.

Supplier Register still has its own account `supplier-31001`. It still controls what operations that account can perform.

An **entitlement** is an access item represented from a source, such as a permission or group membership. In this fictional application, `supplier.view` allows supplier-record viewing. It does not allow changing bank details.

ISC can record that entitlement, make it available through the configured access process, and initiate a supported change. That doesn't make ISC the Supplier Register application's runtime permission engine.

**Authorization** means deciding whether an actor may perform an operation. Supplier Register applies its own authorization when Devi tries to view or change supplier information.

The organization remains responsible for ensuring that the permission it requests actually means what the business needs. If an engineer bundles a bank-detail-change permission into a supposedly read-only package, SaaS hosting doesn't correct the business design automatically.

The external application could itself be hosted by another SaaS provider. “Outside ISC” does not mean “inside our office.” The boundary is between services and responsibilities, not simply between cloud and on-premises equipment.

## Put the responsibilities beside the systems

SailPoint operates the hosted ISC platform and its service capabilities. Your organization configures how those capabilities apply to its people, access requirements, and connected systems.

That division doesn't leave a gap where nobody owns the result. It creates dependencies that need explicit operational ownership.

| Area | SailPoint service contribution | Customer responsibility in the implementation |
|---|---|---|
| Hosted ISC platform | Operates and maintains the SaaS platform | Administers its tenant through supported capabilities and manages who may administer it |
| Identity information | Provides collection, identity configuration, and processing capabilities | Supplies trustworthy source data and chooses appropriate mappings and matching logic |
| Access decisions | Provides access models, requests, reviews, and configured automation | Defines what access means, who qualifies, who approves, and what exceptions are acceptable |
| Integration | Provides documented connector capabilities | Configures the connection and maintains required external credentials, permissions, and connectivity |
| Customer-side components | Provides applicable integration software and documented requirements | Operates required hosting/network dependencies and monitors the components in its environment |
| Operational assurance | Provides activity, reports, health signals, and support mechanisms | Monitors outcomes, investigates exceptions, coordinates owners, and verifies business results |

Read the rows as connected work, not an excuse to pass incidents between teams.

For example, SailPoint can provide a working account-matching capability. Your organization can still configure the wrong comparison or supply an employee number on the wrong account. The service executing that configuration is not evidence that the person-to-account association is correct.

**Account correlation** is matching and assigning a source account to an ISC identity. The customer must validate that the chosen logic and data associate the intended records.

Likewise, a review process can route an approval correctly while the access package itself contains excessive permission. The business decision, the configuration implementing it, and the delivered access all need to agree.

Your organization can delegate work to a partner or managed service provider. It still needs an accountable arrangement for its data, decisions, and outcomes. A third party doing the configuration doesn't make those decisions automatically SailPoint's responsibility.

## Hosting the tenant doesn't remove connection dependencies

A **connector** is the integration used to read source information and perform supported account or access changes.

**Aggregation** collects account or entitlement information into ISC. **Provisioning** carries out supported account or access changes. They use the integration for different work.

A connector that can read data doesn't necessarily support every write operation. Support also doesn't establish that the configured integration account has permission to perform the operation in the external system.

An **integration account** is the account or software identity used by the connection. It is different from Devi's account. Its **credentials** are the secrets or tokens used to authenticate that connection.

**Authentication** verifies the connecting actor. Successful authentication doesn't imply authorization to change group membership, create an account, or update a protected field.

The connection also needs **network reachability**: the relevant component must be able to communicate with the required destination under the configured network rules.

A valid credential cannot repair a blocked network path. An open path cannot supply a missing write privilege.

The connection path depends on the connector:

- A **Virtual Appliance**, or **VA**, is a customer-deployed integration component used by VA-based connectors to connect the service with enterprise systems.
- A **SaaS connector** uses the supported SaaS connectivity path without requiring a customer-deployed VA cluster.

A **cluster** groups VAs for the relevant connectivity arrangement. The hosted ISC tenant is not that cluster, and the cluster is not a second copy of the whole tenant.

An **API** is an interface through which software reads information or requests operations. The external system decides which authenticated integration is allowed to use its operations.

A source using a SaaS connector still needs the appropriate external API access and permissions. Removing the VA dependency doesn't remove every integration dependency.

Here is a responsibility map for the fictional Supplier Register integration. This example uses a supported VA-based path.

```text
SailPoint-hosted service
  ISC production tenant
    Identity and represented account information
    Source and access configurations
    Requests, processing, and recorded activity
                  |
                  | Supported integration
                  v
Customer-managed operating environment
  VA cluster and required network dependencies
                  |
                  | External authentication/permissions
                  v
Supplier Register
  Integration account: svc-supplier-isc
  Devi's account: supplier-31001
  Application accounts and enforced permissions
```

The downward path shows a supported integration relationship, not a permanent session, a packet-level protocol, or an exact internal execution sequence. Data collection also travels back to the service through the configured connection.

The software, hosting, network, credentials, and external application have different responsibilities even though all are needed for this integration.

The diagram does not put every connector behind a VA. A SaaS connector has a different connection path. Detailed component configuration depends on the selected connector and its requirements.

## Even a customer-deployed component can have shared maintenance

A VA runs in a customer-deployed environment, but that doesn't mean your team should manually replace SailPoint-managed software with an improvised patch.

SailPoint manages VA software updates. Your organization still needs to maintain the required hosting and network environment, monitor connectivity, and respond to conditions requiring customer action.

Those responsibilities coexist.

For example, if a VA cannot communicate as required, saying “SailPoint manages the updates” doesn't establish that the update or connection can complete. SailPoint's VA documentation describes conditions that prevent updates and cases requiring operational attention.

Nor should you assume a rolling update guarantees that every in-progress job is uninterrupted. The documented behavior allows interruption of long-running work under applicable update conditions.

The practical question is which layer needs attention: SailPoint-managed integration software, customer-provided hosting/connectivity, or the external application's availability and permissions.

Use the documented maintenance process for the component. Treating all local integration software as either entirely vendor-operated or entirely customer-patched gives you the wrong operating model.

## Trace the approved request across the boundary

An **access request** asks for specified access for a specified recipient. Here the recipient is Devi, and the requested access is supplier-record viewing.

An **access profile** bundles related entitlements from one source. For this example, the profile **View suppliers** contains only `supplier.view` from the Supplier Register source.

The account already exists and is correctly associated with Devi's ISC identity. The fictional integration supports adding the required access to that account. The organization has configured the appropriate request review.

Under the successful path, the reviewer approves the request. ISC initiates the supported change through the integration. Supplier Register accepts the authorized operation, and the permission is added to `supplier-31001`.

What made that work?

The business requirement identified the right access. The tenant configuration selected the right recipient, source, profile, and account. The integration path worked. Its account could perform the particular operation. The application accepted the change.

Approval alone established none of the later results.

Now inspect these fictional observations from a different run of that path:

| Time | Supplied observation |
|---|---|
| 09:00 | A customer application-security change removes membership-update permission from `svc-supplier-isc`; account-reading permission remains |
| 09:10 | An account aggregation reads current Supplier Register account data successfully |
| 09:15 | Devi's View suppliers request is approved in the ISC production tenant |
| 09:16 | The attempted access update is rejected by Supplier Register for lack of the required permission |
| 09:20 | Current application evidence confirms `supplier.view` is still absent from `supplier-31001` |

These times illustrate the evidence in this case. They are not a promised schedule, delivery time, or standard ISC processing interval.

The engineer can still use the ISC interface. The account read succeeds. The access write fails.

Those observations fit together: the integration identity can authenticate and read, but it lacks authorization for the write.

The example also supplies the application-side privilege change and rejection evidence. Without those facts, a failed operation alone would not justify concluding that the customer removed a permission.

```text
Approved View suppliers request
  |
  v
ISC initiates supported change
  |
  v
Configured integration reaches Supplier Register
  |
  +-- Required write permitted?
        |
        +-- Yes --> Application applies supplier.view
        |
        +-- No ---> Application rejects the change
                    Permission not delivered in this case

Separate observation:
  Account read can succeed with read permission.
  Reading accounts does not grant write permission.
```

The branch represents the application authorization condition in this example. Other failures can occur before it, such as network failure or invalid credentials. A real investigation must establish which boundary the attempted operation reached.

Recorded activity can help identify the operation and reported result. It does not remove the need to establish the actual target state.

## Who acts on this incident?

The ISC engineer checks the intended recipient, source, access profile, selected account, attempted operation, and recorded result.

The application team checks the integration account's current privileges and the application audit evidence. The security or access owner confirms the minimum privilege required for the approved integration operation.

The team responsible for that permission restores or redesigns it through the authorized change process. That does not mean giving the integration account unrestricted administrator access to make the error disappear.

After correction, the organization must address the affected request or operation using the supported recovery procedure and verify the intended target outcome. Correcting privileges doesn't, by itself, prove the earlier failed change has now been completed.

If the evidence instead points to unsupported connector behavior or a service defect, SailPoint support may need to investigate. Customer checks and vendor investigation can happen together. A boundary map helps narrow the evidence; it does not prove that every incident has exactly one owner or one fault.

A useful support handoff includes the tenant/environment, affected source and operation identifiers, time with time zone, scope, error information, recent changes, and the checks already performed.

An **object ID** identifies a particular ISC record. Keep IDs in their tenant context so that a support engineer investigates the intended source or operation.

Use approved support channels and share only the necessary information. Do not include passwords or access tokens. A log or export can contain sensitive identity and access information even when it contains no password.

## Being an ISC administrator is a separate permission

An engineer can have a powerful administrative user level in the ISC tenant, such as **Org Admin**, the broad organization-administrator level. That grants applicable capabilities in ISC.

It does not automatically make the engineer an administrator in Supplier Register. It also doesn't automatically give `svc-supplier-isc` permission to update application access.

These are different actors:

- The human or software actor administering ISC.
- The integration identity used to connect to the external system.
- Devi's business application account, which receives the access.

Keep those actors separate in your reasoning. A failure affecting one is not automatically a password or permission problem for the others.

Your organization must govern privileged ISC access too. Give people and automation the authority needed for their work, review that authority, and remove it when it is no longer appropriate.

A business access role and an ISC administrative user level also have different purposes. A business role groups access needed for duties. A tenant administrative user level controls applicable administration capabilities. Being assigned a Procurement business role is not, by definition, permission to edit ISC source configuration.

The exact available administration options depend on the tenant's capabilities and supported permission model. An option visible in documentation is not proof that every subscription includes it or that every signed-in user can use it.

## A sandbox is a tenant boundary, not a guarantee of harmlessness

Suppose the organization has a sandbox tenant and a production tenant. Both contain a source named Supplier Register.

The shared name does not prove that those configurations point to different external systems.

Inspect the destination and the credentials. If the sandbox source is configured to reach production Supplier Register with credentials authorized to write, a test can affect live accounts. The word sandbox on the ISC environment does not, by itself, make those external operations read-only.

This is why test isolation needs an end-to-end design:

- Which ISC tenant contains the test?
- Which external environment does each source or integration action reach?
- Which credentials and permissions does it use?
- What data can be collected, what actions can run, and who can receive notifications?

A separate test tenant doesn't automatically make copied production identity data suitable for every tester. Control the data used in testing and the access to it.

ISC supports instance badges that help distinguish environments in the interface. A clear label is useful, but it isn't an authorization control or proof of the configured external destination.

Check the actual environment before a consequential operation, including when using an API rather than the browser. A browser label cannot protect a script aimed at the wrong tenant.

## Configuration changes need their own evidence

The customer can configure the tenant through supported interfaces and capabilities. That doesn't mean directly editing the hosted platform's private database or treating it as a customer-controlled application server.

If you move a design from sandbox to production, review its dependencies. Sources, owners, identity references, access definitions, and external destinations need to be correct in the destination environment.

A matching display name is not enough. An exported object can refer to other objects or contain environment-specific settings. Use the applicable supported deployment process rather than assuming that every file is portable unchanged.

Also separate making a configuration change from applying its intended effects.

Changing a role's criteria, for example, is not evidence that every intended account change has completed. **Identity processing** evaluates identity information and applicable configured access. Under the relevant feature, processing or another documented application step may be needed to apply a configuration change.

After that, any resulting provisioning still has its own execution and outcome.

Keep a record of the intended change, affected scope, tests, approvals, and verification. A source configuration can be syntactically valid and still point at the wrong application environment.

Neither SaaS hosting nor successful import proves business correctness.

## Read health signals at the right scope

The front end is the interface people use. The backend is the processing behind that interface.

Opening an ISC page establishes that the particular interaction succeeded. It does not test every source connection, every background operation, or every application's write permissions.

Likewise, a successful aggregation tests the applicable read path and scope. It doesn't establish that all writes or all other sources work.

SailPoint provides system notification settings for source and VA conditions. Your organization must decide who receives and acts on those notifications. A notification arriving in an unmonitored mailbox does not resolve the incident.

Read the actual operation history and the target evidence for the affected task. Preserve the time and scope of each observation.

If a broad service issue is suspected, use the applicable service-health and support channels as additional evidence. Don't rule out a service problem solely because you found no customer-side change, and don't assume a platform outage solely because one source operation failed.

The responsibility boundary tells you what to investigate. The evidence tells you what happened.

## Work through these boundary questions

### 1. The site opens, but the request failed

An engineer opens the ISC production dashboard successfully. A Supplier Register access update reports an authorization rejection.

Does the successful page load prove the connector or target permissions are healthy?

**Worked reasoning:** No. It proves that the observed page interaction succeeded. Inspect the affected source/account operation and the external permission evidence. In the supplied incident, account reads work while membership updates are denied. These are different scopes of operation.

### 2. The collected manager is wrong

HR data contains the wrong manager identifier. ISC collects that input, and the configured comparison associates the employee with the wrong manager.

Who needs to investigate, and would a hosted-service update necessarily correct it?

**Worked reasoning:** The organization must validate and correct the authoritative input and the relevant mapping/matching configuration. A platform update doesn't establish the intended manager. Verify the corrected input, person-level result, and any affected business work separately. If product behavior contradicts the supported configuration, vendor investigation may also be needed.

### 3. An Org Admin cannot grant application access

An engineer has Org Admin access in ISC. The external integration identity lacks the required membership-update privilege.

Can the engineer's ISC user level substitute for that external privilege?

**Worked reasoning:** No. The administrator, integration identity, and recipient account are different actors. The authorized application/security team must establish the required scoped integration privilege. ISC administrator access doesn't automatically grant external system authority or fulfill the request.

### 4. The test tenant reaches production

A sandbox source points to production Supplier Register and uses a valid production integration credential with write permission. A colleague says it cannot change live data because the ISC tenant is a sandbox.

**Worked reasoning:** The supplied configuration can reach and write to the live destination through the supported integration. The sandbox label isn't a read-only boundary for that external system. Establish the intended isolation, destination, permissions, data, and allowed test actions before running the test.

### 5. SailPoint manages the VA software

A required VA cannot communicate over the customer network. The team declines to investigate because SailPoint manages VA updates.

**Worked reasoning:** Software update management and customer-provided connectivity are separate dependencies. Inspect the network, hosting, component health, and documented update status through the supported operating process. Don't assume the customer should manually patch SailPoint-managed software, or that vendor-managed updates repair every customer-network issue.

### 6. The privilege was restored

The application team restores the integration identity's scoped write privilege. There is no evidence yet of recovery for Devi's failed operation or of the permission on her account.

Is the access incident complete?

**Worked reasoning:** Not yet. The team has corrected a dependency. It must address the affected work using the applicable recovery procedure and verify `supplier.view` on `supplier-31001`. Check for other affected operations and retain evidence of both the correction and the outcome. Do not assume every failed operation automatically retried.

## Apply the same map to a different system

A company uses a SaaS connector for a hosted document service. There is no customer-deployed VA in this connection path.

An employee already has a document-service account and needs a read-only folder entitlement. The request is approved. The service accepts the integration token but denies the membership update because the token's permissions allow account reads only.

Explain which responsibility boundaries still exist without a VA, what the successful authentication establishes, and what evidence would show that the requirement has been fulfilled.

**Worked reasoning:** SailPoint's hosted service and connector capability are separate from the external document service, its account/permission model, and the customer's integration configuration. The absence of a VA removes that component dependency; it doesn't supply missing token permissions or decide which folder access is appropriate.

Successful authentication establishes that the external service accepted the connecting identity under its authentication requirements. It doesn't establish authorization for the membership update.

The organization must validate the intended folder entitlement, recipient account, supported operation, required scoped integration permissions, and relevant request configuration. The team authorized to manage the external integration permissions must correct the dependency.

Then inspect the affected operation's recovery/result and current document-service evidence for the intended account and folder. Preserve unrelated approved access. A later collection is recorded observation, not proof that the earlier failed operation succeeded.

If you explain this to another engineer, keep the whole chain in view: SailPoint operates the hosted platform; the organization still owns the access design and its implementation dependencies. Follow the specific operation across that boundary before deciding what needs to change.
