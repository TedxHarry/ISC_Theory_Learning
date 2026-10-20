# ISC Theory: course register

Last updated: October 20, 2026.

This is the working record of what exists, what has been reviewed, and what comes next. A planned topic is not a completed lesson. Author review and real learner validation are recorded separately.

## Current position

The course design and teaching specification are saved. Eleven complete learner lessons have been authored: **SYS-001, Why does an organization need ISC?**, revision 1.3; **SYS-002, Signing in, using a permission, and where ISC fits**, revision 1.1; **SYS-003, Who owns what when access needs to change?**, revision 1.1; **SYS-004, What should be allowed, what ISC records, and what actually works**, revision 1.1; **SYS-005, Building access management is only the beginning**, revision 1.1; **SYS-006, Follow the access problem across the systems**, revision 1.1; **FND-001, Identity and account**, revision 1.3; **FND-002, Sources, connectors, and the systems they connect to**, revision 1.0; **FND-003, Account, identity, and entitlement attributes**, revision 1.0; **FND-004, Entitlements, access profiles, and roles**, revision 1.0; and **FND-005, Sources, access applications, catalogs, and sign-in**, revision 1.0.

FND-001 was written as a foundation pilot before the course was developed in sequence. It belongs with Module 2's object relationships. It does not mean that Module 1, Module 2, or the whole course is complete.

The current lesson is FND-005. It has received documentation-based author review and is ready for the user's read-through and further feedback, not marked learner-validated or publication-ready. Keep revisions in the same lesson file. Do not open several lesson drafts in parallel.

FND-001 established the teaching approach as a pilot and has now been reviewed in its Module 2.1 position. Authoring has continued through Module 2.5, FND-005. Resolve known content issues before opening the next writing task and track learner validation separately.

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
| Next action | Read FND-005 and apply feedback to this same file; then author Module 2.6 |

The example manages expense access through directory memberships; no separate ExpenseHub source is assumed. Existing application accounts and a separately configured sign-in trust/mapping are explicit conditions. Requester segmentation is not treated as a recipient eligibility gate, catalog changes are not revocation, and access applications are not presented as SSO configuration or a universal application launcher.

## Source-citation relocation

SYS-001 revision 1.2 and FND-001 revision 1.3 remove inline documentation citations and the closing source-only sections from learner files. The [author reference records](author/REFERENCE_RECORDS.md) preserve every original source URL, section mapping, and prior documentation-check notes. The teaching prose, exercises, worked answers, and diagram remain unchanged.

Teaching specification v2.5 makes this separation mandatory for future lessons. It also records the requested press-and-hold glossary behavior for a future interactive format; that interaction is not implemented in these Markdown files.

This cleanup does not constitute fresh technical verification, tenant testing, learner validation, or publication approval.

## Next lesson in course order

The first five Module 2 lessons are authored: FND-001 has been reviewed in its course position, followed by FND-002 through FND-005. Learner validation and formal publication review remain separate pending stages.

The next new lesson is Module 2.6:

**Object IDs, account identifiers, display names, and reference relationships.**

- Reserved permanent ID: `FND-006`.
- Planned file: `lessons/FND-006_Object_IDs_Account_Identifiers_and_References.md`.
- Status: planned only; no lesson file created.
- Scope: ISC object identifiers versus external account and business identifiers, display labels versus stable references, source/type context, how related objects refer to each other, and why renaming or changing an identifier can have different effects. Avoid an exhaustive API-field inventory.
- Resolve known feedback on FND-005 before opening the next writing task.

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
