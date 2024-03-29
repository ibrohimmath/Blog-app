const main = document.querySelector("main");
const togglerSidebar = document.querySelector(".open");
const wrapper = document.querySelector(".wrapper");
const nameAvatar = document.querySelector(".avatar__name");

const user = document.querySelector(".user");
const userSubmenu = document.querySelector(".user__submenu");

const overlayLogin = document.querySelector(".overlay__login");

const spanLogin = document.querySelector("span[class='login span--blue']");
const btnLogin = document.querySelector(".login");
const btnLogout = document.querySelector(".logout");
const modalLogin = document.querySelector(".modal__login");
const closeLogin = document.querySelector(".close__login");

const formLogin = document.querySelector(".form__login");
const loginName = formLogin.querySelector("input[type='name']");
const loginPassword = formLogin.querySelector("input[type='password']");

const overlaySignup = document.querySelector(".overlay__signup");

const spanSignup = document.querySelector("span[class='signup span--blue']");
const btnSignup = document.querySelector(".signup");
const modalSignup = document.querySelector(".modal__signup");
const closeSignup = document.querySelector(".close__signup");

const formSignup = document.querySelector(".form__signup");
const signupName = formSignup.querySelector("input[type='name'");
const signupPassword = formSignup.querySelector("input[type='password']");

const urlUsers = "http://localhost:3000/users";
const closeSidebar = document.querySelector(".close__sidebar");

const sectionRecentPosts = document.querySelector(".section__recentposts");

const btnRecentPosts = document.querySelector(".btn__recentposts");
const addBtnRecentPosts = document.querySelector(".add__recentpost");
const overlayRecentPosts = document.querySelector(".overlay__recentposts");
const modalRecentPosts = document.querySelector(".modal__recentposts");
const closeModalRecentPosts = modalRecentPosts.querySelector(".close__modalrecentposts");
const formRecentPosts = document.querySelector(".form__recentposts");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const getDateFormat = function(date) {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`
};


// Sidebar toggle
togglerSidebar.addEventListener("click", function(e) {
  if (document.documentElement.clientWidth > 680) {
    main.classList.toggle("move--left");
  }
  wrapper.classList.toggle("wrapper--right");
});
closeSidebar.addEventListener("click", function(e) {
  if (document.documentElement.clientWidth > 680) {
    main.classList.toggle("move--left");
  }
  wrapper.classList.toggle("wrapper--right");
});

// User submenu toggle
user.addEventListener("click", function(e) {
  userSubmenu.classList.toggle("submenu--down");  
});

// Login modal toggle
[btnLogin, spanLogin, overlayLogin, closeLogin].forEach((item, ind) => {
  item.addEventListener("click", function(e) {
    if (ind == 0) {
      userSubmenu.classList.toggle("submenu--down");  
    }  
    if (ind == 1) {
      // console.log("spanlogin");
      overlaySignup.classList.add("hidden");
      modalSignup.classList.add("hidden"); 
    } 
    overlayLogin.classList.toggle("hidden");
    modalLogin.classList.toggle("hidden"); 
  });
});

// Login form
formLogin.addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(formLogin);

  // for (const [name, value] of formData.entries()) {
  //   console.log(name, value);
  // }

  // console.log(loginName.value, loginPassword.value);

  const name = loginName.value, password = loginPassword.value;

  axios.get(urlUsers)
    .then(({data}) => hasUser(data, name, password))
    .catch(err => console.log(err));

  loginName.value = "";
  loginPassword.value = "";
});

// Checking for proper user
const hasUser = function(data, name, userPassword) {
  for (const {username, password} of data) {
    if (username === name && password === userPassword) {
      enterUser(name, password);
      return;
    }
  }
  alert("Try again");
}

// Enter successfully logged in user
const enterUser = function(name, password) {
  btnLogin.classList.toggle("hidden");
  btnLogout.classList.toggle("hidden");

  overlayLogin.classList.toggle("hidden");
  modalLogin.classList.toggle("hidden"); 

  nameAvatar.textContent = name;
  nameAvatar.classList.toggle("hidden");

  
  const userUrl = `http://localhost:3000/users/?username=${name}`;

  // Get datas for specific user
  axios.get(userUrl)
  .then(({data}) => {
    // Destructuring important datas
    const [{recentposts, featuredworks, blogposts}] = data;
    // Opening Recent posts
    btnRecentPosts.addEventListener("click", function(e) {
      sectionRecentPosts.classList.toggle("hidden");
      if (sectionRecentPosts.classList.contains("hidden")) return;
      const sectionsMain = sectionRecentPosts.querySelector(".section__main");
      // Adding all posts to html
      recentposts.forEach(({title, date, tags, desc}) => {
        const html = `
          <div class="row">
            <div class="col__title">
              ${title}
            </div>
            <div class="col__date">
              ${date}
            </div>
            <div class="col__tags">
              ${tags.join(", ")}
            </div>
            <div class="col__desc">
              ${desc}
            </div>
            <div class="col__actions">
              <i class="gold fa-solid fa-pen-to-square"></i>
              <i class="red fa-solid fa-trash"></i> 
            </div>
          </div>        
        `;
        sectionsMain.insertAdjacentHTML("beforeend", html);
      });

      [closeModalRecentPosts, addBtnRecentPosts, overlayRecentPosts, modalRecentPosts].forEach((item, i) => {
        item.addEventListener("click", function(e) {
          console.log(item);
          // if (!i) {

          // }
          overlayRecentPosts.classList.toggle("hidden");
          modalRecentPosts.classList.toggle("hidden");
          closeModalRecentPosts.classList.toggle("hidden");
        });  
      }); 

      // Recent posts form
      formRecentPosts.addEventListener("submit", function(e) {
        e.preventDefault();

        const formData = new FormData(formRecentPosts);
        const date = new Date();
        formData.append("date", getDateFormat(date));
        const tags = formData.get("tags").split(",").map(x => x.trim());
        formData.set("tags", `[${tags}]`);
        
        formRecentPosts.reset();
        // for (const [key, value] of formData.entries()) {
        //   console.log(key, value);
        // }

        history.replaceState(null, null, window.location.pathname);

        const urlRecentPosts = "http://localhost:3000/recentposts/";
        
        axios({
          method: "post",
          url: urlRecentPosts,
          data: formData,
          headers: { "Content-Type": "application/json" },
        })
         .then(({data}) => console.log(data))
         .catch(err => console.log(err));

      });
    });
  })
  .catch(err => console.log(err));  
};

// Log out the active user
btnLogout.addEventListener("click", function(e) {
  nameAvatar.textContent = "Undefined";
  nameAvatar.classList.toggle("hidden");

  btnLogin.classList.toggle("hidden");
  btnLogout.classList.toggle("hidden");
}); 

// Signup modal toggle
[btnSignup, spanSignup, overlaySignup, closeSignup].forEach((item, ind) => {
  item.addEventListener("click", function(e) {
    if (ind == 0) {
      userSubmenu.classList.toggle("submenu--down");  
    }  
    if (ind == 1) {
      // console.log("spansignup");
      overlayLogin.classList.add("hidden");
      modalLogin.classList.add("hidden"); 
    } 
    overlaySignup.classList.toggle("hidden");
    modalSignup.classList.toggle("hidden");  
  });
});

// Signup form
formSignup.addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(formSignup);

  // for (const [name, value] of formData.entries()) {
  //   console.log(name, value);
  // }

  axios({
    method: "post",
    url: urlUsers,
    data: formData,
    headers: { "Content-Type": "application/json" },
  })
   .then(({data}) => console.log(data))
   .catch(err => console.log(err));

  signupName.value = "";
  signupPassword.value = "";

});


