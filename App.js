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
import theme from './theme'

export default function App() {
  const [subdChnls, setSubdChnls] = useState([])
  const [userInfo, setUserInfo] = useState({
    isAdmin: false,
    userId: ''
  })
  const [fresh, setFresh] = useState(true)
  useEffect(() => {
    AsyncStorage.getItem('subscriptions').then(subscriptions => {
      const subs = JSON.parse(subscriptions)
      if (typeof (subs) === 'object') {
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
    const jsonValue = JSON.stringify(fresh)
    AsyncStorage.setItem('fresh', jsonValue).catch(err => console.error(err))
  }, [fresh])
  useEffect(() => {
    atchSignIn(setFresh, setUserInfo)
  }, [])
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Stack.Navigator>
          {
            fresh
              ? (
                <>
                  <Stack.Screen
                    name='Welcome' options={{
                      headerRight: () => (
                        <Button
                          variant='ghost'
                          onPress={() => {
                            setFresh(false)
                          }}
                        >
                          Skip
                        </Button>
                      )
                    }} children={() => <Welcome setFresh={setFresh} />}
                  />
                </>
              )
              : (
                userInfo.isAdmin
                  ? (
                    <>
                      <Stack.Screen
                        name='AdminHome' options={{
                          headerRight: () => (
                            <Button
                              variant='ghost'
                              onPress={() => {
                                signOutAdmin()
                              }}
                            >
                              Sign Out
                            </Button>
                          )
                        }} children={() => <AdminChannels userId={userInfo.userId} />}
                      />
                      <Stack.Screen
                        name='AdminPosts' options={({ route }) => ({
                          title: route.params.chnlName
                        })} children={() => <AdminPosts adminId={userInfo.userId} />}
                      />
                    </>
                  )
                  : (
                    <>
                      <Stack.Screen
                        name='UserHome' children={() => <SubscribedChannels subdChnls={subdChnls} setSubdChnls={setSubdChnls} />}
                        options={
                          {
                            headerRight: () => (
                              <Button
                                variant='ghost'
                                onPress={() => {
                                  setFresh(true)
                                }}
                              >
                                Admin?
                              </Button>
                            )
                          }
                        }
                      />
                      <Stack.Screen name='AddChannels' children={() => <AllChannels subdChnls={subdChnls} setSubdChnls={setSubdChnls} />} />
                      <Stack.Screen
                        name='Posts' component={Posts} options={({ route }) => ({
                          title: route.params.chnlName
                        })}
                      />
                    </>
                  ))
          }
          <Stack.Screen
            navigationKey={userInfo.isAdmin ? 'admin' : 'user'}
            name='SignIn' options={{
              headerShown: false
            }} children={() => <AdminSignIn setUserInfo={setUserInfo} />}
          />
        </Stack.Navigator>
        <StatusBar style='auto' />
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
