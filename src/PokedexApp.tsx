// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import { StackNavigation } from './presentation/navigator/StackNavigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const PokedexApp = () => {
  return (
    <QueryClientProvider client={ queryClient }>
      <ThemeContextProvider>
        <StackNavigation />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};