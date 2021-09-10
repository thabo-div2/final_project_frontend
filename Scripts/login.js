const baseURL = "https://desolate-meadow-13744.herokuapp.com/login";

// function to login
function loginAdmin() {
	// Using the variables to pass into the api
	const username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;
	// fetching the url to login
	fetch(baseURL, {
		// Using the patch method to login
		method: "PATCH",
		body: JSON.stringify({
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
			try {
				console.log(data.data);
				//  Storing the information in the local storage
				localStorage.setItem("user", JSON.stringify(data.data));
				if (data.status_code == 200) {
					// Changes the page if it everything worked
					window.location.href = "./patients.html";
				} else {
					// Displays if the credentials are incorrect
					alert("Invalid credentials!!!");
				}
			} catch {
				// Displays if the credentials are incorrect
				if (data.status_code == 404) {
					console.log(err);
				}
			}
		});
}
