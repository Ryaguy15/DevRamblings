/* 
    This file contains functions or classes 
    that can take string or object represenation of blocks
    and converts them into the other form

*/


export const convertCodeBlockStringToObject = (codeBlock: string) => {
    let result = codeBlock.match(/.+/g);
    let lang = result![0];
    let code = result!.splice(1).join("\n");
    return {language: lang, code: code}
};


export const convertQuoteBlockStringToObject = (quoteBlock: string) => {
    let personResult = quoteBlock.match(/--.+/g);
    let quote = quoteBlock.split("\n").splice(1).join("\n");
    let person = (personResult === null) ? "" : personResult![0].substring(2);

    return { quote: quote, person: person }
};