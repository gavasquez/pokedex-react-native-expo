import { FlatList, View } from 'react-native';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { Pokemon } from '../../../domain/entities/pokemon';
import { useQuery } from '@tanstack/react-query';
import { getPokemonsNamesWithId } from '../../../actions/pokemons';


export const SearchScreen = () => {

  const { top } = useSafeAreaInsets();

  const { isLoading, data: pokemonNameList = [] } = useQuery( {
    queryKey: [ 'pokemons', 'all' ],
    queryFn: () => getPokemonsNamesWithId(),
  } );

  return (
    <View style={ [ globalTheme.globalMargin, { paddingTop: top + 20 } ] }>
      <TextInput
        placeholder="Buscar Pokémon"
        mode="flat"
        autoFocus
        autoCorrect={ false }
        onChangeText={ ( value ) => console.log( value ) }
        value={ 'Hola mundo' }
      />

      <ActivityIndicator style={ { paddingTop: 20 } } />

      <FlatList
        data={ [] as Pokemon[] } // flat sirve para aplanar los datos de la query
        keyExtractor={ ( item, index ) => item.id.toString() + index.toString() }
        numColumns={ 2 }
        style={ { paddingTop: top + 20 } }
        renderItem={ ( { item: pokemon } ) => <PokemonCard pokemon={ pokemon } /> }
        showsHorizontalScrollIndicator={ false }
      />
    </View>
  );
};