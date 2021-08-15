import * as model from './model.js';
import RecipeView from './views/RecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');
const searchResultsContainer = document.querySelector('.search-results');

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
    alert(err);
  }
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);
};
init();
