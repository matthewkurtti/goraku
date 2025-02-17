import "./App.css";
import { useState, useEffect } from "react";
import AddNewCardPage from "./components/AddNewCardPage";
import HomePage from "./components/HomePage";
import DeckPage from "./components/DeckPage";
import ListOfCardsPage from "./components/ListOfCardsPage";
import StudyPage from "./components/StudyPage";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";

function App() {
  // useStates and variables
  const [page, setPage] = useState<string>("signup");

  // useEffects
  useEffect(() => {}, [page]);

  return (
    <>
      {page === "homepage" ? (
        <HomePage />
      ) : page === "deckpage" ? (
        <DeckPage />
      ) : page === "listofcards" ? (
        <ListOfCardsPage />
      ) : page === "study" ? (
        <StudyPage />
      ) : page === "addnewcard" ? (
        <AddNewCardPage />
      ) : page === "signup" ? (
        <SignUpPage />
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
