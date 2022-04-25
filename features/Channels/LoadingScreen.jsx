import { Box, Center, Skeleton, Spacer, VStack } from 'native-base';

export default function () {
    return <Box safeAreaTop='8' safeAreaBottom='8'>
        <Center w="100%" marginY='3' >
            <VStack w="98%" maxW="400" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                borderColor: "coolGray.500"
            }} _light={{
                borderColor: "coolGray.200"
            }}>
                <Skeleton h='32' />
                <Skeleton.Text px="4" />
                <Spacer />
            </VStack>
        </Center>
        <Center w="100%" marginY='3' >
            <VStack w="98%" maxW="400" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                borderColor: "coolGray.500"
            }} _light={{
                borderColor: "coolGray.200"
            }}>
                <Skeleton h='32' />
                <Skeleton.Text px="4" />
                <Spacer />
            </VStack>
        </Center>
    </Box >
}