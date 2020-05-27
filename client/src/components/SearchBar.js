import React, { useState } from "react";
import useInput from "../utils/useInput";

const SearchBar = ({ onSubmit }) => {
  const [term, onTermChange] = useInput("", onSubmit);

  return (
    <div className="ui segment">
      <form onSubmit={() => false} className="ui form">
        <div className="field">
          <label>Search for Images</label>
          <input type="text" value={term} onChange={onTermChange} />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
