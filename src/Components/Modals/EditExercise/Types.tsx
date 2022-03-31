import {ExerciseElement} from 'src/Store/Models/Training';

export interface EditExerciseProps {
  id: string;
  exercise: ExerciseElement;
  onEdit: (exercise: ExerciseElement) => void;
}
