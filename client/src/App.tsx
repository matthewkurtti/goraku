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

function App() {
  // useStates and variables
  const url: string =
    process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080/";
  const [page, setPage] = useState<string>("");
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);

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
    console.log(cards);
  }, [page]);

  useEffect(() => {
    console.log("new deck added");
  }, [decks]);

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
          <DeckPage
            selectedDeck={selectedDeck}
            setPage={setPage}
            setCards={setCards}
            loggedInUser={loggedInUser}
          />
        </>
      ) : page === "listofcards" && loggedInUser ? (
        <>
          <NavBar
            setPage={setPage}
            setLoggedInUser={setLoggedInUser}
            loggedInUser={loggedInUser}
          />
          <ListOfCardsPage cards={cards} selectedDeck={selectedDeck} />
        </>
      ) : page === "study" && loggedInUser ? (
        <>
          <StudyPage />
        </>
      ) : page === "addnewcard" && loggedInUser ? (
        <>
          <NavBar
            setPage={setPage}
            setLoggedInUser={setLoggedInUser}
            loggedInUser={loggedInUser}
          />
          <AddNewCardPage
            selectedDeck={selectedDeck}
            loggedInUser={loggedInUser}
          />
        </>
      ) : page === "signup" ? (
        <SignUpPage
          setPage={setPage}
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser}
        />
      ) : (
        <LoginPage
          setPage={setPage}
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser}
        />
      )}
    </>
  );
}

export default App;
