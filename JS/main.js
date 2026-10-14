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


});






// Hämtat sökfras från dummyjson.com
async function getRecipt() {
     try {
        const respons = await fetch ('https://dummyjson.com/recipes/serch?q=Margherita');
        if(!respons.ok) {
            throw new Error("Kunde inte hämta recept. Försök igen senare");
        }

    } catch (error) {
        console.log("Det uppstod ett fel: " + error);
    }
}


/*.then (res => res.json())
.then (console.log);*/


// Sök knappen



console.log("Slut");