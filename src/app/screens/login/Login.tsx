// react
import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router';

// redux
import { useDispatch, useSelector, actions } from '../../slices/store';

// bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// app
import './Login.scss';
import LoginType from './Login-Type';

// server
const server = process.env.REACT_APP_API_URL;

const Login: FC<{ isModal: boolean }> = ({ isModal }) => {
	// hooks
	const history = useHistory();
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state);
	const [state, setState] = useState<LoginType>({
		email: 'imransilvake@gmail.com',
		password: 'Welcome1@'
	});

	useEffect(() => {
		// take route to matches when token is available
		if (token && !isModal) history.push('/matches');
	}, [history, isModal, token]);

	/**
	 * handle change event
	 * @param event
	 */
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// destruct
		const { id, value } = event.target;

		// set state
		setState((prevState) => ({
			...prevState,
			[id]: value
		}));
	};

	/**
	 * handle submit form
	 * @param event
	 */
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		// prevent default
		event.preventDefault();

		// sign-in process to get token
		fetch(`${server}/api/sign-in`, {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify(state)
		}).then(async (response) => {
			// error
			if (response.status !== 200) return;

			// json response
			const body = await response.json();

			// set token
			dispatch(actions.setToken(body.token));
		});
	};

	return (
		<div className={isModal ? 'by-login by-modal' : 'by-login'}>
			{/* retrict user after login */}
			{!token && (
				<Form onSubmit={handleSubmit}>
					{/* Label */}
					<h1>Bayes E-Sports</h1>

					{/* Email */}
					<Form.Group>
						<Form.Control
							id="email"
							type="email"
							placeholder="Enter email"
							className="by-input"
							value={state.email}
							onChange={handleChange}
						/>
					</Form.Group>

					{/* Password */}
					<Form.Group>
						<Form.Control
							id="password"
							type="password"
							placeholder="Password"
							className="by-input"
							value={state.password}
							onChange={handleChange}
						/>
					</Form.Group>

					{/* Login */}
					<Button
						variant="primary"
						type="submit"
						className="by-button"
						disabled={!state.email || !state.password}
					>
						Login
					</Button>
				</Form>
			)}
		</div>
	);
};
export default Login;
