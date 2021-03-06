import { Actionsheet, AspectRatio, Box, Fab, Heading, Icon, Image, Pressable, ScrollView, Spacer, Stack, Text, useDisclose } from 'native-base'
import { useEffect, useState } from 'react'
import { getChannels } from '../firebase'
import LoadingScreen from './LoadingScreen'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

export default function ({ subdChnls, setSubdChnls }) {
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState('true')
  const [currentLongPress, setCurrentLongPress] = useState('')

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose()
  const navigation = useNavigation()
  const customOnClose = () => {
    setCurrentLongPress('')
    onClose()
  }
  useEffect(() => {
    if (subdChnls.length > 0) {
      getChannels(subdChnls).then(chnls => {
        setChannels(chnls.docs)
        setLoading(false)
      }).catch(err => console.error(err))
    } else {
      setChannels([])
      setLoading(false)
    }
  }, [subdChnls])
  useEffect(() => {
    if (currentLongPress) {
      onOpen()
    }
  }, [currentLongPress])
  const Channels = channels.map(chnl =>
    <Pressable
      marginY='2' alignItems='center' key={chnl.get('id')}

      onPress={() => navigation.navigate('Posts', {
        chnlId: chnl.get('id'),
        chnlName: chnl.get('name')
      })}
      onLongPress={() => {
        setCurrentLongPress(chnl.get('id'))
      }}
    >
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
                uri: chnl.get('imgUrl')
              }} alt={chnl.get('name') + ' image'}
            />
          </AspectRatio>
        </Box>
        <Stack p='4' space={3}>
          <Stack space={2}>
            <Heading size='md' ml='-1'>
              {chnl.get('name')}
            </Heading>
            <Text
              fontSize='xs' _light={{
                color: 'primary.500'
              }} _dark={{
                color: 'primary.400'
              }} fontWeight='500' ml='-0.5' mt='-1'
            >
              {chnl.get('fullname')}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Pressable>)
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
            {Channels.length > 0
              ? Channels
              : <Box w='full'>
                <Text fontSize='3xl' fontFamily='heading' fontWeight='bold' color='gray.500'>Subscribe to channels using
                  <Text color='primary.200'> + Button below </Text>
                </Text>
              </Box>}
            <Actionsheet isOpen={isOpen} onClose={customOnClose} >
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
                  const updChnls = subdChnls.filter(chnl => chnl !== currentLongPress)
                  setSubdChnls(updChnls)
                  customOnClose()
                }}
                >Delete
                </Actionsheet.Item>
                <Actionsheet.Item onPress={() => {
                  customOnClose()
                }}>Cancel</Actionsheet.Item>
              </Actionsheet.Content>
            </Actionsheet>
          </Box>
          <Fab
            my='4'
            renderInPortal={false} shadow={2} placement='' size='sm' icon={<Icon color='white' as={MaterialIcons} name='add' size='sm' />}
            onPress={() => {
              navigation.navigate('AddChannels')
            }}
          />
        </>}

    </ScrollView>
  )
}
