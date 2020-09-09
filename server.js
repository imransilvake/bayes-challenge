// require
const http = require('http');
const shortid = require('shortid');

// tokens
const tokens = {};

// teams
const teams = [
	'Peach',
	'Pumpkin Spice Latte',
	'Warriors of the World',
	'Into The Breach',
	'Team Sneed',
	'The Toenails',
	'Warwick Ducks',
	'los kogutos',
	'PLMIX',
	'AGO',
	'Wisla Krakow',
	'NexusVVCSGO',
	'Team Secret',
	'Izako Boars',
	'Team Gaminate',
	'AVEZ esport',
	'Pompa',
	'ACTINA PACT',
	'Illuminar',
	'Isurus',
	'Sharks Esports',
	'forZe-',
	'SproutGG',
	'BOOM Esports',
	'Havan Liberty',
	'sAwtouadar',
	'Team Singularity',
	'Cloud9',
	'Gen.G Esports',
	'Evil Geniuses',
	'Team Liquid',
	'Chaos Esports Club',
	'FURIA Esports',
	'100 Thieves',
	'Triumph',
	'Invictus Gaming',
	'ViCi Gaming',
	'AVANT-',
	'ORDER',
	'Beyond Esports',
	'TYLOO LBET',
	'Chiefs',
	'Renegades',
	'Fnatic',
	'Ninjas In Pyjamas',
	'Complexity Gaming',
	'FaZe Clan',
	'Astralis',
	'Team Spirit',
	'mousesports',
	'Team Vitality',
	'Heroic',
	'OG',
	'BIG',
	'ENCE',
	'G2 Esports',
	'NaVi',
	'GODSENT',
	'Fragbox Gaming',
	'MEGABALLERS',
	'mYinsanity',
	'KINGZZZ',
	'SPARX ESPORTS CH',
	'PriFu',
	'Red Instinct',
	'Nordavind',
	'fly1nghirsch',
	'Jerseyboys',
	'Galaxy Racer Esports',
	'GODZ1337',
	'Shock Bomb',
	'Lvlup',
	'MiKS',
	'HMA Fnatic Rising',
	'GamersOrigin',
	'We Love Gaming',
	'7More7 Pompa Team',
	'Misfits Premier',
	'K1CK eSports Club',
	'LDLC OL',
	'Samsung Morning Stars',
	'Paradox-',
	'Vertex Esports Club',
	'Aftermind',
	'Ground Zer0',
	'Rogue',
	'Team GamerLegion',
	'Movistar Riders',
	'SuppUp eSports',
	'Gen.G',
	'Rebirth Esports Black',
	'Homeless',
	'Incognito',
	'Swole Patrol',
	'ex-Warriors Int',
	'New England Whalers',
	'Eclipse eSports',
	'Mythic',
	'team oNe',
	'Third Impact',
	'T1',
	'Mako',
	'Afreeca Freecs',
	'KT Rolster',
	'Rooster',
	'FlyQuest',
	'Team SoloMid',
	'Good Game',
	'Krsko',
	'Blink',
	'eSportsKosova.L4O',
	'TNC Predator',
	'INTZ',
	'paiN Gaming',
	'Sparkling Water',
	'5 Ronin',
	'Papara SuperMassive',
	'DAMWON Gaming',
	'DRX',
	'Caught off Guard',
	'Rooster 2',
	'Neon Esports',
	'Recon 5',
	'ETHEREAL',
	'Ex-Polar Ace',
	'timbermen',
	'Kinship',
	'Sixth Gear',
	'Swedish Canadians',
	'Rugratz',
	'Positive Vibes Only',
	'RBG',
	'HellRaisers 1XBET',
	'Lese Esports',
	'OVERT CSGO',
	'Blessed eSports',
	'Ex-Incept',
	'Incept',
	'F0RBIDDEN',
	'Riot Gaming',
	'R!OT Gaming',
	'Keep the Comms Up',
	'Ex-Recon 5',
	'SKADE'
];

// tournaments
const tournaments = [
	'ESL Pro League Season 12 Europe',
	'ESL 2020 UK Premiership Fall',
	'Swisscom Hero League Season 4',
	'ESL 2020 Season 4 Swisscom Hero League',
	'ESL 2020 Fall Mistrzostwa Polski',
	'ESEA Premier Division Season 35 Europe',
	'ESL Pro League Season 12 Asia',
	'ESL Pro League Season 12 Oceania',
	'ESL Pro League Season 12 South America',
	'ESL Pro League Season 12 North America',
	'European Masters 2020 Summer',
	'ESL Pro League Season 12 Europe',
	'A1 Adria League 2020 Season',
	'ESEA Premier Division Season 35 Australia',
	'LCK 2020 Summer',
	'ESEA Premier Division Season 35 North America',
	'LCS 2020 Summer',
	'LEC 2020 Summer',
	'ESL One 2020 Thailand',
	'CBLOL 2020 Winter',
	'TCL 2020 Summer'
];

// matches
const matches = new Array(1000).fill().map(() => {
	const id = shortid.generate();

	const match = {
		id,
		title: ['lol', 'dota2', 'csgo'][Math.floor(3 * Math.random())],
		tournament: tournaments[Math.floor(tournaments.length * Math.random())],
		teamA: teams[Math.floor(teams.length * Math.random())],
		teamB: teams[Math.floor(teams.length * Math.random())],
		score: null,
		start: new Date(Date.now().valueOf() - 18461000000 + Math.random() * 31536000000),
		status: ['concluded', 'archived'][Math.floor(2 * Math.random())]
	};

	if (Math.random() < 0.05) match.status = 'error';

	if (match.start > new Date()) match.status = 'pending';

	if (match.status !== 'pending') {
		match.score = `${Math.floor(3 * Math.random())} - ${Math.floor(3 * Math.random())}`;
	}

	return match;
});

// sort matches by start date
matches.sort((a, b) => a.start - b.start);

// memory
const memory = matches.reduce((memo, match) => {
	memo[match.id] = match;
	return memo;
}, {});

// API hosting information
console.log('Hosting API at http://localhost:8080');

// server listen port 8000
http.createServer(handler).listen(8080);

// api handler
function handler(request, response) {
	const headers = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': request.headers.Origin || '*',
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Headers': 'Authorization, Content-Type',
		'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
	};

	if (request.method === 'OPTIONS') {
		response.writeHead(200, headers);
		return response.end();
	}

	let raw = '';

	request.on('data', (c) => (raw += c));

	request.on('end', () => {
		const body = raw ? JSON.parse(raw) : null;

		// api: sign-in
		if (request.url === '/api/sign-in' && request.method === 'POST') {
			const token = shortid.generate();
			tokens[`Bearer ${token}`] = {
				expires: new Date(Date.now().valueOf() + 30000)
			};
			response.writeHead(200, headers);
			return response.end(JSON.stringify({ token }));
		}

		// invalid token
		if (
			!request.headers.authorization ||
			!tokens[request.headers.authorization] ||
			tokens[request.headers.authorization].expires < new Date()
		) {
			response.writeHead(401, headers);
			return response.end(JSON.stringify({ error: 'Invalid token' }));
		}

		// api: matches
		if (request.url.indexOf('/api/matches') === 0) {
			const url = new URL(`http://localhost:8080${request.url}`);
			const page = parseInt(url.searchParams.get('page') || '0', 10);
			const ids = Object.keys(memory);

			response.writeHead(200, headers);

			return setTimeout(() => {
				response.end(
					JSON.stringify(
						ids.slice(page * 50, page * 50 + 50).reduce(
							(memo, id) => {
								memo.results[id] = memory[id];

								memo.size += 1;

								return memo;
							},
							{ count: ids.length, size: 0, page, results: {} }
						)
					)
				);
			}, 1000);
		}

		// api: match
		if (request.url === '/api/match') {
			memory[body.id] = body;
			response.writeHead(200, headers);
			return response.end(JSON.stringify(body));
		}

		response.writeHead(404, headers);
		response.end(JSON.stringify({ error: 'Invalid endpoint' }));
	});
}
