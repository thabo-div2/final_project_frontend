const baseURL = "https://desolate-meadow-13744.herokuapp.com/view-illness/";
let records = [];
fetch(baseURL)
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		records = data.data;
		renderRecords(records);
	});

function renderRecords(records) {
	let container = document.querySelector(".records-container");
	container.innerHTML = "";
	records.forEach((record) => {
		container.innerHTML += `
            <div class="records-details">
                <h3>Patient ID: ${record.patient_id}</h3>
                <p>Name: ${record.name}</p>
                <p>Type: ${record.type}</p>
                <p>Description: ${record.description}</p>
                <div class="record-btn">
					<button onclick="deleteRecord(${record.patient_id})">Delete Record</button>
					<button onclick="editModal(${record.patient_id})">Edit Record</button>
					<div id="edit-modal-${record.patient_id}" class="edit-modal">
						<div class="edit-bg-${record.patient_id} edit-bg">
							<span onclick="editModal(${record.patient_id})" class="close">&times</span>
							<div class="edit-form-fix">
								<form onsubmit="editIllness(${record.patient_id}); event.preventDefault()" id="edit-form-${record.patient_id}">
								<div>
									<input type="text" id="name-${record.patient_id}" name="name" placeholder="Name"/>
								</div>
								<div>
									<input type="text" id="description-${record.patient_id}" name="description" placeholder="Description"/>
								</div>
								<div>
									<input type="text" id="type-${record.patient_id}" name="type" placeholder="Type"/>
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
            </div>
            `;
	});
}

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
	const i_name = document.querySelector(`#name-${record.patient_id}`).value;
	const description = document.querySelector(
		`#description-${record.patient_id}`,
	).value;
	const i_type = document.querySelector(`#type-${record.patient_id}`).value;
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
	let p_container = document.querySelector(`.view-bg-${patient_id}`);
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

function searchIllness() {
	let searchTerm = document.querySelector("#filter").value;
	console.log(searchTerm);
	let searchedRecords = records.filter((record) =>
		record.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);
	console.log(searchedRecords);
	renderRecords(searchedRecords);
}

function sortNameAsc() {
	let sortedIllness = records.sort((a, b) => {
		a.name.toLowerCase();
		b.name.toLowerCase();
		if (a.name > b.name) return 1;
		if (a.name < b.name) return -1;
		return 0;
	});

	renderRecords(sortedIllness);
}

function sortNameDesc() {
	let sortedIllness = records.sort((a, b) => {
		a.name.toLowerCase();
		b.name.toLowerCase();
		if (a.name > b.name) return 1;
		if (a.name < b.name) return -1;
		return 0;
	});
	sortedIllness.reverse();
	renderRecords(sortedIllness);
}

function sortPatientIDAsc() {
	let sortedIllness = records.sort((a, b) => a.patient_id - b.patient_id);
	renderRecords(sortedIllness);
}

function sortPatientIDDesc() {
	let sortedIllness = records.sort((a, b) => a.patient_id - b.patient_id);
	sortedIllness.reverse();
	renderRecords(sortedIllness);
}

function sortRecords() {
	let sort_records = document.querySelector("#sort-records");
	let sortRecords = records;
	if (sort_records.value == "sort-records-name-asc") {
		sortRecords = records.sort((a, b) => {
			a.name.toLowerCase();
			b.name.toLowerCase();
			if (a.name > b.name) return 1;
			if (a.name < b.name) return -1;
			return 0;
		});

		renderRecords(sortRecords);
	}

	if (sort_records.value == "sort-records-name-desc") {
		sortRecords = records.sort((a, b) => {
			a.name.toLowerCase();
			b.name.toLowerCase();
			if (a.name > b.name) return 1;
			if (a.name < b.name) return -1;
			return 0;
		});
		sortRecords.reverse();
		renderRecords(sortRecords);
	}

	if (sort_records.value == "sort-records-patient_id-asc") {
		sortRecords = records.sort((a, b) => a.patient_id - b.patient_id);
		renderRecords(sortRecords);
	}

	if (sort_records.value == "sort-records-patient_id-desc") {
		sortRecords = records.sort((a, b) => a.patient_id - b.patient_id);
		sortRecords.reverse();
		renderRecords(sortRecords);
	}
}
