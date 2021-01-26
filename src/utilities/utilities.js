import React from 'react';
import slugify from 'slugify';

import sprite from '../assets/icons/sprite.svg';
import spriteCats from '../assets/icons/sprite-cat.svg';
import spriteStars from '../assets/icons/rating-stars.svg';

export const use = ({ svg, styleClass }) => (
    <svg className={styleClass}>
        <use xlinkHref={`${sprite}#${svg}`}></use>
    </svg>
)

export const useCat = ({ svg, styleClass }) => (
    <svg className={styleClass}>
        <use xlinkHref={`${spriteCats}#${svg}`}></use>
    </svg>
);

export const useStars = ({ svg, styleClass }) => (
    <svg className={styleClass}>
        <use xlinkHref={`${spriteStars}#${svg}`}></use>
    </svg>
);

export const formatRouteString = (string) => {
    let str = string.charAt(0).toUpperCase() + string.slice(1);
    if (str.includes('_')) str = str.split('_').join(' ');
    return str;
};

export const parseUrl = (string) => string.split('/').join('');

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const toLower = (str) => str.charAt(0).toLowerCase() + str.slice(1);

export const slug = (string) =>  {
    let outputStr = string;
    if (string.includes('-')) outputStr = string.split('-').join(' ');
    if (string.includes(',')) outputStr = string.split(',').join(' ');
    outputStr = slugify(outputStr, { replacement: '_', lower: true, remove: /[*+~.()'"!:@/]/g });
    return outputStr;
};

export const isNum = (str) => /^\d+$/.test(str);

export const limitStrLength = (str, limitLength) => {
    if (str.length > limitLength) {
        const strArr = str.split(' ');
        const outPutStr = [];
    
        strArr.reduce((sum, el) => {
            if (sum + el.length < limitLength) {
                outPutStr.push(el);
            } 
            return sum + el.length;
        }, 0);

        return `${outPutStr.join(' ')}...`;
    } else return str;
};

export const limitStrAny = (str, limitLength, space) => {
    if (str.length > limitLength) {
        const charArr = str.split('');
        return `${charArr.splice(0, limitLength).join('')}${space ? ' ' : ''}...`;
    }
    return str;
};

export const getQueryParamValue = (name) => {
    const queries = window.location.search.substring(1).split('&');
    let value = null;
    queries.forEach(el => {
        const query = el.split('=');
        if (decodeURIComponent(query[0]) === name) value = query[1];
    });
    return value;
};