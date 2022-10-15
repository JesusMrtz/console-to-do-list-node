import { existsSync, readFileSync, writeFileSync } from 'fs';


const path = './db/data.json';

export function saveDatabase (data) {
    writeFileSync(path, JSON.stringify(data));
}

export function readDB() {
    if ( !existsSync(path) ) return null;

    const information = readFileSync(path, { encoding: 'utf-8' });
    return JSON.parse(information);
}