import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddCell from "./AddCell";

test("Displays form to add node", () => {
  const onAddCellMock = jest.fn();

  const { getByRole } = render(<AddCell onAddCell={onAddCellMock} />);

  const button = getByRole("button");
  const divContainingForm = button.previousSibling;

  // queryByRole does not throw an error when it can't find the element
  expect(divContainingForm).not.toBeVisible();

  fireEvent(
    button,
    new MouseEvent("click", {
      bubbles: true,
    })
  );

  expect(divContainingForm).toBeVisible();
});
