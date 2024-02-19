/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from '../css/Detail.module.css';

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
    const json = await response.json();
    setMovies(json.data.movie);
    if (movies.id !== undefined) {
      setLoading(false);
    }
  }
  function YoutubeVideo({ videoId }) {
    return (
      <iframe id={styles.playTrailer}
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?si=FXTi1Lba-EGGSlx6`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    );
  }
  
  useEffect(() => {
    getMovie();
  }, [movies.id]);

  return (
    <div>
        {loading ? <h1>Loading...</h1> : (
          <div className="parent-container">
          <div id={styles.background_overlay}></div>
          {/* <div id={styles.background_bottom}></div> */}
            <img id={styles.background_image} src={movies.background_image} alt="movie background images" />
            <img id={styles.thumb_image} src={movies.medium_cover_image} alt="movie images" />
            <h1 id={styles.title}>{movies.title} <br />  </h1>
            <h2 id={styles.movie_info}>
              {movies.year}
              <br />
              {movies.genres.join(" / ")}
              <br />
              Rating: {movies.rating}
            </h2>
              <YoutubeVideo videoId={movies.yt_trailer_code} />
            <h3 id={styles.description_full}>{movies.description_full}</h3>

          </div>
        )}
    </div>
  )
        }

export default Detail