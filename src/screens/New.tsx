import { Heading, VStack, Text, useToast } from "native-base";
import { Header } from "../components/Header";
import Logo from '../assets/logo.svg';
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../service/api";
import { ToastAndroid } from "react-native";

export function New(){

  const toast = useToast();
  const [title, setTitle] = useState<string>('');
  const [isLoadingCreatePoll, setIsLoadingCreatePoll] = useState<boolean>(false);

  async function handlePollCreate(){
    if(!title.trim()){
      return toast.show({
        title: 'Informe um nome para o seu bolão',
        placement: 'bottom',
        bgColor: 'yellow.500'
      });
    }

    try {
      setIsLoadingCreatePoll(true)
      const string = await api.post('/polls',{title: title.toUpperCase})

      toast.show({
        title: 'Bolão criado com sucesso!',
        placement: 'bottom',
        bgColor: 'green.500'
      });

      setTitle('')
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possível criar o bolão',
        placement: 'bottom',
        bgColor: 'red.500'
      });
    }finally{
      setIsLoadingCreatePoll(false)
    }
  }

  return(
    <VStack flex={1} bg='gray.900'>
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
          Crie seu próprio bolão da copa {'\n'} e compartilhe entre amigos!
        </Heading>

        <Input mb={2} placeholder="Qual nome do seu bolão?" onChangeText={setTitle} value={title}/>

        <Button title="CRIAR MEU BOLÃO" onPress={handlePollCreate} isLoading={isLoadingCreatePoll} />
        
        <Text color="gray.200" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um {'\n'} código único que poderá usar para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}