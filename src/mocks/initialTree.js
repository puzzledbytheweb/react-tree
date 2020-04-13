import { v4 as uuidv4 } from "uuid";
import { UUIDV4_NAMESPACE } from "../constants";

export default [
  {
    name: "yo",
    id: uuidv4(UUIDV4_NAMESPACE),
    items: [{ name: "yo.item", id: uuidv4(UUIDV4_NAMESPACE), checked: true }],
    children: [
      {
        name: "yo.yo",
        id: uuidv4(UUIDV4_NAMESPACE),
        items: [
          { name: "yo.yo.item", id: uuidv4(UUIDV4_NAMESPACE), checked: true },
        ],
        children: [
          {
            name: "yo.yo.yo",
            id: uuidv4(UUIDV4_NAMESPACE),
            children: null,
            items: [
              {
                name: "yo.yo.yo.item",
                id: uuidv4(UUIDV4_NAMESPACE),
                checked: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "bo",
    id: uuidv4(UUIDV4_NAMESPACE),
    children: [
      {
        name: "bo.bo",
        id: uuidv4(UUIDV4_NAMESPACE),
        children: [
          {
            name: "bo.bo.bo",
            id: uuidv4(UUIDV4_NAMESPACE),
            items: [
              {
                name: "bo.bo.bo.item",
                id: uuidv4(UUIDV4_NAMESPACE),
                checked: false,
              },
            ],
            children: null,
          },
        ],
      },
    ],
  },
];
