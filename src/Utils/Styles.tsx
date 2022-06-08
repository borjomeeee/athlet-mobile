import {configureStylesheet, configureVariables} from '@borjomeeee/rn-styles';

export const Colors = {
  dark: '#24292F',

  white: '#ffffff',
  blue: '#007AFF',
  red: '#FF0000',
  black: '#000000',

  green: '#2DA44E',
  darkGreen: '#10772E',

  ultraLightGray: '#DADADA',
  lightGray: '#DCDCDC',
  gray: '#A0A0A0',
  darkGray: '#666666',

  layout: '#FAFAFA',

  tabBarActive: '#57606A',
  tabBarInactive: '#cccccc',

  playgroundBg: '#24292E',
};

const textSizeStyleSheet = {
  P1: () => ({fontSize: 54}),
  P2: () => ({fontSize: 40}),
  P3: () => ({fontSize: 32}),
  P4: () => ({fontSize: 26}),
  P5: () => ({fontSize: 24}),
  P6: () => ({fontSize: 18}),
  P7: () => ({fontSize: 16}),
  P8: () => ({fontSize: 14}),
  P9: () => ({fontSize: 12}),
  P10: () => ({fontSize: 10}),
};

const defaultTextStyles = {color: Colors.black};
const textFont = {fontFamily: 'Rubik-Regular'};

const fontsStylesSheet = {
  text: () => ({...defaultTextStyles, ...textFont}),
  medium: () => ({
    ...defaultTextStyles,
    fontFamily: 'Rubik-Medium',
  }),
  semibold: () => ({
    ...defaultTextStyles,
    fontFamily: 'Rubik-SemiBold',
  }),
  bold: () => ({
    ...defaultTextStyles,
    fontFamily: 'Rubik-Bold',
  }),
  montserrat: () => ({
    ...defaultTextStyles,
    fontFamily: 'Montserrat-Bold',
  }),
};

export const configureStyles = () => {
  configureStylesheet({
    ...textSizeStyleSheet,
    ...fontsStylesSheet,

    removed: () => ({textDecorationLine: 'line-through'}),
    uppercase: () => ({textTransform: 'uppercase'}),
    container: () => ({paddingHorizontal: 20}),

    shadow: () => ({
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.05,
      shadowRadius: 12,

      elevation: 7,
    }),

    rotate: () => ({
      transform: [{rotate: '180deg'}],
    }),
  });

  configureVariables({
    ...Colors,

    text: Colors.black,
  });
};
