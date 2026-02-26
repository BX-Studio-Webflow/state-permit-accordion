/**
 * FAQ accordion controller
 *
 * Attribute contract:
 *   [dev-target="faq-tab"]     — left-nav tab link, also carry a `goto` attr matching the section's dev-target
 *   [dev-target="faq-group"]   — wrapper for each accordion section
 *   [dev-target="faq-item"]    — single accordion row
 *   [dev-target="faq-header"]  — clickable header inside faq-item
 *   [dev-target="faq-body"]    — collapsible body inside faq-item
 *   [dev-target="faq-arrow"]   — arrow icon inside faq-header
 */

export class FaqAccordionController {
  private tabLinks: HTMLElement[] = [];
  private accordionItems: HTMLElement[] = [];

  init(): void {
    this.initTabNav();
    this.initAccordionItems();
  }

  // ─── Left-side tab navigation ───────────────────────────────────────────────

  private initTabNav(): void {
    const links = document.querySelectorAll<HTMLElement>('[dev-target="faq-tab"]');

    if (!links.length) {
      console.error('No [dev-target="faq-tab"] elements found');
      return;
    }

    links.forEach((link) => {
      this.tabLinks.push(link);

      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleTabClick(link);
      });
    });
  }

  private handleTabClick(clickedLink: HTMLElement): void {
    const targetId = clickedLink.getAttribute('goto');
    if (!targetId) return;

    const section = document.getElementById(targetId);

    if (!section) {
      console.error(`No element found with id="${targetId}"`);
      return;
    }

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });

    this.tabLinks.forEach((l) => l.classList.remove('is-active'));
    clickedLink.classList.add('is-active');
  }

  // ─── Accordion open / close ──────────────────────────────────────────────────

  private initAccordionItems(): void {
    const items = document.querySelectorAll<HTMLElement>('[dev-target="faq-item"]');

    if (!items.length) {
      console.error('No [dev-target="faq-item"] elements found');
      return;
    }

    items.forEach((item) => {
      this.accordionItems.push(item);

      const header = item.querySelector<HTMLElement>('[dev-target="faq-header"]');
      if (!header) return;

      header.addEventListener('click', () => {
        this.toggleAccordion(item);
      });
    });
  }

  private toggleAccordion(item: HTMLElement): void {
    const isOpen = item.classList.contains('is-open');

    const group = item.closest<HTMLElement>('[dev-target="faq-group"]');
    if (group) {
      group.querySelectorAll<HTMLElement>('[dev-target="faq-item"]').forEach((sibling) => {
        sibling.classList.remove('is-open');
      });
    }

    if (!isOpen) {
      item.classList.add('is-open');
    }
  }

  destroy(): void {
    this.tabLinks = [];
    this.accordionItems = [];
  }
}
