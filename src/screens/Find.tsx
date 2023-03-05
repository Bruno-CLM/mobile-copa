import { Heading, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { api } from "../service/api";

export function Find(){

  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')
  const {navigate} = useNavigation()

  const toast = useToast()

  async function handlerJoinPool() {
    try {
      setIsLoading(true)
      if(!code.trim()){
        return toast.show({
          title: 'Informe o código',
          placement: 'bottom',
          bgColor: 'yellow.500'
        });
      }
      await api.post('/polls/join', { code })
      setCode('')
      setIsLoading(false)
      navigate('poll')

      toast.show({
        title: 'Você entrou no bolão com sucesso!',
        placement: 'bottom',
        bgColor: 'green.500'
      });
    } catch (error) {
      setIsLoading(false)
      setCode('')
      console.log(error.response?.data?.message);
      if(error.response?.data?.message == 'Pool not found.'){
        toast.show({
          title: 'Bolão não encontrado!',
          placement: 'bottom',
          bgColor: 'red.500'
        });
        return;
      }
      if(error.response?.data?.message =='You already joined this poll.'){
        toast.show({
          title: 'Você já está nesse bolão!',
          placement: 'bottom',
          bgColor: 'red.500'
        });
        return;
      }
      
      toast.show({
        title: 'Não foi possível participar do bolão',
        placement: 'bottom',
        bgColor: 'red.500'
      });
    }
  }
  
  return(
    <VStack flex={1} bg='gray.900'>
      <Header title="Buscar por código" showBackButton/>

      <VStack mt={8} mx={5} alignItems="center">
        <Heading fontFamily="heading" color="white" mb={8} fontSize="xl" textAlign="center">
          Encontre um bolão através de {'\n'} seu código único
        </Heading>

        <Input mb={2} placeholder="Qual o código do bolão?" autoCapitalize="characters" onChangeText={setCode} value={code} />

        <Button title="BUSCAR BOLÃO" onPress={handlerJoinPool} isLoading={isLoading}/>
        
      </VStack>
    </VStack>
  )
}