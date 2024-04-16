import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("desenvolvedores").insert([
    {
      nome: "João Francisco",
      hobby: "Cerveja",
      nivelId: 7,
      sexo: "M",
      idade: 21,
      datanascimento: "2002-08-21",
    },
  ]);
}
