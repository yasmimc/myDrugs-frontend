import {
	Input,
	InputErrorMsg,
	SignForm,
	SubmitButton,
} from "../../components/Form";
import TopBar from "../../components/TopBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cpfRegex, emailRegex } from "../sign_up/regex";
import API from "../../services/API/requests";
import { useNavigate } from "react-router";

export default function SignIn() {
	const navigate = useNavigate();
	const [input, setInput] = useState({
		user: "",
		password: "",
	});

	const [inputError, setInputError] = useState({
		invalidCredentials: false,
		emptyFields: false,
	});

	const [loading, setLoading] = useState(false);

	function submitForm(event) {
		event.preventDefault();
		setLoading(true);

		const body = {
			cpf: input.user.match(cpfRegex) ? input.user : "",
			email: input.user.match(emailRegex) ? input.user : "",
			password: input.password,
		};

		if (input.user && input.password)
			API.signIn(body)
				.then(() => {
					navigate("/");
					setLoading(false);
				})
				.catch((error) => {
					if (!error.response) alert(`Application error: ${error.message}`);
					else if (error.response.status === 500) alert(`Server error`);
					else setInputError({ ...inputError, invalidCredentials: true });
					setLoading(false);
				});
		else setInputError({ ...inputError, emptyFields: true });
	}
	return (
		<>
			<TopBar />
			<SignForm onSubmit={submitForm}>
				<h1>Sign Up</h1>
				<Input
					type="text"
					placeholder="E-mail or CPF"
					onChange={(event) => {
						setInput({ ...input, user: event.target.value });
						setInputError({ ...inputError, invalidCredentials: false });
					}}
				/>

				<Input
					type="password"
					placeholder="Password"
					onChange={(event) => {
						setInput({ ...input, password: event.target.value });
						setInputError({ ...inputError, invalidCredentials: false });
					}}
				/>

				{inputError.invalidCredentials ? (
					<InputErrorMsg>Invalid credentials</InputErrorMsg>
				) : null}
				{inputError.emptyFields ? (
					<InputErrorMsg>Please fill in all fields</InputErrorMsg>
				) : null}

				<SubmitButton disabled={loading} type="submit">
					Register
				</SubmitButton>
				<Link to="/sign-up">No account yet?</Link>
			</SignForm>
		</>
	);
}
