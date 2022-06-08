import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={7} height={8} fill="none" {...props}>
    <Path d="M3.538.113s-.202-.237-.414-.024C2.832.38.135 3.166.135 3.166s-.373.371.121.371H1.54v4.286S1.534 8 1.762 8h3.155c.32 0 .265-.212.265-.212V3.45h1.39c.406 0 .032-.355.032-.355L3.538.113Z" />
  </Svg>
);

export default SvgComponent;
