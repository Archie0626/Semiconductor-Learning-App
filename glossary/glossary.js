document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('glossary-search');
  const glossaryItems = document.querySelectorAll('#glossary-list li');
  const letterButtons = document.querySelectorAll('.letter-filter');

  // Search Filter
  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();

    glossaryItems.forEach(item => {
      const term = item.dataset.term.toLowerCase();
      if (term.includes(query)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });

  // Letter Filter
  letterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const selectedLetter = this.textContent.trim();

      glossaryItems.forEach(item => {
        const term = item.dataset.term.toUpperCase();

        if (selectedLetter === 'All' || term.startsWith(selectedLetter)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});
