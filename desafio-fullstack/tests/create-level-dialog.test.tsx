import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "vitest";
import { CreateLevelDialog } from "../src/components/create-level-dialog";
import { Dialog } from "../src/components/ui/dialog";
import React from "react";

describe("CreateLevelDialog", () => {
  beforeEach(() => {
    render(
      <Dialog open>
        <CreateLevelDialog setLevelState={() => {}} />
      </Dialog>
    );
  });
  test("Should render the dialog with the title 'Novo nível'", () => {
    expect(screen.getByText("Novo nível")).toBeInTheDocument();
  });

  test("Should render form field for 'Nível'", () => {
    expect(screen.getByLabelText("Nível")).toBeInTheDocument();
  });

  test("Should render 'Salvar' and 'Cancelar' buttons", () => {
    expect(screen.getByText("Salvar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });
});
