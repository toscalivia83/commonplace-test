import React from "react";
import { AnswerResponse, SortAnswer } from "../../types/app";
import styles from "./PreviousAnswers.module.css";

const displayAnswers = (answers: AnswerResponse[]): React.ReactElement[] =>
  answers.map((answer, index) =>
    <div key={index} className={styles.answerItem}>
      <p>Option chosen:{answer.optionChosen}</p>
      <p>Comments: {answer.comments}</p>
    </div>
  );

const PreviousAnswers = ({ answers }: Props): React.ReactElement => {
  const answersByEmail: SortAnswer = {} as {[key: string]: AnswerResponse[]};
  answers.forEach(answer => {
    if (answersByEmail[answer.emailAddress] === undefined) {
      answersByEmail[answer.emailAddress] = [];
    }
    answersByEmail[answer.emailAddress] = answersByEmail[answer.emailAddress].concat(answer);
  });
  return <div>
    <h2>Here are the previous answers of other user we received:</h2>
    {answers.length > 0 && Object.keys(answersByEmail)
      .map((email, indexEmail) =>
        <div key={indexEmail} className={styles.answerContainer}>
          <div>Email address: {email}</div>
          {displayAnswers(answersByEmail[email])}
        </div>
      )}
    {!answers.length && "No answers yet :)"}
  </div>;
};

export default PreviousAnswers;

interface Props {
  answers: AnswerResponse[];
}