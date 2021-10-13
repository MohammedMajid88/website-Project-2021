const submit = document.querySelector("#submit");
const firstName = document.querySelector("#firstName");
const password = document.querySelector("#password");





console.log(submit.vlaue)
submit.addEventListener("click", function (e) {
  e.preventDefault();

  console.log(firstName.vlaue)
  console.log(password.vlaue)
  

  dataForm = {

    firstName: firstName.value,
    password: password.value
  }


  const option = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataForm),
  }


  fetch("http://localhost:3000/login", option)
    .then(res => res.json())
    .then(result => {
      console.log(result)

      //  localStorage.token = result.token;
      localStorage.setItem("token",result.token);
      // localStorage.setItem('token', result.token);
      window.location.href = "../index.html"
    })


 










})


