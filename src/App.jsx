import { useState, useRef, useEffect } from 'react';
import './App.css';
import app from '../firebase';
import {
	getAuth,
	createUserWithEmailAndPassword,
	setPersistence,
	signInWithEmailAndPassword,
	browserLocalPersistence,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';

function App() {
	const [user, setUser] = useState('');
	const emailRef = useRef();
	const passwordRef = useRef();

	useEffect(() => {
		const auth = getAuth(app);
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log(user);
				setUser(user.email);
			} else {
			}
		});
	});

	const logout = () => {
		const auth = getAuth(app);
		signOut(auth)
			.then(() => {
				setUser("");
			})
			.catch((error) => {
				console.log(error)
			});
	};

	const signUp = (event) => {
		event.preventDefault();

		const auth = getAuth(app);
		createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
				// ...
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const login = (event) => {
		event.preventDefault();
		const auth = getAuth(app);
		setPersistence(auth, browserLocalPersistence)
			.then(() => {
				console.log(login);
				return signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<>
			<div>
				<h1>Firebase App</h1>
				<form>
					<label htmlFor='femail'>eMail</label>
					<input type='text' id='femail' placeholder='eMail' ref={emailRef} />
					<label htmlFor='fepassword'>Password</label>
					<input type='text' id='fepassword' placeholder='Password' ref={passwordRef} />
					<input type='submit' value='Registrieung' id='' onClick={signUp} />
					<input type='submit' value='Login' onClick={login} />
				</form>
				<div>
					{user === '' ? <h3>Nicht eingelogt</h3> : <h3>Eingelogt als {user}</h3>}
					<button onClick={logout}>Logout</button>
				</div>
			</div>
		</>
	);
}

export default App;
