/* eslint-disable @typescript-eslint/unbound-method */
import React from "react";
import { mount } from "enzyme";
import PreviousAnswers from "./PreviousAnswers";

const answers = [
  { "emailAddress":"email@domain.com","optionChosen":"I would do the same","comments":"comment 1" },
  { "emailAddress":"email@domain.com","optionChosen":"I would do the same","comments":"other comment 1" },
  { "emailAddress":"email2@domain.com","optionChosen":"I would do the same","comments":"comment 2" },
];

describe("<PreviousAnswers /> suite", () => {
  it("should display correctly", () => {
    const wrapper = mount(
      <PreviousAnswers
        answers={answers}/>
    );
    expect(wrapper.find(".answerContainer")).toHaveLength(2);
    expect(wrapper.find(".answerContainer")).toHaveLength(2);
    expect(wrapper.find(".answerItem")).toHaveLength(3);
  });
});