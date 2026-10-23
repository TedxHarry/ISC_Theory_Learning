# ISC Theory

This folder is the working home for **SailPoint ISC: Understand the System, Think Like an Engineer**.

The course is for beginners and freshers with some IAM knowledge. Its purpose is to develop understanding of ISC concepts, relationships, logic, processing, evidence, and engineering decisions.

## GitHub and reading site

- [Repository: ISC_Theory_Learning](https://github.com/TedxHarry/ISC_Theory_Learning)
- [Read the available lessons](https://tedxharry.github.io/ISC_Theory_Learning/)
- [Publishing and update instructions](author/PUBLISHING.md)

The repository contains the complete working files. GitHub Pages presents the seventy-one available lessons; planning documents and author references remain outside the reading site. Deployment does not change learner-validation or publication-review status.

Use **Hide lessons** / **Show lessons** to collapse or expand the navigation panel. Each module heading independently opens or closes its lesson list. The current lesson's module starts open; on the home page, the first module starts open.

Navigation regression checks use Node.js: run `npm ci`, then `npm test`. These development-only dependencies and tests are excluded from the reading site.

## Start here

- [Course design and full table of contents](COURSE_DESIGN_AND_CONTENTS.md)
- [Teaching specification](TEACHING_SPECIFICATION.md)
- [Course register and next step](COURSE_REGISTER.md)
- [Author-only source references](author/REFERENCE_RECORDS.md)
- [Author example register](author/EXAMPLE_REGISTER.md)
- [Author terminology register](author/TERMINOLOGY_REGISTER.md)
- [Attribute tracing guide, revision 1.0](assets/ATTRIBUTE_TRACING_GUIDE.txt)
- [SYS-001: Why does an organization need ISC?](lessons/SYS-001_Why_an_Organization_Needs_ISC.md)
- [SYS-002: Signing in, using a permission, and where ISC fits](lessons/SYS-002_Authentication_Authorization_and_ISC.md)
- [SYS-003: Who owns what when access needs to change?](lessons/SYS-003_Who_Owns_What_in_Identity_and_Access.md)
- [SYS-004: What should be allowed, what ISC records, and what actually works](lessons/SYS-004_Intended_Known_and_Effective_Access.md)
- [SYS-005: Building access management is only the beginning](lessons/SYS-005_Implementation_Administration_Support_and_Governance.md)
- [SYS-006: Follow the access problem across the systems](lessons/SYS-006_Following_an_Access_Problem_Across_the_Enterprise.md)
- [FND-001: Identity and account](lessons/FND-001_Identity_and_Account.md)
- [FND-002: Sources, connectors, and the systems they connect to](lessons/FND-002_Sources_Connectors_and_Connected_Systems.md)
- [FND-003: Account, identity, and entitlement attributes](lessons/FND-003_Account_Identity_and_Entitlement_Attributes.md)
- [FND-004: Entitlements, access profiles, and roles](lessons/FND-004_Entitlements_Access_Profiles_and_Roles.md)
- [FND-005: Sources, access applications, catalogs, and sign-in](lessons/FND-005_Sources_Access_Applications_Catalogs_and_Sign_In.md)
- [FND-006: Object IDs, account identifiers, and names](lessons/FND-006_Object_IDs_Account_Identifiers_and_References.md)
- [FND-007: One identity with multiple accounts](lessons/FND-007_One_Identity_with_Multiple_Accounts.md)
- [ARC-001: The ISC tenant and customer responsibilities](lessons/ARC-001_ISC_Tenant_and_Customer_Responsibilities.md)
- [ARC-002: Virtual Appliances and clusters](lessons/ARC-002_Virtual_Appliances_and_Clusters.md)

- [ARC-003: SaaS connectors and their connection path](lessons/ARC-003_SaaS_Connectors_and_Their_Connection_Path.md)

- [ARC-004: Where IQService fits](lessons/ARC-004_Where_IQService_Fits.md)

- [ARC-005: Connection dependencies and operation support](lessons/ARC-005_Connection_Dependencies_and_Operation_Support.md)

- [ARC-006: UI, APIs, automation, and platform capabilities](lessons/ARC-006_UI_APIs_Automation_and_Platform_Capabilities.md)

- [ARC-007: ISC sign-in, identity providers, and source passwords](lessons/ARC-007_Signing_Into_ISC_Identity_Providers_and_Source_Passwords.md)

- [ARC-008: Requesting, executing, and observing work](lessons/ARC-008_Requesting_Executing_and_Observing_Work.md)

- [SRC-001: Source purpose and represented population](lessons/SRC-001_The_Purpose_of_a_Source_and_Its_Population.md)
- [SRC-002: Authoritative and non-authoritative source responsibilities](lessons/SRC-002_Authoritative_and_Non_Authoritative_Sources.md)
- [SRC-003: Reading a connector capability matrix](lessons/SRC-003_Reading_a_Connector_Capability_Matrix.md)
- [SRC-004: Account schemas, identifiers and display attributes](lessons/SRC-004_Account_Schemas_Identifiers_and_Display_Attributes.md)
- [SRC-005: Attribute types, multiple values and data formats](lessons/SRC-005_Attribute_Types_Multiple_Values_and_Data_Formats.md)
- [SRC-006: Entitlement membership attributes and schemas](lessons/SRC-006_Entitlement_Membership_Attributes_and_Entitlement_Schemas.md)
- [SRC-007: Filters and collection scope](lessons/SRC-007_Filters_and_Collection_Scope.md)
- [SRC-008: Data ownership agreements](lessons/SRC-008_Data_Ownership_Agreements.md)
- [AGG-001: Following an account record into ISC](lessons/AGG-001_Following_an_Account_Record_into_ISC.md)
- [AGG-002: Account and entitlement aggregation](lessons/AGG-002_Account_and_Entitlement_Aggregation.md)
- [AGG-003: Full aggregation, optimization and reprocessing](lessons/AGG-003_Full_Aggregation_Optimization_and_Reprocessing.md)
- [AGG-004: Delta aggregation and connector limitations](lessons/AGG-004_Delta_Aggregation_and_Connector_Limitations.md)
- [AGG-005: Single-account aggregation and its boundaries](lessons/AGG-005_Single_Account_Aggregation.md)
- [AGG-006: Schedules, scope, dependencies and data freshness](lessons/AGG-006_Schedules_Scope_Dependencies_and_Data_Freshness.md)
- [AGG-007: Missing records, account deletion and safeguards](lessons/AGG-007_Missing_Records_Account_Deletion_and_Safeguards.md)
- [AGG-008: Reading aggregation outcomes](lessons/AGG-008_Reading_Aggregation_Outcomes.md)
- [AGG-009: Investigating a missing or stale account](lessons/AGG-009_Investigating_a_Missing_or_Stale_Account.md)
- [IDN-001: Where does an ISC identity come from?](lessons/IDN-001_Authoritative_Sources_Identity_Profiles_and_Identity_Creation.md)
- [IDN-002: What does an identity profile actually control?](lessons/IDN-002_What_an_Identity_Profile_Controls.md)
- [IDN-003: How does an account value become an identity value?](lessons/IDN-003_Mapping_Account_Information_into_Identity_Attributes.md)
- [IDN-004: Which source should supply this identity attribute?](lessons/IDN-004_Choosing_the_Source_of_Each_Attribute.md)
- [IDN-005: Two worker records. Which identity profile governs the person?](lessons/IDN-005_Multiple_Identity_Profiles_Populations_and_Priority.md)
- [IDN-006: The account arrived. Why is the identity incomplete?](lessons/IDN-006_Required_Attributes_Identity_Exceptions_and_Incomplete_Information.md)
- [IDN-007: The mapping is correct. What else will change?](lessons/IDN-007_Changing_Mappings_and_Understanding_Downstream_Effects.md)
- [IDN-008: Where did this identity value come from?](lessons/IDN-008_Tracing_an_Incorrect_Identity_Value_to_Its_Origin.md)
- [COR-001: The account was imported. Why isn't it on the person's identity?](lessons/COR-001_Why_Importing_an_Account_Leaves_a_Relationship_to_Establish.md)
- [COR-002: Which account field is ISC comparing with which identity field?](lessons/COR-002_Account_and_Identity_Attributes_Used_in_Correlation.md)
- [COR-003: Which identifier will still point to the right person tomorrow?](lessons/COR-003_Choosing_Identifiers_for_Reliable_Account_Correlation.md)
- [COR-004: The first comparison found no match. What happens next?](lessons/COR-004_Following_Configured_Correlation_Conditions_Through_Records.md)
- [COR-005: The account has no clear owner in ISC. What is actually missing?](lessons/COR-005_Missing_Values_Unmatched_Accounts_and_Ambiguous_Data.md)
- [COR-006: The matching rule changed. What happens to accounts that are already linked?](lessons/COR-006_Existing_Associations_and_Changes_to_Correlation_Data_or_Configuration.md)
- [COR-007: The account is on the right identity now. What did the manual correction actually fix?](lessons/COR-007_Manual_Correction_and_What_the_Relationship_Change_Does_Not_Resolve.md)
- [COR-008: HR names a manager. How does ISC know which identity that means?](lessons/COR-008_Manager_Correlation_and_Dependencies_of_Manager_Based_Processes.md)
- [COR-009: The account or manager looks wrong. Where would you start the investigation?](lessons/COR-009_Investigating_Incorrect_Account_Links_Unmatched_Accounts_and_Missing_Managers.md)

- [TRN-001: The source already has a value. Do we need a transform?](lessons/TRN-001_Choosing_Between_Direct_Mapping_and_Calculated_Values.md)
- [TRN-002: What is this transform actually going to return?](lessons/TRN-002_Reading_a_Transforms_Inputs_Operation_Configuration_and_Output.md)
- [TRN-003: Which characters should this calculation keep?](lessons/TRN-003_Normalizing_and_Combining_Strings.md)
- [TRN-004: A fallback returned a value. Is it the right value?](lessons/TRN-004_Handling_Missing_Values_with_Fallbacks.md)
- [TRN-005: Are we translating a code or choosing an outcome?](lessons/TRN-005_Lookups_and_Conditional_Decisions.md)
- [TRN-006: Which moment does this date actually mean?](lessons/TRN-006_Formatting_and_Comparing_Dates_and_Time_Zones.md)
- [TRN-007: What does each operation pass to the next one?](lessons/TRN-007_Composing_Operations_and_Following_Intermediate_Values.md)
- [TRN-008: What has to change before this value is calculated again?](lessons/TRN-008_Calculation_Context_Dependencies_and_Reevaluation.md)

- [TRN-009: The calculation returned a value. What actually went wrong?](lessons/TRN-009_Investigating_Failed_Calculations_and_Misleading_Fallback_Values.md)

- [PRC-001: The data changed. Which process needs to act?](lessons/PRC-001_Aggregation_Identity_Processing_Provisioning_and_Attribute_Synchronization.md)
- [Processing comparison guide](assets/PROCESSING_COMPARISON_GUIDE.txt), revision 1.0; also available beside the lesson's inline comparison.

- [PRC-002: What change actually starts identity processing?](lessons/PRC-002_Event_Based_Identity_Processing_and_Its_Triggers.md)

- [PRC-003: The date arrived. When will ISC process the identity?](lessons/PRC-003_Scheduled_and_Time_Based_Identity_Processing.md)

- [PRC-004: The mapping is saved. What still needs to happen?](lessons/PRC-004_Manual_Identity_Processing_and_Applying_Configuration_Changes.md)

- [PRC-005: The identity changed. Which results should change with it?](lessons/PRC-005_Reevaluating_Identity_Values_Manager_Relationships_Lifecycle_Access_and_Role_Assignments.md)

- [PRC-006: Inactive in ISC. Inactive for which process?](lessons/PRC-006_Identity_States_and_Participation_in_Processing.md)

- [PRC-007: The job started. Why do the screens still disagree?](lessons/PRC-007_Ordering_Dependencies_Queued_Work_and_Visibility_Delays.md)

## One lesson file at a time

1. Read the teaching specification and course register before starting work.
2. Work on the single lesson identified as current in the register. Develop its complete explanation, examples, flows, reasoning exercises, and worked answers. Save supporting sources separately in the author reference records.
3. Perform the [author review](TEACHING_SPECIFICATION.md#author-review) in the teaching specification.
4. Record its result and unresolved issues in the register. Track learner validation and publication review separately using the same specification.
5. Save the complete lesson and update the register. Apply feedback to that lesson before opening another lesson-writing task.
6. Proceed to the next lesson when the current file's known content issues are resolved. Keep learner-validation status separate from author review.

There is no fixed word count or maximum lesson count. Split a lesson when its subject requires another independently understandable learning unit, not to satisfy an arbitrary length limit. Never replace required reasoning with a summary, outline, or placeholder.

Examples can use Devi, but every lesson supplies its own context. A learner must not need to remember her from another lesson. Supporting ISC concepts are explained within the lesson that uses them.

## File conventions

- Keep one complete learner lesson per Markdown file in `lessons/`.
- Store a lesson's diagram images and editable sources in `assets/`, named with the lesson's permanent ID. These support the lesson; they are not additional lesson drafts.
- Give each authored lesson a permanent ID. Displayed module numbers may change; the ID stays the same.
- Revise the existing lesson file rather than creating competing copies named final, final2, or latest.
- Track lesson revision, verification date, review status, and next action in the course register.
- Keep authoring instructions, course planning, and source citations outside learner lesson files. Store source references in `author/REFERENCE_RECORDS.md`; do not include them in learner-facing exports.
- Markdown is the editable source format. Publication formats can be generated later without shortening the source material.

## Current saved material

The course design, teaching specification, Module 1 lessons SYS-001, SYS-002, SYS-003, SYS-004, SYS-005, and SYS-006, Module 2 lessons FND-001 through FND-007, and Module 3 lessons ARC-001, ARC-002, ARC-003, ARC-004, ARC-005, ARC-006, ARC-007, and ARC-008, plus Module 4 lessons SRC-001, SRC-002, SRC-003, SRC-004, SRC-005, SRC-006, SRC-007 and SRC-008, plus Module 5 lessons AGG-001, AGG-002, AGG-003, AGG-004, AGG-005, AGG-006, AGG-007, AGG-008 and AGG-009, are saved here. Current revisions and review results are recorded in the course register and the documents themselves. The specification requires a personal, patient mentor voice without unnecessary commentary about the teaching method.

FND-001 belongs in Module 2 and was authored first to establish the teaching approach. It has now been reviewed in course order, followed by FND-002 through FND-007. All six Module 1 lessons and all seven Module 2 lessons are authored; learner validation and formal publication review remain pending. ARC-001 opens Module 3 with the ISC tenant and customer responsibilities. ARC-002 covers Virtual Appliances and clusters in Module 3.2. ARC-003 covers SaaS connectors and their connection path in Module 3.3. ARC-004 covers where IQService fits when a connector requires it in Module 3.4. ARC-005 covers network reachability, authentication, permissions, and operation support in Module 3.5. ARC-006 covers how UI actions, APIs, and automation interact with platform capabilities in Module 3.6. ARC-007 covers signing into ISC, external identity providers, and source password operations in Module 3.7. ARC-008 covers requesting work, executing work, and observing completion in Module 3.8. All eight Module 3 lessons are authored, with learner validation and formal approval still pending. SRC-001 opens Module 4 with the purpose of a source and its population in Module 4.1. SRC-002 covers authoritative and non-authoritative source responsibilities, overlapping profiles, attribute mappings, authentication and provisioning boundaries in Module 4.2. SRC-003 covers reading connector capability matrices, operation/object distinctions and project-readiness evidence in Module 4.3. SRC-004 covers account schemas, selected Account ID/Name attributes, field-value tracing, ownership matching and safe schema-change reasoning in Module 4.4. SRC-005 covers types, cardinality, JSON/CSV representations, missing/null/empty values, dates, conversion defects and downstream evidence in Module 4.5. SRC-006 covers membership-to-entitlement linking, source/type/identifier agreement, entitlement schema designations, multiple types and collection/metadata/change boundaries in Module 4.6. SRC-007 covers intended/read/view scope, filter direction and location, actor permissions, account/object/membership coverage, pagination, aggregation-mode and safe exclusion boundaries in Module 4.7. SRC-008 covers field-level authority, producer/integration/consumer responsibility, field/temporal contracts, correction handoffs, synchronization and acceptance/change evidence in Module 4.8. All eight Module 4 lessons are authored, with learner validation and formal approval still pending. AGG-001 opens Module 5 with account-read/response/extraction/representation tracing, ownership and identity-value distinctions, processing/provisioning boundaries and evidence in Module 5.1. AGG-002 covers account/membership versus access-object collection, linking, unused groups, count reconciliation, read scope/authority, observation times, file-import boundaries and evidence in Module 5.2. AGG-003 covers full configured-population reads versus optimized/unoptimized processing, unchanged-input correlation correction, per-run request semantics, manual-association and related-operation boundaries, evidence and safe reruns in Module 5.3. AGG-004 covers changes-only collection, baselines and tracking, JDBC/Active Directory/Okta-specific boundaries, omission versus deletion, retention/recovery, membership capture and evidence in Module 5.4. AGG-005 covers selected-account/source/native-key tracing, UI account-data versus identity/provisioning limits, read/unlock/not-found distinctions, lookup support and API completion evidence in Module 5.5. AGG-006 covers scheduled submission versus execution, publication and observation freshness, daily windows and connector-specific time zones, scope/modes, independent account/object clocks and conditional end-to-end dependencies in Module 5.6. AGG-007 covers missing/disabled/deleted distinctions, account-deletion controls and rounding, operation scope, authoritative account/identity outcomes, blockers/hidden identities and safe offboarding/recovery in Module 5.7. AGG-008 covers execution/status details, scanned/unchanged/processed/inventory distinctions, partial page errors and record evidence, optimization, count/set completeness, entitlement totals and safe outcome-based recovery in Module 5.8. AGG-009 covers source/key/owner and view distinctions, competing hypotheses, response/root/extraction/schema/correlation tracing, safe correction and stale account/identity/Search investigation in Module 5.9. All nine Module 5 lessons are authored; learner validation and formal approval remain pending. IDN-001 opens Module 6 with authoritative worker accounts and profiles, mapped identity creation requirements, ownership and identity exceptions, application correlation, profile priority and independent target/sign-in outcomes in Module 6.1. IDN-002 covers shared profile population, mappings/global attributes, manager dependency, tenant authentication/security/invitations, lifecycle/access responsibilities, separate target outcomes and safe preview/apply/change scope in Module 6.2. IDN-003 traces account schema and identity mappings, direct values, lowercase/explicit inputs, account selection, type/cardinality/missing-value behavior, preview/applied/consumer evidence and a complete downloadable attribute tracing guide in Module 6.3. IDN-004 covers field meaning/ownership versus population authority, coverage and account selection, effective/publication/collection times, downstream-email dependency and initial values, fallback/error policy, synchronization direction and acceptance evidence in Module 6.4. IDN-005 covers account-based profile eligibility and shared priority, overlapping populations and conversion continuity, distinct field/account selection, processing and lifecycle/security/access evidence in Module 6.5. IDN-006 covers required mappings and evaluated values, incomplete identities versus other errors, missing/empty/error distinctions, global uid collisions and ownership, cause-based correction and current evidence versus downstream outcomes in Module 6.6. IDN-007 covers shared mapping and reference dependencies, representation-sensitive role conditions, manager/lifecycle effects, preview and applied processing scope, attribute-sync multi-account/null behavior, partial target results and compensating recovery in Module 6.7. IDN-008 traces a disputed identity cost centre through exact profile/account/input, an explicit nested transform, text/type and observation evidence, competing causes, preview versus processing and separate consumers in Module 6.8. All eight Module 6 lessons are authored; learner validation and formal approval remain pending. COR-001 opens Module 7 by distinguishing collected account existence, configured/default correlation, verified person ownership, uncorrelated versus wrong links and separate external access state in Module 7.1. COR-002 traces the selected account/identity fields, independently mapped inputs, schema designations, correlation eligibility, representation and circular dependencies in Module 7.2. COR-003 compares identifier uniqueness, independent availability and coverage, consistent meaning/representation and stability/non-reuse, including namespace collisions and ownership versus matching percentages in Module 7.3. COR-004 traces a first-criterion miss, later configured match and separate default path, ordered alternatives versus AND/voting, case settings, conflicting candidates, actual reevaluation and persistent manual relationships in Module 7.4. COR-005 distinguishes missing or unusable input, no intended candidate, ambiguous or contradictory data and wrong existing links, then verifies cause-based correction and independent downstream outcomes in Module 7.5. COR-006 traces saved criteria versus data and relationships, optimized/unoptimized evaluation, automatic/manual/ISC-created links, account/identity input changes, current versus historical evidence and dependent writes/reversal in Module 7.6. COR-007 traces approved manual relationship correction, duplicate-name/exact-record selection, supported account-update/file paths, persistent treatment and wrong links, unfixed data/design defects, conditional writes, result evidence and Remove/Delete/reset boundaries in Module 7.7. COR-008 traces manager-reference lookup and dual configuration, profile-priority/first-non-null selection, evaluation and candidate preparation, null clearing versus unmatched non-null retention and separate request/campaign/sync outcomes in Module 7.8. COR-009 integrates collection/intake, selected matching data, persistent wrong links, manager dual setup/source selection and actual evaluation through a three-fault investigation with distinct correction and acceptance evidence in Module 7.9. All nine Module 7 lessons are authored; learner validation and formal approval remain pending. TRN-001 opens Module 8 with direct mapping versus justified calculated values, input selection, meaning/type preservation and separate Preview, applied identity and consumer evidence in Module 8.1. TRN-002 traces JSON properties, nested input retrieval/trim/lower values, actual context and implicit/explicit inputs, then separates valid syntax, correct configuration and observed results in Module 8.2. TRN-003 traces component trimming and exact separators, concat/join and case boundaries, meaningful name/code characters, missing policy, collisions and applied/consumer evidence in Module 8.3. TRN-004 distinguishes absence, null, empty/whitespace text, placeholders and errors, traces firstValid priority with explicit error policy, and separates suitability, defect visibility and applied/consumer evidence in Module 8.4. TRN-005 distinguishes approved code translation from equality decisions, traces lookup/default/error and conditional true/false/null paths, and separates business meaning from applied/consumer evidence in Module 8.5. TRN-006 distinguishes date-only values and exact instants, traces date formats, offsets, comparison direction/equality and arithmetic contracts, then separates cutoff passage from reevaluation and application in Module 8.6. TRN-007 traces exact returned values through composed operations, input/output contracts, source-bound reference reuse and shared-change boundaries, then distinguishes Preview from applied and consumer outcomes in Module 8.7. TRN-008 distinguishes per-identity/account and identity-mapping/account-create contexts, traces data/configuration/time dependencies and collection/Preview/application evidence, and rejects assumed mapping order or automatic existing-account updates in Module 8.8. TRN-009 investigates failed calculations and misleading fallback values through exact inputs, saved definitions, error/default paths, cause-based correction and separate Preview/current/consumer evidence in Module 8.9. All nine Module 8 lessons are authored; learner validation and formal approval remain pending. PRC-001 opens Module 9 with collection, identity reevaluation, delivery and configured field-sync responsibilities, conditional triggers, partial target outcomes and exact evidence in Module 9.1. It includes the complete processing comparison reference aid. PRC-002 explains event-based initiation from aggregation/provisioning identity modifications, producer/collected/current evidence, unchanged/skipped results, narrower action scope and separate workflow/configuration/clock paths in Module 9.2. PRC-003 explains time-dependent values, scheduled selection/time zones, periodic refresh, nextProcessing requirements and distinct applied/delivery evidence in Module 9.3. PRC-004 explains Save/Preview/application, manual selected/profile/list-page scope, population predictions and unchanged results, independent delivery evidence and compensating correction in Module 9.4. PRC-005 connects mapped values, resolved manager relationships, lifecycle requirements and role assignments, with retained shared access and separate target evidence in Module 9.5. PRC-006 explains identity-state participation by operation, including long-term profile/selected processing and final/manual sync exceptions, in Module 9.6. PRC-007 connects dependency, execution, delivery and view-update evidence, including scoped status meanings and historical account reports, in Module 9.7. Module 9.8, PRC-008, on investigating changed data without the expected result, is the next planned lesson. The register distinguishes saved work, review work, and planned work.
