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
    recipeTitle.classList.add('recipe-title');

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

    const recipeImage = document.createElement('img');
    recipeImage.src = recipe.image;
    recipeImage.alt = recipe.name;
    recipeImage.classList.add('recipe-image');

    const moreInfoBtn = document.createElement('button');
    moreInfoBtn.innerText = 'More Info';
    moreInfoBtn.classList.add('more-info-btn');

    const moreInfoDiv = document.createElement('div');
    moreInfoDiv.style.display = 'none';
    moreInfoDiv.innerHTML = `
        <p><strong>⏱️ Cooking Time:</strong> ${recipe.cookTimeMinutes} minutes</p>
        <p><strong>⭐ Rating:</strong> ${recipe.rating}</p>
        <p><strong>🫂 cuisine:<strong> ${recipe.cuisine};
    `;

    moreInfoBtn.addEventListener('click', () => {
        moreInfoDiv.style.display = moreInfoDiv.style.display === 'none' ? 'block' : 'none';
        
    });

    recipeContainer.append(recipeTitle);
    recipeContainer.append(recipeImage);
    recipeContainer.append(ingredientsHeading);
    recipeContainer.append(ingredientsList);
    recipeContainer.append(instructionsHeading);
    recipeContainer.append(instructionList);
    recipeContainer.append(moreInfoBtn);
    recipeContainer.append(moreInfoDiv);
}
