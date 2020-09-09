// react
import React, { FC } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

// redux
import { useSelector } from './slices/store';

// app
import Logo from '../assets/images/logo.png';
import Login from './screens/login/Login';
import Matches from './screens/matches/Matches';
import ScrollToTop from './components/scroll-to-top/Scroll-To-Top';
import './App.scss';

const App: FC = () => {
	// hooks
	const { token } = useSelector((state) => state);

	return (
		<div className="by-app">
			{/* header */}
			<header>
				{/* logo */}
				<div className="by-logo">
					<NavLink exact to={token ? '/matches' : '/'}>
						<img src={Logo} alt="logo" />
					</NavLink>
				</div>
			</header>

			{/* app routes */}
			<main>
				<Switch>
					{/* login */}
					<Route exact path="/" component={Login} />

					{/* matches */}
					<Route path="/matches" component={Matches} />
				</Switch>
			</main>

			{/* Scroll To Top */}
			<ScrollToTop />
		</div>
	);
};
export default App;
