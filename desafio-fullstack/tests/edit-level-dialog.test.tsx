import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "vitest";
import { EditLevelDialog } from "../src/components/edit-level-dialog";
import { Dialog } from "../src/components/ui/dialog";
import React from "react";

const mockLevels = [
  { id: "1", nivel: "Junior" },
  { id: "2", nivel: "Pleno" },
  { id: "3", nivel: "Senior" },
];

describe("EditLevelDialog", () => {

  beforeEach(() => {
    render(
      <Dialog open>
        <EditLevelDialog
          setState={() => {}}
          setLevelState={() => {}}
          levels={mockLevels}
        />
      </Dialog>
    );
  })

  test("Should render the dialog with the title 'Editar/Excluir nível'", () => {
    expect(screen.getByText("Editar/Excluir nível")).toBeInTheDocument();
  });

  test("Should render form field for selecting a level", () => {
    expect(screen.getByLabelText("Nível")).toBeInTheDocument();
  });

  test("Should render form field for entering a new value", () => {
    expect(screen.getByLabelText("Novo valor")).toBeInTheDocument();
  });

  test("Should render 'Excluir' and 'Editar' buttons", () => {
    expect(screen.getByText("Excluir")).toBeInTheDocument();
    expect(screen.getByText("Editar")).toBeInTheDocument();
  });
});
