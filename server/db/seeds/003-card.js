/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("card").insert([
    { id: 1, front: "質問 1", back: "answer 1" }, // come back and make sure these japanese characters show up right when pulled
    { id: 2, front: "question 2", back: "answer 2" },
    { id: 3, front: "question 3", back: "answer 3" },
    { id: 4, front: "question 4", back: "answer 4" },
    { id: 5, front: "question 5", back: "answer 5" },
    { id: 6, front: "question 6", back: "answer 6" },
    { id: 7, front: "question 7", back: "answer 7" },
    { id: 8, front: "question 8", back: "answer 8" },
    { id: 9, front: "question 9", back: "answer 9" },
    { id: 10, front: "question 10", back: "answer 10" },
  ]);
};
