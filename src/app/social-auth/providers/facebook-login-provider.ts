import { BaseLoginProvider } from '../entities';
import { SocialUser } from '../models';
import { LoginOpt } from '../services';
import {
  FB_SDK_URL,
  FB_SDK_VERSION, FB_PROFILE_URL, FB_SCOPE, FB_CONNECTED_STATUS, composeFBUserPhotoUrl,
} from '../utils';

declare const FB: any;

export class FacebookLoginProvider extends BaseLoginProvider {

  public static readonly PROVIDER_ID = 'FACEBOOK';

  constructor(
    private clientId: string, private opt: LoginOpt = FB_SCOPE
  ) { super(); }

  initialize(): Promise<SocialUser> {
    return new Promise((resolve) => {
      this.loadScript(FacebookLoginProvider.PROVIDER_ID, FB_SDK_URL, () => {
        FB.init({
          appId: this.clientId,
          autoLogAppEvents: true,
          cookie: true,
          xfbml: true,
          version: FB_SDK_VERSION
        });
        // FB.AppEvents.logPageView(); #FIX for #18

        FB.getLoginStatus(function (response: any) {
          if (response.status === FB_CONNECTED_STATUS) {
            const authResponse = response.authResponse;
            FB.api(FB_PROFILE_URL, (fbUser: any) => {
              const user: SocialUser = new SocialUser();

              user.id = fbUser.id;
              user.name = fbUser.name;
              user.email = fbUser.email;
              user.photoUrl = composeFBUserPhotoUrl(fbUser.id);
              user.firstName = fbUser.first_name;
              user.lastName = fbUser.last_name;
              user.authToken = authResponse.accessToken;

              resolve(user);
            });
          } else {
            resolve(null);
          }
        });
      });
    });
  }

  signIn(): Promise<SocialUser> {
    return new Promise((resolve) => {
      FB.login((response: any) => {
        if (response.authResponse) {
          const authResponse = response.authResponse;
          FB.api(FB_PROFILE_URL, (fbUser: any) => {
            const user: SocialUser = new SocialUser();

            user.id = fbUser.id;
            user.name = fbUser.name;
            user.email = fbUser.email;
            user.photoUrl = composeFBUserPhotoUrl(fbUser.id);
            user.firstName = fbUser.first_name;
            user.lastName = fbUser.last_name;
            user.authToken = authResponse.accessToken;

            resolve(user);
          });
        }
      }, this.opt);
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve) => {
      FB.logout(() => {
        resolve();
      });
    });
  }

}
