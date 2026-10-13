"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Moa Jönsson
 */
// Hämta element från DOM
const Form = document.querySelector("#searchform");
const Error = document.querySelector("#errorList")
const SearchButton = document.querySelector("#search");
const Message = document.querySelector("#massage");
const Recipt = document.querySelector("#recipt")


console.log("Start");
// Läs in sökfras
fetch ('https://dymmyjson.com/recipes/serch?q=Margherita')
.then (res => res.json())
.then (console.log);

// Kontrolera att sökfasen angetts

// Skapa asynkront API-anrop (fetch())

// Invänta och hantera svar (async/await)

// Omvandla API-Svaret från JSON

// Kontrollera att sökningen ger resultat

// Presentera första sökresultat

// Skapa receptets innehåll dynamiskt m JS

// Hantera fel som kan uppstå via API-anrop

// Ersätt tidigare recept vid ny sökning

console.log("Slut");