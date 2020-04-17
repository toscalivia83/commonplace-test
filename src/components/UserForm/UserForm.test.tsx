/* eslint-disable @typescript-eslint/unbound-method */
import React from "react";
import { mount } from "enzyme";
import UserForm from "./UserForm";

const optionsToDisplay = [
  "a",
  "b",
  "c",
];

const flushPromise = async (): Promise<unknown> => {
  return new Promise<unknown>((resolve: (value?: unknown) => void): NodeJS.Immediate => setImmediate(resolve));
};

describe("<UserForm /> suite", () => {
  it("should display correctly", () => {
    const wrapper = mount(
      <UserForm
        options={optionsToDisplay}
        handleSubmit={jest.fn()}/>
    );

    const select = wrapper.find("select");
    
    expect(select.exists()).toBe(true);
    expect(select.children("option[value='a']").exists()).toBe(true);
    expect(select.children("option[value='b']").exists()).toBe(true);
    expect(select.children("option[value='c']").exists()).toBe(true);
  });

  it("should submit the user form", async () => {
    const wrapper = mount(
      <UserForm
        options={optionsToDisplay}
        handleSubmit={jest.fn()}/>
    );

    wrapper.find("input[name='emailAddress']").simulate("change", { target: { value: "test@domain.com" } });
    const select = wrapper.find("select");
    select.simulate("change", { target: { value: "a" } });
    wrapper.find("textarea").simulate("change", { target: { value: "test comment" } });
    
    await flushPromise();
    wrapper.update();
    
    wrapper.find("button").simulate("click");

    await flushPromise();
    wrapper.update();
  });

  it("should display an error message if fields are incorrect", () => {
    const wrapper = mount(
      <UserForm
        options={optionsToDisplay}
        handleSubmit={jest.fn()}/>
    );

    wrapper.find("button").simulate("click");
    expect(wrapper.find(".error")).toHaveLength(3);
  });
});