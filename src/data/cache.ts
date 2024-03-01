import { IMovie } from "@/models/movie";

const cacheStore = new Map<string, IMovie[]>();

export function cacheGet(key: string): IMovie[] | undefined {
  return cacheStore.get(key);
}

export function cacheSet(key: string, value: IMovie[]): void {
  cacheStore.set(key, value);
}

export function cacheSize(): number {
  return cacheStore.size;
}