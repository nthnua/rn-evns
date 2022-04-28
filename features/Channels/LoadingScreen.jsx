import { Box, Center, Skeleton, Spacer, VStack } from 'native-base'

export default function () {
    return (
        <Box safeAreaTop='8' safeAreaBottom='8'>
            <Center w='100%' marginY='2'>
                <VStack
                    w='98%' maxW='400' borderWidth='1' space={8} overflow='hidden' rounded='md' _dark={{
                        borderColor: 'coolGray.500'
                    }} _light={{
                        borderColor: 'coolGray.200',
                        backgroundColor: 'blue.50'
                    }}
                >
                    <Skeleton h='32' startColor='gray.50' />
                    <Skeleton.Text px='4' startColor='violet.200' />
                    <Spacer />
                </VStack>
            </Center>
            <Center w='100%' marginY='2'>
                <VStack
                    w='98%' maxW='400' borderWidth='1' space={8} overflow='hidden' rounded='md' _dark={{
                        borderColor: 'coolGray.500'
                    }} _light={{
                        borderColor: 'coolGray.200',
                        backgroundColor: 'blue.50'
                    }}
                >
                    <Skeleton h='32' startColor='grey.50' />
                    <Skeleton.Text px='4' startColor='violet.200' />
                    <Spacer />
                </VStack>
            </Center>
        </Box>
    )
}
