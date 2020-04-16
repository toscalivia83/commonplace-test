export interface UserFormDetails {
  emailAddress: string;
  optionChosen: string;
  comments: string;
}

export interface SortAnswer {
  [key: string]: AnswerResponse[];
}

export enum CurrentPage {
  UserForm = "UserForm",
  PreviousAnswers = "PreviousAnswers",
}

export interface AnswerResponse {
  emailAddress: string;
  optionChosen: string;
  comments: string;
}

export interface OptionsResponse {
  options: string[];
}