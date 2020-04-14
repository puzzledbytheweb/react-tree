import { useState } from "react";

const useOpen = (initialValue = false) => {
  const [open, setOpen] = useState(initialValue);

  const toggleOpen = () => setOpen(!open);

  return { open, toggleOpen, setOpen };
};

export default useOpen;
