import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12l8.13-8.13Z"
      fill="#57606A"
    />
  </Svg>
);

export default SvgComponent;
