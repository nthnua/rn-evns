import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { useEffect, useState } from 'react'
import AllChannels from './features/Channels/AllChannels'
import SubscribedChannels from './features/Channels/SubscribedChannels'
import Posts from './features/Posts/Posts'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App () {
  const [subdChnls, setSubdChnls] = useState([])
  useEffect(() => {
    AsyncStorage.getItem('subscriptions').then(subscriptions => {
      setSubdChnls(JSON.parse(subscriptions))
    }).catch(err => console.error(err))
  }, [])

  useEffect(() => {
    const jsonValue = JSON.stringify(subdChnls)
    AsyncStorage.setItem('subscriptions', jsonValue).catch(err => console.error(err))
  }, [subdChnls])
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen name='Home' children={() => <SubscribedChannels subdChnls={subdChnls} setSubdChnls={setSubdChnls} />} />
          <Stack.Screen
            name='Posts' component={Posts} options={({ route }) => ({
              title: route.params.chnlName
            })} initialParams={{
              subdChnls,
              setSubdChnls
            }}
          />
          <Stack.Screen name='AddChannels' children={() => <AllChannels subdChnls={subdChnls} setSubdChnls={setSubdChnls} />} />
        </Stack.Navigator>
        <StatusBar style='auto' />
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
