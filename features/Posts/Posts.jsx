import { AspectRatio, Box, Heading, Image, ScrollView, Stack, Text } from 'native-base'
import { useEffect, useState } from 'react'
import LoadingScreen from '../Channels/LoadingScreen'
import { subscribe } from '../firebase'
import { Linking } from 'react-native'

export default function ({ route, navigation }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState('true')
  const { chnlId } = route.params
  useEffect(() => {
    const unsub = subscribe(chnlId, setPosts, setLoading)
    return unsub
  }, [])

  const Posts = posts.map(post => <Box marginY='2' alignItems='center' key={post.id}>
    <Box
      maxW='full' rounded='lg' overflow='hidden' borderColor='coolGray.200' borderWidth='1' _dark={{
        borderColor: 'coolGray.600',
        backgroundColor: 'gray.700'
      }} _web={{
        shadow: 2,
        borderWidth: 0
      }} _light={{
        backgroundColor: 'gray.50'
      }}
    >
      <Box>
        <AspectRatio ratio={21 / 9} w='full'>
          <Image
            source={{
              uri: post.get('imgUrl')
            }} alt={post.get('name') + ' image'}
          />
        </AspectRatio>
      </Box>
      <Stack p='4' space={3}>
        <Stack space={2}>
          <Heading size='md' ml='-1'>
            {post.get('title')}
          </Heading>
          <Text
            fontSize='xs' _light={{
              color: 'blue.500'
            }} _dark={{
              color: 'blue.400'
            }} fontWeight='500' ml='-0.5' mt='-1'
          >
            {Date(post.get('time'))}
          </Text>
          <Text
            fontSize='xs' _light={{
              color: 'blue.500'
            }} _dark={{
              color: 'blue.400'
            }} fontWeight='bold' ml='-0.5' mt='-1'
          >
            {'By: ' + post.get('author')}
          </Text>
          <Text fontWeight='bold'>
            {post.get('body')}
          </Text>
          <Text fontWeight='bold'>
            Urls:
          </Text>
          {post.get('urls').map((url, i) => <Text
            key={url + i}
            onPress={() => Linking.openURL(`${url}`)}
            fontSize='xs' _light={{
              color: 'primary.300'
            }} _dark={{
              color: 'primary.200'
            }} fontWeight='bold' ml='-0.5' mt='-1'
          >
            {url}
          </Text>)}
          <Text fontWeight='bold'>
            Contact Numbers:
          </Text>
          {post.get('contacts').map((contact, i) => <Text
            key={contact + i}
            onPress={() => Linking.openURL(`tel:${contact}`)}
            fontSize='xs' _light={{
              color: 'primary.300'
            }} _dark={{
              color: 'primary.200'
            }} fontWeight='bold' ml='-0.5' mt='-1'
          >
            {contact}
          </Text>)}
        </Stack>
      </Stack>
    </Box>
  </Box>
  )
  return (
    <ScrollView
      maxW='full' h='80' _contentContainerStyle={{
        px: '20px',
        mb: '4',
        minW: '72'
      }}
    >
      {loading
        ? <LoadingScreen />
        : <Box safeAreaTop='8' safeAreaBottom='8'>
          {Posts}
        </Box>}
    </ScrollView>
  )
}
