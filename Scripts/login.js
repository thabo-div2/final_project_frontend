const baseURL = "https://desolate-meadow-13744.herokuapp.com/login";

function loginAdmin() {
	const username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;
	fetch(baseURL, {
		method: "PATCH",
		body: JSON.stringify({
			username: username,
			password: password,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data.data);
			localStorage.setItem("user", JSON.stringify(data.data));
			if (data.status_code == 200) {
				window.location.href = "./patients.html";
			} else {
				alert("Invalid credentials!!!");
			}
		});
}
