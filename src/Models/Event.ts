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

export function serverEventToEvent(serverEvent: ServerEvent): Event {
  return {
    type: serverEvent.type,
    id: serverEvent.datetime,
    latitude: serverEvent.geoJson.coordinates[0],
    longitude: serverEvent.geoJson.coordinates[1],
  };
}

export interface ServerEvent {
  datetime: string;
  geoJson: {
    type: 'Point',
    coordinates: number[],
  },
  type: Event['type']
}