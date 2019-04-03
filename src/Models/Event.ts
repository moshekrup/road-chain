export interface Event {
  id: string;
  type: 'police' | 'accident' | 'traffic' | 'cyber';
  latitude: number;
  longitude: number;
}