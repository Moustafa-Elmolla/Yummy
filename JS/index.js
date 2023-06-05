let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

$(document).ready(() => {
  searchByName("").then(() => {
    $(".loading").fadeOut(500)
    $("body").css("overflow", "visible")
  $(".inner-loading").fadeOut(300);

  })
  
})

function openSideNav() {
  
  $(".side-nav-menu").animate({left: 0},500)
  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".links li").eq(i).animate({top:0}, (i + 5)* 100)
  }
}
function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
  $(".side-nav-menu").animate({left: -boxWidth},500)
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
  $(".links li").animate({top:300}, 500)
}
closeSideNav()
$(".side-nav-menu i.open-close-icon").click(()=> {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav()
  } else {
    openSideNav()
  }
})


// DISPLAY MEALS
function displayMeals(arr) {
  let mealsBox = ''
  for (let i = 0; i < arr.length; i++) {
    mealsBox += `
    <div class="col-md-3">
    <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
      <img class="w-100" src="${arr[i].strMealThumb}" alt="">
      <div class="meal-layer p-2 position-absolute text-black d-flex align-items-center">
        <h3>${arr[i].strMeal}</h3>
      </div>
    </div>
  </div>
    `
    
  }
  rowData.innerHTML = mealsBox;
}


// CATEGORIES
async function getCategories() {
  closeSideNav()
  rowData.innerHTML = "";
  $(".inner-loading").fadeIn(300);
  
  searchContainer.innerHTML = "";

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  response = await response.json()
  displayCategories(response.categories)
  $(".inner-loading").fadeOut(300);
}

function displayCategories(arr) {
  let mealsBox = '';
  for (let i = 0; i < arr.length; i++) {
    mealsBox += `
    <div class="col-md-3">
    <div onclick= "getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
      <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
      <div class="meal-layer p-2 position-absolute text-black text-center">
        <h3>${arr[i].strCategory}</h3>
        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 15).join(" ")}</p>
      </div>
    </div>
  </div>
    `
    
  }
  rowData.innerHTML = mealsBox;
}

// AREAS
async function getAreas() {
  closeSideNav()
  rowData.innerHTML = "";
  $(".inner-loading").fadeIn(300);
  searchContainer.innerHTML = "";

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  response = await response.json()
  displayAreas(response.meals)
  $(".inner-loading").fadeOut(300);

}

function displayAreas(arr) {
  let mealsBox = '';
  for (let i = 0; i < arr.length; i++) {
    mealsBox += `
    <div class="col-md-3">
      <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${arr[i].strArea}</h3>
      </div>
    </div>
    `
  }
  rowData.innerHTML = mealsBox;
}

// INGREDIENS
async function getIngrediens() {
  closeSideNav()
  rowData.innerHTML = "";
  $(".inner-loading").fadeIn(300);
  
  searchContainer.innerHTML = "";

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  response = await response.json()
  
  displayIngrediens(response.meals.slice(0, 20))
  $(".inner-loading").fadeOut(300);

}

function displayIngrediens(arr) {
  let mealsBox = '';
  for (let i = 0; i < arr.length; i++) {
    mealsBox += `
    <div class="col-md-3">
    <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${arr[i].strIngredient}</h3>
        <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
    </div>
  </div>
    `
  }
  rowData.innerHTML = mealsBox;
}

// START DETAILSMEALS
async function getMealDetails(mealId) {
  closeSideNav()
  rowData.innerHTML = "";
  $(".inner-loading").fadeIn(300);
  
  searchContainer.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  response = await response.json();
  // console.log(response.meals);
  displayMealDetails(response.meals[0])
  $(".inner-loading").fadeOut(300);

}

function displayMealDetails(meal) {
  let ingredients = ``

  for (let i = 1; i <= 20; i++) {
    if(meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
    }
  }

  let tags = meal.strTags?.split(",")
  if(!tags) tags = []
  let tagsStr = ``

  for (let i = 0; i < tags.length; i++) {
    tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    
  }


  let mealsBox = `
  <div class="col-md-4">
  <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
  <h2>${meal.strMeal}</h2>
</div>
<div class="col-md-8">
  <h2>Instructions</h2>
  <p>${meal.strInstructions}</p>
  <h3><span class="fw-bolder">Area :</span>${meal.strArea}</h3>
  <h3><span class="fw-bolder">Category :</span>${meal.strCategory}</h3>
  <h3>Recipes :</h3>
  <ul class="list-unstyled d-flex mt-4 flex-wrap">
    ${ingredients}
  </ul>
  <h3>Tags :</h3>
  <ul class="list-unstyled d-flex mt-4 flex-wrap">
    ${tagsStr}
  </ul>
  <a target= "_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
  <a target= "_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
</div>
  `
  rowData.innerHTML = mealsBox;
}
// END DETAILSMEALS

async function getCategoryMeals(category) {
  closeSideNav()
  rowData.innerHTML = "";
  $(".inner-loading").fadeIn(300);
  
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  response = await response.json()
  displayMeals(response.meals.slice(0, 20))
  $(".inner-loading").fadeOut(300);

}
async function getAreaMeals(area) {
  closeSideNav()
  rowData.innerHTML = "";
  $(".inner-loading").fadeIn(300);
  
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  response = await response.json()
  displayMeals(response.meals.slice(0, 20))
  $(".inner-loading").fadeOut(300);

}
async function getIngredientsMeals(ingredients) {
  closeSideNav()
  rowData.innerHTML = "";
  $(".inner-loading").fadeIn(300);
  
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${ingredients}`)
  response = await response.json()
  displayMeals(response.meals.slice(0, 20))
  $(".inner-loading").fadeOut(300);

}

function showSearchInputs() {
  searchContainer.innerHTML = `<div class="row py-4">
  <div class="col-md-6">
    <input onkeyup= "searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
  </div>
  <div class="col-md-6">
    <input onkeyup= "searchByFLitter(this.value)" maxlength= "1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
  </div>
</div>`

rowData.innerHTML = ""
}

// SEARCH BY NAME
async function searchByName(term) {
  $(".inner-loading").fadeIn(300);

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
  response = await response.json()
  response.meals ? displayMeals(response.meals) : displayMeals([])
  $(".inner-loading").fadeOut(300);

}

// SEARCH BY FIRST LITTER
async function searchByFLitter(term) {
  $(".inner-loading").fadeIn(300);

  term == "" ? term = "a" : ""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
  response = await response.json()
  response.meals ? displayMeals(response.meals) : displayMeals([])
  $(".inner-loading").fadeOut(300);

}

function showContact() {
  rowData.innerHTML = `
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
          <div class="row g-4">
            <div class="col-md-6">
              <input onkeyup="inputsValidation()" id="nameInput" class="form-control" type="text" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 mb-0 d-none">
                Special characters and numbers not allowed
              </div>
            </div>
            <div class="col-md-6">
              <input onkeyup="inputsValidation()" id="emailInput" class="form-control" type="email" placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 mb-0 d-none">
                Email not valid *example@yyy.zzz
              </div>
            </div>
            
            <div class="col-md-6">
              <input onkeyup="inputsValidation()" id="phoneInput" class="form-control" type="text" placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 mb-0 d-none">
                Enter valid phone number
              </div>
            </div>
            <div class="col-md-6">
              <input onkeyup="inputsValidation()" id="ageInput" class="form-control" type="number" placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 mb-0 d-none">
                Enter valid age
              </div>
            </div>
            <div class="col-md-6">
              <input onkeyup="inputsValidation()" id="passwordInput" class="form-control" type="password" placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 mb-0 d-none">
                Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
            </div>
            <div class="col-md-6">
              <input onkeyup="inputsValidation()" id="repasswordInput" class="form-control" type="password" placeholder="rePassword">
              <div id="rePasswordAlert" class="alert alert-danger w-100 mt-2 mb-0 d-none">
                Enter valid repassword
              </div>
            </div>
          </div>
          <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
      </div>
  `
  submitBtn = document.getElementById("submitBtn")

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  })
  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  })
  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  })
  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  })
  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  })
  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if(nameInputTouched) {
    if(nameValidation()) {
      document.getElementById("nameAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("nameAlert").classList.replace("d-none", "d-block")
    }
  }
  if(emailInputTouched) {
    if(emailValidation()) {
      document.getElementById("emailAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("emailAlert").classList.replace("d-none", "d-block")
    }
  }
  if (phoneInputTouched) {
    if(phoneValidation()) {
      document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
    }
  }
  if (ageInputTouched) {
    if(ageValidation()) {
      document.getElementById("ageAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("ageAlert").classList.replace("d-none", "d-block")
    }
  }
  if (passwordInputTouched) {
    if(passwordValidation()) {
      document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
    }
  }
  if (repasswordInputTouched) {
    if(repasswordValidation()) {
      document.getElementById("rePasswordAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("rePasswordAlert").classList.replace("d-none", "d-block")
    }
  } 

  if (nameValidation() &&
  emailValidation() &&
  phoneValidation() &&
  ageValidation() &&
  passwordValidation() &&
  repasswordValidation()) {
    submitBtn.removeAttribute("disabled")
  } else {
    submitBtn.setAttribute("disabled", true)
  }
}

function nameValidation() {
  return (/^([a-zA-Z]){2,30}$/.test(document.getElementById("nameInput").value))
}
function emailValidation() {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}
function phoneValidation() {
  return (/^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(document.getElementById("phoneInput").value))
}
function ageValidation() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}
function passwordValidation() {
  return (/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/.test(document.getElementById("passwordInput").value))
}
function repasswordValidation() {
  return ((document.getElementById("repasswordInput").value) == (document.getElementById("passwordInput").value))
}