import {useTrainingConstructorStore} from '../../Store';

export const useHeaderController = () => {
  const {setTitle} = useTrainingConstructorStore();
  return {handleChangeTitle: setTitle};
};
