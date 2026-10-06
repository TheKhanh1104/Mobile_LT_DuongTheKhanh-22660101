export interface Bike {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  type: 'Roadbike' | 'Mountain' | 'All';
  imageUrl: any;
  description?: string;
}

export const bikesData: Bike[] = [
  { id: '1', name: 'Pinarello', price: 1800, type: 'Roadbike', imageUrl: { uri: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=500&q=60' } },
  { id: '2', name: 'Pina Mountain', price: 1700, type: 'Mountain', imageUrl: { uri: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=500&q=60' } },
  { id: '3', name: 'Pina Bike', price: 1500, type: 'Roadbike', imageUrl: { uri: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=500&q=60' } },
  { id: '4', name: 'Pinarello', price: 1900, type: 'Mountain', imageUrl: { uri: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=500&q=60' } },
  { id: '5', name: 'Pinarello', price: 2700, type: 'Roadbike', imageUrl: { uri: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=500&q=60' } },
  { id: '6', name: 'Pinarello', price: 1350, type: 'Mountain', imageUrl: { uri: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=500&q=60' } },
];