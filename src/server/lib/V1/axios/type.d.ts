export type ExternalUser = {
  poolId: string;
  email: string;
  username: string;
  given_name: string;
  middle_name?: string;
  family_name?: string;
  gender: 'male' | 'female';
  phone_number: string;
  send?: string;
  qualification?: string | null | '';
};
