import React from "react";
import { render } from "@testing-library/react";
import Tree from "./Tree";

test("does typechecking on objectTree", () => {
  const stub = jest.spyOn(console, "error");

  const firstObjectTree = {
    name: "first",
    id: "1",
    child: [{ name: "first.first", id: "1.1", child: null }],
  };

  render(<Tree objectTree={firstObjectTree} />);

  expect(stub).not.toHaveBeenCalled();

  const secondObjectTree = {
    // Notice title instead of name
    title: "second",
    id: "2",
    child: [{ name: "second.second", id: "2.1", child: null }],
  };

  render(<Tree objectTree={secondObjectTree} />);
});
