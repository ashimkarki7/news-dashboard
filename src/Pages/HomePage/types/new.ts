export interface News {
  lat: number;
  lng: number;
  height: number;
}

export interface  NewsState {
  payload: Location[];
  error: string | undefined;
  loading: boolean;
}
