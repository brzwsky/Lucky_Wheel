const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('wheelspin_btn');
const popupText = document.getElementById('bonus-msg');
const congPopup = document.getElementById('popup');
const takeBonusButton = document.getElementById('takeBonus');

let spinning = false; // btn stop clicker

const fullSpins = 5; // Full spin rotation
const spinDuration = 5; // Duration of spin the wheel in sec
const stopAngles = [75, 185, 300]; // Random degree stops
const bonusMessages = {
	75: 'Bonus Pack 300% up to €3000 + 300 FS on first 4 deposits',
	185: 'Bonus Pack 400 FS on first 4 deposit',
	300: 'Bonus Pack 330% up to €4000 on first 4 deposits',
};

function getRandomAngle() {
	return stopAngles[Math.floor(Math.random() * stopAngles.length)];
}

function popupActivator() {
	congPopup.classList.add('active');
}

function showPopUp(message) {
	popupText.textContent = message;
}

function closePopup() {
	popup.classList.remove('active');
}

takeBonusButton.addEventListener('click', closePopup);

spinBtn.addEventListener('click', () => {
	if (spinning) return; // blocking second rotation when rotated

	spinning = true;

	const whereToStop = getRandomAngle();
	const totalRotation = fullSpins * 360 + (360 - whereToStop);

	// Prevent position
	wheel.style.transition = 'none';
	wheel.style.transform = 'rotate(0deg)';

	// Timeout animation
	setTimeout(() => {
		wheel.style.transition = `transform ${spinDuration}s cubic-bezier(0.25, 1, 0.5, 1)`;
		wheel.style.transform = `rotate(${totalRotation}deg)`;
	}, 50);

	setTimeout(() => {
		spinning = false;
		popupActivator();
		showPopUp(bonusMessages[whereToStop]);
	}, spinDuration * 1000);
});
