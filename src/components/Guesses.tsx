import { useToast, FlatList } from 'native-base';
import { useEffect, useState} from 'react';
import { api } from '../service/api';
import {GameProps, Game} from '../components/Game'
import { Loading } from './Loading';


interface Props {
  pollId: string;
  code: string;
}

export function Guesses({ pollId, code }: Props) {
  
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState<GameProps[]>([])
  const [firstTeamPoint, setFirstTeamPoints] = useState<string>('')
  const [secondTeamPoint, setSecondTeamPoints] = useState<string>('')
  const toast = useToast()

  async function fetchGames(){
    try {
      setIsLoading(true)
      const reponse = await api.get(`/polls/${pollId}/games`)
      setGames(reponse.data.games)
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

  async function handleGuessConfirm(gameId: string){
      try {
        setIsLoading(true)
        if(!firstTeamPoint.trim() || !secondTeamPoint.trim()){
          return toast.show({
            title: 'Informe o placar do palpite',
            placement: 'bottom',
            bgColor: 'red.500'
          })
        }

        await api.post(`/polls/${pollId}/games/${gameId}/guesses`, {
          firstTeamPoints: Number(firstTeamPoint),
          secondTeamPoints: Number(secondTeamPoint)
        })

        toast.show({
          title: 'Palpite realizado com sucesso',
          placement: 'bottom',
          bgColor: 'green.500'
        });

        fetchGames()
      }catch (error) {
        console.log(error.message)
        toast.show({
          title: 'Não foi possível enviar o palpite para o bolão',
          placement: 'bottom',
          bgColor: 'red.500'
        });
      }finally{
        setIsLoading(false)
      }
  }

  useEffect(() => {
    fetchGames()
  }, [pollId])

  if(isLoading){
    return <Loading />
  }

  return (
    <FlatList 
      data={games}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <Game 
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{pb: 10}}
    />
  );
}

