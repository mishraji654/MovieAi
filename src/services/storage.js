import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveFavorites = async (
  data
) => {
  try {
    await AsyncStorage.setItem(
      "favorites",
      JSON.stringify(data)
    );
  } catch (error) {
    console.log(error);
  }
};



export const getFavorites = async () => {
  try {
    const data = await AsyncStorage.getItem(
      "favorites"
    );

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};