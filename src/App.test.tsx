/* eslint-disable @typescript-eslint/unbound-method */
import React from "react";
import { mount, ReactWrapper } from "enzyme";
import ApiClient from "./service/ApiClient";
import App from "./App";
import UserForm from "./components/UserForm/UserForm";
import { act } from "@testing-library/react";
import PreviousAnswers from "./components/PreviousAnswers/PreviousAnswers";

const CALLED_ONCE = 1;

const flushPromise = async (): Promise<unknown> => {
  return new Promise<unknown>((resolve: (value?: unknown) => void): NodeJS.Immediate => setImmediate(resolve));
};

describe("<App /> suite", () => {
  let wrapper: ReactWrapper;

  it("renders App correctly",  () => {
    wrapper = mount(<App />);
    expect(wrapper.find(UserForm).exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders App correctly with options displayed", async () => {
    ApiClient.getOptions = jest.fn().mockResolvedValue(Promise.resolve({
      statusCode: 200,
      result: { options: ["a", "b", "c", "d"] }
    }));
    ApiClient.getUserAnswers = jest.fn().mockResolvedValue(Promise.resolve({
      statusCode: 200,
      result: [{ "emailAddress":"asdfg2@wsedf.fr","optionChosen":"I would do the same","comments":"aswdfghfds" }]
    }));

    await act(async (): Promise<void> => {
      wrapper = mount(<App />);
    });

    await flushPromise();
    wrapper.update();

    expect(ApiClient.getOptions).toHaveBeenCalledTimes(CALLED_ONCE);
    expect(ApiClient.getUserAnswers).toHaveBeenCalledTimes(CALLED_ONCE);
    expect(wrapper.find(UserForm).exists()).toBeTruthy();
  });

  it("should post the valid user form and go to previous answers page", async () => {
    ApiClient.getOptions = jest.fn().mockResolvedValue(Promise.resolve({
      statusCode: 200,
      result: { options: ["a", "b", "c", "d"] }
    }));
    ApiClient.getUserAnswers = jest.fn().mockResolvedValue(Promise.resolve({
      statusCode: 200,
      result: [{ "emailAddress":"asdfg2@wsedf.fr","optionChosen":"I would do the same","comments":"aswdfghfds" }]
    }));
    ApiClient.postUserForm = jest.fn().mockResolvedValue(Promise.resolve({
      statusCode: 200,
      result: "sent"
    }));

    await act(async (): Promise<void> => {
      wrapper = mount(<App />);
    });

    wrapper.find("input[name='emailAddress']").simulate("change", { target: { value: "test@domain.com" } });
    const select = wrapper.find("select");
    select.simulate("change", { target: { value: "a" } });
    wrapper.find("textarea").simulate("change", { target: { value: "test comment" } });

    wrapper.find("button").simulate("click");

    await act(async (): Promise<void> => {
      await flushPromise();
      wrapper.update();
    });

    expect(ApiClient.postUserForm).toHaveBeenCalledTimes(CALLED_ONCE);
    expect(wrapper.find(PreviousAnswers).exists()).toBeTruthy();
  });
});
