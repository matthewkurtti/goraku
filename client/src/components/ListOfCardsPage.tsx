import { Card } from "../globalTypes";

type ListOfCardsPageProps = {
  cards: Card[];
};

const ListOfCardsPage: React.FC<ListOfCardsPageProps> = (props) => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">List of Cards Page</h1>
    </>
  );
};

export default ListOfCardsPage;
