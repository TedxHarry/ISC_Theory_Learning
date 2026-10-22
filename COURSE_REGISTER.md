# ISC Theory: course register

Last updated: October 22, 2026.

This is the working record of what exists, what has been reviewed, and what comes next. A planned topic is not a completed lesson. Author review and real learner validation are recorded separately.

## Current position

The course design and teaching specification are saved. Fifty-eight complete learner lessons have been authored: **SYS-001, Why does an organization need ISC?**, revision 1.3; **SYS-002, Signing in, using a permission, and where ISC fits**, revision 1.1; **SYS-003, Who owns what when access needs to change?**, revision 1.1; **SYS-004, What should be allowed, what ISC records, and what actually works**, revision 1.1; **SYS-005, Building access management is only the beginning**, revision 1.1; **SYS-006, Follow the access problem across the systems**, revision 1.1; **FND-001, Identity and account**, revision 1.3; **FND-002, Sources, connectors, and the systems they connect to**, revision 1.0; **FND-003, Account, identity, and entitlement attributes**, revision 1.0; **FND-004, Entitlements, access profiles, and roles**, revision 1.0; **FND-005, Sources, access applications, catalogs, and sign-in**, revision 1.0; **FND-006, Object IDs, account identifiers, and names: which record are we talking about?**, revision 1.0; **FND-007, One identity, multiple accounts: which account are we talking about?**, revision 1.0; **ARC-001, The ISC tenant: what SailPoint runs, and what your organization still owns**, revision 1.0; **ARC-002, Virtual Appliances and clusters: where does the connection work happen?**, revision 1.0; **ARC-003, SaaS connectors: where does the connection work happen?**, revision 1.0; **ARC-004, Where does IQService fit?**, revision 1.0; **ARC-005, The connection works. Why does the change still fail?**, revision 1.0; **ARC-006, A button, an API call, or automation: what is ISC actually doing?**, revision 1.0; **ARC-007, Signing into ISC and changing a password: which system is doing the work?**, revision 1.0; **ARC-008, The request was accepted. What actually finished?**, revision 1.0; **SRC-001, What will this source actually represent?**, revision 1.0; **SRC-002, Authoritative for what: the person, a value, a login, or a change?**, revision 1.0; **SRC-003, The connector supports it. What can this source actually do?**, revision 1.0; **SRC-004, An account schema: which fields describe the account, and which ones identify it?**, revision 1.0; **SRC-005, The value looks right. Is it the right kind of value?**, revision 1.0; **SRC-006, The group exists. Why doesn't the account's access connect to it?**, revision 1.0; **SRC-007, The read finished. Did it include the right accounts?**, revision 1.0; **SRC-008, HR approved the extension. Who makes sure the new date reaches the right place?**, revision 1.0; **AGG-001, The account changed. What should change in ISC?**, revision 1.0; **AGG-002, The group is in ISC. Does Devi have it?**, revision 1.0; **AGG-003, Every account was read. Why wasn't this one re-evaluated?**, revision 1.0; **AGG-004, Only the changed accounts arrived. What does that tell us?**, revision 1.0; **AGG-005, The account refreshed. What actually changed?**, revision 1.0; **AGG-006, The run finished. How current is the data?**, revision 1.0; **AGG-007, The account is missing. Should ISC remove it?**, revision 1.0; **AGG-008, The aggregation ended. What did it actually establish?**, revision 1.0; **AGG-009, Where did the account stop matching what we expected?**, revision 1.0; **IDN-001, Where does an ISC identity come from?**, revision 1.0; **IDN-002, What does an identity profile actually control?**, revision 1.0; **IDN-003, How does an account value become an identity value?**, revision 1.0; **IDN-004, Which source should supply this identity attribute?**, revision 1.0; **IDN-005, Two worker records. Which identity profile governs the person?**, revision 1.0; **IDN-006, The account arrived. Why is the identity incomplete?**, revision 1.0; **IDN-007, The mapping is correct. What else will change?**, revision 1.0; **IDN-008, Where did this identity value come from?**, revision 1.0; **COR-001, The account was imported. Why isn't it on the person's identity?**, revision 1.0; **COR-002, Which account field is ISC comparing with which identity field?**, revision 1.0; **COR-003, Which identifier will still point to the right person tomorrow?**, revision 1.0; **COR-004, The first comparison found no match. What happens next?**, revision 1.0; **COR-005, The account has no clear owner in ISC. What is actually missing?**, revision 1.0; **COR-006, The matching rule changed. What happens to accounts that are already linked?**, revision 1.0; **COR-007, The account is on the right identity now. What did the manual correction actually fix?**, revision 1.0; **COR-008, HR names a manager. How does ISC know which identity that means?**, revision 1.0; **COR-009, The account or manager looks wrong. Where would you start the investigation?**, revision 1.0; **TRN-001, The source already has a value. Do we need a transform?**, revision 1.0; **TRN-002, What is this transform actually going to return?**, revision 1.0; and **TRN-003, Which characters should this calculation keep?**, revision 1.0.

FND-001 was written as a foundation pilot before the course was developed in sequence. It belongs with Module 2's object relationships. That pilot did not itself complete Module 1, Module 2, or the whole course.

The current lesson is TRN-003. It has received documentation-based author review and is ready for the user's read-through and further feedback, not marked learner-validated or publication-ready. Keep revisions in the same lesson file. Do not open several lesson drafts in parallel.

FND-001 established the teaching approach as a pilot and has now been reviewed in its Module 2.1 position. Authoring has continued through Module 8.3, TRN-003. All nine Module 7 lessons are authored. Modules 8.1-8.3 are authored; Modules 8.4-8.9 remain planned. All eight Module 3 lessons, all eight Module 4 lessons, all nine Module 5 lessons and all eight Module 6 lessons are authored; learner validation and formal publication approval remain pending. Resolve known content issues before opening the next writing task and track learner validation separately.

## Saved documents

| Document | Purpose | Status |
|---|---|---|
| [README](README.md) | Entry point, file conventions, and one-lesson-at-a-time workflow | Saved |
| [Course design and contents](COURSE_DESIGN_AND_CONTENTS.md) | Full course architecture, module outcomes, detailed lesson topics, assessments, and scope | Saved working design; lesson topics are plans, not authored lessons |
| [Teaching specification](TEACHING_SPECIFICATION.md) | Authoritative explanation, independence, narration, assessment, evidence, and review standards; current version is recorded in that file | Saved authoring standard |
| [SYS-001: Why does an organization need ISC?](lessons/SYS-001_Why_an_Organization_Needs_ISC.md) | Complete learner-facing opening lesson for Module 1 | Revision 1.3 saved; feedback revisions checked, source-link cleanup checked, learner validation pending |
| [SYS-002: Signing in, using a permission, and where ISC fits](lessons/SYS-002_Authentication_Authorization_and_ISC.md) | Complete learner-facing lesson for Module 1.2 | Revision 1.1 saved; feedback revisions checked, author-reviewed, learner validation pending |
| [SYS-003: Who owns what when access needs to change?](lessons/SYS-003_Who_Owns_What_in_Identity_and_Access.md) | Complete learner-facing lesson for Module 1.3 | Revision 1.1 saved; feedback revisions checked, author-reviewed, learner validation pending |
| [SYS-004: What should be allowed, what ISC records, and what actually works](lessons/SYS-004_Intended_Known_and_Effective_Access.md) | Complete learner-facing lesson for Module 1.4 | Revision 1.1 saved; feedback revisions checked, author-reviewed, learner validation pending |
| [SYS-005: Building access management is only the beginning](lessons/SYS-005_Implementation_Administration_Support_and_Governance.md) | Complete learner-facing lesson for Module 1.5 | Revision 1.1 saved; feedback revisions checked, author-reviewed, learner validation pending |
| [SYS-006: Follow the access problem across the systems](lessons/SYS-006_Following_an_Access_Problem_Across_the_Enterprise.md) | Complete learner-facing lesson for Module 1.6 | Revision 1.1 saved; feedback revisions checked, author-reviewed, learner validation pending |
| [FND-001: Identity and account](lessons/FND-001_Identity_and_Account.md) | Complete learner-facing foundation pilot | Revision 1.3 saved; review details below |
| [FND-002: Sources, connectors, and the systems they connect to](lessons/FND-002_Sources_Connectors_and_Connected_Systems.md) | Complete learner-facing lesson for Module 2.2 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [FND-003: Account, identity, and entitlement attributes](lessons/FND-003_Account_Identity_and_Entitlement_Attributes.md) | Complete learner-facing lesson for Module 2.3 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [FND-004: Entitlements, access profiles, and roles](lessons/FND-004_Entitlements_Access_Profiles_and_Roles.md) | Complete learner-facing lesson for Module 2.4 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [FND-005: Sources, access applications, catalogs, and sign-in](lessons/FND-005_Sources_Access_Applications_Catalogs_and_Sign_In.md) | Complete learner-facing lesson for Module 2.5 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [FND-006: Object IDs, account identifiers, and names](lessons/FND-006_Object_IDs_Account_Identifiers_and_References.md) | Complete learner-facing lesson for Module 2.6 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [FND-007: One identity with multiple accounts](lessons/FND-007_One_Identity_with_Multiple_Accounts.md) | Complete learner-facing lesson for Module 2.7 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [ARC-001: The ISC tenant and customer responsibilities](lessons/ARC-001_ISC_Tenant_and_Customer_Responsibilities.md) | Complete learner-facing lesson for Module 3.1 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [ARC-002: Virtual Appliances and clusters](lessons/ARC-002_Virtual_Appliances_and_Clusters.md) | Complete learner-facing lesson for Module 3.2 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [ARC-003: SaaS connectors and their connection path](lessons/ARC-003_SaaS_Connectors_and_Their_Connection_Path.md) | Complete learner-facing lesson for Module 3.3 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [ARC-004: Where IQService fits](lessons/ARC-004_Where_IQService_Fits.md) | Complete learner-facing lesson for Module 3.4 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [ARC-005: Connection dependencies and operation support](lessons/ARC-005_Connection_Dependencies_and_Operation_Support.md) | Complete learner-facing lesson for Module 3.5 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [ARC-006: UI, APIs, automation, and platform capabilities](lessons/ARC-006_UI_APIs_Automation_and_Platform_Capabilities.md) | Complete learner-facing lesson for Module 3.6 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [ARC-007: ISC sign-in, identity providers, and source passwords](lessons/ARC-007_Signing_Into_ISC_Identity_Providers_and_Source_Passwords.md) | Complete learner-facing lesson for Module 3.7 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [ARC-008: Requesting, executing, and observing work](lessons/ARC-008_Requesting_Executing_and_Observing_Work.md) | Complete learner-facing lesson for Module 3.8 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [SRC-001: Source purpose and represented population](lessons/SRC-001_The_Purpose_of_a_Source_and_Its_Population.md) | Complete learner-facing lesson for Module 4.1 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [SRC-002: Authoritative and non-authoritative source responsibilities](lessons/SRC-002_Authoritative_and_Non_Authoritative_Sources.md) | Complete learner-facing lesson for Module 4.2 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [SRC-003: Reading a connector capability matrix](lessons/SRC-003_Reading_a_Connector_Capability_Matrix.md) | Complete learner-facing lesson for Module 4.3 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [SRC-004: Account schemas, identifiers and display attributes](lessons/SRC-004_Account_Schemas_Identifiers_and_Display_Attributes.md) | Complete learner-facing lesson for Module 4.4 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [SRC-005: Attribute types, multiple values and data formats](lessons/SRC-005_Attribute_Types_Multiple_Values_and_Data_Formats.md) | Complete learner-facing lesson for Module 4.5 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [SRC-006: Entitlement membership attributes and schemas](lessons/SRC-006_Entitlement_Membership_Attributes_and_Entitlement_Schemas.md) | Complete learner-facing lesson for Module 4.6 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [SRC-007: Filters and collection scope](lessons/SRC-007_Filters_and_Collection_Scope.md) | Complete learner-facing lesson for Module 4.7 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [SRC-008: Data ownership agreements](lessons/SRC-008_Data_Ownership_Agreements.md) | Complete learner-facing lesson for Module 4.8 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [AGG-001: Following an account record into ISC](lessons/AGG-001_Following_an_Account_Record_into_ISC.md) | Complete learner-facing lesson for Module 5.1 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [AGG-002: Account and entitlement aggregation](lessons/AGG-002_Account_and_Entitlement_Aggregation.md) | Complete learner-facing lesson for Module 5.2 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [AGG-003: Full aggregation, optimization and reprocessing](lessons/AGG-003_Full_Aggregation_Optimization_and_Reprocessing.md) | Complete learner-facing lesson for Module 5.3 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [AGG-004: Delta aggregation and connector limitations](lessons/AGG-004_Delta_Aggregation_and_Connector_Limitations.md) | Complete learner-facing lesson for Module 5.4 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [AGG-005: Single-account aggregation and its boundaries](lessons/AGG-005_Single_Account_Aggregation.md) | Complete learner-facing lesson for Module 5.5 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [AGG-006: Schedules, scope, dependencies and data freshness](lessons/AGG-006_Schedules_Scope_Dependencies_and_Data_Freshness.md) | Complete learner-facing lesson for Module 5.6 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [AGG-007: Missing records, account deletion and safeguards](lessons/AGG-007_Missing_Records_Account_Deletion_and_Safeguards.md) | Complete learner-facing lesson for Module 5.7 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [AGG-008: Reading aggregation outcomes](lessons/AGG-008_Reading_Aggregation_Outcomes.md) | Complete learner-facing lesson for Module 5.8 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [AGG-009: Investigating a missing or stale account](lessons/AGG-009_Investigating_a_Missing_or_Stale_Account.md) | Complete learner-facing lesson for Module 5.9 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [IDN-001: Where does an ISC identity come from?](lessons/IDN-001_Authoritative_Sources_Identity_Profiles_and_Identity_Creation.md) | Complete learner-facing lesson for Module 6.1 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [IDN-002: What does an identity profile actually control?](lessons/IDN-002_What_an_Identity_Profile_Controls.md) | Complete learner-facing lesson for Module 6.2 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [IDN-003: How does an account value become an identity value?](lessons/IDN-003_Mapping_Account_Information_into_Identity_Attributes.md) | Complete learner-facing lesson for Module 6.3 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [IDN-004: Which source should supply this identity attribute?](lessons/IDN-004_Choosing_the_Source_of_Each_Attribute.md) | Complete learner-facing lesson for Module 6.4 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [IDN-005: Two worker records. Which identity profile governs the person?](lessons/IDN-005_Multiple_Identity_Profiles_Populations_and_Priority.md) | Complete learner-facing lesson for Module 6.5 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [IDN-006: The account arrived. Why is the identity incomplete?](lessons/IDN-006_Required_Attributes_Identity_Exceptions_and_Incomplete_Information.md) | Complete learner-facing lesson for Module 6.6 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [IDN-007: The mapping is correct. What else will change?](lessons/IDN-007_Changing_Mappings_and_Understanding_Downstream_Effects.md) | Complete learner-facing lesson for Module 6.7 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [IDN-008: Where did this identity value come from?](lessons/IDN-008_Tracing_an_Incorrect_Identity_Value_to_Its_Origin.md) | Complete learner-facing lesson for Module 6.8 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [COR-001: The account was imported. Why isn't it on the person's identity?](lessons/COR-001_Why_Importing_an_Account_Leaves_a_Relationship_to_Establish.md) | Complete learner-facing lesson for Module 7.1 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [COR-002: Which account field is ISC comparing with which identity field?](lessons/COR-002_Account_and_Identity_Attributes_Used_in_Correlation.md) | Complete learner-facing lesson for Module 7.2 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [COR-003: Which identifier will still point to the right person tomorrow?](lessons/COR-003_Choosing_Identifiers_for_Reliable_Account_Correlation.md) | Complete learner-facing lesson for Module 7.3 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [COR-004: The first comparison found no match. What happens next?](lessons/COR-004_Following_Configured_Correlation_Conditions_Through_Records.md) | Complete learner-facing lesson for Module 7.4 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [COR-005: The account has no clear owner in ISC. What is actually missing?](lessons/COR-005_Missing_Values_Unmatched_Accounts_and_Ambiguous_Data.md) | Complete learner-facing lesson for Module 7.5 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [COR-006: The matching rule changed. What happens to accounts that are already linked?](lessons/COR-006_Existing_Associations_and_Changes_to_Correlation_Data_or_Configuration.md) | Complete learner-facing lesson for Module 7.6 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [COR-007: The account is on the right identity now. What did the manual correction actually fix?](lessons/COR-007_Manual_Correction_and_What_the_Relationship_Change_Does_Not_Resolve.md) | Complete learner-facing lesson for Module 7.7 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [COR-008: HR names a manager. How does ISC know which identity that means?](lessons/COR-008_Manager_Correlation_and_Dependencies_of_Manager_Based_Processes.md) | Complete learner-facing lesson for Module 7.8 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [COR-009: The account or manager looks wrong. Where would you start the investigation?](lessons/COR-009_Investigating_Incorrect_Account_Links_Unmatched_Accounts_and_Missing_Managers.md) | Complete learner-facing lesson for Module 7.9 | Revision 1.0 saved; author-reviewed, learner validation pending |
| [TRN-001: The source already has a value. Do we need a transform?](lessons/TRN-001_Choosing_Between_Direct_Mapping_and_Calculated_Values.md) | Complete learner-facing lesson for Module 8.1 | Revision 1.0 saved; documentation-based author review complete, learner validation pending |
| [TRN-002: What is this transform actually going to return?](lessons/TRN-002_Reading_a_Transforms_Inputs_Operation_Configuration_and_Output.md) | Complete learner-facing lesson for Module 8.2 | Revision 1.0 saved; documentation-based author review complete, learner validation pending |
| [TRN-003: Which characters should this calculation keep?](lessons/TRN-003_Normalizing_and_Combining_Strings.md) | Complete learner-facing lesson for Module 8.3 | Revision 1.0 saved; documentation-based author review complete, learner validation pending |
| [Attribute tracing guide](assets/ATTRIBUTE_TRACING_GUIDE.txt) | Complete editable and downloadable reference aid, synchronized with the inline tracing questions | Revision 1.0; documentation checked October 21, 2026; no learner validation or tenant test |
| [Author reference records](author/REFERENCE_RECORDS.md) | Official sources mapped to lessons, prior verification dates, and limitations | Preserved outside learner lessons; no fresh technical verification implied |
| Course register | Progress, current lesson, next action, and review history | This file |

## Authored lesson register

### SYS-001

| Field | SYS-001 |
|---|---|
| Title | Why does an organization need ISC? |
| File | [SYS-001_Why_an_Organization_Needs_ISC.md](lessons/SYS-001_Why_an_Organization_Needs_ISC.md) |
| Course placement | Module 1.1: the business problems that lead an organization to implement ISC |
| Revision | 1.3 |
| Content status | Complete authored lesson with a traced access request, failure and manual-fulfillment variations, continuing-access reasoning, questions, worked answers, and a transfer exercise |
| Author review | Revision 1.1 reviewed for first-use explanations and diagram consistency on October 19, 2026; revision 1.2 checked for source-citation relocation and preservation of teaching content; review notes below; revision 1.3 received targeted feedback review on October 20, 2026 |
| Documentation check | October 19, 2026; official references read for the mechanisms used; links now preserved in the author reference records |
| Tenant testing | Not performed; scenarios and permission names are fictional |
| Learner validation | Pending; no beginner read-through or teach-back observed |
| Publication status | Not approved for publication; publication review pending |
| Known unresolved content issues | None identified in the author review; further reviewer or learner feedback may reveal issues |
| Next action | Preserve SYS-001 for further feedback and learner validation; SYS-002 was opened following the user's instruction to continue |

#### Author-review notes for SYS-001

- Scope: explains business need, fragmented information, decision ownership, access delivery, retained access, and evidence. Supporting mechanisms are introduced only to make those relationships understandable; detailed configuration remains in its planned lessons.
- Standalone context: Devi's work, existing account, missing permission, and expected outcome are stated. The opening distinguishes a confirmed missing permission from an access-denied symptom alone.
- Example checks: invoice reading and payment release remain separate; the successful path uses one existing correlated account, configured manager approval, and a supported provisioning operation. Rejection, a failed change, manual fulfillment, and later access review are distinguished from the successful path.
- Evidence checks: approval, provisioning reports, collected access, and target-system observations are not treated as interchangeable proof. Questions and answers preserve the limits of supplied evidence.
- Narration check: uses direct guidance and questions without announcing independent readability or promising learner confidence. Removed an extra blank line during review; added an inline explanation of governance, administration, and IGA.
- Technical sources reviewed: SailPoint's IGA overview, source and identity documentation, account aggregation and correlation, entitlements and entitlement requests, request processing, provisioning and monitoring, automatic role assignment, lifecycle states, identity views, and certification remediation. Links are retained in the author reference records, mapped to the relevant lesson sections.

#### Revision 1.1: first-use explanations and request flow

- Replaced the early list of unexplained mechanisms with plain-language responsibilities. Defined access request, requestable access, provisioning, and target system before the walkthrough depends on them. Moved the identity explanation before its use in setup context and the account-correlation explanation before its matching example. Expanded LCS beside lifecycle states.
- Added a flow diagram distinguishing manager rejection, an approved provisioning attempt, application success or the illustrated rejection, and human checks. Its assumptions and limits are explained beside it. The existing exercises and answers remain intact.
- Rechecked the official access-request, provisioning, and provisioning-monitoring documentation for the changed explanations and flow. Other references retain the preceding review; this is not a new tenant test.
- Updated the teaching specification to v2.4 so first-use meaning and purposeful diagrams are explicit requirements for future lessons.

Diagram assets: [viewable image](assets/SYS-001_request_flow.png), [vector artwork](assets/SYS-001_request_flow.svg), [editable Mermaid source](assets/SYS-001_request_flow.mmd), and [structured diagram source](assets/SYS-001_request_flow.json). Revision 1.1 embedded the image. Current revision 1.3 embeds the synchronized [text flow](assets/SYS-001_request_flow.txt); the earlier image and vector assets are retained as historical renderings of the same decision paths.

Diagram verification: canonical JSON schema and Mermaid static checks passed. The SVG is separately laid-out artwork for the same nodes and paths, not output from a Mermaid renderer. It was rendered locally in Edge for image delivery and visual inspection; this does not establish Mermaid-renderer acceptance or publication-format validation. Keep all diagram assets synchronized when revising the flow.

Reference-maintenance note: the current [SailPoint administration documentation](https://documentation.sailpoint.com/saas/help/sources/index.html) displays SailPoint Human Fabric naming. This course retains the user's requested ISC title. Confirm product naming and packaging during publication review; the lesson does not infer that every capability visible in the newer documentation navigation belongs in the ISC core course.

#### Feedback revision 1.3

Unique example number 11001, informal LCS wording, campaign/certification distinction, and synchronized inline request diagram. Supporting examples remain independently understandable, and no source citations were restored inside the learner file. This is a targeted revision, not a new tenant test, beginner validation, or full technical recheck of unchanged content.

### SYS-002

| Field | SYS-002 |
|---|---|
| Title | Signing in, using a permission, and where ISC fits |
| File | [SYS-002_Authentication_Authorization_and_ISC.md](lessons/SYS-002_Authentication_Authorization_and_ISC.md) |
| Course placement | Module 1.2: identity governance, authentication, and application authorization |
| Revision | 1.1 |
| Content status | Complete lesson with connected explanations, a two-process flow and separate observation path, failure variations, four worked cases, and a transfer exercise |
| Author review | Revision 1.0 reviewed against the teaching specification on October 20, 2026; scope, first-use explanations, conditional examples, evidence, and worked reasoning checked; revision 1.1 received targeted feedback review on October 20, 2026 |
| Documentation check | October 20, 2026; official SailPoint documentation, Microsoft identity documentation, and OWASP authorization guidance; section mappings in author reference records |
| Tenant testing | Not performed; application rules, accounts, permissions, timestamps, and outcomes are fictional |
| Learner validation | Pending; no beginner read-through or teach-back observed |
| Publication status | Not approved for publication; publication-format and learner checks pending |
| Known unresolved content issues | None identified in author review; actual application enforcement and session behavior require project-specific verification |
| Next action | Preserve SYS-002 for further feedback and learner validation; SYS-003 was opened following the user's instruction to continue |

#### Author-review notes for SYS-002

- Scope stays on responsibilities and connections. Protocol configuration, detailed entitlement modeling, lifecycle design, and team ownership receive fuller treatment in their planned lessons.
- The opening re-establishes Devi's work and existing account. Authentication, authorization, governance, access requests, provisioning, and supporting ISC objects are explained before the walkthrough relies on them.
- The sign-in example explicitly uses an existing enabled account, a trusted SAML relationship, and current-permission checks in the fictional application. Other session behaviors are separate variations, not universal claims.
- Distinguished business approval from runtime authorization; account correlation from sign-in account mapping; target changes from collection; and permission removal from session revocation.
- Front-end visibility is distinguished from trusted back-end enforcement. Successful sign-in, approved requests, operation reports, collected data, and current target state are not interchangeable evidence.
- Four worked cases and a transfer exercise test delivery failure, account mismatch, stale data, excessive access, and missing evidence. Answers explain the next useful check rather than inventing a universal fix.
- Narration review removed unexplained protocol-check terminology by explaining signatures, audience, and recipient. No lesson source links, course-method announcements, or claims of guaranteed learner confidence were added.

Diagram source: [editable text flow](assets/SYS-002_access_and_signin_flow.txt). The same text is embedded in the lesson so a diagram renderer is not required. The labeled branches, example identifiers, and observation direction were checked against the lesson and worked cases. Text synchronization and local-file checks are recorded separately from publication rendering; no graphical rendering or publication-format visual validation is claimed.

#### Feedback revision 1.1

Unique example number 12002 and a shorter conceptual sign-in validation step; delivery and authorization reasoning retained. Supporting examples remain independently understandable, and no source citations were restored inside the learner file. This is a targeted revision, not a new tenant test, beginner validation, or full technical recheck of unchanged content.

### SYS-003

| Field | SYS-003 |
|---|---|
| Title | Who owns what when access needs to change? |
| File | [SYS-003_Who_Owns_What_in_Identity_and_Access.md](lessons/SYS-003_Who_Owns_What_in_Identity_and_Access.md) |
| Course placement | Module 1.3: responsibilities of HR, directory teams, application owners, managers, and ISC engineers |
| Revision | 1.1 |
| Content status | Complete lesson with responsibility distinctions, a manager-data investigation, handoff diagram, ownership and user-level explanations, four worked cases, and a supplier-portal transfer exercise |
| Author review | Revision 1.0 reviewed against the teaching specification on October 20, 2026; first-use explanations, business/product distinctions, evidence boundaries, examples, and answers checked; revision 1.1 received targeted feedback review on October 20, 2026 |
| Documentation check | October 20, 2026; official SailPoint references mapped in the author reference records |
| Tenant testing | Not performed; people, identifiers, group mappings, task examples, and times are fictional |
| Learner validation | Pending; no beginner read-through or teach-back observed |
| Publication status | Not approved for publication; publication-format and learner checks pending |
| Known unresolved content issues | None identified in author review; responsibility assignments, integration capabilities, and existing request behavior must be verified in each implementation |
| Next action | Preserve SYS-003 for further feedback and learner validation; SYS-004 was opened following the user's instruction to continue |

#### Author-review notes for SYS-003

- The organizational model is explicitly recommended practice, not a product-mandated organization chart. It distinguishes decision authority, execution, coordination, and verification.
- HR, managers, application owners and administrators, directory operators, ISC engineers, security, support, and audit have concrete responsibilities without implying that every organization uses separate teams.
- The example separates employment truth, exported input, collected account data, manager correlation, and existing request assignment. The documented retained-manager behavior for an unmatched changed value is included; automatic rerouting of existing approvals is not promised.
- Application meaning of a directory entitlement is an explicit fictional mapping. Successful group provisioning does not prove appropriately designed or usable application access.
- Source owner, entitlement owner, governance group, and administrative user level are distinct. Manual task ownership is qualified by the operation and actual assignment, not assumed to belong universally to the source owner.
- Review decisions, removal work, and target verification remain separate. New-project agreements include failure ownership, manual fulfillment, and backup coverage.
- First-use review moved directory/group explanations before the access mapping table. The lesson contains no external source citations, course links, forced biography, or course-method announcements.
- Four worked cases address incorrect mappings, excessive application rights, owner-versus-admin confusion, and incomplete manual removal. The transfer exercise accepts different arrangements when authority, execution, coordination, and evidence are specified.

Diagram source: [editable responsibility handoffs](assets/SYS-003_responsibility_handoffs.txt). The diagram is embedded as text in the lesson. It separates data responsibility from request delivery and labels human verification; it is not a universal backend pipeline. Source synchronization and local-file checks are distinct from publication-format rendering, which remains pending.

#### Feedback revision 1.1

Unique example number 13003 and consistent campaign/certification meanings; manual task and manager-correlation claims selectively rechecked. Supporting examples remain independently understandable, and no source citations were restored inside the learner file. This is a targeted revision, not a new tenant test, beginner validation, or full technical recheck of unchanged content.

### SYS-004

| Field | SYS-004 |
|---|---|
| Title | What should be allowed, what ISC records, and what actually works |
| File | [SYS-004_Intended_Known_and_Effective_Access.md](lessons/SYS-004_Intended_Known_and_Effective_Access.md) |
| Course placement | Module 1.4: intended access, ISC information, and effective application access |
| Revision | 1.1 |
| Content status | Complete lesson with scoped access examples, change and observation paths, a timed removal case, four worked questions, a two-account transfer exercise, and a teach-back answer |
| Author review | Revision 1.0 reviewed against the teaching specification on October 20, 2026; first-use explanations, causal reasoning, evidence boundaries, narration, and example consistency checked; revision 1.1 received targeted feedback review on October 20, 2026 |
| Documentation check | October 20, 2026; official SailPoint, Microsoft, and OWASP references mapped in the author records |
| Tenant testing | Not performed; accounts, permissions, application behavior, timestamps, and results are fictional |
| Learner validation | Pending; no beginner read-through or teach-back observed |
| Publication status | Not approved for publication; learner and publication-format checks pending |
| Known unresolved content issues | None identified in author review; actual integration coverage, grant paths, and session behavior require implementation-specific verification |
| Next action | Preserve SYS-004 for further feedback and learner validation; SYS-005 was opened following the user's instruction to continue |

#### Author-review notes for SYS-004

- The three-view distinction is a teaching model, not a set of ISC status fields. Business requirements are distinguished from configuration, assignments, operation history, collected observations, and runtime behavior.
- Devi's account, read/export permissions, effective deadline, and retained-access requirement are established without relying on prior lessons.
- The fictional timeline demonstrates agreement during a failed removal and disagreement after a correct manual correction. The original failed operation remains historical evidence; the later correction does not retroactively change its outcome.
- The diagram separates supported change delivery, collection, and human comparison. It does not imply immediate round-trip synchronization or universal automatic reconciliation.
- First-use meanings cover identity/account, source/connector, entitlement, access profile, role, request, provisioning, aggregation, processing, authorization, session, schema, and synchronization.
- Search visibility, time-zone handling, collection scope, alternate grant paths, and old sessions qualify the conclusions. Missing evidence and service failure are not treated as proof of removed access.
- Read-only investigation is separated from retries, collection, and processing that can have operational effects. No universal remediation sequence or fixed timing is promised.
- Four worked cases and the supplier-portal transfer exercise require scoped evidence and preservation of legitimate access. Narration was reviewed for direct, patient explanation without source links or course-method commentary.

Diagram source: [editable change and observation flow](assets/SYS-004_access_change_and_observation.txt). The same diagram is embedded in the lesson. Text synchronization and local-link checks are separate from graphical rendering and publication-format validation, which have not been performed.

#### Feedback revision 1.1

Unique example number 14004; Search date-query GMT/browser-display behavior selectively rechecked. Supporting examples remain independently understandable, and no source citations were restored inside the learner file. This is a targeted revision, not a new tenant test, beginner validation, or full technical recheck of unchanged content.

### SYS-005

| Field | SYS-005 |
|---|---|
| Title | Building access management is only the beginning |
| File | [SYS-005_Implementation_Administration_Support_and_Governance.md](lessons/SYS-005_Implementation_Administration_Support_and_Governance.md) |
| Course placement | Module 1.5: how implementation, administration, support, and governance work relate |
| Revision | 1.1 |
| Content status | Complete lesson with an application-service example, acceptance and handover reasoning, incident recovery and prevention, governance follow-up, a handoff diagram, four worked cases, and a warehouse-portal transfer exercise |
| Author review | Revision 1.0 reviewed against the teaching specification on October 20, 2026; scope, first-use explanations, operational reasoning, diagram, and worked answers checked; revision 1.1 received targeted feedback review on October 20, 2026 |
| Documentation check | October 20, 2026; official SailPoint references mapped in the author records |
| Tenant testing | Not performed; application, permission names, records, integration behavior, and incident results are fictional |
| Learner validation | Pending; no beginner read-through or teach-back observed |
| Publication status | Not approved for publication; learner and publication-format checks pending |
| Known unresolved content issues | None identified in author review; actual connector capabilities, release availability, assignment origins, and recovery behavior require environment-specific verification |
| Next action | Preserve SYS-005 for further feedback and learner validation; SYS-006 was opened following the user's instruction to continue |

#### Author-review notes for SYS-005

- Explains categories of work and their feedback, rather than repeating SYS-003's team-ownership map or presenting a mandatory organization chart.
- Re-establishes Devi's invoice-checking duty, existing account, missing review permissions, and prohibited payment-release capability. The chosen release deliberately excludes automatic account creation.
- Acceptance includes expected grants, denials, failures, removal, retained access, and exception handling. Connection success is not treated as validation of every operation.
- Handover covers design limits, evidence, operation-specific privileges, schedule expectations, and escalation. Runbooks explain decision conditions, not just buttons.
- The incident distinguishes the user's account from the integration account, tests causation against evidence, and separates scoped recovery from wider affected-work recovery and recurrence prevention.
- Governance decisions and remediation remain separate. The example excludes competing assignments; it does not generalize access-profile removal across every assignment type.
- Correcting configuration is distinct from correcting delivered target effects. Access-profile deletion behavior is checked against official documentation.
- A read-only integration variation makes manual execution and agreed service expectations explicit. No automatic write capability is invented.
- Four worked cases and the transfer exercise require decisions, evidence, safe verification, and unresolved-gap handling. Source links and teaching-method announcements remain outside the learner file.

Diagram source: [editable service-work handoffs](assets/SYS-005_service_work_handoffs.txt). The diagram labels human work and evidence transfers rather than automatic ISC stages. Exact text synchronization and local links are checked separately from publication rendering, which remains pending.

#### Feedback revision 1.1

Unique example number 15005 and consistent campaign/certification meanings. Supporting examples remain independently understandable, and no source citations were restored inside the learner file. This is a targeted revision, not a new tenant test, beginner validation, or full technical recheck of unchanged content.

### SYS-006

| Field | SYS-006 |
|---|---|
| Title | Follow the access problem across the systems |
| File | [SYS-006_Following_an_Access_Problem_Across_the_Enterprise.md](lessons/SYS-006_Following_an_Access_Problem_Across_the_Enterprise.md) |
| Course placement | Module 1.6: following an access problem across the enterprise using a system map |
| Revision | 1.1 |
| Content status | Complete lesson with a connected record/decision map, department-input investigation, corrected path, changed-evidence variations, four worked cases, and a contractor/location transfer exercise |
| Author review | Revision 1.0 reviewed against the teaching specification on October 20, 2026; definitions, dependencies, example conditions, evidence, narration, and worked reasoning checked; revision 1.1 received targeted feedback review on October 20, 2026 |
| Documentation check | October 20, 2026; official SailPoint documentation, OWASP authorization guidance, and Microsoft session documentation mapped in author records |
| Tenant testing | Not performed; records, codes, times, account/permission names, application rules, and results are fictional |
| Learner validation | Pending; no beginner read-through or teach-back observed |
| Publication status | Not approved for publication; learner and publication-format checks pending |
| Known unresolved content issues | None identified in author review; each real implementation requires its own mapping authority, grant path, processing, connector, and enforcement evidence |
| Next action | Preserve SYS-006 for further feedback and learner validation; FND-001 has been reviewed and FND-002 authored following the user's instruction to continue |

#### Author-review notes for SYS-006

- Combines the system relationships into one investigation. It does not promise complete troubleshooting coverage for every connector or expose invented internal ISC services.
- Establishes Devi's effective transfer, existing reporting account, successful sign-in, denied report operation, and required permission before tracing the records.
- Separates current HR data, collected HR and directory accounts, identity-profile input selection, identity values, role criteria, delivery, and application enforcement.
- Explicitly identifies the false criteria result as reasoning from fictional supplied values, not a claim about an available per-comparison log.
- The main cause is a mapping that conflicts with the approved attribute authority. The shared population and downstream dependencies must be assessed before correction.
- Successful continuation includes identity update, role assignment, reported delivery, current target permission, controlled use, boundary checks, and subsequent observation. Processing is not treated as target-delivery validation.
- Authentication, sign-in account mapping, account correlation, application authorization, sessions, and front/back-end responsibilities are connected without teaching undocumented protocol internals.
- Changed-evidence variations move the investigation to collection, assignment, delivery, or enforcement. Empty activity/search results are not used alone to prove that an operation did not occur.
- First-use explanations include identity profiles, authoritative populations, mappings, criteria, roles/profiles/entitlements, processing, provisioning, and separately configured attribute synchronization.
- Four worked cases and the contractor/location transfer require causal reasoning and missing-evidence identification. No source links, forced story continuity, or teaching-method announcements are present.

Diagram source: [editable enterprise access map](assets/SYS-006_enterprise_access_map.txt). It is embedded as a text diagram and distinguishes dependencies, selected inputs, criteria branches, collection, and human checking. Exact source synchronization and local links are checked separately from graphical or publication-format rendering, which remains pending.

#### Feedback revision 1.1

Unique example number 16006 propagated through records, account names, map, and worked reasoning. Supporting examples remain independently understandable, and no source citations were restored inside the learner file. This is a targeted revision, not a new tenant test, beginner validation, or full technical recheck of unchanged content.

### FND-001

| Field | FND-001 |
|---|---|
| Title | Identity and account: how one person is represented across systems |
| File | [FND-001_Identity_and_Account.md](lessons/FND-001_Identity_and_Account.md) |
| Course placement | Module 2: identities, accounts, and their relationships |
| Revision | 1.3 |
| Content status | Complete authored pilot with explanations, examples, reasoning questions, and worked answers; references saved separately in the author records |
| Feedback status | Latest supplied feedback incorporated into the saved revision |
| Author technical review | Revision 1.3 reviewed against teaching specification v2.6 on October 20, 2026; independent context, first-use meanings, conditional matching, separate operations, evidence, and worked reasoning checked. No learner-body change was needed |
| Documentation check preserved in author records | Original check: October 19, 2026. Selected mechanisms rechecked October 20, 2026: source/account representation, schema, identity-profile population and mappings, correlation and default fallback, multiple accounts, provisioning, and attribute sync. Scope recorded in author references |
| Learner validation | Not yet performed with a beginner learner |
| Publication status | Not marked approved or publication-ready |
| Next action | Preserve revision 1.3 for learner validation and further feedback; continue with the separate source/connector concept lesson FND-002 |

FND-001 was not technically reverified during the creation of SYS-001. The separate October 20 review above now records the selected mechanisms actually rechecked. Its lesson file remains revision 1.3 because no teaching content changed. Saving or reviewing a file is not proof of learner understanding.

#### Feedback preserved in revision 1.1

- An authoritative source supplies the identity population but does not necessarily supply every identity attribute; identity-profile mappings determine where attribute values come from.
- A failed comparison is distinguished from the outcome of the full applicable correlation behavior.
- Associating an existing account, creating a target account, and updating account attributes are explained as different operations.
- Configured automation can initiate provisioning; identity existence alone does not prove a target account exists or that provisioning succeeded.
- ISC's account representation is distinguished from the account in the target system.
- Attribute synchronization is described in terms of configured attributes on existing correlated accounts.
- The third checkpoint identifies concrete evidence rather than assuming a universal field or screen proves the outcome.

#### Narration changes in revision 1.2

Removed the announcement that the lesson can be read independently and other unnecessary explanation preambles. Rephrased the employee-identity scope directly. Technical distinctions, example assumptions, reasoning exercises, worked answers, and references are retained. This was an editorial change, not a new technical verification or learner-validation pass.

Teaching specification v2.2 now requires a personal, polite, friendly mentor voice and excludes commentary about the teaching method from learner lessons. Useful guidance through records, values, decisions, and evidence remains part of the explanation.

### FND-002

| Field | FND-002 |
|---|---|
| Title | Sources, connectors, and the systems they connect to |
| File | [FND-002_Sources_Connectors_and_Connected_Systems.md](lessons/FND-002_Sources_Connectors_and_Connected_Systems.md) |
| Course placement | Module 2.2 |
| Revision | 1.0 |
| Content status | Complete authored lesson with object distinctions, configured integration boundaries, read and write traces, file-age case, evidence comparison, five worked cases, and an unfamiliar-system transfer exercise |
| Author review | Revision 1.0 reviewed against teaching specification v2.6 on October 20, 2026; scope, independent terminology, conditions, causal reasoning, diagram, examples, narration, and worked answers checked |
| Documentation check | October 20, 2026; official SailPoint source, configuration, schema, identity-profile, correlation, aggregation, connector-feature, provisioning, and monitoring references mapped in author records |
| Diagram source | [Editable read/write boundary map](assets/FND-002_read_and_write_boundaries.txt); checked against the inline text block |
| Tenant execution | Not performed; records, applications, timings, and outcomes are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve FND-002 for further feedback and learner validation; FND-003 was authored following the user's instruction to continue |

The lesson introduces authoritative-source and identity-profile roles only as needed to distinguish population creation from collecting another system's accounts. It names supported VA-based and SaaS connection arrangements without inventing network topology. Full deployment mechanics remain in Module 3; access applications and catalogs remain in Module 2.5.

### FND-003

| Field | FND-003 |
|---|---|
| Title | Account, identity, and entitlement attributes: which value are you looking at? |
| File | [FND-003_Account_Identity_and_Entitlement_Attributes.md](lessons/FND-003_Account_Identity_and_Entitlement_Attributes.md) |
| Course placement | Module 2.3 |
| Revision | 1.0 |
| Content status | Complete authored lesson with object-level values, schema meaning, identity mappings and calculation, optional attribute-sync write, membership-to-entitlement links, data shapes and missing values, evidence tracing, five worked cases, and a transfer exercise |
| Author review | Revision 1.0 reviewed against teaching specification v2.6 on October 20, 2026; first-use meaning, independent example context, input/output distinctions, conditions, diagrams, worked reasoning, and narration checked |
| Documentation check | October 20, 2026; official schemas, identity profiles, transforms, identity processing, attribute sync, entitlement types/aggregation, entitlement metadata, correlation, and monitoring references mapped in author records |
| Diagram sources | [Attribute value flow](assets/FND-003_attribute_value_flow.txt) and [membership reference link](assets/FND-003_membership_entitlement_link.txt); checked against the two inline text blocks |
| Tenant execution | Not performed; records, source names, group IDs, conversion logic, and outcomes are fictional teaching conditions |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve FND-003 for further feedback and learner validation; FND-004 was authored following the user's instruction to continue |

The lesson distinguishes a membership-bearing account field marked Entitlement from attributes of an entitlement record. Attribute sync and the FIN-to-Finance transform are explained only to trace value origin and direction; full configuration mechanics remain in their primary lessons. No input snippet is presented as a runnable command or universal connector payload.

### FND-004

| Field | FND-004 |
|---|---|
| Title | Entitlements, access profiles, and roles: how the access objects fit together |
| File | [FND-004_Entitlements_Access_Profiles_and_Roles.md](lessons/FND-004_Entitlements_Access_Profiles_and_Roles.md) |
| Course placement | Module 2.4 |
| Revision | 1.0 |
| Content status | Complete authored lesson with source entitlements, single-source bundles, a cross-source role with direct entitlement, assignment criteria, definition/delivery distinctions, partial outcome and detection variations, removal/deletion cautions, six worked cases, and a transfer exercise |
| Author review | Revision 1.0 reviewed against teaching specification v2.6 on October 20, 2026; independent context, first-use explanations, source boundaries, role contents, assignment conditions, evidence limits, diagram consistency, and narration checked |
| Documentation check | October 20, 2026; official role, access-profile, assignment, request, entitlement, processing, and monitoring references mapped in author records |
| Diagram sources | [Access-object relationships](assets/FND-004_access_object_relationships.txt), [assignment conditions](assets/FND-004_assignment_conditions.txt), and [assignment/delivery flow](assets/FND-004_assignment_and_delivery.txt); synchronized with the three inline text blocks |
| Tenant execution | Not performed; employee 24004, accounts, source names, entitlement names, work requirement, and outcomes are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve FND-004 for further feedback and learner validation; FND-005 was authored following the user's instruction to continue |

This introductory map does not require every role entitlement to pass through an access profile. The example uses ordinary provisioned access, existing accounts, one relevant account per source, and no alternate grants in the successful path. Native application roles, ownership, detected bundles, overlapping role requirements, and definition deletion remain distinct from assignment and actual target operations. Detailed access-model mechanics remain in Modules 10-12.

### FND-005

| Field | FND-005 |
|---|---|
| Title | Sources, access applications, and sign-in: what does “the application” mean? |
| File | [FND-005_Sources_Access_Applications_Catalogs_and_Sign_In.md](lessons/FND-005_Sources_Access_Applications_Catalogs_and_Sign_In.md) |
| Course placement | Module 2.5 |
| Revision | 1.0 |
| Content status | Complete authored lesson with external/ISC application/source distinctions, catalog choices, requester/recipient and audience rules, separate request/provisioning and sign-in paths, native-access visibility limits, password/removal context, five worked cases, and a transfer exercise |
| Author review | Revision 1.0 reviewed against teaching specification v2.6 on October 20, 2026; independent context, first-use meanings, source boundaries, requester segmentation, request/sign-in separation, evidence, examples, diagrams, and narration checked |
| Documentation check | October 20, 2026; official access-application, request, segmentation, password, source, monitoring, and primary Microsoft identity/security references mapped in author records |
| Diagram sources | [Application/source map](assets/FND-005_application_source_map.txt) and [request/sign-in paths](assets/FND-005_request_and_sign_in_paths.txt); synchronized with the inline text blocks |
| Tenant execution | Not performed; employee 25005, dir-25005, exp-25005, ExpenseHub, access items, group effects, and outcomes are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve FND-005 for feedback and learner validation; FND-006 was opened following the user's instruction to continue |

The example manages expense access through directory memberships; no separate ExpenseHub source is assumed. Existing application accounts and a separately configured sign-in trust/mapping are explicit conditions. Requester segmentation is not treated as a recipient eligibility gate, catalog changes are not revocation, and access applications are not presented as SSO configuration or a universal application launcher.

### FND-006

| Field | FND-006 |
|---|---|
| Title | Object IDs, account identifiers, and names: which record are we talking about? |
| File | [FND-006_Object_IDs_Account_Identifiers_and_References.md](lessons/FND-006_Object_IDs_Account_Identifiers_and_References.md) |
| Course placement | Module 2.6 |
| Revision | 1.0 |
| Content status | Complete authored lesson with business/ISC/native identifiers, source and identity references, entitlement IDs versus source values, access-definition and membership maps, environment/type context, rename and schema-change distinctions, five worked cases, and a transfer/teach-back exercise |
| Author review | Revision 1.0 reviewed against teaching specification v2.6 on October 20, 2026; first-use meanings, fictional record consistency, reference relationships, rename conditions, evidence boundaries, diagrams, assessments, and mentor narration checked |
| Documentation check | October 20, 2026; official account/entitlement/access-profile models, Search fields, account and entitlement schemas, correlation, entitlement editing, and Snowflake identifier warning mapped in author records |
| Diagram sources | [Account/identity references](assets/FND-006_account_identity_references.txt) and [access-definition references](assets/FND-006_access_definition_references.txt); synchronized with inline blocks |
| Tenant execution | Not performed; employee 26006, Ledger, accounts, native keys, technical-ID stand-ins, warehouse transfer, and outcomes are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve FND-006 for feedback and learner validation; FND-007 was opened following the user's instruction to continue |

Technical IDs use explicit non-runnable teaching labels. Account object ID, native identity, schema-determined UUID, business identifier, and Search accountId are not treated as universal aliases. Changing an ISC entitlement label, changing schema designations, changing an external key, and recreating an object remain distinct. Diagrams describe documented relationships, not private backend storage or universal execution order.

### FND-007

| Field | FND-007 |
|---|---|
| Title | One identity, multiple accounts: which account are we talking about? |
| File | [FND-007_One_Identity_with_Multiple_Accounts.md](lessons/FND-007_One_Identity_with_Multiple_Accounts.md) |
| Course placement | Module 2.7 |
| Revision | 1.0 |
| Content status | Complete authored lesson with one-to-many relationships, legitimate same-source accounts, correlation versus merging, account-specific attributes/access/state, attribute-value lookup versus provisioning selection, automatic/request selection distinctions, repeat-profile request limit, six worked cases, and a payroll transfer/teach-back |
| Author review | Revision 1.0 reviewed against teaching specification v2.6 on October 20, 2026; independent context, first-use meanings, account counts, conditional selection behavior, source and target evidence, diagrams, answers, and mentor narration checked |
| Documentation check | October 20, 2026; official source/account/correlation, identity-profile, Account Attribute transform, access-profile, role/lifecycle, request, and monitoring references mapped in author records |
| Diagram sources | [Identity/account map](assets/FND-007_identity_account_map.txt) and [account-selection contexts](assets/FND-007_account_selection_contexts.txt); synchronized with inline blocks and kept to 50-character line widths |
| Tenant execution | Not performed; employee 27007, Stockroom, logins, account-purpose data, ID stand-ins, permission meanings, payroll transfer, and outcomes are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve FND-007 for feedback and learner validation; ARC-001 was opened following the user's instruction to continue |

The lesson separates personal-account correlation from shared-account responsibility, account rows from person identities, value lookup from grant selection, and account selection from successful fulfillment. Multiple Account Options are not presented as universal filters for requests or single-account identities. All seven Module 2 lesson files are authored; that is an authoring milestone, not beginner validation.

### ARC-001

| Field | ARC-001 |
|---|---|
| Title | The ISC tenant: what SailPoint runs, and what your organization still owns |
| File | [ARC-001_ISC_Tenant_and_Customer_Responsibilities.md](lessons/ARC-001_ISC_Tenant_and_Customer_Responsibilities.md) |
| Course placement | Module 3.1 |
| Revision | 1.0 |
| Content status | Complete authored lesson with tenant/SaaS boundaries, operational responsibility table, represented versus external accounts, VA/SaaS connection distinctions, shared VA maintenance, an approved-but-denied update timeline, three-actor permissions, sandbox destination risk, configuration/application evidence, six cases, and SaaS-connector transfer/teach-back |
| Author review | Revision 1.0 reviewed against teaching specification v2.6 on October 20, 2026; independent context, first-use meanings, documented boundaries, fictional operation conditions, evidence reasoning, diagrams, answers, and mentor narration checked |
| Documentation check | October 20, 2026; official platform/tenant description, source/connector definitions, external credential responsibilities, VA operation/requirements, tenant user levels/badges/notifications, identity/role configuration, deployment and monitoring references mapped in author records |
| Diagram sources | [Tenant/system boundaries](assets/ARC-001_tenant_and_system_boundaries.txt) and [request/target permission](assets/ARC-001_request_and_target_permission.txt); synchronized with inline blocks, maximum line widths 55 and 57 characters |
| Tenant execution | Not performed; employee 31001, Supplier Register, supplier-31001, svc-supplier-isc, supplier.view, times, privileges, document-service transfer, and outcomes are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 3; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve ARC-001 for feedback and learner validation; ARC-002 was opened following the user's instruction to continue |

The responsibility map is an operational teaching model, not a contractual SLA, assurance of universal feature availability, private backend topology, or reason to presume the customer caused every failure. The VA example is explicitly scoped; the SaaS-connector transfer has no customer-deployed VA. Restoring a prerequisite, recovering failed work, and verifying target access remain distinct.

### ARC-002

| Field | ARC-002 |
|---|---|
| Title | Virtual Appliances and clusters: where does the connection work happen? |
| File | [ARC-002_Virtual_Appliances_and_Clusters.md](lessons/ARC-002_Virtual_Appliances_and_Clusters.md) |
| Course placement | Module 3.2 |
| Revision | 1.0 |
| Content status | Complete authored lesson with VA/tenant/cluster/source distinctions, documented queue polling and outbound connection initiation, pairing/CCG, member-level dependencies, health scope, HA versus DR, DNS failure investigation, standard/CPOS maintenance boundaries, interrupted-outcome reasoning, six cases, and Payroll transfer/teach-back |
| Author review | Revision 1.0 reviewed against teaching specification v2.6 on October 20, 2026; independent context, first-use meanings, documented execution/communication boundaries, health and recovery conditions, fictional evidence, diagrams, answers, and mentor narration checked |
| Documentation check | October 20, 2026; official VA overview/deployment/management/requirements/configuration, CPOS, source definitions, and provisioning evidence references mapped in author records |
| Diagram sources | [Source/cluster/member map](assets/ARC-002_sources_cluster_members.txt) and [outbound/work exchange](assets/ARC-002_outbound_and_work_exchange.txt); synchronized with inline blocks, maximum line widths 45 and 51 characters |
| Tenant execution | Not performed; employee 32002, AssetDesk, asset-32002, svc-asset-isc, asset.read, C-Asset-Prod, both VA names, DNS/host failures, and Payroll transfer are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 3; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve ARC-002 for feedback and learner validation; ARC-003 was opened following the user's instruction to continue |

The lesson uses the documented VA cluster queue/polling model, not an invented private backend. Work direction is distinguished from VA-initiated outbound communication. Appliance availability, per-member target connectivity, update continuity, DR source reassociation, and operation recovery remain separate. A supplied lost-response case is not combined with the main before-authentication DNS failure.

### ARC-003

| Field | ARC-003 |
|---|---|
| File | [ARC-003_SaaS_Connectors_and_Their_Connection_Path.md](lessons/ARC-003_SaaS_Connectors_and_Their_Connection_Path.md) |
| Revision | 1.0 |
| Course placement | Module 3.3 |
| Content status | Complete lesson saved; cloud hosting versus connector runtime, configuration and external API authority, reads and supported changes, UI evidence, operational failures, and migration boundaries |
| Author review | October 20, 2026; meaning-before-process, independent example context, causal flows, operation-specific evidence, diagrams, six worked cases, transfer, and mentor narration checked |
| Documentation check | October 20, 2026; official SaaS connectivity, source definitions, connector-specific authentication/capability examples, migration, account/schema/provisioning references, and OAuth terminology mapped in author records |
| Diagram sources | [SaaS and VA paths](assets/ARC-003_saas_and_va_paths.txt) and [read and change](assets/ARC-003_read_and_change.txt); synchronized with inline blocks, maximum line widths 39 and 51 characters |
| Tenant execution | Not performed; employee 33003, ProjectBoard, project-33003, isc-project-prod, workspaces, project.view, API behavior and incident evidence are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 3; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve ARC-003 for feedback and learner validation; ARC-004 was opened following the user's instruction to continue |

The source's selected connector determines its supported execution path, not the business application's hosting location. Read capability, target authorization, business approval, external destination, reported operation result, and collected account state remain distinct. Migration is scoped to the documented eligible sources and irreversible apply process; retiring a shared cluster is a separate decision.

### ARC-004

| Field | ARC-004 |
|---|---|
| File | [ARC-004_Where_IQService_Fits.md](lessons/ARC-004_Where_IQService_Fits.md) |
| Revision | 1.0 |
| Course placement | Module 3.4 |
| Content status | Complete lesson saved; IQService's operation-specific Windows role, ISC/VA/target path, separate credential contexts, TLS/client authentication, partial-path evidence, scripts/handlers, update and shared-dependency boundaries |
| Author review | October 20, 2026; concept meanings, independent Devi example, logical boundaries, certificate incident, account roles, diagrams, six worked cases, transfer and mentor narration checked |
| Documentation check | October 20, 2026; official IQService introduction, requirements, security/TLS, handlers/scripts, update/troubleshooting, and ISC Active Directory operation requirements mapped in author records |
| Diagram sources | [Operation path](assets/ARC-004_operation_path.txt) and [security boundaries](assets/ARC-004_security_boundaries.txt); synchronized with inline blocks, maximum line widths 49 and 44 characters |
| Tenant execution | Not performed; employee 34004, Engineering Directory, eng-34004, group/account/host/cluster names and incident evidence are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 3; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve ARC-004 for feedback and learner validation; ARC-005 was opened following the user's instruction to continue |

IQService isn't a Windows replacement for a VA or a universal provisioning-only component. Its operation-specific role is separated from source configuration, client admission, service execution context, target authorization and verification. TLS/client authentication remain required rather than bypassed for troubleshooting. Handler availability, after-script outcomes, update readiness and shared-service maintenance remain separate conditions.

### ARC-005

| Field | ARC-005 |
|---|---|
| File | [ARC-005_Connection_Dependencies_and_Operation_Support.md](lessons/ARC-005_Connection_Dependencies_and_Operation_Support.md) |
| Revision | 1.0 |
| Course placement | Module 3.5 |
| Content status | Complete lesson saved; runtime/destination context, DNS/reachability/TLS, caller authentication and resource authorization, connector capability and valid input, error-origin evidence, partial outcomes and supported recovery |
| Author review | October 20, 2026; concept meanings, independent Devi example, dependency map, logical versus network flow, main denied-write trace, five investigations, project-design transfer and mentor narration checked |
| Documentation check | October 20, 2026; official source/VA/SaaS and connector-specific operation/authorization references, provisioning evidence, and primary HTTP semantics references mapped in author records |
| Diagram sources | [Runtime paths](assets/ARC-005_runtime_paths.txt) and [evidence and recovery](assets/ARC-005_evidence_and_recovery.txt); synchronized with inline blocks, maximum line widths 44 and 50 characters |
| Tenant execution | Not performed; employee 35005, OrderDesk, accounts/access/source/workspace/VA names, target audit and network incidents, and ResearchArchive are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 3; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve ARC-005 for feedback and learner validation; ARC-006 was opened following the user's instruction to continue |

The dependency map isn't a fixed packet sequence or private ISC algorithm. Test scope, actual runtime, error origin, caller/resource context, supported capability and valid input remain separate. A restored prerequisite, reconciled work and verified target result are distinct outcomes. HTTP codes aren't universal credential diagnoses, and a timeout isn't proof of no effect.

### ARC-006

| Field | ARC-006 |
|---|---|
| File | [ARC-006_UI_APIs_Automation_and_Platform_Capabilities.md](lessons/ARC-006_UI_APIs_Automation_and_Platform_Capabilities.md) |
| Revision | 1.0 |
| Course placement | Module 3.6 |
| Content status | Complete lesson saved; entry point versus capability, read/configuration/request/delivery distinctions, caller/user-level/token context, asynchronous submission and references, external automation versus Workflows, trigger/choice/execution evidence and supported API contracts |
| Author review | October 20, 2026; first-use explanations, independent Devi example, alternative UI/API routes, conditional delivery, Workflow filter/choice diagram, five worked cases, automation-design transfer and mentor narration checked |
| Documentation check | October 20, 2026; official API authentication/authorization/versioning, access-request contract, Workflow definition/trigger/action/execution references, and supporting request/provisioning concepts mapped in author records |
| Diagram sources | [Entry points and delivery](assets/ARC-006_entry_points_and_delivery.txt) and [Workflow trigger and choice](assets/ARC-006_workflow_trigger_and_choice.txt); synchronized with inline blocks, maximum line widths 46 and 46 characters |
| Tenant execution | Not performed; employee 36006, ReportHub, report-36006, svc-report-isc, report.read, I-36/AP-36/AR-36, notification Workflow and training-application transfer are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 3; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve ARC-006 for feedback and learner validation; ARC-007 was opened following the user's instruction to continue |

UI/API alternatives don't imply identical public endpoints, permission parity, approval bypass or complete delivery. A token, a submitted request, an execution and target access are distinct evidence objects. Workflows are configured automation, not every internal process; enabled state, trigger filters, executed branches and action semantics determine what an execution establishes.

### ARC-007

| Field | ARC-007 |
|---|---|
| File | [ARC-007_Signing_Into_ISC_Identity_Providers_and_Source_Passwords.md](lessons/ARC-007_Signing_Into_ISC_Identity_Providers_and_Source_Passwords.md) |
| Revision | 1.0 |
| Course placement | Module 3.7 |
| Content status | Complete lesson saved; native/directory/federated sign-in alternatives, authoritative versus authentication sources, SAML trust and user mapping, session/authorization separation, MFA/recovery contexts, supported password delivery, source/shared-password relationships, partial outcomes and evidence |
| Author review | October 20, 2026; first-use explanations, independent Devi example, successful and failed sign-in/password paths, three diagrams, seven worked cases, purchasing-design transfer and mentor narration checked |
| Documentation check | October 20, 2026; official identity-profile, PTA, SAML service-provider/JIT, MFA, Password Management/policy/application/sync, recovery and session/lockout documentation mapped in author records |
| Diagram sources | [Federated sign-in](assets/ARC-007_federated_sign_in.txt), [Directory sign-in](assets/ARC-007_directory_sign_in.txt) and [Source password change](assets/ARC-007_source_password_change.txt); synchronized with inline blocks, maximum line widths 39, 44 and 43 characters |
| Tenant execution | Not performed; employee 37007, HR/directory/AccessGate/CaseDesk records, svc-case-isc, authentication evidence, password outcomes and purchasing transfer are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 3; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve ARC-007 for feedback and learner validation; ARC-008 was opened following the user's instruction to continue |

SSO into ISC is not a trust for every managed application, password copying, account correlation, universal session termination or an administrative permission grant. PTA and source-password operations have their own configured dependencies. Password policies, verification, target authority and per-source outcomes remain distinct; approved emergency access and recovery are not reasons to bypass controls.

### ARC-008

| Field | ARC-008 |
|---|---|
| File | [ARC-008_Requesting_Executing_and_Observing_Work.md](lessons/ARC-008_Requesting_Executing_and_Observing_Work.md) |
| Revision | 1.0 |
| Course placement | Module 3.8 |
| Content status | Complete lesson saved; accepted request, configured decision, execution, per-effect result, collection and target/business evidence; record references and UTC trace; partial/uncertain outcomes, human/ticket fulfillment and supported recovery |
| Author review | October 20, 2026; first-use explanations, independent Devi example, supplied partial delivery and stale view, actor/account distinctions, three diagrams, two tables, six worked cases, payroll-design transfer and mentor narration checked |
| Documentation check | October 20, 2026; current request submission/status/tracking, provisioning/manual/account-activity evidence, aggregation scope/indexing, service-desk completion mapping and supporting idempotency concepts mapped in author records |
| Diagram sources | [Request to verification](assets/ARC-008_request_to_verification.txt), [Partial target outcome](assets/ARC-008_partial_target_outcome.txt) and [Change versus collection](assets/ARC-008_change_and_collection.txt); synchronized with inline blocks, maximum line widths 38, 43 and 41 characters |
| Tenant execution | Not performed; employee 38008, StockRoom, stock-38008, svc-stock-isc, stock.read and stock.export, AP-38/AR-38/ACT-38, UTC timeline and all case outcomes are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 3; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve ARC-008 for feedback and learner validation; SRC-001 was opened following the user's instruction to continue |

The supplied timeline isn't a latency promise or private queue diagram. Request, review, activity, collection and target evidence have different scope and times. Partial delivery is not no change, collection is not a grant, repaired authority is not retried work, and a missing result or timeout is not proof of no effect. All eight Module 3 lessons are authored; learner validation and formal approval remain pending.

### SRC-001

| Field | SRC-001 |
|---|---|
| File | [SRC-001_The_Purpose_of_a_Source_and_Its_Population.md](lessons/SRC-001_The_Purpose_of_a_Source_and_Its_Population.md) |
| Revision | 1.0 |
| Course placement | Module 4.1 |
| Content status | Complete lesson saved; external system/environment versus source/connector/records, intended/readable/selected/collected population, account versus person counts, missing versus uncorrelated records, read/write boundaries, source-purpose agreement and safe scope-change reasoning |
| Author review | October 20, 2026; first-use explanations, independent Devi accounts, supplied 120/110/70/40 population trace and corrected collection, two diagrams, two tables, six worked cases, payroll-export transfer and mentor narration checked |
| Documentation check | October 20, 2026; official source definition/configuration/UI/owner, connector-specific filtering, schemas, identity-profile responsibilities and supporting account/aggregation/provisioning distinctions mapped in author records |
| Diagram sources | [Production versus sandbox](assets/SRC-001_production_and_sandbox.txt) and [Intended versus collected population](assets/SRC-001_intended_and_collected_population.txt); synchronized with inline blocks, maximum line widths 40 and 46 characters |
| Tenant execution | Not performed; employee 41001, DispatchHub, depot-41001, depot-admin-41001, svc-dispatch-isc, S-41P/S-41T, region/classification filters and all counts/outcomes are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under new Module 4; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve SRC-001 for feedback and learner validation; SRC-002 was opened following the user's instruction to continue |

Population is a design set, not a newly required ISC object. Read success is not full coverage; matched totals need membership/context checks. Service accounts deliberately outside this source still need accountable treatment. Correcting read scope does not create accounts, supply missing correlation values, authorize writes or establish deletion semantics.

### SRC-002

| Field | SRC-002 |
|---|---|
| File | [SRC-002_Authoritative_and_Non_Authoritative_Sources.md](lessons/SRC-002_Authoritative_and_Non_Authoritative_Sources.md) |
| Revision | 1.0 |
| Course placement | Module 4.2 |
| Content status | Complete lesson saved; authoritative/profile-backed identity establishment, non-authoritative accounts and shadow placeholders, overlapping account associations and profile priority, cross-source attribute mappings, required values, authentication, provisioning and removal boundaries |
| Author review | October 20, 2026; first-use explanations, independent Devi transition, priority 10/20 before-and-after trace, two diagrams, two tables, seven worked cases, acquisition-design transfer and mentor narration checked |
| Documentation check | October 20, 2026; official identity-profile selection/default ordering/mappings/exceptions, correlation, identity processing, PTA, authoritative-account removal and supporting source/provisioning documentation mapped in author records |
| Diagram sources | [Identity origin and account association](assets/SRC-002_identity_origin_and_account_association.txt) and [Profile attribute inputs](assets/SRC-002_profile_attribute_inputs.txt); synchronized with inline blocks, maximum line widths 43 and 45 characters |
| Tenant execution | Not performed; employee 42002, emp-42002, ctr-42002, corp-42002, expense-42002, I-42, profile order, account associations, values and all outcomes are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 4; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve SRC-002 for feedback and learner validation; SRC-003 was opened following the user's instruction to continue |

Profile priority selects among authoritative accounts already associated with one identity; it doesn't merge identities or define automatic per-attribute fallback. Mapping inputs, authentication paths and external write authority remain separate. Status changes, outages and account removal aren't interchangeable conditions; profile deletion is not a troubleshooting shortcut.

### SRC-003

| Field | SRC-003 |
|---|---|
| File | [SRC-003_Reading_a_Connector_Capability_Matrix.md](lessons/SRC-003_Reading_a_Connector_Capability_Matrix.md) |
| Revision | 1.0 |
| Course placement | Module 4.3 |
| Content status | Complete lesson saved; capability rows/columns/notes and connector family, read versus write operations, account versus membership/group changes, target API and runtime dependencies, configuration/input/authority distinctions, manual fulfillment and operation-level readiness evidence |
| Author review | October 20, 2026; first-use explanations, independent Devi onboarding/mover example, eight-row project matrix, two diagrams, seven worked cases, payroll-proposal transfer and mentor narration checked |
| Documentation check | October 20, 2026; official Active Directory feature columns and IQService prerequisites, Delimited File read/status representation, Web Services SaaS feature/operation configuration/test-connection documentation, source modes, provisioning and activity evidence mapped in author records |
| Diagram sources | [Operation-readiness dependencies](assets/SRC-003_operation_readiness_dependencies.txt) and [Change versus collection paths](assets/SRC-003_change_and_collection_paths.txt); synchronized with inline blocks, maximum line widths 41 and 39 characters |
| Tenant execution | Not performed; employee 43003, FulfillHub Production, fulfill-43003, svc-fulfill-isc, buyers, API limitations, configuration, 403 permission error and all results are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 4; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve SRC-003 for feedback and learner validation; SRC-004 was opened following the user's instruction to continue |

Connector support isn't project readiness. Readable data, account creation, membership addition/removal, disabling, deletion and password operations have separate effects and conditions. An absent target API, missing configuration, denied authority, invalid input and an untested operation are different findings. The dependency diagram is a human review, not a private backend execution sequence.

### SRC-004

| Field | SRC-004 |
|---|---|
| File | [SRC-004_Account_Schemas_Identifiers_and_Display_Attributes.md](lessons/SRC-004_Account_Schemas_Identifiers_and_Display_Attributes.md) |
| Revision | 1.0 |
| Course placement | Module 4.4 |
| Content status | Complete lesson saved; schema definitions versus account values and external data, Account ID/Name and schema property names, two-account/person distinction, read/mapping/schema relationships, missing fields/keys, discovery, UI/audit evidence and post-aggregation change risks |
| Author review | October 21, 2026; first-use meanings, independent Devi billing example, two tables, selected schema-property JSON, two diagrams, seven worked cases, payroll-feed transfer and mentor narration checked |
| Documentation check | October 21, 2026; official account-schema designations/discovery/audit/change warnings, Delimited File schema behavior, source-schema model properties, correlation and identity-profile mapping responsibilities checked and mapped in author records |
| Diagram sources | [Record to account representation](assets/SRC-004_record_to_account_representation.txt) and [Account keys and person matching](assets/SRC-004_account_keys_and_person_matching.txt); synchronized with inline blocks, maximum line widths 37 and 38 characters |
| Tenant execution | Not performed; employee 44004, InvoiceTrack Production, inv-acct-44004, inv-admin-acct-44004, inv-44004, inv-admin-44004, I-44, field contracts, mapping defect/correction and all outcomes are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 4; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve SRC-004 for feedback and learner validation; SRC-005 was opened following the user's instruction to continue |

Account identification and person correlation answer different questions. Designated Account Name isn't an unrestricted cosmetic label; post-aggregation designation changes carry documented duplicate/reference risks. A schema definition doesn't supply an absent input, expand a credential's read authority, update an identity mapping or change the target. No universal duplicate-winner, missing-key handling, rename behavior or automatic schema-reprocessing order is invented.

### SRC-005

| Field | SRC-005 |
|---|---|
| File | [SRC-005_Attribute_Types_Multiple_Values_and_Data_Formats.md](lessons/SRC-005_Attribute_Types_Multiple_Values_and_Data_Formats.md) |
| Revision | 1.0 |
| Course placement | Module 4.5 |
| Content status | Complete lesson saved; text/integer/Boolean/date representations, type versus cardinality and entitlement flags, JSON arrays/scalars and CSV parsing, leading zeros, missing/null/empty states, date meaning/offsets/units, conversion failure and downstream evidence |
| Author review | October 21, 2026; first-use meanings, independent Devi RouteBoard example, selected JSON response, four-field CSV export, two diagrams, two tables, seven worked cases, HR-feed transfer and mentor narration checked |
| Documentation check | October 21, 2026; official attribute-definition/type models, account-schema constraints, Web Services SaaS response mapping, dateFormat input/output conventions and JSON/CSV/timestamp primary specifications checked; supporting identity/provisioning boundaries retain same-day checks |
| Diagram sources | [List preservation versus joining](assets/SRC-005_list_preservation_and_joining.txt) and [Value/shape evidence trace](assets/SRC-005_value_and_shape_evidence_trace.txt); synchronized with inline blocks, maximum line widths 35 and 40 characters |
| Tenant execution | Not performed; employee 45005, route-45005, RouteBoard, costCentre 007, route.read/route.dispatch, project-added conversion defects/corrections, dates and all results are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 4; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve SRC-005 for feedback and learner validation; SRC-006 was opened following the user's instruction to continue |

A field's meaning, type, cardinality and transport format are separate. False/zero aren't absence; null/omission/empty collections don't imply universal clearing or deprovisioning. Joined membership text isn't two list elements. The bad conversion is explicitly project-added, not a default ISC parser claim. Date formatting doesn't select a business termination boundary or prove delivered access changes.

### SRC-006

| Field | SRC-006 |
|---|---|
| File | [SRC-006_Entitlement_Membership_Attributes_and_Entitlement_Schemas.md](lessons/SRC-006_Entitlement_Membership_Attributes_and_Entitlement_Schemas.md) |
| Revision | 1.0 |
| Course placement | Module 4.6 |
| Content status | Complete lesson saved; account membership references versus entitlement objects, source/type/ID agreement, ID/Name designations, collection responsibilities, multiple types and indirect relationships, UI/metadata evidence and safe schema changes |
| Author review | October 21, 2026; first-use meanings, independent Devi SpendLedger example, two selected JSON responses, two diagrams, two tables, seven worked cases and application-design transfer checked |
| Documentation check | October 21, 2026; account-schema linking conditions, entitlement type/schema management, entitlement aggregation, entitlement viewing/metadata/permissions/deletion boundaries and source schema/attribute models freshly checked |
| Diagram sources | [Account membership to entitlement](assets/SRC-006_account_membership_to_entitlement.txt) and [Two read responsibilities](assets/SRC-006_two_read_responsibilities.txt); synchronized with inline blocks, maximum line widths 33 and 44 characters |
| Tenant execution | Not performed; employee 46006, SpendLedger Production, spend-46006, G-206, expense.approvers, labels, mapping defect/correction, collection results and all transfer data are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 4; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve SRC-006 for feedback and learner validation; SRC-007 was opened following the user's instruction to continue |

A membership value identifies an access object within the supported source/type relationship; its friendly or technical name isn't automatically its selected ID. Account correlation, entitlement inventory, membership linking and target access changes are different responsibilities. Entitlement ID/Name redesignation carries duplicate risks; type deletion is not revocation. Multiple entitlement types, hierarchies and permissions require connector support rather than invented schemas.

### SRC-007

| Field | SRC-007 |
|---|---|
| File | [SRC-007_Filters_and_Collection_Scope.md](lessons/SRC-007_Filters_and_Collection_Scope.md) |
| Revision | 1.0 |
| Course placement | Module 4.7 |
| Content status | Complete lesson saved; intended population versus read scope, inclusion/exclusion logic, native/resource-object/view filters, actor visibility, account/object/membership scopes, extraction/paging completeness, full/delta/single-account boundaries and deletion-safeguard consequences |
| Author review | October 21, 2026; first-use meanings, independent Devi ServiceDeskFlow example, 120/110/500 population arithmetic, two diagrams, two tables, eight worked cases and payroll-export transfer checked |
| Documentation check | October 21, 2026; loading account data, connector SDK filtering, Okta SaaS inclusion filters, Entra ID account/group/membership interactions, entitlement aggregation, response mapping and API collection parameters freshly checked |
| Diagram sources | [Active-only scope comparison](assets/SRC-007_active_only_scope_comparison.txt) and [Collection evidence boundaries](assets/SRC-007_collection_evidence_boundaries.txt); synchronized with inline blocks, maximum line widths 31 and 38 characters |
| Tenant execution | Not performed; employee 47007, ServiceDeskFlow Production, desk-47007, sample accounts, 500 overall/120 intended/110 active/10 disabled counts, defect/correction and all results are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 4; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve SRC-007 for feedback and learner validation; SRC-008 was opened following the user's instruction to continue |

A successful read can faithfully implement the wrong business population. Inclusion/exclusion direction, native versus post-retrieval filtering, actor permissions and viewing queries must be distinguished. Account coverage doesn't establish complete membership coverage. Full reads remain scoped; changes-only and partial results aren't replacement inventories. Missing records and deletion settings require operation-specific review, not automatic assumptions of target removal.

### SRC-008

| Field | SRC-008 |
|---|---|
| File | [SRC-008_Data_Ownership_Agreements.md](lessons/SRC-008_Data_Ownership_Agreements.md) |
| Revision | 1.0 |
| Course placement | Module 4.8 |
| Content status | Complete lesson saved; field authority and producer/integration/consumer responsibility, stable identifiers and field contracts, requiredness/validation, missing/write semantics, effective/recorded/delivery times, stale/repeated/out-of-order corrections, acceptance evidence and safe changes |
| Author review | October 21, 2026; first-use meanings, independent Devi PeopleLedger/GrantDesk example, revision 17/18 evidence, UTC date boundaries, selected JSON, two diagrams, two tables, eight worked cases and laboratory-project transfer checked |
| Documentation check | October 21, 2026; source ownership/account views, identity-profile mappings/required values/preview, account-schema change warnings, aggregation/processing, lifecycle-state boundaries, dateFormat and attribute synchronization eligibility/null/direction freshly checked |
| Diagram sources | [Approved and exported revisions](assets/SRC-008_approved_and_exported_revisions.txt) and [Correction responsibility handoffs](assets/SRC-008_correction_responsibility_handoffs.txt); synchronized with inline blocks, maximum line widths 30 and 37 characters |
| Tenant execution | Not performed; worker 48008, PeopleLedger Production PL-W-48008, GrantDesk grant-48008, managerNumber 48001, revisions/dates/times, stale export defect/correction and target update results are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 4; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve SRC-008 for feedback and learner validation; AGG-001 was opened following the user's instruction to continue |

Data agreements are an illustrative engineering/operating practice, not a universal ISC contract-validation engine. Business approval, producer delivery, account collection, identity calculation and target update require separate evidence. Null and target-side overrides can have documented synchronization effects. Revisions and timestamps don't create automatic ordering protection; exact expiry boundaries are agreed business meanings, not default schedules or delivery guarantees.

### AGG-001

| Field | AGG-001 |
|---|---|
| File | [AGG-001_Following_an_Account_Record_into_ISC.md](lessons/AGG-001_Following_an_Account_Record_into_ISC.md) |
| Revision | 1.0 |
| Course placement | Module 5.1 |
| Content status | Complete lesson saved; trigger/read scope and actor, delivered response and extraction, field mappings/schema, existing-account representation, ownership correlation, account/identity value paths, processing/provisioning boundaries and operational evidence |
| Author review | October 21, 2026; first-use meanings, independent Devi ReviewBoard example, nested/raw versus represented JSON, HYD/CHN source distinctions, two diagrams, two tables, eight worked cases and HR-record transfer checked |
| Documentation check | October 21, 2026; account loading/modes/history/Search freshness, Web Services SaaS response mapping, schema designations, correlation and uncorrelated/shadow representation, profile mappings, identity processing and provisioning boundaries freshly checked |
| Diagram sources | [Account read to representation](assets/AGG-001_account_read_to_representation.txt) and [Account/identity value paths](assets/AGG-001_account_and_identity_value_paths.txt); synchronized with inline blocks, maximum line widths 33 and 44 characters |
| Tenant execution | Not performed; employee 51001, ReviewBoard Production, rb-51001/devi51001, I-51 teaching label, BLR/HYD/CHN values, G-51 and supplied read/association/outcomes are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under new Module 5; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve AGG-001 for feedback and learner validation; AGG-002 was opened following the user's instruction to continue |

The read represents an existing external account; account identification, ownership association, identity value calculation and external changes are distinct. Account office HYD and HR-mapped identity office CHN can both be correct. Trigger acceptance, record collection and target change need separate evidence. Diagrams show logical dependencies/value paths, not private transactions, fixed runtime hosts or universal failure/processing order.

### AGG-002

| Field | AGG-002 |
|---|---|
| File | [AGG-002_Account_and_Entitlement_Aggregation.md](lessons/AGG-002_Account_and_Entitlement_Aggregation.md) |
| Revision | 1.0 |
| Course placement | Module 5.2 |
| Content status | Complete lesson saved; account values versus access-object collection, membership/object linking, count reconciliation, unused objects, separate type/scope/authority, observation times, file-import boundaries, metadata and operational evidence |
| Author review | October 21, 2026; independent Devi InvoiceDesk example, first-use meanings, two JSON blocks, two diagrams, two tables, count arithmetic, eight worked cases and project-file transfer checked |
| Documentation check | October 21, 2026; entitlement/account aggregation, schema/type linking, current Entitlements views and manual-value protection, account correlation, provisioning and Web Services SaaS multi-call/operation boundaries freshly checked |
| Diagram sources | [Two collection responsibilities](assets/AGG-002_two_collection_responsibilities.txt) and [Separate observation times](assets/AGG-002_separate_observation_times.txt); synchronized with inline blocks, maximum line widths 48 and 37 characters |
| Tenant execution | Not performed; employee 52002, InvoiceDesk Production, inv-52002/52003/52004, groups G-520/G-521/G-599, supplied read/association/outcomes and UTC timing variation are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 5; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve AGG-002 for feedback and learner validation; AGG-003 was opened following the user's instruction to continue |

The account read supplies held access values; the object read supplies inventory/details, including unused groups. Source/type/identifier agreement links the information without granting access. Three accounts, four membership occurrences, two distinct held group values and three group objects are consistent. Separate observations don't form one frozen snapshot. Diagrams aren't private execution or automatic refresh guarantees.

### AGG-003

| Field | AGG-003 |
|---|---|
| File | [AGG-003_Full_Aggregation_Optimization_and_Reprocessing.md](lessons/AGG-003_Full_Aggregation_Optimization_and_Reprocessing.md) |
| Revision | 1.0 |
| Course placement | Module 5.3 |
| Content status | Complete lesson saved; full configured-population coverage versus unchanged-record processing, optimized/unoptimized branches, corrected correlation with unchanged inputs, run-local request option, delta/single-account/identity-processing boundaries, evidence and safe reruns |
| Author review | October 21, 2026; independent Devi AssetDesk example, first-use meanings, initially uncorrelated/no-manual-override condition, selected JSON, four-account trace, two diagrams, two tables, eight worked cases and identity-profile transfer checked |
| Documentation check | October 21, 2026; account loading/modes/request lifetime/history/Search, correlation and manual-association handling, manager correlation, V2025 account-aggregation request, identity processing/profile mappings and source/schema/provisioning boundaries freshly checked |
| Diagram sources | [Unchanged-record decision](assets/AGG-003_unchanged_record_decision.txt) and [Same population, different processing](assets/AGG-003_same_population_different_processing.txt); synchronized with inline blocks, maximum line widths 43 and 41 characters |
| Tenant execution | Not performed; employee 53003, AssetDesk Production, asset-53003/53004/53005/53006, example.invalid emails, comparison change and completed association outcome are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 5; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve AGG-003 for feedback and learner validation; AGG-004 was opened following the user's instruction to continue |

A full configured-population read can remain optimized. Run A reads four records and processes two while skipping two unchanged records; subsequent unoptimized Run B reprocesses all four without further input changes. Re-evaluation doesn't repair mismatched values or override manual ownership. The run-local disableOptimization option isn't a permanent source setting, a delta reset, a universal identity refresh or a target write.

### AGG-004

| Field | AGG-004 |
|---|---|
| File | [AGG-004_Delta_Aggregation_and_Connector_Limitations.md](lessons/AGG-004_Delta_Aggregation_and_Connector_Limitations.md) |
| Revision | 1.0 |
| Course placement | Module 5.4 |
| Content status | Complete lesson saved; changes-only meaning, baseline/reference/capture dependencies, JDBC account-key/action trace, deletion versus omission/status, connector-specific coverage/permissions, retention and recovery boundaries, membership capture, related processing and operational evidence |
| Author review | October 21, 2026; independent Devi WorkQueue example, first-use meanings, selected JSON, two diagrams, three tables, three-change/current-population arithmetic, eight worked cases and database-design transfer checked |
| Documentation check | October 21, 2026; ISC loading/modes/history/Search/OU limitation, JDBC SaaS delta tables, Active Directory DirSync/baseline/permissions, Okta SaaS account/profile/log coverage and retention, correlation, identity processing and source/schema/provisioning boundaries freshly checked |
| Diagram sources | [Change information to account results](assets/AGG-004_change_information_to_account_results.txt) and [Baseline, changes and result](assets/AGG-004_baseline_changes_and_result.txt); synchronized with inline blocks, maximum line widths 38 and 40 characters |
| Tenant execution | Not performed; employee 54004, WorkQueue Production, WORKQUEUE_ACCOUNTS/WORKQUEUE_DELTA, wq-54004/54005/54006/54007, capture and supported deletion/collection results are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 5; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve AGG-004 for feedback and learner validation; AGG-005 was opened following the user's instruction to continue |

A valid baseline and supported change information establish what can be collected; an unchanged omitted account isn't deleted. The selected Update/Insert/Delete trace changes the inventory contents while keeping three account representations. JDBC capture/cleanup, Active Directory DirSync/permissions/OU-move boundary and Okta profile/log/90-day retention are qualified by connector. No universal checkpoint name, atomic commit, replay guarantee, delta reset or automatic downstream completion is claimed.

### AGG-005

| Field | AGG-005 |
|---|---|
| File | [AGG-005_Single_Account_Aggregation.md](lessons/AGG-005_Single_Account_Aggregation.md) |
| Revision | 1.0 |
| Course placement | Module 5.5 |
| Content status | Complete lesson saved; selected-account purpose, ISC/source/native identifiers, supported lookup and representation, account versus identity values, UI action limits, read versus unlock, not-found/deletion boundaries, operation support, API acceptance and evidence |
| Author review | October 21, 2026; independent Devi CaseHub example, first-use meanings, selected JSON, two diagrams, two tables, eight worked cases and project-button transfer checked |
| Documentation check | October 21, 2026; ISC single-account UI limits, unlock/remove actions, Web Services SaaS Get Object and operation distinctions, account schema, identity profile/processing, source correlation and current Accounts SDK read/reload contract freshly checked |
| Diagram sources | [Selected account to representation](assets/AGG-005_selected_account_to_representation.txt) and [Account, identity and target boundaries](assets/AGG-005_account_identity_and_target_boundaries.txt); synchronized with inline blocks, maximum line widths 31 and 34 characters |
| Tenant execution | Not performed; employee 55005, CaseHub Production, ch-55005, lock/office mappings, existing correct association, profile mapping and read/unlock outcomes are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 5; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve AGG-005 for feedback and learner validation; AGG-006 was opened following the user's instruction to continue |

The documented UI Aggregate Account action updates account data without identity-attribute synchronization or provisioning. In the supplied main trace, account office changes BLR to HYD while identity office remains BLR even with a valid account-to-identity mapping, and the external account stays locked. A not-found lookup leaves the ISC record unchanged; this boundary does not contradict supported explicit delta deletions. API/version contracts and configured workflows require their own effect checks.

### AGG-006

| Field | AGG-006 |
|---|---|
| File | [AGG-006_Schedules_Scope_Dependencies_and_Data_Freshness.md](lessons/AGG-006_Schedules_Scope_Dependencies_and_Data_Freshness.md) |
| Revision | 1.0 |
| Course placement | Module 5.6 |
| Content status | Complete lesson saved; scheduled submission versus execution/completion, publication and observation times, daily windows, source-specific time zones, population/mode scope, independent account/object reads, identity/provisioning dependencies, freshness commitments and evidence |
| Author review | October 21, 2026; independent Devi PeopleRoster example, first-use meanings, two diagrams, two tables, 86-minute latency and four age calculations, daily-window/time-zone arithmetic, eight cases and contractor-removal design transfer checked |
| Documentation check | October 21, 2026; account schedules/queue/history/modes/Search, time-zone settings, entitlement schedules and file boundary, event/manual/scheduled identity processing, profile mapping and VA-to-SaaS migration time basis freshly checked |
| Diagram sources | [Publication and two reads](assets/AGG-006_publication_and_two_reads.txt) and [Conditional data-to-target dependencies](assets/AGG-006_conditional_data_to_target_dependencies.txt); synchronized with inline blocks, maximum line widths 30 and 37 characters |
| Tenant execution | Not performed; employee 56006, PeopleRoster Production, pr-56006, workerKey/employeeNumber, WH/DIST departments, published batches, schedules and supplied read/identity/target outcomes are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 5; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve AGG-006 for feedback and learner validation; AGG-007 was opened following the user's instruction to continue |

A recent successful job is not proof of current business information. In the supplied trace, the first read precedes HR publication; the second read represents DIST and the identity value is independently confirmed 86 minutes after the HR change. Daily recurrences stop at midnight, VA cluster fixed offsets differ from tenant-zone SaaS scheduling, and a fixed calendar gap does not enforce a successful dependency. Source reads, identity evaluation, target delivery and Search are separate evidence.

### AGG-007

| Field | AGG-007 |
|---|---|
| File | [AGG-007_Missing_Records_Account_Deletion_and_Safeguards.md](lessons/AGG-007_Missing_Records_Account_Deletion_and_Safeguards.md) |
| Revision | 1.0 |
| Course placement | Module 5.7 |
| Content status | Complete lesson saved; missing/excluded/disabled/deleted distinctions, source account-deletion settings, percentage and small-population guards, full/delta/single-account boundaries, authoritative-profile reassignment, nightly deletion/blockers/hidden identities, offboarding and safe recovery evidence |
| Author review | October 21, 2026; independent Devi QueueDesk example, first-use meanings, two diagrams, two tables, population/percentage/rounding calculations, all documented identity-deletion blockers, eight cases and active-workers-only HR project transfer checked |
| Documentation check | October 21, 2026; account-loading deletion settings/threshold caution/authoritative outcomes/hidden behavior, account Remove Account action, identity-profile priority/mappings and JDBC SaaS explicit delta Delete freshly checked |
| Diagram sources | [Missing population and deletion guard](assets/AGG-007_missing_population_and_deletion_guard.txt) and [Authoritative account and identity outcomes](assets/AGG-007_authoritative_account_and_identity_outcomes.txt); synchronized with inline blocks, maximum line widths 37 and 45 characters |
| Tenant execution | Not performed; employee 57007, QueueDesk Production, qd-57007/wr-57007, WorkerRegistry, 1,000/850/150 counts, disabled status, 10% guard and supplied canceled/corrected results are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 5; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve AGG-007 for feedback and learner validation; AGG-008 was opened following the user's instruction to continue |

An omitted record is not proof of external deletion. The main wrong-filter trace supplies an above-limit canceled run and a separately retained Devi representation without claiming universal rollback. Whole-account rounding follows the documented ten-account caution, not a guessed threshold comparison. Authoritative-account removal can reassign a profile or lead to nightly deletion/hidden identity handling; none proves external access removal. No deletion, protection or source setting is changed.

### AGG-008

| Field | AGG-008 |
|---|---|
| File | [AGG-008_Reading_Aggregation_Outcomes.md](lessons/AGG-008_Reading_Aggregation_Outcomes.md) |
| Revision | 1.0 |
| Course placement | Module 5.8 |
| Content status | Complete lesson saved; task identity/status/details, scanned/unchanged/processed/inventory count meanings, partial paged reads and actual record evidence, optimization, warning/error/termination boundaries, identifier-set coverage, entitlement counts and safe cause-based recovery |
| Author review | October 21, 2026; independent Devi WarehouseFlow example, first-use meanings, two diagrams, two tables, 30+30/50+10/60+40 arithmetic, two-run evidence, eight cases and dashboard-health design transfer checked |
| Documentation check | October 21, 2026; account activity/history/termination/modes/retries/Search/deletion-warning guidance, Web Services SaaS aggregation/paging, entitlement discovered-versus-total counts, correlation, profile mappings and identity/provisioning boundaries freshly checked |
| Diagram sources | [Partial read and record evidence](assets/AGG-008_partial_read_and_record_evidence.txt) and [Engineering outcome checks](assets/AGG-008_engineering_outcome_checks.txt); synchronized with inline blocks, maximum line widths 35 and 35 characters |
| Tenant execution | Not performed; employee 58008, WarehouseFlow Production, wf-58008/wf-58009, EAST/CENTRAL, Run A/B times, page/counter/input/inventory evidence and represented results are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 5; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve AGG-008 for feedback and learner validation; AGG-009 was opened following the user's instruction to continue |

Run A's supplied page-3 error leaves 40 expected accounts unread despite a 100-record stored inventory; one earlier represented update is independently verified without asserting universal partial-write or rollback behavior. Input comparisons are not invented UI/API counters. Run B verifies the expected 100 keys and Devi's account value, not every identity or target effect. Task status, required scope, value freshness and external completion require their own evidence.

### AGG-009

| Field | AGG-009 |
|---|---|
| File | [AGG-009_Investigating_a_Missing_or_Stale_Account.md](lessons/AGG-009_Investigating_a_Missing_or_Stale_Account.md) |
| Revision | 1.0 |
| Course placement | Module 5.9 |
| Content status | Complete lesson saved; precise symptom/hypothesis, production source/key and represented-owner distinction, actor/scope/mode/page/file/freshness evidence, raw response/root/extraction/schema tracing, correlation inputs, safe correction/re-evaluation, account/identity/Search/status boundaries and incident handoff |
| Author review | October 21, 2026; independent Devi PurchaseDesk example, first-use meanings, selected JSON, two diagrams, two tables, before/after extraction and unique-match logic, eight cases and cost-centre type-preservation transfer checked |
| Documentation check | October 21, 2026; source Accounts/Uncorrelated/shadow views, schemas and Account ID change caution, Web Services SaaS response/root/mapping/Get Object, correlation/re-evaluation, account loading/history/single-account limits and identity/provisioning boundaries freshly checked |
| Diagram sources | [Response to unresolved ownership](assets/AGG-009_response_to_unresolved_ownership.txt) and [Corrected input and verified association](assets/AGG-009_corrected_input_and_verified_association.txt); synchronized with inline blocks, maximum line widths 39 and 38 characters |
| Tenant execution | Not performed; employee 59009, PurchaseDesk Production, pd-59009/devi59009, person.number/employeeRef, unique eligible identity match, no manual override/concurrent edits and corrected association are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 5; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve AGG-009 for feedback and learner validation; IDN-001 was authored following the user's instruction to continue |

The missing-under-person symptom is narrowed by finding the account uncorrelated in its source. Raw person.number text 59009 reaches the connector, but employeeRef incorrectly extracts login devi59009; the intended single comparison has no match. The approved extraction preserves the account key/login/identity and the supplied corrected association is independently checked. Module 5 now has all nine lessons authored; learner validation and formal approval remain pending.

### IDN-001

| Field | IDN-001 |
|---|---|
| File | [IDN-001_Authoritative_Sources_Identity_Profiles_and_Identity_Creation.md](lessons/IDN-001_Authoritative_Sources_Identity_Profiles_and_Identity_Creation.md) |
| Revision | 1.0 |
| Course placement | Module 6.1 |
| Content status | Complete lesson saved; worker account versus person identity, authoritative source/profile responsibility, explicit mapped inputs and distinct identifiers, required values, identity establishment, incomplete/duplicate outcomes, application correlation, competing profiles and separate provisioning/sign-in evidence |
| Author review | October 21, 2026; independent Devi onboarding context, first-use meanings, selected JSON, two diagrams, two tables, seven worked cases and contractor-feed transfer checked |
| Documentation check | October 21, 2026; identity profile setup/mappings/required values/priority/exceptions, account schema/loading/correlation, source account/shadow views, identity processing and provisioning boundaries freshly checked; official references maintained separately |
| Diagram sources | [Worker account to identity](assets/IDN-001_worker_account_to_identity.txt) and [Existing identity and application account](assets/IDN-001_existing_identity_and_application_account.txt); synchronized with inline blocks, maximum line widths 40 and 41 characters |
| Tenant execution | Not performed; employee 61001, PeopleLedger Production, hr-61001, worker61001, Employees profile, LOG, approved initial email, dd-61001/employeeRef, unique eligible comparison and supplied outcomes are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under new Module 6; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve IDN-001 for feedback and learner validation; IDN-002 was authored following the user's instruction to continue |

The new-person path explicitly assumes no existing identity, one eligible profile and valid unique required values. The application variation starts with an existing independently created account; correlation is ownership association, not account creation. Multiple-authoritative-source priority assumes correctly associated accounts and does not promise automatic identity merging. Attribute tracing reference aid development remains planned within Module 6, alongside detailed mapping lessons.

### IDN-002

| Field | IDN-002 |
|---|---|
| File | [IDN-002_What_an_Identity_Profile_Controls.md](lessons/IDN-002_What_an_Identity_Profile_Controls.md) |
| Revision | 1.0 |
| Course placement | Module 6.2 |
| Content status | Complete lesson saved; shared governing profile and population, multi-source mappings, global attribute definitions, manager-correlation dependency, tenant sign-in/security/invitations, lifecycle mapping/state/access requirements, account/identity-state distinctions, provisioning evidence and safe change scope |
| Author review | October 21, 2026; independent Devi benefits-coordinator context, first-use meanings, two diagrams, two tables, seven worked cases and contractor email-mapping review checked |
| Documentation check | October 21, 2026; identity profile setup/mappings/global attributes/priority/deletion, lifecycle prerequisites/actions, identity processing/preview/application, authentication/invitations, attribute sync, access objects and manager-correlation boundaries freshly checked |
| Diagram sources | [Lifecycle requirement to target](assets/IDN-002_lifecycle_requirement_to_target.txt) and [Profile responsibility map](assets/IDN-002_profile_responsibility_map.txt); synchronized with inline blocks, maximum line widths 43 and 39 characters |
| Tenant execution | Not performed; employee 62002, PeopleCore Production hr-62002, Corporate Directory cd-62002, employee62002, HR/FIN inputs and supplied corrected value, BenefitsDesk bd-62002, active state, Benefits Self-Service and benefits-selfservice outcomes are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 6; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve IDN-002 for feedback and learner validation; IDN-003 and its tracing aid were authored following the user's instruction to continue |

The Department repair is a shared mapping change, not a directory write, authentication change or proof of entitlement delivery. A separately qualified lifecycle example traces state input, enabled configuration, access bundle, supported operation and target verification. Security and deletion cases explain consequences without changing production settings or deleting anything.

### IDN-003

| Field | IDN-003 |
|---|---|
| File | [IDN-003_Mapping_Account_Information_into_Identity_Attributes.md](lessons/IDN-003_Mapping_Account_Information_into_Identity_Attributes.md) |
| Revision | 1.0 |
| Course placement | Module 6.3 |
| Content status | Complete lesson saved; schema versus identity mapping, direct inputs and lowercase calculation, selected-account/field/type/cardinality dependencies, explicit transform input, scoped accountAttribute defaults/filter/sort/null behavior, missing values, processing/evidence and consumers |
| Author review | October 21, 2026; independent payroll-analyst Devi context, first-use meanings, JSON, two diagrams, two tables, eight worked cases, returning-contractor transfer and eight-step tracing aid checked |
| Documentation check | October 21, 2026; identity profile direct/transform/rule mappings and required inputs, schemas/correlation, Account Attribute and Lower/Upper operations, profile preview/processing and synchronization boundaries freshly checked |
| Diagram sources | [Collected mail to identity email](assets/IDN-003_collected_mail_to_identity_email.txt) and [Identity value and consumers](assets/IDN-003_identity_value_and_consumers.txt); synchronized with inline blocks, maximum line widths 47 and 48 characters |
| Reference aid | [ISC attribute tracing guide](assets/ATTRIBUTE_TRACING_GUIDE.txt), revision 1.0, documentation verified October 21, 2026; complete eight-step sequence and main filled trace provided inline and in downloadable editable text |
| Tenant execution | Not performed; employee 63003, WorkerLedger Production hr-63003, Corporate Directory cd-63003/adm-63003, Employees, workerNumber/iscUserName/familyName/mail/officeCodes and supplied identity result are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 6; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve IDN-003 for feedback and learner validation; IDN-004 was authored following the user's instruction to continue |

Primary Work Email input Devi63003@Example.com is normalized to devi63003@example.com without a directory write. Account-attribute selection defaults are scoped to that supported transform, not all ISC behavior; list-to-single behavior is qualified to the documented mapping-transform path. The eight tracing questions support evidence gathering and are not a universal execution sequence or live change procedure.

### IDN-004

| Field | IDN-004 |
|---|---|
| File | [IDN-004_Choosing_the_Source_of_Each_Attribute.md](lessons/IDN-004_Choosing_the_Source_of_Each_Attribute.md) |
| Revision | 1.0 |
| Course placement | Module 6.4 |
| Content status | Complete lesson saved; field meaning/ownership versus population authority, coverage/account selection, effective/publication/collection times, required downstream-data dependency and controlled initial values, explicit fallback/error policy, directional synchronization and correction/acceptance evidence |
| Author review | October 21, 2026; independent Devi transfer context, first-use meanings, two two-column tables, two diagrams, eight worked cases and sponsor-approved contract-end transfer checked |
| Documentation check | October 21, 2026; identity profile multi-source mappings and required values, First Valid non-null order/default error behavior and static placeholder example, Account Attribute selection, aggregation/processing, attribute sync direction/cycle cautions, source owner and invitation triggers freshly checked |
| Diagram sources | [Approved department input](assets/IDN-004_approved_department_input.txt) and [Required email dependency](assets/IDN-004_required_email_dependency.txt); synchronized with inline blocks, maximum line widths 45 and 44 characters |
| Tenant execution | Not performed; employee 64004, PersonnelHub Production ph-64004, Corporate Directory cd-64004, ProjectFlow Production pf-64004, CostLedger Production fc-64004, approved ENG/old OPS/project PRJ-17, 0042, supplied mapping result and UTC evidence are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 6; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve IDN-004 for feedback and learner validation; IDN-005 was authored following the user's instruction to continue |

The approved employment Department comes from PersonnelHub despite later reads of other records; CostLedger and directory own different fields under the supplied agreement. The email cycle is explicitly a project dependency, not universal ISC architecture. Technical non-null placeholders are distinguished from usable addresses and safe consumer handling. Source-choice criteria are engineering decisions, not automatic ISC validation or a license to change business records.

### IDN-005

| Field | IDN-005 |
|---|---|
| File | [IDN-005_Multiple_Identity_Profiles_Populations_and_Priority.md](lessons/IDN-005_Multiple_Identity_Profiles_Populations_and_Priority.md) |
| Revision | 1.0 |
| Course placement | Module 6.5 |
| Content status | Complete lesson saved; account ownership before eligible-profile ranking, shared precedence and defaults, per-profile mappings versus field/account selection, contractor conversion continuity in both directions, deletion/reassignment limits, lifecycle/security/access and evidence boundaries |
| Author review | October 21, 2026; independent Devi conversion context, first-use meanings, two two-column tables, two diagrams, eight worked cases and acquisition-design transfer checked |
| Documentation check | October 21, 2026; single governing profile and authoritative-account priority, creation-order defaults, supported profile update/schema, cross-source/global mappings, correlation, Account Attribute selection, processing/preview/apply, lifecycle settings and authoritative-account deletion reassignment freshly checked |
| Diagram sources | [Eligibility and priority](assets/IDN-005_profile_eligibility_and_priority.txt) and [Contractor-to-employee transition](assets/IDN-005_contractor_to_employee_transition.txt); synchronized with inline blocks, maximum line widths 43 and 39 characters |
| Tenant execution | Not performed; employee 65005, person reference P65005, teaching identity label I-65005, PeopleCore Production h-65005, ContractRegister Production c-65005, Corporate Directory d-65005, profile priorities, mapped values and successful processing are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 6; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve IDN-005 for feedback and learner validation; IDN-006 was authored following the user's instruction to continue |

Employees 10 outranks Contractors 20 only when its authoritative account belongs to the same identity; Subsidiary Staff 5 is absent and ineligible for this example. The reversed creation-order case is independent of that main configuration. Priority neither merges duplicate identities nor selects every field or source account. No tied-priority rule, undocumented reassignment timing, universal inactive-account transfer or guaranteed access removal is asserted.

### IDN-006

| Field | IDN-006 |
|---|---|
| File | [IDN-006_Required_Attributes_Identity_Exceptions_and_Incomplete_Information.md](lessons/IDN-006_Required_Attributes_Identity_Exceptions_and_Incomplete_Information.md) |
| Revision | 1.0 |
| Course placement | Module 6.6 |
| Content status | Complete lesson saved; required configured mappings versus per-identity outputs, incomplete identities versus other errors, null/empty/omitted/literal/error distinctions, global username uniqueness and identity continuity, cause-based repair and current record/status/consumer evidence |
| Author review | October 21, 2026; independent Devi intake context, first-use meanings, JSON extract, two two-column tables, two diagrams, eight worked cases and contractor-intake transfer checked |
| Documentation check | October 21, 2026; required uid/email/lastname, global uniqueness, exception download and source correction, incomplete and error views/action restrictions, First Valid null/error handling, account lookup scope, correlation, aggregation versus processing and view synchronization freshly checked |
| Diagram sources | [Missing required value trace](assets/IDN-006_missing_required_value_trace.txt) and [Cause-based correction](assets/IDN-006_cause_based_correction.txt); synchronized with inline blocks, maximum line widths 39 and 43 characters |
| Tenant execution | Not performed; employee 66006, WorkforceBook Production wb-66006, Employees mappings, person66006, devi66006@example.com, familyName Rao/surname null, observed incomplete identity and successful correction are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 6; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve IDN-006 for feedback and learner validation; IDN-007 was authored following the user's instruction to continue |

The approved surname already exists on the collected account; the profile reads a retired null field. The repair changes the mapping, not correct HR data. Blank representations are distinguished without inventing universal connector/validation normalization. Current required-value and exception evidence does not certify sign-in configuration, manager relationships, mailbox fitness or external access delivery.

### IDN-007

| Field | IDN-007 |
|---|---|
| File | [IDN-007_Changing_Mappings_and_Understanding_Downstream_Effects.md](lessons/IDN-007_Changing_Mappings_and_Understanding_Downstream_Effects.md) |
| Revision | 1.0 |
| Course placement | Module 6.7 |
| Content status | Complete lesson saved; mapping/input/consumer dependencies, shared profile and reused transform scope, representation-sensitive role conditions, manager and lifecycle checks, preview versus applied processing, coordinated transition, attribute-sync multi-account/null behavior, separate target outcomes and configuration rollback versus compensating recovery |
| Author review | October 21, 2026; independent Devi department-representation change, first-use meanings, two two-column tables, two diagrams, eight worked cases and contractor end-date transfer checked |
| Documentation check | October 21, 2026; identity mappings/Preview/shared definitions, processing scope and target-verification limit, automatic role membership, attribute sync direct mapping/all correlated accounts/null behavior, manager correlation non-null mismatch, per-profile lifecycle and irreversible deletion cautions, Reference transform and provisioning tracking freshly checked |
| Diagram sources | [Department consumers](assets/IDN-007_department_consumers.txt) and [Restoring a mapping](assets/IDN-007_restoring_a_mapping.txt); synchronized with inline blocks, maximum line widths 44 and 41 characters |
| Tenant execution | Not performed; employee 67007, WorkforceHub Production wf-67007, Corporate Directory cd-67007, Employees Department Engineering to ENG, Engineering Worker role, denied-write result and separate successful-sync rollback variation are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 6; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve IDN-007 for feedback and learner validation; IDN-008 was authored following the user's instruction to continue |

The person's department meaning is unchanged while its representation changes. The unchanged old role comparison is a risk illustration, not the coordinated outcome: the approved code condition remains correct in the supplied partial rollout. The denied target write and the successful-sync rollback example are explicitly separate variations. A restored configuration is not a universal reversal of changed inputs or completed external effects.

### IDN-008

| Field | IDN-008 |
|---|---|
| File | [IDN-008_Tracing_an_Incorrect_Identity_Value_to_Its_Origin.md](lessons/IDN-008_Tracing_an_Incorrect_Identity_Value_to_Its_Origin.md) |
| Revision | 1.0 |
| Course placement | Module 6.8 |
| Content status | Complete lesson saved; exact identity/profile/output, configured versus explicit input, associated account selection, collected data/type/time, nested calculation and competing hypotheses, historical evidence limits, preview versus applied processing, safe correction and separate consumer outcomes |
| Author review | October 21, 2026; independent Devi cost-centre context, first-use meanings, JSON definition, two two-column tables, two diagrams, eight worked cases, inline eight-question trace and work-email transfer checked |
| Documentation check | October 21, 2026; identity mapping/profile selection, Trim explicit-input behavior, identity/source-scoped Account Attribute lookup and defaults, Reference transform, correlation, account collection evidence, identity processing/view synchronization and configured attribute-sync boundary freshly checked |
| Diagram sources | [Explicit input trace](assets/IDN-008_explicit_input_trace.txt) and [Correction and verification](assets/IDN-008_correction_and_verification.txt); synchronized with inline blocks, maximum line widths 45 and 41 characters |
| Tenant execution | Not performed; employee 68008, teaching identity label I-68008, StaffLedger Production sl-68008 costCenter text 0042 and Corporate Directory cd-68008 text with surrounding spaces 0900, Employees mapping, UTC evidence and successful correction are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 6; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve IDN-008 for feedback and learner validation; COR-001 was authored following the user's instruction to continue |

The saved Trim definition explicitly reads the directory despite HR being selected in the interface. Current inputs reproduce 0900; historical execution is not inferred from today's Preview alone. The approved correction changes the actual input and preserves leading-zero text. Existing tracing guide revision 1.0 is unchanged; its eight evidence dimensions are applied inline. All eight Module 6 lessons are now authored, with learner validation and formal approval still pending.

### COR-001

| Field | COR-001 |
|---|---|
| File | [COR-001_Why_Importing_an_Account_Leaves_a_Relationship_to_Establish.md](lessons/COR-001_Why_Importing_an_Account_Leaves_a_Relationship_to_Establish.md) |
| Revision | 1.0 |
| Course placement | Module 7.1 |
| Content status | Complete lesson saved; account collection/recognition versus identity relationship, configured and default matching, authoritative/profile boundaries, uncorrelated/wrong/correct relationships, view/evidence limits, verified matching-input correction and persistent manual/downstream effects |
| Author review | October 21, 2026; independent Devi payroll context, first-use meanings, two two-column tables, two diagrams, eight worked cases and 2,000-account project transfer checked |
| Documentation check | October 21, 2026; configured/preset/default correlation, Account Name versus identity name, uncorrelated reports, unoptimized reexamination and manual persistence, source-account management, identity establishment/control panels, source-owner duties, processing and configured sync effects freshly checked |
| Diagram sources | [Collection and relationship](assets/COR-001_collection_and_relationship.txt) and [Verified relationship correction](assets/COR-001_verified_relationship_correction.txt); synchronized with inline blocks, maximum line widths 45 and 47 characters |
| Tenant execution | Not performed; employee 71001, teaching identity I-71001, PeopleBook Production p-71001, LedgerPay Production lp-87/login drao, worker71001 identity name, employeeRef null then text 71001, configured pairing and successful association are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest, opening the seventh navigation module; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve COR-001 for feedback and learner validation; COR-002 was authored following the user's instruction to continue |

The configured reference is missing and the documented default name comparison also has no match in the supplied initial evidence. The owner-approved correction supplies employeeRef 71001 without renaming the account or creating another employee identity. Correctness of ownership is checked separately from a correlated flag; no removal, source reset, manual move, permission grant or target operation is performed.

### COR-002

| Field | COR-002 |
|---|---|
| File | [COR-002_Account_and_Identity_Attributes_Used_in_Correlation.md](lessons/COR-002_Account_and_Identity_Attributes_Used_in_Correlation.md) |
| Revision | 1.0 |
| Course placement | Module 7.2 |
| Content status | Complete lesson saved; exact account/identity field pairing, mapped identity provenance, schema designations, standard Equals/case behavior, custom correlation eligibility and preparation, representation and circular-input dependencies, preview/applied/current relationship evidence |
| Author review | October 22, 2026; independent Devi context, first-use meanings, JSON, two diagrams, two two-column tables, eight worked cases and contractor transfer checked |
| Documentation check | October 22, 2026; correlation configuration, searchable identity attributes and all-identity manual processing, preset/default/manual boundaries, schemas, profile mapping/Preview, identity processing, aggregation optimization, Account Attribute/Trim transforms and attribute sync freshly checked |
| Diagram sources | [Two sides of the comparison](assets/COR-002_two_sides_of_the_comparison.txt) and [Independent matching input](assets/COR-002_independent_matching_input.txt); synchronized with inline blocks, maximum line widths 47 and 46 characters |
| Tenant execution | Not performed; employee reference text 0072002, teaching identity I-72002, HarborHR Production h-72002/personNumber 0072002/payrollRef PAY-884, WorkTrack Production wt-391/login drao.wt/workerRef 0072002, worker72002 identity name and supplied successful association are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 7; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve COR-002 for feedback and learner validation; COR-003 was authored following the user's instruction to continue |

The comparison uses selected account workerRef and identity identificationNumber, not arbitrary equal-looking fields or a direct account-to-HR join. Identity mapping and correlation are different configurations. Correlation-searchable eligibility is separate from Search; a mapping that requires the missing application relationship cannot supply an independent first-account reference. The example preserves leading-zero text, checks the documented default path and excludes existing manual overrides. No actual API, schema, mapping, searchable-setting, processing, account-association, synchronization or target operation occurs.

### COR-003

| Field | COR-003 |
|---|---|
| File | [COR-003_Choosing_Identifiers_for_Reliable_Account_Correlation.md](lessons/COR-003_Choosing_Identifiers_for_Reliable_Account_Correlation.md) |
| Revision | 1.0 |
| Course placement | Module 7.3 |
| Content status | Complete lesson saved; account versus person keys, matching-population uniqueness, independent availability and coverage, shared meaning/representation and qualified references, stability/non-reuse, email-reassignment and rehire boundaries, coverage versus correct ownership and maintained data contracts |
| Author review | October 22, 2026; independent Devi context, first-use meanings, two two-column tables, two diagrams, eight worked cases and acquisition transfer checked |
| Documentation check | October 22, 2026; configured criteria/Equals, uniqueness guidance, sample Test and licensed recommendations, case/preset/default/searchable/manual behavior, schemas, profile mapping and Preview, identity processing, aggregation optimization and configured attribute synchronization freshly checked |
| Diagram sources | [Account keys and person references](assets/COR-003_account_keys_and_person_references.txt) and [Reused address and stable reference](assets/COR-003_reused_address_and_stable_reference.txt); synchronized with inline blocks, maximum line widths 48 and 49 characters |
| Tenant execution | Not performed; employee 73003, teaching identity I-73003, AnchorHR Production hr-73003/personRef P-73003, TeamPlan Production tp-206/login drao.tp/ownerPersonRef P-73003, worker73003 identity name and drao@learn.example email are fictional; second account tp-admin-206 and 1,000/970/30 comparisons are teaching variations |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 7; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Preserve COR-003 for feedback and learner validation; COR-004 was authored following the user's instruction to continue |

The approved person-reference properties are fictional organizational guarantees, not automatic HR-field or ISC guarantees. One person's multiple accounts can share an owner reference while retaining distinct account keys. Current uniqueness cannot prove continuity after reassignment; qualified references preserve local namespaces without assuming two separate criteria form an AND/composite match. The 100% email equality and 97% reference availability figures are not interchangeable with correctness or universal actual correlation results. No schema/key, matching configuration, identity, association, reset/deletion, synchronization or external-access operation occurs.

### COR-004

| Field | COR-004 |
|---|---|
| File | [COR-004_Following_Configured_Correlation_Conditions_Through_Records.md](lessons/COR-004_Following_Configured_Correlation_Conditions_Through_Records.md) |
| Revision | 1.0 |
| Course placement | Module 7.4 |
| Content status | Complete lesson saved; ordered selected-value comparisons, criterion no-match versus overall result, standard alternatives versus AND/voting, configured case setting and separate default naming path, candidate/conflicting-data limits, actual reevaluation versus configuration, manual persistence and visible/historical evidence |
| Author review | October 22, 2026; independent Devi context, first-use meanings, two two-column tables, two diagrams, eight worked cases and contractor-source transfer checked |
| Documentation check | October 22, 2026; configured pairings/order/fixed Equals and case, sample Test, preset/default/searchable/manual behavior, account schemas, profile mappings/Preview, identity processing, aggregation/optimization/activity, account/identity views and configured attribute synchronization freshly checked |
| Diagram sources | [Configured comparisons and default](assets/COR-004_configured_comparisons_and_default.txt) and [Configuration and reevaluation](assets/COR-004_configuration_and_reevaluation.txt); synchronized with inline blocks, maximum line widths 37 and 38 characters |
| Tenant execution | Not performed; Devi 74004, PeopleLedger Production pl-74004, teaching identity I-74004/identificationNumber 74004/email devi.rao@learn.example/name worker74004, other I-74005/74005/other.worker@learn.example/worker74005, CasePort Production cp-419/login drao.cp/employeeRef OLD-74004/mail DEVI.RAO@learn.example and supplied intended association are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 7; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Read COR-004 and apply feedback to this same file; then author Module 7.5 |

The full saved configured list is employeeRef to identificationNumber, then mail to email, both Equals and supplied case-insensitive behavior. The first criterion has no candidate; the second uniquely identifies the approved owner. Default is not an extra confirmation or replacement after configured success. Independent cp-420 naming variation matches WORKER74004 to worker74004 after neither configured criterion matches; cp-421 has no configured/default match and remains uncorrelated. No ambiguous-candidate continuation/winner or manufactured historical trace is asserted. No real criteria/schema/account/identity/association/reset/deletion/sync or target operation occurs.

### COR-005

| Field | COR-005 |
|---|---|
| File | [COR-005_Missing_Values_Unmatched_Accounts_and_Ambiguous_Data.md](lessons/COR-005_Missing_Values_Unmatched_Accounts_and_Ambiguous_Data.md) |
| Revision | 1.0 |
| Course placement | Module 7.5 |
| Content status | Complete lesson saved; absent/null/empty/spaces/placeholder distinctions, missing account versus identity input, no candidate versus ambiguous or contradictory evidence, wrong existing links, cause-based correction and completion evidence, reevaluation and separate downstream outcomes |
| Author review | October 22, 2026; independent Devi context, first-use meanings, illustrative JSON, two two-column tables, two diagrams, eight worked cases and 100-record project queue checked |
| Documentation check | October 22, 2026; configured/default/manual correlation and eligibility, account classification/schema, mapping/Preview and applied processing, aggregation optimization/activity, identity views and configured attribute synchronization freshly checked |
| Diagram sources | [Separating matching problems](assets/COR-005_separating_matching_problems.txt) and [Verified reference correction](assets/COR-005_verified_reference_correction.txt); synchronized with inline blocks, maximum line widths 40 and 40 characters |
| Tenant execution | Not performed; Devi 75005, BridgeHR Production bhr-75005, teaching I-75005/P-75005/worker75005 and other I-75006/P-75006/worker75006, shared review.team@learn.example, ReviewDesk Production rd-608/userLogin drao.rd/ownerRef null/contactMail shared address and corrected ownerRef P-75005 are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 7; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Read COR-005 and apply feedback to this same file; then author Module 7.6 |

The only saved criterion pairs ownerRef with eligible applied identificationNumber using Equals. The main account was evaluated, has no other configured/default match and no manual association, and is supplied uncorrelated. Shared contactMail to email is proposed, not configured, and cannot explain the current missing input. Approved ownership uniquely supports P-75005; the corrected feed is collected and evaluated with the same account/login/identity. No universal duplicate-candidate winner, omitted-field clearing or automatic manual reassignment is asserted. The 100-record queue combines uncorrelated and disputed existing-link investigations: 40 unusable references, 25 unverified intended identities, 20 ambiguous cases, 10 wrong links and 5 non-person classification cases. No actual tenant, API, configuration, correlation, deletion, reset, synchronization or target operation occurs.

### COR-006

| Field | COR-006 |
|---|---|
| File | [COR-006_Existing_Associations_and_Changes_to_Correlation_Data_or_Configuration.md](lessons/COR-006_Existing_Associations_and_Changes_to_Correlation_Data_or_Configuration.md) |
| Revision | 1.0 |
| Course placement | Module 7.6 |
| Content status | Complete lesson saved; saved criteria versus data versus relationship, optimized unchanged-record skip and unoptimized reevaluation, automatic/manual/ISC-created link distinctions, account/identity input changes, current versus historical evidence, dependent synchronization and non-automatic reversal |
| Author review | October 22, 2026; independent Devi context, first-use meanings, two two-column tables, two diagrams, eight worked cases and 400-account migration checked |
| Documentation check | October 22, 2026; configured/default/Test/eligibility/manual/ISC-created correlation, optimized/unoptimized aggregation and history, mappings/Preview/processing, schema identifier risks, account updates and identity views, configured sync on moved accounts freshly checked |
| Diagram sources | [Configuration and existing relationships](assets/COR-006_configuration_and_existing_relationships.txt) and [Relationship change and dependent effects](assets/COR-006_relationship_change_and_dependent_effects.txt); synchronized with inline blocks, maximum line widths 40 and 39 characters |
| Tenant execution | Not performed; Devi 76006, PeopleBridge Production pb-76006, teaching I-76006/P-76006/worker76006/devi.rao@learn.example and other I-76007/P-76007/worker76007/other.worker@learn.example, FlowRoom Production fr-306/drao.fr and fr-307/drao.review/personRef P-76006, fr-309 wrong manual link and fr-310 ISC-created treatment are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 7; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Read COR-006 and apply feedback to this same file; then author Module 7.7 |

The complete old list is mail Equals email; the complete replacement is personRef Equals eligible applied identificationNumber, without email fallback. Both main account records already contain P-76006 and remain unchanged; optimized evaluation is skipped, then the supplied included unoptimized result preserves fr-306's correct I-76006 link and associates fr-307 with the same identity. Account ID/key and Account Name/login do not change; no default name match or manual override applies. Separate fr-309 remains subject to its wrong explicit link; fr-310 has manuallyCorrelated=true through ISC creation without a file upload. No universal automatic reassignment/unlinking, historical UI trace or reversal is asserted. The department-sync variation and 400-account project are separate theoretical conditions. No real configuration, schema, aggregation, processing, correlation, flag, account, reset, deletion, sync or target change occurs.

### COR-007

| Field | COR-007 |
|---|---|
| File | [COR-007_Manual_Correction_and_What_the_Relationship_Change_Does_Not_Resolve.md](lessons/COR-007_Manual_Correction_and_What_the_Relationship_Change_Does_Not_Resolve.md) |
| Revision | 1.0 |
| Course placement | Module 7.7 |
| Content status | Complete lesson saved; approved owner and exact account/identity selection, account update versus manual-file paths, explicit relationship versus missing source data/shared criteria, persistent treatment and wrong links, cause-based follow-up, conditional downstream writes and evidence, Remove/Delete/reset distinctions |
| Author review | October 22, 2026; independent Devi context, first-use meanings, two two-column tables, two diagrams, eight worked cases and 80-proposed-row transfer checked |
| Documentation check | October 22, 2026; supported Update Correlation and classification, manual-file permanence/status/history, ISC-created treatment/default path, aggregation modes, schema identifiers, profile mappings/Preview, processing and identity events, configured sync triggers freshly checked |
| Diagram sources | [Manual relationship correction](assets/COR-007_manual_relationship_correction.txt) and [Separate follow-up tracks](assets/COR-007_separate_follow_up_tracks.txt); synchronized with inline blocks, maximum line widths 33 and 39 characters |
| Tenant execution | Not performed; Devi 77007, StaffPath Production sp-77007, teaching I-77007/P-77007/worker77007/devi.rao@learn.example and different I-77008/P-77008/worker77008/another.devi@learn.example both displayed Devi Rao, ProjectSpace Production ps-512/drao.ps/personRef null and ps-513 wrong-link variation are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 7; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Read COR-007 and apply feedback to this same file; then author Module 7.8 |

Main ps-512 is supplied collected, evaluated and uncorrelated, with only personRef Equals eligible applied identificationNumber and no default name match. Independent owner evidence approves existing I-77007 despite duplicated display names. Supported manual correction supplies the intended association with unchanged key/login, null reference and shared criteria; the feed defect remains open. Main attribute synchronization is not enabled and no access-change operation is supplied. Separate later-reference, persistent wrong ps-513-to-I-77008, ISC-created flag, 12-row import issue and conditional Support-to-Engineering sync cases do not redefine the main outcome. The transfer has 80 proposed rows, not necessarily distinct accounts: 40 verified uncorrelated, 10 wrong links, 15 unknown-owner, 5 automation and 10 duplicate/contradictory proposals. No actual tenant, API, account update, file import, schema, correlation, processing, reset, deletion, sync or target operation occurs.

### COR-008

| Field | COR-008 |
|---|---|
| File | [COR-008_Manager_Correlation_and_Dependencies_of_Manager_Based_Processes.md](lessons/COR-008_Manager_Correlation_and_Dependencies_of_Manager_Based_Processes.md) |
| Revision | 1.0 |
| Course placement | Module 7.8 |
| Content status | Complete lesson saved; account ownership versus manager identity relationship, Manager Name plus source comparison, employee-side reference versus manager's own identity field, priority/first-non-null source selection, processing/eligibility, null clearing versus unmatched non-null retention, missing/ambiguous/hierarchy concerns and separate request/campaign/target outcomes |
| Author review | October 22, 2026; independent Devi context, first-use meanings, two two-column tables, two diagrams, eight worked cases and 120-employee reporting-line transfer checked |
| Documentation check | October 22, 2026; full manager-correlation article, profile mappings/Preview, identity processing, aggregation modes/history, role/access-profile Manager reviewer and missing-reviewer handling, Manager Campaign exclusion/snapshot, built-in Manager sync limit/custom approach and identity evidence, plus official directory provisioning representation freshly checked |
| Diagram sources | [Manager reference and identity relationship](assets/COR-008_manager_reference_and_identity_relationship.txt) and [Manager relationship and consumers](assets/COR-008_manager_relationship_and_consumers.txt); synchronized with inline blocks, maximum line widths 40 and 38 characters |
| Tenant execution | Not performed; Devi 78008, RosterHR Production rh-78008/P-78008 and teaching I-78008, manager I-89008/rh-89008/P-89008 and replacement I-89009/rh-89009/P-89009, managerRef lookup, PartnerHR priority variation and P-99999 are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 7; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Read COR-008 and apply feedback to this same file; then author Module 7.9 |

Main HR account ownership is already Devi's. Employees Manager Name maps RosterHR managerRef P-89008; source manager correlation compares it with eligible applied identificationNumber on existing unique manager I-89008. No competing source or custom rule applies; relevant collection/processing and resulting relationship are supplied. Separate priority-10 RosterHR P-99999 versus priority-20 PartnerHR P-89009 demonstrates first non-null source selection, not first successful match; higher null permits lower-source selection. Separate selected-input variations start with existing I-89008: null clears under the stated single-source conditions, unmatched non-null retains the prior manager, and approved P-89009 can match I-89009. Requests, campaign snapshots and manager synchronization are separate consumers; no external manager write/request/campaign execution is supplied in the main result. The 120-employee transfer splits 70 prepared/20 wrong reference/10 missing input/10 missing manager identity/5 source conflict/5 duplicate or invalid hierarchy cases. No actual tenant/API/source/profile/priority/mapping/correlation/processing/approval/campaign/sync or target operation occurs.

### COR-009

| Field | COR-009 |
|---|---|
| File | [COR-009_Investigating_Incorrect_Account_Links_Unmatched_Accounts_and_Missing_Managers.md](lessons/COR-009_Investigating_Incorrect_Account_Links_Unmatched_Accounts_and_Missing_Managers.md) |
| Revision | 1.0 |
| Course placement | Module 7.9 |
| Content status | Complete investigation lesson saved; absent versus uncorrelated versus wrong-link records, intended identity and selected input evidence, persistent manual links, configured/default boundaries, manager dual configuration/source selection, evaluation versus read/save, approved corrections and distinct relationship/data/consumer acceptance |
| Author review | October 22, 2026; independent Devi context, first-use meanings, two two-column tables, two diagrams, eight worked cases and 90-record mixed-queue transfer checked |
| Documentation check | October 22, 2026; full account/manager correlation articles, aggregation methods/history/single-account limits, profile mappings/Preview/identity exceptions, processing, schema identifiers, supported account correction/removal, identity evidence, configured sync and Manager Campaign snapshots freshly checked |
| Diagram sources | [Investigation branches](assets/COR-009_investigation_branches.txt) and [Three verified relationship results](assets/COR-009_three_verified_relationship_results.txt); synchronized with inline blocks, maximum line widths 39 and 37 characters |
| Tenant execution | Not performed; Devi 79009, TeamLedger Production tl-79009, teaching I-79009/P-79009/worker79009, other I-79010/P-79010/worker79010, intended manager I-89909/P-89909, WorkspaceDesk Production wd-601/drao.wd and wd-602/drao.review are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition site manifest under Module 7; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Read COR-009 and apply feedback to this same file; then author Module 8.1 |

Main supplied investigation separates wd-601's wrong persistent manual I-79010 link despite correct P-79009, wd-602's null personRef with no manual link, and missing Employees Manager Name mapping despite collected tl-79009.managerRef P-89909 and existing unique manager identity. Application criteria are only personRef Equals eligible applied identificationNumber, with no default naming match; account keys/logins remain fixed. Approved supported relationship correction, feed repair/collection/evaluation and manager mapping/processing supply distinct verified results: both accounts on I-79009 and that identity's manager I-89909. No target write/request/campaign execution is supplied. Alternate selected-field/optimized-skip/unmatched-manager/failed-sync cases do not redefine main facts. The 90-record queue is 20 absent/20 unusable input/15 wrong persistent links/10 missing identities/10 manager cases/10 ambiguous or contradictory/5 non-person cases. No actual tenant/API/source/profile/mapping/correlation/processing/import/reset/deletion/sync or target operation occurs.

### TRN-001

| Field | TRN-001 |
|---|---|
| File | [TRN-001_Choosing_Between_Direct_Mapping_and_Calculated_Values.md](lessons/TRN-001_Choosing_Between_Direct_Mapping_and_Calculated_Values.md) |
| Revision | 1.0 |
| Course placement | Module 8.1 |
| Content status | Complete decision-and-tracing lesson saved; direct values versus justified calculations, field meaning/authority/type, implicit and explicit inputs, account selection, lower versus lookup/trim, missing-value policy, list boundary and calculation/application/consumer evidence |
| Author review | October 22, 2026; independent Devi context, first-use meanings, two two-column tables, two diagrams, eight worked cases and 100-mapping transfer checked |
| Documentation check | October 22, 2026; official transforms/input contexts, lower, accountAttribute, trim, lookup, identity-profile mappings/ToLower/Preview/multi-value boundary, processing, roles and configured attribute synchronization freshly checked |
| Diagram sources | [Direct and calculated value paths](assets/TRN-001_direct_and_calculated_value_paths.txt) and [Calculation, application and consumer checks](assets/TRN-001_calculation_application_and_consumer_checks.txt); synchronized with inline blocks, maximum line widths 38 and 45 characters |
| Tenant execution | Not performed; Devi 81001, PeopleLedger Production pl-81001, teaching identity I-81001, values, approved requirements and supplied results are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition manifest as the first Module 8 lesson; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Read TRN-001 and apply feedback to this same file; then author Module 8.2 |

Main design uses one correctly associated HR account: costCentreCode single string 0042 maps directly to costCenter; departmentLabel Finance uses ToLower with implicit mapped input to department finance. Other required identity fields are already valid. Supplied approved processing produces those applied identity values while collected HR values remain unchanged; no external write or use test is supplied. Explicit stale directory Legal, FIN code, Finance with trailing space, null fallback and oldest Legal/newer Finance account cases are independent variations. The 100 proposed mappings comprise 40 exact/25 lowercase/15 translation/10 missing/10 ambiguous selection; not a failed-identity count. No actual tenant/API/source/profile/mapping/transform/processing/role/sync or target operation occurs. Module 8 navigation is introduced only now that its first complete lesson exists; all earlier native controls and content are retained.

### TRN-002

| Field | TRN-002 |
|---|---|
| File | [TRN-002_Reading_a_Transforms_Inputs_Operation_Configuration_and_Output.md](lessons/TRN-002_Reading_a_Transforms_Inputs_Operation_Configuration_and_Output.md) |
| Revision | 1.0 |
| Course placement | Module 8.2 |
| Content status | Complete transform-reading lesson saved; JSON/root/name/type/configuration distinctions, nested retrieval/trim/lower value dependencies, account versus transform versus identity attributes, implicit/explicit input, per-identity/source/account selection, reference and syntax/semantic boundaries, Preview/application/consumer evidence |
| Author review | October 22, 2026; independent Devi context, first-use meanings, two parseable illustrative JSON definitions, two two-column tables, two diagrams, eight worked cases and Department Code transfer checked |
| Documentation check | October 22, 2026; official transforms and first-transform guide, lower/trim/accountAttribute, identity-profile mappings and Preview, processing, update restrictions and RFC 8259 JSON structure freshly checked |
| Diagram sources | [Nested input value trace](assets/TRN-002_nested_input_value_trace.txt) and [Implicit and explicit input comparison](assets/TRN-002_implicit_and_explicit_input_comparison.txt); synchronized with inline blocks, maximum line widths 38 and 41 characters |
| Tenant execution | Not performed; Devi 82002, StaffRoster Production sr-82002, teaching I-82002, DirectoryBridge Production db-82002, values, requirements and supplied results are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition manifest under Module 8; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Read TRN-002 and apply feedback to this same file; then author Module 8.3 |

Main definition Department text for Employees has root lower, explicit nested trim and explicit accountAttribute StaffRoster Production/departmentLabel. One correct associated sr-82002 supplies text with one surrounding space on each side of Finance; retrieval returns that raw string, trim Finance and lower finance. Separate Lowercase mapped department definition has empty attributes/no input and retains surrounding spaces when mapped to StaffRoster. Changed selector to DirectoryBridge db-82002/Legal yields legal for implicit lower but finance for unchanged explicit definition. Same-definition Operations, proposed misleading name, moved settings, missing/multiple-account and renamed StaffRoster Live reference cases remain distinct. Proposed-definition name comparisons do not assert that an existing transform's name/type can be changed through the update API. Supplied approved processing establishes applied department finance only; no external write/access/use result. Department Code FIN transfer rejects renaming/destination as a translation. No actual tenant/API/source/profile/mapping/transform/aggregation/processing/provisioning or target operation occurs.

### TRN-003

| Field | TRN-003 |
|---|---|
| File | [TRN-003_Normalizing_and_Combining_Strings.md](lessons/TRN-003_Normalizing_and_Combining_Strings.md) |
| Revision | 1.0 |
| Course placement | Module 8.3 |
| Content status | Complete string-normalization/composition lesson saved; approved representation, exact character/space tracing, component versus final trim, lower/upper boundaries, concat versus join and separators/order, meaningful name characters/codes, missing-input policy, uniqueness and calculation/application/consumer evidence |
| Author review | October 22, 2026; independent Devi context, first-use terms, two parseable illustrative JSON definitions, two two-column tables, two diagrams, eight worked cases and family-first punctuation transfer checked |
| Documentation check | October 22, 2026; official transforms, trim/lower/upper/concat/join/accountAttribute, identity-profile mappings/Preview/list boundary, processing and RFC 8259 array/string structure freshly checked |
| Diagram sources | [Component trim and separator comparison](assets/TRN-003_component_trim_and_separator_comparison.txt) and [String result and consumer evidence](assets/TRN-003_string_result_and_consumer_evidence.txt); synchronized with inline blocks, maximum line widths 31 and 43 characters |
| Tenant execution | Not performed; Devi 83003, WorkforceBook Production wb-83003, teaching I-83003, strings, approved display rule and supplied results are fictional |
| Learner validation | Pending; no beginner read-through or transfer test performed |
| Publication status | Added to working-edition manifest under Module 8; formal publication review and approval remain pending |
| Unresolved author content issues | None identified in this review; learner comprehension remains untested |
| Next action | Read TRN-003 and apply feedback to this same file; then author Module 8.4 |

Main design uses one correctly associated WorkforceBook account and single givenName/familyName strings with one leading/trailing space around Devi/Rao. Employees displayName maps a root concat whose ordered values are explicit accountAttribute-based trim(givenName), literal one space and explicit trim(familyName); result Devi Rao preserves case. Combining raw values then trimming leaves three internal spaces. Separate fixed-value join illustrates explicit space versus default comma, not a dynamic production replacement. Independent Finance/us case examples, De la Cruz/O'Neil preservation, PLANT-0073 text code, A-B/AB collision, blank-family policy and duplicate-name login cases do not change main facts. Supplied approved processing establishes current identity displayName Devi Rao only; HR inputs unchanged/no target, mailbox, login or relationship operation supplied. Transfer Ana/O'Neil requires family-first O'Neil, Ana with comma-and-space. No actual tenant/API/source/profile/mapping/transform/aggregation/processing/provisioning or target operation occurs.

## Source-citation relocation

SYS-001 revision 1.2 and FND-001 revision 1.3 remove inline documentation citations and the closing source-only sections from learner files. The [author reference records](author/REFERENCE_RECORDS.md) preserve every original source URL, section mapping, and prior documentation-check notes. The teaching prose, exercises, worked answers, and diagram remain unchanged.

Teaching specification v2.5 makes this separation mandatory for future lessons. It also records the requested press-and-hold glossary behavior for a future interactive format; that interaction is not implemented in these Markdown files.

This cleanup does not constitute fresh technical verification, tenant testing, learner validation, or publication approval.

## Next lesson in course order

All six Module 1 lessons, all seven Module 2 lessons, all eight Module 3 lessons, all eight Module 4 lessons, all nine Module 5 lessons, all eight Module 6 lessons and all nine Module 7 lessons are authored. Modules 8.1-8.3 are authored. Learner validation and formal publication review remain separate pending stages. Module 8.4 onward remains planned.

The next new lesson is Module 8.4:

**Handling missing values with fallbacks.**

- Reserved permanent ID: `TRN-004`.
- Planned file: `lessons/TRN-004_Handling_Missing_Values_with_Fallbacks.md`.
- Status: planned only; no lesson file created.
- Scope: distinguish absent/null/empty/whitespace/invalid input and calculation errors; trace approved fallback priority and firstValid behavior, error handling and output suitability, expose data-quality defects and avoid default values that fabricate business facts or unsafe access decisions.
- Resolve known feedback on TRN-003 before opening the next writing task.
- Preserve the existing navigation and published content; add later modules only when their first complete lesson exists.

## Recording review status

Use the teaching specification's [lesson review and publication checks](TEACHING_SPECIFICATION.md#lesson-review-and-publication-checks). Do not maintain another content checklist here.

For each authored lesson, record its permanent ID, file, revision, content status, author-review result and date, documentation-verification date, learner-validation result, publication status, unresolved issues, and next action. Identify which revision a review covered. Preserve historical version numbers in the change record, but use version-free links to the current specification elsewhere.

Use separate status fields rather than a single ready label. If a review has not occurred, say so. Updating or saving a file does not itself complete any review stage.

## Course-level work still ahead

- Write the remaining lessons, one complete file at a time.
- Develop the optional readiness diagnostic and its subject-specific routing and retry questions.
- Finalize displayed module numbering before publication, including the split lifecycle modules 16A, 16B, and 16C. Keep permanent lesson IDs stable.
- Build the glossary and supporting reference aids as authored lessons establish their terminology. Do not substitute these aids for explanations inside lessons.
- Run beginner read-throughs and record observed misunderstandings and revisions.
- Assemble publication formats only after content review, without shortening the source lessons to fit a format.

Example identifiers are maintained in the [author example register](author/EXAMPLE_REGISTER.md), and recurring meanings in the [author terminology register](author/TERMINOLOGY_REGISTER.md). These maintenance aids are not prerequisite material for learners.

The complete topic backlog remains in [Course design and contents](COURSE_DESIGN_AND_CONTENTS.md). It is not duplicated here to avoid two competing tables of contents.

## Change record

| Date | Change | Limit of the claim |
|---|---|---|
| October 19, 2026 | Established the local ISC_Theory folder and saved the course design, teaching specification v2.1, foundation lesson v1.1, README, and this register | This records persistence of the current work, not completion of the course or learner validation |
| October 19, 2026 | Updated the teaching specification to v2.2 and FND-001 to v1.2 following narration feedback; synchronized the README and register | Editorial changes only; learner validation remains pending |
| October 19, 2026 | Consolidated quality checks in teaching specification v2.3, retaining distinct author, learner, and publication stages; replaced duplicate checklists and outdated version labels with links | Documentation maintenance; no lesson or learner-validation status changed by this cleanup |
| October 19, 2026 | Authored and reviewed SYS-001 revision 1.0; added its links and review record; identified SYS-002 as the next planned lesson | Documentation-based author review only; no tenant execution, learner validation, or publication approval |
| October 19, 2026 | Revised SYS-001 to v1.1 with first-use explanations and a request-flow diagram; updated teaching specification to v2.4 | Selected technical references rechecked; diagram source and image checks are distinct; learner validation remains pending |
| October 19, 2026 | Moved source citations to author records; SYS-001 v1.2, FND-001 v1.3, and teaching specification v2.5 saved; recorded future press-and-hold glossary behavior | Editorial relocation only; teaching content preserved; interactive glossary not implemented |
| October 20, 2026 | Authored SYS-002 revision 1.0; checked official references, reasoning cases, and text-flow consistency; updated course navigation and next planned lesson | Documentation-based author review only; no tenant testing, learner validation, or publication approval |
| October 20, 2026 | Authored SYS-003 revision 1.0 with responsibility handoffs, ownership distinctions, worked cases, and a transfer exercise; updated navigation, source records, and next planned lesson | Documentation-based author review only; organizational assignments are an illustrative operating model; no tenant testing, learner validation, or publication approval |
| October 20, 2026 | Authored SYS-004 revision 1.0 with intended/recorded/effective access distinctions, a timed removal case, change/observation diagram, and worked reasoning; updated navigation, source records, and next planned lesson | Documentation-based author review only; fictional application conditions and timings; no tenant testing, learner validation, or publication approval |
| October 20, 2026 | Authored SYS-005 revision 1.0 with service design, operation, incident recovery, governance feedback, a handoff diagram, and worked exercises; updated navigation and next planned lesson | Documentation-based author review only; operating model and application incident are illustrative; no tenant testing, learner validation, or publication approval |
| October 20, 2026 | Authored SYS-006 revision 1.0 with a record/decision map, mapping-defect investigation, corrected flow, changed-evidence variations, and transfer exercise; all six Module 1 lessons now authored | Documentation-based author review only; learner and publication stages remain pending; FND-001 is the existing next course-position lesson, not a newly verified file |
| October 20, 2026 | Applied the supplied review selectively: independent example identifiers, SYS-001 text flow, clearer certification vocabulary and LCS shorthand, introductory sign-in scope, module placement, and teaching specification v2.6; current SYS revisions updated | Sources remain outside learner lessons by user instruction; only named technical claims were freshly checked; no tenant testing or learner validation |
| October 20, 2026 | Reviewed FND-001 revision 1.3 in course order without changing its teaching body; authored and reviewed FND-002 revision 1.0 with read/write boundaries, source/connector distinctions, file-age reasoning, and five worked cases; updated working-edition navigation and reserved FND-003 | Documentation-based author review with selected FND-001 mechanisms rechecked; no tenant testing, learner validation, or formal publication approval |
| October 20, 2026 | Authored and reviewed FND-003 revision 1.0 with account/identity/entitlement attribute distinctions, calculated-value and write paths, membership-reference diagrams, typed/missing input reasoning, and five worked cases; updated navigation and reserved FND-004 | Documentation-based author review; fictional records and outcomes; no tenant testing, beginner validation, or formal publication approval |
| October 20, 2026 | Authored and reviewed FND-004 revision 1.0 with access-object relationships, direct role entitlements, criteria-to-delivery flow, preexisting-access detection, partial outcomes, overlapping role access and definition-deletion distinctions; added six worked cases and updated navigation; reserved FND-005 | Documentation-based author review; fictional records and outcomes; no tenant testing, beginner validation, or formal publication approval |
| October 20, 2026 | Authored and reviewed FND-005 revision 1.0 with business/ISC application and source distinctions, catalog/requester rules, independent request/change and sign-in paths, source-visibility limits, five worked cases, and updated navigation; reserved FND-006 | Documentation-based author review; fictional account/sign-in integration; no tenant testing, beginner validation, or formal publication approval |
| October 20, 2026 | Authored and reviewed FND-006 revision 1.0 with object/native/business identifier distinctions, source/type/environment references, rename and schema-change reasoning, two diagrams, five worked cases, and transfer/teach-back; updated navigation and reserved FND-007 | Documentation-based author review; fictional records and teaching-ID labels; no tenant testing, beginner validation, or formal publication approval |
| October 20, 2026 | Authored and reviewed FND-007 revision 1.0 with multiple-account relationships, separate value-lookup and provisioning-selection behavior, automatic/request and single-account boundaries, account-state/removal reasoning, two diagrams, six cases, and payroll transfer; all seven Module 2 lessons now authored; reserved ARC-001 | Documentation-based author review; fictional accounts and outcomes; no tenant testing, beginner validation, or formal publication approval |
| October 20, 2026 | Authored and reviewed ARC-001 revision 1.0 with tenant/service/customer boundaries, shared component maintenance, external read/write privilege incident, sandbox destination reasoning, two diagrams, six cases, and SaaS-connector transfer; opened Module 3 navigation and reserved ARC-002 | Documentation-based author review; operational teaching model and fictional evidence; no tenant testing, beginner validation, or formal publication approval |
| October 20, 2026 | Authored and reviewed ARC-002 revision 1.0 with source/cluster/member relationships, documented outbound polling and work flow, pairing/CCG, per-member connectivity, HA/DR and update conditions, DNS failure and interrupted-outcome reasoning, two diagrams, six cases, and Payroll transfer; reserved ARC-003 | Documentation-based author review; fictional operations and evidence; no tenant testing, beginner validation, or formal publication approval |
| October 20, 2026 | Authored and reviewed ARC-003 revision 1.0 with SaaS runtime versus application hosting, source configuration, target/API authority, read and change flows, UI/evidence boundaries, credential and collection failures, eligible-source migration conditions, two diagrams, six cases and payroll design transfer; reserved ARC-004 | Documentation-based author review; fictional operations and evidence; no tenant testing, beginner validation, or formal publication approval |
| October 20, 2026 | Authored and reviewed ARC-004 revision 1.0 with operation-specific IQService role, ISC/VA/Windows/target path, credential roles, secured request admission and target authority, expired-certificate incident, native scripts/handlers, update and shared-service dependencies, two diagrams, six cases and connector-read transfer; reserved ARC-005 | Documentation-based author review; fictional operations and evidence; no tenant execution, beginner validation, or formal publication approval |
| October 20, 2026 | Authored and reviewed ARC-005 revision 1.0 with source/runtime/destination context, connectivity/trust/authentication/authorization distinctions, capability/input dependency map, error origin, denied-write trace, partial outcomes and supported recovery, two diagrams, five investigations and read-only project transfer; reserved ARC-006 | Documentation-based author review; fictional operations and evidence; no tenant execution, beginner validation, or formal publication approval |
| October 20, 2026 | Authored and reviewed ARC-006 revision 1.0 with UI/API/capability distinctions, configuration versus access-changing operations, caller/token authority, accepted request tracking, connector continuity, external scripts versus Workflow event/filter/choice/execution, two diagrams, five cases and unattended-automation transfer; reserved ARC-007 | Documentation-based author review; fictional operations and evidence; no tenant execution, beginner validation, or formal publication approval |
| October 20, 2026 | Authored and reviewed ARC-007 revision 1.0 with federated/directory/native sign-in distinctions, SAML trust/matching, MFA/recovery scope, supported source-password changes, sync-group partial outcomes, session boundaries, three diagrams, seven worked cases and purchasing-design transfer; reserved ARC-008 | Documentation-based author review; fictional operations and evidence; no tenant execution, beginner validation, or formal publication approval |
| October 20, 2026 | Authored and reviewed ARC-008 revision 1.0 with request/decision/execution/collection/target boundaries, partial-delivery UTC trace, scoped status and evidence, manual/ticket fulfillment, missing results, timeout/recovery reasoning, three diagrams, six cases and payroll-design transfer; all eight Module 3 lessons authored; reserved SRC-001 | Documentation-based author review; fictional operations and evidence; no tenant execution, beginner validation, or formal publication approval |
| October 20, 2026 | Authored and reviewed SRC-001 revision 1.0 with source/environment/population boundaries, intended versus actual read sets, account/person counts, missing versus uncorrelated records, read/write authority, source-purpose design record, two diagrams, six cases and payroll-export transfer; opened Module 4 navigation; reserved SRC-002 | Documentation-based author review; fictional operations and evidence; no tenant execution, beginner validation, or formal publication approval |
| October 20, 2026 | Authored and reviewed SRC-002 revision 1.0 with profile-backed identity establishment, overlapping authoritative accounts and priority, cross-source mappings, required attributes and exceptions, authentication/provisioning/removal boundaries, two diagrams, seven cases and acquisition-design transfer; reserved SRC-003 | Documentation-based author review; fictional operations and evidence; no tenant execution, beginner validation, or formal publication approval |
| October 20, 2026 | Authored and reviewed SRC-003 revision 1.0 with operation/object matrix reading, read/write and group/membership distinctions, target API/runtime/configuration/input/authority dependencies, fictional FulfillHub capability gaps and 403 evidence, two diagrams, seven cases and payroll-design transfer; reserved SRC-004 | Documentation-based author review; fictional operations and evidence; no tenant execution, beginner validation, or formal publication approval |
| October 21, 2026 | Authored and reviewed SRC-004 revision 1.0 with field definition/value distinctions, Account ID/Name and schema-property meanings, two-account person-matching example, input mapping defect/correction, discovery, UI/audit evidence and safe designation-change reasoning; two diagrams, two tables, seven cases and payroll-feed transfer; reserved SRC-005 | Documentation-based author review; fictional operations and evidence; no tenant execution, beginner validation, or formal publication approval |
| October 21, 2026 | Authored and reviewed SRC-005 revision 1.0 with types/cardinality, leading-zero preservation, Boolean meaning, JSON arrays and CSV quoting, null/empty/omitted states, dates/offsets/units, read-side conversion defect/correction and downstream evidence; two diagrams, two tables, seven cases and HR-feed transfer; reserved SRC-006 | Documentation-based author review; fictional operations and evidence; no tenant execution, beginner validation, or formal publication approval |
| October 21, 2026 | Authored and reviewed SRC-006 revision 1.0 with membership/object distinctions, source/type/ID linking, selected ID/Name, two collection responsibilities, multiple access types and indirect relationships, safe schema-change and UI/metadata reasoning; two diagrams, two tables, seven cases and application-design transfer; reserved SRC-007 | Documentation-based author review; fictional operations and evidence; no tenant execution, beginner validation, or formal publication approval |
| October 21, 2026 | Authored and reviewed SRC-007 revision 1.0 with intended/read/view scope, inclusion/exclusion logic, actor visibility, native/resource filtering, membership/object scope, pagination and extraction, aggregation-mode and deletion-safeguard boundaries; two diagrams, two tables, eight cases and payroll-export transfer; reserved SRC-008 | Documentation-based author review; fictional operations and evidence; no tenant execution, beginner validation, or formal publication approval |
| October 21, 2026 | Authored and reviewed SRC-008 revision 1.0 with field-level authority, producer/integration/consumer handoffs, identifiers, requiredness/null semantics, effective and delivery times, stale export correction, synchronization boundaries and acceptance/change handling; two diagrams, two tables, JSON, eight cases and laboratory-project transfer; all eight Module 4 lessons now authored; reserved AGG-001 | Documentation-based author review; illustrative operating agreement and fictional results; no tenant execution, beginner validation, or formal publication approval |
| October 21, 2026 | Authored and reviewed AGG-001 revision 1.0 with supported account-read tracing, nested response/extraction/schema mappings, existing-account recognition, person correlation and shadow boundary, independent account/identity office paths, processing/provisioning and evidence distinctions; two diagrams, two tables, two JSON blocks, eight cases and HR-record transfer; opened Module 5 navigation and reserved AGG-002 | Documentation-based author review; fictional operations and supplied outcomes; no tenant execution, beginner validation, or formal publication approval |
| October 21, 2026 | Authored and reviewed AGG-002 revision 1.0 with account/membership and entitlement-object collection distinctions, supported linking, unused groups, relationship/count reconciliation, independent read scopes/authority, observation times, file limitations and metadata/evidence reasoning; two diagrams, two tables, two JSON blocks, eight cases and project-file transfer; reserved AGG-003 | Documentation-based author review; fictional records and supplied results; no tenant execution, beginner validation, or formal publication approval |
| October 21, 2026 | Authored and reviewed AGG-003 revision 1.0 with full read scope versus optimized/unoptimized processing, unchanged-input correlation correction, per-run disableOptimization semantics, manual-association boundary, delta/single-account/identity-processing distinctions, operational evidence and safe reruns; two diagrams, two tables, JSON, eight cases and identity-profile transfer; reserved AGG-004 | Documentation-based author review; fictional records and supplied outcomes; no API/tenant execution, beginner validation, or formal publication approval |
| October 21, 2026 | Authored and reviewed AGG-004 revision 1.0 with delta baseline/capture/read/result logic, Update/Insert/Delete and omission/status distinctions, JDBC/Active Directory/Okta-specific coverage and authority, progress/retention/recovery boundaries, membership capture and operational evidence; two diagrams, three tables, JSON, eight cases and database-design transfer; reserved AGG-005 | Documentation-based author review; fictional records and supplied outcomes; no database, credential, permission, tracking-state or tenant execution, beginner validation, or formal publication approval |
| October 21, 2026 | Authored and reviewed AGG-005 revision 1.0 with selected-account/source/native-key tracing, UI account/identity/provisioning boundaries, lock/read/change distinctions, not-found and full/delta deletion evidence, lookup support and API completion limits; two diagrams, two tables, JSON, eight cases and project-button transfer; reserved AGG-006 | Documentation-based author review; fictional records and supplied results; no real read, unlock, API, credential, identity or deletion operation, beginner validation, or formal publication approval |
| October 21, 2026 | Authored and reviewed AGG-006 revision 1.0 with scheduling/queue/execution/publication distinctions, two-read freshness trace, daily recurrence windows, VA/SaaS time zones, population/mode and object clocks, conditional identity/provisioning dependencies and operational evidence; two diagrams, two tables, eight cases and contractor-removal transfer; reserved AGG-007 | Documentation-based author review; fictional records, schedules and supplied results; no source schedule, time zone, tenant, credential or target change, beginner validation, or formal publication approval |
| October 21, 2026 | Authored and reviewed AGG-007 revision 1.0 with missing/disabled/deleted distinctions, account-deletion settings, volume versus correctness, small-population rounding, full/delta/single-account boundaries, authoritative profile/nightly deletion/blocker/hidden outcomes and safe offboarding/recovery; two diagrams, two tables, eight cases and HR-file design transfer; reserved AGG-008 | Documentation-based author review; fictional records and supplied outcomes; no actual deletion, guard, protection, permission, source or tenant change, beginner validation, or formal publication approval |
| October 21, 2026 | Authored and reviewed AGG-008 revision 1.0 with execution/status/details, count units and counter limitations, partial read versus retained inventory, optimization and matching boundaries, identifier-set completeness, entitlement discovery counts, record/identity/target evidence and cause-based recovery; two diagrams, two tables, eight cases and health-indicator transfer; reserved AGG-009 | Documentation-based author review; fictional inputs, page error and supplied represented outcomes; no source, permission, retry, API, target or tenant change, beginner validation, or formal publication approval |
| October 21, 2026 | Authored and reviewed AGG-009 revision 1.0 with precise missing/stale symptoms, evidence-driven hypotheses, source/key/owner separation, raw-response/root/extraction/schema/correlation trace, safe correction/re-evaluation and stale account/identity/Search/status branches; JSON, two diagrams, two tables, eight cases and cost-centre transfer; all nine Module 5 lessons authored and IDN-001 reserved | Documentation-based author review; fictional evidence, no live configuration/account/identity/target operation, beginner validation, or formal publication approval |
| October 21, 2026 | Authored and reviewed IDN-001 revision 1.0, opening Module 6 with authoritative worker accounts, identity profiles, direct identity mappings, distinct references, required/unique values, identity exceptions, application correlation and separate provisioning/sign-in boundaries; JSON, two diagrams, two tables, seven cases and contractor transfer; reserved IDN-002 | Documentation-based author review; fictional data and outcomes, no live source/profile/account/identity/target change, beginner validation or formal publication approval |
| October 21, 2026 | Authored and reviewed IDN-002 revision 1.0 on shared profile responsibilities, multi-source mapped values, global attributes and manager dependency, authentication/invitations/security, lifecycle mapping and access, provisioning evidence, preview/save/apply and change scope; two diagrams, two tables, seven cases and contractor-email transfer; reserved IDN-003 | Documentation-based author review; fictional evidence, no live security/source/profile/attribute/account/identity/target change, beginner validation or formal publication approval |
| October 21, 2026 | Authored and reviewed IDN-003 revision 1.0 on account/schema/profile boundaries, direct values, ToLower and explicit input, account selection and null/filter/sort defaults, cardinality/type preservation, required inputs and processing/consumer evidence; JSON, two diagrams, two tables, eight cases, contractor transfer and complete tracing aid revision 1.0; reserved IDN-004 | Documentation-based author review; fictional inputs/outcomes, no live source/schema/mapping/account/identity/target operation, learner validation or formal publication approval |
| October 21, 2026 | Authored and reviewed IDN-004 revision 1.0 on approved field suppliers, distinct meanings/owners/populations, timestamp/effective-time reasoning, downstream-email bootstrap choices, placeholders versus fit-for-use values, First Valid/error policy and directional sync; two diagrams, two two-column tables, eight cases and sponsor-end-date transfer; reserved IDN-005 | Documentation-based author review; fictional policies/input/results, no live source/profile/credential/account/identity/target or contract/access change, beginner validation or formal publication approval |
| October 21, 2026 | Authored and reviewed IDN-005 revision 1.0 on account-based profile eligibility and shared precedence, creation-order defaults, field/account selection boundaries, conversion continuity, deletion reassignment, lifecycle/security/access and evidence; two diagrams, two two-column tables, eight cases and acquisition transfer; reserved IDN-006 | Documentation-based author review; fictional accounts/configuration/results, no live correlation, priority, profile, identity, deletion, lifecycle or target operation, beginner validation or formal publication approval |
| October 21, 2026 | Authored and reviewed IDN-006 revision 1.0 on required mappings/output values, missing/null/empty/error distinctions, incomplete versus other errors, global uid collisions/continuity, cause-based correction and current identity/consumer evidence; JSON, two diagrams, two two-column tables, eight cases and contractor-intake transfer; reserved IDN-007 | Documentation-based author review; fictional input/mapping/status/results, no live source, profile, naming, correlation, identity, sign-in, deletion or target operation, beginner validation or formal publication approval |
| October 21, 2026 | Authored and reviewed IDN-007 revision 1.0 on mapping/consumer dependencies, representation-sensitive role conditions, shared/reference scope, manager/lifecycle checks, preview/process/application boundaries, sync all-account/null behavior, partial writes and compensating recovery; two diagrams, two two-column tables, eight cases and end-date transfer; reserved IDN-008 | Documentation-based author review; fictional configuration/input/processing/target evidence, no live source/profile/transform/role/manager/lifecycle/sync/account/deletion or target operation, beginner validation or formal publication approval |
| October 21, 2026 | Authored and reviewed IDN-008 revision 1.0 on exact identity/profile/account and explicit transform inputs, leading-zero types, observation/history evidence, competing hypotheses, preview/process/consumer boundaries and verified cause-based correction; JSON, two diagrams, two two-column tables, eight cases and work-email transfer; all eight Module 6 lessons authored and COR-001 reserved | Documentation-based author review; fictional input/configuration/processing/results, no live source/profile/transform/account/correlation/identity/sync or target operation, beginner validation or formal publication approval |
| October 21, 2026 | Authored and reviewed COR-001 revision 1.0, opening Module 7 with collection versus association, configured/default paths, uncorrelated and wrong links, owner/evidence distinctions, approved matching-input correction, manual persistence and downstream boundaries; two diagrams, two two-column tables, eight cases and project-intake transfer; reserved COR-002 | Documentation-based author review; fictional source/identity/account/matching and correction evidence, no live source/profile/correlation/account/identity/reset/deletion/sync or target operation, beginner validation or formal publication approval |
| October 22, 2026 | Authored and reviewed COR-002 revision 1.0 on selected account/identity fields, independent identity mapping, schema roles, correlation-searchable eligibility versus Search, representation/case and circular dependencies, preview/current/evaluation boundaries; JSON, two diagrams, two two-column tables, eight cases and contractor transfer; reserved COR-003 | Documentation-based author review; fictional data and results, no actual API/schema/mapping/searchability/processing/correlation/sync or target operation, beginner validation or formal publication approval |
| October 22, 2026 | Authored and reviewed COR-003 revision 1.0 on account/person identifiers, population uniqueness, independent availability/coverage, consistent meaning and qualified representation, stability/non-reuse, email reassignment and rehire, matching percentages and maintained data contracts; two diagrams, two two-column tables, eight cases and acquisition transfer; reserved COR-004 | Documentation-based author review; fictional policies, data and supplied results, no actual schema/key/correlation/identity/association/reset/deletion/sync or target operation, beginner validation or formal publication approval |
| October 22, 2026 | Authored and reviewed COR-004 revision 1.0 on ordered configured comparisons, criterion versus overall results, alternatives versus AND/voting, case/default naming behavior, conflicting/ambiguous evidence, configuration/reevaluation/manual boundaries and UI/historical limits; two diagrams, two two-column tables, eight cases and contractor-source transfer; reserved COR-005 | Documentation-based author review; fictional records, configuration and supplied results, no real criteria/schema/account/identity/association/reset/deletion/sync or target operation, beginner validation or formal publication approval |
| October 22, 2026 | Authored and reviewed COR-005 revision 1.0 on missing/unusable values, absent versus null/empty/spaces/placeholder data, missing identity inputs, no candidate, ambiguous or contradictory evidence and wrong existing links; JSON, two diagrams, two two-column tables, eight cases and cause-based 100-record queue; reserved COR-006 | Documentation-based author review; fictional records and supplied correction, no actual tenant/API/configuration/correlation/deletion/reset/sync or target operation, beginner validation or formal publication approval |
| October 22, 2026 | Authored and reviewed COR-006 revision 1.0 on saved criteria versus data/relationships, optimized skip and unoptimized evaluation, automatic/manual/ISC-created links, identity and account input changes, schema/default boundaries, historical evidence and dependent writes/reversal; two diagrams, two two-column tables, eight cases and 400-account migration; reserved COR-007 | Documentation-based author review; fictional records and supplied outcomes, no real configuration/schema/aggregation/processing/correlation/flag/account/reset/deletion/sync or target change, beginner validation or formal publication approval |
| October 22, 2026 | Authored and reviewed COR-007 revision 1.0 on approved manual relationship correction, duplicate-name/exact-record selection, account-update/file paths, persistent links, unfixed feed/shared-criteria defects, wrong-link and import outcomes, conditional writes and Remove/Delete/reset distinctions; two diagrams, two two-column tables, eight cases and 80-proposed-row transfer; reserved COR-008 | Documentation-based author review; fictional records and supplied outcomes, no actual tenant/API/account update/file import/schema/correlation/processing/reset/deletion/sync or target operation, beginner validation or formal publication approval |
| October 22, 2026 | Authored and reviewed COR-008 revision 1.0 on manager reference versus identity relationship, dual configuration, profile-priority/first-non-null selection, processing and candidate preparation, null versus non-null no-match behavior, hierarchy concerns and separate approval/campaign/sync effects; two diagrams, two two-column tables, eight cases and 120-employee transfer; reserved COR-009 | Documentation-based author review; fictional records and supplied outcomes, no actual tenant/API/source/profile/priority/mapping/correlation/processing/approval/campaign/sync or target operation, beginner validation or formal publication approval |
| October 22, 2026 | Authored and reviewed COR-009 revision 1.0 integrating collection/intake, selected account matching, persistent wrong links, manager dual setup/source selection, evaluation and cause-specific safe correction/evidence; two diagrams, two two-column tables, eight cases and 90-record transfer; completed authoring of all nine Module 7 lessons and reserved TRN-001 | Documentation-based author review; fictional records and supplied results, no actual tenant/API/source/profile/mapping/correlation/processing/import/reset/deletion/sync or target operation, beginner validation or formal publication approval |
| October 22, 2026 | Authored and reviewed TRN-001 revision 1.0 on direct mapping versus justified calculated values, field meaning/type, implicit/explicit inputs and account selection, normalization versus translation, missing/list boundaries and calculation/application/consumer evidence; two diagrams, two two-column tables, eight cases and 100-mapping transfer; opened Module 8 with one complete lesson and reserved TRN-002 | Documentation-based author review; fictional records and supplied outcomes, no actual tenant/API/source/profile/mapping/transform/processing/role/sync or target operation, beginner validation or formal publication approval |
| October 22, 2026 | Authored and reviewed TRN-002 revision 1.0 on transform JSON/name/type/configuration and nested input value tracing, implicit versus explicit data, account/source context, syntax versus supported/business behavior and calculation/application/consumer evidence; two JSON definitions, two diagrams, two tables, eight cases and Department Code transfer; reserved TRN-003 | Documentation-based author review; fictional records and supplied results, no actual tenant/API/source/profile/mapping/transform/aggregation/processing/provisioning or target operation, beginner validation or formal publication approval |
| October 22, 2026 | Authored and reviewed TRN-003 revision 1.0 on approved string normalization, exact component/combined trim and separator tracing, concat/join and case boundaries, meaningful characters/codes, missing policy, collisions and calculation/application/consumer evidence; two JSON definitions, two diagrams, two tables, eight cases and family-first name transfer; reserved TRN-004 | Documentation-based author review; fictional records and supplied results, no actual tenant/API/source/profile/mapping/transform/aggregation/processing/provisioning or target operation, beginner validation or formal publication approval |
