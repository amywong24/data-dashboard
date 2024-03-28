import React from 'react';

const Statistics = ({ books }) => {
  if (!books || books.length === 0) return <p>No data available.</p>;

  const totalBooks = books.length;
  const earliestYear = Math.min(...books.map(book => book.first_publish_year || new Date().getFullYear()));
  const authorsList = books.flatMap(book => book.author_name || []);
  const mostCommonAuthor = authorsList.length ? mostFrequent(authorsList) : 'N/A';

  function mostFrequent(arr) {
    const frequencyMap = arr.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
  
    return Object.keys(frequencyMap).reduce((a, b) => frequencyMap[a] > frequencyMap[b] ? a : b);
  }

  return (
    <div>
      <h3>Summary Statistics</h3>
      <p>Total Books: {totalBooks}</p> {/* this represents the total number books listed for ACOTAR */}
      <p>Earliest Publication Year: {earliestYear}</p> { /* this represents the earliest year that was published from the list */}
      <p>Most Common Author: {mostCommonAuthor}</p> {/* this represents the author that pops up the most from the list (mode) */}
    </div>
  );
};

export default Statistics;
