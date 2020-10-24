import {StyleSheet} from 'react-native';
import {themeVars} from './variables';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

    backgroundColor: themeVars.mainBackground,
  },

  contentWrapper: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  appIcon: {
    marginBottom: 10,
    right: 12,
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'grey',
  },
  content: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 20,
    flexGrow: 1,
  },
  input: {},
  inputtxt: {
    color: 'grey',
  },
  btn: {
    marginBottom: 20,
    paddingHorizontal: 56,
    paddingVertical: 10,
  },
});
