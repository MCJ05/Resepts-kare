"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Moa Jönsson
 */
// Hämta element från HTML-filen
const searchForm = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const RecipSearch = document.querySelector("#recipe");

const messageEl = document.querySelector("#massage");
const errorEl = document.querySelector("#error");
const outputEl = document.querySelector("#output");


// Kör funktionen när användaren skickar formuläret
searchForm.addEventListener("Submit", function(event) {
    event.preventDefault();

    // Läser användarens sökfras
    const serchTerm = searchInput.value.trim();

    // Tar bort tidigare sökfraser
    errorEl.textContent = "";
    messageEl.textContent = "";

    // Kontrolera att sökfrasen inte är tom
    if(serchTerm === "") {
        errorEl.textContent = "Fyll i en maträtt";
        return;
    }
    
    // Ta bort tidigare recept
    recipeSection.replaceChildren();

    // Starta hämtningen av recept
    getRecipt(serchTerm); 
});


// Hämtat sökfras från DummyJSON API
async function getRecipt(serchTerm) {
    try {
        // Skapar API-adress med användarens sökfras
        const url = `https://dummyjson.com/recipes/serch?q=${encodeURIComponent(serchTerm)}`;
        // Hämta data från API:et
        const respons = await fetch(url);
        
        // Kontrollera att anropet lyckats
        if(!respons.ok) {
            throw new error("Kunde inte hämta recept. Försök igen senare");
        }

        // Omvandla JSON-svaret till ett js-objekt
        const data = await respons.json();

        // Kontrollera att svaret innehåller ett recept
        if(!data || !Array.isArray(data.recipes)) {
            throw new error("API:et returnea ogiltig data");
        }

        // Kontrollera att sökningen ger något resultat
        if(data.recipe.length === 0) {
            messageEl.textContent = "Inger recept hittades";
            return;
        }

        // Visa reseptet på hemsidan
        const recipe = data.recipe[0];

        console.log(serchTerm);
        console.log(recipe);

    } catch (error) {
        console.log("Det uppstod ett fel: " + error);
    }
}

function displayRecipe(recipe) {
    const article = document.createElement("article");
    console.log(article);

    // Receptets namn
    const title = document.createElement("h3");
    title.textContent = recipe.name;

    // Receptets bild
    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;

    // Information om reseptet
    const recipeInfo = document.createElement("div");
    recipeInfo.classList.add("recipe-info");

    // Antal portioner
    const servings = document.createElement("P");
    const servingsLabel = document.createElement("strong");
    servingsLabel.textContent = "Portioner: ";
    servings.append(
        servingsLabel, 
        document.createTextNode(String(recipe.servings))
    );

    // Förberedelsetid
    const prepTime = document.createElement("p");
    const prepLabel = document.createElement("strong");
    prepLabel.textContent = "Förberedelse tid: ";
    prepTime.append(
        prepLabel, 
        document.createTextNode(
            `${recipe.prepTimeMinutes} minuter`
        )
    );

    // Tillagningstid
    const cookTime = document.createElement("p");
    const cookLabel = document.createElement("strong");
    cookLabel.textContent = "Tilagnings tid: ";
    cookTime.append(
        cookLabel, 
        document.createTextNode(
            `${recipe.cookTimeMinutes} minuter`
        )
    );

    // Svårighetsgrad
    const difficulty = document.createElement("p");
    const difficultyLabel = document.createElement("strong");
    difficultyLabel.textContent = "Svårighetsgrad: ";
    difficulty.append(
        difficultyLabel,
        document.createTextNode(recipe.difficulty)
    );

    // Samla receptinformation
     recipeInfo.append(
        servings,
        prepTime,
        cookTime,
        difficulty
    );

    // Ingrediensernas - rubrok & punktlista
    const ingredientsHeading = document.createElement("h4");
    ingredientsHeading.textContent = "Ingredienser";

    const ingredientsList = document.createElement("ul");

    recipe.ingredients.forEach(function (ingredients) {
        const li = document.createElement("li");
        li.textContent = ingredients;
        ingredientsList.appendChild(li);
    });

    // Instruktioners rubrik & numrerad lista
    const instructionsHeading = document.createElement("h4");
    instructionsHeading.textContent = "Instruktioner";

    const instructionsList = document.createElement("ol");

    recipe.instructions.forEach(function (instructions) {
        const li = document.createElement("li");
        li.textContent = instructions;
        instructionsList.appendChild(li);
    });

    // Lägg till element i receptets article
    article.append(
        title,
        image,
        recipeInfo,
        ingredientsHeading,
        ingredientsList,
        instructionsHeading,
        instructionsList
    );

    // Visa receptet i HTML-filens section
    recipeSection.replaceChildren(article);
}