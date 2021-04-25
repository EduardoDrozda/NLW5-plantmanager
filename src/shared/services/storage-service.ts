import AsyncStorage from "@react-native-async-storage/async-storage";

class StorageService {

  async setItem(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  async getItem(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  }
}

export default new StorageService();