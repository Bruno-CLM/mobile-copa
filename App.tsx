import { NativeBaseProvider, StatusBar } from 'native-base';
import { THEME } from './src/styles/theme'; 
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from'@expo-google-fonts/roboto'
import { Loading } from './src/components/Loading';
import { AuthContextProviderGoogle } from './src/context/AuthContext';
import { Routes } from './src/routes';


export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProviderGoogle>
        <StatusBar 
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        {
          fontsLoaded ? <Routes /> :  <Loading />
        }
      </AuthContextProviderGoogle>
    </NativeBaseProvider>
  );
}