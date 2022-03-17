import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={38} height={24} fill="none" {...props}>
    <Path d="M24.489 0 21.11 3.809l7.152 5.713H0v4.656h28.263L21.11 19.89 24.65 24 38 11.85 24.489 0Z" />
  </Svg>
);

export default SvgComponent;
