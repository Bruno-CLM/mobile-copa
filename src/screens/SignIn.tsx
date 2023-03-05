import {Center, Icon, Text } from 'native-base';
import Logo from '../assets/logo.svg'
import { Button } from '../components/Button';
import {Fontisto, Entypo} from '@expo/vector-icons'
import { userAuth } from '../hooks/useAuth';
import { color } from 'native-base/lib/typescript/theme/styled-system';

export function SignIn(){
    
    const {signInGoogle, isUserLoadingGoogle, isUserLoadingFacebook, signInFacebook} = userAuth();

    return(
      <Center flex={1} bgColor="gray.950" p={7}>
        <Logo width={212} height={40}/>

        <Button 
          type='SECONDARY'
          title='ENTRAR COM GOOGLE' 
          leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
          mt={12}
          onPress={signInGoogle}
          isLoading={isUserLoadingGoogle}
          _loading={{_spinner: {color: 'white'}}}
        />

        <Button 
          type='SECONDARY'
          title='ENTRAR COM FACEBOOK' 
          leftIcon={<Icon as={Entypo} name="facebook" color="white" size="md" />}
          bg='blue.500'
          _pressed={{
            bg: 'blue.700'
          } 
          }
          mt={4}
          onPress={signInFacebook}
          _loading={{_spinner: {color: 'white'}}}
          isLoading={isUserLoadingFacebook}
        />

        <Text color="gray.200" textAlign="center" mt={4}>
          Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
        </Text>
      </Center>    
    )
}