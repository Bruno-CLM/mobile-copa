import { HStack, Icon, Text, VStack } from "native-base";
import CountryFlag from "react-native-country-flag";

export interface MatcherGame{
  id?: number;
  group: string;
  fistTeamCoutryName: string;
  isoCodeFistTeamCoutryName: string;
  isoCodeSecondTeamCoutryName: string;
  secondTeamCoutryName: string;
  dayMatcher: string;
  hourMatcher: string;
  dateMatcher: string;
}

export function CardMatches({...props}: MatcherGame){
  return (
     <VStack         
     w="full"
     h={160}
     bgColor="gray.600"
     borderBottomWidth={3}
     borderBottomColor="green.500"
     justifyContent="space-between"
     rounded="sm"
     mb={3}
     p={3}>
      <Text color='white' fontSize="lg" fontWeight='black' textAlign='center'>{props.group}</Text>
      <VStack flex={1} mt={3}>
        <VStack flex={1} w="full" justifyContent="center" >
          <HStack flex={1} alignItems="center" justifyContent="center">
            <HStack alignItems="center" pr={2}>
              <CountryFlag isoCode={props.isoCodeFistTeamCoutryName} size={14} />
              <Text ml={2} color='white' fontWeight='bold' fontSize="sm">{props.fistTeamCoutryName}</Text>
            </HStack>
            <Text color='white' fontWeight='bold' fontSize="sm">x</Text>
            <HStack alignItems="center" pl={2}>
              <CountryFlag isoCode={props.isoCodeSecondTeamCoutryName} size={14}/>
              <Text ml={2} color='white' fontWeight='bold' fontSize="sm">{props.secondTeamCoutryName}</Text>
            </HStack>
          </HStack>
          <HStack flex={1} justifyContent="center" mt={2}>
            <VStack alignItems="center" justifyContent="center">
              <HStack >
                <Text color='white' fontWeight='bold' fontSize="sm">{props.dayMatcher}</Text>
                <Text color='white' fontWeight='bold' fontSize="sm" ml={2} mr={2}>-</Text>
                <Text color='white' fontWeight='bold' fontSize="sm">{props.hourMatcher}</Text>
              </HStack>
              <Text color='white' fontWeight='bold' fontSize="sm">{props.dateMatcher}</Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
     </VStack>

     
  )
}