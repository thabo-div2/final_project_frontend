const baseURL = "https://desolate-meadow-13744.herokuapp.com/view-patient/";

let patients = [];

fetch(baseURL)
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		patients = data.data;
		localStorage.setItem("patients", patients);
		renderPatients(patients);
	});

function renderPatients(patients) {
	let conatiner = document.querySelector("#view-patients");
	conatiner.innerHTML = "";
	patients.forEach((patient) => {
		conatiner.innerHTML += `
            <div class="patient card ${patient.patient_id}">
                <h3>${patient.first_name} ${patient.last_name}</h3>
                <div class="details">
                    <p>Address: ${patient.address}</p>
                    <p>Email: ${patient.email}</p>
                    <p>Gender: ${patient.gender}</p>
                    <p>Identification Number: ${patient.id_num}</p>
                    <p>Cell Number: +27 ${patient.phone_num}</p>
					<div class="patients-btn-container">
						<button class="patients-btn" onclick="deletePatient(${patient.patient_id})">Delete Patient</button>
						<button class="patients-btn" onclick="editModal(${patient.patient_id})">Edit Patient</button>
						<div id="edit-modal-${patient.patient_id}" class="edit-modal">
							<div class="edit-bg">
								<span onclick="editModal(${patient.patient_id})" class="close">&times;</span>
								<div class="edit-heading">
									<h2>Edit Patient Info</h2>
								</div>
								<form id="edit-form-${patient.patient_id} edit-form" onsubmit="editPatients(${patient.patient_id}); event.preventDefault()">
									<div>
										<label for="e_email">Email</label>
										<input type="text" id="e_email-${patient.patient_id}" name="email" placeholder="Email" required />
									</div>
									<div>
										<label for="e_address">Address</label>
										<input type="text" id="e_address-${patient.patient_id}" name="address" placeholder="Address" required />
									</div>
									<div>
										<label for="e_phone_num">Phone Number:</label>
										<input type="text" id="e_phone_num-${patient.patient_id}" name="phone_num" placeholder="Phone Number" required />
									</div>
									<button class="patients-btn" type="submit">Edit Info</button>
								</form>
							</div>
						</div>
						<button class="patients-btn" onclick="showModal(${patient.patient_id})" class="modal-btn">Show Appointment</button>
						<div id="show-modal-${patient.patient_id}" class="show-modal">
							<div class="show-bg-${patient.patient_id} show-bg">
							</div>
						</div>
						<button class="patients-btn" onclick="addModal(${patient.patient_id})">Add Appointment</button>
						<div id="add-appoint-${patient.patient_id}" class="add-appoint">
							<div class="add-appoint-bg-${patient.patient_id} add-appoint-bg">
								<span onclick="addModal(${patient.patient_id})" class="close">&times;</span>
								<div class="add-appoint-heading">
									<h2>Add Appointment</h2>
								</div>
								<form id="add-form-${patient.patient_id}" onsubmit="addAppointment(${patient.patient_id}); event.preventDefault()">
									<div>
										<label for="a_first_name">First Name:</label>
										<input type="text" id="a_first_name-${patient.patient_id}" name="first_name" placeholder="First Name" required />
									</div>
									<div>
										<label for="a_last_name">Last Name:</label>
										<input type="text" id="a_last_name-${patient.patient_id}" name="last_name" placeholder="Last Name" required />
									</div>
									<div>
										<label for="a_email">Email:</label>
										<input type="text" id="a_email-${patient.patient_id}" name="email" placeholder="Email" required />
									</div>
									<div>
										<label for="a_phone_num">Phone Number:</label>
										<input type="number" id="a_phone_num-${patient.patient_id}" name="phone_num" placeholder="Phone Number" required />
									</div>
									<div>
										<label for="a_type">Type:</label>
										<input type="text" id="a_type-${patient.patient_id}" name="type" placeholder="Type" required />
									</div>
									<div>
										<label for="a_booking_date">Bookingn Date:</label>
										<input type="date" id="a_booking_date-${patient.patient_id}" name="booking_date" placeholder="Booking Date" required />
									</div>
									<div>
										<label for="a_start_date">Start Date:</label>
										<input type="date" id="a_start_date-${patient.patient_id} name="start_date" placeholder="Start Date" required />
									<button class="patients-btn" type="submit">Add Appointment</button>
								</form>
							</div>
						</div>
						</div>
						<button class="patients-btn" onclick="illModal(${patient.patient_id})" class="ill-btn">Show Illness</button>
						<div id="show-illness-${patient.patient_id}" class="show-ill">
							<div class="show-ill-bg-${patient.patient_id} show-ill-bg"></div>
						</div>
						<button class="patients-btn" onclick="addIllModal(${patient.patient_id})" class="btn">Add Illness</button>
						<div id="add-ill-modal-${patient.patient_id}" class="add-ill-modal">
							<div class="add-ill-bg-${patient.patient_id} add-ill-bg">
								<span onclick="addIllModal(${patient.patient_id})" class="close">&times;</span>
								<div class="add-ill-heading">
									<h2>Add Illness</h2>
								</div>
								<form id="add-ill-form-${patient.patient_id}" onsubmit="addIll(${patient.patient_id}); event.preventDefault()">
									<div>
										<label for="name">Name:</label>
										<input type="text" id="name-${patient.patient_id}" placeholder="Name of Illness" required /> 
									</div>
									<div>
										<label for="type">Type of Illness:</label>
										<input type="text" id="type-${patient.patient_id}" placeholder="Type of Illness" required /> 
									</div>
									<div>
										<label for="description">Description:</label>
										<input type="text" id="description-${patient.patient_id}" placeholder="Description of Illness" required /> 
									</div>
									<button class="patients-btn" type="submit"> Submit Info </button>
								</form>
							</div>
						</div>
					</div>
				</div>
            </div>
            `;
	});
}

function deletePatient(patient_id) {
	fetch(
		`https://desolate-meadow-13744.herokuapp.com/delete-patient/${patient_id}`,
		{
			method: "DELETE",
		},
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
		});
}

function showModal(patient_id) {
	document
		.querySelector(`#show-modal-${patient_id}`)
		.classList.toggle("active");
	showAppointment(patient_id);
}

function showAppointment(patient_id) {
	const container = document.querySelector(`.show-bg-${patient_id}`);
	fetch(
		`https://desolate-meadow-13744.herokuapp.com/view-appointment/${patient_id}`,
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			let times = data.data;
			container.innerHTML = "";
			console.log(times);
			if (times === null) {
				container.innerHTML += `
				<h1> Appointment has not been made yet</h1> 
				`;
				if (confirm("Do you want to book an appointment")) {
					window.location.href = "./appointments.html";
				} else {
					window.location.reload();
				}
			} else {
				container.innerHTML += `
				<span onclick="showModal(${times.patient_id})" class="close">&times;</span>
				<div class="show-details">
					<h3>Full name: ${times.first_name} ${times.last_name}</h3>
					<p>Email: ${times.email}</p>
					<p>Phone number: +27 ${times.phone_num}</p>
					<p>Appointment date: ${times.booking_date}</p>
				</div>
				`;
			}
		});
}

function editModal(patient_id) {
	document
		.querySelector(`#edit-modal-${patient_id}`)
		.classList.toggle("active");
}

function editPatients(patient_id) {
	const email = document.querySelector(`#e_email-${patient_id}`).value;
	const address = document.querySelector(`#e_address-${patient_id}`).value;
	const phone_num = document.querySelector(`#e_phone_num-${patient_id}`).value;
	fetch(
		`https://desolate-meadow-13744.herokuapp.com/edit-patient/${patient_id}`,
		{
			method: "PUT",
			body: JSON.stringify({
				email: email,
				address: address,
				phone_num: phone_num,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		},
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			if (data.status_code == 200) {
				window.location.reload();
			}
		});
}

function illModal(patient_id) {
	document
		.querySelector(`#show-illness-${patient_id}`)
		.classList.toggle("active");
	renderIllness(patient_id);
}

function renderIllness(patient_id) {
	const illness = document.querySelector(`.show-ill-bg-${patient_id}`);
	fetch(
		`https://desolate-meadow-13744.herokuapp.com/view-illness/${patient_id}`,
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data.data);
			let ill = data.data;
			illness.innerHTML = "";
			console.log(ill);
			if (ill == null) {
				if (confirm("No Information")) {
					window.location.reload();
				}
			} else {
				illness.innerHTML += `
				<span onclick="illModal(${ill.patient_id})" class="close">&times;</span>
				<div class="show-details">
					<h3>Name of disease: ${ill.name}</h3>
					<p>Description: ${ill.description}</p>
					<p>Type: ${ill.type}</p>
				</div>
			`;
			}
		});
}

function addModal(patient_id) {
	document
		.querySelector(`#add-appoint-${patient_id}`)
		.classList.toggle("active");
}

function addAppointment(patient_id) {
	const first_name = document.querySelector(
		`#a_first_name-${patient_id}`,
	).value;
	const last_name = document.querySelector(`#a_last_name-${patient_id}`).value;
	const email = document.querySelector(`#a_email-${patient_id}`).value;
	const phone_num = document.querySelector(`#a_phone_num-${patient_id}`).value;
	const type = document.querySelector(`#a_type-${patient_id}`).value;
	const booking_date = document.querySelector(
		`#a_booking_date-${patient_id}`,
	).value;
	consstart_date = document.querySelector(`#a_start_date-${patient_id}`).value;
	fetch(
		`https://desolate-meadow-13744.herokuapp.com/appointment/${patient_id}`,
		{
			method: "POST",
			body: JSON.stringify({
				first_name: first_name,
				last_name: last_name,
				email: email,
				phone_num: phone_num,
				type: type,
				booking_date: booking_date,
				start_date: start_date,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		},
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
		});
}

function addIllModal(patient_id) {
	document
		.querySelector(`#add-ill-modal-${patient_id}`)
		.classList.toggle("active");
}

function addIll(patient_id) {
	const i_name = document.querySelector(`#name-${patient_id}`).value;
	const i_type = document.querySelector(`#type-${patient_id}`).value;
	const i_desc = document.querySelector(`#description-${patient_id}`).value;
	fetch(`https://desolate-meadow-13744.herokuapp.com/illness/${patient_id}`, {
		method: "POST",
		body: JSON.stringify({
			name: i_name,
			type: i_type,
			description: i_desc,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			if (data.status_code == 404) {
				alert("Invalid!!! ");
			} else {
				window.location.reload();
			}
		});
}

function searchForProducts() {
	let searchTerm = document.querySelector("#filter").value;
	console.log(searchTerm);
	let searchedPatients = patients.filter((patient) =>
		patient.first_name.toLowerCase().includes(searchTerm.toLowerCase()),
	);
	console.log(searchedPatients);
	renderPatients(searchedPatients);
}

// Sorting the information
function sortPatients() {
	let sort_patients = document.querySelector("#patients-sort");
	let sortedPatients = patients;
	// Sorting by name ascending
	if (sort_patients.value == "sort-name-ascending") {
		sortedPatients = patients.sort((a, b) => {
			if (a.first_name > b.first_name) return 1;
			if (a.first_name < b.first_name) return -1;
			return 0;
		});

		renderPatients(sortedPatients);
	}
	// sorting by name descending
	if (sort_patients.value == "sort-name-descending") {
		sortedPatients = patients.sort((a, b) => {
			if (a.first_name > b.first_name) return 1;
			if (a.first_name < b.first_name) return -1;
			return 0;
		});
		sortedPatients.reverse();
		renderPatients(sortedPatients);
	}
	// sorting by surname ascending
	if (sort_patients.value == "sort-surname-ascending") {
		sortedPatients = patients.sort((a, b) => {
			if (a.last_name > b.last_name) return 1;
			if (a.last_name < b.last_name) return -1;
			return 0;
		});

		renderPatients(sortedPatients);
	}
	// sorting by surname descending
	if (sort_patients.value == "sort-surname-descending") {
		sortedPatients = patients.sort((a, b) => {
			if (a.last_name > b.last_name) return 1;
			if (a.last_name < b.last_name) return -1;
			return 0;
		});
		sortedPatients.reverse();
		renderPatients(sortedPatients);
	}
	// sorting by patient_id ascending
	if (sort_patients.value == "sort-patient_id-ascending") {
		sortedPatients = patients.sort((a, b) => a.patient_id - b.patient_id);
		renderPatients(sortedPatients);
	}
	// sorting by patient_id descending
	if (sort_patients.value == "sort-patient_id-descending") {
		sortedPatients = patients.sort((a, b) => a.patient_id - b.patient_id);
		sortedPatients.reverse();
		renderPatients(sortedPatients);
	}
}
