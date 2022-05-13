import { Box, Button, Center, FormControl, Icon, Input, Stack } from 'native-base'
import { useEffect, useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { signIn } from '../firebase'
import { useNavigation } from '@react-navigation/native'

export default function AdminSignIn({ }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)

    const navigation = useNavigation()
    const handleLogin = () => {
        signIn(email, password).then(userCreds => {
            console.log(userCreds.user.uid)
            navigation.navigate('AdminHome')
        }).catch(err => console.error(err))
    }

    return (
        <Center >
            <Box bgColor='white' rounded='lg' safeArea='8'>
                <Stack space={4} w='100%' alignItems='center'>
                    <Input
                        w={{
                            base: '75%',
                            md: '25%'
                        }} InputLeftElement={<Icon as={<MaterialIcons name='email' />} size={5} ml='2' color='muted.400' />}
                        placeholder='Email' value={email} onChangeText={text => setEmail(text)}
                    />
                    <Input
                        w={{
                            base: '75%',
                            md: '25%'
                        }} type={show ? 'text' : 'password'} InputRightElement={<Icon as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
                            size={5} mr='2' color='muted.400' onPress={() => setShow(!show)} />} placeholder='Password' value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <Button colorScheme='primary' rounded='lg' onPress={handleLogin}>Log In</Button>
                </Stack>
            </Box>
        </Center>
    )
}
