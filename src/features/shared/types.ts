export interface BaseFormInfo {
  name: string;
  email: string;
}

export type OptionType = {
  label: string;
  value: string;
};

export type Session = {
  id: string
  theme: string
  duree: number
  prix: number
  participantsMin: number
  creneaux: string[]
  description: string
  imgUrl: string
  title: string
}

export type NewSession = Omit<Session, 'id'>

export type Reservation = {
  id: string
  email: string
  sessionId: string
  creneau: string
  participants: number
}

export type NewReservation = Omit<Reservation, 'id'>

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  success: boolean
  role?: 'admin'
}
