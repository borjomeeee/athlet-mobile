import {useTrainingEventScreenStore} from './Store';

export const useTrainingEventController = () => {
  const {reset} = useTrainingEventScreenStore();
  return {reset};
};
