#!/usr/bin/node
const util = require('util');
const request = util.promisify(require('request'));

async function starwarsCharacters (filmId) {
  const endpoint = `https://swapi-api.hbtn.io/api/films/${filmId}`;

  try {
    let response = await request(endpoint);
    const film = JSON.parse(response.body);
    const characters = film.characters;

    for (let i = 0; i < characters.length; i++) {
      const urlCharacter = characters[i];
      response = await request(urlCharacter);
      const character = JSON.parse(response.body);
      console.log(character.name);
    }
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
}

const filmID = process.argv[2];
if (!filmID) {
  console.error('Please provide a film ID');
} else {
  starwarsCharacters(filmID);
}