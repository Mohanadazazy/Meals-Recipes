

$(document).ready(()=>{
    $('.loading').fadeOut(500 , closeNav())
    $('body').css("overflow" ,"visible")
})

$('.closeIcon').click(()=>{
  if($('nav').css('left') == "0px"){
    closeNav()
  }
  else{
    openNav()
  }
  
})

function closeNav(){
    let navWidth =  $('nav').outerWidth();
    $('.closeIcon').removeClass("fa-xmark").addClass('fa-bars')
    $('nav').animate({left:-navWidth},800)
    $('nav ul li').hide(1000)
}
function openNav(){
    $('.closeIcon').removeClass("fa-bars").addClass('fa-xmark')
    $('nav').animate({left:"0px"},800)
    $('nav ul li').show(1000)
} 

async function getMeals(type){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${type}`)
    let finalRes = await result.json();
    // console.log(finalRes);
    displayMeals(finalRes.meals)
    $('.cards').click((e)=>{
        let id =$(e.target).data('id');
        getDetails(id)
    })
}

getMeals("");

function displayMeals(arr){
    let container ="";
    for(let i =0 ; i<arr.length ; i++){
        container += `
                <div class="col-md-3 cards" data-id="${arr[i].idMeal}" value="hoda">
                    <div class="img rounded-3 position-relative" data-id="${arr[i].idMeal}">
                        <img src="${arr[i].strMealThumb}" class="w-100 rounded-3" alt="" data-id="${arr[i].idMeal}">
                        <div class="layer position-absolute w-100 h-100 rounded-3 d-flex align-items-center" data-id="${arr[i].idMeal}">
                            <h3 data-id="${arr[i].idMeal}">${arr[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
    }
    // document.querySelector('.Search').innerHTML = "";
    document.querySelector('.mainMeals').innerHTML = container;
}

async function getDetails(id){
    $('.loading').fadeIn(500)
    let result =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let finalRes =await result.json();
    displayDetails(finalRes.meals[0])
    // $('main').addClass("d-none")
    // $('.detailsData').removeClass("d-none")
    $('.loading').fadeOut(500)
}

function displayDetails(arr){
    let tags = arr.strTags
    let tagsStr =""
    if(tags){
      let tagsArr = tags.split(",");
      for(let i =0 ; i < tagsArr.length;i++){
        tagsStr+=`<li class="p-2 rounded-2 mb-2">${tagsArr[i]}</li>`  
      }
    }
    
    let ingredients =""
    for(let i =1 ;i<=20;i++){
        if(arr[`strIngredient${i}`]){
            ingredients +=`<li class="p-2 rounded-2 mb-2">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>`
        }
    }
    container =`
        <div class="col-md-4">
                    <div class="rounded-3 text-white">
                        <img src="${arr.strMealThumb}" class="w-100 rounded-3" alt="">
                        <h2>${arr.strMeal}</h2>
                    </div>
                </div>
                <div class="col-md-8 text-white">
                    <h2>Instructions</h2>
                    <p>${arr.strInstructions}</p>
                     <p class="h3">Area : ${arr.strArea}</p>
                     <p class="h3">Category : ${arr.strCategory}</p>
                     <p class="h3">Recipes :</p>
                     <ul class="d-flex list-unstyled ps-2 pt-3  gap-2 flex-wrap Recipes text-black">
                        ${ingredients}
                     </ul>
                     <p class="h3">Tags :</p>
                     <ul class="d-flex list-unstyled ps-2 pt-3  gap-2 flex-wrap tags text-black">
                        ${tagsStr}
                     </ul>
                     <button class="btn btn-success"><a href="${arr.strSource}" target="_blank">Source</a></button>
                     <button class="btn btn-danger"><a href="${arr.strYoutube}" target="_blank">Youtube</a></button>
                </div>
    `
    document.querySelector('.Search').innerHTML = "";
    document.querySelector('.mainMeals').innerHTML = container;
    
}

async function getCategories(){
    $('.loading').fadeIn(500)
    let result = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let finalRes = await result.json();
    displayCate(finalRes.categories)
    $('.loading').fadeOut(500)

}
function displayCate(arr){
    let container ="";
    for(let i=0;i<arr.length;i++){
        container +=`
                <div class="col-md-3">
                    <div class="img rounded-3 position-relative" onclick="getMealsCate('${arr[i].strCategory}')">
                        <img src="${arr[i].strCategoryThumb}" class="w-100 rounded-3" alt="">
                        <div class="layer position-absolute w-100 h-100 rounded-3 text-center">
                            <h3>${arr[i].strCategory}</h3>
                            <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                    </div>
                </div>
        `
    }
    document.querySelector('.Search').innerHTML = "";
    document.querySelector('.mainMeals').innerHTML = container;
}

async function getMealsCate(cate){
    $('.loading').fadeIn(500)
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cate}`)
    let finalRes =await result.json()
    displayMeals(finalRes.meals)
    $('.loading').fadeOut(500)
    $('.cards').click((e)=>{
        console.log($(e.target).data('id'));
        let id =$(e.target).data('id');
        getDetails(id)
    })
}

$('#cate').click(()=>{
    getCategories();
    closeNav()
})

async function getArea(){
    $('.loading').fadeIn(500)
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=`)
    let finalRes =await result.json()
    displayArea(finalRes.meals)
    $('.loading').fadeOut(500)
}

function displayArea(arr){
    let container="";
    for(let i =0 ;i<arr.length;i++){
        container+=`
                <div class="col-md-3 text-white text-center">
                    <div class="img rounded-3" onclick="getMealsArea('${arr[i].strArea}')">
                        <i class="fa-solid fa-house-laptop fa-4x d-flex justify-content-center align-items-center Area"></i>
                        <h3>${arr[i].strArea}</h3>
                    </div>
                </div>
        `
    }
    document.querySelector('.Search').innerHTML = "";
    document.querySelector('.mainMeals').innerHTML = container;
}
//  $('body').click(()=>{
//     getMealsArea
//  })
async function getMealsArea(area){
    $('.loading').fadeIn(500)
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let finalRes =await result.json()
    // console.log(finalRes);
    displayMeals(finalRes.meals)
    $('.loading').fadeOut(500)
    $('.cards').click((e)=>{
        let id =$(e.target).data('id');
        getDetails(id)
    })
}

$('#area').click(()=>{
    getArea();
    closeNav()
})


async function getIngredients(){
    $('.loading').fadeIn(500)
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let finalRes =await result.json()
    displayIngredients(finalRes.meals)
    $('.loading').fadeOut(500)
}
function displayIngredients(arr){
    let container ="";
    for (let i = 0; i < 20; i++) {
        container+=`
                <div class="col-md-3 text-white text-center">
                    <div class="img rounded-3 position-relative" onclick="getMealsIng('${arr[i].strIngredient}')">
                        <i class="fa-solid fa-drumstick-bite fa-4x d-flex justify-content-center align-items-center Area"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        `
        
    }
    document.querySelector('.Search').innerHTML = "";
    document.querySelector('.mainMeals').innerHTML = container;
}

async function getMealsIng(Ing){
    $('.loading').fadeIn(500)
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ing}`)
    let finalRes =await result.json()
    displayMeals(finalRes.meals)
    $('.loading').fadeOut(500)
    $('.cards').click((e)=>{
        let id =$(e.target).data('id');
        getDetails(id)
    })
}
$('#ing').click(()=>{
    getIngredients();
    closeNav();
})

function showSearchInp(){
    container =`
    <div class="row g-4  py-5">
            <div class="col-md-6">
                    <input id="SearchByName" type="text" class="form-control bg-transparent text-white" placeholder="Search by name">
                </div>
                <div class="col-md-6">
                    <input id="SearchByLetter" type="text" class="form-control bg-transparent text-white" placeholder="Search by letter">
                </div>
            </div>
    `
    document.querySelector('.Search').innerHTML = container;
    document.querySelector('.mainMeals').innerHTML = "";
}

async function SearchByName(name){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let finalRes =await result.json()
    // console.log(finalRes);
    displayMeals(finalRes.meals)
    $('.cards').click((e)=>{
        console.log($(e.target).data('id'));
        let id =$(e.target).data('id');
        getDetails(id)
    })
}
async function SearchByLetter(letter){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let finalRes =await result.json()
    displayMeals(finalRes.meals)
    $('.cards').click((e)=>{
        console.log($(e.target).data('id'));
        let id =$(e.target).data('id');
        getDetails(id)
    })
}
$('#search').click(()=>{
    showSearchInp()
    closeNav();
    $('#SearchByName').keyup(function(){
       let res = document.querySelector('#SearchByName').value;
       SearchByName(res)
    })
    $('#SearchByLetter').keyup(()=>{
        let res = document.querySelector('#SearchByLetter').value;
        SearchByLetter(res)
    })
})

function displaycontact(){
    let container = `
        <div class="col-md-6">
                                <input id="nameInput" onkeyup="validateNameInp()" type="text" class="form-control" placeholder="Enter Your Name">
                                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Special characters and numbers not allowed
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="emailInput" onkeyup="validateEmailInput()" type="email" class="form-control " placeholder="Enter Your Email">
                                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Email not valid *exemple@yyy.zzz
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="phoneInput" onkeyup="validatePhoneInput()" type="text" class="form-control " placeholder="Enter Your Phone">
                                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid Phone Number
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="ageInput" onkeyup="validateAgeInp()" type="number" class="form-control " placeholder="Enter Your Age">
                                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid age
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input  id="passwordInput" onkeyup="validatePasswordInp()" type="password" class="form-control " placeholder="Enter Your Password">
                                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input  id="repasswordInput" onkeyup="validateRepasswordInp()" type="password" class="form-control " placeholder="Repassword">
                                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid repassword 
                                </div>
                            </div>
                        </div>
                        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button> 
    `
    document.querySelector('.Search').innerHTML = "";
    document.querySelector('.mainMeals').innerHTML = container;
}


function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

function validateNameInp(){
    if (nameValidation()) {
        document.getElementById("nameAlert").classList.replace("d-block", "d-none")

    } else {
        document.getElementById("nameAlert").classList.replace("d-none", "d-block")

    }
    btnToggle()
}
function validateEmailInput(){
    
    if (emailValidation()) {
        document.getElementById("emailAlert").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("emailAlert").classList.replace("d-none", "d-block")

    }
    btnToggle()
}
function validatePhoneInput(){
    if (phoneValidation()) {
        document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

    }
    btnToggle()
}
function validateAgeInp(){
    if (ageValidation()) {
        document.getElementById("ageAlert").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("ageAlert").classList.replace("d-none", "d-block")

    }
    btnToggle()
}
function validatePasswordInp(){
    if (passwordValidation()) {
        document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

    }
    btnToggle()
}
function validateRepasswordInp(){
    if (repasswordValidation()) {
        document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
    }
    btnToggle()
}
function btnToggle(){
    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
            document.getElementById("submitBtn").removeAttribute("disabled")
            document.getElementById("submitBtn").addEventListener("click" ,()=>{
                document.getElementById("nameInput").value = ""
                document.getElementById("emailInput").value = ""
                document.getElementById("phoneInput").value = ""
                document.getElementById("ageInput").value = ""
                document.getElementById("passwordInput").value = ""
                document.getElementById("repasswordInput").value = ""
            })
    } else {
        document.getElementById("submitBtn").setAttribute("disabled", true)
    }
    
}
$('#contact').click(()=>{
    $('.loading').fadeIn(500)
    displaycontact()
    $('.loading').fadeOut(500)
    closeNav()
})

