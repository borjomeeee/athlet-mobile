import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path d="M16 2.667C8.64 2.667 2.666 8.64 2.666 16S8.64 29.333 16 29.333c7.36 0 13.333-5.973 13.333-13.333S23.36 2.667 16 2.667Zm0 4c2.213 0 4 1.786 4 4 0 2.213-1.787 4-4 4s-4-1.787-4-4c0-2.214 1.787-4 4-4ZM16 25.6a9.6 9.6 0 0 1-8-4.293c.04-2.654 5.333-4.107 8-4.107 2.653 0 7.96 1.453 8 4.107a9.6 9.6 0 0 1-8 4.293Z" />
  </Svg>
);

export default SvgComponent;
