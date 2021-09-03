const baseURL = "https://desolate-meadow-13744.herokuapp.com/view-patient/";
const conatiner = document.querySelector("#view-patients");
let patients = [];

fetch(baseURL)
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		patients = data.data;
		localStorage.setItem("patients", patients);
		conatiner.innerHTML = "";
		patients.forEach((patient) => {
			conatiner.innerHTML += `
            <div class="patient ${patient.patient_id}">
                <h3>${patient.first_name} ${patient.last_name}</h3>
                <div class="details">
                    <p>Address: ${patient.address}</p>
                    <p>Email: ${patient.email}</p>
                    <p>Gender: ${patient.gender}</p>
                    <p>Identification Number: ${patient.id_num}</p>
                    <p>Cell Number: +27 ${patient.phone_num}</p>
					<button onclick="deletePatient(${patient.patient_id})">Delete Patient</button>
					<button onclick="editModal(${patient.patient_id})">Edit Patient</button>
					<div id="edit-modal-${patient.patient_id}" class="edit-modal">
						<div class="edit-bg">
							<span onclick="editModal()" class="close">&times;</span>
							<form id="edit-form" onsubmit="editPatients(${patient.patient_id}); event.preventDefault()">
								<div>
									<label for="email">Email</label>
									<input type="text" id="email-${patient.patient_id}" name="email" placeholder="Email" required />
								</div>
								<div>
									<label for="address">Address</label>
									<input type="text" id="address-${patient.patient_id}" name="address" placeholder="Address" required />
								</div>
								<div>
									<label for="phone_num">Phone Number:</label>
									<input type="text" id="phone_num-${patient.patient_id}" name="phone_num" placeholder="Phone Number" required />
								</div>
								<button type="submit">Edit Info</button>
							</form>
						</div>
					</div>
                    <button onclick="showModal(${patient.patient_id})" class="modal-btn">Show Appointment</button>
					<div id="show-modal-${patient.patient_id}" class="show-modal">
						<div class="show-bg-${patient.patient_id} show-bg">
						</div>
					</div>
					<button onclick="illModal(${patient.patient_id})" class="ill-btn">Show Illness</button>
					<div id="show-illness-${patient.patient_id}" class="show-ill">
						<div class="show-ill-bg-${patient.patient_id} show-ill-bg"></div>
					</div>
					<button onclick="addModal(${patient.patient_id})">Add Appointment</button>
					<div id="add-appoint-${patient.patient_id}" class="add-appoint">
						<div class="add-appoint-bg-${patient.patient_id} add-appoint-bg">
							<span onclick="addModal(${patient.patient_id})" class="close">&times;</span>
							<form id="add-form" onsubmit="addAppointment(${patient.patient_id}); event.preventDefault()">
								<div>
									<label for="first_name">First Name:</label>
									<input type="text" id="first_name-${patient.patient_id}" name="first_name" placeholder="First Name" required />
								</div>
								<div>
									<label for="last_name">Last Name:</label>
									<input type="text" id="last_name-${patient.patient_id}" name="last_name" placeholder="Last Name" required />
								</div>
								<div>
									<label for="email">Email:</label>
									<input type="text" id="email-${patient.patient_id}" name="email" placeholder="Email" required />
								</div>
								<div>
									<label for="phone_num">Phone Number:</label>
									<input type="number" id="phone_num-${patient.patient_id}" name="phone_num" placeholder="Phone Number" required />
								</div>
								<div>
									<label for="type">Type:</label>
									<input type="text" id="type-${patient.patient_id}" name="type" placeholder="Type" required />
								</div>
								<div>
									<label for="booking_date">Bookingn Date:</label>
									<input type="date" id="booking_date-${patient.patient_id}" name="booking_date" placeholder="Booking Date" required />
								</div>
								<div>
									<label for="start_date">Start Date:</label>
									<input type="date" id="start_date-${patient.patient_id} name="start_date" placeholder="Start Date" required />
								<button type="submit">Add Appointment</button>
							</form>
						</div>
					</div>
                </div>
            </div>
            `;
		});
	});

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
	const container = document.querySelector(".show-bg");
	fetch(
		`https://desolate-meadow-13744.herokuapp.com/view-appointment/${patient_id}`,
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			let times = data.data;
			container.innerHTML = "";
			console.log(times);
			container.innerHTML += `
			<span onclick="showModal(${times.patient_id})" class="close">&times;</span>
			<div class="show-details">
				<h3>Full name: ${times.first_name} ${times.last_name}</h3>
				<p>Email: ${times.email}</p>
				<p>Phone number: +27 ${times.phone_num}</p>
				<p>Appointment date: ${times.booking_date}</p>
			 </div>
				`;
		});
}

function editModal(patient_id) {
	document
		.querySelector(`#edit-modal-${patient_id}`)
		.classList.toggle("active");
}

function editPatients(patient_id) {
	email = document.querySelector(`#email-${patient_id}`).value;
	address = document.querySelector(`#address-${patient_id}`).value;
	phone_num = document.querySelector(`#phone_num-${patient_id}`).value;
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
	const illness = document.querySelector(".show-ill-bg");
	fetch(
		`https://desolate-meadow-13744.herokuapp.com/view-illness/${patient_id}`,
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data.data);
			let ill = data.data;
			illness.innerHTML = "";
			console.log(ill);
			illness.innerHTML += `
			<span onclick="illModal(${ill.patient_id})" class="close">&times;</span>
			<div class="show-details">
				<h3>Name of disease: ${ill.name}</h3>
				<p>Description: ${ill.description}</p>
				<p>Type: ${ill.type}</p>
			</div>
			`;
		});
}

function addModal(patient_id) {
	document
		.querySelector(`#add-appoint-${patient_id}`)
		.classList.toggle("active");
}

function addAppointment(patient_id) {
	const first_name = document.querySelector(`#first_name-${patient_id}`).value;
	const last_name = document.querySelector(`#last_name-${patient_id}`).value;
	const email = document.querySelector(`#email-${patient_id}`).value;
	const phone_num = document.querySelector(`#phone_num-${patient_id}`).value;
	const type = document.querySelector(`#type-${patient_id}`).value;
	const booking_date = document.querySelector(
		`#booking_date-${patient_id}`,
	).value;
	const start_date = document.querySelector(`#start_date-${patient_id}`).value;
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
