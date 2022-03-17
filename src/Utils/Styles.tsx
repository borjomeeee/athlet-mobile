import {configureStylesheet, configureVariables} from '@borjomeeee/rn-styles';

export const Colors = {
  white: '#ffffff',
  blue: '#007AFF',
  black: '#000000',

  ultraLightGray: '#F2F2F2',
  lightGray: '#DCDCDC',

  darkGray: '#666666',
};
export const configureStyles = () => {
  configureStylesheet({
    container: () => ({paddingHorizontal: 20}),
  });

  configureVariables({
    ...Colors,

    text: Colors.black,
  });
};
