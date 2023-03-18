import {ExerciseElement} from 'src/Store/Models/Training';

export interface EditExerciseProps {
  exercise: ExerciseElement;
  onEdit: (exercise: ExerciseElement) => void;
}
