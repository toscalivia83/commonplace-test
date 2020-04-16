import React, { useState } from "react";
import { UserFormDetails } from "../../types/app";
import styles from "./UserForm.module.css";

const UserForm = ({ options, handleSubmit }: UserFormProps): React.ReactElement => {
  const [userFormDetails, setUserFormDetails] = useState({ emailAddress: "", optionChosen: "1", comments: "" });

  const handleSubmitClick = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    await handleSubmit(userFormDetails);
  };

  const onChange = (fieldName: string, fieldValue: string): void => {
    setUserFormDetails({ ...userFormDetails, [fieldName]: fieldValue });
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
          <select className={styles.select}>
            {options.map((option, index) =>
              <option key={index}>{option}</option>
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
    </div>
  );
};

export default UserForm;

interface UserFormProps {
  options: string[];
  handleSubmit: (userFormDetails: UserFormDetails) => Promise<void>;
}