import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultsView from './views/resultsView.js';

const controlRecipes = async function () {
  try {
    const id = window.location?.hash.slice(1);
    if (!id) return;
    RecipeView.renderSpinner();

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
    ResultsView.renderSpinner();

    //Get search query
    const query = SearchView.getQuery();
    if (!query) return;

    //Load search results
    const data = await model.loadSearchResults(query);

    //ResultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  //render pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings);
  //update the recipe view
  RecipeView.render(model.state.recipe);
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdate(controlServings);

  SearchView.addHandlerSearch(controlSearchResults);

  paginationView.addHandlerClick(controlPagination);
};
init();
