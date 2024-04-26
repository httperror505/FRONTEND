import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { FaSearch } from "react-icons/fa";

function SearchBar({ setResults }) {
  const [input, setInput] = useState("");
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch('https://node-js-backend-almario1.onrender.com/api/researches')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        if (Array.isArray(json)) {
          setDocuments(json);
        } else {
          console.error('JSON data is not an array');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Manual search function
  const performSearch = (value) => {
    const results = documents.filter(document =>
      document.title.toLowerCase().includes(value.toLowerCase()) ||
      document.abstract.toLowerCase().includes(value.toLowerCase()) ||
      document.author.toLowerCase().includes(value.toLowerCase()) ||
      document.category_name.toLowerCase().includes(value.toLowerCase()) ||
      document.course_name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(results);
  };

  // Handle input change
  const handleChange = (value) => {
    setInput(value);
    performSearch(value); // Perform search on input change
  };

  // Handle search button click
  const handleSearch = () => {
    performSearch(input); // Perform search when search button is clicked
  };

  return (
    <Container fluid className="search-container">
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="Title, Author, Keyword, etc.."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </Container>
  );
}

export { SearchBar };
