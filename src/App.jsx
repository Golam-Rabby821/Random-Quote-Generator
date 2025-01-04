import React, { useState, useEffect } from 'react';

import './App.css';

const BASE_URL =
  'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const backgroundColors = [
  '#1e3a8a', '#0f4c75', '#1b263b', '#0a9396',
  '#006d77', '#3a0ca3', '#9d0208', '#9b2226',
  '#b3541e', '#4b5563', '#d97706', '#6b21a8',
  '#b91c1c', '#155e75', '#1d3557',
];

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [color, setColor] = useState(backgroundColors[0]);

  const fetchQuote = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      const quotes = data.quotes;

      const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
      const randomColorIndex = Math.floor(Math.random() * backgroundColors.length);

      setTimeout(() => {
        setQuote(quotes[randomQuoteIndex].quote);
        setAuthor(quotes[randomQuoteIndex].author);
        setColor(backgroundColors[randomColorIndex]);
      }, 500);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setQuote('Error fetching quote. Please try again.');
      setAuthor('');
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  // Update CSS variable when color changes
  useEffect(() => {
    document.documentElement.style.setProperty('--color-selected', color);
  }, [color]);

  return (
    <>
      <div className="container m-0 p-0 w-full h-screen bg-[var(--color-selected)] flex flex-col items-center justify-center transition-colors duration-500 ease-in-out">

        <div
          id="quote-box"
          className="w-[480px] bg-white rounded-[0.4rem] px-[2.3rem] pt-[2.3rem] pb-[2rem] flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out"
        >
          <div className="quote-div flex text-[var(--color-selected)] pl-[1.3rem] text-[1.8rem] gap-[0.4rem]">
            
            <i className="fa-solid fa-quote-left quote-icon"></i>
            <span id="text" className="font-medium">{quote}</span>
          </div>

          <div className="author-div pt-1 flex text-[var(--color-selected)] justify-center items-center self-end text-[1rem] gap-[0.3rem]">
            <span className="author-dash bg-[var(--color-selected)] h-[1.5px] w-[15px]"></span>
            <p id="author">{author}</p>
          </div>

          <div className="bottom w-full mt-[1.5rem] flex justify-between items-center">
            <a
              href="https://twitter.com/intent/tweet"
              id="tweet-quote"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-100 text-[var(--color-selected)] transition-opacity duration-300 ease-in-out hover:opacity-80"
            >
              <i className="fa-brands fa-square-x-twitter text-[3rem]"></i>
            </a>

            <button
              type="button"
              id="new-quote"
              onClick={fetchQuote}
              className="bg-[var(--color-selected)] text-white text-[1.2rem] font-semibold py-2 px-4 rounded-[0.4rem] cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-80"
            >
              New Quote
            </button>
          </div>
        </div>

        <p className="credit mt-[2rem] text-white">
          By <a href="https://www.linkedin.com/in/golamrabby-/" target="_blank" rel="noopener noreferrer">Golam Rabby</a>
        </p>
      </div>
    </>
  );
}

export default App;
