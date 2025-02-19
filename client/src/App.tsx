import "./App.css";
import { useState, useEffect } from "react";
import AddNewCardPage from "./components/AddNewCardPage";
import HomePage from "./components/HomePage";
import DeckPage from "./components/DeckPage";
import ListOfCardsPage from "./components/ListOfCardsPage";
import StudyPage from "./components/StudyPage";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import { User } from "./globalTypes";
import { getData } from "./helpers/fetchHelper";
import NavBar from "./components/NavBar";

function App() {
  // useStates and variables
  const url: string =
    process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080/";
  const [page, setPage] = useState<string>("");
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  // helper function

  // check to see if the user has a valid session token on page load
  const checkIfLoggedIn = async () => {
    const result = await getData(url, "api/auth/user");

    if (
      result.message === "Unauthorized" ||
      result.message === "User not found"
    ) {
      setLoggedInUser(null);
    } else {
      setLoggedInUser(result);
    }
  };

  // useEffects
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  useEffect(() => {
    checkIfLoggedIn();
  }, [page]);

  return (
    <>
      {page === "homepage" && loggedInUser ? (
        <HomePage
          setPage={setPage}
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser}
        />
      ) : page === "deckpage" && loggedInUser ? (
        <DeckPage />
      ) : page === "listofcards" && loggedInUser ? (
        <ListOfCardsPage />
      ) : page === "study" && loggedInUser ? (
        <StudyPage />
      ) : page === "addnewcard" && loggedInUser ? (
        <AddNewCardPage />
      ) : page === "signup" ? (
        <SignUpPage />
      ) : (
        <LoginPage setPage={setPage} setLoggedInUser={setLoggedInUser} />
      )}
    </>
  );
}

export default App;
