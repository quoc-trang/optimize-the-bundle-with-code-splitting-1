import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import App from "../src/App.vue";

// you should write tests in order to verify the user's solution
// these test will run to verify the user's solution

let app;
beforeEach(() => {
  app = mount(App);
});

describe("The challenge", () => {
  it("sanity check", () => {
    console.log(app);
    expect(true).toBe(true);
  });
});
