import {StyleSheet} from 'react-native';
import {themeVars} from './variables';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

    backgroundColor: themeVars.mainBackground,
  },

  mainWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabsContainer: {
    height: 65,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 0,
    backgroundColor: 'white',
  },
  tabTxt: {
    color: 'grey',
  },
  btnClr: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
  },
  vLine: {
    height: 40,
    width: 1,
    backgroundColor: 'lightgrey',
  },
});
