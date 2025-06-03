// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import { PropsWithChildren } from 'react';
import { StackNavigation } from './presentation/navigator/StackNavigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query';



const queryClient = useQueryClient();

export const PokedexApp = ( { children }: PropsWithChildren ) => {
  return (
    <QueryClientProvider client={ queryClient }>
      <ThemeContextProvider>
        <StackNavigation />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};