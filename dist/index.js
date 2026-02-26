"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/faq-accordion.ts
  var FaqAccordionController = class {
    tabLinks = [];
    accordionItems = [];
    init() {
      this.initTabNav();
      this.initAccordionItems();
    }
    // ─── Left-side tab navigation ───────────────────────────────────────────────
    initTabNav() {
      const links = document.querySelectorAll('[dev-target="faq-tab"]');
      if (!links.length) {
        console.error('No [dev-target="faq-tab"] elements found');
        return;
      }
      links.forEach((link) => {
        this.tabLinks.push(link);
        link.addEventListener("click", (e) => {
          e.preventDefault();
          this.handleTabClick(link);
        });
      });
    }
    handleTabClick(clickedLink) {
      const targetId = clickedLink.getAttribute("goto");
      if (!targetId) return;
      const section = document.getElementById(targetId);
      if (!section) {
        console.error(`No element found with id="${targetId}"`);
        return;
      }
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      this.tabLinks.forEach((l) => l.classList.remove("is-active"));
      clickedLink.classList.add("is-active");
    }
    // ─── Accordion open / close ──────────────────────────────────────────────────
    initAccordionItems() {
      const items = document.querySelectorAll('[dev-target="faq-item"]');
      if (!items.length) {
        console.error('No [dev-target="faq-item"] elements found');
        return;
      }
      items.forEach((item) => {
        this.accordionItems.push(item);
        const header = item.querySelector('[dev-target="faq-header"]');
        if (!header) return;
        header.addEventListener("click", () => {
          this.toggleAccordion(item);
        });
      });
    }
    toggleAccordion(item) {
      const isOpen = item.classList.contains("is-open");
      const group = item.closest('[dev-target="faq-group"]');
      if (group) {
        group.querySelectorAll('[dev-target="faq-item"]').forEach((sibling) => {
          sibling.classList.remove("is-open");
        });
      }
      if (!isOpen) {
        item.classList.add("is-open");
      }
    }
    destroy() {
      this.tabLinks = [];
      this.accordionItems = [];
    }
  };

  // src/index.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    const faqAccordionController = new FaqAccordionController();
    faqAccordionController.init();
  });
})();
//# sourceMappingURL=index.js.map
