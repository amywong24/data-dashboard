import { useState, useEffect } from 'react';
import './App.css';
import Statistics from './components/Statistics';

function App() {
  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://openlibrary.org/search.json?q=a+court+of+thorns+and+roses');
      const data = await response.json();
      setBooks(data.docs);
      setFilteredBooks(data.docs);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = books.filter(book =>
      book.title.toLowerCase().includes(searchBook.toLowerCase()) ||
      (book.author_name && book.author_name.some(author => author.toLowerCase().includes(searchBook.toLowerCase())))
    );
    setFilteredBooks(results);
  }, [searchBook, books]);

  return (
    <div>
      <h1>Book Search</h1>
      <Statistics books={filteredBooks} />
      <input
        type="text"
        placeholder="Search books..."
        value={searchBook}
        onChange={(e) => setSearchBook(e.target.value)}
      />
      {filteredBooks.map((book, index) => (
        <div key={index}>
          <h2>{book.title}</h2>
          <p>Author: {book.author_name?.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default App;