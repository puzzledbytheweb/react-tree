import React from "react";
import { render } from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";

import Branch from "./Branch";
import { UUIDV4_NAMESPACE } from "../../constants";

test("renders a Branch with 3 levels", () => {
  const objectBranch = {
    name: "yo",
    id: uuidv4(UUIDV4_NAMESPACE),
    children: [
      {
        name: "yo.yo",
        id: uuidv4(UUIDV4_NAMESPACE),
        children: [
          { name: "yo.yo.yo", id: uuidv4(UUIDV4_NAMESPACE), children: null },
        ],
      },
    ],
  };

  const { getByText } = render(<Branch objectBranch={objectBranch} />);

  const lastChild = getByText("yo.yo.yo");

  const previousToLastChild =
    lastChild.parentNode.parentNode.parentNode.firstChild;

  const firstChild =
    lastChild.parentNode.parentNode.parentNode.parentNode.firstChild;

  expect(firstChild.textContent === getByText("yo").textContent).toBe(true);
  expect(
    previousToLastChild.textContent === getByText("yo.yo").textContent
  ).toBe(true);
});
