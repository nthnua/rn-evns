import { useNavigation } from '@react-navigation/native'
import { Button } from 'native-base'

export default function Welcome({ setFresh }) {
    const navigation = useNavigation()
    return <>
        <Button onPress={() => {
            setFresh(false)
            navigation.navigate('UserHome')
        }}>Skip</Button>
        <Button onPress={() => navigation.navigate('SignIn')}>Sign-In</Button>
    </>
}
