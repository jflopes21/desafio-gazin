import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "vitest";
import { App } from "../src/App";
import React from "react";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("Should be able to see the App on screen", () => {
    expect(screen.getByText("Desenvolvedores")).toBeInTheDocument();
  });

  test("Should render buttons for adding and editing levels", () => {
    expect(screen.getByText("Alterar Nível")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar Nível")).toBeInTheDocument();
  });

  test("Should render button for adding developers", () => {
    expect(screen.getByText("Cadastrar Desenvolvedor")).toBeInTheDocument();
  });

  test("Should render a table", () => {
    expect(screen.getByTestId("table")).toBeInTheDocument();
  });
});
