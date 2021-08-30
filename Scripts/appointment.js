const baseURL = "https://desolate-meadow-13744.herokuapp.com/view-appointment/";
const container = document.querySelector("#timetable");
let times = [];
let d = new Date();

fetch(baseURL)
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		times = data.data;
		localStorage.setItem("appointment", JSON.stringify(times));
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
					<button onclick="deleteAppointment(
						${time.patient_id}
					)">Delete Appointment</button>
					<button>Edit Appointment</button>
				</div>
			</div>
			`;
		});
	});

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
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
		});
}
