import { v4 as uuidv4 } from "uuid";
import { UUIDV4_NAMESPACE } from "./constants";

export const createNewEmptyNode = () => ({
  name: "",
  id: uuidv4(UUIDV4_NAMESPACE),
  children: null,
});

export const createNewEmptyNodeItem = () => ({
  name: "",
  id: uuidv4(UUIDV4_NAMESPACE),
  checked: false,
});
