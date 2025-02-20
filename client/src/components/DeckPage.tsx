import { useEffect } from "react";
import { Deck } from "../globalTypes";
// import { getData } from "../helpers/fetchHelper";

type DeckPageProps = {
  selectedDeck: Deck | null;
  setPage: Function;
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
      <main className="flex flex-col items-center p-5">
        <h1 className="text-2xl m-1 p-1">{props.selectedDeck?.name}</h1>
        <div
          onClick={() => {
            props.setPage("listofcards");
          }}
          className="bg-white flex justify-center items-center w-1/3 m-2 p-2 border-black border-line border-1 hover:border-secondary-accent cursor-pointer"
        >
          <p>List of cards</p>
        </div>
        <div
          onClick={() => {
            props.setPage("addnewcard");
          }}
          className="bg-white flex justify-center items-center w-1/3 m-2 p-2 border-black border-line border-1 hover:border-secondary-accent cursor-pointer"
        >
          <p>Add new card</p>
        </div>
        <div
          onClick={() => {
            props.setPage("study");
          }}
          className="bg-white flex justify-center items-center w-1/3 m-2 p-2 border-black border-line border-1 hover:border-secondary-accent cursor-pointer"
        >
          <p>Study</p>
        </div>
      </main>
    </>
  );
};

export default DeckPage;
