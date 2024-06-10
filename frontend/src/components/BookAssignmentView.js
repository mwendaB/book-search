import React, { useState, useEffect, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

import image1 from "../assets/image1.webp";
import image2 from "../assets/image2.webp";
import image3 from "../assets/image3.webp";
import image4 from "../assets/image4.webp";
import image5 from "../assets/image5.webp";
import image6 from "../assets/image6.webp";
import image7 from "../assets/image7.webp";
import image8 from "../assets/image8.webp";
import image9 from "../assets/image9.webp";
import image10 from "../assets/image10.webp";

const GET_BOOKS = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];

const BookAssignmentView = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [searchTerm, setSearchTerm] = useState("");
  const [readingList, setReadingList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (data) {
      const booksWithImages = data.books.map((book) => ({
        ...book,
        coverPhotoURL: book.coverPhotoURL || images[Math.floor(Math.random() * images.length)],
      }));
      setSearchResults(booksWithImages);
    }
  }, [data]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = useMemo(() => {
    if (!searchResults) return [];
    return searchResults.filter((book) => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchResults, searchTerm]);

  const addToReadingList = (book) => {
    setReadingList((prevList) => [...prevList, book]);
  };

  const removeFromReadingList = (title) => {
    setReadingList((prevList) => {
      const index = prevList.findIndex((book) => book.title === title);
      if (index !== -1) {
        return [...prevList.slice(0, index), ...prevList.slice(index + 1)];
      }
      return prevList;
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading books</p>;

  return (
    <div style={{ padding: "20px" }}>
      <TextField
        label="Search for a book"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
      />
      <List>
        {filteredBooks.map((book) => (
          <ListItem key={book.title}>
            <ListItemAvatar>
              <Avatar src={book.coverPhotoURL} />
            </ListItemAvatar>
            <ListItemText primary={book.title} secondary={book.author} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => addToReadingList(book)}
            >
              Add
            </Button>
          </ListItem>
        ))}
      </List>
      <Paper style={{ marginTop: "20px", padding: "20px" }}>
        <h2>Reading List</h2>
        <List>
          {readingList.map((book) => (
            <ListItem key={book.title}>
              <ListItemAvatar>
                <Avatar src={book.coverPhotoURL} />
              </ListItemAvatar>
              <ListItemText primary={book.title} secondary={book.author} />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeFromReadingList(book.title)}
              >
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default BookAssignmentView;
