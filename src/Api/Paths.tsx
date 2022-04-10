export const ApiPaths = {
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  checkNickname: '/auth/check-nickname',
  checkAuth: '/auth/check-auth',

  getMyTrainings: '/trainings/my',

  createTraining: '/trainings/create',
  trainingAction: (id: string) => `/trainings/${id}`,

  getExercises: '/exercises/all',
};
