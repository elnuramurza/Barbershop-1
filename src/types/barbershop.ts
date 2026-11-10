export interface ServiceItem {
  id: string;
  title: string;
  category: 'hair' | 'beard' | 'combo' | 'spa';
  categoryLabel: string;
  price: number;
  durationMin: number;
  description: string;
  includes: string[];
  popular?: boolean;
}

export interface Barber {
  id: string;
  name: string;
  rank: 'Шеф-барбер' | 'Топ-барбер' | 'Бренд-барбер' | 'Сеньор-барбер';
  experienceYears: number;
  branchId: 'erkindik' | 'tokombaeva' | 'both';
  avatar: string;
  specialty: string;
  quote: string;
  rating: number;
  reviewsCount: number;
  instagram: string;
  availableDays: string[];
}

export interface Branch {
  id: 'erkindik' | 'tokombaeva';
  name: string;
  shortName: string;
  address: string;
  district: string;
  landmark: string;
  phone: string;
  whatsapp: string;
  workingHours: string;
  parking: string;
  twoGisUrl: string;
  yandexUrl: string;
  googleMapsUrl: string;
  lat: number;
  lng: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'beard' | 'hair' | 'shave' | 'care' | 'gifts';
  price: number;
  volume: string;
  description: string;
  benefits: string[];
  inStock: boolean;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  date: string;
  serviceName: string;
  masterName: string;
  branch: string;
}

export interface BookingState {
  branchId: 'erkindik' | 'tokombaeva';
  serviceId: string;
  barberId: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  drinkPreference: string;
  comment: string;
}
