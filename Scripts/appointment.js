const baseURL = "https://desolate-meadow-13744.herokuapp.com/view-appointment/";
const container = document.querySelector("#timetable");

fetch(baseURL)
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		let times = data.data;
		container.innerHTML = "";
		times.forEach((time) => {
			container.innerHTML += `
            
            `;
		});
	});
