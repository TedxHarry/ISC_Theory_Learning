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

Native links navigate. The outer native details/summary control shows or hides the lesson panel with explicit Show lessons / Hide lessons labels. On desktop, hiding it removes the sidebar column and centers the reading column; the show control remains above the lesson. Narrow screens initially hide the panel using the existing small-screen initialization.

Each module uses its own independent native details/summary disclosure. The current lesson's module starts open; unrelated modules start closed. On the home page, the first module starts open. Opening one module doesn't close another. The current lesson keeps its aria-current marker. Controls support native keyboard and touch activation without custom event handlers or stored preferences.

On desktop, only the module-list region scrolls inside the sidebar, leaving the outer show/hide control reachable. On small screens, the opened navigation uses document scrolling. Tables and preformatted diagrams scroll within their own regions. The document remains the main vertical scrolling surface. Print removes navigation and retains the lesson.

## Content contract

Original lesson Markdown is unchanged. Jekyll's optional-front-matter plugin renders it using the lesson layout. The course manifest in _data/course.yml names available lessons and their source paths. Future lessons must be added there when published.

Planning, author references, and review records are stored in the repository and excluded from Pages. The site clearly identifies a working edition; deployment does not mean learner validation or publication review is complete.

The planned press-and-hold glossary is not implemented by this publishing setup.
