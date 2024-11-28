document.addEventListener('DOMContentLoaded', async () => {
    const fileUploadForm = document.getElementById('file-upload-form');
    const fileNameInput = document.getElementById('file-name');
    const fileInput = document.getElementById('file-upload');
    const fileList = document.querySelector('.file-list');

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileNameInput.value = fileInput.files[0].name;
        }
    });

    fileUploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fileName = fileNameInput.value;
        const file = fileInput.files[0];

        if (!file || !fileName) {
            alert('Пожалуйста, укажите название файла и выберите файл для загрузки.');
            return;
        }

        const formData = new FormData();
        formData.append('file-name', fileName);
        formData.append('file', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Ошибка загрузки файла');
            }

            const result = await response.text();
            alert(result); // Успешное сообщение

            addFileToList(fileName, file);
            fileUploadForm.reset();
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка при загрузке файла');
        }
    });

    function addFileToList(fileName, file = null) {
        const fileItem = document.createElement('a');
        fileItem.classList.add('file-item');
        
        if (file) {
            fileItem.href = URL.createObjectURL(file);
        } else {
            fileItem.href = `/files/${fileName}`; 
        }

        fileItem.target = "_blank";
        fileItem.textContent = `📄 ${fileName}`;
        fileList.appendChild(fileItem);
    }

    try {
        const response = await fetch('/api/files');
        if (!response.ok) {
            throw new Error('Ошибка получения данных');
        }

        const files = await response.json();
        files.forEach(file => {
            addFileToList(file.bookname); 
        });
    } catch (error) {
        console.error('Ошибка при загрузке файлов:', error);
    }

    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        const fileItems = document.querySelectorAll('.file-item');
        
        fileItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? 'block' : 'none';
        });
    });
document.getElementById('dark-mode-toggle').addEventListener('change', (event) => {
            document.body.classList.toggle('dark-mode', event.target.checked);
        });

        document.getElementById('file-upload-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);

            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.text();
                alert(result);
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Ошибка при загрузке файла');
            }
        });
});