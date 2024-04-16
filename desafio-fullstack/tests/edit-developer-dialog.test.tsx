import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "vitest";
import { EditDeveloper } from "../src/components/edit-developer-dialog";
import { Dialog } from "../src/components/ui/dialog";
import React from "react";

const mockDeveloper = {
  id: "1",
  nome: "João Francisco",
  nivel: "Senior",
  datanascimento: "2002-08-21",
  idade: 21,
  sexo: "M",
  hobby: "Programação",
};

const mockLevels = [
  { id: "1", nivel: "Junior" },
  { id: "2", nivel: "Pleno" },
  { id: "3", nivel: "Senior" },
];

describe("EditDeveloper", () => {
  beforeEach(() => {
    render(
      <Dialog open>
        <EditDeveloper
          developer={mockDeveloper}
          setState={() => {}}
          setLevelState={() => {}}
          levels={mockLevels}
        />
      </Dialog>
    );
  });

  test("Should render the dialog with the title 'Editar/Excluir desenvolvedor'", () => {
    expect(
      screen.getByText("Editar/Excluir desenvolvedor")
    ).toBeInTheDocument();
  });

  test("Should render form fields for name, level, birth date, sex, and hobby", () => {
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Nível")).toBeInTheDocument();
    expect(screen.getByLabelText("Nascimento")).toBeInTheDocument();
    expect(screen.getByLabelText("Sexo")).toBeInTheDocument();
    expect(screen.getByLabelText("Hobby")).toBeInTheDocument();
  });

  test("Should render 'Excluir' and 'Salvar' buttons", () => {
    expect(screen.getByText("Excluir")).toBeInTheDocument();
    expect(screen.getByText("Salvar")).toBeInTheDocument();
  });
});
