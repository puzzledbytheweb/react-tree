import React from "react";
import { render, fireEvent, within, cleanup } from "@testing-library/react";
import "../../fontawesome";

import initialTree from "../../mocks/initialTree";

import Tree from "./Tree";

/* These are the tests to test the drag and drop functionality.
Unfortunately I couldn't find a way to test this without having to 
dig too much. The library I've used does not provide a simple testing guide
like React DnD does https://react-dnd.github.io/react-dnd/docs/testing. I'm thinking of
maybe investigating a bit further and try to come up with a simple API to allow
programmatic dragging and dropping to ease testing with this library, but I think it may be a 
bit out of scope for this challenge. */

test("Drags a leaf node to up in its branch", async () => {});

test("Drags a root node to another root, changing the order", () => {});

test("Drags a node to another branch", () => {});

test("Prevents dragging a node deeper in its own branch", () => {});

test("Drags a node with children and then drags one of the children", () => {});

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

  const yoYo = getByText("yo.yo").parentNode.parentNode;

  const yoYoChildName = "newChildFromYoYo";

  const addNewNodeFormDivYoYo = yoYo.querySelector('div[role="addNode"]');
  const addNewNodeFormYoYo = addNewNodeFormDivYoYo.getElementsByTagName(
    "form"
  )[0];

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

  cleanup();
});

test("Adds a new item to a node", () => {
  const { queryByText, getByText } = render(<Tree initialTree={initialTree} />);

  const yo = getByText("yo").parentElement.parentElement;
  const yoNewItemName = "newItemFromYo";

  const addNewNodeItemButtonYo = within(yo).getByText("Add Property")
    .parentNode;

  const adjacentDiv = addNewNodeItemButtonYo.previousSibling;

  const addNewNodeFormInputYo = adjacentDiv.querySelector('input[name="name"]');

  const addNewNodeItemFormYo = addNewNodeFormInputYo.parentNode;

  expect(queryByText(yoNewItemName)).toBeFalsy();

  fireEvent.change(addNewNodeFormInputYo, {
    target: { value: yoNewItemName },
  });

  fireEvent.submit(addNewNodeItemFormYo);

  expect(queryByText(yoNewItemName)).toBeTruthy();
});
