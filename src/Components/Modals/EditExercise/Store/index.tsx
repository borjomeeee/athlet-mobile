import {atomFamily, useSetRecoilState} from 'recoil';
import {ExerciseCompletionType} from 'src/Store/Models/Training';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('editExercise');

export const completionTypeStoreFamily = atomFamily({
  key: createKey('completionType'),
  default: ExerciseCompletionType.REPS,
});

export const useEditExerciseStore = (id: string) => {
  const setCompletionType = useSetRecoilState(completionTypeStoreFamily(id));
  return {setCompletionType};
};
