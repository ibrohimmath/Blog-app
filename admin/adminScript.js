"use strict";

const main = document.querySelector("main");
const togglerSidebar = document.querySelector(".open");
const wrapper = document.querySelector(".wrapper");
const nameAvatar = document.querySelector(".avatar__name");

const user = document.querySelector(".user");
const userSubmenu = document.querySelector(".user__submenu");
const profileBtn = document.querySelector("li.profile");

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

const closeSidebar = document.querySelector(".close__sidebar");

const sections = document.querySelectorAll(".section__main");

const sectionRecentPosts = document.querySelector(".section__recentposts");
const btnRecentPosts = document.querySelector(".btn__recentposts");
const addBtnRecentPosts = document.querySelector(".add__recentpost");
const overlayRecentPosts = document.querySelector(".overlay__recentposts");
const modalRecentPosts = document.querySelector(".modal__recentposts");
const closeModalRecentPosts = modalRecentPosts.querySelector(".close__modalrecentposts");
const formRecentPosts = document.querySelector(".form__recentposts");
const sectionsMainRecentPost = sections[0];

const sectionFeaturedWorks = document.querySelector(".section__featuredworks");
const btnFeaturedWorks = document.querySelector(".btn__featuredworks");
const sectionsMainFeaturedWorks = sections[1];
const addBtnFeaturedWorks = document.querySelector(".add__featuredwork");
const overlayFeaturedWorks = document.querySelector(".overlay__featuredworks");
const modalFeaturedWorks = document.querySelector(".modal__featuredworks");
const closeModalFeaturedWorks = document.querySelector(".close__modalfeaturedworks");
const formFeaturedWorks = document.querySelector(".form__featuredworks");
const imageInput = document.querySelector("input[name='img']");

const sectionBlogposts = document.querySelector(".section__blogposts");
const btnBlogposts = document.querySelector(".btn__blogposts");
const sectionsMainBlogposts = sections[2];
const addBtnBlogposts = document.querySelector(".add__blogpost");
const overlayBlogposts = document.querySelector(".overlay__blogposts");
const modalBlogposts = document.querySelector(".modal__blogposts");
const closeModalBlogposts = document.querySelector(".close__modalblogposts");
const formBlogposts = document.querySelector(".form__blogposts");

// important variables
const urlUsers = "http://localhost:3000/users";
let loggedIn = false;

// Formatting date properly
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const getDateFormat = function(date) {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`
};

// Getting logged in user from localStorage if he logged in 
// (useful in refreshing logged page)
(function() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;
  const {name, password, id} = user;

  overlayLogin.classList.toggle("hidden");
  modalLogin.classList.toggle("hidden"); 

  enterUser(name, password, id);
})();

// "[asdf" -> "asdf"
// "sfas]" -> "sfas"
const cleanWordFromBrackets = function(x) {
  let xCleaned = x.trim();
  if (xCleaned[0] == '[') {
    xCleaned = xCleaned.slice(1);
  } else if (xCleaned.at(-1) == ']') {
    xCleaned = xCleaned.slice(0, -1);
  }
  return xCleaned;  
}

const clearSection = function(section) {
  while (!section.lastElementChild.classList.contains("row__head")) {
    section.removeChild(section.lastChild);
  }
}

// Sidebar toggle
const sidebarFunc = function(e) {
  if (document.documentElement.clientWidth > 680) {
    main.classList.toggle("move--left");
  }
  wrapper.classList.toggle("wrapper--right");
}

togglerSidebar.addEventListener("click", sidebarFunc);
profileBtn.addEventListener("click", function(e) {
  if (!wrapper.classList.contains("wrapper--right") && loggedIn) {
    sidebarFunc(e);
  }
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
    // btnLogin
    if (ind == 0) {
      userSubmenu.classList.toggle("submenu--down");  
    }  
    // spanLogin
    if (ind == 1) {
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

  formLogin.reset();
});

// Checking for proper user
const hasUser = function(data, name, userPassword) {
  for (const {username, password, id} of data) {
    if (username === name && password === userPassword) {
      enterUser(name, password, id);
      return;
    }
  }
  alert("Try again");
}

// Enter successfully logged in user
function enterUser(name, password, id) {
  loggedIn = true;
  if (!btnSignup.classList.contains("hidden")) {
    btnSignup.classList.toggle("hidden");
  }
  const userLoggedIn = {
    "name": name,
    "password": password,
    "id": id
  };
  localStorage.setItem("user", JSON.stringify(userLoggedIn));
  userSubmenu.style.transform = "translateY(-30px)";

  btnLogin.classList.toggle("hidden");
  btnLogout.classList.toggle("hidden");

  overlayLogin.classList.toggle("hidden");
  modalLogin.classList.toggle("hidden"); 

  nameAvatar.textContent = name;
  nameAvatar.classList.toggle("hidden");
  
  // Recentposts
  const recentPostsUrl = `http://localhost:3000/recentposts/?user_id=${id}`;
  axios.get(recentPostsUrl)
    .then(({data: recentposts}) => {
      btnRecentPosts.addEventListener("click", function(e) {
        // console.log(loggedIn);
        if (!sectionRecentPosts.classList.contains("hidden") || !loggedIn) return;
        [sectionFeaturedWorks, sectionBlogposts].forEach(item => {
          if (!item.classList.contains("hidden")) {
            item.classList.toggle("hidden");
          }
        });
        sectionRecentPosts.classList.toggle("hidden");
        // console.log(sectionRecentPosts);
        
        // Clearing Recent Posts before inserting datas
        clearSection(sectionsMainRecentPost);

        // Adding all posts to html
        recentposts.forEach(({title, date, tags, desc, id}) => {
          let arr = tags;
          // console.log(arr);
          if (typeof arr === "string") {
            arr = arr.replace(/\[|\]/g,'').split(',').map(word => {
              const wordNew = word[0].toUpperCase() + word.slice(1);
              return cleanWordFromBrackets(wordNew);
            });
            // console.log(arr);
            arr = arr.join(", ");
            // console.log(arr);
          }    
          const html = `
            <div class="row" data-id="${id}">
              <div class="col__title">
                ${title}
              </div>
              <div class="col__date">
                ${date}
              </div>
              <div class="col__tags">
                ${arr}
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
          // console.log(html);
          sectionsMainRecentPost.insertAdjacentHTML("beforeend", html);
        });

        [closeModalRecentPosts, addBtnRecentPosts, overlayRecentPosts].forEach((item, i) => {
          item.addEventListener("click", function(e) {
            // console.log(item);
            overlayRecentPosts.classList.toggle("hidden");
            modalRecentPosts.classList.toggle("hidden");
            closeModalRecentPosts.classList.toggle("hidden");
            formRecentPosts.querySelector("button").textContent = "Create";
            formRecentPosts.reset();
          });  
        }); 

        // Recent posts form
        formRecentPosts.addEventListener("submit", function(e) {
          e.preventDefault();

          if (formRecentPosts.querySelector("button").textContent == "Update") {
            return;
          }

          const formData = new FormData(formRecentPosts);
          const date = new Date();
          formData.append("date", getDateFormat(date));
          const tags = formData.get("tags").split(",").map(x => x.trim());
          formData.set("tags", `[${tags}]`);
          formData.append("user_id", String(id));
          for (const [key, value] of formData.entries()) {
            if (!value || key === "tags" && value.length <= 2) {
              alert(`Field ${key} was not field`);
              return;
            }
            // console.log(key, value);
          }

          history.replaceState(null, null, window.location.pathname);

          const urlRecentPosts = "http://localhost:3000/recentposts/";
          
          axios({
            method: "post",
            url: urlRecentPosts,
            data: formData,
            headers: { "Content-Type": "application/json" },
          })
          .then(({data}) => {
            enterUser(name, password, id);
          })
          .catch(err => console.log(err));

          formRecentPosts.reset();
        });

        // Catching clicks with applying delegation inside sections main div class
        sectionsMainRecentPost.addEventListener("click", (e) => {
          const el = e.target;

          // update specific recentpost
          if (el.classList.contains("gold")) {
            overlayRecentPosts.classList.toggle("hidden");
            modalRecentPosts.classList.toggle("hidden");
            closeModalRecentPosts.classList.toggle("hidden");
  
            const idSelected = el.closest(".row").dataset.id;
            axios.get(`http://localhost:3000/recentposts/${idSelected}`)
              .then(({data}) => {
                // console.log(data);
                let formData = new FormData(formRecentPosts);
                for (const [key, _] of formData.entries()) {
                  // console.log(key, data[key]);
                  if (key == "tags") {
                    // console.log(arr);
                    let arr = data[key];
                    if (typeof arr === "string") {
                      arr = arr.replace(/\[|\]/g,'').split(',').map(word => {
                        const wordNew = word[0].toUpperCase() + word.slice(1);
                        return cleanWordFromBrackets(wordNew);
                      });
                      // console.log(arr);
                      arr = arr.join(", ");
                      // console.log(arr);
                    }    
                    formRecentPosts.querySelector(`input[name="${key}"]`).value = arr; 
                    continue;
                  }
                  formRecentPosts.querySelector(`input[name="${key}"]`).value = data[key]; 
                }
                formRecentPosts.querySelector("button").textContent = "Update";
                // Submit update form
                formRecentPosts.addEventListener("submit", (e) => {
                  e.preventDefault();

                  if (formRecentPosts.querySelector("button").textContent == "Create") {
                    return;
                  }
        
                  formData = new FormData(formRecentPosts);
                  // for (const [key, value] of formData.entries()) {
                  //   console.log(key, value);
                  // }
                  const date = new Date();
                  formData.append("date", getDateFormat(date));
                  
                  const tags = formData.get("tags").split(",").map(x => cleanWordFromBrackets(x));
                  // console.log(tags);
                  formData.set("tags", `[${tags}]`);        
                  formData.append("user_id", String(id));      
                  axios({
                    method: "put",
                    url: `http://localhost:3000/recentposts/${idSelected}`,
                    data: formData,
                    headers: { "Content-Type": "application/json" },
                  }).then((data) => {
                    console.log(data);
                    enterUser(name, password, id);
                  });
        
                  formRecentPosts.querySelector("button").textContent = "Create";
                  formRecentPosts.reset();  
                });
              })  
              .catch(error => console.log(error))
          }

          // delete specific recentpost
          else if (el.classList.contains("red")) {
            const idSelected = el.closest(".row").dataset.id;
            axios({
              method: "delete",
              url: `http://localhost:3000/recentposts/${idSelected}`,
            });
          }
        });
      });
    })
    .catch(err => console.log(err)); 

  // Featuredworks
  const featuredworksUrl = `http://localhost:3000/featuredworks?user_id=${id}`;
  axios.get(featuredworksUrl)
    .then(({data: featuredworks}) => {
      // console.log(featuredworks);
      btnFeaturedWorks.addEventListener("click", function(e) {
        // console.log(loggedIn);
        if (!sectionFeaturedWorks.classList.contains("hidden") || !loggedIn) return;
        [sectionRecentPosts, sectionBlogposts].forEach(item => {
          if (!item.classList.contains("hidden")) {
            item.classList.toggle("hidden");
          }
        });
        sectionFeaturedWorks.classList.toggle("hidden");
        // console.log(sectionFeaturedWorks);

        // Clearing Featured Works before inserting datas
        clearSection(sectionsMainFeaturedWorks);

        // Adding all posts to html
        featuredworks.forEach(async ({img, title, year, type, desc, id}) => {
          let link = img;
          // console.log(img);
          if (/^data:image\/(png|jpeg|jpg|gif|bmp);base64,/.test(img)) {
            link = await fetch(link).then(res => res.blob())
            link = URL.createObjectURL(link);
          }
          const html = `
            <div class="row" data-id="${id}">
              <div class="col__img">
                <a href="${link}">URL</a>
              </div>
              <div class="col__title">
                ${title}
              </div>
              <div class="col__year">
                ${year}
              </div>
              <div class="col__type">
                ${type}
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
          // console.log(html);
          sectionsMainFeaturedWorks.insertAdjacentHTML("beforeend", html);
        });

        [closeModalFeaturedWorks, addBtnFeaturedWorks, overlayFeaturedWorks].forEach((item, i) => {
          item.addEventListener("click", function(e) {
            // console.log(item);
            overlayFeaturedWorks.classList.toggle("hidden");
            modalFeaturedWorks.classList.toggle("hidden");
            closeModalFeaturedWorks.classList.toggle("hidden");
            formFeaturedWorks.querySelector("button").textContent = "Create";
            formFeaturedWorks.reset();
          });  
        }); 

        // Featured Works form
        formFeaturedWorks.addEventListener("submit", (e) => {
          e.preventDefault();

          if (formFeaturedWorks.querySelector("button").textContent == "Update") {
            return;
          }

          const formData = new FormData(formFeaturedWorks);
          formData.append("user_id", String(id));

          const file = imageInput.files[0];
          const reader = new FileReader();
          reader.onload = function(e) {
            formData.set("img", e.target.result);

            history.replaceState(null, null, window.location.pathname);

            const urlFeaturedWorks = "http://localhost:3000/featuredworks/";
            
            axios({
              method: "post",
              url: urlFeaturedWorks,
              data: formData,
              headers: { "Content-Type": "application/json" },
            })
              .then(({data}) => {
                enterUser(name, password, id);
              })
              .catch(err => console.log(err));
              
            formFeaturedWorks.reset();              
          };
          reader.readAsDataURL(file);

          // for (const [key, value] of formData.entries()) {
          //   console.log(key, value);
          // }          
        });

        // Catching clicks with applying delegation inside sections main div class
        sectionsMainFeaturedWorks.addEventListener("click", (e) => {
          const el = e.target;

          // update specific featuredwork
          if (el.classList.contains("gold")) {
            overlayFeaturedWorks.classList.toggle("hidden");
            modalFeaturedWorks.classList.toggle("hidden");
            closeModalFeaturedWorks.classList.toggle("hidden");
  
            const idSelected = el.closest(".row").dataset.id;
            axios.get(`http://localhost:3000/featuredworks/${idSelected}`)
              .then(async ({data}) => {
                // console.log(data);
                let formData = new FormData(formFeaturedWorks);
                for (const [key, _] of formData.entries()) {
                  // console.log(key)
                  // console.log(data[key]);
                  if (key === "img") {
                    const image = data[key];
                    // console.log(image);
                    const blob = await fetch(image).then(res => res.blob());
                    // console.log(blob);

                    // Finding out type of selected basestring64 encoded image
                    const left = image.indexOf(':') + 1;
                    const right = image.indexOf(';');
                    const type = image.slice(left, right);
                    // console.log(type);

                    const file = new File([blob], `${data["title"].replaceAll(" ", "_")}.jpg`, { type});
                    // console.log(file);

                    const filesList = new DataTransfer();
                    filesList.items.add(file);
                
                    formFeaturedWorks.querySelector(`input[name="${key}"]`).files = filesList.files;
                    continue;
                  }
                  formFeaturedWorks.querySelector(`input[name="${key}"]`).value = data[key]; 
                }
                formFeaturedWorks.querySelector("button").textContent = "Update";

                // Submit update form
                formFeaturedWorks.addEventListener("submit", (e) => {
                  e.preventDefault();

                  if (formFeaturedWorks.querySelector("button").textContent == "Create") {
                    return;
                  }
        
                  formData = new FormData(formFeaturedWorks);
                  formData.append("user_id", String(id));
        
                  const file = imageInput.files[0];
                  const reader = new FileReader();
                  reader.onload = function(e) {
                    formData.set("img", e.target.result);
        
                    history.replaceState(null, null, window.location.pathname);
                            
                    axios({
                      method: "put",
                      url: `http://localhost:3000/featuredworks/${idSelected}`,
                      data: formData,
                      headers: { "Content-Type": "application/json" },
                    })
                      .then(({data}) => {
                        enterUser(name, password, id);
                      })
                      .catch(err => console.log(err));
                      
                    formFeaturedWorks.querySelector("button").textContent = "Create";
                    formFeaturedWorks.reset();              
                  };
                  reader.readAsDataURL(file);
        
                });
              })  
              .catch(error => console.log(error))
          }

          // delete specific recentpost
          else if (el.classList.contains("red")) {
            const idSelected = el.closest(".row").dataset.id;
            axios({
              method: "delete",
              url: `http://localhost:3000/featuredworks/${idSelected}`,
            });
          }
        });
      });
    })
    .catch(error => console.log(error));

  // Blogposts
  const blogpostsUrl = `http://localhost:3000/blogposts?user_id=${id}`;
  axios.get(blogpostsUrl)
    .then(({data: blogposts}) => {
      // console.log(blogposts);
      btnBlogposts.addEventListener("click", (e) => {
        // console.log(loggedIn);
        if (!sectionBlogposts.classList.contains("hidden") || !loggedIn) return;
        [sectionRecentPosts, sectionFeaturedWorks].forEach(item => {
          if (!item.classList.contains("hidden")) {
            item.classList.toggle("hidden");
          }
        });
        sectionBlogposts.classList.toggle("hidden");
        // console.log(sectionBlogposts);

        // Clearing Blog Posts before inserting datas
        clearSection(sectionsMainBlogposts);
        
        // Adding all posts to html
        blogposts.forEach(({title, date, tags, desc, id}) => {
          // console.log(tags);
          let arr = tags;
          // console.log(arr);
          if (typeof arr === "string") {
            arr = arr.replace(/\[|\]/g,'').split(',').map(word => {
              const wordNew = word[0].toUpperCase() + word.slice(1);
              return cleanWordFromBrackets(wordNew);
            });
            // console.log(arr);
            arr = arr.join(", ");
            // console.log(arr);
          }    
          const html = `
            <div class="row" data-id="${id}">
              <div class="col__title">
                ${title}
              </div>
              <div class="col__date">
                ${date}
              </div>
              <div class="col__tags">
                ${arr}
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
          // console.log(html);
          sectionsMainBlogposts.insertAdjacentHTML("beforeend", html);
          
        });

        [closeModalBlogposts, addBtnBlogposts, overlayBlogposts].forEach((item, i) => {
          item.addEventListener("click", function(e) {
            console.log(item);
            overlayBlogposts.classList.toggle("hidden");
            modalBlogposts.classList.toggle("hidden");
            closeModalBlogposts.classList.toggle("hidden");
            formBlogposts.querySelector("button").textContent = "Create";
            formBlogposts.reset();
          });  
        }); 

        // Blog posts form
        formBlogposts.addEventListener("submit", function(e) {
          e.preventDefault();

          if (formBlogposts.querySelector("button").textContent == "Update") {
            return;
          }

          const formData = new FormData(formBlogposts);
          const date = new Date();
          formData.append("date", getDateFormat(date));
          const tags = formData.get("tags").split(",").map(x => x.trim());
          formData.set("tags", `[${tags}]`);
          formData.append("user_id", String(id));
          for (const [key, value] of formData.entries()) {
            if (!value || key === "tags" && value.length <= 2) {
              alert(`Field ${key} was not field`);
              return;
            }
            // console.log(key, value);
          }

          history.replaceState(null, null, window.location.pathname);

          const urlBlogposts = "http://localhost:3000/blogposts/";
          console.log(urlBlogposts);
          
          axios({
            method: "post",
            url: urlBlogposts,
            data: formData,
            headers: { "Content-Type": "application/json" },
          })
            .then(({data}) => {
              enterUser(name, password, id);
            })
            .catch(err => console.log(err));

          formBlogposts.reset();
        });

        // Catching clicks with applying delegation inside sections main div class
        sectionsMainBlogposts.addEventListener("click", (e) => {
          const el = e.target;

          // update specific recentpost
          if (el.classList.contains("gold")) {
            overlayBlogposts.classList.toggle("hidden");
            modalBlogposts.classList.toggle("hidden");
            closeModalBlogposts.classList.toggle("hidden");
  
            const idSelected = el.closest(".row").dataset.id;
            axios.get(`http://localhost:3000/blogposts/${idSelected}`)
              .then(({data}) => {
                // console.log(data);
                let formData = new FormData(formBlogposts);
                for (const [key, _] of formData.entries()) {
                  // console.log(key, data[key]);
                  if (key == "tags") {
                    // console.log(arr);
                    let arr = data[key];
                    if (typeof arr === "string") {
                      arr = arr.replace(/\[|\]/g,'').split(',').map(word => {
                        const wordNew = word[0].toUpperCase() + word.slice(1);
                        return cleanWordFromBrackets(wordNew);
                      });
                      // console.log(arr);
                      arr = arr.join(", ");
                      // console.log(arr);
                    }    
                    formBlogposts.querySelector(`input[name="${key}"]`).value = arr; 
                    continue;
                  }
                  formBlogposts.querySelector(`input[name="${key}"]`).value = data[key]; 
                }
                formBlogposts.querySelector("button").textContent = "Update";

                // Submit update form
                formBlogposts.addEventListener("submit", (e) => {
                  e.preventDefault();

                  if (formBlogposts.querySelector("button").textContent == "Create") {
                    return;
                  }
        
                  formData = new FormData(formBlogposts);
                  const date = new Date();
                  formData.append("date", getDateFormat(date));
                  
                  const tags = formData.get("tags").split(",").map(x => cleanWordFromBrackets(x));
                  // console.log(tags);
                  formData.set("tags", `[${tags}]`);        
                  formData.append("user_id", String(id));      

                  // for (const [key, value] of formData.entries()) {
                  //   console.log(key, value);
                  // }

                  axios({
                    method: "put",
                    url: `http://localhost:3000/blogposts/${idSelected}`,
                    data: formData,
                    headers: { "Content-Type": "application/json" },
                  })
                    .then((data) => {
                    console.log(data);
                    enterUser(name, password, id);
                    })
                    .catch(error => console.log(error));
        
                  formBlogposts.querySelector("button").textContent = "Create";
                  formBlogposts.reset();  
                });
              })  
              .catch(error => console.log(error))
          }

          // delete specific recentpost
          else if (el.classList.contains("red")) {
            const idSelected = el.closest(".row").dataset.id;
            axios({
              method: "delete",
              url: `http://localhost:3000/blogposts/${idSelected}`,
            });
          }
        });        
      });
    })
    .catch(error => console.log(error));
};

// Log out the active user
btnLogout.addEventListener("click", function(e) {
  nameAvatar.textContent = "Undefined";
  nameAvatar.classList.toggle("hidden");

  btnLogin.classList.toggle("hidden");
  btnLogout.classList.toggle("hidden");

  loggedIn = false;
  localStorage.removeItem("user");

  while (sectionsMainRecentPost.childNodes.length > 1) {
    sectionsMainRecentPost.removeChild(sectionsMainRecentPost.lastChild);
    sectionsMainRecentPost.lastChild.remove();
  }
  sectionsMainRecentPost.textContent = "";
  if (userSubmenu.classList.contains("submenu--down")) {
    userSubmenu.classList.remove("submenu--down");
  }
  if (!sectionRecentPosts.classList.contains("hidden")) {
    sectionRecentPosts.classList.toggle("hidden");
  }

  location.reload();
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

   formSignup.reset();
});