const baseURL = "https://desolate-meadow-13744.herokuapp.com/patient";

// function to register patient
function registerPatient() {
	// an object that will be passed into the api
	const newPatient = {
		first_name: document.querySelector("#first_name").value,
		last_name: document.querySelector("#last_name").value,
		address: document.querySelector("#address").value,
		email: document.querySelector("#email").value,
		birth_date: document.querySelector("#birth_date").value,
		gender: document.querySelector("#gender").value,
		phone_num: document.querySelector("#phone_num").value,
		id_num: document.querySelector("#id_num").value,
	};
	console.log(newPatient);
	// fetch call using the POST method
	fetch(baseURL, {
		method: "POST",
		body: JSON.stringify(newPatient),
		// transforming the data into JSON format
		headers: {
			"Content-type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			// storing the data into the local storage
			localStorage.setItem("patients", JSON.stringify(data));
			// will go to the other page if successful
			if (data.status_code == 201) {
				window.location.href = "/patients.html";
			} else {
				alert("Invalid Credentials");
			}
		});
}
