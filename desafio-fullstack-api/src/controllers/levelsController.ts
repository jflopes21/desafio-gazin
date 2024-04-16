import { NextFunction, Request, Response } from "express";
import knex from "../database/connection";
import { AppError } from "../utils/AppError";

class LevelsController {
  async create(request: Request, response: Response) {
    const { nivel } = request.body;
    if (!nivel) {
      throw new AppError("O campo de nível não foi preenchido", 400);
    }

    const trx = await knex.transaction();

    const isLevelExists = await trx("niveis").where("nivel", nivel).first();
    if (isLevelExists) {
      await trx.rollback();
      throw new AppError("Este nível já foi cadastrado!", 400);
    }

    await trx("niveis").insert({ nivel });
    const createdLevelId = await trx("niveis").select("id").where("nivel", nivel).first();
    await trx.commit();

    return response.status(201).json({
      "status": 201,
      "id": createdLevelId.id,
      "message": `Nível ${nivel} cadastrado com sucesso!`
    })
  }

  async index(request: Request, response: Response) {
    const levels = await knex("niveis").select("niveis.*");
    if (levels.length === 0) {
      throw new AppError("Não há níveis cadastrados!", 404);
    }
    return response.json(levels);
  }

  async update(request: Request, response: Response){
    const {id} = request.params;
    const {nivel} = request.body;

    if (!nivel) {
      throw new AppError("Não foi informado o novo valor do nível", 400);
    }

    const level = await knex("niveis").where({id}).first();
    if (!level) {
      throw new AppError("Nível informado não existe!", 400);
    }

    level.nivel = nivel ?? level.nivel;

    await knex("niveis").where({id}).update(level)

    return response.json({
      "status": 200,
      "message": `Nível ${level.id} editado com sucesso!`
    });

  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const level = await knex("niveis").where({id}).first();
    if (!level) {
      throw new AppError("Nível informado não existe!", 400);
    }

    const developer = await knex("desenvolvedores").where('nivelId', id).first();
    if(developer){
      throw new AppError("Não será possível excluir o nível pois há Desenvolvedores relacionados!", 400);
    }

    const levelName = level.nivel;
    await knex("niveis").where({ id }).delete();

    return response.status(204).json({
      "status" : 204,
      "message": `Nível ${levelName} Excluído com sucesso!`
    });
  }

}

export { LevelsController };
