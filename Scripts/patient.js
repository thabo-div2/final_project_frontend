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
					<button onclick="editModal()">Edit Patient</button>
					<div id="edit-modal-${patient.patient_id}" class="edit-modal">
						<div class="edit-bg">
							<span onclick="editModal()" class="close">&times;</span>
							<form id="edit-form" onsubmit="editPatients">
								<div>
									<label for="email">Email</label>
									<input type="text" id="email" name="email"/>
								</div>
							</form>
						</div>
					</div>
                    <button onclick="showModal(${patient.patient_id})" class="modal-btn">Show Appointment</button>
					<div id="show-modal-${patient.patient_id}" class="show-modal">
						<div class="show-bg-${patient.patient_id} show-bg">
						</div>
					</div>
                </div>
            </div>
            `;
		});
	});

function deleteModal() {
	document.querySelector("#modal").classList.toggle("active");
}

function deletePatient() {
	const patient_id = document.querySelector("#delete-filter").value;
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

function editModal() {
	document.querySelector(".edit-modal").classList.toggle("active");
}
