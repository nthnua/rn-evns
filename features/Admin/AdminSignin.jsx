import { Box, Button, Center, Flex, Icon, Input, Stack, Text } from 'native-base'
import { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { signIn } from '../firebase'

export default function AdminSignIn ({ }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [inputError, setInputError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (email && password) {
      setLoading(true)
      signIn(email, password).then(data => {
        setLoading(false)
      })
        .catch(err => {
          console.error(err)
          setLoading(false)
          setInputError(true)
        })
    } else {
      setInputError(true)
    }
  }

  return (
    <Flex alignItems='center' justifyContent='center' h='full' w='full'>
      <Box bgColor='white' rounded='lg' safeArea='8'>
        <Box mb='10'>
          <Text fontSize='3xl' fontFamily='heading' fontWeight='bold' color='primary.200'>Sign In,</Text>
          <Text fontSize='3xl' fontFamily='heading' fontWeight='bold' color='gray.500'>To Continue</Text>
        </Box>
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
          <Button colorScheme={inputError ? 'error' : 'primary'} isLoading={loading} isLoadingText='Logging in...' rounded='full' onPress={handleLogin}>{inputError
            ? 'Enter your details properly and retry'
            : 'Log In'}
          </Button>
        </Stack>
      </Box>
    </Flex>
  )
}
