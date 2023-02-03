import { world1 } from "./worlds.js";

const tileGrid = document.querySelector(".blocks");
const axe = document.querySelector(".axe");
const pickaxe = document.querySelector(".pickaxe");
const shovel = document.querySelector(".shovel");

let currTool;

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
  tool: null,
  class: "cloud",
};

function numToTile(num) {
  switch (num) {
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

function checkMatch(tile, currTool) {
  return tile.classList.contains(currTool) ? true : false;
}

function removeTile(tile) {
  tile.classList.add("removed");
}

for (let i = 0; i < world1.length; i++) {
  for (let j = 0; j < world1[i].length; j++) {
    const currentTile = numToTile(world1[i][j]);
    const tileDiv = document.createElement("div");
    tileGrid.appendChild(tileDiv);
    tileDiv.style.gridRowStart = i + 1;
    tileDiv.style.gridRowEnd = i + 2;
    tileDiv.style.gridColumnStart = j + 1;
    tileDiv.style.gridColumnEnd = j + 2;
    tileDiv.classList.add(currentTile.class);
    tileDiv.classList.add(currentTile.tool);
    tileDiv.addEventListener("click", function (event) {
      checkMatch(event.target, currTool) ? removeTile(event.target) : "";
    });
  }
}
