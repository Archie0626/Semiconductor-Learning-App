
  document.addEventListener("DOMContentLoaded", () => {
    // Get Started button functionality
    const getStartedBtn = document.getElementById("get-started-btn");
    if (getStartedBtn) {
      getStartedBtn.addEventListener("click", function () {
        window.location.href = "login.html";  // Change to your desired page
      });
    } else {
      console.error("Get Started button not found");
    }

    // Glossary tab switch logic
    const glossaryLink = document.getElementById("glossary-link");
    const homeSection = document.getElementById("home-section");
    const glossarySection = document.getElementById("glossary");

    if (glossaryLink && homeSection && glossarySection) {
      glossaryLink.addEventListener("click", (e) => {
        e.preventDefault();
        homeSection.style.display = "none";
        glossarySection.style.display = "block";
      });
    }
 document.getElementById("glossary-btn").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("glossary").scrollIntoView({ behavior: "smooth" });
  });
    const searchInput = document.getElementById("glossary-search");
    const glossaryItems = document.querySelectorAll("#glossary-list li");
    const letterButtons = document.querySelectorAll(".letter-filter");

    glossaryItems.forEach((item) => {
      const title = item.querySelector(".term-title");
      const definition = item.querySelector(".term-definition");

      title.addEventListener("click", () => {
        definition.style.display = definition.style.display === "block" ? "none" : "block";
      });
    });

    searchInput?.addEventListener("input", function () {
      const query = this.value.toLowerCase();

      glossaryItems.forEach((item) => {
        const titleEl = item.querySelector(".term-title");
        const text = titleEl.textContent.toLowerCase();
        titleEl.innerHTML = titleEl.textContent;

        if (text.includes(query)) {
          item.style.display = "block";
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

    letterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const letter = button.textContent.toLowerCase();

        glossaryItems.forEach((item) => {
          const term = item.dataset.term.toLowerCase();
          item.style.display = (letter === "all" || term.startsWith(letter)) ? "block" : "none";
        });

        if (searchInput) searchInput.value = "";
      });
    });
  });

