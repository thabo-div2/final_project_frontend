const baseURL = "https://desolate-meadow-13744.herokuapp.com/patient";

function registerPatient() {
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
	fetch(baseURL, {
		method: "POST",
		body: JSON.stringify(newPatient),
		headers: {
			"Content-type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			localStorage.setItem("patients", JSON.stringify(data));
			if (data.status_code == 201) {
				window.location.href = "/patients.html";
			}
		});
}
