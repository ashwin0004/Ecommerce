import React from "react";

const SearchBar = ({ onSearch }) => {
    return (
        <div className="search-bar">
            <input type="text" id="search" placeholder="Search food..." />
            <button onClick={onSearch}>Search</button>
        </div>
    );

};

export default SearchBar;
