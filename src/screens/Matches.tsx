import { useFocusEffect } from "@react-navigation/native";
import { FlatList, VStack } from "native-base";
import { useCallback, useState } from "react";
import { CardMatches, MatcherGame } from "../components/CardMatches";
import { EmptyMatcherList } from "../components/EmptyMatcherList";
import { Header } from "../components/Header";
import { api } from "../service/api";
import { getParsedDateUrl } from "../utils/dateFormat";

export function Matches(){

  async function listMatchesDayNow() {
    var date = getParsedDateUrl(new Date());
    const response = await api.get(`/matches/${date}`)
    setMatchersDayNow(response.data)
  }
  const [matchersDayNow, setMatchersDayNow] = useState<MatcherGame[]>([]);

  useFocusEffect(useCallback(() => {
    listMatchesDayNow()
  }, []))

  return(
    <VStack bgColor='gray.900' flex={1}>
      <Header title="Partidas" />
      <VStack mt={6} mx={5} pb={4} mb={4}>
      
      <FlatList 
        data={matchersDayNow}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => 
        <VStack>
          <CardMatches 
          group={item.group}
          fistTeamCoutryName={item.fistTeamCoutryName} 
          isoCodeFistTeamCoutryName={item.isoCodeFistTeamCoutryName} 
          isoCodeSecondTeamCoutryName={item.isoCodeSecondTeamCoutryName} 
          secondTeamCoutryName={item.secondTeamCoutryName} 
          dayMatcher={item.dayMatcher} 
          hourMatcher={item.hourMatcher} 
          dateMatcher={item.dateMatcher}        
          />
        </VStack>
        }
        px={5}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{pb: 10}}
        ListEmptyComponent={() => <EmptyMatcherList />}
      />
      </VStack>
    </VStack>
  )
}