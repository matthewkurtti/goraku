/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("deck_card").insert([
    { id: 1, deck_id: 1, card_id: 1 },
    { id: 2, deck_id: 1, card_id: 2 },
    { id: 3, deck_id: 1, card_id: 3 },
    { id: 4, deck_id: 2, card_id: 4 },
    { id: 5, deck_id: 2, card_id: 5 },
    { id: 6, deck_id: 2, card_id: 6 },
    { id: 7, deck_id: 3, card_id: 7 },
    { id: 8, deck_id: 3, card_id: 8 },
    { id: 9, deck_id: 3, card_id: 9 },
    { id: 10, deck_id: 3, card_id: 10 },
  ]);
};
