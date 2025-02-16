/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("deck").insert([
    { id: 1, name: "user1 deck 1", users_id: 1 },
    { id: 2, name: "user2 deck 1", users_id: 2 },
    { id: 3, name: "user3 deck 1", users_id: 3 },
  ]);
};
