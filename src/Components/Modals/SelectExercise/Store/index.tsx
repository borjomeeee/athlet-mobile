import {atomFamily, selectorFamily, useSetRecoilState} from 'recoil';
import {exercisesListStore} from 'src/Store/Exercises';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('selectExercise');

export const searchInputStoreFamily = atomFamily({
  key: createKey('searchInput'),
  default: '',
});

export const exercisesBySearchInputStoreFamily = selectorFamily({
  key: createKey('exercises'),
  get:
    param =>
    ({get}) => {
      const searchString = get(searchInputStoreFamily(param))
        .split(/\s+/g)
        .filter(str => str.length > 0);

      const exercises = get(exercisesListStore);

      if (searchString.length === 0) {
        return exercises;
      }

      return exercises.filter(exercise =>
        searchString.some(
          word =>
            exercise.title.toLowerCase().indexOf(word.toLowerCase()) !== -1,
        ),
      );
    },
});

export const useSelectExerciseStore = (id: string) => {
  const setSearchValue = useSetRecoilState(searchInputStoreFamily(id));
  return {setSearchValue};
};
