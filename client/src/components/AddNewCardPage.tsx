// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

import NavBar from "./NavBar";
// import { useRef } from "react";
// import { readFileSync } from "fs";
import { fetchSpeechToText } from "../helpers/fetchHelper";

function AddNewCardPage() {
  // variables
  // const audioRef = useRef(null);
  const url: string = "http://localhost:8080/";

  // handler
  const handleAudioSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const audioInput = document.getElementById(
      "audioInput"
    ) as HTMLInputElement;
    const audio = audioInput.files?.[0];

    const reader = new FileReader();
    let base64AudioFile;

    reader.addEventListener(
      "load",
      async () => {
        const initialResult = reader.result;
        base64AudioFile = initialResult?.slice(23);
        // console.log(initialResult);
        const sampleRateHertz = 48000;
        // const content = base64AudioFile;
        const encoding = "MP3";
        const languageCode = "ja";

        const body = {
          content: base64AudioFile,
          encoding: encoding,
          sampleRateHertz: sampleRateHertz,
          languageCode: languageCode,
        };
        // console.log(body);

        const response = await fetchSpeechToText(url, body);
        console.log(await response?.text());
      },
      false
    );

    if (audio) {
      reader.readAsDataURL(audio);
    }
  };

  return (
    <>
      <NavBar />
      <main className="border-solid border-black border-1 h-dvh flex flex-col items-center">
        <h1 className="m-3 text-3xl font-bold underline ">Add New Card Page</h1>
        <form onSubmit={handleAudioSubmit}>
          <label htmlFor="">Choose an audio file:</label>
          <input
            className="bg-white m-3 border-black border-solid border-1"
            type="file"
            accept=".mp3"
            id="audioInput"
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
