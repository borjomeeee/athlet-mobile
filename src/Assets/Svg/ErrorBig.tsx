import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={124} height={124} fill="none" {...props}>
    <Path
      d="M56.833 77.5h10.334v10.333H56.833V77.5Zm0-41.333h10.334v31H56.833v-31Zm5.115-25.834c-28.52 0-51.615 23.147-51.615 51.667 0 28.52 23.095 51.667 51.615 51.667 28.572 0 51.719-23.147 51.719-51.667 0-28.52-23.147-51.667-51.719-51.667Zm.052 93c-22.837 0-41.333-18.496-41.333-41.333S39.163 20.667 62 20.667 103.333 39.163 103.333 62 84.837 103.333 62 103.333Z"
      fill="red"
    />
  </Svg>
);

export default SvgComponent;
