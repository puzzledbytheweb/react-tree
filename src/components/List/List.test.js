import React from "react";
import { render, screen } from "@testing-library/react";
import List from "./List";
import ListCell from "../ListCell/ListCell";

test("renders a ListCell with a nested List", () => {
  const { getByText, container } = render(
    <List data-testid="parent">
      <ListCell data-testid="first">
        First
        <List>
          <ListCell data-testid="second">Second</ListCell>
        </List>
      </ListCell>
    </List>
  );

  const parentList = container.firstElementChild;
  const firstEl = getByText("First");
  const secondEl = getByText("Second");

  expect(parentList.firstChild === firstEl).toBe(true);
  expect(firstEl.firstElementChild === secondEl.parentNode).toBe(true);
});
