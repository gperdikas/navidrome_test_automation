
// Random 10-characters string generator
export function randomString() { 
    const characters = "QAZWSXEDCRFVTGBYHNUJMIKOLPplokmijnuhbygvtfcrdxeszwaq0192837465"
    let resultString = "";
    for (let i = 0; i < 10; i++){
        resultString += characters.charAt(Math.floor(Math.random()*characters.length));
    }
    return resultString;
};    