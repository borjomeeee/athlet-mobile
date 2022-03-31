import {Exercise, ExerciseElement} from 'src/Store/Models/Training';

export interface EditExerciseProps {
  id: string;
  exercise: Exercise;

  onEdit: (exercise: ExerciseElement) => void;
}
