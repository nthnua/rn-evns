import { useNavigation } from '@react-navigation/native'
import { Button, Flex, Spacer, Text } from 'native-base'

export default function Welcome({ setFresh }) {
  const navigation = useNavigation()

  return (
    <Flex alignItems='center' justifyContent='center' h='full' w='full'>
      <Spacer />
      <Text fontSize='3xl' fontFamily='heading' fontWeight='bold' color='gray.500'>Welcome to
        <Text color='primary.200'> evns, </Text>
      </Text>
      <Spacer />
      <Text fontSize='3xl' fontFamily='heading' fontWeight='bold' color='gray.500'>Are you an </Text>
      <Text fontSize='3xl' fontFamily='heading' fontWeight='bold' color='primary.400'>Administrator?</Text>
      <Button variant='outline' rounded='full' onPress={() => navigation.navigate('SignIn')}>Sign-In</Button>
      <Spacer />
    </Flex>
  )
}
