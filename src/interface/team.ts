export interface TeamData {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  phone: string;
  email: string;
  runningCompetitions: {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
  }[];
  squad: {
    id: number;
    name: string;
    position: string;
    dateOfBirth: string;
    nationality: string;
  }[];
  coach: {
    id: number;
    name: string;
    dateOfBirth: string;
    nationality: string;
  };
  area: {
    name: string;
    code: string;
    flag: string;
  };
}

export interface Team {
  name: string;
  crest: string;
  founded: number;
  venue: string;
  clubColors: string;
  address: string;
  website: string;
  email: string;
  phone: string;
  coach: {
    name: string;
  };
  area: {
    flag: string;
    name: string;
  };
}
