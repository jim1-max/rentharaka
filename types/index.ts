export type UserRole = 'tenant' | 'owner' | 'admin';

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'suspended';
  createdAt: string;
}

export interface Property {
  propertyId: string;
  ownerId: string;
  title: string;
  description: string;
  price: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  amenities: string[];
  images: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Booking {
  bookingId: string;
  tenantId: string;
  propertyId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Review {
  id: string;
  propertyId: string;
  tenantId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
