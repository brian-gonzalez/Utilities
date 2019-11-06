'use strict';

/**
 * [createCookie creates a cookie]
 * @param  {[string]} name  [cookie name]
 * @param  {[string]} value [cookie description]
 * @param  {[int]} days  [amount of days the cookie must be alive for]
 */
export function createCookie (name, value, days, domain) {
    let expires;

    domain = domain ? (';domain=' + domain) : '';

    if (days) {
        let date = new Date();

        date.setTime(date.getTime() + ( days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
    } else {
        expires = '';
    }

    document.cookie = name + '=' + value + expires + domain + '; path=/';
}

/**
 * [readCookie tries to find a cookie with the provided name]
 * @param  {[string]} name [cookie name]
 * @return {[string]}      [string containing the searched cookie, if any]
 */
export function readCookie (name) {
    var nameEQ = name + '=',
        cookieList = document.cookie.split(';');

    for(var i = 0; i < cookieList.length; i++) {
        let currentCookie = cookieList[i];

        while(currentCookie.charAt(0) == ' ') {
            currentCookie = currentCookie.substring(1,currentCookie.length);
        }

        if (currentCookie.indexOf(nameEQ) === 0) {
            return currentCookie.substring(nameEQ.length, currentCookie.length);
        } 
    }

    return null;
}

/**
 * [eraseCookie]
 * @param  {[string]} name [cookie name that needs to be erased]
 */
export function eraseCookie (name) {
    createCookie(name, '', -1);
}
