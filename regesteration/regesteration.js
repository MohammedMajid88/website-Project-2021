const submit = document.querySelector("#submit");
const firstName = document.querySelector("#firstN");
const lastName = document.querySelector("#lastN");
const email = document.querySelector("#email");
const password = document.querySelector("#password");


  

console.log(submit.vlaue)
submit.addEventListener("click", function (e) {
  e.preventDefault();

  console.log(firstName.vlaue)
  console.log(lastName.vlaue)
  console.log(password.vlaue)
  console.log(email.vlaue)

  dataForm = {

    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value
  }


  const option = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataForm),
  }


  fetch("http://localhost:3000/register", option)
    .then(res => res.json())
    .then(result => {
      console.log(result)

      //  localStorage.token = result.token;
      localStorage.setItem("token",result.token);
      // localStorage.setItem('token', result.token);
      window.location.href = "../index.html"
    })


 










})


