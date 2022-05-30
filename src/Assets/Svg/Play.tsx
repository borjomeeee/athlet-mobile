import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M9.537 5.978A1 1 0 0 0 8 6.822v10.356a1 1 0 0 0 1.537.844l8.137-5.178a1 1 0 0 0 0-1.688L9.537 5.978Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgComponent;
