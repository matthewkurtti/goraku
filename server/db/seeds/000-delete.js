/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("deck_card").del();
  await knex("card").del();
  await knex("deck").del();
  await knex("users").del();
};
