import { useNavigation } from '@react-navigation/native'
import { Button } from 'native-base'

export default function Welcome ({ setFresh }) {
  const navigation = useNavigation()
  return <Button onPress={() => navigation.navigate('SignIn')}>Sign-In</Button>
}
