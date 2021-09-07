const baseURL = "https://desolate-meadow-13744.herokuapp.com/view-appointment/";
let times = [];
let d = new Date();

fetch(baseURL)
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		times = data.data;
		localStorage.setItem("appointment", JSON.stringify(times));
		renderAppointment(times);
	});

function renderAppointment(times) {
	let container = document.querySelector("#timetable");
	container.innerHTML = "";
	times.forEach((time) => {
		container.innerHTML += `
				<div class="appointment">
					<h3>Date: ${time.booking_date}</h3>
					<p>Name: ${time.first_name} ${time.last_name}</p>
					<p>Patient ID: ${time.patient_id}</p>
					<p>Email: ${time.email}</p>
					<p>Phone: +27 ${time.phone_num}</p>
					<p>Type of Appointment: ${time.type}</p>
					<div class="time-btn">
						<button onclick="deleteAppointment(${time.patient_id})">Delete Appointment</button>
						<button onclick="editModal(${time.patient_id})">Edit Appointment</button>
						<div id="edit-appoint-${time.patient_id}" class="edit-appoint">
							<div class="edit-bg-${time.patient_id} edit-bg">
								<span onclick="editModal(${time.patient_id})" class="close">&times;</span>
								<form id="appoint-form-${time.patient_id}" onsubmit="editAppointment(${time.patient_id}); event.preventDefault()">
									<div>
										<label for="email">Email:</label>
										<input type="text" id="email-${time.patient_id}" name="email" placeholder="Email" required /> 
									</div>
									<div>
										<label for="phone_num">Phone Number:</label>
										<input type="number" id="phone_num-${time.patient_id}" name="phone_num" placeholder="Phone Number" required /> 
									</div>
									<div>
										<label for="type">Type of Appointment:</label>
										<input type="text" id="type-${time.patient_id}" name="type" placeholder="Type of Appointment" required /> 
									</div>
									<div>
										<label for="booking_date">Email:</label>
										<input type="date" id="booking_date-${time.patient_id}" name="booking_date" placeholder="Booking Date" required /> 
									</div>
									<button type="submit">Edit Info</button>
								</form>
							</div>
						</div
					</div>
				</div>
				`;
	});
}

function appointmentModal() {
	document.querySelector("#time-modal").classList.toggle("active");
}

function createAppointment() {
	fname = document.querySelector("#first_name").value;
	lname = document.querySelector("#last_name").value;
	email = document.querySelector("#email").value;
	phone_num = document.querySelector("#phone_num").value;
	type = document.querySelector("#type").value;
	booking_date = document.querySelector("#booking_date").value;
	patient_id = times.patient_id;
	fetch(
		`https://desolate-meadow-13744.herokuapp.com/appointment/${patient_id}`,
		{
			method: "POST",
			body: JSON.stringify({
				first_name: fname,
				last_name: lname,
				email: email,
				phone_num: phone_num,
				type: type,
				booking_date: booking_date,
				starting_date: d.now(),
				patient_id: patient_id,
			}),
		},
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
		});
}

function deleteAppointment(patient_id) {
	fetch(
		`https://desolate-meadow-13744.herokuapp.com/delete-appointment/${patient_id}`,
		{
			method: "DELETE",
		},
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
		});
}

function editModal(patient_id) {
	document
		.querySelector(`#edit-appoint-${patient_id}`)
		.classList.toggle("active");
}

function editAppointment(patient_id) {
	const email = document.querySelector(`#email-${patient_id}`).value;
	const phone_num = document.querySelector(`#phone_num-${patient_id}`).value;
	const type = document.querySelector(`#type-${patient_id}`).value;
	const booking_date = document.querySelector(
		`#booking_date-${patient_id}`,
	).value;
	fetch(
		`https://desolate-meadow-13744.herokuapp.com/edit-appointment/${patient_id}`,
		{
			method: "PUT",
			body: JSON.stringify({
				email: email,
				phone_num: phone_num,
				type: type,
				booking_date: booking_date,
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

function searchAppointment() {
	let searchTerm = document.querySelector("#filter").value;
	console.log(searchTerm);
	let searchedAppointments = times.filter((time) =>
		time.first_name.toLowerCase().includes(searchTerm.toLowerCase()),
	);
	console.log(searchedAppointments);
	renderAppointment(searchedAppointments);
}

function sortAppointments() {
	let sort_appointments = document.querySelector("#sort-appointments");
	console.log(sort_appointments.value);
	let sortedAppointment = times;
	if (sort_appointments.value == "sort-appointments-name-ascending") {
		sortedAppointment = times.sort((a, b) => {
			if (a.first_name > b.first_name) return 1;
			if (a.first_name < b.first_name) return -1;
			return 0;
		});

		renderAppointment(sortedAppointment);
	}

	if (sort_appointments.value == "sort-appointments-name-descending") {
		sortedAppointment = times.sort((a, b) => {
			if (a.first_name > b.first_name) return 1;
			if (a.first_name < b.first_name) return -1;
			return 0;
		});
		sortedAppointment.reverse();
		renderAppointment(sortedAppointment);
	}

	if (sort_appointments.value == "sort-appointments-surname-ascending") {
		sortedAppointment = times.sort((a, b) => {
			if (a.last_name > b.last_name) return 1;
			if (a.last_name < b.last_name) return -1;
			return 0;
		});

		renderAppointment(sortedAppointment);
	}

	if (sort_appointments.value == "sort-appointments-surname-descending") {
		sortedAppointment = times.sort((a, b) => {
			if (a.last_name > b.last_name) return 1;
			if (a.last_name < b.last_name) return -1;
			return 0;
		});
		sortedAppointment.reverse();
		renderAppointment(sortedAppointment);
	}

	if (sort_appointments.value == "sort-appointments-patient_id-ascending") {
		sortedAppointment = times.sort((a, b) => a.patient_id - b.patient_id);
		renderAppointment(sortedAppointment);
	}

	if (sort_appointments.value == "sort-appointments-patient_id-descending") {
		sortedAppointment = times.sort((a, b) => a.patient_id - b.patient_id);
		sortedAppointment.reverse();
		renderAppointment(sortedAppointment);
	}
}
