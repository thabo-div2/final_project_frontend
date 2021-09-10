// A function to register an admin
function adminRegistration() {
	// Setting variables to put in to my api
	const fname = document.querySelector("#first_name").value;
	const lname = document.querySelector("#last_name").value;
	const email = document.querySelector("#email").value;
	const username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;
	// fetching the api
	fetch("https://desolate-meadow-13744.herokuapp.com/admin/", {
		method: "POST",
		body: JSON.stringify({
			first_name: fname,
			last_name: lname,
			email: email,
			username: username,
			password: password,
		}),
		// this header to make the information into JSON Format
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			// to see what information is going into the api
			console.log(data);
			// if data is correct go to the next page
			if (data.status_code == 201) {
				window.location.href = "/login.html";
			} else {
				alert("Invalid Credentials!!!!");
			}
		});
}
