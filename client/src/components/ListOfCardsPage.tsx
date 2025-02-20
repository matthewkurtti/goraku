import { Card, Deck } from "../globalTypes";

type ListOfCardsPageProps = {
  cards: Card[];
  selectedDeck: Deck | null;
};

const ListOfCardsPage: React.FC<ListOfCardsPageProps> = (props) => {
  return (
    <>
      <main className="flex flex-col items-center p-5">
        <h1 className="text-3xl m-1 p-1 font-bold underline">
          {props.selectedDeck?.name} List of Cards
        </h1>
        <ul>
          {props.cards?.map((card) => (
            <li className="bg-white m-3 p-3 border-solid border-black border-1 cursor-pointer hover:border-secondary-accent">
              <p>Front: {card.front}</p>
              <p>Back: {card.back}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default ListOfCardsPage;
