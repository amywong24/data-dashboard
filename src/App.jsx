import { useState, useEffect } from 'react'
import './App.css'
import Statistics from './components/Statistics'

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://openlibrary.org/search.json?q=a+court+of+thorns+and+roses');
      const data = await response.json();
      setBooks(data.docs);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Book Search</h1>
      <Statistics books={books}/>
      {books.map((book, index) => (
        <div key={index}>
          <h2>{book.title}</h2>
          <p>Author: {book.author_name?.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default App