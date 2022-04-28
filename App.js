import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import Channels from './features/Channels/Channels'
import Posts from './features/Posts/Posts'

export default function App () {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Channels} />
          <Stack.Screen name='Posts' component={Posts} options={({ route }) => ({ title: route.params.chnlId })} />
        </Stack.Navigator>
        <StatusBar style='auto' />
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
