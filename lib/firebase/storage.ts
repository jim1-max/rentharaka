import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './config';

export const uploadImage = async (file: File, path: string): Promise<string> => {
  if (!file) throw new Error('No file provided');
  
  const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  
  return downloadUrl;
};

export const uploadMultipleImages = async (files: File[], path: string): Promise<string[]> => {
  const uploadPromises = files.map(file => uploadImage(file, path));
  return Promise.all(uploadPromises);
};
