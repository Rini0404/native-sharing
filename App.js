import Pages from './Screens/Pages/Pages';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <Pages />
    </SafeAreaProvider>
  );
}

