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
    bottom: 30,
    fontSize: 16,
  },
  btn: {
    marginBottom: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
});
