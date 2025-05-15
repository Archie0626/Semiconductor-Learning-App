document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("glossary-search");
    const glossaryItems = document.querySelectorAll("#glossary-list li");
    const letterButtons = document.querySelectorAll(".letter-filter");
  
    // Toggle definition display
    glossaryItems.forEach(item => {
      const title = item.querySelector(".term-title");
      title.addEventListener("click", () => {
        const def = item.querySelector(".term-definition");
        def.style.display = def.style.display === "block" ? "none" : "block";
      });
    });
  
    // Search filter with highlighting
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
  
      glossaryItems.forEach(item => {
        const titleEl = item.querySelector(".term-title");
        const text = titleEl.textContent.toLowerCase();
  
        // Reset highlights
        titleEl.innerHTML = titleEl.textContent;
  
        if (text.includes(query)) {
          item.style.display = "block";
  
          // Highlight match
          const index = text.indexOf(query);
          if (index >= 0 && query.length > 0) {
            const original = titleEl.textContent;
            titleEl.innerHTML = `${original.substring(0, index)}<span class="highlight">${original.substring(index, index + query.length)}</span>${original.substring(index + query.length)}`;
          }
  
        } else {
          item.style.display = "none";
        }
      });
    });
  
    // Alphabet filtering
    letterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const letter = button.textContent.toLowerCase();
  
        glossaryItems.forEach(item => {
          const term = item.dataset.term.toLowerCase();
          if (letter === "all" || term.startsWith(letter)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
  
        // Clear search input
        searchInput.value = "";
      });
    });
  });
  