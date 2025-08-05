const recipeContainer = document.querySelector('#displayRecipe');

async function getRecipes() {
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json();
    generateRecipe(data.recipes);
}

function handleFormSubmit(event) {
    event.preventDefault();
    getRecipes();
}

document.querySelector('#recipe-form').addEventListener("submit", handleFormSubmit);

function generateRecipe(data) {
    recipeContainer.innerHTML = '';
    const index = Math.floor(Math.random() * data.length);
    const recipe = data[index];

    const recipeTitle = document.createElement('h1');
    recipeTitle.innerText = recipe.name;
    recipeTitle.classList.add ('recipe-title');

    const ingredientsHeading = document.createElement('h2');
    ingredientsHeading.innerText = 'Ingredients:';

    const ingredientsList = document.createElement('ol');

    recipe.ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.innerText = ingredient;
        ingredientsList.append(ingredientItem);
    });

    const instructionsHeading = document.createElement('h2');
    instructionsHeading.innerText = 'Instructions:';

    const instructionList = document.createElement('ol');

    recipe.instructions.forEach(instruction => {
        const instructionItem = document.createElement('li');
        instructionItem.innerText = instruction;

        instructionList.append(instructionItem);
    });

    recipeContainer.append(recipeTitle);
    recipeContainer.append(ingredientsHeading);
    recipeContainer.append(ingredientsList);
    recipeContainer.append(instructionsHeading);
    recipeContainer.append(instructionList);
    
}