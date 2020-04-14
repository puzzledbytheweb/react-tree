import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import "../../fontawesome";

import initialTree from "../../mocks/initialTree";

import Tree from "./Tree";

test("Does typechecking on objectTree", () => {
  // We're preventing console to be poluted with console error calls
  const stub = jest.spyOn(console, "error").mockImplementation(() => {});

  render(<Tree initialTree={initialTree} />);

  expect(stub).not.toHaveBeenCalled();

  const initialTreeWithErrors = [...initialTree];

  initialTreeWithErrors.push({
    title: "no",
    id: "fakeId123",
    children: null,
  });

  render(<Tree initialTree={initialTreeWithErrors} />);

  expect(stub).toHaveBeenCalled();
});

test("Checks an item in any branch of the tree", () => {
  const { getByText } = render(<Tree initialTree={initialTree} />);

  const item1Checkbox = getByText("yo.item").nextSibling;
  const item2Checkbox = getByText("yo.yo.yo.item").nextSibling;
  const item3Checkbox = getByText("bo.bo.bo.item").nextSibling;

  expect(item1Checkbox.checked).toBe(true);
  expect(item2Checkbox.checked).toBe(true);
  expect(item3Checkbox.checked).toBe(false);

  fireEvent.click(item1Checkbox);
  fireEvent.click(item2Checkbox);
  fireEvent.click(item3Checkbox);

  expect(item1Checkbox.checked).toBe(false);
  expect(item2Checkbox.checked).toBe(false);
  expect(item3Checkbox.checked).toBe(true);
});

test("Adds a new node to the tree", () => {
  const { queryByText, getByText } = render(<Tree initialTree={initialTree} />);

  const yoYo = getByText("yo.yo").parentElement;
  const yoYoChildName = "newChildFromYoYo";

  const addNewNodeFormYoYo = within(yoYo).getByTestId("addNodeForm");
  const addNewNodeFormInputYoYo = addNewNodeFormYoYo.querySelector(
    'input[name="name"]'
  );

  expect(queryByText(yoYoChildName)).toBeFalsy();

  fireEvent.change(addNewNodeFormInputYoYo, {
    target: { value: yoYoChildName },
  });
  fireEvent.submit(addNewNodeFormYoYo);

  expect(queryByText(yoYoChildName)).toBeTruthy();
});

test("Removes a node from the tree", () => {
  const { queryByText } = render(<Tree initialTree={initialTree} />);

  let yoYo = queryByText("yo.yo").parentElement;

  expect(yoYo).toBeTruthy();
  const removeButton = within(yoYo).getByTestId("removeButton");

  fireEvent.click(removeButton);

  yoYo = queryByText("yo.yo");

  expect(yoYo).toBeFalsy();
});

test("Adds a new item to a node", () => {
  const { queryByText, getByText } = render(<Tree initialTree={initialTree} />);

  const yoYo = getByText("yo").parentElement;
  const yoYoNewItemName = "newItemFromYoYo";

  const addNewNodeItemFormYoYo = within(yoYo).getByTestId("addNodeItemForm");
  const addNewNodeFormInputYoYo = addNewNodeItemFormYoYo.querySelector(
    'input[name="name"]'
  );

  expect(queryByText(yoYoNewItemName)).toBeFalsy();

  fireEvent.change(addNewNodeFormInputYoYo, {
    target: { value: yoYoNewItemName },
  });

  fireEvent.submit(addNewNodeItemFormYoYo);

  expect(queryByText(yoYoNewItemName)).toBeTruthy();
});
