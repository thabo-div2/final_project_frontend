const baseURL = "https://desolate-meadow-13744.herokuapp.com/view-illness/";
let container = document.querySelector("#records");
fetch(baseURL)
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		container.innerHTML = "";
		let records = data.data;
		records.forEach((record) => {
			container.innerHTML += `
            <div class="records-details">
                <h3>Patient ID: ${record.patient_id}</h3>
                <p>Name: ${record.name}</p>
                <p>Type: ${record.type}</p>
                <p>Description: ${record.description}</p>
                <button onclick="deleteRecord(${record.patient_id})">Delete Record</button>
                <button onclick="editModal(${record.patient_id})">Edit Record</button>
                <div id="edit-modal-${record.patient_id}" class="edit-modal">
                    <div class="edit-bg-${record.patient_id} edit-bg">
                        <span onclick="editModal(${record.patient_id})" class="close">&times</span>
                        <div class="edit-form-fix">
							<form onsubmit="editIllness(${record.patient_id}); event.preventDefault()" id="edit-form">
                            <div>
                                <input type="text" id="name" name="name" placeholder="Name"/>
                            </div>
                            <div>
                                <input type="text" id="description" name="description" placeholder="Description"/>
                            </div>
                            <div>
                                <input type="text" id="type" name="type" placeholder="Type"/>
                            </div>
                            <button type="submit">Edit Info</button>
                        	</form>
						</div>
                    </div>
                </div>
                <button onclick="viewModal(${record.patient_id})">View Patient</button>
				<div id="view-modal-${record.patient_id}" class="view-modal">
					<div class="view-bg-${record.patient_id} view-bg"></div>
				</div>
            </div>
            `;
		});
	});

function deleteRecord(patient_id) {
	fetch(
		`https://desolate-meadow-13744.herokuapp.com/delete-illness/${patient_id}`,
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
		.querySelector(`#edit-modal-${patient_id}`)
		.classList.toggle("active");
}

function editIllness(patient_id) {
	const i_name = document.querySelector("#name").value;
	const description = document.querySelector("#description").value;
	const i_type = document.querySelector("#type").value;
	fetch(
		`https://desolate-meadow-13744.herokuapp.com/edit-illness/${patient_id}`,
		{
			method: "PUT",
			body: JSON.stringify({
				name: i_name,
				description: description,
				type: i_type,
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
			} else {
				alert("Error!!!");
			}
		});
}

function viewModal(patient_id) {
	document
		.querySelector(`#view-modal-${patient_id}`)
		.classList.toggle("active");
	viewPatient(patient_id);
}

function viewPatient(patient_id) {
	let p_container = document.querySelector(".view-bg");
	fetch(
		`https://desolate-meadow-13744.herokuapp.com/view-patient/${patient_id}`,
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			let patient = data.data;
			p_container.innerHTML = "";
			p_container.innerHTML += `
			<span onclick="viewModal(${patient.patient_id})" class="close">&times</span>
			<div class="patient-detail">
				<h3>Full Name: ${patient.first_name} ${patient.last_name}</h3>
				<p>Gender: ${patient.gender}</p>
				<p>Address: ${patient.address}</p>
				<p>Email: ${patient.email}</p>
				<p>ID Number: ${patient.id_num}</p>
				<p>Phone Number: ${patient.phone_num}</p>
			</div>
			`;
		});
}
