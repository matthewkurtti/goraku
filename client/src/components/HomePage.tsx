import { JSX, useState } from "react";
import NavBar from "./NavBar";
import { User, Deck } from "../globalTypes";

type HomePageProps = {
  setPage: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
  setLoggedInUser: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
  loggedInUser: User | null;
};

const HomePage: React.FC<HomePageProps> = (props) => {
  // variable and useStates
  const [deck, setDeck] = useState<Deck | null>(null);

  // useEffect

  // handlers

  const getDeck = async () => {};

  return (
    <>
      <NavBar
        setPage={props.setPage}
        setLoggedInUser={props.setLoggedInUser}
        loggedInUser={props.loggedInUser}
      />
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      <main className="flex flex-col items-center p-5">
        <h1 className="text-2xl">{props.loggedInUser?.username}'s' Decks: </h1>
      </main>
    </>
  );
};

export default HomePage;
