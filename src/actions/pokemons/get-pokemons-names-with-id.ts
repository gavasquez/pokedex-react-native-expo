import { pokeApi } from "../../config/api/pokeApi";
import { PokeAPIPaginateResponse } from "../../infrastructure/interfaces/pokeapi.interface";

export const getPokemonsNamesWithId = async () => {
  const url = `/pokemon?limit=1000`;
  const { data } = await pokeApi.get<PokeAPIPaginateResponse>(url);
  return data.results.map((pokemon) => {
    const id = Number(pokemon.url.split("/").at(-2));
    return {
      id,
      name: pokemon.name,
    };
  });
};

/* 
  {
    id: 1,
    name: 'bulbasaur',
  },
*/
