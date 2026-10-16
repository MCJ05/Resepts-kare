"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Moa Jönsson
 */
// Hämta element från HTML-filen
const searchForm = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const recipeSection = document.querySelector("#recipe");

const messageElement = document.querySelector("#message");
const errorElement = document.querySelector("#error");


searchForm.addEventListener("submit", handelSearch);

// Hanterar formuläret och startar sökningen
async function handelSearch(event) {
    event.preventDefault();

    const searchTerm = getSearchTerm();

    clearMessages();

    if(!validateSearch(searchTerm)) {
        return;
    }

    clearRecipe();
    
    await getRecipt(searchTerm);
}

// Hämta sökfras från formuläret
function getSearchTerm() {
    return searchInput.value.trim();
}

// Rensar tidigare fel- och resultatmeddelanden
function clearMessages() {
    errorElement.textContent = "";
    messageElement.textContent = "";
}

// Kontrollerar att dökfrasen inte är tom
function validateSearch(searchTerm) {
    if(searchTerm === "") {
        errorElement.textContent = "Du måste fylla i en sökfras";
        return false;
    }

    return true;
}

// Visa felmeddelanden
// API-anrop och sökresultat
function showMessage(message) {
    messageElement.textContent = message;
}

// Tar bort tidigare recept
function clearRecipe() {
    recipeSection.replaceChildren();
    console.log(recipeSection);
}

// Skapar API.adressen för sökningen
function createApiUrl(searchTerm) {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    return `https://dummyjson.com/recipes/search?q=${encodedSearchTerm}`;
}

// Hämtar recept från DummyJSON
async function getRecipt(searchTerm) {
    try {
        const url = createApiUrl(searchTerm);

        // Skicka försfrågan till API:et
        const respons = await fetch(url);

        // Kontrollera om HTTP-anropet lyckats
        if(!respons.ok) {
            throw new Error(`HTTP-fel: ${respons.status}`);
        }

        // Omvandla JSON-svaret till ett JavaScript-objekt
        const data = await respons.json();

        // Kontrollera att API-svaret 
        if(!data || !Array.isArray(data.recipes)) {
            throw new Error("Ogiltigt svar från API:et");
        }

        // Kontrollera om några recept hittas
        if(data.recipes.length === 0) {
            showMessage("Inga recept hittades. Försök med en annan sökfras.");
            return;
        }

        // Hämta det första receptet
        const recipe = data.recipes[0];

        // Visa receptet
        displayRecipe(recipe);

    } catch (error) {
        clearRecipe();

        showMessage("Det gick inte att hämta recept. Försök igen senare.");

        console.error("Fel vid hämtning av recept.", error);
    }
}

// Skapar och visar receptet
function displayRecipe(recipe) {
    const article = createElement("aticle");
    const title = createTextElement("h3", recipe.name);
    const image = createRecipeImage(recipe);
    const recipeInfo =createRecipeInfo(recipe);

    const ingredientsHeading = createTextElement("h4", "Ingredients");
    const ingredientsList = createList("ul", recipe.ingredients);

    const instructionsHeading = createTextElement("h4", "Instructions");
    const instructionsList = createList("ol", recipe.instructions);

    // Samla receptets element i rätt ordning
    article.append(
        title,
        image,
        recipeInfo,
        ingredientsHeading,
        ingredientsList,
        instructionsHeading,
        instructionsList
    );

    // Visa artikeln på webbsidan
    recipeSection.append(article);
}

// Skapar ett HTML-element
function createElement(tagName) {
    return document.createElement(tagName);
}

// Skapar ett HTML-element m. text
function createTextElement(tagName, text) {
    const element = createElement(tagName);
    element.textContent = text;

    return element;
}

// Skapar receptets bild
function createRecipeImage(recipe) {
    const image = createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;

    return image;
}

// Skapar ett stycke m. en rubrik och ett värde
function createInfoParagraph(label, value) {
    const paragraph = createElement("p");
    const strong = createElement("strong");

    strong.textContent = `${label}: `;

    paragraph.append(
        strong,
        document.createTextNode(String(value))
    );

    return paragraph;
}

// Skapar receptets informationsområde
function createRecipeInfo(recipe) {
    const info = createElement("div");

    info.classList.add("recipe-info");
    info.append(
        createInfoParagraph("Servings", recipe.servings),
        createInfoParagraph(
            "Cooking time",
            `${recipe.cookTimeMinutes} Minutes`
        ),
        createInfoParagraph("Difficulty", recipe.difficulty)
    );

    return info;
}

// Skapar en lista m. ingredienser eller instruktioner
function createList(listType, items) {
    const list = createElement(listType);

    items.forEach(function(item) {
        const listItem = createTextElement("li", item);

        list.appendChild(listItem);
    });

    return list;
}
