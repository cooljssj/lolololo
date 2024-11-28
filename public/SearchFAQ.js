function searchFAQ() {
    const input = document.getElementById('search-input');
    const filter = input.value.toLowerCase();
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const summary = item.querySelector('summary').textContent.toLowerCase();
        if (summary.includes(filter)) {
            item.style.display = ""; 
        } else {
            item.style.display = "none"; 
        }
    });
}