import NavBar from "./NavBar";
import { useRef } from "react";
import { readFileSync } from "fs";

function AddNewCardPage() {
  // variables
  const audioRef = useRef(null);

  // handler
  const handleAudioSubmit = () => {
    const audioFile = audioRef.current.value;
    const sampleRate = 48000;
    const content = readFileSync(audioFile).toString("base64");
  };

  return (
    <>
      <NavBar />
      <main className="border-solid border-black border-1 h-dvh flex flex-col items-center">
        <h1 className="m-3 text-3xl font-bold underline ">Add New Card Page</h1>
        <form action={handleAudioSubmit}>
          <label htmlFor="">Choose an audio file:</label>
          <input
            className="bg-white m-3 border-black border-solid border-1"
            type="file"
            accept=".mp3"
            ref={audioRef}
            required
          />
          <button className="bg-white" type="submit">
            Submit
          </button>
        </form>
        <h2>Front</h2>
        <div className="w-1/2 bg-white">(empty) </div>
        <h2>Back</h2>
        <div className="w-1/2 bg-white">(empty)</div>
      </main>
    </>
  );
}

export default AddNewCardPage;
