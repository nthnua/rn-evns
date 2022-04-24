import { AspectRatio, Box, Center, Heading, HStack, Image, ScrollView, Stack, Text } from 'native-base'
import { useEffect, useState } from 'react'
import { addUser, getChannels } from '../firebase'

export default function () {
    // addUser(1, 'tester', 'user', ['a', 'b'])
    const [channels, setChannels] = useState([])
    useEffect(() => {
        getChannels('1').then(chnls => {
            setChannels(chnls.docs)
        })
        // .then(chnls => {
        //     chnls.forEach(chnl => {

        //     })
        // }).catch(err => console.error(err))
    }, [])
    const Channels = channels.map(chnl => <Box alignItems='center' key={chnl.get('id')}>
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
                    <Text fontWeight={'bold'}>
                        {chnl.get('desc')}
                    </Text>
                </Stack>
            </Stack>
        </Box>
    </Box>)
    // const Cards = channels.map(channel => {
    //     return <TouchableRipple
    //         key={channel.get('id')}
    //         onPress={() => console.log('Pressed')}
    //         rippleColor="rgba(0, 0, 0, .32)"
    //     >
    //         <Card >
    //             <Card.Cover source={{ uri: channel.get('imgUrl') }} />
    //             <Card.Title title={channel.get('name')} subtitle={channel.get('desc')} />
    //         </Card>
    //     </TouchableRipple>
    // })
    return (
        <ScrollView
            maxW='full' h='80' _contentContainerStyle={{
                px: '20px',
                mb: '4',
                minW: '72'
            }}
        >
            <Box safeAreaTop='8' safeAreaBottom='8'>
                {Channels}
            </Box>
        </ScrollView>
    )
}
