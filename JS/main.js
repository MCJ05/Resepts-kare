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
    /*
    // Ta bort tidigare recept
    recipeSection.replaceChildren();

    // Starta hämtningen av recept
    getRecipt(serchTerm); */
});


// Hämtat sökfras från DummyJSON API
async function getRecipt(serchTerm) {
     try {
        // Skapar API-adress med användarens sökfras
        const url = `https://dummyjson.com/recipes/serch?q=${encodeURIComponent(searchTerm)}`;
        // Hämta data från API:et
        const respons = await fetch(url);
        
        // Kontrollera att anropet lyckats
        if(!respons.ok) {
            throw new error("Kunde inte hämta recept. Försök igen senare");
        }

        // Omvandla JSON-svaret rill ett js-objekt

        
        // Kontrollera att svaret innehåller ett recept


        // Visa reseptet på hemsidan


    } catch (error) {
        console.log("Det uppstod ett fel: " + error);
    }
}

function displayRecipe(recipe) {

    // Receptets namn

    // Receptets bild
    
    // Information om recemtet

    // Antal portioner

    // Förberedelsetid

    // Tillagningstid

    // Svårighetsgrad

    // Ingrediensernas - rubrok & punktlista

    // Instruktioners rubrik & numrerad lista

    // Lägg till element i receptets article

    // Visa receptet i HTML-filens section

}