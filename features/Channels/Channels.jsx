import { AspectRatio, Box, Heading, Image, ScrollView, Skeleton, Stack, Text } from 'native-base'
import { useEffect, useState } from 'react'
import { getChannels } from '../firebase'
import LoadingScreen from './LoadingScreen'

export default function ({ navigation }) {
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState('true')
  useEffect(() => {
    getChannels('1').then(chnls => {
      setChannels(chnls.docs)
      setLoading(false)
    }).catch(err => console.error(err))
  }, [])
  const Channels = channels.map(chnl => <Box
    marginY='3' alignItems='center' key={chnl.get('id')} onTouchEnd={() => navigation.navigate('Posts', {
      chnlId: chnl.get('id')
    })}
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
              color: 'violet.500'
            }} _dark={{
              color: 'violet.400'
            }} fontWeight='500' ml='-0.5' mt='-1'
          >
            {chnl.get('fullname')}
          </Text>
        </Stack>
      </Stack>
    </Box>
  </Box>)
  return (
    <ScrollView
      maxW='full' h='80' _contentContainerStyle={{
        px: '20px',
        mb: '4',
        minW: '72'
      }}
    >
      {loading ? <LoadingScreen /> : <Box safeAreaTop='8' safeAreaBottom='8'>{Channels}</Box>}
    </ScrollView>
  )
}
