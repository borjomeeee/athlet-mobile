import {configureStylesheet, configureVariables} from '@borjomeeee/rn-styles';

export const Colors = {
  white: '#ffffff',
  blue: '#007AFF',
  black: '#000000',

  ultraLightGray: '#E2E2E2',
  lightGray: '#DCDCDC',

  darkGray: '#666666',
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
  });

  configureVariables({
    ...Colors,

    text: Colors.black,
  });
};
