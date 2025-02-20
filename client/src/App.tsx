import "./App.css";
import { useState, useEffect } from "react";
import AddNewCardPage from "./components/AddNewCardPage";
import HomePage from "./components/HomePage";
import DeckPage from "./components/DeckPage";
import ListOfCardsPage from "./components/ListOfCardsPage";
import StudyPage from "./components/StudyPage";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import { Card, User, Deck } from "./globalTypes";
import { getData } from "./helpers/fetchHelper";
import NavBar from "./components/NavBar";

enum PageView {
  HomePage = "HOME_PAGE",
}

function App() {
  // useStates and variables
  const url: string =
    process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080/";
  const [page, setPage] = useState<string>("");
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [decks, setDecks] = useState<Deck[] | null>(null);
  const [cards, setCards] = useState<Card[] | null>(null);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>();

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
        <>
          <NavBar
            setPage={setPage}
            setLoggedInUser={setLoggedInUser}
            loggedInUser={loggedInUser}
          />
          <HomePage
            setPage={setPage}
            setLoggedInUser={setLoggedInUser}
            loggedInUser={loggedInUser}
            decks={decks}
            setDecks={setDecks}
            setSelectedDeck={setSelectedDeck}
          />
        </>
      ) : page === "deckpage" && loggedInUser ? (
        <>
          <NavBar
            setPage={setPage}
            setLoggedInUser={setLoggedInUser}
            loggedInUser={loggedInUser}
          />
          <DeckPage selectedDeck={selectedDeck} setCards={setCards} />
        </>
      ) : page === "listofcards" && loggedInUser ? (
        <>
          <NavBar
            setPage={setPage}
            setLoggedInUser={setLoggedInUser}
            loggedInUser={loggedInUser}
          />
          <ListOfCardsPage cards={cards} />
        </>
      ) : page === "study" && loggedInUser ? (
        <>
          <NavBar
            setPage={setPage}
            setLoggedInUser={setLoggedInUser}
            loggedInUser={loggedInUser}
          />
          <StudyPage />
        </>
      ) : page === "addnewcard" && loggedInUser ? (
        <>
          <NavBar
            setPage={setPage}
            setLoggedInUser={setLoggedInUser}
            loggedInUser={loggedInUser}
          />
          <AddNewCardPage />
        </>
      ) : page === "signup" ? (
        <SignUpPage />
      ) : (
        <LoginPage setPage={setPage} setLoggedInUser={setLoggedInUser} />
      )}
    </>
  );
}

export default App;
