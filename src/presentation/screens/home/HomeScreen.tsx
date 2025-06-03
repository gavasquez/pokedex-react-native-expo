import { View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';

export const HomeScreen = () => {

  const { isLoading, data } = useQuery( {
    queryKey: [ 'pokemons' ],
    queryFn: () => getPokemons(),
  } );

  return (
    <View>
      <Text variant="displaySmall">Home Screen</Text>
      {
        isLoading ? <ActivityIndicator /> : <Button icon="camera" mode="contained" onPress={ () => console.log( 'Pressed' ) }>
          Press me
        </Button>
      }

    </View>
  );
};