import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { StyleSheet, Text, View } from 'react-native'
import Channels from './features/Channels/Channels'

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style='auto' />
      <Channels />
    </NativeBaseProvider >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
