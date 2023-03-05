import { HStack, useToast, VStack } from "native-base";
import { Share } from "react-native";
import { Header } from "../components/Header";
import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { api } from "../service/api";
import { PollProsp } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";

interface RouteParams {
  id: string;
}

export function Details(){

  const [optionsSelected, setOptionSelected] = useState<"guesses" | "ranking">("guesses")
  const [isLoading, setIsLoading] = useState(true)
  const [pollDetails, setPollsDetails] = useState<PollProsp>({} as PollProsp)
  const route = useRoute();
  const {id} = route.params as RouteParams;
  const toast = useToast()

  async function fetchPollDetails(){
    try {
      setIsLoading(true)
      const response = await api.get(`/polls/${id}`);
      setPollsDetails(response.data.poll)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Não foi possível carregar os detalhes do bolão',
        placement: 'bottom',
        bgColor: 'red.500'
      });
    }finally{
      setIsLoading(false)
    }
  }

  async function handleCodeShare(){
    await Share.share({
      message: "Código para acessar o bolão: " + pollDetails.code
    })
  }

  useEffect(() => {
    fetchPollDetails()
  }, [id])

  if(isLoading){
    return(
      <Loading />
    )
  }

  return(
    <VStack flex={1}  bgColor="gray.900">
      <Header title={pollDetails.title} showBackButton showShareButton onShare={handleCodeShare}/>
      {
        pollDetails._count?.participants > 0 ?
        <VStack px={5} flex={1}>

          <PoolHeader data={pollDetails} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>

            <Option title="Seus palpites" isSelected={optionsSelected === 'guesses'} onPress={() => setOptionSelected('guesses')}/>
            <Option title="Ranking do grupo" isSelected={optionsSelected === 'ranking'} onPress={() => setOptionSelected('ranking')} />
          </HStack>

          <Guesses pollId={pollDetails.id} code={pollDetails.code} />

        </VStack>
        : 
        <EmptyMyPoolList code={pollDetails.code} />
      }

    </VStack>
  )

}