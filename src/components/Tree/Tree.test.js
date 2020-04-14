import React from "react";
import { render, fireEvent } from "@testing-library/react";

import initialTree from "../../mocks/initialTree";

import useTree from "./useTree";
import Tree from "./Tree";

test("Does typechecking on objectTree", () => {
  const stub = jest.spyOn(console, "error");

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
  const { getByText } = render(<Tree initialTree={initialTree} />);

  const yoYo = getByText("yo.yo");

  console.log(yoYo);
});
