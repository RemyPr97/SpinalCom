document.addEventListener("DOMContentLoaded", function () {
  populateBuildingList();
  setupSearch();
  setupFloorSearch();
  setupRoomSearch();
});

const mockBuildings = [
  {
    name: "Bâtiment A",
    floors: [
      { name: "RDC", occupancyRate: 50 },
      { name: "Etage 1", occupancyRate: 45 },
      { name: "Etage 2", occupancyRate: 100 },
    ],
  },
  {
    name: "Bâtiment B",
    floors: [
      { name: "RDC", occupancyRate: 86 },
      { name: "Etage 4", occupancyRate: 52 },
      { name: "Etage 2", occupancyRate: 59 },
    ],
  },
  {
    name: "Bâtiment C",
    floors: [
      { name: "RDC", occupancyRate: 67 },
      { name: "Etage 7", occupancyRate: 31 },
      { name: "Etage 2", occupancyRate: 22 },
    ],
  },
  {
    name: "Tour A",
    floors: [
      { name: "RDC", occupancyRate: 45 },
      { name: "Etage 1", occupancyRate: 69 },
      { name: "Etage 3", occupancyRate: 96 },
    ],
  },
  {
    name: "Edifice A",
    floors: [
      { name: "RDC", occupancyRate: 14 },
      { name: "Etage 8", occupancyRate: 28 },
      { name: "Etage 2", occupancyRate: 98 },
    ],
  },
];

const mockBuildingData = {
  "Bâtiment A": {
    RDC: [
      { name: "Chambre", status: "OCCUPE" },
      { name: "Salon", status: "LIBRE" },
      { name: "WC", status: "INCONNU" },
    ],
    "Etage 1": [
      { name: "Salon 2", status: "OCCUPE" },
      { name: "Salon", status: "LIBRE" },
      { name: "Cuisine", status: "INCONNU" },
    ],
    "Etage 2": [
      { name: "Salle de bain", status: "OCCUPE" },
      { name: "Remise", status: "LIBRE" },
      { name: "Bloc électrique", status: "INCONNU" },
    ],
  },

  "Bâtiment B": {
    RDC: [
      { name: "Chambre", status: "OCCUPE" },
      { name: "Salon", status: "LIBRE" },
      { name: "WC", status: "INCONNU" },
    ],
    "Etage 4": [
      { name: "Salon 2", status: "OCCUPE" },
      { name: "Salon", status: "LIBRE" },
      { name: "Cuisine", status: "INCONNU" },
    ],
    "Etage 2": [
      { name: "Salle de bain", status: "OCCUPE" },
      { name: "Remise", status: "LIBRE" },
      { name: "Bloc électrique", status: "INCONNU" },
    ],
  },

  "Bâtiment C": {
    RDC: [
      { name: "Chambre", status: "OCCUPE" },
      { name: "Salon", status: "LIBRE" },
      { name: "WC", status: "INCONNU" },
    ],
    "Etage 7": [
      { name: "Salon 2", status: "OCCUPE" },
      { name: "Salon", status: "LIBRE" },
      { name: "Cuisine", status: "INCONNU" },
    ],
    "Etage 2": [
      { name: "Salle de bain", status: "OCCUPE" },
      { name: "Remise", status: "LIBRE" },
      { name: "Bloc électrique", status: "INCONNU" },
    ],
  },

  "Tour A": {
    RDC: [
      { name: "Chambre", status: "OCCUPE" },
      { name: "Salon", status: "LIBRE" },
      { name: "WC", status: "INCONNU" },
    ],
    "Etage 1": [
      { name: "Salon 2", status: "OCCUPE" },
      { name: "Salon", status: "LIBRE" },
      { name: "Cuisine", status: "INCONNU" },
    ],
    "Etage 3": [
      { name: "Salle de bain", status: "OCCUPE" },
      { name: "Remise", status: "LIBRE" },
      { name: "Bloc électrique", status: "INCONNU" },
    ],
  },

  "Edifice A": {
    RDC: [
      { name: "Chambre", status: "OCCUPE" },
      { name: "Salon", status: "LIBRE" },
      { name: "WC", status: "INCONNU" },
    ],
    "Etage 8": [
      { name: "Salon 2", status: "OCCUPE" },
      { name: "Salon", status: "LIBRE" },
      { name: "Cuisine", status: "INCONNU" },
    ],
    "Etage 2": [
      { name: "Salle de bain", status: "OCCUPE" },
      { name: "Remise", status: "LIBRE" },
      { name: "Bloc électrique", status: "INCONNU" },
    ],
  },
};

document
  .getElementById("addFloorButton")
  .addEventListener("click", function () {
    const floorName = prompt("Entrez le nom de l'étage :");
    if (!floorName) return;

    const occupancyRate = prompt("Entrez le taux d'occupation (%) :");
    if (
      !occupancyRate ||
      isNaN(occupancyRate) ||
      occupancyRate < 0 ||
      occupancyRate > 100
    ) {
      alert("Veuillez entrer un taux d'occupation valide entre 0 et 100.");
      return;
    }
    const floorList = document.getElementById("floorList");
    const floorItem = document.createElement("li");
    floorItem.textContent = `${floorName} - ${occupancyRate}% d'occupation`;
    floorList.appendChild(floorItem);
  });

function populateFloorList(building) {
  const floorList = document.getElementById("floorList");
  floorList.innerHTML = "";

  building.floors.forEach((floor) => {
    const floorItem = document.createElement("li");
    floorItem.textContent = `${floor.name} - ${floor.occupancyRate}% d'occupation`;
    floorItem.addEventListener("click", () => {
      populateRoomList(floor.name, building.name);
    });
    floorList.appendChild(floorItem);
  });
}

function populateBuildingList() {
  const list = document.getElementById("buildingList");
  list.innerHTML = "";

  mockBuildings.forEach((building) => {
    const listItem = document.createElement("li");
    listItem.textContent = building.name;
    listItem.onclick = () => {
      document.getElementById("roomList").innerHTML = "";
      document.getElementById("floorName").textContent =
        "Sélectionnez un étage";
      document.getElementById(
        "buildingName"
      ).textContent = `Occupation du bâtiment : ${building.name}`;
      populateFloorList(building);
    };
    list.appendChild(listItem);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  populateBuildingList();
});

function setupSearch() {
  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("input", function (e) {
    const term = e.target.value.toLowerCase();
    const buildings = document.querySelectorAll("#buildingList li");
    buildings.forEach((building) => {
      const name = building.textContent.toLowerCase();
      building.style.display = name.includes(term) ? "" : "none";
    });
  });
}

function setupRoomSearch() {
  const searchInput = document.getElementById("searchRoom");
  searchInput.addEventListener("input", function (e) {
    const term = e.target.value.toLowerCase();
    const rooms = document.querySelectorAll("#roomList li");
    rooms.forEach((room) => {
      const isVisible = room.textContent.toLowerCase().includes(term);
      room.style.display = isVisible ? "" : "none";
    });
  });
}

function setupFloorSearch() {
  const searchInput = document.getElementById("searchFloor");
  searchInput.addEventListener("input", function (e) {
    const term = e.target.value.toLowerCase();
    const floors = document.querySelectorAll("#floorList li");
    floors.forEach((floor) => {
      const isVisible = floor.textContent.toLowerCase().includes(term);
      floor.style.display = isVisible ? "" : "none";
    });
  });
}

function populateRoomList(floorName, buildingName) {
  const roomList = document.getElementById("roomList");
  roomList.innerHTML = "";

  const rooms = mockBuildingData[buildingName][floorName];
  rooms.forEach((room) => {
    const roomItem = document.createElement("li");
    const statusClass = room.status.toLowerCase();
    roomItem.classList.add(statusClass);
    roomItem.textContent = `${room.name} - ${room.status}`;
    roomList.appendChild(roomItem);
  });

  const addRoomButton = document.getElementById("addRoomButton");
  addRoomButton.onclick = () => addRoom(floorName, buildingName);
}

function addBuilding() {
  const buildingName = prompt("Entrez le nom du nouveau bâtiment :");
  if (buildingName) {
    mockBuildings.push(buildingName);
    const listItem = document.createElement("li");
    listItem.textContent = buildingName;
    document.getElementById("buildingList").appendChild(listItem);
  }
}

function addRoom(floorName, buildingName) {
  const roomName = prompt("Entrez le nom de la pièce :");
  if (!roomName) return;

  const status = prompt(
    "Entrez le statut de la pièce (OCCUPE, LIBRE, INCONNU) :"
  );
  if (
    !status ||
    (status.toLowerCase() !== "OCCUPE" &&
      status.toLowerCase() !== "LIBRE" &&
      status.toLowerCase() !== "INCONNU")
  ) {
    alert("Veuillez entrer un statut valide (OCCUPE, LIBRE, INCONNU).");
    return;
  }

  const newRoom = { name: roomName, status: status.toUpperCase() };
  if (!mockBuildingData[buildingName][floorName]) {
    mockBuildingData[buildingName][floorName] = [];
  }
  mockBuildingData[buildingName][floorName].push(newRoom);

  populateRoomList(floorName, buildingName);
}

document.getElementById("addRoomButton").addEventListener("click", () => {
  const selectedBuildingName = document
    .getElementById("buildingName")
    .textContent.replace("Occupation du bâtiment : ", "");
  const selectedFloorName = document.getElementById("floorName").textContent;

  addRoom(selectedFloorName, selectedBuildingName);
});

document
  .getElementById("addBuildingButton")
  .addEventListener("click", addBuilding);
