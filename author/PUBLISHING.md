# Repository and GitHub Pages

Repository: https://github.com/TedxHarry/ISC_Theory_Learning

Reading site: https://tedxharry.github.io/ISC_Theory_Learning/

## Source and deployment

The existing ISC_Theory course folder is the repository root. Markdown lessons in lessons/ remain the editable teaching source. GitHub Pages builds the main branch at the repository root using its supported Jekyll build.

_config.yml defines the project base path and excludes authoring material from the reading site. The original lessons do not need added front matter: the supported optional-front-matter plugin and path defaults apply _layouts/lesson.html. Relative diagram links remain valid because lessons retain their directory and HTML basename.

The course index and shared lesson navigation read _data/course.yml. Add each newly published lesson there, preserving its permanent lesson ID and listing its Markdown source and corresponding HTML path.

The complete working course files, diagram sources, reference records, and teaching specification are in the repository. The reading site includes available lessons and assets only. Exclusion from Pages is a presentation choice, not repository access control; the repository is public.

## Updating the site

Save and review the affected lesson. Update the course manifest when adding a lesson. Review the local changes, commit them, and push main. GitHub Pages rebuilds the reading site from that branch.

Check the Pages build result and the live affected lesson after a push. Verify the complete content, links, images, tables, and diagrams. Saving or deploying a lesson does not change its learner-validation or publication-review status.

## Publishing scope

Initial deployment covers seven existing lessons: SYS-001 through SYS-006 and the FND-001 foundation pilot. The rest of the curriculum remains planned. No glossary interaction, learner account system, progress tracking, or analytics is added.

As of the Module 2.2 authoring update, the working-edition manifest includes eight lessons, adding FND-002. Module 2.3, FND-003, remains planned. Keep displayed availability separate from beginner validation and formal publication approval.

The Module 2.3 authoring update adds FND-003, bringing the working-edition manifest to nine lessons. FND-004, the introductory entitlement/access-profile/role relationship lesson, remains planned. Author review, deployment checks, and learner validation remain distinct.

The Module 2.4 update adds FND-004, bringing the working-edition manifest to ten lessons. FND-005, covering sources, access applications, catalogs, and sign-in experiences, remains planned. Deployment does not establish learner validation or formal publication approval.

The Module 2.5 update adds FND-005, bringing the working-edition manifest to eleven lessons. FND-006, on object IDs, account identifiers, display names, and references, remains planned. Request/catalog explanation does not add a glossary UI or change the site's publishing architecture.

The Module 2.6 update adds FND-006, bringing the working-edition manifest to twelve lessons. FND-007, on one identity with multiple accounts, remains planned. Identifier examples use fictional stand-ins, not runnable API payloads. Deployment does not establish beginner validation or formal publication approval.

The Module 2.7 update adds FND-007, bringing the working-edition manifest to thirteen lessons. All seven Module 2 lessons are authored. ARC-001, the opening tenant/customer-responsibilities lesson in Module 3, remains planned. The site still has no interactive glossary; author review, deployment verification, beginner validation, and formal publication approval remain distinct.

The Module 3.1 update adds ARC-001, bringing the working-edition manifest to fourteen lessons and opening the Where does the work run? module. ARC-002, on Virtual Appliances and clusters, remains planned. The existing shared lesson layout and navigation are reused; no glossary interaction or new application behavior is introduced. Deployment verification does not establish learner validation or formal publication approval.

The Module 3.2 update adds ARC-002, bringing the working-edition manifest to fifteen lessons. ARC-003, on SaaS connectors and their connection path, remains planned. VA diagrams are text-based and editable; this update does not add a deployment tool, operational connection test, or interactive glossary. Author review, publication-format checks, beginner validation, and formal approval remain distinct.

The Module 3.3 update adds ARC-003, bringing the working-edition manifest to sixteen lessons. ARC-004, on IQService's role when a connector requires it, remains planned. This lesson distinguishes hosted application location from connector execution and retains complete read/change diagrams, worked cases, and transfer reasoning. No glossary interaction or connector implementation is added; deployment checks don't establish tenant execution, beginner validation, or formal approval.

The Module 3.4 update adds ARC-004, bringing the working-edition manifest to seventeen lessons. ARC-005, on connection dependencies and operation support, remains planned. IQService teaching retains two editable text diagrams, six worked cases and a read-operation transfer. No installation tool, security change, native script, glossary interaction or live connector execution is added; author review, deployment checks, beginner validation and formal approval remain distinct.

The Module 3.5 update adds ARC-005, bringing the working-edition manifest to eighteen lessons. ARC-006, on UI/API/automation interactions with platform capabilities, remains planned. Complete dependency and error-origin reasoning, two editable diagrams, two tables, five investigations and a project-design transfer are retained. No network test tool, credential change, unrestricted access change or glossary interaction is implemented; deployment doesn't establish tenant execution or beginner validation.

The Module 3.6 update adds ARC-006, bringing the working-edition manifest to nineteen lessons. ARC-007, on ISC sign-in, identity providers and source password operations, remains planned. The complete lesson includes two editable diagrams, two tables, five cases and an unattended-automation design transfer. No token, API client, real Workflow, backend service or glossary interaction is created; deployment verification remains separate from tenant execution, beginner validation and formal approval.

The Module 3.7 update adds ARC-007, bringing the working-edition manifest to twenty lessons. ARC-008, on requesting, executing and observing work, remains planned. Three editable diagrams, two comparison tables, seven worked cases and a purchasing-design transfer retain the full explanation. No real login, credential/password change, MFA reset, source modification, trust update or glossary interaction is performed; deployment is separate from tenant execution, learner validation and formal approval.

The Module 3.8 update adds ARC-008, bringing the working-edition manifest to twenty-one lessons and all eight authored Module 3 lessons. SRC-001, opening Module 4 with source purpose/population, remains planned. The full UTC trace, three editable diagrams, two tables, six worked cases and payroll-design transfer are retained. No real request, connector operation, access repair, aggregation, ticket or retry is performed; deployment verification isn't tenant execution, learner validation or formal publication approval.

The Module 4.1 update adds SRC-001, bringing the working-edition manifest to twenty-two lessons and opening the source-design module through existing module-driven navigation. SRC-002 remains planned. The complete explanation retains two editable diagrams, two tables, six worked cases and a payroll-export design transfer. No source, filter, credential, external account, provisioning setting or glossary interaction is changed in a real tenant; publication checks remain separate from learner validation and formal approval.

The Module 4.2 update adds SRC-002, bringing the working-edition manifest to twenty-three lessons. SRC-003 remains planned. The complete lesson retains two editable diagrams, two tables, seven worked cases and an acquisition-design transfer. The profile-priority correction and observed values are fictional; no profile, source, account association, authentication connection or external account is changed in a real tenant. Deployment checks are separate from learner validation and formal approval.

The Module 4.3 update adds SRC-003, bringing the working-edition manifest to twenty-four lessons. SRC-004 remains planned. The complete lesson retains an eight-row capability/readiness matrix, two editable diagrams, seven worked cases and a payroll-proposal transfer. Its FulfillHub configuration, target API gaps, successful operations and disable denial are fictional. No source mode, endpoint, credential, permission, account, group, fulfillment route or tenant configuration is changed; deployment checks remain separate from learner validation and formal approval.

The navigation update adds independent native module disclosures and explicit Show lessons / Hide lessons controls. Collapsing the whole panel releases its desktop column; its toggle stays outside the module-list scroller. Current-module and home defaults are covered by rendered-template regression tests across every available lesson. Run `npm ci` and `npm test` for navigation changes, plus the normal Pages build and live browser checks. Development packages and tests are excluded from Pages. This is a shared navigation change, not a lesson revision or learner-validation result.

The Module 4.4 update adds SRC-004, bringing the working-edition manifest to twenty-five lessons. SRC-005 remains planned. The complete lesson retains two editable diagrams, two tables, a selected schema-property JSON fragment, seven worked cases and a payroll-feed transfer. The InvoiceTrack records, account contracts, input mapping correction and all outcomes are fictional. No schema, account key, source boundary, correlation, credential or target is changed in a real tenant. Existing collapsible panel/module navigation and lesson content remain intact; deployment checks remain separate from learner validation and formal approval.

The Module 4.5 update adds SRC-005, bringing the working-edition manifest to twenty-six lessons. SRC-006 remains planned. The full lesson retains two editable diagrams, two tables, selected JSON/CSV examples, seven worked cases and an HR-feed transfer. RouteBoard data, conversion defects, corrected results and business/date assumptions are fictional. No schema, parser, transform, account, membership or tenant setting is changed in a real system. Existing native navigation remains unchanged; deployment checks are separate from learner validation and formal approval.

The Module 4.6 update adds SRC-006, bringing the working-edition manifest to twenty-seven lessons. SRC-007 remains planned. The complete lesson includes two editable diagrams, two tables, two selected JSON records, seven worked cases and an application-design transfer. SpendLedger records, mapping correction and collection outcomes are fictional. No real source schema, entitlement designation, membership, metadata, type or tenant setting is changed. Existing panel/module navigation remains unchanged; deployment verification is separate from learner validation and formal approval.
