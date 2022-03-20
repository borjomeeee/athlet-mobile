import {atom, useRecoilState} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';
import {Training} from './Models/Training';

const createKey = getKeyFabricForDomain('trainings');

export const myTrainingsStore = atom<Training[]>({
  key: createKey('my trainings'),
  default: [],
});

export const useTrainingStore = () => {
  const [myTrainings, setMyTrainings] = useRecoilState(myTrainingsStore);

  return {
    myTrainings,
    setMyTrainings,
  };
};
