document.querySelector('.search-btn').addEventListener('click', function() {
    const query = document.getElementById('site-search').value.toLowerCase();
    const courses = document.querySelectorAll('.course');
    let found = false;

    courses.forEach(course => {
        const title = course.querySelector('h2').textContent.toLowerCase();
        const description = course.querySelector('p').textContent.toLowerCase();

        if (title.includes(query) || description.includes(query)) {
            course.style.display = 'block'; 
            found = true;
        } else {
            course.style.display = 'none'; 
        }
    });

    if (!found) {
        alert('Курсы не найдены.');
        courses.forEach(course => {
            course.style.display = 'block'; 
        });
    }
});