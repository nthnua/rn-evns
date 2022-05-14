import { Actionsheet, AspectRatio, Box, Button, Heading, Image, Pressable, ScrollView, Stack, Text, TextArea, useDisclose } from 'native-base'
import { useEffect, useState } from 'react'
import LoadingScreen from '../Channels/LoadingScreen'
import { deleteMessage, sendMessage, subscribe, uploadImage } from '../firebase'
import { Linking } from 'react-native'
import { useRoute } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

export default function ({ adminId }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState('true')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [contacts, setContacts] = useState('')
  const [infoUrls, setInfoUrls] = useState('')
  const [inputError, setInputError] = useState(false)
  const [currentLongPress, setCurrentLongPress] = useState('')
  const [updImg, setUpdImg] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [sending, setSending] = useState(false)

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose()

  const route = useRoute()
  const { chnlId } = route.params
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    }).then(result => {
      if (!result.cancelled) {
        setUpdImg(result.uri)
      }
    }).catch(err => console.error(err))
  }
  const handleSend = () => {
    if (title && body && contacts && infoUrls && updImg) {
      setSending(true)
      setUploading(true)
      const urls = infoUrls.split('\n').map(url => url !== '' ? 'http://' + url : null)
      const contactsArray = contacts.split('\n')
      uploadImage(updImg, chnlId).then(imgUrl => {
        setUploading(false)
        sendMessage(chnlId, adminId, body, title, contactsArray, urls, imgUrl).then((data) => {
          setBody('')
          setTitle('')
          setContacts('')
          setInfoUrls('')
          setSending(false)
        }).catch(err => {
          console.error(err)
          setSending(false)
        })
      }).catch(err => {
        console.error(err)
        setUploading(false)
      })
    } else {
      setInputError(true)
    }
  }

  useEffect(() => {
    const unsub = subscribe(chnlId, setPosts, setLoading)
    return unsub
  }, [])
  useEffect(() => {
    if (currentLongPress) {
      onOpen()
    }
  }, [currentLongPress])
  const Posts = posts.map(post => <Pressable onLongPress={() => setCurrentLongPress(post.id)} marginY='2' alignItems='center' key={post.id}>
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
  </Pressable>
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
        : <>
          <Box safeAreaTop='8' safeAreaBottom='8'>
            {Posts}
            <Box my='2'>
              <Text fontSize='xl' fontFamily='heading'>New Post:</Text>
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
                <TextArea rounded='lg' h={20} placeholder='Registration/Info URLs' w='100%' value={infoUrls} onChangeText={(e) => setInfoUrls(e)} />
              </Box>
              <Box>
                {!!updImg && <AspectRatio w='full' ratio={4 / 3}>
                  <Image
                    rounded='lg' source={{
                      uri: updImg
                    }} alt='Uploaded Image'
                  />
                </AspectRatio>}
                <Button rounded='lg' isLoading={uploading} isLoadingText='Uploading...' my='2' onPress={pickImage}>Pick an image from camera roll</Button>
              </Box>
            </Box>
            <Button rounded='lg' isLoading={sending} isLoadingText='Sending...' onPress={handleSend} colorScheme={inputError ? 'error' : 'primary'} my='2'>
              {inputError ? 'Fill all the fields properly' : 'Send'}
            </Button>
          </Box>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <Box w='100%' h={60} px={4} justifyContent='center'>
                <Text
                  fontSize='16' color='gray.500' _dark={{
                    color: 'gray.300'
                  }}
                >
                  Options
                </Text>
              </Box>
              <Actionsheet.Item onPress={() => {
                deleteMessage(currentLongPress).then(() => {
                  onClose()
                }).catch(err => console.error(err))
              }}
              >Delete
              </Actionsheet.Item>
              <Actionsheet.Item>Cancel</Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
        </>}
    </ScrollView>
  )
}
