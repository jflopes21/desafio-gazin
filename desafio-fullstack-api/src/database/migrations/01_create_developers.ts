import type { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("desenvolvedores", (table) => {
    table.increments("id");
    table.integer("nivelId").references("id").inTable("niveis");
    table.text("nome").notNullable;
    table.string("sexo", 1).notNullable;
    table.date("datanascimento").notNullable;
    table.integer("idade").notNullable;
    table.text("hobby").notNullable;
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("desenvolvedores");
}

