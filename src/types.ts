export type Match = {
	id: string;
	title: 'dota2' | 'csgo' | 'lol';
	tournament: string;
	teamA: string;
	teamB: string;
	score: string | null;
	start: string;
	status: 'pending' | 'ongoing' | 'concluded' | 'error' | 'archived';
};

export type State = {
	matches: { [id: string]: Match };
	token: string;
	page: number;
	loading: boolean;
	finished: boolean;
	filters: string[];
};
