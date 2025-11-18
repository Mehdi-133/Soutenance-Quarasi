
const newWorker = document.getElementById("add-btn");
const form = document.querySelector(".form");
const addList = document.getElementById("addList");
const plus = document.querySelectorAll(".plus");
const remove = document.getElementById("remove");
const canceled = document.getElementById("canceled");
const submit = document.getElementById("submit");
const inputName = document.getElementById("inputName");
const inputEmail = document.getElementById("inputEmail");
const inputPhone = document.getElementById("inputPhone");
const inputRole = document.getElementById("role");
const inputexp = document.getElementById("experience");
const waitList = document.getElementById("list");
const details = document.getElementById('details');
const detailsBtn = document.getElementById("detailsBtn")

let storedData = [];


canceled.addEventListener("click", () => {
  form.style.display = "none";
});

plus.forEach((btn) => {
  btn.addEventListener("click", () => {
    addList.style.display = "flex";
  });
});

remove.addEventListener("click", () => {
  addList.style.display = "none";
});

newWorker.addEventListener("click", () => {
  form.style.display = "flex";
});

submit.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    inputName.value === "" ||
    inputEmail.value === "" ||
    inputPhone.value === "" ||
    inputRole.value === ""  
  ) {
    alert("Submission refused: Please fill all fields");
    return;
  }

  const newUser = {
    name: inputName.value,
    role: inputRole.value,
    email: inputEmail.value,
    phone: inputPhone.value,
    experience: inputexp.value,
    
  };

  storedData.push(newUser);

  form.reset();
  form.style.display = "none"; 
  alert("Submission accepted!");
  

  display(); 
});

detailsBtn.addEventListener("click", ()=>{
  details.style.display = "block"

})



function display() {


   waitList.innerHTML = ""
  if (storedData.length === 0) {
    waitList.textContent = "No workers yet";
    return;
  }


  storedData.forEach((person) => {
 
    const card = document.createElement("div"); 

    card.style.border = "1px solid #e11d74";
    card.style.borderRadius = "10px"
    card.style.padding = "10px 15px";
    card.style.marginBottom = "10px";
    
    const info = document.createElement("p");
    info.textContent = `Name: ${person.name}`; 

    const description = document.createElement("p");
    description.textContent = `Role: ${person.role}`; 

    card.appendChild(info);
    card.appendChild(description);
    waitList.appendChild(card);
  });
}

display();

