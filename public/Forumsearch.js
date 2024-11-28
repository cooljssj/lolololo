document.getElementById('search-btn').addEventListener('click', function() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const threads = document.querySelectorAll('.thread');
    let found = false;

    threads.forEach(thread => {
        const title = thread.querySelector('h2').textContent.toLowerCase();
        const content = thread.querySelector('p').textContent.toLowerCase();

        if (title.includes(query) || content.includes(query)) {
            thread.style.display = 'block'; 
            found = true;
        } else {
            thread.style.display = 'none'; 
        }
    });

    if (!found) {
        alert('Курсы не найдены.');
        threads.forEach(thread => {
            thread.style.display = 'block'; 
        });
    }
});
