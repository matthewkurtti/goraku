// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

import { useState, useEffect } from "react";
// import { readFileSync } from "fs";
import { fetchSpeechToText, fetchTranslation } from "../helpers/fetchHelper";
import { Deck, User } from "../globalTypes";
import { postData } from "../helpers/fetchHelper";

type AddNewCardPageProps = {
  selectedDeck: Deck | null;
  loggedInUser: User;
};

const AddNewCardPage: React.FC<AddNewCardPageProps> = (props) => {
  // variables
  const [front, setFront] = useState<string>("front");
  const [back, setBack] = useState<string>("back");

  // const audioRef = useRef(null);
  const url: string =
    process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080/";

  useEffect(() => {}, [front]);

  // handlers
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
        // first, make front of card using google speech to text
        const initialResult = reader.result;
        base64AudioFile = initialResult?.slice(23);
        const sampleRateHertz = 48000;
        const encoding = "MP3";
        const languageCode = "ja";

        const body = {
          content: base64AudioFile,
          encoding: encoding,
          sampleRateHertz: sampleRateHertz,
          languageCode: languageCode,
        };

        const response = await fetchSpeechToText(url, body);
        const newFront = await response?.text();
        if (newFront) {
          setFront(newFront);
        }
        // next, make back of card using google translate api
        const tranlateObjBody = {
          text: newFront,
          target: "en",
        };
        const translationResponse = await fetchTranslation(
          url,
          tranlateObjBody
        );
        const newBack = await translationResponse?.text();
        if (newBack) {
          setBack(newBack);
        }
      },
      false
    );

    if (audio) {
      reader.readAsDataURL(audio);
    }
  };

  const handleAddingNewCard = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const frontInput = document.getElementById("front") as HTMLInputElement;
    const givenFront = frontInput.value;

    const backInput = document.getElementById("back") as HTMLInputElement;
    const givenBack = backInput.value;

    const newCardObj = {
      front: givenFront,
      back: givenBack,
    };

    const response = await postData(
      url,
      `api/card/${props.selectedDeck?.id}/${props.loggedInUser.id}`,
      newCardObj
    );
    console.log(response.message);
  };

  return (
    <>
      <main className="border-solid border-black border-1 h-dvh flex flex-col items-center">
        <h1 className="m-3 text-3xl font-bold underline ">
          Add a new card to {props.selectedDeck?.name}
        </h1>
        <form onSubmit={handleAudioSubmit}>
          <label htmlFor="">Choose an audio file:</label>
          <input
            className="bg-white m-3 border-black border-solid border-1"
            type="file"
            accept=".mp3"
            id="audioInput"
            required
          />
          <button
            className="bg-white m-2 p-1 border-line border-black border-1 hover:border-secondary-accent cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </form>
        <form onSubmit={handleAddingNewCard} className="w-3/4" action="">
          <label htmlFor="">Front: </label>
          <textarea className="bg-white m-3 w-1/3" value={front} id="front" />
          <label htmlFor="">Back: </label>
          <textarea className="bg-white m-3 w-1/3" value={back} id="back" />
          <button
            className="bg-white m-2 p-1 border-line border-black border-1 hover:border-secondary-accent cursor-pointer"
            type="submit"
          >
            Add new card
          </button>
        </form>
      </main>
    </>
  );
};

export default AddNewCardPage;
