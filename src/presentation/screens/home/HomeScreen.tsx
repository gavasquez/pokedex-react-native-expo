import { FlatList, StyleSheet, View } from 'react-native';
import { Text, FAB } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RooStackParams } from '../../navigator/StackNavigator';

interface Props extends StackScreenProps<RooStackParams, 'Home'> { }

export const HomeScreen = ( { navigation }: Props ) => {

  const { top, bottom } = useSafeAreaInsets();

  const queryCliente = useQueryClient();

  const theme = useTheme();

  // esta es la forma tradicional de una peticion http
  /* const { isLoading, data: pokemons = [] } = useQuery( {
    queryKey: [ 'pokemons' ],
    queryFn: () => getPokemons( 0 ),
  } ); */

  const { isLoading, data, fetchNextPage } = useInfiniteQuery( {
    queryKey: [ 'pokemons', 'infinite' ],
    initialPageParam: 0,
    queryFn: async ( params ) => {
      const pokemons = await getPokemons( params.pageParam );
      pokemons.forEach( pokemon => {
        queryCliente.setQueryData( [ 'pokemon', pokemon.id ], pokemon );
      } );
      return pokemons;
    },
    getNextPageParam: ( lastPage, pages ) => pages.length,
    staleTime: 1000 * 60 * 60,
  } );

  return (
    <View style={ globalTheme.globalMargin }>
      <PokeballBg style={ styles.imgPosition } />
      <FlatList
        data={ data?.pages.flat() ?? [] } // flat sirve para aplanar los datos de la query
        keyExtractor={ ( item, index ) => item.id.toString() + index.toString() }
        numColumns={ 2 }
        style={ { paddingTop: top + 20 } }
        ListHeaderComponent={ () => (
          <Text variant="displayMedium">Pokédex</Text>
        ) }
        renderItem={ ( { item: pokemon } ) => <PokemonCard pokemon={ pokemon } /> }
        onEndReachedThreshold={ 0.6 } // Nos acercamos a 60% de la lista
        onEndReached={ () => fetchNextPage() } // Cuando llegamos al final de la lista, llamamos a fetchNextPage
        showsHorizontalScrollIndicator={ false } // No mostramos el scroll horizontal
      />

      <FAB
        label="Buscar"
        style={ [ globalTheme.fab, { backgroundColor: theme.colors.primary } ] }
        mode="elevated"
        color={ theme.dark ? 'black' : 'white' }
        onPress={ () => navigation.push( 'SearchScreen' ) }
      />
    </View>
  );
};

const styles = StyleSheet.create( {
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  }
} );