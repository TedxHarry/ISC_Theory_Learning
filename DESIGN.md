# ISC Theory reading site

This is an English content site for the existing beginner ISC theory course. Its primary job is sustained reading and moving between complete lessons. The user requested GitHub Pages publication of the saved work.

## Direction

A technical field guide with a quiet lesson index. Keep the instructional examples and diagrams prominent. Use a white page, navy text, and a restrained teal link color. Avoid decorative imagery, marketing statistics, and repeated card containers.

## Runtime tokens

The canonical runtime values live in assets/site.css under :root:
paper #ffffff; surface #eff4f8; ink #123047; muted #526574; accent #006c67; rule #d8e2ea; focus #b84c00; scrollbar thumb #8b9daa.

Segoe UI and system sans-serif fallbacks handle navigation and headings. Georgia and Times New Roman fallbacks handle long lesson text. No remote font or tracking request is needed.

## Layout and behavior

Desktop: lesson navigation beside one reading column, maximum 53rem. Small screens: navigation above content with native disclosure. A shared layout owns the header, navigation, reading region, footer, and keyboard skip link.

Native links navigate. Native details/summary controls the lesson list. Tables and preformatted diagrams scroll within their own regions. The document remains the vertical scrolling surface. Print removes navigation and retains the lesson.

## Content contract

Original lesson Markdown is unchanged. Jekyll's optional-front-matter plugin renders it using the lesson layout. The course manifest in _data/course.yml names available lessons and their source paths. Future lessons must be added there when published.

Planning, author references, and review records are stored in the repository and excluded from Pages. The site clearly identifies a working edition; deployment does not mean learner validation or publication review is complete.

The planned press-and-hold glossary is not implemented by this publishing setup.
