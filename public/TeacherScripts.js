function openApplicationModal() {
    document.getElementById('application-modal').style.display = 'block';
}

document.querySelector('.close-btn-application').onclick = function() {
    document.getElementById('application-modal').style.display = 'none';
}

document.getElementById('application-form').onsubmit = function(event) {
    event.preventDefault(); // Предотвращаем отправку формы
    
    // Закрываем модальное окно заявки
    document.getElementById('application-modal').style.display = 'none';
    
    // Открываем модальное окно с подтверждением
    openConfirmationModal();
}

function openConfirmationModal() {
    const confirmationModal = document.createElement('div');
    confirmationModal.className = 'modal';
    confirmationModal.style.color = 'black';
    confirmationModal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn-confirmation">&times;</span>
            <h2>Подтверждение</h2>
            <p>Ваша заявка отправлена на рассмотрение. Администрация в ближайшее время свяжется с вами через письмо, которое будет отправлено на ваш email.</p>
        </div>
    `;
    
    document.body.appendChild(confirmationModal);
    confirmationModal.style.display = 'block';
    
    confirmationModal.querySelector('.close-btn-confirmation').onclick = function() {
        confirmationModal.style.display = 'none';
        document.body.removeChild(confirmationModal); // Удаляем модальное окно после закрытия
    }
}