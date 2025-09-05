const postsData = [
  {
    id: 1,
    title: "Exploring React Basics",
    image: "react.jpg",
    description: "A quick dive into React fundamentals.",
    date: "2025-08-01",
    category: "Tech",
    author: "Ahmed",
    content: "React is a powerful library for building user interfaces. In this post, we explore its core concepts and how to get started."
  },
  {
    id: 2,
    title: "My Trip to Berlin",
    image: "berlin.jpg",
    description: "Travel diary from Berlin’s streets and landmarks.",
    date: "2025-07-15",
    category: "Travel",
    author: "Maya",
    content: "Berlin is a vibrant city with history, culture, and art. I share my favorite spots, from the Brandenburg Gate to cozy cafés."
  },
  {
    id: 3,
    title: "Best Homemade Pizza",
    image: "pizza.jpg",
    description: "Recipe for delicious homemade pizza.",
    date: "2025-06-20",
    category: "Food",
    author: "yasmin",
    content: "Making pizza at home is fun and easy. This post shares my favorite recipe, tips for dough, and topping ideas."
  },
  {
    id: 4,
    title: "A Weekend in Alexandria",
    image: "alex.jpg",
    description: "Seaside escape and cultural gems in Alexandria.",
    date: "2025-08-20",
    category: "Travel",
    author: "Maymoya",
    content: "Alexandria is full of history and sea breeze. I visited the Library of Alexandria, Citadel of Qaitbay, and enjoyed seafood by the Corniche."
  },
  {
    id: 5,
    title: "My Favorite Egyptian Street Food",
    image: "koshary.jpg",
    description: "Celebrating Egypt’s tastiest street dishes.",
    date: "2025-07-30",
    category: "Food",
    author: "mohamed",
    content: "From koshari to taameya, Egyptian street food is both affordable and delicious. Here are my favorite spots in Cairo to grab a quick bite."
  },
  {
    id: 6,
    title: "Learning JavaScript the Fun Way",
    image: "js.jpg",
    description: "Tips for beginners starting with JavaScript.",
    date: "2025-08-25",
    category: "Tech",
    author: "Hania",
    content: "JavaScript can feel overwhelming, but practice makes perfect. I share my favorite free resources, tutorials, and small projects to practice."
  },
  {
    id: 7,
    title: "A Day in Khan El Khalili",
    image: "Khankhalili.jpg",
    description: "Exploring Cairo’s iconic bazaar.",
    date: "2025-09-01",
    category: "Lifestyle",
    author: "salma",
    content: "Khan El Khalili is full of energy, colors, and culture. I bought handmade jewelry, drank mint tea, and captured the lively atmosphere."
  },
  {
    id: 8,
    title: "Simple Skincare Routine for Busy Days",
    image: "skincare.jpg",
    description: "How I keep my skin fresh with minimal effort.",
    date: "2025-08-10",
    category: "Lifestyle",
    author: "mariam",
    content: "Between work, coding, and daily life, I keep skincare simple: cleansing, moisturizing, and SPF. Here’s my go-to routine."
  },
  {
    id: 9,
    title: "The Magic of Aswan & Nubian Culture",
    image: "aswan.avif",
    description: "Travel diary from Egypt’s south.",
    date: "2025-09-03",
    category: "Travel",
    author: "ziad",
    content: "Aswan feels magical with its Nile views and Nubian villages. I took a felucca ride, explored Philae Temple, and enjoyed Nubian food."
  },
  {
    id: 10,
    title: "Studying Abroad: My Tips & Reflections",
    image: "study.jpg",
    description: "Advice for students dreaming of studying abroad.",
    date: "2025-08-05",
    category: "Education",
    author: "hossam",
    content: "Studying abroad taught me independence and cultural exchange. Here are my tips on scholarships, applications, and adjusting to new life."
  }
];

const POSTS_PER_PAGE = 6;
let currentPage = 1;
let currentCategory = "All";
let currentSearch = "";
let currentSort = "date";
let darkMode = false;

const postsSection = document.getElementById("posts-section");
const paginationSection = document.getElementById("pagination-section");
const searchInput = document.getElementById("search-input");
const categorySelect = document.getElementById("category-select");
const sortSelect = document.getElementById("sort-select");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const darkModeToggle = document.getElementById("dark-mode-toggle");

function filterPosts() {
  let filtered = postsData.filter(post => {
    const matchesCategory = currentCategory === "All" || post.category === currentCategory;
    const searchTerm = currentSearch.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                         post.description.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  if (currentSort === "date") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (currentSort === "title") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }
  return filtered;
}

function renderPosts() {
  const filtered = filterPosts();
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paginated = filtered.slice(start, start + POSTS_PER_PAGE);

  postsSection.innerHTML = "";
  if (paginated.length === 0) {
    postsSection.innerHTML = `<div class="no-posts">No posts found matching your criteria.</div>`;
    paginationSection.innerHTML = "";
    return;
  }

  // Add results count
  const resultsInfo = document.createElement("div");
  resultsInfo.className = "results-info";
  resultsInfo.style.cssText = "text-align: center; margin-bottom: 1rem; color: var(--elevvo-yellow); font-size: 0.9rem;";
  resultsInfo.textContent = `Showing ${paginated.length} of ${filtered.length} posts`;
  postsSection.appendChild(resultsInfo);

  const grid = document.createElement("div");
  grid.className = "posts-grid";
  paginated.forEach(post => {
    const card = document.createElement("div");
    card.className = "post-card fade-in";
    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}" />
      <div class="post-content">
        <h2>${post.title}</h2>
        <p>${post.description}</p>
        <span class="post-date">${post.date}</span>
        <span class="post-category">${post.category}</span>
        <span class="post-author">By ${post.author}</span>
      </div>
    `;
    card.onclick = () => showModal(post);
    grid.appendChild(card);
  });
  postsSection.appendChild(grid);

  // Pagination
  paginationSection.innerHTML = "";
  if (totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = (i === currentPage) ? "active" : "";
      btn.onclick = () => {
        currentPage = i;
        renderPosts();
      };
      paginationSection.appendChild(btn);
    }
  }
}

function showModal(post) {
  modalContent.innerHTML = `
    <button class="close-modal" id="close-modal">&times;</button>
    <img src="${post.image}" alt="${post.title}" />
    <h2>${post.title}</h2>
    <p><strong>Date:</strong> ${post.date}</p>
    <p><strong>Category:</strong> ${post.category}</p>
    <p><strong>Author:</strong> ${post.author}</p>
    <div class="modal-body">${post.content}</div>
  `;
  modal.classList.add("show");
  setTimeout(() => modalContent.classList.add("fade-in"), 10);
  document.getElementById("close-modal").onclick = hideModal;
  modal.onclick = (e) => { if (e.target === modal) hideModal(); };
}

function hideModal() {
  modalContent.classList.remove("fade-in");
  setTimeout(() => modal.classList.remove("show"), 200);
}

// Event listeners
searchInput.addEventListener("input", e => {
  currentSearch = e.target.value;
  currentPage = 1;
  renderPosts();
});

categorySelect.addEventListener("change", e => {
  currentCategory = e.target.value;
  currentPage = 1;
  renderPosts();
});

sortSelect.addEventListener("change", e => {
  currentSort = e.target.value;
  currentPage = 1;
  renderPosts();
});

darkModeToggle.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark-mode", darkMode);
  darkModeToggle.textContent = darkMode ? "☀️" : "🌙";
});

// Initial render
renderPosts();