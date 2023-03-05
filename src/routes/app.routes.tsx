import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { ImageSquare, PersonSimpleRun, PlusCircle, SoccerBall, Trophy} from 'phosphor-react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

// Screens
import { New } from '../screens/New'
import { Pools } from '../screens/Pools'
import { Find } from '../screens/Find'
import { SignIn } from '../screens/SignIn'
import {Icon, useTheme} from 'native-base'
import {Platform} from 'react-native'
import { Details } from '../screens/Details'
import { Matches } from '../screens/Matches'
const {Navigator, Screen} = createBottomTabNavigator()

export function AppRoutes(){
  const {colors, sizes} = useTheme()

  const size = sizes[6]

  return (
    <Navigator
    screenOptions={{
      headerShown: false,
      tabBarLabelPosition: 'beside-icon',
      tabBarActiveTintColor: colors.yellow[500],
      tabBarInactiveTintColor: colors.gray[300],
      tabBarStyle: {
        position:  'absolute',
        height: 80,
        borderTopWidth: 0,
        backgroundColor: colors.gray[800]
      },
      tabBarItemStyle: {
        position: 'relative',
        top: Platform.OS === 'android' ? -10 : 0
      }
    }}
    >
      <Screen name='new' component={New} 
        options={{
          tabBarIcon: ({color}) => <PlusCircle color={color} size={size}/>,
          tabBarLabel: "Novo bolão"
        }}
      />
      <Screen name='poll' component={Pools} 
        options={{
          tabBarIcon: ({color}) => <SoccerBall  color={color} size={size}/>,
          tabBarLabel: "Meus bolões"
        }}
      />

      <Screen name='copa' component={Matches} 
        options={{
          tabBarIcon: ({color}) => <Trophy color={color} size={size}/>,
          tabBarLabel: "Partidas"
        }}
      />

      <Screen name='find' component={Find} 
        options={{
          tabBarButton: () => null,
        }}
      />

      <Screen name='details' component={Details} 
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  )
}