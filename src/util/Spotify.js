
import { clientID } from '../Components/key.js' 
const redirectUri = 'http://localhost:3000'



let userAccessToken;

export const Spotify = {
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
                window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            }
            
        }

    },
    search(term){
        const userAccessToken = Spotify.getAccesstoken();
        return  fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: 'GET',
            headers: {Authorization: `Bearer ${userAccessToken}`}

        })
        .then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return []
            }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));
    })
    

    },
    savePlaylist(playlist, trackUris){
        if(!playlist || !trackUris.length){
            return
        }
    const userAccessToken = Spotify.getAccesstoken();
    const headers = {Authorization: `Bearer ${userAccessToken}`}
    let userID 
    return fetch("https://api.spotify.com/v1/me", {headers: headers}
    ).then(response => {
        return response.json();
    }).then(jsonResponse => {
        userID = jsonResponse.id
    })

    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name :playlist})
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
        const playlistID = jsonResponse.id
        return fetch(`/v1/users/${userID}/playlists/${playlistID}/tracks`, {
            headers: headers,
            method: 'POST',
            body:JSON.stringify({uris :trackUris})
        })
    })
    

    }

}

