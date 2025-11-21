const newWorker = document.getElementById("add-btn");
const form = document.querySelector(".form");
const addList = document.getElementById("addList");
const assignList = document.getElementById("assignList");
const plus = document.querySelectorAll(".plus");
const remove = document.getElementById("remove");
const canceled = document.getElementById("canceled");
const submit = document.getElementById("submit");
const inputName = document.getElementById("inputName");
const inputEmail = document.getElementById("inputEmail");
const inputPhone = document.getElementById("inputPhone");
const inputRole = document.getElementById("role");
const inputPhoto = document.getElementById("photo");
// const inputexp = document.getElementById("experience");
const inputJob = document.getElementById("expTitle");
const inputCompany = document.getElementById("expCompany");
const inputStart = document.getElementById("expStart");
const inputEnd = document.getElementById("expEnd");
const waitList = document.getElementById("list");
const details = document.getElementById("details");
const detailsBtn = document.getElementById("detailsBtn");
const globalInfo = document.getElementById("globalInfo");
const closeInfo = document.getElementById("closeInfo");
const rooms = document.querySelectorAll(".rooms");

let storedData = [];

const check = {
  reception: ["receptionnistes", "manager" , "netoyage"],
  server: ["techniciens", "manager", "netoyage"],
  security: ["security", "manager" , "netoyage"],
  stuff: [
    "manager",
    "techniciens",
    "receptionnistes",
    "security",
    "netoyage",
    "cme",
  ],
  conference: [
    "manager",
    "techniciens",
    "receptionnistes",
    "security",
    "netoyage",
    "cme",
  ],
  archive: ["manager"],
};

const limit = {
  reception: 2,
  archive: 2,
  stuff: 10,
  server: 2,
  conference: 5,
  security: 1,
};

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
    assignList.innerHTML = "";

    const zoneName = btn.getAttribute("data-zone");
    console.log(zoneName);

    addList.style.display = "flex";

    const selectedWorkers = storedData.filter((worker) => {
      const role = worker.role.toLowerCase();
      const zone = zoneName.toLowerCase();
      const allowedRoles = check[zone];
      // if (!allowedRoles) return true;
      if (role === "manager") return true;
      if (role === "netoyage" && zone !== "archive") return true;
      return allowedRoles.includes(role);
    });

    selectedWorkers.forEach((worker) => {
      const listItem = document.createElement("div");
      listItem.className = "assign-card";

      const image = document.createElement("img");
      image.className = "assign-card-photo";
      image.src = worker.photo;

      const text = document.createElement("span");
      text.className = "assign-card-name";
      text.textContent = `${worker.name} (${worker.role})`;

      listItem.appendChild(image);
      listItem.appendChild(text);
      assignList.appendChild(listItem);

      listItem.addEventListener("click", () => {
        const roomCard = document.createElement("div");
        roomCard.className = "assign-card";

        const removeCard = document.createElement("button");
        removeCard.textContent = "×";
        removeCard.className = "remove-Btn";

        const img = document.createElement("img");
        img.className = "assign-card-photo";
        img.src = worker.photo;

        const nameText = document.createElement("span");
        nameText.className = "assign-card-name";
        nameText.textContent = `${worker.name} (${worker.role})`;

        roomCard.appendChild(img);
        roomCard.appendChild(nameText);
        roomCard.appendChild(removeCard);

        let targetRoom = null;
        rooms.forEach((room) => {
          if (room.getAttribute("data-room") === zoneName) {
            targetRoom = room;
          }
        });

        const assignedCards = targetRoom.querySelectorAll(".assign-card");
        if (assignedCards.length >= limit[zoneName]) {
          alert(
            `Limit reached: Only ${limit[zoneName]} workers allowed in ${zoneName}`
          );
          return;
        }

        console.log(targetRoom);
        const empty = targetRoom.querySelector(".nothing");
        if (empty) empty.style.display = "none";
        console.log(empty);
        targetRoom.appendChild(roomCard);

        storedData = storedData.filter((w) => w.id !== worker.id);
        display();
        addList.style.display = "none";

        removeCard.addEventListener("click", () => {
          roomCard.remove();
          storedData.push(worker);
          display();

          const stillCards = targetRoom.querySelectorAll(".assign-card");
          if (stillCards.length === 0 && empty) {
            empty.style.display = "block";
          }
        });
      });
    });
  });
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^(?:\+212|0)([ \-]?\d){9}$/.test(phone);
}

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

  if (!validateEmail(inputEmail.value)) {
    inputEmail.style.border = "2px solid red";
    return;
  }

  if (!validatePhone(inputPhone.value)) {
    inputPhone.style.border = "2px solid red";
    return;
  }

  const newUser = {
    id: Date.now(),
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
  waitList.innerHTML = "";
  if (storedData.length === 0) {
    waitList.textContent = "No workers yet";
    return;
  }

  storedData.forEach((person) => {
    const card = document.createElement("div");
    card.className = "worker-card";

    const removeBtn = document.createElement("button");
    removeBtn.className = "worker-remove-btn";
    removeBtn.textContent = "×";

    const image = document.createElement("img");
    image.className = "worker-photo";
    image.src = person.photo;

    const infoWrapper = document.createElement("div");
    infoWrapper.className = "worker-info";

    const name = document.createElement("span");
    name.textContent = person.name;

    const role = document.createElement("span");
    role.style.color = "#666";
    role.textContent = person.role;

    infoWrapper.appendChild(name);
    infoWrapper.appendChild(role);

    card.appendChild(removeBtn);
    card.appendChild(image);
    card.appendChild(infoWrapper);
    waitList.appendChild(card);

    card.addEventListener("click", () => showInfo(person));

    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const indexToRemove = storedData.findIndex(
        // (worker) => worker.email === person.email
        (worker) => worker.id === person.id
      );
      if (indexToRemove > -1) {
        storedData.splice(indexToRemove, 1);
        display();
      }
    });
  });
}

display();

function showInfo(person) {
  globalInfo.style.display = "block";

  document.getElementById("viewphoto").src = person.photo;
  document.getElementById("viewName").textContent = `Name: ${person.name}`;
  document.getElementById("viewRole").textContent = `Role: ${person.role}`;
  document.getElementById("viewEmail").textContent = `Email: ${person.email}`;
  document.getElementById("viewPhone").textContent = `Phone: ${person.phone}`;
  document.getElementById(
    "viewCompany"
  ).textContent = `Company: ${person.company}`;
  document.getElementById(
    "viewStart"
  ).textContent = `Start Date: ${person.startDate}`;
  document.getElementById(
    "viewEnd"
  ).textContent = `End Date: ${person.endDate}`;
  document.getElementById("viewTitle").textContent = `Job Title: ${person.job}`;
}
display();
