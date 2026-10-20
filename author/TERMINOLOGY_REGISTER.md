# Terminology register

Updated: October 20, 2026.

This is an author maintenance aid for the meanings used in the current lessons. It is the seed for the later learner glossary, not an implemented glossary or tooltip system. Existing claim verification dates and applicability limits remain in REFERENCE_RECORDS.md.

A lesson explains each necessary term where it becomes useful. Use the concrete role it plays there: a missing target account, the collected representation, or the operation being attempted. The invariant below controls meaning; it does not require copying a dictionary paragraph into every lesson.

| Term | Meaning to preserve | Boundary to preserve |
|---|---|---|
| Identity | ISC's representation of a person or other entity, connecting relevant attributes, accounts, and access | It is not a target-system account |
| Account | A record used by a person or service in a particular system | The target record and ISC's representation are distinct |
| Source | ISC's configured representation of a system or collection of account data | Creating it does not create or replace the external application |
| Enterprise application | The actual external business software and its own account/access behavior | It is not the ISC access-application configuration or necessarily the same system as the entitlement source |
| Access application | ISC grouping/configuration for source access profiles in requests and configured password-management functions | It is not an SSO trust, native app deployment, new connector, or proof of all application permissions |
| Account source for an access application | Source supplying the relevant account and access data for that configuration | A business-facing name does not prove where the native application account or password lives |
| Access catalog | Discoverable access offerings presented to a requester | It is not a complete inventory of held access or a required additional object named Catalog |
| Requester / recipient | Person initiating a request / identity intended to receive its access | Their eligibility, permissions, and account context must not be treated as interchangeable |
| Access-request segment | Configured audience limiting requester visibility of associated items | Documented on-behalf requests can concern authorized other recipients; it is not universal recipient eligibility or runtime authorization |
| Identity provider / SSO | Sign-in authority / shared sign-in arrangement for participating applications | A catalog or access-application configuration does not establish the application's IdP trust or every permission |
| Application session | Continuing signed-in application context after authentication | It need not immediately reflect a membership change; catalog changes do not prove session termination |
| Connector | The integration used to read data and perform supported configured operations | Read support does not prove write support, privileges, or success |
| Direct connection | Configured connectivity to the external system rather than only an uploaded account export | It does not mean every operation is supported or that all connectors share one hosting path |
| Flat file connection | Account data supplied through a configured file input | For the read-only file source taught here, importing a file is not writing a change into the external application |
| Authoritative source | The source used through an identity profile to establish an identity population | It need not supply every identity attribute and does not imply unrestricted write access |
| Identity profile | Configuration associated with an authoritative population, including identity-attribute mappings and applicable settings | Creating a connection alone does not supply the full population and mapping design |
| Account schema | The source account attributes and their organization, including the designated Account ID and Name | A schema does not confer external read permission or create external fields |
| API / endpoint | A software interface for exchanging information or operations / an address for a particular API service or operation | Access to one endpoint does not prove all read and write operations are available |
| Source owner / entitlement owner | Assigned ownership of the source / of an access item | Ownership can route applicable work; it does not confer external administrative authority |
| Attribute | A named value on a particular record | Identical names on different records do not make one shared value |
| Account attribute | A named piece of information on one source account | Correlation does not turn every account attribute into an identity attribute |
| Identity attribute | Information recorded/calculated on the person-level identity | Its selected input and calculation come from configuration, not merely matching field names |
| Entitlement attribute | Information describing the represented access item | An account field marked Entitlement carries membership/access values; it remains an account field |
| Entitlement type / schema | Kind of access item within a source / its attributes and designated ID/Name | Membership references require the correct source/type relationship and matching designated ID values |
| Mapping | Configuration specifying how an output attribute obtains its input/value | Input selection/calculation does not by itself write back to the source |
| Transform | Configured logic with inputs and outputs for attribute calculations | Calculating an identity value does not rewrite the collected input account value |
| Attribute synchronization | Configured provisioning of selected account attributes from corresponding identity attributes | Eligibility and existing correlation are required; mapped nulls can propagate and target outcomes must be checked |
| Multi-valued | An attribute can hold a collection of values | A list of identifiers is not one joined identifier; support depends on schema/feature |
| Aggregation | Collecting source account or access data into ISC within the applicable scope | It is not itself a grant, and observation is not a perpetual live guarantee |
| Account correlation | Associating a collected source account with the appropriate ISC identity | It does not authenticate a sign-in or create a missing target account |
| Entitlement | An access item represented from a source, such as a permission or group membership | The external system determines its operational meaning |
| Access profile | A bundle of related entitlements from one source | Detection/assignment and original delivery history must not be conflated |
| Role | An access grouping whose assignment represents required access for a responsibility or population | Criteria, requested assignment, and fulfilled target access are different evidence |
| Direct entitlement in a role | A source entitlement included in the role without an access-profile intermediary | It still uses supported source/account fulfillment; it is not a bypass or the same as a direct-permissions schema type |
| Access assignment | Association of access with its recipient under applicable configuration or a request | Definition, assignment, delivery, and current target state are separate |
| Access-profile detection | Recognition during processing that held access matches the profile's entitlement contents | It does not prove ISC originally granted the permissions or a broader role was assigned |
| Requestable | Available to request under the configured process | It does not establish approval or successful delivery |
| Access-object owner | Person assigned responsibility for an access-model object | Ownership does not automatically confer that object's access |
| Revocation versus definition deletion | Removing an applicable access assignment versus removing its model object | Role disablement/deletion and access-profile deletion do not deprovision previously granted access |
| Access request | Asking for specified access for a specified recipient | Request, approval, and delivered access are separate |
| Provisioning | Carrying out supported account or access changes | Initiation or processing completion does not validate target success |
| Deprovisioning | Removing previously granted account access or permissions through the applicable operation | A permission removal need not delete the account or end every session |
| Target system | The system receiving the attempted account or access change | The same external system can supply source data in the read direction |
| Identity processing | Evaluating identity information and applicable configured access | It can initiate changes; it does not prove their target outcome |
| Lifecycle state | A configured business stage used to drive applicable account and access actions | LCS is informal shorthand, not an additional object or guaranteed UI label |
| Certification campaign | The organizing set of access-review work | It is not the individual review assigned to a reviewer |
| Certification | An assigned review within a campaign | Supported decisions depend on the access and assignment model |
| Remediation | Work to carry out an access correction and verify its result | A recorded revoke decision alone is not completed removal |
| Authentication | Verification of a claimed identity under the applicable requirements | Successful authentication does not justify every permission |
| Authorization | Deciding whether an actor may perform a particular operation on a resource | Business approval and runtime application enforcement are distinct contexts |
| Front end / back end | User interface / trusted application processing | Hiding an interface control does not enforce the protected operation |
| Object ID | Technical identifier of a particular ISC record | Establish object type and tenant context; it is not automatically an employee number or source-system key |
| Native identity | Identifier of an account in its source-system context | Connector-specific meaning; do not assume a username, ISC account object ID, or schema-determined UUID is a universal alias |
| Business identifier | Organization-managed identifier such as an employee number | Its uniqueness, stability, and reuse depend on business policy; correlation use does not make it the ISC identity ID |
| Display name | Human-readable label for a represented record | A matching label does not prove identical objects, sources, access, or unchanged native identifiers |
| Reference | Relationship pointing to a particular other record | Resolve the target and its context; reference existence is not proof of business correctness, grant, or target success |
| Account ID / Account Name schema designations | Selected attributes identifying/naming accounts in a source schema | Changing designations after aggregation is different from editing a friendly label and carries documented duplicate/reference risks |
| Entitlement object ID / source value | ISC entitlement-record identifier / access-item value in the source context | Membership linking uses configured type/schema and designated source ID values, not an arbitrary display label |
| Search accountId | Search account-context field using source aiqAccountName when available, otherwise account display name | Do not equate it with account API object id or generalize one interface's field semantics to another |
| Tenant / environment | Particular hosted ISC context / operating context such as production or test | Copied labels and native keys do not prove cross-context object equivalence |
| One-to-many identity/account relationship | One identity can be associated with multiple account records, including multiple accounts on one source | Association does not merge accounts or duplicate person identities; shared-account responsibility is a different relationship |
| Account Attribute transform input selection | Configured lookup of an account attribute; default oldest-first with non-null fallback, subject to filter/sort/first-account settings | This value-lookup default is not a universal provisioning account-selection rule |
| Multiple Account Options | Access-profile account criteria for automatic profile provisioning through role/lifecycle assignment | Not applied to Request Center request selection or a single-account identity on that source; zero/multiple matches fail the applicable provisioning, with manual selection only if enabled |
| Request account selection | Requester chooses the intended source account when the recipient has multiple accounts in the documented Request Center path | Recipient identity, selected account, approval, and delivery remain distinct; an existing profile cannot simply be re-requested for another account |
| Uncorrelated versus incorrectly correlated | Not matched to an authoritative identity versus matched to the wrong identity | Neither is equivalent to an external account disable/delete; uncorrelated-account searches do not expose every wrong-person association |
| Account removal versus external deletion | Removing ISC's representation versus deleting the external system's account | The source account can be re-collected if it still exists; continuing access assignments must also be examined |
| ISC tenant | Particular organizational environment within the hosted service, containing configuration and represented information | Not an external application, identity profile, source, VA cluster, or customer-owned physical server |
| Software as a service / SaaS | Vendor-operated hosted application service | Hosting does not decide business access, correct customer data, supply external credentials/privileges, or verify every target result |
| Operational responsibility boundary | Distinction among service operation, customer configuration/governance, integration dependencies, and target-system enforcement | An investigation map, not a universal blame assignment or contractual SLA |
| Integration identity / recipient account / ISC administrator | Actor connecting to the external system / account receiving the access / actor administering ISC | Different credentials and permissions; tenant Org Admin is not automatic external application authority |
| Virtual Appliance / VA cluster | Customer-deployed Linux-based VM supporting integration / grouping of appliances associated with source work | Not a full tenant or a requirement for every connector; distinguish source association, member connectivity, vendor software updates, and any additional customer-provided OS duties |
| SaaS connector | Supported connection path without a customer-deployed VA cluster | External API credentials, privileges, target behavior, and applicable connectivity still matter |
| Sandbox versus production destination | ISC testing environment versus live environment and the actual external system each integration reaches | A sandbox tenant/badge does not itself block writes to a production target or make production data appropriate for all testers |
| Polling / cluster work queue | Running VAs ask for work addressed to their associated cluster / pending connector requests | Documented model, not a claim about exact queue acknowledgements, retry timing, exactly-once effects, or an invariant worker choice |
| Outbound initiation versus work direction | VA initiates required cloud communication while ISC operations originate requested work | Responses return over initiated communication; do not invent an unsolicited inbound connection per operation or confuse cloud reachability with target reachability |
| Pairing / cluster passphrase | Supported appliance registration/configuration with tenant and cluster / consistent cluster setup secret | A saved unpaired record is not operational; setup secret differs from OS login, source credential, and recipient password |
| Cloud Connector Gateway / CCG | Default applicable ISC cluster component for the core VA connector path | Not the entire hosted platform or proof that unrelated standalone component deployments support the intended source work |
| Connected / Busy scope | Documented VA operating state / process unavailable for new processing or updates while busy | Appliance/process health is not a guarantee of every target operation, tenant outage, or successful recovery of prior work |
| High availability / disaster recovery | Capacity/redundancy for component unavailability / recovery after wider failures | Shared hosting/network/target dependencies remain; a separate running cluster is not automatic failover under the documented switch-clusters strategy |
| DNS / TLS / proxy | Name resolution / protected communication with applicable peer-trust checks / traffic forwarding intermediary | Diagnose from the actual VA position; reachability, secure trust, authentication, and operation privilege are separate boundaries |
| Interrupted operation outcome | Recorded response may not establish whether a target change occurred | Inspect actual target and audit evidence before retry; restored VA health does not prove all affected jobs completed |

## Source anchors

The lesson-specific mappings and check dates are in [reference records](REFERENCE_RECORDS.md). The core anchors are [identities](https://documentation.sailpoint.com/saas/help/identities/index.html), [sources](https://documentation.sailpoint.com/saas/help/sources/index.html), [correlation](https://documentation.sailpoint.com/saas/help/accounts/correlation.html), [access objects](https://documentation.sailpoint.com/saas/help/access/index.html), [provisioning](https://documentation.sailpoint.com/saas/help/provisioning/index.html), [identity processing](https://documentation.sailpoint.com/saas/help/setup/identity_processing.html), [certifications](https://documentation.sailpoint.com/saas/help/certs/understanding_certifications.html), and [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).

When a meaning is corrected, locate its uses across lessons and assessments, recheck relevant sources, and update affected explanations. Varying wording for its own sake is not a substitute for explaining the term in context.
