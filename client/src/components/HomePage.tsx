import NavBar from "./NavBar";

function HomePage() {
  return (
    <>
      <NavBar />
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      <main className="flex flex-col items-center p-5">
        <h1 className="text-2xl">Decks: </h1>
      </main>
    </>
  );
}

export default HomePage;
