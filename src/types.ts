import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TicketType = 'movie' | 'show' | 'train' | 'plane';

export interface TicketData {
  id: string;
  type: TicketType;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  seat?: string;
  gate?: string;
  platform?: string;
  price?: string;
  color: string;
  accentColor: string;
  icon: string;
  timestamp: number;
}

export const TEMPLATES: Record<TicketType, Partial<TicketData>> = {
  movie: {
    title: 'Interstellar',
    subtitle: 'Retro Cinema',
    location: 'Galaxy Theater',
    seat: 'H-12',
    color: '#fce4ec',
    accentColor: '#f06292',
    icon: 'Film',
  },
  show: {
    title: 'The Eras Tour',
    subtitle: 'Live Concert',
    location: 'SoFi Stadium',
    seat: 'Floor A1',
    color: '#f3e5f5',
    accentColor: '#ba68c8',
    icon: 'Music',
  },
  train: {
    title: 'Orient Express',
    subtitle: 'Vintage Rail',
    location: 'Paris to Istanbul',
    platform: '9 3/4',
    color: '#e3f2fd',
    accentColor: '#64b5f6',
    icon: 'TrainFront',
  },
  plane: {
    title: 'Tokyo Bound',
    subtitle: 'First Class',
    location: 'LAX → HND',
    gate: 'B24',
    color: '#fff9c4',
    accentColor: '#ffd54f',
    icon: 'Plane',
  },
};
