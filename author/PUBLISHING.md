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
