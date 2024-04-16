import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("niveis", (table) => {
    table.increments("id").primary();
    table.text("nivel").notNullable;
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("niveis");
}
