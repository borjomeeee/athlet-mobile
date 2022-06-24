import {Exercise} from 'src/Store/Models/Training';

export interface IExercisesRepository {
  getExercises: () => Exercise[] | Promise<Exercise[]>;
  addExercise: (title: string) => Exercise | Promise<Exercise>;
  removeExercise: (id: string) => void | Promise<void>;
}
