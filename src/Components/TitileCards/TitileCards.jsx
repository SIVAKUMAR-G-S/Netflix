import React, { useEffect, useRef, useState } from 'react';
import './Titilecards.css';
import { Link } from 'react-router-dom';

const Titlecards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODI5OTVlYjAzMWRkYTc3YWRlMmUyODMyMjUzZDY4YSIsIm5iZiI6MTc0MDU1NjEyNi44NjMwMDAyLCJzdWIiOiI2N2JlYzc1ZWRkMGFkZWMxNGQ1NjIwODciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mpyB8u7scv87-bDBEybPG0gfzkqQK6UgVuejLb7yN7c'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results || []))
      .catch(err => console.error(err));

    if (cardsRef.current) {
      cardsRef.current.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]);

  return (
    <div className='titlecards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img 
              src={card.backdrop_path ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}` : 'https://via.placeholder.com/500x280?text=No+Image'}
              alt={card.original_title}
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Titlecards;
