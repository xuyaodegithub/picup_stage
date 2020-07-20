const TokenKey = 'Admin-Token';

import Cookies from 'js-cookie'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export const setCookie = (name, cvalue, clearDay = 3650) => {
    const d = new Date();
    d.setTime( d.getTime() + Number( clearDay ) * 24 * 60 * 60 * 1000 );
    const expires = 'expires=' + d.toUTCString();
    const value = encodeURI( cvalue );
    document.cookie = name + '=' + value + ';' + expires;
};

export const getCookie = name => {
    const cname = name + '=';
    var carr = document.cookie.split( ';' );
    for (let i = 0; i < carr.length; i++) {
        let cvalue = carr[i];
        while (cvalue.charAt( 0 ) === ' ') cvalue = cvalue.substring( 1 );
        if (cvalue.indexOf( cname ) !== -1) {
            return decodeURI( cvalue.substring( cname.length, cvalue.length ) );
        }
    }
};

export const clearCookie = name => {
    setCookie( name, '', -1 );
};

