import AsyncStorage from '@react-native-community/async-storage';

export async function save_To_AsyncStorage(key, value) {
   await AsyncStorage.setItem(`${key}`, value)
}
export async function get_From_AsyncStorage(key) {
    // console.log(key);
    return await AsyncStorage.getItem(key);

}

export async function remove_from_AsyncStorage(key) {
    AsyncStorage.removeItem(key);
}
