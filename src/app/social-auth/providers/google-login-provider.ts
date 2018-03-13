import { BaseLoginProvider } from '../entities';
import { SocialUser } from '../models';
import { LoginOpt } from '../services';
import { GOOGLE_SDK_URL, GOOGLE_LOGIN_OPT, GOOGLE_AUTH } from '../utils';

declare const gapi: any;

export class GoogleLoginProvider extends BaseLoginProvider {

  public static readonly PROVIDER_ID: string = 'GOOGLE';

  protected auth2: any;

  constructor(private clientId: string, private opt: LoginOpt = GOOGLE_LOGIN_OPT) {
    super();
  }

  initialize(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      this.loadScript(GoogleLoginProvider.PROVIDER_ID, GOOGLE_SDK_URL, () => {
        gapi.load('auth2', () => {
          const params = {
            ...this.opt,
            client_id: this.clientId
          };
          this.auth2 = gapi.auth2.init(params);
          this.auth2.then(() => {
            if (this.auth2.isSignedIn.get()) {
              const user: SocialUser = new SocialUser();
              const profile = this.auth2.currentUser.get().getBasicProfile();
              const token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
              const backendToken = this.auth2.currentUser.get().getAuthResponse(true).id_token;

              user.id = profile.getId();
              user.name = profile.getName();
              user.email = profile.getEmail();
              user.photoUrl = profile.getImageUrl();
              user.firstName = profile.getGivenName();
              user.lastName = profile.getFamilyName();
              user.authToken = token;
              user.idToken = backendToken;
              resolve(user);
            } else {
              resolve(null);
            }
          }).catch((err: any) => {
            reject(err);
          });
        });
      });
    });
  }

  signIn(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      const promise = this.auth2.signIn();

      promise.then(() => {
        const user: SocialUser = new SocialUser();
        const profile = this.auth2.currentUser.get().getBasicProfile();
        const token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
        const backendToken = this.auth2.currentUser.get().getAuthResponse(true).id_token;

        user.id = profile.getId();
        user.name = profile.getName();
        user.email = profile.getEmail();
        user.photoUrl = profile.getImageUrl();
        user.authToken = token;
        user.idToken = backendToken;
        resolve(user);
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth2.signOut().then((err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  revokeAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth2.disconnect().then((err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

}
