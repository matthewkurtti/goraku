// imports
const express = require("express");
const knex = require("./knex");

// variables
const app = express();
const port = process.env.PORT || 8080;

// --------------- Middleware -------------
// if (!process.env.NODE_ENV) {
//   app.use(
//     cors({
//       origin: "http://localhost:5173",
//       credentials: true,
//     })
//   );
// } else {
//   app.use("/", express.static(path.join(__dirname, "../../client/dist")));
// }

app.use(express.json());

// --------------- Routes -----------------------

// get all cards

app.get("/api/card", async (req, res) => {
  try {
    const card = await knex.select("*").from("card").limit(100);

    res.json({ card });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// --------------- Start the server ---------------------

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
