# SailPoint ISC: Understand the System, Think Like an Engineer

Working course design and complete table of contents. This outline incorporates the agreed lifecycle-module split and is governed by the [teaching specification](TEACHING_SPECIFICATION.md).

## What this course is designed to achieve

This course develops a practical understanding of SailPoint Identity Security Cloud: its objects, data, decisions, processing, integrations, and governance activities.

It is for beginners and freshers who have some IAM knowledge and want to understand how ISC works well enough to reason through everyday work and contribute to new projects.

After completing it, learners should be able to:

- Explain how information enters ISC and becomes connected identity and access data.
- Trace a value from its source through identity calculations to its use in an access decision or account change.
- Explain why a person has access and what determines whether that access is retained or removed.
- Follow provisioning across ISC, its connectivity components, and the target system.
- Distinguish a configured intention, an approval, an attempted action, and a verified outcome.
- Investigate common symptoms by selecting useful evidence.
- Translate business requirements into an initial ISC design.
- Explain their reasoning to another engineer, an application owner, or a business stakeholder.

The theory course establishes these reasoning skills. The later practical course develops configuration fluency and verifies that learners can execute changes correctly.

## Who the course assumes is reading

Learners should already recognize users, accounts, groups, permissions, authentication, and authorization. They do not need prior ISC administration experience, programming experience, or a training tenant.

An optional readiness bridge fills specific gaps. Each lesson also introduces the ISC concepts it needs so that someone can enter the course at that lesson.

Small configuration examples and API responses are included when they reveal behavior. Reading them belongs in the theory course; building integrations and writing substantial configurations belong in the practical course.

## How the teaching will work

### Concepts provide the continuity

The course order follows concept dependencies. Each lesson provides enough context and supporting explanation to be independently understandable. Optional links provide additional depth.

Fictional companies and employees support explanations. No continuing fictional story is required to understand later material. Examples state their relevant data, configuration, connector capabilities, and starting state.

### Every substantial topic must reach sufficient depth

| Dimension | What learners must understand |
|---|---|
| Purpose | The problem the concept solves and why an engineer needs it. |
| Objects and data | The participating objects, their attributes, and where the information originates. |
| Dependencies | What must already exist or be correct. |
| Trigger and timing | What initiates processing and what influences when results become visible. |
| Logic | The documented conditions and decisions that determine the result. |
| Flow | How information and actions move between the relevant components. |
| State changes | What changes, what remains unchanged, and what downstream work follows. |
| Evidence | Where the engineer can inspect the result and what that evidence establishes. |
| Failure behavior | How missing data, conflicting conditions, unsupported operations, and partial failures affect the outcome. |
| Engineering judgment | How to choose an approach, assess a change, or investigate a symptom. |

These are topic-level requirements. Individual lessons use the structure that best explains their subject. There is no fixed word count or maximum lesson count.

### Lessons use several teaching formats

- A mechanism explained through a small example.
- A flow traced across systems.
- A comparison between two configurations.
- A before-and-after examination of records.
- An investigation using simulated evidence.
- A design decision with competing requirements.
- An explanation of a common misunderstanding.

Every module contains reasoning checkpoints with explained answers. Questions test the mechanism and why plausible alternative answers fail.

### Frontend and backend remain connected

When showing a screen, identify the object or state displayed, its source, and the processing behind the visible action.

Backend explanations cover documented responsibilities, inputs, decisions, execution boundaries, and outcomes. Do not invent private services, database structures, or guaranteed execution timings.

### The voice stays clear and human

Use the voice of an experienced engineer patiently explaining something to a junior colleague. Use plain English, precise terminology, short paragraphs, and concrete examples. Explain unfamiliar terms when they become necessary.

Show the reasoning behind checks. Avoid calling difficult concepts easy, filling lessons with motivational language, or repeating definitions without developing them.

## How the course is organized

| Part | Working module references | Main learning progression |
|---|---|---|
| I. Understand the system | 1-3 | Responsibilities, objects, architecture, and execution boundaries. |
| II. Bring data into ISC | 4-7 | Sources, schemas, aggregation, identities, and correlation. |
| III. Calculate and process identity information | 8-9 | Transforms, dependencies, timing, and identity processing. |
| IV. Model and deliver access | 10-14 | Entitlements, access profiles, roles, provisioning, and account data. |
| V. Handle business events and requests | 15, 16A, 16B, 16C, 17 | Lifecycle states, joiners, movers, leavers, and requested access. |
| VI. Review and correct access | 18-19 | Certifications, remediation, and separation of duties. |
| VII. Extend and operate ISC | 20-23 | APIs, workflows, rules, evidence, and troubleshooting. |
| VIII. Apply the understanding to projects | 24-25 | Application onboarding, change planning, and unfamiliar case studies. |

A concept has a primary teaching location for comprehensive coverage. Later lessons restate the supporting explanations they need and apply the concept to new situations. Module numbers are working display labels; authored lessons receive permanent identifiers.

# Complete table of contents

## Optional readiness bridge

These short catch-up lessons are selected through a readiness check.

- B.1 Authentication, authorization, provisioning, and governance.
- B.2 Users, accounts, groups, permissions, and application roles.
- B.3 Records, attributes, identifiers, relationships, and uniqueness.
- B.4 Reading a small JSON object: names, values, lists, and nested data.
- B.5 Understanding missing, empty, null, and conflicting values.
- B.6 Reading dates, timestamps, time zones, and simple event timelines.

**Readiness outcome:** Interpret the records and relationships used throughout the course.

## Part I. Understand the system

### Module 1. What is ISC responsible for?

- 1.1 [The business problems that lead an organization to implement ISC](lessons/SYS-001_Why_an_Organization_Needs_ISC.md).
- 1.2 [Where identity governance connects with authentication and application authorization](lessons/SYS-002_Authentication_Authorization_and_ISC.md).
- 1.3 [Responsibilities of HR, directory teams, application owners, managers, and ISC engineers](lessons/SYS-003_Who_Owns_What_in_Identity_and_Access.md).
- 1.4 [What the organization intends, what ISC knows, and what the application currently allows](lessons/SYS-004_Intended_Known_and_Effective_Access.md).
- 1.5 [How implementation, administration, support, and governance work relate](lessons/SYS-005_Implementation_Administration_Support_and_Governance.md).
- 1.6 [Following an access problem across the enterprise: a first system map](lessons/SYS-006_Following_an_Access_Problem_Across_the_Enterprise.md).

**Outcome:** Explain which system or team owns each part of an identity and access situation.

### Module 2. What are the objects, and how do they connect?

- 2.1 [A person, an identity, and an account: what each represents](lessons/FND-001_Identity_and_Account.md).
- 2.2 [Sources, connectors, and the systems they connect to](lessons/FND-002_Sources_Connectors_and_Connected_Systems.md).
- 2.3 [Account attributes, identity attributes, and entitlement attributes](lessons/FND-003_Account_Identity_and_Entitlement_Attributes.md).
- 2.4 [Entitlements, access profiles, and roles: an initial relationship map and example](lessons/FND-004_Entitlements_Access_Profiles_and_Roles.md).
- 2.5 [Sources, access applications, catalogs, and sign-in experiences](lessons/FND-005_Sources_Access_Applications_Catalogs_and_Sign_In.md).
- 2.6 [Object IDs, account identifiers, display names, and reference relationships](lessons/FND-006_Object_IDs_Account_Identifiers_and_References.md).
- 2.7 [One identity with multiple accounts: reading the relationships correctly](lessons/FND-007_One_Identity_with_Multiple_Accounts.md).

**Outcome:** Draw and explain an object map without confusing records that represent different things.

FND-001 is the existing foundation pilot for identities and accounts, now reviewed in course order. FND-002 is the authored source/connector lesson, and FND-003 covers attributes on the different objects. Their supporting explanations do not replace the later primary-mechanism lessons. FND-004 is the authored Module 2.4 access-object relationship lesson, and FND-005 explains application/source/catalog and sign-in boundaries. FND-006 is the authored Module 2.6 lesson on identifiers, display names, and reference relationships. FND-007 completes the authored Module 2 sequence with multiple-account relationship and selection reasoning. All seven files are authored; learner validation and formal publication review remain pending. Detailed access-model mechanics follow in Modules 10-12.

### Module 3. Where does the work run?

- 3.1 [The ISC tenant and the responsibilities retained by the customer](lessons/ARC-001_ISC_Tenant_and_Customer_Responsibilities.md).
- 3.2 [Virtual Appliances and clusters: their place in a connection](lessons/ARC-002_Virtual_Appliances_and_Clusters.md).
- 3.3 [SaaS connectors and their connection path](lessons/ARC-003_SaaS_Connectors_and_Their_Connection_Path.md).
- 3.4 [Where IQService fits when a connector requires it](lessons/ARC-004_Where_IQService_Fits.md).
- 3.5 [Network reachability, authentication, permissions, and operation support](lessons/ARC-005_Connection_Dependencies_and_Operation_Support.md).
- 3.6 [How UI actions, APIs, and automation interact with platform capabilities](lessons/ARC-006_UI_APIs_Automation_and_Platform_Capabilities.md).
- 3.7 [Signing into ISC, external identity providers, and source password operations](lessons/ARC-007_Signing_Into_ISC_Identity_Providers_and_Source_Passwords.md).
- 3.8 [Requesting work, executing work, and observing completion](lessons/ARC-008_Requesting_Executing_and_Observing_Work.md).

**Outcome:** Locate an operation's execution boundary and identify the dependencies needed for it to work.

ARC-001 is the authored Module 3.1 lesson on tenant, service, customer, and connected-system responsibilities. ARC-002 is the authored Module 3.2 lesson on VA/cluster execution, communication, health, and recovery boundaries. ARC-003 is the authored Module 3.3 lesson on SaaS connector execution, external API authority, read/write flows, evidence, and migration boundaries. ARC-004 is the authored Module 3.4 lesson on IQService's operation-specific Windows role, secured connection and credential boundaries, evidence, and shared-service dependencies. ARC-005 is the authored Module 3.5 lesson on connection dependencies, operation-specific support/authority/input, failure evidence, and outcome recovery. ARC-006 is the authored Module 3.6 lesson on UI/API entry points, operation semantics, caller authority, request references, configured automation and execution evidence. ARC-007 is the authored Module 3.7 lesson on ISC sign-in alternatives, SAML trust and matching, MFA/recovery, source-password operations and session boundaries. ARC-008 is the authored Module 3.8 lesson on accepted work, required decisions, execution, scoped completion evidence, partial outcomes and supported recovery. All eight Module 3 lessons are authored; learner validation and formal publication review remain pending.

Connection diagrams follow the documented distinction between VA-based and SaaS connectivity. They must not imply that every connector uses a VA. [Managing sources](https://documentation.sailpoint.com/saas/help/sources/index.html)

## Part II. Bring data into ISC

### Module 4. What must we understand before configuring a source?

- 4.1 [The purpose of a source and the population it represents](lessons/SRC-001_The_Purpose_of_a_Source_and_Its_Population.md).
- 4.2 [Authoritative and non-authoritative sources: deciding their responsibilities](lessons/SRC-002_Authoritative_and_Non_Authoritative_Sources.md).
- 4.3 [Reading a connector capability matrix: supported reads and supported changes](lessons/SRC-003_Reading_a_Connector_Capability_Matrix.md).
- 4.4 [Account schemas, account identifiers, and display attributes](lessons/SRC-004_Account_Schemas_Identifiers_and_Display_Attributes.md).
- 4.5 [Attribute types, multivalued attributes, and data-format expectations](lessons/SRC-005_Attribute_Types_Multiple_Values_and_Data_Formats.md).
- 4.6 [Entitlement membership attributes and entitlement schemas](lessons/SRC-006_Entitlement_Membership_Attributes_and_Entitlement_Schemas.md).
- 4.7 [Filters and collection scope: which records are included or excluded](lessons/SRC-007_Filters_and_Collection_Scope.md).
- 4.8 [Data ownership agreements: identifiers, required fields, effective dates, and corrections](lessons/SRC-008_Data_Ownership_Agreements.md).

**Outcome:** Describe what a source must provide and what ISC can reasonably do with it.

SRC-001 is the authored Module 4.1 lesson on source purpose, external context, population boundaries, coverage evidence and operation scope. SRC-002 is the authored Module 4.2 lesson on identity establishment, overlapping authoritative accounts and profile priority, attribute sourcing, authentication and external-change boundaries. SRC-003 is the authored Module 4.3 lesson on operation/object scope, reading versus changing accounts/access, connector support versus target/configuration/authority, and operation-level readiness evidence. SRC-004 is the authored Module 4.4 lesson on account-schema definitions, selected identification/naming attributes, external read/mapping/value tracing, ownership correlation, discovery and post-aggregation change risks. SRC-005 is the authored Module 4.5 lesson on value meaning/type/cardinality, JSON and CSV structure, conversion and missing/empty semantics, dates and downstream evidence. SRC-006 is the authored Module 4.6 lesson on membership references, entitlement objects, source/type/ID relationships, multiple access types, collection and UI evidence, metadata and safe schema-change reasoning. SRC-007 is the authored Module 4.7 lesson on population and collection scope, filter direction/location, actor visibility, account/object/membership coverage, completeness, aggregation modes and safe exclusion reasoning. SRC-008 is the authored Module 4.8 lesson on field authority, producer/integration/consumer agreements, requiredness and temporal meaning, correction ownership, synchronization boundaries and acceptance evidence. All eight Module 4 lessons are authored. Learner validation and formal publication approval remain pending.

### Module 5. How does aggregation change what ISC knows?

- 5.1 [Following an account record from a source into ISC](lessons/AGG-001_Following_an_Account_Record_into_ISC.md).
- 5.2 [Account aggregation and entitlement aggregation: their different responsibilities](lessons/AGG-002_Account_and_Entitlement_Aggregation.md).
- 5.3 [Full aggregation, optimization, and reprocessing unchanged records](lessons/AGG-003_Full_Aggregation_Optimization_and_Reprocessing.md).
- 5.4 [Delta aggregation: supported behavior and connector-specific limitations](lessons/AGG-004_Delta_Aggregation_and_Connector_Limitations.md).
- 5.5 [Single-account aggregation: its purpose and boundaries](lessons/AGG-005_Single_Account_Aggregation.md).
- 5.6 [Schedules, collection scope, dependencies, and data freshness](lessons/AGG-006_Schedules_Scope_Dependencies_and_Data_Freshness.md).
- 5.7 [Missing records, account deletion settings, and deletion safeguards](lessons/AGG-007_Missing_Records_Account_Deletion_and_Safeguards.md).
- 5.8 [Reading aggregation outcomes: counts, warnings, failures, and incomplete collection](lessons/AGG-008_Reading_Aggregation_Outcomes.md).
- 5.9 [Investigating a missing or stale account without assuming the cause](lessons/AGG-009_Investigating_a_Missing_or_Stale_Account.md).

**Outcome:** Explain what an aggregation established, what it did not establish, and which next check is useful.

AGG-001 is the authored Module 5.1 lesson on trigger/read scope, response extraction and schema representation, existing-account identification and ownership, identity-value sourcing, processing/provisioning boundaries and evidence. AGG-002 is the authored Module 5.2 lesson on the two collection responsibilities, held values versus object inventory, supported linking, count reconciliation, independent read scopes/times, file boundaries and evidence. AGG-003 is the authored Module 5.3 lesson on full configured-population coverage versus unchanged-record handling, corrected correlation inputs/configuration, run-local request semantics, related-operation boundaries and safe evidence-based reruns. AGG-004 is the authored Module 5.4 lesson on baseline/capture/read/result dependencies, changes versus current population, connector-specific tracking and authority, deletion/omission/retention boundaries, membership coverage and safe recovery evidence. AGG-005 is the authored Module 5.5 lesson on selected-account lookup, identifiers and mappings, UI account-data versus identity/provisioning boundaries, unlock and not-found distinctions, connector operation support, API acceptance and verification. AGG-006 is the authored Module 5.6 lesson on scheduled submission versus actual execution, publication/observation/identity freshness, daily windows and connector-specific time zones, population/mode scope, independent object clocks, conditional dependencies and end-to-end commitments. AGG-007 is the authored Module 5.7 lesson on absence versus deletion, account-deletion/percentage controls and small-source rounding, operation boundaries, authoritative reassignment/deletion/blockers/hidden identities, offboarding and evidence-led recovery. AGG-008 is the authored Module 5.8 lesson on execution/status/details, input and inventory count meanings, partial pagination and record evidence, optimization, identifier-set coverage, entitlement discovery totals, downstream proof and safe recovery. AGG-009 is the authored Module 5.9 lesson on competing hypotheses, source/key/owner and view distinctions, raw-response/root/extraction/schema/correlation evidence, safe correction and stale account/identity/Search branches. All nine Module 5 lessons are authored. Learner validation and formal publication approval remain pending.

Aggregation modes and their limitations are explicit subjects because they do not all perform equivalent work. [Loading account data](https://documentation.sailpoint.com/saas/help/accounts/loading_data.html)

### Module 6. How are identities created and populated?

- 6.1 [How an authoritative source and an identity profile participate in identity creation.](lessons/IDN-001_Authoritative_Sources_Identity_Profiles_and_Identity_Creation.md) **Authored:** IDN-001 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.

- 6.2 [What an identity profile controls.](lessons/IDN-002_What_an_Identity_Profile_Controls.md) **Authored:** IDN-002 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.

- 6.3 [Mapping account information into identity attributes.](lessons/IDN-003_Mapping_Account_Information_into_Identity_Attributes.md) **Authored:** IDN-003 revision 1.0; documentation-based author review complete, learner validation and formal approval pending. Includes the inline attribute tracing questions and [complete reference aid](assets/ATTRIBUTE_TRACING_GUIDE.txt), revision 1.0.

- 6.4 [Choosing the source of each attribute.](lessons/IDN-004_Choosing_the_Source_of_Each_Attribute.md) **Authored:** IDN-004 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.

- 6.5 [Multiple identity profiles, population boundaries, and priority.](lessons/IDN-005_Multiple_Identity_Profiles_Populations_and_Priority.md) **Authored:** IDN-005 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.

- 6.6 [Required attributes, identity exceptions, and incomplete information.](lessons/IDN-006_Required_Attributes_Identity_Exceptions_and_Incomplete_Information.md) **Authored:** IDN-006 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.

- 6.7 [Changing mappings and understanding their downstream effects.](lessons/IDN-007_Changing_Mappings_and_Understanding_Downstream_Effects.md) **Authored:** IDN-007 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.

- 6.8 [Tracing an incorrect identity value back to its origin.](lessons/IDN-008_Tracing_an_Incorrect_Identity_Value_to_Its_Origin.md) **Authored:** IDN-008 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.

All eight Module 6 lessons are authored; learner validation and formal approval remain pending.

**Outcome:** Explain why an identity exists, which profile governs it, and where its attributes come from.

Identity mappings can use account attributes from different sources; the authoritative source does not have to supply every identity attribute. [Identity profiles](https://documentation.sailpoint.com/saas/help/setup/identity_profiles.html)

### Module 7. How do accounts and managers become associated with identities?

- 7.1 [Why importing an account leaves a relationship to establish.](lessons/COR-001_Why_Importing_an_Account_Leaves_a_Relationship_to_Establish.md) **Authored:** COR-001 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.

All nine Module 7 lessons are authored; learner validation and formal approval remain pending.

- 7.2 [The account and identity attributes used in correlation.](lessons/COR-002_Account_and_Identity_Attributes_Used_in_Correlation.md) **Authored:** COR-002 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 7.3 [Choosing identifiers based on uniqueness, availability, consistency, and stability.](lessons/COR-003_Choosing_Identifiers_for_Reliable_Account_Correlation.md) **Authored:** COR-003 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 7.4 [Following configured matching conditions through concrete records.](lessons/COR-004_Following_Configured_Correlation_Conditions_Through_Records.md) **Authored:** COR-004 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 7.5 [Missing values, unmatched accounts, and ambiguous data.](lessons/COR-005_Missing_Values_Unmatched_Accounts_and_Ambiguous_Data.md) **Authored:** COR-005 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 7.6 [Existing associations and changes to source data or correlation configuration.](lessons/COR-006_Existing_Associations_and_Changes_to_Correlation_Data_or_Configuration.md) **Authored:** COR-006 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 7.7 [Manual correction: what relationship changes and what still needs investigation.](lessons/COR-007_Manual_Correction_and_What_the_Relationship_Change_Does_Not_Resolve.md) **Authored:** COR-007 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 7.8 [Manager correlation and the dependencies of manager-based processes.](lessons/COR-008_Manager_Correlation_and_Dependencies_of_Manager_Based_Processes.md) **Authored:** COR-008 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 7.9 [Investigating an account linked incorrectly, an unmatched account, or a missing manager.](lessons/COR-009_Investigating_Incorrect_Account_Links_Unmatched_Accounts_and_Missing_Managers.md) **Authored:** COR-009 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.

**Outcome:** Explain a correlation result and distinguish a data problem from a configuration or processing problem.

Existing associations, default behavior, and re-evaluation must follow documented correlation behavior. [Account correlation](https://documentation.sailpoint.com/saas/help/accounts/correlation.html)

## Part III. Calculate and process identity information

### Module 8. How do transforms calculate values?

- 8.1 [Choosing between direct mapping and calculated values.](lessons/TRN-001_Choosing_Between_Direct_Mapping_and_Calculated_Values.md) **Authored:** TRN-001 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 8.2 [Reading a transform's inputs, operation, configuration, and output.](lessons/TRN-002_Reading_a_Transforms_Inputs_Operation_Configuration_and_Output.md) **Authored:** TRN-002 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 8.3 [Normalizing and combining strings.](lessons/TRN-003_Normalizing_and_Combining_Strings.md) **Authored:** TRN-003 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 8.4 [Handling missing values with fallbacks.](lessons/TRN-004_Handling_Missing_Values_with_Fallbacks.md) **Authored:** TRN-004 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 8.5 [Lookups and conditional decisions.](lessons/TRN-005_Lookups_and_Conditional_Decisions.md) **Authored:** TRN-005 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 8.6 [Formatting and comparing dates, including time-zone considerations.](lessons/TRN-006_Formatting_and_Comparing_Dates_and_Time_Zones.md) **Authored:** TRN-006 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 8.7 [Composing operations and following intermediate values.](lessons/TRN-007_Composing_Operations_and_Following_Intermediate_Values.md) **Authored:** TRN-007 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 8.8 [Calculation context, dependencies, and reevaluation.](lessons/TRN-008_Calculation_Context_Dependencies_and_Reevaluation.md) **Authored:** TRN-008 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 8.9 [Investigating failed calculations and misleading fallback values.](lessons/TRN-009_Investigating_Failed_Calculations_and_Misleading_Fallback_Values.md) **Authored:** TRN-009 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.

**Outcome:** Explain a transform's result, test its assumptions with sample data, and recognize when its output can be wrong.

Teach input-to-output reasoning before configuration syntax. [Transforms](https://developer.sailpoint.com/docs/extensibility/transforms/)

### Module 9. When does ISC reevaluate an identity?

- 9.1 [Aggregation, identity processing, provisioning, and attribute synchronization.](lessons/PRC-001_Aggregation_Identity_Processing_Provisioning_and_Attribute_Synchronization.md) **Authored:** PRC-001 revision 1.0; documentation-based author review complete, learner validation and formal approval pending. Includes inline comparison and [complete reference aid](assets/PROCESSING_COMPARISON_GUIDE.txt), revision 1.0.
- 9.2 [Event-based processing and the changes that initiate it.](lessons/PRC-002_Event_Based_Identity_Processing_and_Its_Triggers.md) **Authored:** PRC-002 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 9.3 [Scheduled and time-based processing.](lessons/PRC-003_Scheduled_and_Time_Based_Identity_Processing.md) **Authored:** PRC-003 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 9.4 [Manual processing and applying configuration changes.](lessons/PRC-004_Manual_Identity_Processing_and_Applying_Configuration_Changes.md) **Authored:** PRC-004 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 9.5 [Reevaluating identity values, manager relationships, lifecycle access, and role assignments.](lessons/PRC-005_Reevaluating_Identity_Values_Manager_Relationships_Lifecycle_Access_and_Role_Assignments.md) **Authored:** PRC-005 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 9.6 [Identity states and participation in processing.](lessons/PRC-006_Identity_States_and_Participation_in_Processing.md) **Authored:** PRC-006 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 9.7 [Ordering, dependencies, queued work, and visibility delays.](lessons/PRC-007_Ordering_Dependencies_Queued_Work_and_Visibility_Delays.md) **Authored:** PRC-007 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 9.8 [Investigating "the data changed, but the expected result did not."](lessons/PRC-008_Investigating_Changed_Data_Without_the_Expected_Result.md) **Authored:** PRC-008 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.

**Outcome:** Identify which process needs to occur and choose evidence showing whether it did.

Identity processing can start provisioning without validating that provisioning succeeded. Return to this distinction when teaching evidence. [Identity processing](https://documentation.sailpoint.com/saas/help/setup/identity_processing.html)

## Part IV. Model and deliver access

### Module 10. What does an entitlement mean?

- 10.1 [Translating a source-specific permission or group into an entitlement.](lessons/ENT-001_Translating_Source_Permissions_and_Groups_into_Entitlements.md) **Authored:** ENT-001 revision 1.0; documentation-based author review complete, learner validation and formal approval pending.
- 10.2 Entitlement identifiers, display values, types, and metadata.
- 10.3 Account membership information versus the entitlement catalog.
- 10.4 Direct membership, inherited access, and the target application's interpretation.
- 10.5 Ownership, descriptions, and identifying sensitive access.
- 10.6 Investigating unknown, stale, or poorly described entitlements.

**Outcome:** Explain what a governed access item represents and what additional application context is needed.

Separate entitlement aggregation can collect access items that no account currently holds. [Loading entitlement data](https://documentation.sailpoint.com/saas/help/loading_entitlements/index.html)

### Module 11. How should access profiles be designed?

- 11.1 The problem an access profile solves.
- 11.2 Grouping related entitlements from one source.
- 11.3 Choosing names, descriptions, owners, and sensible boundaries.
- 11.4 Enabled access, requestable access, and automatic assignment.
- 11.5 Detecting existing access and provisioning new access.
- 11.6 Changing an access profile and assessing the effect on existing users.
- 11.7 Overlapping profiles and access-removal behavior.

**Outcome:** Design a useful access profile and explain how its assignment history and configuration affect behavior.

Removal behavior must be taught for the specific assignment mechanism. A general rule that another grant always preserves the entitlement would be inaccurate. [Access profiles](https://documentation.sailpoint.com/saas/help/access/access-profiles.html)

### Module 12. How should roles be designed?

- 12.1 Turning a business responsibility into an access requirement.
- 12.2 Roles containing access profiles and direct entitlements.
- 12.3 Membership criteria and explicit membership.
- 12.4 Automatic assignment and requested roles.
- 12.5 How identity-data changes affect role membership.
- 12.6 Multiple roles, overlapping access, and assignment origins.
- 12.7 Role changes, propagation, disabling, and removal implications.
- 12.8 Avoiding excessive roles and designing manageable exceptions.

**Outcome:** Explain who qualifies for a role, what access it represents, and how changes affect existing assignments.

Roles can contain access profiles and direct entitlements; access profiles are not compulsory intermediates for every role entitlement. [Managing roles](https://documentation.sailpoint.com/saas/help/access/roles.html)

### Module 13. How does provisioning reach the target system?

- 13.1 The events and decisions that can initiate provisioning.
- 13.2 Following a change from ISC through the connector to the target.
- 13.3 Account creation and entitlement assignment: their relationship and dependencies.
- 13.4 Existing accounts, multiple accounts, and account-selection decisions.
- 13.5 Create, modify, enable, disable, delete, add-access, and remove-access operations.
- 13.6 Automated fulfillment, manual work, and ticket-based integration patterns.
- 13.7 Accepted work, reported completion, and confirmed target state.
- 13.8 Partial failures, rejected values, insufficient permissions, and retries.
- 13.9 Access removal, remaining assignment requirements, and regrant scenarios.

**Outcome:** Trace a provisioning attempt, locate where it stopped, and define how to verify the result.

### Module 14. Where do account values come from?

- 14.1 Identity mappings, account-creation values, and attribute synchronization.
- 14.2 Create Account configurations and required target attributes.
- 14.3 Account naming, identifiers, uniqueness, and collision handling.
- 14.4 Target formatting and placement requirements.
- 14.5 Attribute synchronization and existing correlated accounts.
- 14.6 Native account changes, conflicting ownership, and overwritten values.
- 14.7 Null values, multiple accounts, and synchronization failures.
- 14.8 Following a value across source data, identity calculation, and target updates.

**Outcome:** Explain which configuration controls a value at each stage and why an update did or did not reach an account.

Account creation and attribute synchronization require separate treatment. Attribute synchronization updates eligible existing correlated accounts; it does not create them. [Account provisioning](https://documentation.sailpoint.com/saas/help/provisioning/create_profile.html), [attribute synchronization](https://documentation.sailpoint.com/saas/help/provisioning/attr_sync.html)

## Part V. Handle business events and requests

### Module 15. How should lifecycle states be understood?

- 15.1 Translating business stages into lifecycle requirements.
- 15.2 HR status, lifecycle state, identity state, and target-account status.
- 15.3 Calculating lifecycle state from attributes and dates.
- 15.4 Access assignments and account actions configured for a state.
- 15.5 Entering a state, reevaluating data, and understanding action timing.
- 15.6 Lifecycle-driven access alongside roles and other assignments.
- 15.7 Investigating a correct lifecycle label with an incorrect access outcome.

**Outcome:** Explain how lifecycle configuration relates to access and account changes.

Lifecycle state, identity state, and target-account status are distinct. Inspect configured actions and results to determine what happened. [Lifecycle states](https://documentation.sailpoint.com/saas/help/provisioning/lifecycle.html), [identity states](https://documentation.sailpoint.com/saas/help/provisioning/identity_states.html)

### Module 16A. How does a person join and receive initial access?

- 16A.1 Prehire records, future start dates, and readiness requirements.
- 16A.2 Joining: identity creation, baseline access, and account dependencies.
- 16A.3 Information generated downstream, such as an account's email address.
- 16A.4 Corrected start dates, cancelled joining events, and late-arriving records.
- 16A.5 Tracing a complete joiner scenario across systems and verifying the result.

**Outcome:** Translate a joining event into expected information, decisions, account changes, and evidence.

### Module 16B. What changes when someone's work changes?

- 16B.1 Department and job changes: evaluating new access and previous access separately.
- 16B.2 Manager and location changes and their wider effects.
- 16B.3 Temporary leave and return.
- 16B.4 Corrected, conflicting, and late-arriving changes during employment.
- 16B.5 Tracing a complete mover scenario, including retained and removed access.

**Outcome:** Explain how changes during employment affect identity information and access, including what should be retained or removed.

### Module 16C. How do leaving, expiry, and rehire affect access?

- 16C.1 Leaving: timing, account actions, access removal, and verification.
- 16C.2 Contractor expiry and extension.
- 16C.3 Rehire: identity continuity, existing accounts, and previous access.
- 16C.4 Corrected termination dates, cancelled departures, and conflicting events.
- 16C.5 Tracing complete leaver and rehire scenarios across systems with different fulfillment capabilities.

**Outcome:** Establish the intended outcome of leaving or returning, identify unresolved actions, and define evidence of completion.

### Module 17. What happens when someone requests access?

- 17.1 How access becomes visible and requestable.
- 17.2 Request eligibility, segmentation, and requests for other people.
- 17.3 Requesters, recipients, managers, owners, and governance groups.
- 17.4 Approval requirements and how decisions move through the process.
- 17.5 Approval, fulfillment, provisioning status, and target usability.
- 17.6 Multiple accounts and request context.
- 17.7 Rejection, cancellation, time-bound requests where supported, and access removal.
- 17.8 Missing approvers, pending requests, and failed fulfillment.
- 17.9 Reading request history to explain what happened.

**Outcome:** Trace a request through decisions and fulfillment and identify evidence needed for an unresolved request.

Distinguish approval history from provisioning events and outcomes. [Access requests](https://documentation.sailpoint.com/saas/help/requests/index.html)

## Part VI. Review and correct access

### Module 18. How do certifications lead to access correction?

- 18.1 The business question an access review is intended to answer.
- 18.2 Campaign scope, population, access items, and reviewers.
- 18.3 Manager, source-owner, and search-based campaign scenarios.
- 18.4 How ownership, descriptions, and data quality affect decisions.
- 18.5 Approve and revoke decisions, including assignment constraints.
- 18.6 Reassignment, unavailable reviewers, and completion responsibilities.
- 18.7 Sign-off, campaign completion, and remediation.
- 18.8 Automated and manual revocation, failures, and confirmation.
- 18.9 Producing evidence that explains the decision and its implemented result.

**Outcome:** Explain the complete path from review scope to verified remediation.

A revoke decision alone does not establish that access has disappeared from the source. [Completing certification campaigns](https://documentation.sailpoint.com/saas/help/certs/completing_campaigns.html)

### Module 19. How should separation of duties be applied?

- 19.1 Business conflicts and the risks created by combinations of access.
- 19.2 Expressing a conflict through governed access.
- 19.3 Evaluating existing access and proposed access changes.
- 19.4 Detection and prevention: understanding the configured capability.
- 19.5 Investigating violations and evaluating business exceptions.
- 19.6 Remediation, ownership, and confirming the conflict has been addressed.

**Outcome:** Explain a conflicting-access condition and propose an evidence-based response.

Detection and prevention must follow applicable policy and request configuration. [Separation of duties](https://documentation.sailpoint.com/saas/help/sod/index.html)

## Part VII. Extend and operate ISC

### Module 20. How should an ISC engineer read and reason about APIs?

- 20.1 Endpoints, methods, resources, and request/response bodies.
- 20.2 Object IDs and relationships in API data.
- 20.3 Credentials, access tokens, expiration, and authentication.
- 20.4 Authorization, user context, permissions, and scopes.
- 20.5 Filtering, sorting, pagination, and incomplete result sets.
- 20.6 Immediate responses, asynchronous work, and completion evidence.
- 20.7 Error responses, throttling, retries, and duplicate-change risks.
- 20.8 Supported versions, endpoint maturity, deprecation, and documentation checks.

**Outcome:** Interpret a small API exchange and identify an investigation path without needing to write an integration.

Teach authentication and authorization separately. Verify endpoint versioning and maturity at authoring time. [Authorization](https://developer.sailpoint.com/docs/api/authorization/), [API versioning](https://developer.sailpoint.com/docs/api/api-versioning-strategy/)

### Module 21. When does a workflow help?

- 21.1 Recognizing when native configuration already meets the requirement.
- 21.2 Workflow triggers and the event data they provide.
- 21.3 Trigger filters and controlling which events matter.
- 21.4 Step inputs, outputs, variables, and basic JSONPath reading.
- 21.5 Conditions, branches, and loops.
- 21.6 Actions, additional data retrieval, and external-system dependencies.
- 21.7 Failures, repeated events, and unintended repeated changes.
- 21.8 Execution history and following the path taken by a run.
- 21.9 Reviewing a workflow design for clarity, ownership, and verification.

**Outcome:** Explain a workflow's behavior and decide whether it is an appropriate solution.

Use trigger data and step-level inputs and outputs in investigations. [Workflows](https://documentation.sailpoint.com/saas/help/workflows/index.html), [workflow execution evidence](https://documentation.sailpoint.com/saas/help/workflows/workflow-manage.html)

### Module 22. When are rules appropriate?

- 22.1 Recognizing a requirement that exceeds ordinary configuration.
- 22.2 Transforms, workflows, and rules: choosing by responsibility.
- 22.3 Cloud-executed and connector-executed rules.
- 22.4 Available context, permitted operations, and execution limitations.
- 22.5 Common rule responsibilities in identity calculations, provisioning, and connector processing.
- 22.6 Review, deployment, testing, and maintenance responsibilities.
- 22.7 Investigating rule-related symptoms without immediately changing code.

**Outcome:** Explain why a rule is needed, where it executes, and what constraints govern it.

Cloud and connector rules have different contexts and deployment requirements. [Rules](https://developer.sailpoint.com/docs/extensibility/rules/)

### Module 23. How do we investigate and operate ISC?

- 23.1 Forming a clear problem statement and identifying the affected population.
- 23.2 Choosing evidence from identity views, source views, activity records, APIs, and target systems.
- 23.3 Search, reporting, timestamps, and data freshness.
- 23.4 Investigating connection and aggregation failures.
- 23.5 Investigating identity exceptions, mappings, and correlation.
- 23.6 Distinguishing an assignment problem from a provisioning problem.
- 23.7 Investigating requests, certification remediation, and workflows.
- 23.8 Monitoring recurring failures, source health, credentials, and unexpected bulk changes.
- 23.9 Choosing safe next actions and assessing consequences of retries or reprocessing.
- 23.10 Documenting findings, communicating uncertainty, and handing off to the responsible team.

**Outcome:** Build a supported explanation of an incident and select the next useful action.

Consider indexing and freshness before treating a missing search result as proof that nothing happened. [Search behavior](https://documentation.sailpoint.com/saas/help/search/search_guide.html)

## Part VIII. Apply the understanding to projects

### Module 24. How do we approach a new application or project?

- 24.1 Turning a business request into scope, populations, and responsibilities.
- 24.2 Gathering application capabilities and connector requirements.
- 24.3 Designing account schemas, identifiers, correlation, and data ownership.
- 24.4 Designing entitlements, access profiles, roles, requests, and ownership.
- 24.5 Defining lifecycle behavior and account-data requirements.
- 24.6 Planning certification and conflicting-access requirements.
- 24.7 Identifying dependencies and choosing an implementation sequence.
- 24.8 Writing acceptance criteria for normal, missing-data, change, and failure scenarios.
- 24.9 Understanding configuration versions, environments, object references, and secrets.
- 24.10 Assessing change impact, rollout scope, and reprocessing consequences.
- 24.11 Planning recovery: configuration rollback and target-system correction.
- 24.12 Preparing monitoring, runbooks, ownership, and support handoff.

**Outcome:** Produce a coherent initial design, identify unresolved questions, and define how implementation will be validated.

### Module 25. Can you apply the understanding to an unfamiliar situation?

These substantial theory case studies include evidence packs and explained solutions when authored.

#### 25.1 Design an unfamiliar application integration

The learner receives business requirements, sample accounts, an entitlement catalog, and a capability description. They propose the data flow, matching approach, access model, provisioning behavior, governance responsibilities, and acceptance criteria.

#### 25.2 Investigate a joiner who did not receive expected access

The learner receives source records, identity information, configuration excerpts, and activity results. They identify the last confirmed successful stage, explain plausible causes, and request the next useful evidence.

#### 25.3 Explain why a mover retained previous access

The learner examines identity changes and multiple access-assignment paths. They explain the observed result and propose an appropriate correction with verification.

#### 25.4 Assess a leaver across mixed applications

The environment includes automated provisioning, manual fulfillment, and an application with limited supported operations. The learner establishes what has completed, what remains unresolved, and which teams must act.

#### 25.5 Investigate a completed review with unresolved remediation

The learner receives certification decisions, fulfillment records, and updated source observations. They explain the gap between the review outcome and target state, then produce a remediation and evidence plan.

**Completion outcome:** Apply the course's reasoning method without depending on a familiar company, application, or example.

# Assessment and learner support

## How understanding is assessed

Each module contains checkpoints appropriate to its subject. They can ask learners to predict an outcome, trace a flow, diagnose a symptom, or defend a design choice.

Assessment feedback evaluates:

- Whether the learner distinguishes the participating objects.
- Whether the explanation follows the data and documented logic.
- Whether dependencies and timing are considered.
- Whether conclusions are supported by the available evidence.
- Whether the next check can distinguish plausible explanations.
- Whether the proposed action accounts for downstream effects.

A learner should recognize when available evidence is insufficient. Recall questions can support learning, but successful recall alone does not complete a module.

## What each lesson provides

- A clear learning question and independently understandable supporting context.
- An explanation at the depth needed for that question.
- A concrete example or relevant evidence.
- A diagram, comparison, or record walkthrough when it improves understanding.
- A misconception, meaningful variation, or failure case where appropriate.
- Reasoning questions with explained answers.
- Official references supporting the technical behavior, maintained in the author-only reference records outside learner lessons.

Long subjects can span connected lessons. There is no fixed word count or identical section template.

## Reference aids included with the course

These references are developed alongside the lessons:

1. ISC object and relationship map.
2. Incoming-data and outgoing-change flow maps.
3. Attribute-origin tracing guide.
4. Aggregation, processing, provisioning, and synchronization comparison.
5. Lifecycle state, identity state, and target-account status comparison.
6. Access-assignment and removal comparison.
7. Troubleshooting evidence guide.
8. Application-discovery questionnaire.
9. Acceptance-criteria and verification-plan template.
10. Glossary linked to the lessons where concepts are explained.

The teaching specification defines introduction points and formats. Simulated records, screenshots, and activity histories are identified as training examples.

# Scope boundaries

## Included deeply in the core

Identity data, sources, aggregation, correlation, identity profiles, transforms, processing, entitlements, access profiles, roles, provisioning, account values, lifecycle behavior, requests, certifications, operational evidence, and project reasoning.

APIs, workflows, rules, and separation of duties receive enough depth to understand their behavior, select an approach, and investigate their involvement in a process.

## Reserved for the practical course

Tenant setup, connector installation and configuration, VA and IQService deployment, credential creation, substantial transform authoring, API exercises, workflow construction, rule development, real troubleshooting execution, and controlled deployment exercises.

The theory course prepares learners to explain what these activities accomplish and how to judge their results.

## Specialist extensions

| Extension | When it becomes useful |
|---|---|
| Advanced rule and custom connector development | A project requires behavior beyond supported configuration. |
| Large API integrations and automation tooling | The learner owns bulk operations or integration development. |
| Advanced workflow integrations | Business processes require substantial external orchestration. |
| Deep connector-specific implementation | A learner is assigned a particular enterprise application or directory environment. |
| Advanced password management | The organization uses ISC for substantial password-management responsibilities. |
| Advanced role discovery and access analytics | The learner works on access-model optimization at scale. |
| Machine identities, specialized external-identity programs, and adjacent SailPoint products | Those populations or capabilities are explicitly in project scope. |

These extensions are valuable for relevant projects. They do not become prerequisites for understanding the core.

# Standards for writing and maintaining the course

Use the teaching specification's [lesson review and publication checks](TEACHING_SPECIFICATION.md#lesson-review-and-publication-checks). It contains the authoritative requirements for author review, learner validation, and publication review.

This document owns the course scope, sequence, topic coverage, and learning outcomes. The [course register](COURSE_REGISTER.md) records progress and review results. Technical references in this outline are authoring leads; each lesson's claims must be checked as it is written.
