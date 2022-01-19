import { Selector, t } from "testcafe";

export default class Page {
  constructor() {}

  async openNav() {
    if (await Selector("button.nav-show").exists) {
      await t.click(Selector("button.nav-show"));
    } else if (await Selector("div.nav-expand").exists) {
      await t.click(Selector("div.nav-expand i"));
    }
  }

  async openPage(page) {
    await this.openNav();
    if (
      (page === "monochrome") |
      (page === "panoramas") |
      (page === "stacks") |
      (page === "scans") |
      (page === "review") |
      (page === "archive")
    ) {
      await t.click(Selector("div.nav-browse + div"));
    } else if (page === "live") {
      if (!(await Selector("div.v-list__group--active div.nav-video").visible)) {
        await t.click(Selector("div.nav-video + div"));
      }
    } else if (page === "states") {
      if (!(await Selector("div.v-list__group--active div.nav-places").visible)) {
        await t.click(Selector("div.nav-places + div"));
      }
    } else if ((page === "originals") | (page === "hidden") | (page === "errors")) {
      if (!(await Selector("div.v-list__group--active div.nav-library").visible)) {
        await t.click(Selector("div.nav-library + div"));
      }
    } else if ((page === "abouts") | (page === "feedback") | (page === "license")) {
      if (!(await Selector("div.v-list__group--active div.nav-settings").visible)) {
        await t.click(Selector("div.nav-settings + div"));
      }
    }
    await t.click(Selector(".nav-" + page));
  }

  async checkMenuItemAvailability(page, visible) {
    await this.openNav();
    if (
      (page === "monochrome") |
      (page === "panoramas") |
      (page === "stacks") |
      (page === "scans") |
      (page === "review") |
      (page === "archive")
    ) {
      await t.click(Selector("div.nav-browse + div"));
    } else if (page === "live") {
      if (await Selector(".nav-video").visible) {
        if (!(await Selector("div.v-list__group--active div.nav-video").visible)) {
          await t.click(Selector("div.nav-video + div"));
        }
      }
    } else if (page === "states") {
      if (await Selector(".nav-places").visible) {
        if (!(await Selector("div.v-list__group--active div.nav-places").visible)) {
          await t.click(Selector("div.nav-places + div"));
        }
      }
    } else if ((page === "originals") | (page === "hidden") | (page === "errors")) {
      if (await Selector(".nav-library").visible) {
        if (!(await Selector("div.v-list__group--active div.nav-library").visible)) {
          if (await Selector("div.nav-library + div").visible) {
            await t.click(Selector("div.nav-library + div"));
          }
        }
      }
    } else if ((page === "abouts") | (page === "feedback") | (page === "license")) {
      if (await Selector(".nav-settings").visible) {
        if (!(await Selector("div.v-list__group--active div.nav-settings").visible)) {
          await t.click(Selector("div.nav-settings + div"));
        }
      }
    }

    if (visible) {
      await t.expect(Selector(".nav-" + page).visible).ok();
    } else {
      await t.expect(Selector(".nav-" + page).visible).notOk();
    }
  }
}
