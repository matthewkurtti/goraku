/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("deck_card", function (table) {
    table.increments("id").primary();
    table.integer("deck_id").references("deck.id").notNullable;
    table.integer("card_id").references("card.id").notNullable;
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("deck_card");
};
