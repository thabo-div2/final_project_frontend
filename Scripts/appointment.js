const baseURL = "https://desolate-meadow-13744.herokuapp.com/view-appointment/";
const container = document.querySelector("#timetable");
let d = new Date();

fetch(baseURL)
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		let times = data.data;
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
			</div>
			`;
		});
	});
