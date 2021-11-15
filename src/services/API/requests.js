import axiosBase from "./axiosBase";

const API = {
	signUp,
	signIn,
	logOut,
	getProducts,
	updateCart,
};

function createBearerAuthorization(token) {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
}

function signUp({ name, cpf, email, password }) {
	return axiosBase.post("/sign-up", {
		name,
		cpf,
		email,
		password,
	});
}

function signIn({ cpf, email, password }) {
	return axiosBase.post("/sign-in", {
		cpf,
		email,
		password,
	});
}

function logOut({ token }) {
	return axiosBase.delete("/sessions", createBearerAuthorization(token));
}

function getProducts() {
	return axiosBase.get("/products");
}

function updateCart() {}

export default API;
