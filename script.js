function createGrid(n) {
	const mainContainer = document.createElement("div");
	mainContainer.classList.add("mainContainer");

	for (let i = 0; i < n; i++) {
		let flexGrid = document.createElement("div");
		flexGrid.classList.add("flexGrid");
		flexGrid.style.height = (100 / n) + "vh";
		for (let j = 0; j < n; j++) {
			let col = document.createElement("div");
			col.classList.add("col");
			col.style.maxWidth = (100 / n) + "vh";
			col.addEventListener("mouseenter", function () {
				if (col.style.backgroundColor !== "white") {
					let red = getRandomInt(0, 255);
					let green = getRandomInt(0, 255);
					let blue = getRandomInt(0, 255);
					col.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
					col.classList.add("drawn");
				} else {
					let parsedString = col.style.backgroundColor.substring(4, col.style.backgroundColor.length - 1).split(", ");
					let hsl = rgbToHsl(parsedString[0], parsedString[1], parsedString[2]);
					let lowerLightness = hsl[2] * 0.9;
					col.style.backgroundColor = `hsl(${hsl[0]} ${hsl[1]} ${lowerLightness}`;
				}
			});
			flexGrid.appendChild(col);
		}
		mainContainer.appendChild(flexGrid);
	}
	const body = document.querySelector("body");
	body.appendChild(mainContainer);
}

function buttonClicks() {
	$("#clearButton").click(function () {
		while (true) {
			let input = prompt("Enter grid size (limit of 100)");
			if ((Number(input) == input) && input <= 100) {
				$(".mainContainer").remove();
				createGrid(input);
				break;
			} else {
				alert("Please enter a valid input");
			}
		}
	});
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

createGrid(16);
buttonClicks();


function rgbToHsl(r, g, b){
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if(max == min){
		h = s = 0; // achromatic
	}else{
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch(max){
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}

	return [h, s, l];
}