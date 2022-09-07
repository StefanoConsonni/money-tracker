import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

// styles
import styles from "./Signup.module.css";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { signup, isPending, error } = useSignup();

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(email, password, username);
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
			{!isPending && <button className="btn">Signup</button>}
			{isPending && (
				<button className="btn" disable>
					Loading
				</button>
			)}
			{error && <p>{error}</p>}
		</form>
	);
}
