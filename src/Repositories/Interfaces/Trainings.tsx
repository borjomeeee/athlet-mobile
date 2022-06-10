import {CreatingTraining, Training} from 'src/Store/Models/Training';

export interface ITrainingsRepository {
  getMyTrainings: () => Promise<Training[]> | Training[];
  getTrainingById: (id: string) => Promise<Training>;

  createTraining: (creatingTraining: CreatingTraining) => Promise<Training>;
  updateTraining: (
    id: string,
    updatedTraining: CreatingTraining,
  ) => Promise<Training>;

  removeTraining: (id: string) => Promise<void>;
}
