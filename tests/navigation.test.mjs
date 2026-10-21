import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { Liquid } from "liquidjs";
import { parseHTML } from "linkedom";
import { parse } from "yaml";

const root = new URL("../", import.meta.url);
const config = parse(await readFile(new URL("_config.yml", root), "utf8"));
const course = parse(await readFile(new URL("_data/course.yml", root), "utf8"));
const template = await readFile(new URL("_layouts/default.html", root), "utf8");
const engine = new Liquid({
  root: fileURLToPath(new URL("_includes/", root)),
  jekyllInclude: true,
});
engine.registerFilter("relative_url", (path) => config.baseurl + path);

async function renderNavigation(path) {
  const html = await engine.parseAndRender(template, {
    site: { ...config, data: { course } },
    page: { path, title: "Navigation test" },
    content: "<h1>Reading content stays available</h1>",
  });
  return parseHTML(html).document;
}

test("every lesson opens its own module, without expanding unrelated modules", async () => {
  for (const lesson of course.lessons) {
    const doc = await renderNavigation(lesson.source);
    const modules = [...doc.querySelectorAll("details.nav-module")];
    assert.equal(modules.length, course.modules.length, "Each module needs a disclosure control");
    const openModules = modules.filter((module) => module.hasAttribute("open"));
    assert.equal(openModules.length, 1);
    assert.equal(openModules[0].querySelector("summary").id, "nav-" + lesson.module);
    assert.equal(
      openModules[0].querySelector('a[aria-current="page"]').getAttribute("href"),
      config.baseurl + lesson.url,
    );
  }
});

test("home opens the first module without marking a lesson as current", async () => {
  const doc = await renderNavigation("index.html");
  const openModules = [...doc.querySelectorAll("details.nav-module[open]")];
  assert.equal(openModules.length, 1);
  assert.equal(openModules[0].querySelector("summary").id, "nav-system");
  assert.equal(doc.querySelectorAll('[aria-current="page"]').length, 0);
});

test("module disclosures retain every lesson link in manifest order", async () => {
  const doc = await renderNavigation(course.lessons.at(-1).source);
  for (const module of course.modules) {
    const group = doc.querySelector("#nav-" + module.id)?.parentElement;
    assert.equal(group?.localName, "details");
    assert.equal(group.firstElementChild.localName, "summary");
    assert.equal(group.hasAttribute("name"), false, "Modules must be independently expandable");
    assert.deepEqual(
      [...group.querySelectorAll("a")].map((link) => link.getAttribute("href")),
      course.lessons.filter((lesson) => lesson.module === module.id)
        .map((lesson) => config.baseurl + lesson.url),
    );
  }
});

test("the whole panel has an always-reachable native disclosure outside its scroll region", async () => {
  const doc = await renderNavigation(course.lessons.at(-1).source);
  const panel = doc.querySelector("details.course-navigation");
  assert.equal(panel?.firstElementChild.localName, "summary");
  assert.match(panel.firstElementChild.textContent, /Show lessons/);
  assert.match(panel.firstElementChild.textContent, /Hide lessons/);
  assert.ok(panel.querySelector(".navigation-scroll > nav"));
  assert.equal(panel.firstElementChild.closest(".navigation-scroll"), null);
  assert.ok(doc.querySelector("#main h1"));
});
