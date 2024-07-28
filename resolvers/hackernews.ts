type ItemId = number;
type ItemIdList = ItemId[];

type ItemType = "job" | "story" | "comment" | "poll" | "pollopt";

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
	type: "story";
	descendants: number;
	score: number;
	title: string;
}

export interface Comment extends Item {
	type: "comment";
	parent: ItemId;
}

const HACKER_NEWS_V0_API = "https://hacker-news.firebaseio.com/v0";

type StoryCategory = "new" | "top" | "best";

export async function getStoriesIds(count: number, category: StoryCategory) {
	const res = await fetch(`${HACKER_NEWS_V0_API}/${category}stories.json`);
	const ids = (await res.json()) as ItemIdList;
	return ids.slice(0, count);
}

export async function getItem<T extends Item>(id: ItemId) {
	const res = await fetch(`${HACKER_NEWS_V0_API}/item/${id}.json`);
	return (await res.json()) as T;
}

export async function getStories(count: number, category: StoryCategory) {
	const ids = await getStoriesIds(count, category);
	return await Promise.all(ids.map((id) => getItem<Story>(id)));
}

export async function getUser(id: string) {
	const res = await fetch(`${HACKER_NEWS_V0_API}/user/${id}.json`);
	return (await res.json()) as User;
}

export async function getComments(ids: ItemIdList) {
	return await Promise.all(ids.map((id) => getItem<Comment>(id)));
}

export async function getStory(id: ItemId) {
	const story = await getItem<Story>(id);
	return {
		story,
		comments: await getComments(story.kids ?? []),
	};
}
