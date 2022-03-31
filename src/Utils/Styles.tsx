import {configureStylesheet, configureVariables} from '@borjomeeee/rn-styles';

export const Colors = {
  white: '#ffffff',
  blue: '#007AFF',
  red: '#FF0000',
  black: '#000000',
  green: '#2DA44E',

  ultraLightGray: '#DADADA',
  lightGray: '#DCDCDC',
  gray: '#A0A0A0',
  darkGray: '#666666',

  layout: '#FAFAFA',
  // placeholder: '#E1E4E8',
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

const textFont = {fontFamily: 'Rubik-Regular'};

const fontsStylesSheet = {
  text: () => textFont,
  medium: () => ({
    fontFamily: 'Rubik-Medium',
  }),
  bold: () => ({
    fontFamily: 'Rubik-Bold',
  }),
  montserrat: () => ({
    fontFamily: 'Montserrat-Bold',
  }),
};

export const configureStyles = () => {
  configureStylesheet({
    ...textSizeStyleSheet,
    ...fontsStylesSheet,

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
  });

  configureVariables({
    ...Colors,

    text: Colors.black,
  });
};
