import { world1 } from "./worlds.js";

const tileGrid = document.querySelector(".blocks");
const axe = document.querySelector(".axe");
const pickaxe = document.querySelector(".pickaxe");
const shovel = document.querySelector(".shovel");
const inventoryButton = document.querySelector(".inventory");
const save = document.querySelector(".save");
const reset = document.querySelector(".reset");
const load = document.querySelector(".load");

let currTool;
let inventory = [];
let removedFromInventory;

const background = {
  tool: "tool",
  class: "class",
};

const dirt = {
  tool: "shovel",
  class: "dirt",
};

const dirtGrass = {
  tool: "shovel",
  class: "dirt-grass",
};

const sand = {
  tool: "shovel",
  class: "sand",
};

const stone = {
  tool: "pickaxe",
  class: "stone",
};

const wood = {
  tool: "axe",
  class: "tree",
};

const leaf = {
  tool: "axe",
  class: "leaf",
};

const cloud = {
  tool: "tool",
  class: "cloud",
};

function numToTile(num) {
  switch (num) {
    case 0:
      return background;
    case 1:
      return dirt;
    case 2:
      return dirtGrass;
    case 3:
      return wood;
    case 4:
      return leaf;
    case 5:
      return stone;
    case 6:
      return sand;
    case 7:
      return cloud;
    default:
      return "";
  }
}

axe.addEventListener("click", function () {
  currTool = "axe";
  console.log(currTool);
});

shovel.addEventListener("click", function () {
  currTool = "shovel";
  console.log(currTool);
});

pickaxe.addEventListener("click", function () {
  currTool = "pickaxe";
  console.log(currTool);
});

inventoryButton.addEventListener("click", function () {
  currTool = "inventory";
  console.log(currTool);
});

function checkMatch(tile, currTool) {
  return tile.classList.contains(currTool) &&
    !tile.classList.contains("removed")
    ? true
    : false;
}

function removeTile(tile) {
  tile.classList.add("removed");
}

function addToInventory(tile) {
  let classArr = [tile.classList[0], tile.classList[1]];
  inventory.push(classArr);
  console.log(inventory);
}

function inventoryShowLast() {
  inventoryButton.classList.remove("removed");
  inventoryButton.classList.remove(inventoryButton.classList[1]);
  inventoryButton.classList.add(inventory[inventory.length - 1][0]);
  console.log(inventoryButton);
}

function updateInventoryDisp() {
  inventoryShowLast();
  removedFromInventory = inventory.pop();
  if (inventory.length === 0) {
    inventoryButton.classList.add("removed");
  }
  console.log(inventory);
}

function insertTile(tile) {
  if (tile.classList[0] === "class" || tile.classList[2] === "removed") {
    updateInventoryDisp();
    tile.classList.remove(...tile.classList);
    tile.classList.add(removedFromInventory[0]);
    tile.classList.add(removedFromInventory[1]);
  }
}

function addListeners(tileDiv) {
  tileDiv.addEventListener("click", function (event) {
    if (checkMatch(event.target, currTool)) {
      removeTile(event.target);
      addToInventory(event.target);
      inventoryShowLast();
    }
    if (currTool === "inventory") {
      insertTile(event.target);
    }
    console.log(event);
  });
}

function createTile(world, rows, cols) {
  const currentTile = numToTile(world[rows][cols]);
  const tileDiv = document.createElement("div");
  tileGrid.appendChild(tileDiv);
  tileDiv.style.gridRowStart = rows + 1;
  tileDiv.style.gridRowEnd = rows + 2;
  tileDiv.style.gridColumnStart = cols + 1;
  tileDiv.style.gridColumnEnd = cols + 2;
  tileDiv.classList.add(currentTile.class);
  tileDiv.classList.add(currentTile.tool);
  return tileDiv;
}

function createWorld(world) {
  for (let i = 0; i < world.length; i++) {
    for (let j = 0; j < world[i].length; j++) {
      const tileDiv = createTile(world, i, j);
      addListeners(tileDiv);
    }
  }
}

reset.addEventListener("click", function () {
  tileGrid.textContent = "";
  inventory = [];
  inventoryButton.classList.add("removed");
  console.log(inventoryButton);
  createWorld(world1);
});

save.addEventListener("click", function () {
  localStorage.setItem("progress", tileGrid.innerHTML);
  localStorage.setItem("inventory", inventory);
});

load.addEventListener("click", function () {
  tileGrid.innerHTML = localStorage.getItem("progress");
  for (let i = 0; i < tileGrid.children.length; i++) {
    addListeners(tileGrid.children[i]);
  }
  inventory = localStorage.getItem("inventory");
  inventoryShowLast();
});

createWorld(world1);
console.log(tileGrid.children[7]);
console.log(tileGrid.childNodes[7]);
