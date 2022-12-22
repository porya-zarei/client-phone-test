import AsyncStorage from "@react-native-async-storage/async-storage";

// class AppStorageClass {
//     store: typeof AsyncStorage;
//     constructor() {
//         this.store = AsyncStorage;
//     }
//     getItem = async <T>(key: string, isString: boolean = true) => {
//         try {
//             const stringData = await this.store.getItem(key);
//             if (stringData) {
//                 return isString ? stringData : (JSON.parse(stringData) as T);
//             }
//         } catch (error) {
//             console.log();
//             return null;
//         }
//     };
// }

export const storageGet = async <T = string>(
    key: string,
    isString: boolean = true,
) => {
    try {
        const stringData = await AsyncStorage.getItem(key);
        console.log("stoarge get => ", key, stringData);
        if (stringData) {
            return (isString ? stringData : (JSON.parse(stringData) as T)) as T;
        }
    } catch (error) {
        console.log("error in storage get => ", error);
        return null;
    }
};

export const storageSet = async <T>(key: string, data: T) => {
    try {
        await AsyncStorage.setItem(
            key,
            typeof data === "string" ? data : JSON.stringify(data),
        );
        console.log("storage set => ", key, data);
        return true;
    } catch (error) {
        console.log("error in storage set => ", error);
        return false;
    }
};

export const storageUpdate = async <T>(key: string, data: T) => {
    try {
        if (typeof data === "string") {
            await storageSet(key, data);
        } else {
            await AsyncStorage.mergeItem(key, JSON.stringify(data));
        }
        return true;
    } catch (error) {
        console.log("error in storage update => ", error);
        return false;
    }
};

export const storageDelete = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        console.log("error in storage delete => ", error);
        return false;
    }
};
