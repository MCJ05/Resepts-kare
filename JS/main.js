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





console.log("Start");

// Kör funktionen när användaren skickar formuläret
searchForm.addEventListener("Submit", function (event) {
    event.preventDefault();

    // Läser användarens sökfras
    const serchTerm = searchInput.value.trim();


    // Tar bort tidigare sökfraser
    errorEl.textContent = "";
    messageEl.textContent = "";

    // Ta bort tidigare recept


    // Starta hämtningen av recept

});






// Hämtat sökfras från DUMMYJSON API
async function getRecipt(serchTerm) {
     try {
        // Skapar API-adress med användarens sökfras
        const url = `https://dummyjson.com/recipes/serch?q=${encodeURIComponent(searchTerm)}`;
        // Hämta data från API:et
        const respons = await fetch(url);
        
        // Kontrollera att anropet lyckats
        if(!respons.ok) {
            throw new Error("Kunde inte hämta recept. Försök igen senare");
        }

        // Omvandla JSON-svaret till ett JS-objekt

        // Kontrollera att svaret innehåller ett recept

        // Kontrollera att sökningen ger något resultat

        // Visa reseptet på hemsidan

        

    } catch (error) {
        console.log("Det uppstod ett fel: " + error);
    }
}


/*.then (res => res.json())
.then (console.log);*/


// Sök knappen



console.log("Slut");