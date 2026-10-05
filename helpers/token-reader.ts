import * as fs from 'fs';

export function readToken(fileName: string) { 
    let token: string;
    const fileTextToken = fs.readFileSync(fileName, 'utf-8')
    const fileDataToken = JSON.parse(fileTextToken);
    token = fileDataToken.token;
    return token;
}