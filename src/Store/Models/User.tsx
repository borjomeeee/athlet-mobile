export interface UserPreview {
  id: string;
  nickname: string;
}

export interface User extends UserPreview {
  email: string;
}
