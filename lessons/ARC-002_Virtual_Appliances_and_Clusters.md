# Virtual Appliances and clusters: where does the connection work happen?

Devi works in asset operations. Her employee number is `32002`, and her existing account `asset-32002` needs permission to read asset records in an application called AssetDesk.

The organization manages that access through SailPoint Identity Security Cloud, or ISC. AssetDesk is connected through two Virtual Appliances grouped in one cluster.

One appliance becomes unavailable. The remaining appliance shows **Connected** in ISC, but an attempted AssetDesk update fails.

Shouldn't two appliances have prevented that? And what does Connected actually tell you?

Let's follow the connection far enough to answer both questions.

## The VA is an integration component, not another ISC tenant

A **tenant** is a particular organizational environment within the hosted ISC service. It holds the configuration and represented identity/access information for that environment.

A **Virtual Appliance**, or **VA**, is a Linux-based virtual machine deployed in the customer's operating environment to support applicable integrations between ISC and external systems.

A **virtual machine**, or **VM**, is a software-defined computer using resources supplied by a hosting platform. The VA needs that hosting, allocated resources, and the required connectivity. It isn't just a name saved in the ISC interface.

A **source** is ISC's configured representation of a system or collection of account data. A **connector** is the integration used to read data and perform supported account or access operations.

For a VA-based source, the VA performs connector-side work against the external system. That doesn't make it a complete installation of ISC. The hosted tenant still contains the source configuration, person-level information, access definitions, and recorded activity.

An **identity** represents a person in ISC. An **account** is a record in an external system, with ISC holding a representation of it. Running two VAs does not create two identities for Devi or two AssetDesk accounts for her.

The VA also doesn't decide what business access Devi should receive merely because it can reach AssetDesk. The access decision and the external operation are different parts of the system.

Not every connector needs a VA. **SaaS** means software as a service, where the provider operates the hosted software. A **SaaS connector** uses the supported SaaS connectivity path without a customer-deployed VA cluster. You must identify the source's connection type before investigating its execution path.

“It's a cloud application” isn't enough to choose that path. Use the connector's documented connection options and the actual source configuration.

## A cluster groups appliances that can handle its work

A **VA cluster** is a configured group of appliances supporting the relevant connection work. The cluster groups appliances, not people or business access roles.

In this fictional example:

- The production tenant contains the AssetDesk source.
- That source is associated with cluster `C-Asset-Prod`.
- The cluster contains `va-asset-01` and `va-asset-02`.
- An Operations Directory source is also associated with that cluster.

These are teaching names, not real tenant IDs or commands.

```text
ISC production tenant
  |
  +-- AssetDesk source -----------+
  |                               |
  +-- Operations Directory -------+
                                  |
                         C-Asset-Prod cluster
                           |
                           +-- va-asset-01
                           +-- va-asset-02

Sources are assigned to a cluster.
The cluster contains individual appliances.
```

The lines show configuration relationships. They aren't network connections or a promise that every task runs on both members.

SailPoint documents work for a VA-based source as requests to its associated cluster. Running VAs poll that cluster's queue for work. **Polling** means repeatedly asking whether work is available. A **queue** holds work awaiting handling.

That work can come from a source connection test, scheduled or manually requested account collection, or a supported account/access change. These operations ask for different work; a successful connection test doesn't establish that every read and write will succeed.

The group is therefore useful as an execution boundary. You associate a source with a cluster rather than assuming the source is permanently attached to one named VA.

In the documented running-member arrangement, either member can pick up work for the cluster. Don't assume one is always the active worker and the other is a permanently idle standby.

Also don't assume a particular operation will always run on the member you tested yesterday. Each member needs the dependencies required for the sources that it can handle.

A cluster can support multiple sources, as shown here. That makes its failure scope wider than one application. But the sources still have their own configurations, external credentials, and target requirements.

A healthy AssetDesk operation does not validate Operations Directory just because they share a cluster.

## How can work come from ISC if the VA connects outward?

The work originates from an ISC operation. The network connection is initiated by the VA toward the required cloud services.

Those statements are compatible.

SailPoint's VA model uses outbound communication from the VA to the cloud environment, including polling for work and obtaining updates. You don't need to turn the VA into a publicly exposed server so that ISC can open an unsolicited inbound session for each connector action.

Outbound communication does not mean data can travel only one way. A VA can send a request and receive the response over the communication it initiated.

For the AssetDesk example, the VA also needs a working connection to AssetDesk's configured endpoint. An **endpoint** is the address of the service or operation being contacted.

Here is a conceptual view of the communication:

```text
Connection initiation
  VA ----outbound----> Required cloud endpoints
  VA ----target-----> Configured external system

Example work exchange
  VA asks cloud services for its cluster's work
  Cloud returns work on VA-initiated communication
  VA performs the connector operation on the target
  Target returns data or an operation response
  VA sends collected data/results to cloud services
```

The work-exchange lines describe roles, not exact packet order, queue acknowledgement rules, retry timing, or an internal worker design.

The two connections have different destinations and requirements. Being able to communicate with SailPoint's cloud services doesn't establish that the VA can communicate with AssetDesk.

This also explains why opening an ISC page from your laptop is a weak test of a VA problem. Your laptop's connection to ISC is not the VA's connection to the required services or the target application.

## Which parts of a source operation use that path?

**Aggregation** collects account or entitlement data from a source into ISC. An **entitlement** is a represented access item, such as a permission or group membership.

For an AssetDesk aggregation, the connector needs to reach the application, authenticate, and read the relevant records. The collected information can then be represented and used by ISC.

**Account correlation** matches and assigns a source account to an ISC identity. It is not the network connection between the VA and the source. A failed network lookup is not a person-matching decision.

**Provisioning** carries out supported account or access changes. For Devi, the fictional required entitlement is `asset.read`. It permits asset viewing, not asset administration.

The supplied integration supports adding that entitlement to the existing account `asset-32002`. That supported write is a condition of this example, not a claim that a real connector exists for the fictional AssetDesk product.

The integration connects as `svc-asset-isc`, its **integration account**. This account is different from Devi's recipient account. Its credentials authenticate the connection, and its external privileges determine which operations the target permits.

**Authentication** verifies the connecting actor. **Authorization** determines whether it may perform the requested operation.

A working VA can't give the integration account a privilege that the target hasn't granted. A valid integration credential can't repair an unreachable target endpoint.

The VA is a required participant in this example's source-operation path. It is not a substitute for the other participants.

## Saving a VA record doesn't mean the appliance is operational

There are two sides to deployment: the actual running machine and its registration/configuration in the ISC environment.

**Pairing** associates a deployed appliance with its tenant and cluster through the supported setup process. SailPoint documents that a VA record can be saved without pairing, but it is not operational in that state.

You therefore need more than an appliance name in a list. The machine must be deployed, configured, paired, and able to complete the required connectivity and setup.

Cluster setup also has shared configuration requirements. For example, the documented cluster passphrase must be consistent across its member VAs. That setup secret is different from the local machine login password, the source integration credential, and Devi's application password.

Keep secrets out of tickets, screenshots, lesson notes, and casual messages. A pairing or setup procedure is something to perform through the approved deployment process, not by copying values from another project's notes.

You can also encounter the component name **Cloud Connector Gateway**, or **CCG**. It is the VA cluster component used for the core connector connectivity taught here and is enabled by default for the applicable ISC clusters.

The component name does not mean the VA is the entire hosted service. Other licensed capabilities can use additional cluster components with their own resource requirements. An appliance used for a different standalone component is not automatically evidence that the required source-connector component is configured.

For a real deployment, verify the intended cluster components and their current requirements. Don't enable everything in a component list simply because the options are visible.

## Test the dependencies from each appliance's position

For a VA-based integration, these questions describe different boundaries:

| Dependency | What you need to establish |
|---|---|
| VM and resources | The appliance is running with the required processing, memory, and storage resources |
| Cloud communication | That VA can reach all required cloud services for the selected configuration and region |
| Target address and path | That VA can resolve and reach the configured external endpoint |
| Secure communication | Applicable certificate trust and secure-connection requirements are satisfied |
| Target identity and privileges | The connection can authenticate and perform the specific permitted operation |
| Work and result | The intended source operation ran, and its outcome is established |

**DNS**, the Domain Name System, resolves a service name into an address. If the VA cannot resolve the configured AssetDesk name, a valid application password won't help it find the service.

A **firewall** permits or blocks network traffic under configured rules. **Routing** determines the network path toward a destination. A target that is reachable from one network segment is not automatically reachable from every VA.

**Transport Layer Security**, or **TLS**, protects an applicable network connection and includes checks on the peer's certificate under the configured trust requirements. Reaching a server is different from trusting the certificate it presents.

A server certificate identifies the server and is checked against the VA's trust settings. It isn't enough to see that a service is reachable if the required secure connection cannot be established.

**HTTP** exchanges web requests and responses. **HTTPS** protects that communication using TLS.

A **proxy** forwards traffic on behalf of another component. If the VA uses a proxy configuration, include that route and its requirements in the investigation. The documented HTTP proxy mode can route source HTTP/HTTPS traffic through the proxy as well; don't assume every target connection is direct.

A **port** identifies a network service endpoint on a host. The target's required ports depend on the protocol and connector. Don't open every port as a substitute for identifying the documented requirement.

The requirements include outbound HTTPS cloud communication, but “allow port 443 somewhere” is not a complete network design. Required destinations, name resolution, time synchronization, deployment mode, and target-specific ports still matter.

For our fictional AssetDesk endpoint, the supplied design uses HTTPS on port 443. That is this target's example, not a rule that all sources use HTTPS or port 443.

The current SailPoint requirements are the authority for concrete destinations, resource sizes, and supported deployment details. Understand what each dependency does; use the current values appropriate to the actual deployment.

## What does Connected tell you?

SailPoint's VA status documentation describes **Connected** as the appliance operating as expected. It is useful appliance-health evidence.

It is not a test result for every possible operation against every connected source.

Read health at the right level:

- A cluster view concerns the configured cluster and its member conditions.
- An individual VA view concerns a particular appliance.
- A component/process view concerns work or update availability for that process.
- Source and operation evidence concerns the particular target interaction.

For example, an appliance can communicate with the cloud while the AssetDesk hostname cannot be resolved from its network environment. Those facts don't contradict each other.

Likewise, a component marked **Busy** is not, solely because of that label, proof that the whole tenant is down. The documented process state means it is unavailable for new processing or updates in that state. Inspect the actual work and timing.

Use the warning/error details and their timestamps. If the cluster indicates an inactive member, don't describe the deployment as fully redundant just because another member is Connected.

## Two VAs give redundancy, not immunity

**High availability**, or **HA**, means maintaining enough working capacity and redundancy to continue the required service when a component becomes unavailable.

For standard ISC VA deployments, current requirements call for production and sandbox clusters with at least two VAs in each cluster. A single saved VA in a cluster does not satisfy that redundancy design.

The reason is practical. If one appliance is unavailable, another running member can handle cluster work. During the documented rolling-update process, VAs are updated and restarted one at a time.

But there are limits.

Two VMs on the same failed hosting platform can both become unavailable. Two appliances depending on one broken network route can both lose access to a target. Neither condition is fixed merely by counting two VA records.

The remaining appliance also needs sufficient resources and the correct source connectivity. A second member that has never been tested against the required target is an unverified dependency, not demonstrated continuity.

And two members do not establish that a single aggregation runs twice as fast or that a particular in-flight operation resumes automatically at the exact point where it stopped. Capacity, source behavior, workload, and supported processing behavior still matter.

Separate “another worker is available” from “this specific operation completed.”

## Follow the failure from the remaining appliance

Return to Devi. The intended outcome is `asset.read` on the existing AssetDesk account `asset-32002`.

An **access request** asks for specified access for a specified recipient. An **access profile** bundles related entitlements from one source. The fictional profile **Read assets** contains `asset.read`.

The configured review approves that request for Devi. The relevant source is associated with `C-Asset-Prod`.

Now inspect the supplied fictional evidence:

| Observation | What it establishes in this example |
|---|---|
| `va-asset-01` is unavailable because its hosting platform failed | One cluster member cannot perform work |
| `va-asset-02` is Connected and can poll the cluster's work queue | The remaining member has the demonstrated cloud communication |
| Operation evidence identifies `va-asset-02` handling the AssetDesk attempt | This attempted work used that member, not the unavailable appliance |
| Diagnostics from `va-asset-02` show failure to resolve the configured AssetDesk hostname | The operation fails before reaching application authentication or the permission update |
| Current AssetDesk evidence shows `asset.read` absent from `asset-32002` | The requested permission has not been delivered at the checked time |

The second appliance preserved a running participant in the cluster. It did not supply the missing target-side name resolution.

That is why testing only cloud connectivity on the second VA was incomplete.

The person investigating should compare the actual name-resolution and target-connectivity setup from each member. The source configuration and the member's network environment both matter. A successful test from an administrator's laptop doesn't prove the VA's path.

Changing Devi's application password isn't supported by this evidence. The attempt didn't reach application authentication. Re-approving the request doesn't repair DNS either.

The authorized infrastructure/network team must correct the dependency under its operating process. The ISC team must then address the affected work using the supported recovery procedure and verify the entitlement on the intended account.

Restoring name resolution alone doesn't prove the earlier failed update has now succeeded.

## A different cluster is not automatically a standby for this source

**Disaster recovery**, or **DR**, concerns restoring service after a broader failure, such as loss of a hosting location.

The source-to-cluster association matters here.

In SailPoint's documented all-members-running strategy, VAs in different locations belong to one cluster and can handle its requests. That arrangement needs appropriate target connectivity and consideration of network latency from each location.

**Latency** is delay in communication. A distant VA can have a working connection that is still less suitable for the workload than a nearby one.

SailPoint also documents a switch-clusters strategy: a primary cluster and a separately running DR cluster. In that arrangement, the DR cluster isn't handling the source's work merely because it is powered on.

The sources must be reassociated during that failover. The documented procedure also requires reentering source credentials. Prepare authorized access to those secrets and validate the runbook rather than discovering that dependency during an outage.

A **runbook** records the approved actions, decision conditions, responsibilities, and verification for an operational task.

Don't treat every cluster in a tenant as part of one automatic pool. Two healthy clusters can have different source associations and purposes.

Recovery also needs more than spare machines. Establish which sources are affected, how they will reach their targets from the recovery location, what credentials/configuration are needed, and how you will verify resumed work.

## Updates and replacement still need operational attention

For the standard SailPoint-provided VA image, SailPoint manages the VA software updates. The customer supplies the hosting/connectivity and monitors the deployment.

Rolling updates improve continuity, but the documentation allows interruption of long-running processes under applicable update conditions. A busy process is not an unlimited promise that updates will wait forever.

An inactive member can also affect updating of the cluster. The current standard VA guidance warns that if a member is not connected, updates are not made to the VAs in that cluster. Investigate the actual alert and follow the supported operational process.

**Operating system**, or **OS**, means the system software on which the VA components run. This is different from the external business application's software.

There is also a documented **customer-provided operating system** option. Under that option, the customer has additional operating-system patching, maintenance, and reboot responsibilities while accepting SailPoint software updates as documented. Don't transfer the standard-image operating assumptions to a different deployment option without checking them.

For replacement or relocation, SailPoint strongly advises against moving or migrating existing VAs. The supported approach uses newly created VAs, establishes connectivity, and changes source associations as required before retiring the old deployment through the approved process.

Don't turn that description into an instruction to delete or rebuild a production cluster before diagnosing the issue. Inventory the affected sources and preserve evidence first.

A cluster restart, a source reassociation, and VM replacement have different scopes. Each can affect working integrations as well as the failing one. Use the specific documented procedure and verify the affected work afterward.

## What if the operation was interrupted after the target changed?

A different failure needs different reasoning.

Suppose a target applies a permission update, but the operation's response is interrupted. The target now shows the permission while the recorded outcome does not establish a completed result.

That scenario is different from the DNS failure above, where the supplied evidence shows the target was not reached.

A timeout or lost response alone does not prove that no target-side change occurred. Inspect the target evidence and the operation's supported recovery behavior before repeating it.

Don't assume every retry is harmless or that every operation has the same duplicate-prevention behavior. Identify the operation and its actual outcome.

The same care applies after a cluster is restored. “The VA is Connected again” answers an appliance-health question. It doesn't establish that all interrupted aggregations and provisioning operations completed successfully.

ISC can still display previously collected account information during a connectivity problem. The age and scope of that observation matter. A failed read is not evidence that the employee left or that every account on the source disappeared.

## Test your reading of the connection

### 1. A source and two appliance names

AssetDesk is associated with `C-Asset-Prod`, containing two running members. A colleague says only `va-asset-01` can ever run its connector work because that was the first VA created.

**Worked reasoning:** The source is associated with the cluster, whose running members poll its work queue. The documented arrangement permits either member to handle work. Establish member-level connectivity and actual operation evidence; don't infer a permanent first-created-worker rule.

### 2. Open the firewall inward?

An engineer says ISC must open a fresh inbound connection to the VA for each aggregation because the work originates in the cloud.

**Worked reasoning:** Work origin and connection initiation are different. The VA makes outbound cloud communication and polls for cluster work; responses can return over that initiated communication. Use the documented network configuration, not a newly exposed inbound service invented from the diagram.

### 3. Connected, but not resolving the target

The remaining VA is Connected, but its diagnostic evidence shows that the configured AssetDesk hostname cannot be resolved.

Should you reset the integration credential?

**Worked reasoning:** That action isn't justified by these facts. The demonstrated failure is before target authentication. Establish the source endpoint and the VA's DNS/network path, correct the authorized dependency, and recover/verify the affected work separately.

### 4. The spare cluster is healthy

A separate DR cluster is running, but AssetDesk remains associated with its failed primary cluster. The organization uses the documented switch-clusters strategy.

Will the source automatically use the unrelated healthy cluster?

**Worked reasoning:** Not in that arrangement. The source association has to be changed through the failover process, including the documented credential requirements. Check recovery-location connectivity, affected sources, authorization, and the planned validation. A powered-on cluster alone is not a failover plan.

### 5. The update is rolling, so nothing can stop

Two VAs are deployed. An engineer assumes a rolling update guarantees that every long-running aggregation continues uninterrupted.

**Worked reasoning:** That guarantee doesn't follow. The documentation allows interruption under update conditions. Verify the particular process and operation result, and use the applicable recovery procedure when needed. Cluster availability and uninterrupted completion of one job are different claims.

### 6. The target already has the permission

After an interrupted operation, current AssetDesk evidence shows `asset.read` on the intended account, but the operation's recorded result is inconclusive.

Does a timeout prove that nothing happened?

**Worked reasoning:** No. The current target state must be considered alongside the recorded attempt and relevant audit evidence. Determine whether the desired change occurred and how the operation should be reconciled or recovered. Don't blindly repeat an operation based only on an incomplete response.

## Apply the same reasoning to another source

A company connects Payroll through a VA-based source. Its cluster has two VAs on different hosts, but both depend on one network route to the Payroll server.

The route fails. Both VAs can still communicate with the required cloud services. The Payroll account data visible in ISC was collected before the failure.

Explain why counting two appliances doesn't solve this incident, which evidence you would gather, and what would establish recovery.

**Worked reasoning:** The deployment has appliance redundancy but retains a shared target-network dependency. Both members can communicate with the cloud while neither can reach Payroll through the failed route.

Establish the source's configured cluster and target, each member's target-connectivity results, the network event, and the affected read/write operations. Treat the visible account data as the earlier collected observation, not a fresh Payroll check.

The authorized network team must address the route. The ISC team must identify and recover affected work under the supported procedures and verify representative read and write outcomes appropriate to the source's capabilities. Preserving unrelated approved access remains part of that verification.

If you explain the system to another engineer, connect three different facts: the source configuration identifies its cluster, running members obtain work through their cloud communication, and the chosen member still needs a working, authorized path to the external system. That is what makes a second appliance useful rather than merely present in a list.
