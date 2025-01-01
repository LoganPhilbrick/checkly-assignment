import { test, expect } from "@playwright/test";

const baseUrl = "https://pokeapi.co/api/v2/";

test("get favorite pokemon and verify type", async ({ request }) => {
  let favoritePokemon: { name: string; url: string };
  let pokemonFormURL: { url: string };

  await test.step("get favorite pokemon", async () => {
    const response = await request.get(`${baseUrl}pokemon?limit=50&offset=0`);
    expect(response).toBeOK();

    const data = await response.json();
    favoritePokemon = data.results.find((pokemon: { name: string; url: string }) => pokemon.name === "pikachu");
  });

  await test.step("get pokemon form", async () => {
    const response = await request.get(`${favoritePokemon.url}`);
    expect(response).toBeOK();

    const pokemonForm = await response.json();
    pokemonFormURL = pokemonForm.forms[0].url; // appended index of "0" to "pokemon.forms" since "forms" is an array
  });

  await test.step("verify pokemon type", async () => {
    const response = await request.get(`${pokemonFormURL}`);
    expect(response).toBeOK();

    const pokemonForm = await response.json();
    const pokemonType = pokemonForm.types[0].type.name; // appended "name" to "pokemonForm.types[0].type" since "type" is an object containing mulyiple values
    expect(pokemonType).toBe("electric");
  });
});
