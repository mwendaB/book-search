import React, { useState,  useMemo } from "react";
import { useQuery } from "@apollo/client";
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

 import { GET_BOOKS  } from '../data/data';


const BookAssignmentView = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [searchTerm, setSearchTerm] = useState("");
  const [readingList, setReadingList] = useState([]);

  const booksWithImages = useMemo(() => {
    if (!data) return [];
    return data.books.map((book, index) => {
      const coverPhotoURL = book.coverPhotoURL ? `/${book.coverPhotoURL}` : `/assets/default.webp`;
      return {
        ...book,
        coverPhotoURL,
        id: `${book.title}-${book.author}-${index}`,
      };
    });
  }, [data]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  

  const filteredBooks = useMemo(() => {
    const trimmedSearchTerm = searchTerm.trim();
    return booksWithImages.filter((book) =>
      book.title.toLowerCase().includes(trimmedSearchTerm) &&
      !readingList.some((readingBook) => readingBook.id === book.id)
    );
  }, [booksWithImages, searchTerm, readingList]);
  
  const addToReadingList = (book) => {
    setReadingList((prevList) => [...prevList, book]);
  };

  const removeFromReadingList = (id) => {
    setReadingList((prevList) =>
      prevList.filter((book) => book.id !== id)
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading books: {error.message}</p>;

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
          <ListItem key={book.id}>
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
            <ListItem key={book.id}>
              <ListItemAvatar>
                <Avatar src={book.coverPhotoURL} />
              </ListItemAvatar>
              <ListItemText primary={book.title} secondary={book.author} />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeFromReadingList(book.id)}
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
