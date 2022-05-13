import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Button, NativeBaseProvider } from 'native-base'
import { useEffect, useState } from 'react'
import SubscribedChannels from './features/Channels/SubscribedChannels'
import Posts from './features/Posts/Posts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AdminChannels from './features/Admin/AdminChannels'
import AdminPosts from './features/Admin/AdminPosts'
import Welcome from './features/Welcome/Welcome'
import AdminSignIn from './features/Admin/AdminSignin'
import { atchSignIn, signOutAdmin } from './features/firebase'
import AllChannels from './features/Channels/AllChannels'

export default function App() {
  const [subdChnls, setSubdChnls] = useState([])
  const [userInfo, setUserInfo] = useState({
    isAdmin: false,
    userId: ''
  })
  const [fresh, setFresh] = useState(true)
  //const [initialRouteName, setInitialRouteName] = useState('')

  // useEffect(() => {
  //   if (userInfo.isAdmin) {
  //     setInitialRouteName('AdminHome')
  //   }
  //   else if (!fresh) {
  //     setInitialRouteName('UserHome')
  //   }
  //   else {
  //     setInitialRouteName('Welcome')
  //   }
  // }, [userInfo])
  useEffect(() => {
    AsyncStorage.getItem('subscriptions').then(subscriptions => {
      const subs = JSON.parse(subscriptions)
      if (typeof (subs) === Array) {
        setSubdChnls(subs)
      }
    }).catch(err => console.error(err))
    AsyncStorage.getItem('userInfo').then(userInfo => {
      setUserInfo(JSON.parse(userInfo))
    }).catch(err => console.error(err))
    AsyncStorage.getItem('fresh').then(fr => {
      setFresh(JSON.parse(fr))
    }).catch(err => console.error(err))
  }, [])

  useEffect(() => {
    const jsonValue = JSON.stringify(subdChnls)
    AsyncStorage.setItem('subscriptions', jsonValue).catch(err => console.error(err))
  }, [subdChnls])
  useEffect(() => {
    const jsonValue = JSON.stringify(userInfo)
    AsyncStorage.setItem('userInfo', jsonValue).catch(err => console.error(err))
  }, [userInfo])
  useEffect(() => {
    console.log(fresh)
    const jsonValue = JSON.stringify(fresh)
    AsyncStorage.setItem('fresh', jsonValue).catch(err => console.error(err))
  }, [fresh])
  useEffect(() => {
    atchSignIn(setFresh, setUserInfo)
  }, [])
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {
          fresh ?
            <Stack.Navigator initialRouteName='Welcome'
            >
              <Stack.Screen name='Welcome' options={{
                headerShown: false
              }} children={() => <Welcome setFresh={setFresh} />} />
              <Stack.Screen name='SignIn' options={{
                headerShown: false
              }} children={() => <AdminSignIn setUserInfo={setUserInfo} />}
              />
              <Stack.Screen name='UserHome' children={() => <SubscribedChannels subdChnls={subdChnls} setSubdChnls={setSubdChnls} />} />
              <Stack.Screen name='AddChannels' children={() => <AllChannels subdChnls={subdChnls} setSubdChnls={setSubdChnls} />} />
              <Stack.Screen
                name='Posts' component={Posts} options={({ route }) => ({
                  title: route.params.chnlName
                })}
              />
              <Stack.Screen name='AdminHome' options={{
                headerRight: () => (
                  <Button
                    onPress={() => {
                      signOutAdmin()
                    }}>
                    Sign Out
                  </Button>
                ),
              }} children={() => <AdminChannels userId={userInfo.userId} />} />
              <Stack.Screen
                name='AdminPosts' options={({ route }) => ({
                  title: route.params.chnlName
                })} children={() => <AdminPosts adminId={userInfo.userId} />}
              />
            </Stack.Navigator> :
            <Stack.Navigator initialRouteName={userInfo.isAdmin ? 'AdminHome' : 'UserHome'}
            >
              <Stack.Screen name='Welcome' options={{
                headerShown: false
              }} children={() => <Welcome setFresh={setFresh} />} />
              <Stack.Screen name='SignIn' options={{
                headerShown: false
              }} children={() => <AdminSignIn setUserInfo={setUserInfo} />}
              />
              <Stack.Screen name='UserHome'
                options={{
                  headerRight: () => (
                    <Button
                      onPress={() => {
                        setFresh(true)
                      }}>
                      Sign Out
                    </Button>
                  ),
                }}
                children={() => <SubscribedChannels subdChnls={subdChnls} setSubdChnls={setSubdChnls} />} />
              <Stack.Screen name='AddChannels' children={() => <AllChannels subdChnls={subdChnls} setSubdChnls={setSubdChnls} />} />
              <Stack.Screen
                name='Posts' component={Posts} options={({ route }) => ({
                  title: route.params.chnlName
                })}
              />
              <Stack.Screen name='AdminHome' options={{
                headerRight: () => (
                  <Button
                    onPress={() => {
                      signOutAdmin()
                    }}>
                    Sign Out
                  </Button>
                ),
              }} children={() => <AdminChannels userId={userInfo.userId} />} />
              <Stack.Screen
                name='AdminPosts' options={({ route }) => ({
                  title: route.params.chnlName
                })} children={() => <AdminPosts adminId={userInfo.userId} />}
              />
            </Stack.Navigator>
        }
        <StatusBar style='auto' />
      </NativeBaseProvider>
    </NavigationContainer >
  )
}
