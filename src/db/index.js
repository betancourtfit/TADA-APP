import * as SQLite from 'expo-sqlite/legacy'

const db = SQLite.openDatabase('tada.db')

export const createSessionsTable = () => {
    console.log('createSessionsTable: Iniciando creación de la tabla sessions');
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY, email TEXT NOT NULL, token TEXT NOT NULL);',
            [],
            () => {
                console.log('createSessionsTable: Tabla sessions creada exitosamente');
                resolve();
            },
            (_, err) => {
                console.error('createSessionsTable: Error al crear la tabla sessions:', err);
                reject(err);
            }
        )
        })
    })
    return promise
}

export const insertSession = (localId, email, token) => {
    console.log(`insertSession: Iniciando inserción de sesión localId=${localId}, email=${email}`);
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?);',
            [localId, email, token],
            () => {
                resolve();
            },
            (_, err) => {
                console.error('insertSession: Error al almacenar la sesión:', err);
                reject(err);
            }
        )
        })
    })
    return promise
}

export const fetchSession = (localId) => {
    console.log(`fetchSession: Iniciando búsqueda de sesión localId=${localId}`);
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM sessions WHERE localId = ?;',
            [localId],
            (_, result) => {
                if (result.rows.length > 0) {
                    const session = result.rows.item(0);
                    console.log(`fetchSession: Sesión encontrada: localId=${localId}`);
                    resolve(session);
                } else {
                    console.log(`fetchSession: No se encontró sesión para localId=${localId}`);
                    resolve(null);
                }
            },
            (_, err) => {
                console.error('fetchSession: Error al buscar la sesión:', err);
                reject(err);
            }
        )
        })
    })
    return promise
}

export const clearSessions = () => {
    console.log('clearSessions: Iniciando eliminación de todas las sesiones');
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM sessions;',
            [],
            () => {
                console.log('clearSessions: Todas las sesiones eliminadas exitosamente');
                resolve();
            },
            (_, err) => {
                console.error('clearSessions: Error al eliminar las sesiones:', err);
                reject(err);
            }
        )
        })
    })
    return promise
}