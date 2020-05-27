import React, { useState, useEffect } from "react";
import unsplash from "../api/unsplash";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";

const ImageSearch = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    unsplash
      .get("/search/photos", {
        params: { query: searchTerm }
      })
      .then(response => {
        setImages(response.data.results);
      })
      .catch(() => {
        setImages([]);
      });
  }, [searchTerm]);

  return (
    <div className="ui container" style={{ marginTop: "10px" }}>
      <SearchBar onSubmit={setSearchTerm} />
      <ImageList images={images} />
    </div>
  );
};

export default ImageSearch;
