
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { PokemonScreen } from '../screens/pokemon/PokemonScreen';
import { SearchScreen } from '../screens/search/SearchScreen';

export type RooStackParams = {
  Home: undefined;
  PokemonScreen: { pokemonId: number; };
  SearchScreen: undefined;
};

const Stack = createStackNavigator<RooStackParams>();

export const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={ HomeScreen } />
      <Stack.Screen name="PokemonScreen" component={ PokemonScreen } />
      <Stack.Screen name="SearchScreen" component={ SearchScreen } />
    </Stack.Navigator>
  );
};