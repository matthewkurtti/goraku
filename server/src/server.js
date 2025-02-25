// imports

// create require key word
const require = createRequire(import.meta.url);

// express imports
const express = require("express");
const knex = require("./knex");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const bcrypt = require("bcrypt");
// const bodyParser = require("body-parser");

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// google api imports
import { createRequire } from "module";

const {
  googleApiSpeechToTextHandler,
} = require("./googleApiSpeechToTextHandler.js");

const { translateText } = require("./googleApiTranslate.js");

// variables
const app = express();
const port = process.env.PORT || 8080;

app.set("trust proxy", 1);

// --------------- Middleware -------------
if (!process.env.NODE_ENV) {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
} else {
  app.use("/", express.static(path.join(__dirname, "../../client/dist")));
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(
  session({
    store: new pgSession({
      conString:
        process.env.DB_URL ||
        `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// -------------- Authentication ---------------------------
// it (should allow a new user to register)
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [maxIdObj] = await knex("users").max("id");
    const newId = maxIdObj.max + 1;

    const [newUser] = await knex("users")
      .insert({
        id: newId,
        username,
        password: hashedPassword,
        email,
      })
      .returning(["id", "username", "email"]);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Database connection error.", error);
    res.status(500).json({ error: error.message });
  }
});

// it (should allow an existing user to login)
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await knex("users").where({ username }).first();

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.userId = user.id;
    req.session.username = user.username;

    res.json({
      message: "Login successful",
      userId: req.session.userId,
      username: req.session.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Database connection error.", error);
    res.status(500).json({ error: error.message });
  }
});

// Checks if a user is logged in
// it (should fetch logged in users profile from database using the userId stored in the session)
app.get("/api/auth/user", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  knex("users")
    .select("id", "username", "email")
    .where({ id: req.session.userId })
    .first()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    })
    .catch((error) => {
      console.error("Database connection error.", error);
      res.status(500).json({ error: error.message });
    });
});

// GET /api/auth/logout
// it (should log the user out)
app.get("/api/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }

    res.json({ message: "Logout  successful" });
  });
});
// ----------- Authentication (END) -----------

// --------------- Routes -----------------------

// get all cards of all decks

// app.get("/api/card", async (req, res) => {
//   try {
//     const card = await knex.select("*").from("card").limit(100);

//     res.json({ card });
//   } catch (error) {
//     console.error("Database connection error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// get all deck ids and names of a single user
app.get("/api/deck/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    if (req.session.userId != userId) {
      // make sure user who's information is requested is logged in
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userDecks = await knex
      .select("id", "name")
      .from("deck")
      .where({ users_id: userId });

    res.json({ userDecks });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// get all cards of a single deck by deck id
app.get("/api/card/:userId/:deckId", async (req, res) => {
  try {
    const userId = req.params.userId;
    if (req.session.userId != userId) {
      // make sure user who's information is requested is logged in
      return res.status(401).json({ message: "Unauthorized" });
    }
    const deckId = req.params.deckId;
    const allCardsIdsInDeck = await knex
      .select("id")
      .from("deck_card")
      .where({ deck_id: deckId });
    const allCards = [];
    for (let i = 0; i < allCardsIdsInDeck.length; i++) {
      const card = await knex
        .select("id", "front", "back")
        .from("card")
        .where({ id: allCardsIdsInDeck[i].id });
      allCards.push(card[0]);
    }
    res.json({ allCards });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// post: add new deck to user's decks
app.post("/api/deck/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { deckName } = req.body;
    if (req.session.userId != userId) {
      // make sure user who's information is requested is logged in
      return res.status(401).json({ message: "Unauthorized" });
    }
    const [maxIdObj] = await knex("deck").max("id");
    const newId = maxIdObj.max + 1;

    const [newDeck] = await knex("deck")
      .insert({
        id: newId,
        name: deckName,
        users_id: userId,
      })
      .returning(["id", "name", "users_id"]);
    res.status(201).json({ message: "Deck added successfully", deck: newDeck });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// post: add new card to card table and make new deck card reference to know which deck card is in
app.post("/api/card/:deckId/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const deckId = req.params.deckId;
    const { front, back } = req.body;
    if (req.session.userId != userId) {
      // make sure user who's information is requested is logged in
      return res.status(401).json({ message: "Unauthorized" });
    }
    const [maxIdObj] = await knex("card").max("id");
    const newId = maxIdObj.max + 1;

    // add the new card to card table
    const [newCard] = await knex("card")
      .insert({
        id: newId,
        front: front,
        back: back,
      })
      .returning(["id", "front", "back"]);

    // add the card id and deck id to deck_card table to reference which deck card is in
    const [otherMaxIdObj] = await knex("deck_card").max("id");
    const otherNewId = otherMaxIdObj.max + 1;
    const [newDeckCardReference] = await knex("deck_card")
      .insert({
        id: otherNewId,
        deck_id: deckId,
        card_id: newId,
      })
      .returning(["id", "deck_id", "card_id"]);

    res.status(201).json({
      message: "Card added successfully",
      card: newCard,
      deckCardReference: newDeckCardReference,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// google speech to text route
app.post("/api/speechtotext", async (req, res) => {
  try {
    const { content, encoding, sampleRateHertz, languageCode } = req.body;

    // console.log(req.body);

    const transcription = await googleApiSpeechToTextHandler(
      content,
      encoding,
      sampleRateHertz,
      languageCode
    );
    res.json(transcription);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: error.message });
  }
});

// google translate route
app.post("/api/translate", async (req, res) => {
  try {
    const { text, target } = req.body;
    const translationsArr = await translateText(text, target);
    const translation = translationsArr[0];
    res.json(translation);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: error.message });
  }
});

// --------------- Start the server ---------------------

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// ---------- google api test ---------------------

// google speech to text (jp) ex:

// const transcription = await googleApiSpeechToTextHandler(
//   "C:/Users/Matthew/OneDrive/Documents/Code-Chrysalis/immersive/solo-mvp/goraku/server/src/test-audio/one-piece-luffy.mp3",
//   "MP3",
//   48000,
//   "ja"
// );

// console.log(transcription);

// google translate api

// google translate ex: translateText("俺はモンキー D ルフィお前らを超えて海賊王になる男だ", "en");
