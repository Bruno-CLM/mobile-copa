import { useFocusEffect } from "@react-navigation/native";
import { HStack, Text, VStack } from "native-base";
import { useCallback, useState } from "react";
import LogoCopa from '../assets/fifa-logo.svg'
import { getParsedDate } from "../utils/dateFormat";

export function EmptyMatcherList(){

  async function days(){
    var date = new Date().getDate()
    var diffDate = 20 - date
    setDaysInitial(diffDate > 0 ? diffDate : 0)
  }
  
  const [daysInitial, setDaysInitial] = useState<number>(0)

  useFocusEffect(useCallback(() => {
    days()
  }, []))

  return (
    <VStack alignItems="center" justifyContent="center" flex={1}>
      <LogoCopa width={250} height={400}/>
      <Text color="gray.200" textAlign="center" fontWeight="bold" mt={2}>
      {daysInitial > 1 ? "Faltam" : "Falta"} {daysInitial} {daysInitial > 1 ? "dias" : "dia"} para o início, após o início{'\n'} todas as partidas do dia correspondente serão exibidas aqui.
      </Text>
    </VStack>
  )
}