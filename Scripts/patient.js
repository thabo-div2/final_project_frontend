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
                    <button onclick="showModal(${patient.patient_id})" class="modal-btn">Show Appointment</button>
					<div id="show-modal-${patient.patient_id}">
						<div class="show-bg">
							<span onclick="showModal(${patient.patient_id})>&times</span>
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
	document.querySelector(`#show-modal-${patient_id}`).style = "none";
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
			container.innerHTML = `
			<div class="time-details>
				<h3>${data.data.first_name}</h3>
			</div>
			`;
		});
}
