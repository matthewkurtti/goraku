/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex("users").insert([
    {
      id: 1,
      username: "user1",
      password: "password1",
      email: "email1@gmail.com",
    },
    {
      id: 2,
      username: "user2",
      password: "password2",
      email: "email2@gmail.com",
    },
    {
      id: 3,
      username: "user3",
      password: "password3",
      email: "email3@gmail.com",
    },
  ]);
};
