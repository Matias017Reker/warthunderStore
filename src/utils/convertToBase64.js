import * as FileSystem from 'expo-file-system';

export const convertToBase64 = async (uri) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    throw new Error('Error al convertir la imagen a base64: ' + error.message);
  }
};