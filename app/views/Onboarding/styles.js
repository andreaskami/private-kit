import { StyleSheet } from 'react-native'

const textFontSize = 14

const stylesDef = {
  mainContainer: {
    flex: 1,
    backgroundColor: '#3497fc'
  },
  logo: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },

  section: {
    marginTop: 10,
    marginBottom: 10
  },

  // Intro Screens
  content: {
    textAlign: 'justify',
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25
  },
  header: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    lineHeight: 45
  },
  text: {
    opacity: 0.8,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: textFontSize,
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
    alignSelf: 'center'
  },

  navigationDotsView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 13,
    marginLeft: 5,
    marginRight: 5
  },
  activeIndicator: {
    backgroundColor: '#665EFF'
  },
  inactiveIndicator: {
    backgroundColor: '#ccc'
  },

  rowImages: {
    flexDirection: 'row'
  },
  image: {
    flex: 1,
    width: 70,
    height: 48,
    resizeMode: 'contain'
  },

  rowButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    marginLeft: 5,
    marginRight: 5
  },

  // utils
  resetTextLineHeight: {
    lineHeight: textFontSize
  },
  underline: {
    textDecorationLine: 'underline'
  }
}

export const styles = StyleSheet.create(stylesDef)
