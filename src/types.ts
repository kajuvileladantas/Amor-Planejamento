import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  contact: string;
  notes: string;
  price: number;
  servicesOffered: string;
  budgetFile?: {
    name: string;
    data: string; // base64
  };
}

export interface Guest {
  id: string;
  name: string;
  contact: string;
  confirmed: boolean;
  plusOnes: number;
  spouseName?: string;
  childrenCount: number;
  children: Child[];
}

export interface HoneymoonItem {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  days: number;
  hotelCost: number;
  foodCost: number;
  activitiesCost: number;
  carRentalCost: number;
  ticketsCost: number;
  mealPlan: string;
  activities: string;
  budget: number;
  spent: number;
}

export interface DecorationItem {
  id: string;
  item: string;
  area: string;
  status: 'pending' | 'in-progress' | 'completed';
  supplier?: string;
  price?: number;
  location?: string;
}

export interface ChecklistItem {
  id: string;
  task: string;
  month: string;
  completed: boolean;
}

export interface WeddingConfig {
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingStyle: string;
  titleFont?: string;
  coverPhoto?: string;
  bridePhoto?: string;
  groomPhoto?: string;
  // Customization lists
  checklistPeriods?: string[];
  financeCategories?: string[];
  supplierCategories?: string[];
  homeCategories?: string[];
  weddingStyles?: string[];
  tabNames?: Record<string, string>;
}

export interface HomeItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
  purchased: boolean;
  location?: string;
}

export interface FinanceItem {
  id: string;
  description: string;
  amount: number;
  paidAmount: number;
  category: string;
  date: string;
  status: 'paid' | 'pending' | 'partial';
}

export interface MusicItem {
  id: string;
  moment: string;
  songTitle: string;
  artist: string;
  link?: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  createdAt: any;
}

export interface Child {
  gender: 'boy' | 'girl';
  age: number;
}

export interface Invitation {
  id: string;
  type: 'printed' | 'box';
  recipient: string;
  recipientName?: string;
  individualInvitations?: number;
  quantity: number;
  price: number;
  status: 'pending' | 'ordered' | 'delivered';
  isOnline: boolean;
  deliveryDate?: string;
  notes?: string;
}
