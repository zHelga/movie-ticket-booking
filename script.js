"use strict"

let rowLetter = 'ABCDEFGH';
let seats = document.querySelector('.seats');

let time = document.querySelector('.time');
let select = document.querySelector('select');
let priceCount = document.querySelector('.info-total__text span');
let totalTickets = document.querySelector('.info-count__text');
const notSolidItems = document.querySelectorAll(".seats__item:not(.sold)");
let orderBtn = document.querySelector('.info-link');
let price = +select.value;


// add ul + li to seats box

for(let i = 0; i < rowLetter.length; i++) {
	let ul = document.createElement('ul');
		ul.className = 'seat__row';
	for(let j = 1; j <= 20; j++) {
		let li = document.createElement('li');
		li.innerHTML = `${rowLetter[i]}${j}`;
		li.className = 'seats__item';
		ul.append(li);
	}
	seats.append(ul)
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

let selectedItems
function ubdateCount() {
	selectedItems = document.querySelectorAll('.seats__item.selected');
	
	const seatsIndex = [...selectedItems].map((seat) => [...notSolidItems].indexOf(seat));

	localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

	
	let countSelectedItems = selectedItems.length;

	let countSelectedTexts = [...selectedItems].map((seat) => seat.innerText);
	
	// totalTickets.innerHTML = countSelectedItems;
	priceCount.innerHTML = `${price * countSelectedItems}`;

	let spans = countSelectedTexts.map((item) => `<span>${item}</span>`).join('');
		totalTickets.innerHTML = spans;
	if(countSelectedTexts.length == 0) {
		totalTickets.innerHTML = `<span>${0}</span>`;
	}
	setMovieData(select.selectedIndex, select.value);
}
// ===================================================
// =================================================
time.addEventListener('click', (e) => {
	
	if(e.target.classList.contains('time__current')) {
		time.classList.toggle('time-active');
		e.target.querySelector('.bi-chevron-down').classList.toggle('bi-chevron-up')
	}
})

// =================================================

select.addEventListener('change', (e) => {
	price = e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);
  ubdateCount();
})


seats.addEventListener('click', (e) => {
	if (
		e.target.classList.contains("seats__item") &&
		!e.target.classList.contains("solid")
	) {
		e.target.classList.toggle("selected");
		ubdateCount()
	}

})

orderBtn.addEventListener('click', (e) => {
	e.preventDefault()
	selectedItems.forEach(item => {
		item.classList.remove('selected');
		item.classList.add('solid')
	})
})