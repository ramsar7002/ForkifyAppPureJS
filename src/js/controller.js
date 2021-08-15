import * as model from './model.js';
import RecipeView from './views/RecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');
const searchResultsContainer = document.querySelector('.search-results');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    RecipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(e => {
  window.addEventListener(e, controlRecipes);
});
