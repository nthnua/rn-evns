import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { useEffect, useState } from 'react'
import SubscribedChannels from './features/Channels/SubscribedChannels'
import Posts from './features/Posts/Posts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AdminChannels from './features/Admin/AdminChannels'
import AdminPosts from './features/Admin/AdminPosts'

export default function App () {
  const [subdChnls, setSubdChnls] = useState([])
  const [adminInfo, setAdminInfo] = useState({
    isAdmin: false,
    userId: ''
  })

  useEffect(() => {
    AsyncStorage.getItem('subscriptions').then(subscriptions => {
      setSubdChnls(JSON.parse(subscriptions))
    }).catch(err => console.error(err))
    AsyncStorage.getItem('adminInfo').then(adminInfo => {
      setAdminInfo(JSON.parse(adminInfo))
    }).catch(err => console.error(err))
  }, [])

  useEffect(() => {
    const jsonValue = JSON.stringify(subdChnls)
    AsyncStorage.setItem('subscriptions', jsonValue).catch(err => console.error(err))
  }, [subdChnls])
  useEffect(() => {
    const jsonValue = JSON.stringify(
      {
        isAdmin: true,
        userId: '12'
      }
    )
    AsyncStorage.setItem('adminInfo', jsonValue).catch(err => console.error(err))
  }, [adminInfo])
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator initialRouteName={adminInfo.isAdmin ? 'AdminHome' : 'UserHome'}>
          <Stack.Screen name='UserHome' children={() => <SubscribedChannels subdChnls={subdChnls} setSubdChnls={setSubdChnls} />} />
          <Stack.Screen
            name='Posts' component={Posts} options={({ route }) => ({
              title: route.params.chnlName
            })}
          />
          <Stack.Screen name='AdminHome' children={() => <AdminChannels userId={adminInfo.userId} />} />
          <Stack.Screen
            name='AdminPosts' options={({ route }) => ({
              title: route.params.chnlName
            })} children={() => <AdminPosts adminId={adminInfo.userId} />}
          />
        </Stack.Navigator>
        <StatusBar style='auto' />
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
