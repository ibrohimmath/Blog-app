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
// Recent posts

const urlRecentPosts = "http://localhost:3000/recentposts/";

axios.get(urlRecentPosts)
  .then(({data}) => useData(data))
  .catch(err => console.log(err));

const useData = function(postsRecent) {
  const postsRow = document.querySelector(".row__posts");
  const container = document.querySelector(".posts").querySelector(".container");
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const getDateFormat = function(date) {
    // const day = date.getDate();
    // const month = months[date.getMonth()];
    // const year = date.getFullYear();
    // return `${day} ${month} ${year}`
    return date;
  };
    
  for (const [ind, item] of postsRecent.entries()) {
    let arr = item.tags;
    if (typeof arr === "string") {
      arr = arr.replace(/\[|\]/g,'').split(',').map(word => word[0].toUpperCase() + word.slice(1));
    }
    const html = `
    <div class="post">
      <div class="post__title">${item.title}</div>
      <p>
        <span class="post__date">${getDateFormat(item.date)}</span>
        <span class="post__tags">${arr.join(", ")}</span>
      </p>          
      <div class="post__desc">
        ${item.desc}            
      </div>
    </div>  
    `;
    postsRow.insertAdjacentHTML("beforeend", html);
  }
  
  // Setting parent height as maximal height of set children nodes
  const children = postsRow.children;
  const heightMax = 40 + Array.from(children).reduce((acc, child) => Math.max(acc, child.offsetHeight), 0);
  postsRow.style.height = heightMax + "px";
  
  const posts = document.querySelectorAll(".post");
  const left = document.querySelector(".slider__left");
  const right = document.querySelector(".slider__right");
  
  let curr = 0;
  const n = posts.length;
  
  posts.forEach((post, i) => {
    const mov = i - curr;
    post.style.transform = `translateX(calc(${100 * mov}% + ${30 * mov}px))`;
  });
  
  left.addEventListener("click", function(e) {
    curr = (curr - 1 + n) % n;
    posts.forEach((post, i) => {
      const mov = i - curr;
      post.style.transform = `translateX(calc(${100 * mov}% + ${30 * mov}px))`;
    });  
  });
  
  right.addEventListener("click", function(e) {
    curr = (curr + 1) % n;
    posts.forEach((post, i) => {
      const mov = i - curr;
      post.style.transform = `translateX(calc(${100 * mov}% + ${30 * mov}px))`;
    });  
  });
}

// --------------------------------------------------------------------
// Featured works
const urlFeaturedWorks = "http://localhost:3000/featuredworks/";

axios.get(urlFeaturedWorks)
  .then(({data}) => getFeaturedWorks(data))
  .catch(err => console.log(err));

const getFeaturedWorks = async function(data) {
  const featuredWorksDiv = document.querySelector(".works");
  data.forEach((item) => {
    let link = item.img;
    const html = `
      <div class="work">
        <div class="col col__image">
          <img src="${item.img}">
        </div>
        <div class="col col__content">
          <div class="work__title">${item.title}</div>
          <p>
            <span class="work__year">${item.year}</span>
            <span class="work__type">${item.type}</span>
          </p>
          <div class="work__desc">
            ${item.desc}
          </div>
        </div>
      </div>    
    `;    
    featuredWorksDiv.insertAdjacentHTML("beforeend", html);  
  }); 
}

