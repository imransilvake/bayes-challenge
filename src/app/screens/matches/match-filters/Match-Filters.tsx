// react
import React, { FC, useState, ChangeEvent, useEffect } from 'react';

// redux
import { useDispatch, useSelector, actions } from '../../../slices/store';

// bootstrap
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

// app
import './Match-Filters.scss';
import MatchFilterType from './Match-Filter-Type';

const MatchFilters: FC = () => {
	// hook: filter state
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state);
	const [filterValue, setFilterValue] = useState('');

	// filter options
	const filterOptions: MatchFilterType[] = [
		{ name: 'Dota2', value: 'dota2' },
		{ name: 'CSGO', value: 'csgo' },
		{ name: 'LOL', value: 'lol' }
	];

	useEffect(() => {
		if (filterValue) {
			// apply filter
			dispatch(actions.applyFilter(filterValue));
		}
	}, [dispatch, filterValue]);

	return !token ? (
		<span />
	) : (
		<div className="by-matches-filter">
			<h5>Match Filters</h5>
			<div className="by-filters">
				<ButtonGroup toggle className="by-toggle-group">
					{filterOptions.map((filter, idx) => (
						<ToggleButton
							key={idx}
							type="radio"
							variant="secondary"
							name="filter"
							className="by-toggle"
							value={filter.value}
							checked={filterValue === filter.value}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setFilterValue(e.currentTarget.value)
							}
						>
							{filter.name.toUpperCase()}
						</ToggleButton>
					))}
				</ButtonGroup>
			</div>
		</div>
	);
};
export default MatchFilters;
