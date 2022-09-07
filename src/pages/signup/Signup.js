import { useState } from "react";

// styles
import styles from "./Signup.module.css";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, username, password);
	};

	return (
		<form className={styles["signup-form"]} onSubmit={handleSubmit}>
			<h2>Signup</h2>
			<label>
				<span>email:</span>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
			</label>

			<label>
				<span>username:</span>
				<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
			</label>

			<label>
				<span>password:</span>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			</label>
			<button className="btn">Login</button>
		</form>
	);
}
