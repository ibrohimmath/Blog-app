// Navbar
const bar = document.querySelector(".open");
const darkBgc = document.querySelector(".close");
const navCloser = document.querySelector(".cancel");
const navUl = document.querySelector("nav").querySelector("ul");
const check = document.querySelector("#check");

const changeNavUl = function() {
  if (navUl.classList.contains("navClosed")) {
    navUl.classList.remove("navClosed");
    navCloser.classList.remove("hidden");
  } else {
    navUl.classList.add("navClosed");
    navCloser.classList.add("hidden");
  }
};

const changeDarkBgc = function() {
  if (darkBgc.classList.contains("hidden")) {
    darkBgc.classList.remove("hidden");
  } else {
    darkBgc.classList.add("hidden");
  }
};

window.addEventListener("resize", function(e) {
  const width = document.documentElement.clientWidth; 
  if (width > 400) {
    bar.classList.add("hidden");
    darkBgc.classList.add("hidden");
  } else {
    bar.classList.remove("hidden");
    
    bar.addEventListener("click", function(e) {
      changeNavUl();
      changeDarkBgc();
    });

    navCloser.addEventListener("click", function(e) {
      changeNavUl();
      changeDarkBgc();
    });

    darkBgc.addEventListener("click", function(e) {
      changeNavUl();
      changeDarkBgc();
    });     
  }
});

// --------------------------------------------------------------------
// Blog posts

const urlBlogPosts = "http://localhost:3000/blogposts/";

axios.get(urlBlogPosts)
  .then(({data}) => getBlogPosts(data))
  .catch(err => console.log(err));

const getBlogPosts = function(data) {
  const blogDiv = document.querySelector(".showcase");

  data.forEach(item => {
    const html = `
    <div class="blog blog__post">
      <div class="post__title">${item.title}</div>
      <p>
        <span class="post__date">${item.date}</span>
        <span class="post__tags">${item.tags.join(", ")}</span>
      </p>          
      <div class="post__desc">
        ${item.desc}     
      </div>
    </div>  
    `;
    // console.log(html);
    blogDiv.insertAdjacentHTML("beforeend", html);
  });
}