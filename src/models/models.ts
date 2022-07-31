export interface ICharacter {
  created: string;
  episode: string[];
  gender: 'unknown' | 'Female' | 'Male' | 'Genderless';
  id: number;
  image: string;
  name: string;
  status: 'Dead' | 'Alive' | 'unknown';
  url: string;
  location: { name: string };
}
export interface IEpisode {
  name: string;
  episode: string;
}

export interface ServerResponse<T> {
  info: ServerResponseInfo;
  results: T[];
}

interface ServerResponseInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}
