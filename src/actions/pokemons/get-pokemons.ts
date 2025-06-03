import { pokeApi } from "../../config/api/pokeApi";
import { Pokemon } from "../../domain/entities/pokemon";

export const sleep = () => {
  return new Promise( resolve => setTimeout( resolve, 1000 ) );
};

export const getPokemons = async (): Promise<Pokemon[]> => {
  await sleep();
  try {
    const url = "/pokemon";
    const { data } = await pokeApi.get(url);
    return data;
  } catch (error) {
    throw new Error("Error getting pokemons");
  }
};
