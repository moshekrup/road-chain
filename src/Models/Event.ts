export interface Event {
  id: string;
  type: 'police' | 'accident' | 'traffic' | 'cyber';
  latitude: number;
  longitude: number;
}

export const eventTypeToName: {[type in Event['type']]: string} = {
  'cyber': 'Cyber attack!',
  'police': 'Police',
  'accident': 'Accident',
  'traffic': 'Traffic',
};