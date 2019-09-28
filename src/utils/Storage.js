import {
    AsyncStorage
} from 'react-native';

export async function saveUser(user, callback) {
    console.log('USEr', user);
    try {
        await AsyncStorage.setItem('User:Key', JSON.stringify(user));
        callback(true);
    } catch (error) {
        console.log('cannot store user to async storage, error: ', error);
        callback(false);
    }
}

export async function removeUser(callback) {
    try {
        await AsyncStorage.removeItem('User:Key');
        callback(true);
    } catch (error) {
        console.log('cannot remove user to async storage, error: ', error);
        callback(false);
    }
}

export async function retrieveUser(callback) {
    try {
        const value = await AsyncStorage.getItem('User:Key');
        if (value != null) {
            callback(JSON.parse(value));
        } else {
            callback(false);
        }
    } catch (error) {
        console.log('cannot retrieve user from async storage, error: ', error);
        callback(false);
    }
}

export async function saveIntroScreen(callback) {
    try {
        await AsyncStorage.setItem('Intro:Key', 'TRUE');
        callback(true);
    } catch (error) {
        console.log('cannot store intro to async storage, error: ', error);
        callback(false);
    }
}

export async function retrieveIntroScreen(callback) {
    try {
        const value = await AsyncStorage.getItem('Intro:Key');
        console.log('VALUE', value);
        if (value != null) {
            callback(true);
        } else {
            callback(false)
        }
    } catch (error) {
        console.log('cannot retrieve intro from async storage, error: ', error);
        callback(false);
    }
}

