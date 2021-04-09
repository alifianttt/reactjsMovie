import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import MovieList from './components/MovieList'
//import MovieListHeading from './components/MovieListHeading'
import SearchBox from './components/SearchBox'
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites'


const App = () => {
  const Head = 'Movies List'
  const [movies, setMovie] = useState([ ])
  const [searchValue, setSearchValue] = useState('')
  const [favourite, setFavourite] = useState([])
  
  const getMoviesRequest = async (searchVal) => {
    const url = `http://www.omdbapi.com/?s=${searchVal}&apikey=263d22d8`
    const response = await fetch(url)
    const responseJson = await response.json()

    if(responseJson.Search){
      setMovie(responseJson.Search)
    } 
  }

  const saveToLocal = (items) =>{
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourite, movie]
    setFavourite(newFavouriteList)
    saveToLocal(newFavouriteList)
  }

  const removeFavourites = (movie) =>{
    const newFavouriteList = favourite.filter(
      (fav) => fav.imdbID !== movie.imdbID
    )

    setFavourite(newFavouriteList)
    saveToLocal(newFavouriteList)
  }

  useEffect(() => {
    getMoviesRequest(searchValue)
  }, [searchValue])

  
return (
  <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading={Head}/>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
          <MovieList movies={movies} favouriteComponent={AddFavourites}
          handleFavouritesClick={addFavouriteMovie}/>
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading='Favourites'/>
      </div>
      <div className='row'>
          <MovieList movies={favourite} favouriteComponent={RemoveFavourites}
          handleFavouritesClick={removeFavourites}/>
      </div>
  </div>
  )
}

const MovieListHeading = (props) => {
  return(
      <div className='col'>
          <h1>{props.heading}</h1>
      </div>
  )
}
export default App;