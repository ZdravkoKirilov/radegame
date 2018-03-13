import { SocialUser } from '../models';

export interface LoginProvider {
  initialize(): Promise<SocialUser>;
  signIn(): Promise<SocialUser>;
  signOut(): Promise<any>;
}

