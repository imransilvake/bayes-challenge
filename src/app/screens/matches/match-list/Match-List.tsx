// react
import React, { FC, useEffect, useRef, useCallback } from 'react';

// redux
import { useDispatch, useSelector, actions } from '../../../slices/store';

// bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// app
import './Match-List.scss';
import { Match } from '../../../../types';
import Loader from '../../../../assets/svg/loader.svg';
import Login from '../../login/Login';
import moment from 'moment';

// server
const server = process.env.REACT_APP_API_URL;

const MatchList: FC = () => {
	// hooks
	const dispatch = useDispatch();
	const { token, matches, page, loading, finished, filter } = useSelector((state) => state);
	const pageState = useRef(-1);

	useEffect(() => {
		// return if token is not found
		if (!token) return;

		// return if page is not incremented
		if (pageState.current === page) return;

		// set loading
		dispatch(actions.setLoading(true));

		// api call: matches
		fetch(`${server}/api/matches$?page=${page}`, {
			method: 'GET',
			mode: 'cors',
			headers: new Headers({
				Authorization: `Bearer ${token}`
			})
		}).then(async (response) => {
			// error: 401
			if (response.status === 401) {
				// empty token and return
				dispatch(actions.setToken(''));
			}

			// other error
			if (response.status !== 200) return;

			// json response
			const body = await response.json();

			// add matches
			dispatch(actions.addMatches(body.results));

			// set loading
			dispatch(actions.setLoading(false));

			// update ref page state
			pageState.current = page;
		});
	}, [dispatch, token, page]);

	/**
	 * implement infinite scrolling using Intersection Observer API
	 *
	 * note:
	 * keep in mind that useRef doesn't notify you when its content changes.
	 * mutating the .current property doesn't cause a re-render.
	 * if you want to run some code when React attaches or detaches a ref to a DOM node,
	 * you may want to use a callback ref instead.
	 * @type {*}
	 */
	const observer: any = useRef<IntersectionObserver | null>(null);
	const lastItemFromMatchesListRef = useCallback(
		(node) => {
			// skip:
			// 1) if loading
			// 2) when all data is loaded
			if (loading || finished) return;

			// disconnect the intersection observer
			if (observer.current && observer.current.root !== undefined) {
				observer.current.disconnect();
			}

			// re-create intersection observer
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					// call next set of items
					dispatch(actions.nextPage());
				}
			});

			// watch the target node
			if (node) observer.current.observe(node);
		},
		[dispatch, finished, loading]
	);

	/**
	 * set match status to archive
	 * @param match
	 */
	const setArchiveMatch = (match: Match) => {
		// return if token is not found
		if (!token) return;

		// api call: matches
		fetch(`${server}/api/match`, {
			method: 'POST',
			mode: 'cors',
			headers: new Headers({
				Authorization: `Bearer ${token}`
			}),
			body: JSON.stringify({ ...match, status: 'archived' })
		}).then(async (response) => {
			// error: 401
			if (response.status === 401) {
				// empty token and return
				dispatch(actions.setToken(''));
			}

			// other error
			if (response.status !== 200) return;

			// json response
			const body = await response.json();

			// set match status to archive
			dispatch(actions.archiveMatch(body));
		});
	};

	/**
	 * return filtered matches
	 * @param matches
	 */
	const getMatches = (matches: Match[]): Match[] => {
		return matches.filter((f: Match) => !filter.length || filter.includes(f.title));
	};

	return (
		<div className="by-matches-list">
			{/* matches */}
			{matches && (
				<Row className="by-items-row">
					{getMatches(Object.values(matches)).map((match: Match, index: number) => (
						<Col
							xs={12}
							md={6}
							lg={4}
							className="by-item-col"
							key={match.id}
							ref={
								getMatches(Object.values(matches)).length - 6 === index
									? lastItemFromMatchesListRef
									: null
							}
						>
							<div className="by-item">
								{/* title */}
								{match.title && <h4 className="by-title">{match.title}</h4>}

								{/* tournament */}
								{match.tournament && (
									<div className="by-tournament">
										<p>{match.tournament}</p>
									</div>
								)}

								{/* teams */}
								{match.teamA && match.teamB && (
									<div className="by-teams">
										{/* score */}
										{match.score && (
											<div className="by-score">
												<h5>{match.score}</h5>
												<h6>Score</h6>
											</div>
										)}

										{/* teamA */}
										{match.teamA && (
											<div className="by-team by-team-a">
												<h6>Team A</h6>
												<h6>{match.teamA}</h6>
											</div>
										)}

										{/* teamB */}
										{match.teamB && (
											<div className="by-team by-team-b">
												<h6>Team B</h6>
												<h6>{match.teamB}</h6>
											</div>
										)}
									</div>
								)}

								{/* start */}
								{match.start && (
									<div className="by-start">
										<h5>Start</h5>
										<p>{moment(match.start).format('DD MMMM YYYY HH:mm')}</p>
									</div>
								)}

								{/* status */}
								{match.status && (
									<div className="by-status">
										<h5>Status</h5>
										<p>{match.status}</p>
									</div>
								)}

								{/* archive match */}
								{match.status !== 'archived' && (
									<div className="by-archive">
										<Button onClick={() => setArchiveMatch(match)}>
											archive
										</Button>
									</div>
								)}
							</div>
						</Col>
					))}
				</Row>
			)}

			{/* loading */}
			{loading && (
				<div className="by-load-more">
					<img src={Loader} alt="load more" />
				</div>
			)}

			{/* login through modal when token expires */}
			<Modal show={!token}>
				<Modal.Body>
					<Login isModal />
				</Modal.Body>
			</Modal>
		</div>
	);
};
export default MatchList;
