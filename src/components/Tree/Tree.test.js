import React from "react";
import { render } from "@testing-library/react";

import initialTree from "../../mocks/initialTree";
import Tree from "./Tree";

test("does typechecking on objectTree", () => {
  const stub = jest.spyOn(console, "error");

  const firstObjectTree = {
    name: "first",
    id: "1",
    child: [{ name: "first.first", id: "1.1", child: null }],
  };

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

  const item1ToCheck = getByText("yo.item");
  const item2ToCheck = getByText("yo.yo.yo.item");
  const item3ToCheck = getByText("bo.bo.bo.item");

  console.log(item1ToCheck, item2ToCheck, item3ToCheck);
});
