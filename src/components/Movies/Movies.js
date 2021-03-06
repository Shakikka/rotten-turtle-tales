import Movie from '../MovieCard/MovieCard';
import SelectedMovie from '../SelectedMovie/SelectedMovie.js';
import './Movies.css';
import '@brainhubeu/react-carousel/lib/style.css';
import { Link, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';


const MovieContainer = ({enlargeCard, movies, currentMovie, currentVideos, favorites, error}) => {

  const buildMovieCards = (movies) => {
    return movies.map((movie, index) => {
        return (
      
            <Link to={`/${movie.id}`} key={movie.id}>
              <Movie
                id={movie.id}
                poster_path={movie.poster_path}
                backdrop_path={movie.backdrop_path}
                title={movie.title}
                average_rating={movie.average_rating}
                release_date={movie.release_date}
                enlargeCard={enlargeCard}
                index={index}
              />
        </Link>
            )  
        })
    }

  
  const movieCards = (
   
  <Droppable
    droppableId="newMovies"
    direction="horizontal"
    >
  {(provided) => 
    <div 
    className="posters"
      ref={provided.innerRef}
    {...provided.droppableProps}>
      {buildMovieCards(movies)}
      {provided.placeholder}
    </div>
      }
  </Droppable>
  )

  const selectedMovie = (id) => {
    if (currentMovie.id) {
      return <SelectedMovie id={currentMovie.id} foundMovie={currentMovie}
       currentVideos={currentVideos}/>
    } else if (checkID(id)) {
      enlargeCard(id)
    } else {
      return <Link to='/'><h2> 404: You must be lost. Please click me</h2></Link>
    }
  }

  const checkID = (id) => {
    if (/^\d+$/.test(id) && id.length === 6 &&
    !error) {
      return true
    } else {
      console.log(error)
      return false
    } 
  }
  

  const favoriteMovies = () => {
    const favCards = favorites.length? buildMovieCards(favorites, true) : <p>Drag to me.</p>
    return (
    <Droppable
    droppableId="favorites"
    direction="horizontal"
    >
    {(provided) => <div
    className="posters favorites"
    ref={provided.innerRef}
    {...provided.droppableProps}>
    {favCards}
    {provided.placeholder}
    </div>}
      </Droppable>
  )
  }

  return (
    <Route
      render={({ location }) => (
        <Switch location={location} key={location.pathname}>
          <Route exact path='/' children={() => <section className="movie-container">New Movies{movieCards}Favorites{favoriteMovies()}</section>}/>
          <Route exact path="/:id" children={() => <section className="movie-container">{selectedMovie(location.pathname.split('/')[1])}</section>}/>
          <Route render={()=> <Link to='/'><h2> 404: You must be lost. Please click me</h2></Link>}/>
        </Switch>
      )}>
    </Route>

  )
}

export default MovieContainer;

MovieContainer.propTypes = {
  enlargeCard: PropTypes.func,
  movies: PropTypes.array,
  currentMovie: PropTypes.object,
  currentVideos: PropTypes.array
};