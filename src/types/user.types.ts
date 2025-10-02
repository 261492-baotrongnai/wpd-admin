export interface User {
  id: number;
  internalId: string;
  last_recorded_at: string;
  streaks: number;
  totalDays: number;
  points: number;
}

export interface UserProfile {
  displayName: string;
  pictureUrl: string;
}

export interface UserWithProfile {
  id: number;
  internalId: string;
  last_recorded_at: string;
  streaks: number;
  totalDays: number;
  points: number;
  profile: UserProfile;
}
