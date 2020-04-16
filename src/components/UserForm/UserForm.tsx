import React, { useState } from "react";
import EmailValidator from "email-validator";
import { UserFormDetails } from "../../types/app";
import styles from "./UserForm.module.css";

const validateText = (value: string): boolean => {
  const trimmedValue = value.trim();
  return Boolean(trimmedValue);
};

const isValidEmail = (email: string): boolean => {
  return validateText(email)
    && EmailValidator.validate(email);
};

const getErrorMessages = (userFormDetails: UserFormDetails): string[] => {
  const errorMessages = [];
  if (!validateText(userFormDetails.comments)) {
    errorMessages.push("Please enter valid comments");
  }
  if (!isValidEmail(userFormDetails.emailAddress)) {
    errorMessages.push("Please enter valid email address");
  }
  if (!validateText(userFormDetails.optionChosen)) {
    errorMessages.push("Select an option");
  }
  return errorMessages;
};

const UserForm = ({ options, handleSubmit }: UserFormProps): React.ReactElement => {
  const [userFormDetails, setUserFormDetails] = useState({ emailAddress: "", optionChosen: "", comments: "" });
  const [errorMessages, setErrorMessages] = useState([] as string[]);

  const handleSubmitClick = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    const errorMessages = getErrorMessages(userFormDetails);
    setErrorMessages(errorMessages);
    if (errorMessages.length === 0) {
      await handleSubmit(userFormDetails);
    }
  };

  const onChange = (fieldName: string, fieldValue: string): void => {
    setUserFormDetails({ ...userFormDetails, [fieldName]: fieldValue });
  };

  const onOptionSelect = (optionChosen: string): void => {
    setUserFormDetails({ ...userFormDetails, optionChosen });
  };

  return (
    <div>
      <form className={styles.userForm}>
        <div className={styles.formItem}>
          <label className={styles.label}>Email address</label>
          <input
            name="emailAddress"
            type="email"
            placeholder="Please type a valid email address..."
            value={userFormDetails.emailAddress}
            onChange={(event: React.FormEvent<HTMLInputElement>): void => onChange("emailAddress", event.currentTarget.value)}
            className={styles.inputField}/>
        </div>

        <div className={styles.formItem}>  
          <label className={styles.label}>What could you do if you weren t self isolating?</label>
          <select onChange={(evt): void => onOptionSelect(evt.target.value)} className={styles.select}>
            <option
              value={""}
              style={{ display: "none" }}
            ></option>
            {options.map((option, index) =>
              <option key={index} value={option}>{option}</option>
            )}
          </select>
        </div>
        
        <div className={styles.formItem}>
          <label className={styles.label}>Do you have any comments on the above?</label>
          <textarea
            onChange={(event): void => onChange("comments", event.currentTarget.value)}
            className={styles.textarea}></textarea>
        </div>
      </form>
      <button onClick={handleSubmitClick}>Submit your answers</button>
      {errorMessages.length > 0 && errorMessages.map((errorMessage, index) => <div key={index}>{errorMessage}</div>)}
    </div>
  );
};

export default UserForm;

interface UserFormProps {
  options: string[];
  handleSubmit: (userFormDetails: UserFormDetails) => Promise<void>;
}