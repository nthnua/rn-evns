import { AspectRatio, Box, Button, FormControl, Heading, Image, Input, ScrollView, Stack, Text, TextArea, WarningOutlineIcon } from 'native-base'
import { useEffect, useState } from 'react'
import LoadingScreen from '../Channels/LoadingScreen'
import { getPosts, sendMessage, subscribe } from '../firebase'
import { Linking } from 'react-native'
import { useRoute } from '@react-navigation/native'

export default function ({ adminId }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState('true')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [contacts, setContacts] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [infoUrls, setInfoUrls] = useState('')
  const [inputError, setInputError] = useState(false)

  const route = useRoute()
  const { chnlId } = route.params
  const handleSend = () => {
    if (title && body && contacts && imgUrl && infoUrls) {
      const urls = infoUrls.split('\n').map(url => url !== '' ? 'http://' + url : null)
      const contactsArray = contacts.split('\n')
      const imageUrl = 'http://' + imgUrl
      sendMessage(chnlId, adminId, body, title, contactsArray, urls, imageUrl).then((data) => {
        setBody('')
        setTitle('')
        setContacts('')
        setImgUrl('')
        setInfoUrls('')
      }).catch(err => console.error(err))
    } else {
      setInputError(true)
    }
  }

  useEffect(() => {
    const unsub = subscribe(chnlId, setPosts, setLoading)
    return unsub
  }, [])
  const Posts = posts.map(post => <Box marginY='2' alignItems='center' key={post.get('id')}>
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
            {post.get('name')}
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
              color: 'green.500'
            }} _dark={{
              color: 'green.400'
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
              color: 'green.500'
            }} _dark={{
              color: 'green.400'
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
          <Box alignItems='center' w='100%'>
            <TextArea rounded='lg' h={10} isRequired placeholder='Title' w='100%' value={title} onChangeText={(e) => setTitle(e)} />
          </Box>
          <Box alignItems='center' w='100%'>
            <TextArea rounded='lg' h={20} placeholder='Body' value={body} onChangeText={(e) => setBody(e)} w='100%' />
          </Box>
          <Box alignItems='center' w='100%'>
            <TextArea rounded='lg' h={20} placeholder='Contacts' value={contacts} onChangeText={(e) => setContacts(e)} w='100%' />
          </Box>
          <Box alignItems='center' w='100%'>
            <TextArea rounded='lg' h={10} placeholder='Image URL' w='100%' value={imgUrl} onChangeText={(e) => setImgUrl(e)} />
          </Box>
          <Box alignItems='center' w='100%'>
            <TextArea rounded='lg' h={20} placeholder='Registration/Info URLs' w='100%' value={infoUrls} onChangeText={(e) => setInfoUrls(e)} />
          </Box>
          <Button rounded='lg' onPress={handleSend} colorScheme={inputError ? 'error' : 'info'} my='2'>
            {inputError ? 'Fill all the fields properly' : 'Send'}
          </Button>
        </Box>}
    </ScrollView>
  )
}
