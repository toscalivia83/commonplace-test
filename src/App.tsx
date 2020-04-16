import React, { useEffect, useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm/UserForm";
import ApiClient from "./service/ApiClient";
import { UserFormDetails, CurrentPage, AnswerResponse } from "./types/app";
import PreviousAnswers from "./components/PreviousAnswers/PreviousAnswers";

const App = (): React.ReactElement => {
  const [options, setOptions] = useState([] as string[]);
  const [previousUserAnswers, setPreviousUserAnswers] = useState([] as AnswerResponse[]);
  const [currentPage, setCurrentPage] = useState(CurrentPage.UserForm);

  const handleSubmit = async (userForm: UserFormDetails): Promise<void> => {
    await ApiClient.postUserForm(userForm);
    setCurrentPage(CurrentPage.PreviousAnswers);
  };

  const renderPage = (currentPage: string): React.ReactElement => {
    switch(currentPage) {
      case CurrentPage.UserForm:
        return <UserForm options={options} handleSubmit={handleSubmit} />;
      case CurrentPage.PreviousAnswers:
        return <PreviousAnswers answers={previousUserAnswers} />;
      default:
        return <UserForm options={options} handleSubmit={handleSubmit} />;
    }
  };

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const optionsResponse = await ApiClient.getOptions();
      setOptions(optionsResponse.result?.options || [] as string[]);
      const answersResponse = await ApiClient.getUserAnswers();
      setPreviousUserAnswers(answersResponse.result || [] as AnswerResponse[]);
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Common place test - survey</h1>
      {renderPage(currentPage)}
    </div>
  );
};

export default App;
