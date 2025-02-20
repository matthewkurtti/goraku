import { JSX, useEffect } from "react";
import { User, Deck } from "../globalTypes";
import { getData } from "../helpers/fetchHelper";

type HomePageProps = {
  setPage: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
  setLoggedInUser: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
  loggedInUser: User | null;
  decks: Deck[] | null;
  setDecks: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
  setSelectedDeck: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
};

const HomePage: React.FC<HomePageProps> = (props) => {
  // variable and useStates
  const url: string =
    import.meta.env.MODE === "development" ? "http://localhost:8080/" : "/";

  // useEffect
  useEffect(() => {
    getDecks();
  }, []);

  // handlers

  const getDecks = async () => {
    const response = await getData(url, `api/deck/${props.loggedInUser?.id}`);
    const decks = response.userDecks;
    props.setDecks(decks);
  };

  const handleGoingToDeckPage = async (deck: Deck) => {
    props.setSelectedDeck(deck);
    props.setPage("deckpage");
  };

  return (
    <>
      <main className="flex flex-col items-center p-5">
        <h1 className="text-2xl">{props.loggedInUser?.username}'s' Decks: </h1>
        <ul>
          {props.decks?.map((deck) => (
            <li
              className="bg-white m-3 p-3 border-solid border-black border-1 cursor-pointer"
              onClick={() => handleGoingToDeckPage(deck)}
            >
              {deck.name}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;
