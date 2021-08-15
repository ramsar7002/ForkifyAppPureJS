import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    ResultsView.render(this.state.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);

  SearchView.addHandlerSearch(controlSearchResults);
};
init();
