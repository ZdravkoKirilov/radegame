import {
    AuthServiceConfig,
    LoginOpt
} from '../services';
import {
    GoogleLoginProvider,
    FacebookLoginProvider
} from '../providers';

import { APP_IDS } from './social_app_ids';

export const socialConfig = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(APP_IDS.GOOGLE)
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(APP_IDS.FACEBOOK)
    }
]);

export const FB_SDK_URL = '//connect.facebook.net/en-US/sdk.js';
export const FB_SDK_VERSION = 'v2.9';
export const FB_PROFILE_URL = '/me?fields=name,email,picture,first_name,last_name';
export const FB_SCOPE = { scope: 'email,public_profile' };
export const FB_CONNECTED_STATUS = 'connected';
export const composeFBUserPhotoUrl = (id: number) => 'https://graph.facebook.com/' + id + '/picture?type=normal';

export const GOOGLE_SDK_URL = '//apis.google.com/js/platform.js';
export const GOOGLE_LOGIN_OPT = <LoginOpt>{ scope: 'profile email', ux_mode: 'redirect', cookie_policy: 'none' };
export const GOOGLE_AUTH = 'auth2';
