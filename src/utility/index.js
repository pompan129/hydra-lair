import  _ from 'lodash';


const GRID_WIDTH = 60;
const GRID_HEIGHT = 60;
const MAX_ROOMS = 15;
const ROOM_SIZE_RANGE = [7, 15];
const ENEMY_POP = 8;
const POTION_POP =5;
const WEAPON_POP = 5;

export const c = {
  GRID_HEIGHT,
  GRID_WIDTH,
  MAX_ROOMS,
  ROOM_SIZE_RANGE,
  ENEMY_POP,
  POTION_POP,
  WEAPON_POP
};

export const createGameMap = () => {
	// HELPER FUNCTIONS FOR CREATING THE MAP
	const isValidRoomPlacement = (grid, {x, y, width = 1, height = 1}) => {
		// check if on the edge of or outside of the grid
		if (y < 1 || y + height > grid.length - 1) {
			return false;
		}
		if (x < 1 || x + width > grid[0].length - 1) {
			return false;
		}

		// check if on or adjacent to existing room
		for (let i = y - 1; i < y + height + 1; i++) {
			for (let j = x - 1; j < x + width + 1; j++) {
				if (grid[i][j].type === 'floor') {
					return false;
				}
			}
		}
		// all grid cells are clear
		return true;
	};

	const placeCells = (grid, {x, y, width = 1, height = 1}, type = 'floor') => {
		for (let i = y; i < y + height; i++) {
			for (let j = x; j < x + width; j++) {
				grid[i][j] = {type};
			}
		}
		return grid;
	};

	const createRoomsFromSeed = (grid, {x, y, width, height}, range = c.ROOM_SIZE_RANGE) => {
		// range for generating the random room heights and widths
		const [min, max] = range;

		// generate room values for each edge of the seed room
		const roomValues = [];

		const north = { height: _.random(min, max), width: _.random(min, max) };
		north.x = _.random(x, x + width - 1);
		north.y = y - north.height - 1;
		north.doorx = _.random(north.x, (Math.min(north.x + north.width, x + width)) - 1);
		north.doory = y - 1;
		roomValues.push(north);

		const east = { height: _.random(min, max), width: _.random(min, max) };
		east.x = x + width + 1;
		east.y = _.random(y, height + y - 1);
		east.doorx = east.x - 1;
		east.doory = _.random(east.y, (Math.min(east.y + east.height, y + height)) - 1);
		roomValues.push(east);

		const south = { height: _.random(min, max), width: _.random(min, max) };
		south.x = _.random(x, width + x - 1);
		south.y = y + height + 1;
		south.doorx = _.random(south.x, (Math.min(south.x + south.width, x + width)) - 1);
		south.doory = y + height;
		roomValues.push(south);

		const west = { height: _.random(min, max), width: _.random(min, max) };
		west.x = x - west.width - 1;
		west.y = _.random(y, height + y - 1);
		west.doorx = x - 1;
		west.doory = _.random(west.y, (Math.min(west.y + west.height, y + height)) - 1);
		roomValues.push(west);

		const placedRooms = [];
		roomValues.forEach(room => {
			if (isValidRoomPlacement(grid, room)) {
				// place room
				grid = placeCells(grid, room);
				// place door
				grid = placeCells(grid, {x: room.doorx, y: room.doory}, 'door');
				// need placed room values for the next seeds
				placedRooms.push(room);
			}
		});
		return {grid, placedRooms};
	};

	// BUILD OUT THE MAP

	// 1. make a grid of 'empty' cells
	let grid = [];
	for (let i = 0; i < c.GRID_HEIGHT; i++) {
		grid.push([]);
		for (let j = 0; j < c.GRID_WIDTH; j++) {
			grid[i].push({type: 0});
		}
	}

	// 2. random values for the first room
	const [min, max] = c.ROOM_SIZE_RANGE;
	const firstRoom = {
		x: _.random(1, c.GRID_WIDTH - max - 15),
		y: _.random(1, c.GRID_HEIGHT - max - 15),
		height: _.random(min, max),
		width: _.random(min, max)
	};

	// 3. place the first room on to grid
	grid = placeCells(grid, firstRoom);

	// 4. using the first room as a seed, recursivley add rooms to the grid
	const growMap = (grid, seedRooms, counter = 1, maxRooms = c.MAX_ROOMS) => {
		if (counter + seedRooms.length > maxRooms || !seedRooms.length) {
			return grid;
		}

		grid = createRoomsFromSeed(grid, seedRooms.pop());
		seedRooms.push(...grid.placedRooms);
		counter += grid.placedRooms.length;
		return growMap(grid.grid, seedRooms, counter);
	}; 
	return growMap(grid, [firstRoom]);
};

export const createEntities = (gameMap, level = 1) => {
   	// 1. create the entities
	const bosses = [];
	if (level === 4) {
		bosses.push({
			health: 500,
			level: 10,
			type: 'boss',
         kind: "Hydra",
         damage:[10,120]
		});
	}
	//populate badguys
   const badguyTypes = [
      {
         kind: "Kobold",
         level: 0,
         type: "badguy",
         damage:[0,3],
         exp:10,
         health: 10
      },
      {
         kind: "Goblin",
         level: 1,
         type: "badguy",
         damage:[1,4],
         exp:15,
         health: 12
      },
      {
         kind: "Orc",
         level: 1,
         type: "badguy",
         damage:[2,6],
         exp:20,
         health: 20
      },
      {
         kind: "Bugbear",
         level: 2,
         type: "badguy",
         damage:[2,10],
         exp:25,
         health: 30
      },
      {
         kind: "Ogre",
         level: 2,
         type: "badguy",
         damage:[2,16],
         exp: 30,
         health: 40
      },
      {
         kind: "Troll",
         level: 3,
         type: "badguy",
         damage:[4,20],
         exp: 40,
         health: 60
      },
      {
         kind: "Vampire",
         level: 4,
         type: "badguy",
         damage:[4,36],
         exp: 50,
         health: 90
      },
      {
         kind: "Balrog",
         level: 5,
         type: "badguy",
         damage:[2,50],
         exp: 100,
         health: 150
      }
   ]
	const badguys = [];
   const badguySubSet = badguyTypes.filter((badguy)=>{
      return badguy.level >= level - 1 &&
         	badguy.level <= level + 1;
   })
	for (let i = 0; i < c.ENEMY_POP; i++) {
		badguys.push(
         Object.assign({},badguySubSet[_.random(badguySubSet.length - 1)])
      );
	}
	
   //place an exit
	const exits = [];
	if (level < 4) {
		exits.push({
			type: 'exit'
		});
	}

	const players = [
		{type:"player"}
	];

	const potions = [];
	for (let i = 0; i < c.POTION_POP; i++) {
		potions.push({ type: 'potion' });
	}

	const weaponTypes = [
		{
			kind: 'Dagger',
         level: 1,
			damage: [1,4]
		},
		{
			kind: 'Short Sword',
         level: 1,
			damage: [1,8]
		},
		{
			kind: 'Long Sword',
         level: 2,
			damage: [2,12]
		},
		{
			kind: 'Battle Axe',
         level: 2,
			damage: [2,16]
		},
		{
			kind: 'Vorpal Blade',
         level: 3,
			damage: [3,32]
		},
		{
			kind: 'Machine Gun',
         level: 3,
			damage: [2,50]
		},
		{
			kind: 'Bazooka',
         level: 4,
			damage: [2,100]
		},
		{
			kind: 'Excalibur - Dragon Killer Blade!',
         level: 5,
			damage: [5,250]
		}
	];

	const weapons = [];
	// weapon types will vary based on the level
	const qualifying = weaponTypes
		.filter(weapon => weapon.level <= level + 1)
			.filter(weapon => weapon.level >= level - 1);
	for (let i = 0; i < c.WEAPON_POP; i++) {
		const weapon = Object.assign({}, qualifying[_.random(0, qualifying.length - 1)]);
		weapon.type = 'weapon';
		weapons.push(weapon);
	}

	// 2. randomly place all the entities on to floor cells on the game map.
	const playerCoord = [];
	[potions, badguys, weapons, exits, players, bosses].forEach(entities => {
		while (entities.length) {
			const x = Math.floor(Math.random() * c.GRID_WIDTH);
			const y = Math.floor(Math.random() * c.GRID_HEIGHT);
			if (gameMap[y][x].type === 'floor') {
				if (entities[0].type === 'player') {
               // we'll need to return the players coord
					playerCoord.push(x);
               playerCoord.push(y);
				}
				gameMap[y][x] = entities.pop();
			}
		}
	});

	// 3. we can now replace doors with floors
	for (let i = 0; i < gameMap.length; i++) {
		for (let j = 0; j < gameMap[0].length; j++) {
			if (gameMap[i][j].type === 'door') {
				gameMap[i][j].type = 'floor';
			}
		}
	}
   
	return {entities: gameMap, playerCoord};
};

