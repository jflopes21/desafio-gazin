import { Request, Response } from "express";
import knex from "../database/connection";
import { AppError } from "../utils/AppError";

class DevelopersController {
  constructor() {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.calculateAge = this.calculateAge.bind(this);
  }

  private calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  async create(request: Request, response: Response) {
    const { nome, hobby, nivelId, sexo, datanascimento } = request.body;

    if (!nome || !hobby || !nivelId || !sexo || !datanascimento) {
      throw new AppError("É necessário informar todos os campos!", 400);
    }

    const isDeveloperExists = await knex("desenvolvedores")
      .where({ nome })
      .first();
    if (isDeveloperExists) {
      throw new AppError(`O Desenvolvedor(a) ${nome} já está cadastrado!`, 400);
    }

    const level = await knex("niveis").where('id', nivelId)
    if(level.length === 0){
      throw new AppError(`O Nível informado para esse Dev não existe!`, 400);
    }

    const age = this.calculateAge(datanascimento);

    await knex("desenvolvedores").insert({
      nome,
      hobby,
      nivelId,
      sexo,
      datanascimento,
      idade: age,
    });

    return response.json({
      status: 201,
      message: `Desenvolvedor(a) ${nome} criado com sucesso!`,
    });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, hobby, nivelId, sexo, datanascimento } = request.body;

    const developer = await knex("desenvolvedores").where({ id }).first();
    if (!developer) {
      throw new AppError("Desenvolvedor(a) informado não existe!", 400);
    }

    developer.nome = nome ?? developer.nome;
    developer.hobby = hobby ?? developer.hobby;
    developer.nivelId = nivelId ?? developer.nivelId;
    developer.sexo = sexo ?? developer.sexo;
    developer.datanascimento = datanascimento ?? developer.datanascimento;
    developer.idade =
      this.calculateAge(developer.datanascimento) ?? developer.idade;

    await knex("desenvolvedores").where({ id }).update(developer);

    return response.json({
      status: 200,
      message: `Desenvolvedor(a) ${developer.nome} editado com sucesso!`,
    });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const developer = await knex("desenvolvedores").where({ id }).first();

    if (!developer) {
      throw new AppError(`Desenvolvedor(a) ${id} não existe!`, 400);
    }

    await knex("desenvolvedores").where({ id }).delete();

    return response.json({
      status: 204,
      message: `Desenvolvedor(a) ${developer.nome} removido com sucesso!`,
    });
  }

  async index(request: Request, response: Response) {
    const developers = await knex("desenvolvedores").select("desenvolvedores.*", "niveis.nivel")
    .join("niveis", "desenvolvedores.nivelId", "niveis.id");
    if (developers.length === 0) {
      throw new AppError("Não há desenvolvedores cadastrados!", 404);
    }
    return response.json(developers);
  }
}

export { DevelopersController };
