import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Button, NativeBaseProvider } from 'native-base'
import AllChannels from './features/Channels/AllChannels'
import SubscribedChannels from './features/Channels/SubscribedChannels'
import Posts from './features/Posts/Posts'

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={SubscribedChannels} />
          <Stack.Screen name='Posts' component={Posts} options={({ route }) => ({
            title: route.params.chnlName,
          })} />
          <Stack.Screen name='AddChannels' component={AllChannels} />
        </Stack.Navigator>
        <StatusBar style='auto' />
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
