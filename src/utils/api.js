const url = 'https://roam-backend.vercel.app'
const url2 = 'http://127.0.0.1:5000/'

const call = function (promise) {
    return promise.then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        return response.json();
    })
}

/**
 * Searches for similar cities matching input text.
 * 
 * Most of the time, there will be 5 predictions available. 
 * Each prediction contains useful information about the place as well as place_id.
 * 
 * Example usage: 'Search(city).then((result) => { console.log(result); })'
 * 
 * @param {*} city location to to search for.
 * @returns dictionary containing an array of predictions.
 */

export const Search = function (city) {
    return call(fetch(url + '/search?text=' + city))
}

/**
 * Gets more information about the selected city, including the latitude and longitude
 * 
 * Example usage: 'Info(place_id).then((result) => { console.log(result); })'
 * 
 * @param {*} place_id id of the selected city, obtained from 'Search(city)'
 * @returns dictionary containing meta data, including lat/lng of the provided place_id
 */

export const GetInfo = function (place_id) {
    return call(fetch(url + '/info?place_id=' + place_id))
}

/**
 * Creates an account in the database.
 * 
 * When an account is created, it will return an 'id' associated with this account.
 * To insert or remove locations, this id will be required.
 * 
 * Example usage: 'CreateAccount(username, password, name).then((result) => { console. log(result); })'
 * 
 * @param {*} username username of this account
 * @param {*} password password of this account
 * @param {*} name first name associated with account
 * @returns dictionary 
 */
export const CreateAccount = function (username, password, name) {
    const request = url + '/create?username=' + username + '&password=' + password + '&name=' + name
    return call(fetch(request))
}

/**
 * Login to the account to get access to users history.
 * 
 * On any fresh browser, a username and password is required to get access to a unique 'id'.
 * This id can be used to pull users' saved locations.
 * 
 * Example usage: 'LoginAcount(username, password).then((result) => {console.log(result); })'
 * 
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
export const LoginAccount = function (username, password) {
    const request = url + '/login?username=' + username + '&password=' + password
    return call(fetch(request))
}

/**
 Functionality for manipulating history
 */

export const AddHistory = function(user_id, city, place_id, notes, country, date, lat, lng) {
    const request = url + '/histories/add?user_id=' + user_id + "&city=" + city + "&place_id=" + place_id + "&notes=" + notes + "&country=" + country + "&date=" + date + "&lat=" + lat + "&lng=" + lng;
    return call(fetch(request));
}

export const GetHistory = function (user_id){
    const request = url + '/histories/get?user_id=' + user_id;
    return call(fetch(request));
}

export const EditHistory = function(history_id, notes){
    console.log(history_id);
    console.log(notes);
    const request = url + '/histories/edit?history_id=' + history_id + '&notes=' + notes;
    return call(fetch(request));
}

export const RemoveHistory = function(history_id){
    const request = url + '/histories/remove?history_id=' + history_id;
    return call(fetch(request)); 
}

/**
 Functionality for manipulating wishlist
 */

export const AddWishlist = function(user_id, city, place_id, notes, country, date, lat, lng) {
    const request = url + '/wishlists/add?user_id=' + user_id + "&city=" + city + "&place_id=" + place_id + "&notes=" + notes + "&country=" + country + "&date=" + date + "&lat=" + lat + "&lng=" + lng;
    return call(fetch(request));
}

export const GetWishlist = function (user_id){
    const request = url + '/wishlists/get?user_id=' + user_id;
    return call(fetch(request));
}

export const EditWishlist = function(history_id, notes){
    console.log(history_id);
    console.log(notes);
    const request = url + '/wishlists/edit?history_id=' + history_id + '&notes=' + notes;
    return call(fetch(request));
}

export const RemoveWishlist = function(history_id){
    const request = url + '/wishlists/remove?history_id=' + history_id;
    return call(fetch(request)); 
}