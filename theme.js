import { extendTheme } from 'native-base'

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#60FBD2',
      100: '#24F9C1',
      200: '#06DBA2',
      300: '#05B384',
      400: '#048B67',
      500: '#036349',
      600: '#024F3B',
      700: '#023C2C',
      800: '#01281D',
      900: '#01140E'
    },
    // Redefinig only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706'
    }
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'light'
  }
})

export default theme
