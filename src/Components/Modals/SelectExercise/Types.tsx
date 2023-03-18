import {Exercise} from 'src/Store/Models/Training';

export interface SelectExerciseProps {
  onSelect: (exercise: Exercise) => void;
}
