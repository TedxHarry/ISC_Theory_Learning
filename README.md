# ISC Theory

This folder is the working home for **SailPoint ISC: Understand the System, Think Like an Engineer**.

The course is for beginners and freshers with some IAM knowledge. Its purpose is to develop understanding of ISC concepts, relationships, logic, processing, evidence, and engineering decisions.

## GitHub and reading site

- [Repository: ISC_Theory_Learning](https://github.com/TedxHarry/ISC_Theory_Learning)
- [Read the available lessons](https://tedxharry.github.io/ISC_Theory_Learning/)
- [Publishing and update instructions](author/PUBLISHING.md)

The repository contains the complete working files. GitHub Pages presents the thirty-two available lessons; planning documents and author references remain outside the reading site. Deployment does not change learner-validation or publication-review status.

Use **Hide lessons** / **Show lessons** to collapse or expand the navigation panel. Each module heading independently opens or closes its lesson list. The current lesson's module starts open; on the home page, the first module starts open.

Navigation regression checks use Node.js: run `npm ci`, then `npm test`. These development-only dependencies and tests are excluded from the reading site.

## Start here

- [Course design and full table of contents](COURSE_DESIGN_AND_CONTENTS.md)
- [Teaching specification](TEACHING_SPECIFICATION.md)
- [Course register and next step](COURSE_REGISTER.md)
- [Author-only source references](author/REFERENCE_RECORDS.md)
- [Author example register](author/EXAMPLE_REGISTER.md)
- [Author terminology register](author/TERMINOLOGY_REGISTER.md)
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

The course design, teaching specification, Module 1 lessons SYS-001, SYS-002, SYS-003, SYS-004, SYS-005, and SYS-006, Module 2 lessons FND-001 through FND-007, and Module 3 lessons ARC-001, ARC-002, ARC-003, ARC-004, ARC-005, ARC-006, ARC-007, and ARC-008, plus Module 4 lessons SRC-001, SRC-002, SRC-003, SRC-004, SRC-005, SRC-006, SRC-007 and SRC-008, plus Module 5 lessons AGG-001, AGG-002 and AGG-003, are saved here. Current revisions and review results are recorded in the course register and the documents themselves. The specification requires a personal, patient mentor voice without unnecessary commentary about the teaching method.

FND-001 belongs in Module 2 and was authored first to establish the teaching approach. It has now been reviewed in course order, followed by FND-002 through FND-007. All six Module 1 lessons and all seven Module 2 lessons are authored; learner validation and formal publication review remain pending. ARC-001 opens Module 3 with the ISC tenant and customer responsibilities. ARC-002 covers Virtual Appliances and clusters in Module 3.2. ARC-003 covers SaaS connectors and their connection path in Module 3.3. ARC-004 covers where IQService fits when a connector requires it in Module 3.4. ARC-005 covers network reachability, authentication, permissions, and operation support in Module 3.5. ARC-006 covers how UI actions, APIs, and automation interact with platform capabilities in Module 3.6. ARC-007 covers signing into ISC, external identity providers, and source password operations in Module 3.7. ARC-008 covers requesting work, executing work, and observing completion in Module 3.8. All eight Module 3 lessons are authored, with learner validation and formal approval still pending. SRC-001 opens Module 4 with the purpose of a source and its population in Module 4.1. SRC-002 covers authoritative and non-authoritative source responsibilities, overlapping profiles, attribute mappings, authentication and provisioning boundaries in Module 4.2. SRC-003 covers reading connector capability matrices, operation/object distinctions and project-readiness evidence in Module 4.3. SRC-004 covers account schemas, selected Account ID/Name attributes, field-value tracing, ownership matching and safe schema-change reasoning in Module 4.4. SRC-005 covers types, cardinality, JSON/CSV representations, missing/null/empty values, dates, conversion defects and downstream evidence in Module 4.5. SRC-006 covers membership-to-entitlement linking, source/type/identifier agreement, entitlement schema designations, multiple types and collection/metadata/change boundaries in Module 4.6. SRC-007 covers intended/read/view scope, filter direction and location, actor permissions, account/object/membership coverage, pagination, aggregation-mode and safe exclusion boundaries in Module 4.7. SRC-008 covers field-level authority, producer/integration/consumer responsibility, field/temporal contracts, correction handoffs, synchronization and acceptance/change evidence in Module 4.8. All eight Module 4 lessons are authored, with learner validation and formal approval still pending. AGG-001 opens Module 5 with account-read/response/extraction/representation tracing, ownership and identity-value distinctions, processing/provisioning boundaries and evidence in Module 5.1. AGG-002 covers account/membership versus access-object collection, linking, unused groups, count reconciliation, read scope/authority, observation times, file-import boundaries and evidence in Module 5.2. AGG-003 covers full configured-population reads versus optimized/unoptimized processing, unchanged-input correlation correction, per-run request semantics, manual-association and related-operation boundaries, evidence and safe reruns in Module 5.3. AGG-004, on delta aggregation and connector-specific limitations in Module 5.4, is the next planned lesson. The register distinguishes saved work, review work, and planned work.
