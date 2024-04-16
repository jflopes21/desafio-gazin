import {Knex} from 'knex'

export async function seed(knex: Knex){
    await knex('niveis').insert([
        {
            nivel: "Junior"
        }
    ]);
}