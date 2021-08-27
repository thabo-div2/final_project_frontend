const baseURL = "https://desolate-meadow-13744.herokuapp.com/patient";

function registerPatient() {
	const fname = document.querySelector("#first_name").value;
	const lname = document.querySelector("#last_name").value;
	const address = document.querySelector("#address").value;
	const email = document.querySelector("#email").value;
	const birth_date = document.querySelector("#birth_date").value;
	const gender = document.querySelector("#gender").value;
	const phone_num = document.querySelector("#phone_num").value;
	const id_num = document.querySelector("#id_num").value;
	fetch(baseURL, {
		method: "POST",
		body: JSON.stringify({
			first_name: fname,
			last_name: lname,
			address: address,
			email: email,
			birth_date: birth_date,
			gender: gender,
			phone_num: phone_num,
			id_num: id_num,
		}),
		headers: {
			"Content-type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
		});
}
