document.getElementById('upload-button').addEventListener('click', async (event) => {
    event.preventDefault();
    console.log('Кнопка "Загрузить" нажата');

    const videoname = document.getElementById('videoname').value;
    const description = document.getElementById('description').value;
    const url = document.getElementById('url').value;

    if (!videoname || !url) {
        alert('Пожалуйста, заполните обязательные поля: Название курса и URL.');
        return;
    }

    const data = { videoname, url, description };

    try {
        const response = await fetch('/api/upload-video', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Видео успешно загружено!');
        } else {
            const errorData = await response.json();
            alert(`Ошибка: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Ошибка при отправке видео:', error);
        alert('Произошла ошибка при загрузке видео.');
    }
});