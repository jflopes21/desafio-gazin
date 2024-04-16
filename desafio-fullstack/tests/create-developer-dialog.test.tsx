import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "vitest";
import { CreateDeveloperDialog } from "../src/components/create-developer-dialog";
import { Dialog } from "../src/components/ui/dialog";
import React from "react";

const mockLevels = [
  { id: "1", nivel: "Junior" },
  { id: "2", nivel: "Pleno" },
  { id: "3", nivel: "Senior" },
];

describe("CreateDeveloperDialog", () => {
  beforeEach(() => {
    render(
      <Dialog open>
        <CreateDeveloperDialog
          setState={() => {}}
          setLevelState={() => {}}
          levels={mockLevels}
        />
      </Dialog>
    );
  });
  test("Should render the dialog with the title 'Novo desenvolvedor'", () => {
    expect(screen.getByText("Novo desenvolvedor")).toBeInTheDocument();
  });

  test("Should render form fields for name, level, birth date, sex, and hobby", () => {
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Nível")).toBeInTheDocument();
    expect(screen.getByLabelText("Nascimento")).toBeInTheDocument();
    expect(screen.getByLabelText("Sexo")).toBeInTheDocument();
    expect(screen.getByLabelText("Hobby")).toBeInTheDocument();
  });

  test("Should render 'Salvar' and 'Cancelar' buttons", () => {
    expect(screen.getByText("Salvar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });
});
