import { collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';
import { Property, Booking } from '@/types';

// Property Functions
export const addProperty = async (property: Omit<Property, 'propertyId' | 'createdAt'>) => {
  const docRef = doc(collection(db, 'properties'));
  const newProperty = {
    ...property,
    propertyId: docRef.id,
    createdAt: new Date().toISOString()
  };
  await setDoc(docRef, newProperty);
  return newProperty;
};

export const getProperties = async (status?: string) => {
  let q = query(collection(db, 'properties'));
  if (status) {
    q = query(q, where('status', '==', status));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc: any) => doc.data() as Property);
};

export const getProperty = async (id: string) => {
  const docRef = doc(db, 'properties', id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshot.data() as Property : null;
};

// Booking Functions
export const createBooking = async (booking: Omit<Booking, 'bookingId' | 'createdAt'>) => {
  const docRef = doc(collection(db, 'bookings'));
  const newBooking = {
    ...booking,
    bookingId: docRef.id,
    createdAt: new Date().toISOString()
  };
  await setDoc(docRef, newBooking);
  return newBooking;
};

export const getBookingsForUser = async (userId: string, role: 'tenant' | 'owner') => {
  const field = role === 'tenant' ? 'tenantId' : 'ownerId';
  const q = query(collection(db, 'bookings'), where(field, '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc: any) => doc.data() as Booking);
};
