import { Box, Button, Center, Flex, Icon, Input, Stack } from 'native-base'
import { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { signIn } from '../firebase'

export default function AdminSignIn({ }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const handleLogin = () => {
    signIn(email, password).catch(err => console.error(err))
  }

  return (
    <Flex alignItems='center' justifyContent='center' h='full' w='full'>
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
            }} type={show ? 'text' : 'password'} InputRightElement={<Icon
              as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
              size={5} mr='2' color='muted.400' onPress={() => setShow(!show)}
            />} placeholder='Password' value={password}
            onChangeText={text => setPassword(text)}
          />
          <Button colorScheme='primary' rounded='lg' onPress={handleLogin}>Log In</Button>
        </Stack>
      </Box>
    </Flex>
  )
}
