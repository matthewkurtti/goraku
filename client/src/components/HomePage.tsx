import { useEffect } from "react";
import { User, Deck } from "../globalTypes";
import { getData, postData } from "../helpers/fetchHelper";

type HomePageProps = {
  setPage: Function;
  setLoggedInUser: Function;
  loggedInUser: User | null;
  decks: Deck[] | null;
  setDecks: Function;
  setSelectedDeck: Function;
};

const HomePage: React.FC<HomePageProps> = (props) => {
  // variable and useStates
  const url: string =
    import.meta.env.MODE === "development" ? "http://localhost:8080/" : "/";

  // useEffect
  useEffect(() => {
    getDecks();
  }, []);

  useEffect(() => {
    console.log("new deck added");
  }, [props.decks]);

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

  const handleAddingNewDeck = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const newDeckInput = document.getElementById("newdeck") as HTMLInputElement;
    const givenNewDeck = newDeckInput.value;
    const reqObj = {
      deckName: givenNewDeck,
    };
    const response = await postData(
      url,
      `api/deck/${props.loggedInUser?.id}`,
      reqObj
    );
    if (response.message === "Deck added successfully") {
      const newDecks = props.decks;
      newDecks?.push(response.deck);
      props.setDecks(newDecks);
    }
  };

  return (
    <>
      <main className="flex flex-col items-center p-5">
        <h1 className="text-2xl">{props.loggedInUser?.username}'s' Decks: </h1>
        <form action="" onSubmit={handleAddingNewDeck}>
          <label htmlFor="" className="m-2 p-2">
            New Deck Name:{" "}
          </label>
          <input
            type="text"
            className="bg-white m-2 p-2 border-line border-black border-1"
            id="newdeck"
          />
          <button
            type="submit"
            className="bg-white border-line border-black border-1 hover:border-secondary-accent cursor-pointer m-2 p-2"
          >
            Add
          </button>
        </form>
        <ul>
          {props.decks?.map((deck) => (
            <li
              className="bg-white m-3 p-3 border-solid border-black border-1 cursor-pointer hover:border-secondary-accent"
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
