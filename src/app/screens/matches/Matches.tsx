// react
import React, { FC } from 'react';

// app
import MatchList from './match-list/Match-List';
import MatchFilters from './match-filters/Match-Filters';

const Matches: FC = () => {
	return (
		<div className="by-matches">
			{/* matches filter */}
			<MatchFilters />

			{/* matches list */}
			<MatchList />
		</div>
	);
};
export default Matches;
