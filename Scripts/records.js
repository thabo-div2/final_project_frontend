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
                        <form onsubmit="editIllness(${record.patient_id}); event.preventDefault()" id="edit-form">
                            <div>
                                <label for="name">Name: </label>
                                <input type="text" id="name" name="name"/>
                            </div>
                            <div>
                                <label for="description">Description</label>
                                <input type="text" id="description" name="description" />
                            </div>
                            <div>
                                <label for="type">Type</label>
                                <input type="text" id="type" name="type" />
                            </div>
                            <button type="submit">Edit Info</button>
                        </form>
                    </div>
                </div>
                <button>View Patient</button>
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
