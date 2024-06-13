
# Book Assignment View

## Description

Book Assignment View is a React.js application that allows users to search for books, view detailed information, and manage a reading list. The app fetches book data using Apollo Client and displays it using Material-UI components.

## Features

- Search for books by title.
- Display book details including cover photo, title, and author.
- Add books to a personalized reading list.
- Remove books from the reading list.
- Utilizes Apollo Client for GraphQL data fetching.
- Styled with Material-UI for a responsive and modern UI.

## Technologies Used

- React.js
- Apollo Client
- GraphQL
- Material-UI

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/mwendaB/book-search.git
   cd book-search
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**

   ```sh
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## GraphQL Server Setup

Ensure that you have a GraphQL server running locally on `http://localhost:4000/` or update the URI in the Apollo Client setup if your server is hosted elsewhere.

## Usage

1. **Search for Books:**

   Use the search bar to filter books by title.

2. **Add to Reading List:**

   Click the "Add" button next to a book to add it to your reading list.

3. **Remove from Reading List:**

   Click the "Remove" button next to a book in the reading list to remove it.

## Folder Structure

```
book-search/
├── public/
├── src/
│   ├── components/
│   │   └── BookAssignmentView.js
│   ├── data/
│   │   └── data.js
│   ├── App.js
│   ├── index.js
│   └── apolloClient.js
├── .gitignore
├── package.json
├── README.md
```

- **public/**: Public assets and HTML template.
- **src/**: Source code directory.
  - **components/**: React components.
  - **data/**: GraphQL queries and data-related files.
  - **App.js**: Main application component.
  - **index.js**: Entry point of the application.
  - **apolloClient.js**: Apollo Client setup.

## Apollo Client Setup

The Apollo Client is configured in `src/apolloClient.js` as follows:

```javascript
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/', 
  cache: new InMemoryCache(),
});

export default client;
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the existing code style and includes relevant tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

If you have any questions or feedback, feel free to contact us at [brianmwenda255@gmail.com].

