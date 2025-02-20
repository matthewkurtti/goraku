import { useEffect } from "react";
import { Deck, User } from "../globalTypes";
import { getData } from "../helpers/fetchHelper";

type DeckPageProps = {
  selectedDeck: Deck | null;
  setPage: Function;
  setCards: Function;
  loggedInUser: User;
};

const DeckPage: React.FC<DeckPageProps> = (props) => {
  // variables
  const url: string =
    process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080/";

  // useEffects
  useEffect(() => {
    // console.log(props.selectedDeck);
    handleGettingCards();
  }, []);

  //handlers
  const handleGettingCards = async () => {
    const response = await getData(
      url,
      `api/card/${props.loggedInUser.id}/${props.selectedDeck?.id}`
    );
    props.setCards(response.allCards);
  };

  return (
    <>
      <main className="flex flex-col items-center p-5">
        <h1 className="text-3xl m-1 p-1 font-bold underline">
          {props.selectedDeck?.name}
        </h1>
        <div
          onClick={() => {
            props.setPage("listofcards");
          }}
          className="bg-white flex justify-center items-center w-1/3 m-2 p-2 border-black border-line border-1 hover:border-secondary-accent cursor-pointer"
        >
          <p className="text-2xl">List of cards</p>
        </div>
        <div
          onClick={() => {
            props.setPage("addnewcard");
          }}
          className="bg-white flex justify-center items-center w-1/3 m-2 p-2 border-black border-line border-1 hover:border-secondary-accent cursor-pointer"
        >
          <p className="text-2xl">Add new card</p>
        </div>
        <div
          onClick={() => {
            props.setPage("study");
          }}
          className="bg-white flex justify-center items-center w-1/3 m-2 p-2 border-black border-line border-1 hover:border-secondary-accent cursor-pointer"
        >
          <p className="text-2xl">Study</p>
        </div>
      </main>
    </>
  );
};

export default DeckPage;
