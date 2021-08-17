import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import PaginationView from './views/paginationView.js';
import BookmarksView from './views/bookmarksView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import esultsView from './views/resultsView.js';

const controlRecipes = async function () {
  try {
    const id = window.location?.hash.slice(1);
    if (!id) return;
    RecipeView.renderSpinner();

    //Update results view to mark selected
    ResultsView.update(model.getSearchResultsPage());

    //Loading recipe
    await model.loadRecipe(id);
    const recipe = model.state.recipe;
    //Rendering recipe
    RecipeView.render(recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};
const controlSearchResults = async () => {
  try {
    //Get search query
    const query = SearchView.getQuery();
    console.log('');
    if (!query) return;

    //Show the spinner
    ResultsView.renderSpinner();

    //Load search results
    const data = await model.loadSearchResults(query);

    //ResultsView.render(model.state.search.results);
    ResultsView.render(model.getSearchResultsPage());

    //render pagination buttons
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  ResultsView.render(model.getSearchResultsPage(goToPage));
  //render pagination buttons
  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings);
  //update the recipe view

  //RecipeView.render(model.state.recipe);
  RecipeView.update(model.state.recipe);
};

const controllAddBookmark = function () {
  //Add or remove a bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);

  //Update recipe view
  RecipeView.update(model.state.recipe);

  //Render bookmarks
  BookmarksView.render(model.state.bookmarks);
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdate(controlServings);
  RecipeView.addHandlerAddBookmark(controllAddBookmark);

  SearchView.addHandlerSearch(controlSearchResults);

  PaginationView.addHandlerClick(controlPagination);
};
init();
//