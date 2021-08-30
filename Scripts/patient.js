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
            <div class="patient">
                <h3>${patient.first_name} ${patient.last_name}</h3>
                <div class="details">
                    <p>Address: ${patient.address}</p>
                    <p>Email: ${patient.email}</p>
                    <p>Gender: ${patient.gender}</p>
                    <p>Identification Number: ${patient.id_num}</p>
                    <p>Cell Number: +27 ${patient.phone_num}</p>
                    <button onclick="showAppointment()" class="modal-btn">Show Appointment</button>
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
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
		});
}
