import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};

export const loadRecipe = async id => {
  try {
    const url = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`;

    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    let { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    alert(err);
  }
};
