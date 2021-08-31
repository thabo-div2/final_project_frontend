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
            </div>
            `;
		});
	});
