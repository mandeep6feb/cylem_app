import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV();

export const addToken = (token: string) => {
    storage.set('token',token);
}


export const getToken = (name: string) => {
    return storage.getString(name);
}

export const removeToken = (name: string) => {
    storage.delete(name);
}
