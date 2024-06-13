import React, { useState, useMemo } from "react";
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
  Box,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { GET_BOOKS } from '../data/data';

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

  if (loading) return <CircularProgress />;
  if (error) return <p>Error loading books: {error.message}</p>;

  return (
    <Box sx={{ padding: 3 }}>
     
      <TextField
        label="Search for a book"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />
      <Box sx={{ maxHeight: '50vh', overflow: 'auto' }}>
        <List>
          {filteredBooks.map((book) => (
            <ListItem
              key={book.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: 1,
                padding: 1,
                borderRadius: 1,
                bgcolor: '#f9f9f9',
              }}
            >
              <ListItemAvatar>
                <Avatar src={book.coverPhotoURL} sx={{ width: 56, height: 56, marginRight: 1, }} />
              </ListItemAvatar>
              <ListItemText primary={book.title} secondary={book.author} />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#335c6e',
                  color: '#FFFFFF',
                  marginTop: 1,
                  '&:hover': {
                    backgroundColor: '#335c6e',
                  },
                }}
                onClick={() => addToReadingList(book)}
              >
                Add
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Reading List
        </Typography>
        <Grid container spacing={2}>
          {readingList.map((book) => (
            <Grid item xs={12} sm={6} md={3} key={book.id}>
              <Paper sx={{ padding: 2, textAlign: 'center', position: 'relative', height: '100%' }}>
                <Box sx={{ position: 'relative', paddingBottom: '100%', marginBottom: 1 }}>
                  <Avatar
                    src={book.coverPhotoURL}
                    sx={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      borderRadius: 0,
                    }}
                  />
                </Box>
                <ListItemText primary={book.title} secondary={book.author} />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#F76434',
                    color: '#FFFFFF',
                    marginTop: 1,
                    '&:hover': {
                      backgroundColor: '#F76434',
                    },
                  }}
                  onClick={() => removeFromReadingList(book.id)}
                >
                  Remove
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default BookAssignmentView;
