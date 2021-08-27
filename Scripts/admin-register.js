function adminLogin() {
	const fname = document.querySelector("#first_name").value;
	const lname = document.querySelector("#last_name").value;
	const email = document.querySelector("#email").value;
	const username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;
	fetch("https://desolate-meadow-13744.herokuapp.com/admin/", {
		method: "POST",
		body: JSON.stringify({
			first_name: fname,
			last_name: lname,
			email: email,
			username: username,
			password: password,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
		});
}
