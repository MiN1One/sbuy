import slugify from 'slugify';

import sprite from '../assets/icons/sprite.svg';
import spriteCats from '../assets/icons/sprite-cat.svg';
import spriteStars from '../assets/icons/rating-stars.svg';

export const use = (svg) => `<use xlink:href="${sprite}#${svg}"></use>`;

export const useCat = (svg) => `<use xlink:href="${spriteCats}#${svg}"></use>`;

export const useStars = (svg) => `<use xlink:href="${spriteStars}#${svg}"></use>`;

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

export const limitStrAny = (str, limitLength) => {
    if (str.length > limitLength) {
        // const charArr = [];
        // for (let i = 0; i < limitLength; i++) {
        //     charArr.push(str[i]);
        // }
        const charArr = str.split('');
        console.log(charArr);
        return `${charArr.splice(0, limitLength).join('')}...`;
    }
    return str;
};