import { useState, useEffect } from 'react';
import './App.css';
import Statistics from './components/Statistics';

function App() {
  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [authorFilter, setAuthorFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

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
    const results = books.filter(book => {
      const titleMatch = book.title.toLowerCase().includes(searchBook.toLowerCase());
      const authorMatch = !authorFilter || (book.author_name && book.author_name.some(author => author.toLowerCase().includes(authorFilter.toLowerCase())));
      const yearMatch = !yearFilter || (book.first_publish_year && book.first_publish_year.toString() === yearFilter);

      return titleMatch && authorMatch && yearMatch;
    });
    setFilteredBooks(results);
  }, [searchBook, authorFilter, yearFilter, books]);

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
      <select value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)}>
        <option value="">Filter by author...</option>
        {books.map(book => (
          book.author_name && book.author_name.map((author, index) => (
            <option key={index} value={author}>{author}</option>
          ))
        ))}
      </select>
      <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
        <option value="">Filter by year...</option>
        {books.map(book => (
          book.first_publish_year && <option key={book.first_publish_year} value={book.first_publish_year}>{book.first_publish_year}</option>
        ))}
      </select>
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