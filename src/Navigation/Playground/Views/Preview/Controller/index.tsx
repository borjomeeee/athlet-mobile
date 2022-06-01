import {usePlayground} from 'src/Navigation/Playground/Hooks';

export const usePlaygroundPreviewController = () => {
  const {reset, exit} = usePlayground();

  return {handlePressCancel: exit, reset};
};
