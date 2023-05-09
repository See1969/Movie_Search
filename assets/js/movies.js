import {
  createElement, createStyle, createMarkUp,
  moviesList, addMoviesToList, inputSearch, clearMoviesMarkup, triggerMode
} from "./dom.js";

let searchLast = null;

const getData = (url) => fetch(url)
  .then((res) => res.json())
  .then(data => data.Search);

const debounceTime = (() => {

  let timer = null;

  return (cb, ms) => {

    if (timer) {
      clearTimeout(timer)
      timer = null;
    }

    timer = setTimeout(cb, ms)
  }
})();

const inputSearchHandler = (e) => {
  debounceTime(() => {
    const searchString = e.target.value.trim();

    if (searchString && searchString.length > 3 && searchString !== searchLast) {
      if (!triggerMode) clearMoviesMarkup(moviesList);

      getData(`http://www.omdbapi.com/?apikey=18b8609f&s=${searchString}`)
        .then((movies) => movies.forEach((movie) => addMoviesToList(movie)))
        .catch((err) => console.log(err))

    }

    searchLast = searchString;
  }, 2000)
};

export const appInit = () => {
  createMarkUp();
  createStyle();
  inputSearch.addEventListener('input', inputSearchHandler)
}