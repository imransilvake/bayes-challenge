# Bayes Frontend Challenge

## Run
1. Execute `npm run server` to host the API on http://localhost:8080.
2. Execute `npm install` in the root folder of the challenge.
3. Execute `npm start` to host the React application on http://localhost:3000.

## Tasks
1. **Sign in**
Use the Fetch API to make a `POST` request to `http://localhost:8080/api/sign-in` to receive a token.
   - The `POST` body should look like `{ "email": "anything@anything.com", "password": "anything" }`.
   - _(bonus)_ This token expires in 30 seconds. When the API returns `401 - Unauthorized`, a modal should pop up allowing the user to sign in again.

2. **Load data**
Use the token to send a `GET` request for e-sport match data from `http://localhost:8080/api/matches?page=0`.
   - The token should be put in the `Authorization` header with a value of: `Bearer <token>`.
   - Put the data into the Redux store.

3. **Display data**
Create a new page to show the matches available from the Redux store.
   - When a user arrives on the new page, the matches should be cleared from the Redux store and loaded again from the API
   - The API response is paginated, not all matches are returned in a single request, add a "load more" button unless no more matches can be loaded.
   - While loading data, display a loading symbol in the application.
   - _(bonus)_ Filter the matches based on game title, add checkboxes to the interface to let users decide what they want to see.
   - _(bonus)_ Load more matches when the user scrolls to the bottom of the screen, a.k.a. infinite scroll.

4. **Save changes**
Send JSON data of a match in the body of a `POST` request to `http://localhost:8080/api/match`.
   - Allow users to archive matches.
