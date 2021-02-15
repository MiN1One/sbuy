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

// 5000000
// 50 000 000

export const formatPrice = (price) => {
    const parsedPrice = parseInt(price.substring(1));
    if (isNum(parsedPrice)) {

        const priceStr = parsedPrice.toString();
        
        if (priceStr.length > 3) {
            const priceArr = [];
            
            if (priceStr.length % 3 === 0) {
    
                for (let i = 0; i < priceStr.length; i+=3) 
                    priceArr.push(priceStr.slice(i, 3+i));
    
                return `$${priceArr.join(' ')}`;
            } else {
    
                const initPartEndIndex = priceStr.length % 3;
                const initPart = priceStr.slice(0, initPartEndIndex);
                const withoutInit = priceStr.slice(initPartEndIndex, priceStr.length);
                
                for (let i = 0; i < withoutInit.length; i+=3)
                    priceArr.push(withoutInit.slice(i, i+3));
                
                return `$${[initPart, ...priceArr].join(' ')}`;
            }
        }
        return price;
    }
    return price;
};

const isObject = (object) => {
    return object != null && typeof object === 'object';
};

export const objectEqual = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            (areObjects && !objectEqual(val1, val2)) ||
            (!areObjects && val1 !== val2)
        ) {
            return false;
        }
    }

    return true;
};