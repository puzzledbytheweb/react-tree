import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ButtonWithForm from "./ButtonWithForm";
import "../../fontawesome";

test("Displays form after clicking button", () => {
  const onSubmitMock = jest.fn();

  const { getByRole } = render(
    <ButtonWithForm
      formInitialValues={{
        name: "",
      }}
      onSubmit={onSubmitMock}
      button={<button>Add a new Root!</button>}
    />
  );

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
