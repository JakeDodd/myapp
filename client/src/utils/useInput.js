import { useState, useCallback } from "react";

export default (defaultValue, callback = () => {}) => {
  const [term, setTerm] = useState(defaultValue);

  const onTermChange = useCallback(e => {
    setTerm(e.target.value);
    callback(e.target.value);
  });
  return [term, onTermChange];
};
