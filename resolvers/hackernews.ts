type ItemId = number;
type ItemIdList = ItemId[];

type ItemType = 'job' | 'story' | 'comment' | 'poll' | 'pollopt';

export interface Item {
  id: ItemId;
  deleted?: boolean;
  type: ItemType;
  by: string;
  time: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: ItemIdList;
  url?: string;
  score?: number;
  title: string;
  parts?: ItemIdList;
  descendants?: number;
}

export interface User {
  id: string;
  created: number;
  karma: number;
  about?: string;
  submitted: ItemIdList;
}

export interface Story extends Item {
  type: 'story';
  descendants: number;
  score: number;
  title: string;
  url: string;
}

export const HACKER_NEWS_V0_API = 'https://hacker-news.firebaseio.com/v0';

export async function getTopStoriesIds(count: number) : Promise<ItemIdList> {
  const res = await fetch(`${HACKER_NEWS_V0_API}/topstories.json`);
  const ids = await res.json() as ItemIdList;
  return ids.slice(0, count);
}

export async function getItem<T extends Item>(id: ItemId) : Promise<T> {
  const res = await fetch(`${HACKER_NEWS_V0_API}/item/${id}.json`);
  return await res.json() as T;
}

export async function getTopStories(count: number) : Promise<Story[]> {
  const ids = await getTopStoriesIds(count);
  const stories = await Promise.all(ids.map(id => getItem<Story>(id)));
  return stories;
}