import { FlatList, View } from 'react-native';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonsByIds, getPokemonsNamesWithId } from '../../../actions/pokemons';
import { useMemo, useState } from 'react';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';


export const SearchScreen = () => {

  const { top } = useSafeAreaInsets();
  const [ term, setTerm ] = useState( '' );

  const debouncedValue = useDebouncedValue( term, 500 );

  const { isLoading, data: pokemonNameList = [] } = useQuery( {
    queryKey: [ 'pokemons', 'all' ],
    queryFn: () => getPokemonsNamesWithId(),
  } );

  const pokemonNameIdList = useMemo( () => {
    // Es un número
    if ( !isNaN( Number( debouncedValue ) ) ) {
      const pokemon = pokemonNameList.find( ( pokemon ) => pokemon.id === Number( debouncedValue ) );
      return pokemon ? [ pokemon ] : [];
    }

    if ( debouncedValue.length === 0 ) return [];
    if ( debouncedValue.length < 3 ) return [];

    return pokemonNameList.filter( ( pokemon ) => pokemon.name.includes( debouncedValue.toLocaleLowerCase() ) );

  }, [ debouncedValue ] );

  const { isLoading: isLoadingPokemons, data: pokemons = [] } = useQuery( {
    queryKey: [ 'pokemons', 'by', pokemonNameIdList ],
    queryFn: () => getPokemonsByIds( pokemonNameIdList.map( ( pokemon ) => pokemon.id ) ),
    staleTime: 1000 * 60 * 5,
  } );

  if ( isLoading ) return <FullScreenLoader />;

  return (
    <View style={ [ globalTheme.globalMargin, { paddingTop: top + 20 } ] }>
      <TextInput
        placeholder="Buscar Pokémon"
        mode="flat"
        autoFocus
        autoCorrect={ false }
        onChangeText={ setTerm }
        value={ term }
      />

      {
        isLoadingPokemons && <ActivityIndicator style={ { paddingTop: 20 } } />
      }

      {/* <Text>{ JSON.stringify( pokemonNameIdList, null, 2 ) }</Text> */ }

      <FlatList
        data={ pokemons } // flat sirve para aplanar los datos de la query
        keyExtractor={ ( item, index ) => item.id.toString() + index.toString() }
        numColumns={ 2 }
        style={ { paddingTop: top + 20 } }
        renderItem={ ( { item: pokemon } ) => <PokemonCard pokemon={ pokemon } /> }
        showsHorizontalScrollIndicator={ false }
        ListFooterComponent={ <View style={ { height: 150 } } /> }
      />
    </View>
  );
};