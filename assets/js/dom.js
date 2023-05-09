export let moviesList = null;
export let inputSearch = null;
export let triggerMode = false;

export const createElement = ({
  type,
  attrs,
  container = null,
  position = 'append',
  event = null,
  handler = null
}) => {
  const el = document.createElement(type);

  Object.keys(attrs).forEach((key) => {
    if (key === 'innerHTML') el.innerHTML = attrs[key];
    else el.setAttribute(key, attrs[key]);
  });

  if (container && position === 'append') container.append(el);
  if (container && position === 'prepend') container.prepend(el);
  if (event && handler && typeof handler === 'function') el.addEventListener(event, handler);

  return el;
};

export const createStyle = () => {
  const headStyle = createElement({
    type: 'style',
    attrs: {
      innerHTML: `
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
      }
      .container {
        width: min(100% - 40px, 1280px);
        margin-inline: auto;
      }
      .movies {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
      }
      .movie {
        display: flex;
        justify-content: center;
        align-content: center;
      }
      .movie__image {
        width: 100%;
        object-fit: cover;
        padding-bottom: 15px;
      }
      .search {
        margin-bottom: 30px;
      }
      .search__label-input {
        display: block;
        margin-bottom: 7px;
      }
      .search__input {
        display: block;
        max-width: 400px;
        width: 100%;
        padding: 10px 15px;
        margin-bottom: 10px;
        border-radius: 4px;
        border: 1px solid lightslategray;
      }
      .search__label-checkbox {
        font-size: 0.75rem;
      }
      .search__group--checkbox {
        display: flex;
        align-items: center;
        gap: 5px;
      }`
    },
    container: document.head
  });

};

// div.container
export const createMarkUp = () => {
  const container = createElement({
    type: 'div',
    attrs: { class: 'container' },
    container: document.body,
    position: 'prepend'
  });


  // комментарии по эммету - Emmet
  // h1
  createElement({
    type: 'h1',
    attrs: {
      innerHTML: 'Додаток для пошуку фільмів'
    },
    container,
  });

  // div.search
  const searchBox = createElement({
    type: 'div',
    attrs: {
      class: 'search'
    },
    container
  });

  // div.search__group.search__group--input
  const inputBox = createElement({
    type: 'div',
    attrs: {
      class: 'search__group search__group--input'
    },
    container: searchBox
  });

  // div.search__group search__group--checkbox
  const checkBox = createElement({
    type: 'div',
    attrs: {
      class: 'search__group search__group--checkbox'
    },
    container: searchBox
  });

  // label.search__label-input
  createElement({
    type: 'label',
    attrs: {
      for: 'search',
      class: 'search__label-input',
      innerHTML: 'Пошук фільмів'
    },
    container: inputBox
  });

  // input.search__input
  inputSearch = createElement({
    type: 'input',
    attrs: {
      type: 'search',
      id: 'search',
      class: 'search__input',
      placeholder: 'Почніть вводити текст...'
    },
    container: inputBox
  });

  // input.search__checkbox
  createElement({
    type: 'input',
    attrs: {
      type: 'checkbox',
      id: 'checkbox',
      class: 'search__checkbox',
    },
    container: checkBox,
    event: 'click',
    handler: () => triggerMode = !triggerMode
  });

  // label.search__label-checkbox
  createElement({
    type: 'label',
    attrs: {
      for: 'checkbox',
      class: 'search__label-checkbox',
      innerHTML: 'Додати фільми до існуючих списків'
    },
    container: checkBox
  });

  // div.movies
  moviesList = createElement({
    type: 'div',
    attrs: { class: 'movies' },
    container
  });

};

// div.movie
export const addMoviesToList = (m) => {
  const item = createElement({ type: 'div', attrs: { class: 'movie' }, container: moviesList });
  // div.img
  const img = createElement({
    type: 'img',
    attrs: {
      class: 'movie__image',
      src: /^http|https\/\//i.test(m.Poster) ? m.Poster : 'assets/img/no-image.jpg',
      alt: `${m.Title}, ${m.Year}`,
      title: `${m.Title}, ${m.Year}`
    },
    container: item
  });

};

export const clearMoviesMarkup = (el) => el && (el.innerHTML = '');
