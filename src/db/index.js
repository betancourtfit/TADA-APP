import * as SQLite from 'expo-sqlite/legacy'

const db = SQLite.openDatabase('tada.db')

export const createSessionsTable = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY, email TEXT NOT NULL, token TEXT NOT NULL);',
            [],
            () => {resolve()},
            (_, err) => {reject(err)}
        )
        })
    })
    return promise
}

export const insertSession = (localId, email, token) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?);',
            [localId, email, token],
            () => {resolve()},
            (_, err) => {reject(err)}
        )
        })
    })
    return promise
}