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
const inputPhoto = document.getElementById("photo");
const inputexp = document.getElementById("experience");
const inputJob = document.getElementById("expTitle");
const inputCompany = document.getElementById("expCompany");
const inputStart = document.getElementById("expStart");
const inputEnd = document.getElementById("expEnd");

const waitList = document.getElementById("list");
const details = document.getElementById("details");
const detailsBtn = document.getElementById("detailsBtn");
const globalInfo = document.getElementById("globalInfo");
const closeInfo = document.getElementById("closeInfo");

let storedData = [];

canceled.addEventListener("click", () => {
  form.style.display = "none";
});

remove.addEventListener("click", () => {
  addList.style.display = "none";
});

newWorker.addEventListener("click", () => {
  form.style.display = "flex";
});

closeInfo.addEventListener("click", () => {
  globalInfo.style.display = "none";
});

plus.forEach((btn) => {
  btn.addEventListener("click", () => {
    addList.style.display = "flex";
    console.log("btn", btn.dataset.zone);
    const selectedWorker = storedData.filter(
      (worker) => worker.zone === null || !worker.zone.includes()
    );
    console.log(selectedWorker);
  });
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
    job: inputJob.value,
    company: inputCompany.value,
    startDate: inputStart.value,
    endDate: inputEnd.value,
    photo: inputPhoto.value,
    zone: null,
  };

  storedData.push(newUser);

  form.reset();
  form.style.display = "none";
  alert("Submission accepted!");

  display();
});

detailsBtn.addEventListener("click", () => {
  details.style.display = "block";
});

function display() {
  waitList.innerHTML = " ";
  if (storedData.length === 0) {
    waitList.textContent = "No workers yet";
    return;
  }

  storedData.forEach((person) => {
    const card = document.createElement("div");
    card.style.border = "1px solid #e11d74";
    card.style.borderRadius = "10px";
    card.style.padding = "10px 15px";
    card.style.marginBottom = "10px";

    const image = document.createElement("div");
    image.style.borderRadius = "50%";
    image.style.width = "30px";
    image.style.height = "30px";
    image.style.objectFit = "cover";
    image.src = person.photo;
    const info = document.createElement("p");
    info.textContent = `Name: ${person.name}`;

    const description = document.createElement("p");
    description.textContent = `Role: ${person.role}`;

    card.appendChild(image);
    card.appendChild(info);
    card.appendChild(description);
    waitList.appendChild(card);

    card.addEventListener("click", () => {
      showInfo(person);
    });
  });
}

function showInfo(person) {
  globalInfo.style.display = "block";

  document.getElementById("viewphoto").src = person.photo
  document.getElementById("viewName").textContent = `Name: ${person.name}`;
  document.getElementById("viewRole").textContent = `Role: ${person.role}`;
  document.getElementById("viewEmail").textContent = `Email: ${person.email}`;
  document.getElementById("viewPhone").textContent = `Phone: ${person.phone}`;
  document.getElementById("viewCompany").textContent = `Company: ${person.company}`;
  document.getElementById("viewStart").textContent = `Start Date: ${person.startDate}`;
  document.getElementById("viewEnd").textContent = `End Date: ${person.endDate}`;
  document.getElementById("viewTitle").textContent = `Job Title: ${person.job}`;
}
display();
