import React from "react";
import { AnswerResponse } from "../../types/app";

import styles from "./PreviousAnswers.module.css";

const PreviousAnswers = ({ answers }: Props): React.ReactElement => {
  return <div>
    {answers.length && answers.map((answer, index) => 
      <div key={index} className={styles.answerContainer}>
        <p>Email Address: {answer.emailAddress}</p>
        <p>Option chosen:{answer.optionChosen}</p>
        <p>Comments: {answer.comments}</p>
      </div>
    )}
    {!answers.length && "No answers yet :)"}
  </div>;
};

export default PreviousAnswers;

interface Props {
  answers: AnswerResponse[];
}