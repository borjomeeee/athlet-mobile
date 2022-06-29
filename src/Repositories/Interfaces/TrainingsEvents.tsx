import {CreatingTrainingEvent, TrainingEvent} from 'src/Store/Models/Training';

export interface ITrainingsEventsRepository {
  getMyEvents: () => TrainingEvent[] | Promise<TrainingEvent[]>;
  createEvent: (
    event: CreatingTrainingEvent,
  ) => TrainingEvent | Promise<TrainingEvent>;
}
