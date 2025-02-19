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
        process.env.DATABASE_URL ||
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

    res.json({ message: "Login succesful" });
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

app.get("/api/card", async (req, res) => {
  try {
    const card = await knex.select("*").from("card").limit(100);

    res.json({ card });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// get all deck ids and names of a single user
app.get("/api/deck/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
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
app.get("/api/card/:deckId", async (req, res) => {
  try {
    const deckId = req.params.deckId;
    const allCardsIdsInDeck = await knex
      .select("id")
      .from("deck_card")
      .where({ deck_id: deckId });
    const allCards = [];
    for (let i = 0; i < allCardsIdsInDeck.length; i++) {
      const card = await knex
        .select("front", "back")
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
