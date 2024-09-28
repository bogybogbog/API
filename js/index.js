/*
 var container = document.querySelector(".container");
 console.log(container.children); // ====> HTMLCollection [p,p,p] ===> tags only
 console.log(container.childNodes); // =====> NodeList [text,p,text,p,text,p,text] ===> tags, text, spaces, anyshit
 console.log(container.children[1].children[0]);
 console.log(container.nextElementSibling);
 console.log(container.nextSibling);
 console.log(container.parentElement);
 console.log(container.parentNode);
 console.log(container.previousElementSibling);
*/
// !              HTMLCollection                                NodeList
// ?            getElementByTagName()                        querySelectorAll()
// ?        changes the elements "live"                doesnt change the element

//  ANCHOR - API ====> Applacataion programming interface.   solving secutity and diff programming langauges "JSON" ==> [{},{},{}]
// * "JSON", every programming lang can understand it and it can transfer the data between the clint and DB fast
// ! API ====> baseURL + Endpoint

//==================================================================================//
// ! AJAX =====> Asyncrounous Javascript And Xml
// ActiveXObject ====> same as XMLHttpRequest but it reloads the bage
// XMLHttpRequest ====>   1- update a web page without reloading the page
//                        2- request data from a server - after the page has loaded
//                        3- receive data from a server - after the page has loaded
//                        4- send data to a server - in the background

// var http = new XMLHttpRequest(); // creat an object has all the functions in XMLHttpRequest()
// http.open(method,API) // open a connection between the clint and DB, and it takes 2 parameters
//                                                       !  the first one is a method:
//                                                          1- GET    ===> get data
//                                                          2- PUT    ===> update data
//                                                          3- POST   ===> send data
//                                                          4- DELETE ===>  delete data
//                                                          5- PATCH  ===>  update "but not all the data"  not recommended
//                                                       !  the second one is a API:
// http.open("GET", "https://ecommerce.routemisr.com/api/v1/categories");
// http.send(); // send request to DB
// console.log(http.response); // here we wont see anythig in console cuz open() and send() takes time,
//                           so JS let them and complete the code so we have to make JS wait for it like this:
// http.addEventListener("load", function(){
//     console.log(JSON.parse(http.response)) // convert it to JSON [{},{},...]
// })

// http.readyState; // status of request ===> 0 ==> connection not init
//                                        1 ==> connection establish
//                                        2 ==> request received
//                                        3 ==> request proccessing
//                                        4 ==> request finished and data is ready
// http.addEventListener("readystatechange", function () {
//   if (http.readyState == 4) {
//     console.log(JSON.parse(http.response));
//   }
// });
// http.addEventListener("error", function () {
//   alert("error");
// });

//TODO                Excution Stack                            Web API                              Message Queue
/**
 * !                  sync functions                         Async functions                        who finishes first
 * !                 global variables                          setInterval                         at 'Web API' comes
 * !                                                           setTimeOut                              here first
 * !                                                             events
 *
 * ?                    AND THEN THERE IS CONNECTION BETWEEN "EXCUTION STACK" AND "MESSAGE QUEUE" CALLED `EVENT LOOP`
 * ?                              TAKES THE FIRST ONES IN "MESSAGE QUEUE" AND PUT IT IN "EXCUTION STACK"
 */

/**
 * *  if u wanna control who will be the first and the second... there r 3 ways:
 * ?  1- callback
 * ?  2- promise
 * ?  3- async wait & fetch
 */

//// ! CALLBACK :

/*
function one(x) {
  console.log("one");
  x();
}
function two(y) {
  console.log("two");
  y();
}

function three(z) {
  console.log("three");
  z();
}

function four(w) {
  console.log("four");
  w();
}
function final() {
  console.log("final");
}

one(function () {
  two(function () {
    three(function () {
      four(final);
    });
  });
});

 */
/**
 * try {
  var x = 10;
  console.log(x);
  throw new Error("data is not here");
} catch (error) {
  alert(error);
}finally{
  console.log("hiii");
  
}
 */

//// ! PROMISE & ASYNC AWAIT AND FETCH:
// *  promise status: pending - fulfill - rejected
var meals = [];
async function getRecipe(meal) {
  //// ! ASYNC AWAIT AND FETCH:
  try {
    var res = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${meal}`,
      {
        method: "GET", cache: "default"
      }
    ); // the default value is GET so no need to write it
    var data = await res.json();
    // console.log(meal, data.recipes);
    meals = data.recipes;
    console.log(meals);
    display(meals);
  } catch (err) {
    document.getElementById(
      "row"
    ).innerHTML = `<div class="vh-100 d-flex justify-content-center align-items-center">
          <h1 class="alert alert-danger">there is error connection</h1>
        </div>`;
  }

  /**
 *   .then(function (res) {
    return res.json();
  })
  the parametar "res" is the info of the api & res.json() takes time so it will be pending if we console.log(res.json())
  .then(function (data) {
    console.log("pizza", data.recipes); // the parametar "data" is what the previous then() has returned "return res.json()"
  });
 */

  //// ! PROMISE:

  /**
  *  return new Promise(function (resolved, rejected) {
    var http = new XMLHttpRequest();
    http.open("GET", "https://forkify-api.herokuapp.com/api/search?q=pizza");
    http.send();
    http.addEventListener("load", function () {
      console.log("pizza", JSON.parse(http.response).recipes);
      resolved();
    });
    http.addEventListener("error", function () {
      rejected("pizza errrrrrrrrr");
    });
  });
  */
}
getRecipe("pizza");

function display(arr) {
  var cartona = "";
  for (var i = 0; i < arr.length; i++) {
    cartona += `        
    <div class="col-md-2">
        <div class="meal">
            <h2 class="fs-6 text-center">${arr[i].title
              .split(" ")
              .slice(0, 2)
              .join(" ")}</h2>
            <img src="${arr[i].image_url}" alt="">
        </div>
    </div>`;
  }
  document.getElementById("row").innerHTML = cartona;
}
// async function getBeef() {
//// ! ASYNC AWAIT AND FETCH:
//   var res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=beef`);
//   var data = await res.json();
//   console.log("beef", data.recipes);

//   /**
//  *     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       console.log("beef", data.recipes);
//     });
//  */

//// ! PROMISE:
//   /**
//  *   return new Promise(function (resolved, rejected) {
//     var http = new XMLHttpRequest();
//     http.open("GET", "https://forkify-api.herokuapp.com/api/search?q=beef");
//     http.send();
//     http.addEventListener("load", function () {
//       console.log("beef", JSON.parse(http.response).recipes);
//       resolved();
//     });
//     http.addEventListener("error", function () {
//       alert("not found");
//       rejected("beef errrrrrrr");
//     });
//   });
// */
// }

// async function getPasta() {
//// ! ASYNC AWAIT AND FETCH:
//   var res = await fetch(
//     `https://forkify-api.herokuapp.com/api/search?q=pasta`,
//     {
//       method: "GET",
//     }
//   );
//   var data = await res.json();
//   console.log("pasta", data.recipes);
//   /**
//    *     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       console.log("pasta", data.recipes);
//     });
//    */

//// ! PROMISE:
//   /**
//    *   return new Promise(function (resolved, rejected) {
//     var http = new XMLHttpRequest();
//     http.open("GET", "https://forkify-api.herokuapp.com/api/search?q=pasta");
//     http.send();
//     http.addEventListener("load", function () {
//       console.log("pasta", JSON.parse(http.response).recipes);
//       resolved();
//     });
//     http.addEventListener("error", function () {
//       alert("not found");
//       rejected("pasta errrrrrrrrrr");
//     });
//   });
//    */
// }
// async function arrange() {
//   await getBeef();
//   await getPizza();
//   getPasta();
// }
// arrange();
// getPizza()
//   .then(function () {
//     return getBeef();
//   })
//   .then(getPasta)
//   .catch(function (msg) {
//     console.log(msg);
//   })
//   .finally(function () { // doing the good if the then is ok and even there is an error
//     console.log("funallyy");
//   });
// getBeef().then(getPasta().then(getPizza));

/**
 * function one() {
  return new Promise(function (resolved, rejected) {
    console.log("one");
    var error = true;
    if (error == true) {
      resolved();
    } else rejected();
  });
}
function two() {
  return new Promise(function (resolved) {
    console.log("two");
    resolved();
  });
}

function three() {
  return new Promise(function (resolved) {
    console.log("three");
    resolved();
  });
}

function four() {
  return new Promise(function (resolved) {
    console.log("four");
    resolved();
  });
}
function final() {
  console.log("final");
}

one()
  .then(function () {
    return three();
  }) // callback = function(){ return three() }
  .then(function () {
    return four();
  }) // callback = function(){ return four() }
  .then(two)
  .catch(function () {
    console.log("errrrr");
  });
 Promise.all([one, three, four]).then(function(){console.log("aaa");
 })
one().then(two().then(four().then(three)));
 */
