// 'https://jsonplaceholder.typicode.com/posts?userId=1'

const filter = document.querySelector(".filter");
const loader = document.querySelector(".loader");
const postsContainer = document.querySelector(".posts-container");

// Fetch posts

let limit = 5;
let page = 1;

async function fetchPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

async function addPostsToDom() {
  //   console.log("fired");
  loader.classList.add("show");

  let posts = await fetchPosts();

  if (posts) loader.classList.remove("show");

  posts.map(post => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
          <div class="number">${post.id}</div>
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">
            ${post.body}
          </p>
        `;
    postsContainer.appendChild(postEl);
  });
  posts = null;
  page++;
}

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach(post => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
}

addPostsToDom();

window.addEventListener("scroll", () => {
  let { scrollHeight, clientHeight, scrollTop } = document.documentElement;
  if (scrollTop === scrollHeight - clientHeight) addPostsToDom();
});

filter.addEventListener("input", filterPosts);
