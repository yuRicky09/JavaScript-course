const openModal = document.querySelectorAll('.open-modal');
const modal = document.querySelector('.modal');
console.log(modal);

for (i = 0; i < openModal.length; i++) {
  openModal[i].addEventListener('click', function () {
    console.log('clicked');
    modal.classList.remove('hidden');
  });
}
