import { useEffect } from "react";
import { Deck } from "../globalTypes";
// import { getData } from "../helpers/fetchHelper";

type DeckPageProps = {
  selectedDeck: Deck | null;
  setCards: Function;
};

const DeckPage: React.FC<DeckPageProps> = (props) => {
  // variables
  // const url: string =
  //   process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080/";

  // useEffects
  useEffect(() => {
    console.log(props.selectedDeck);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Deck Page</h1>
    </>
  );
};

export default DeckPage;
