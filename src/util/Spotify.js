
import { clientID } from '../key.js' 
const redirectUri = 'http://localhost:3000'

let userAccessToken
const spotify = {
    getAccesstoken(){
        if(userAccessToken){
            return userAccessToken
        } else {
            //checks the url for the access token
            const userAccessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
            const userAccessTokenExpiryTimeMatch= window.location.href.match(/expires_in=([^&]*)/)

            if (userAccessTokenMatch && userAccessTokenExpiryTimeMatch ) {
                userAccessToken = userAccessTokenMatch[1]
                const userAccessTokenExpiresIn = Number(userAccessTokenExpiryTimeMatch[1]);

            //resets the url to prevent aquiring expired access token

                window.setTimeout(() => userAccessToken = '', userAccessTokenExpiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return userAccessToken;
            } else {
                `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            }
            
        }

    }
}




const state = generateRandomString(16);

localStorage.setItem(stateKey, state);
const scope = 'user-read-private user-read-email';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);

export default spotify