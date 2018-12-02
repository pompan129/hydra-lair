import { 
    createGameMap,
    createEntities
 } from "../utility";
 import {Howl, Howler} from 'howler';

 import  _ from 'lodash';
 
 export const actionTypes = {
    BATCH_ACTIONS: "BATCH_ACTIONS",
    CHANGE_ENTITY: 'CHANGE_ENTITY',
    CHANGE_PLAYER_POSITION: "CHANGE_PLAYER_POSITION",
    CREATE_LEVEL: "CREATE_LEVEL",
    SET_DUNGEON_LEVEL: "SET_DUNGEON_LEVEL",
    CHANGE_PLAYER_HEALTH: "CHANGE_PLAYER_HEALTH",
    CHANGE_PLAYER_MAX_HEALTH: "CHANGE_PLAYER_MAX_HEALTH",
    CHANGE_WEAPON: "CHANGE_WEAPON",
    CHANGE_EXP: "CHANGE_EXP",
    CHANGE_LEVEL: "CHANGE_LEVEL",
    RESET_PLAYER:"RESET_PLAYER",
    SEND_MSG:"SEND_MSG",
    CHANGE_FOG:"CHANGE_FOG",
    LOAD_SOUNDS:"LOAD_SOUNDS",
    CHANGE_PLAYER_ALIVE:"CHANGE_PLAYER_ALIVE",
    SET_MODAL:"SET_MODAL",
    RESET_MSGS:"RESET_MSGS"
 };
 
 export function batchActions(actions) {
    return {
       type: actionTypes.BATCH_ACTIONS,
       payload: actions
    }
 }
 
 //board actions
 export function changeEntity(entity, coords) {
    return {
       type: actionTypes.CHANGE_ENTITY,
       payload: {
          entity,
          coords
       }
    };
 }
 export function changePlayerCoord(payload) {
    return {
       type: actionTypes.CHANGE_PLAYER_POSITION,
       payload
    };
 }
 
 export function changeFogMode(payload) {
    return {
       type: actionTypes.CHANGE_FOG,
       payload
    };
 }
 export function createLevel(level) {
    return {
       type: actionTypes.CREATE_LEVEL,
       payload: createEntities(createGameMap(), level)
    };
 }
 export function setDungeonLevel(payload) {
    return {
       type: actionTypes.SET_DUNGEON_LEVEL,
       payload
    };
 }
 
 //marquee actions
 export function sendMsg(msgType, inserts){
    let msg;//message to send
    //text for various msg types
    switch(msgType){
       case 'EXIT':
          msg = `You are brave and decsend even further into the dungeon!`;
          break;
       case 'NEW_LEVEL':
          msg = `You on level ${inserts[0]}. Good luck... you'll need it.`;
          break;
       case 'ATTACK':
          msg = `You attack the ${inserts[0]} with your ${inserts[1]} and cause ${inserts[2]}hp damage!!`;
          break;
       case 'MONSTER_ATTACK':
          msg = `Ouch! The ${inserts[0]} hits back! You lose ${inserts[1]} health points!`;
          break;
       case 'VICTORY':
          msg = `Victory! The ${inserts[0]} falls in a pool of blood. You gained ${inserts[1]} exp points!`;
          break;
       case 'WALL_MOVE':
          const messages = [
             "Can't move there!",
             "Ummmmm... That's a wall!!!", 
             "Ouch!."
          ]
          msg = messages[_.random(0,2)];
          break;
       case 'POTION':
          msg = `Ahhh! Yes! You drank a potion and gained ${inserts[0]} hp!`;
          break;
       case 'WEAPON':
          msg = `You picked up a ${inserts[0]}!`;
          break;
       case 'LEVEL_UP':
          msg = `All your experience as paid off! Your are now level ${inserts[0]}, and have ${inserts[1]} hp`;
          break;
       case 'DEATH':
          msg = "You died!";
          break;         
       default:
          break;
          
    }
    return {
       type: actionTypes.SEND_MSG,
       payload:msg
    }
 }
 function resetMsgs(){
    return{
       type:actionTypes.RESET_MSGS
    }
 }
 
 //sound actions
 export function loadSounds(){
    const step = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/v1491447155/click_bkq6g0.mp3'],volume:.2});
    const swipe = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/v1491438669/SwordWhip03_ri1xrm.mp3'],volume:.5});
    const punch = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/du_1,so_0/v1491439386/Punch_mgsvfy.mp3'],volume:.5});
    const stab = new Howl({src: ['http://res.cloudinary.com/kurt-johnson/video/upload/du_.5,so_0/v1491440387/stab_g4trdh.wav'],volume:.5});
    const axe = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/du_1,so_0/v1491505309/axe.mp3'],volume:.5});
    const m_gun = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/v1491516923/machine_gun2.mp3']});
    const bazooka = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/v1491517269/bazooka.mp3']});
    const excal = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/v1491783062/vorpalAttack_zglgew.mp3'],volume:.5});
    const gulp = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/du_1.5,so_0/v1491441141/gulp_mwkdic.wav'],volume:.2});
    const equip = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/v1491526182/equip.mp3'],volume:.5});
    const monster_die = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/v1491519000/monster_die.mp3'],volume:.5});
    const hydra = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/v1491503568/hydra2.mp3']});
    const vampire = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/v1491516336/vamp.mp3']});
    const ogre = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/du_3.5,so_0/v1491445386/ogre.wav'],rate:3});
    const troll = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/v1491506995/troll-groan_2.mp3'],volume:.5});
    const bugbear = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/du_1.6,so_0/v1491444636/bugbea.wav'],rate:1.5,volume:.5});
    const orc = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/du_2,so_0/v1491441746/BullGrowls_roa1fi.wav'],rate:2,volume:.5});
    const goblin = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/v1491443004/goblin.wav'],rate:3,volume:.5});
    const kobold = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/v1491504530/kobold_2.mp3'],rate:1.25,volume:.5});
    const victory = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/v1491508766/victory.mp3']});
     const hero_death = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/v1491519898/hero_death_sufyv6.mp3'],volume:.5});
    const balrog = new Howl({src: ['https://res.cloudinary.com/kurt-johnson/video/upload/v1491846062/ghoul-sound_jympzv.mp3'],volume:.5});
 
    return {
       type:actionTypes.LOAD_SOUNDS,
       payload:{step,swipe,excal,bazooka,m_gun,axe,punch,stab,hydra,balrog,vampire,troll,
                ogre,bugbear,orc,goblin,kobold,gulp,equip,monster_die,hero_death,victory}
    }
 }
 
 //player actions
 function changePlayerAlive(status) {
    return {
       type: actionTypes.CHANGE_PLAYER_ALIVE,
       payload: status
    }
 }
 function changePlayerHealth(hp) {
    return {
       type: actionTypes.CHANGE_PLAYER_HEALTH,
       payload: hp
    }
 }
 function changePlayerMaxHealth(hp) {
    return {
       type: actionTypes.CHANGE_PLAYER_MAX_HEALTH,
       payload: hp
    }
 }
 function changeWeapon(weapon) {
    return {
       type: actionTypes.CHANGE_WEAPON,
       payload: weapon
    }
 }
 function changeExp(exp) {
    return {
       type: actionTypes.CHANGE_EXP,
       payload: exp
    }
 }
 function changeLevel(level) {
    return {
       type: actionTypes.CHANGE_LEVEL,
       payload: level
    }
 }
 export function resetPlayer(){
    return {
       type:actionTypes.RESET_PLAYER
    }
 }
 
 // returns a function and will be called in the Redux-Thunk middleware
 export function handlePlayerMove(changeXY) {
    return function(dispatch, getState) {
       //useful variables 
       const state = getState();
       const {sound} = state;
       const [x, y] = state.game.playerCoord;  
       const player = state.game.entities[y][x];
       const [changeX, changeY] = changeXY;
       const target = state.game.entities[y + changeY][x + changeX];
       const playerStats = state.player;
       
       //array for batched actions
       const batch = [];
 
       //helper functions
       const movePlayer = () => {
          //batch the appropriate actions
          batch.push(changeEntity(player, [x + changeX, y + changeY])); //move player to new cell
          batch.push(changeEntity({
             type: "floor"
          }, [x, y])); //replace old cell with floor
          batch.push(changePlayerCoord([x+changeX,y+changeY])); //track players new coordinates
       }    
       const playerActionSound = (type)=>{
          switch(type){
             case "step":
                sound.step.play();
                break;
             case "Fist":
                sound.punch.play();
                break;
             case "Dagger":
                sound.stab.play();
                break;
             case 'Short Sword':
             case 'Long Sword':   
             case "Vorpal Blade":
                sound.swipe.play();
                break;
             case 'Battle Axe':
                sound.axe.play();
                break;
             case 'Machine Gun':
                sound.m_gun.play();
                break;
             case 'Bazooka':
                sound.bazooka.play();
                break;
             case 'Excalibur - Dragon Killer Blade!':
                sound.excal.play();
                break;
             case 'potion':
                sound.gulp.play();
                break;
             case 'equip':
                sound.equip.play();
                break;
             case 'death':
                      sound.hero_death.play();
                break;
             default:
                break;
         }
       }
       const gameActionSound = (type)=>{
          switch(type){
             case "Kobold":
                sound.kobold.play();
                break;
             case "Goblin":
                sound.goblin.play();
                break;
             case "Orc":
                sound.orc.play();
                break;
             case "Bugbear":
                sound.bugbear.play();
                break;
             case "Ogre":
                sound.ogre.play();
                break;
             case "Troll":
                sound.troll.play();
                break;
             case "Vampire":
                sound.vampire.play();
                break;
             case "Hydra":
                sound.hydra.play();
                break;
             case "Balrog":
                sound.balrog.play();
                break;
             case "monster_die":
                sound.monster_die.play();
                break;
             case "victory":
                sound.victory.play();
                break;
             default:
                break;
          }
       }
       const playerDeath = ()=>{
          playerActionSound("death");
          batch.push(changeEntity({
                      type: "floor"
                   }, [x, y])); //replace player  with floor
          batch.push(changePlayerAlive(false)); 
          batch.push(sendMsg("DEATH",[target.kind]));
          batch.push(setModal({
             modalVisible:true,
             pic:"https://res.cloudinary.com/kurt-johnson/image/upload/c_scale,h_200,w_200/v1491802592/skull2_zjqbuw.png",
                msg:`AAAAAH!!! The ${target.kind} has KILLED YOU with it's mighty claws...or jaws...anyway YOU DIED! Better luck next time.`,
                header:"YOU'RE DEAD",}))
          batch.push(resetMsgs());
       }
       const bossDeath = () =>{//todo raise level?
          movePlayer();
          batch.push(sendMsg("VICTORY",[target.kind,10000]));
          batch.push(setModal({
             modalVisible:true,
             pic: "https://res.cloudinary.com/kurt-johnson/image/upload/c_scale,h_200,w_200/v1491807072/KnightOfThorns.png",
                msg:"You've Killed the Hydra!! The bards will sing of your deeds for a 1000 years! ",
                header:"Victory!!!",}))
          batch.push(resetMsgs());
          
       }
 
       //movement options
       //test if a valid space to move
       if (target.type) {
          //if it's not a badguy player moves into new cell
          if (target.type !== "badguy" && target.type != "boss") {
             movePlayer(); //player moves to target cell
                 if (target.type === "floor") {playerActionSound("step");}
             //if potion on new target heal the player
             if (target.type === "potion") {
                playerActionSound("potion");
                let hp = playerStats.hp + _.random(10, 30);
                if (hp > playerStats.maxHp) {
                   hp = playerStats.maxHp;
                }
                batch.push(changePlayerHealth(hp));
                batch.push(sendMsg("POTION",[hp - playerStats.hp]));
             }
             //if weapon on target cell, arm player with weapon 
             if (target.type === "weapon") {
                playerActionSound("equip");
                batch.push(changeWeapon(target));
                batch.push(sendMsg("WEAPON",[target.kind]));
             }
             
             if (target.type === "exit") {
                //createLevel
                     batch.push(sendMsg("EXIT"));
                batch.push(createLevel(state.game.dungeonLevel + 1));
                batch.push(setDungeonLevel(state.game.dungeonLevel + 1));
                setTimeout(()=>{
                   dispatch(sendMsg("NEW_LEVEL", [state.game.dungeonLevel + 1]));
                }, 3000);
             }
          } else { //if badguy on target cell
 
             //player attacks badguy/boss
             playerActionSound(playerStats.weapon.kind);
             const [low, high] = playerStats.weapon.damage;
             const targetDamage = _.random(low, high);
             const targetHealth = target.health - targetDamage;
                 
             //send msg about attack
             batch.push(sendMsg('ATTACK',[target.kind,playerStats.weapon.kind,targetDamage]));
             
             //if player kills target
             if (targetHealth <= 0) {
                movePlayer();
                if(target.kind === "Hydra"){
                   gameActionSound("victory");//todo
                   bossDeath();     
                }
                else{
                   gameActionSound("monster_die");//todo
                   const expGain = target.exp;
                   const newExp = expGain + playerStats.exp;
                   batch.push(changeExp(newExp));
                   batch.push(sendMsg('VICTORY',[target.kind,expGain]));
                   if (newExp / 100 >= playerStats.level + 1) {
                         const newLevel = playerStats.level + 1;
                         const newHp = newLevel * 50 + 100;
                         batch.push(changeLevel(newLevel));
                         batch.push(changePlayerHealth(newHp));
                         batch.push(changePlayerMaxHealth(newHp));
                         batch.push(sendMsg('LEVEL_UP',[newLevel,newHp]));
                      } 
                }
             }
             else {
                //if player does not kill the enemy
                //change target health
                const newTarget = {...target,
                   health: targetHealth
                };
                batch.push(changeEntity(newTarget, [x + changeX, y + changeY]));
                //target attacks
                gameActionSound(newTarget.kind);//todo
                const playerDamage = _.random(target.damage[0], target.damage[1]);
                const playerHealth = playerStats.hp - playerDamage;
                //if player dies 
                if (playerHealth <= 0) {
                   playerDeath();
                } else {
                   batch.push(changePlayerHealth(playerHealth)); //replace player  with floor
                   batch.push(sendMsg('MONSTER_ATTACK',[target.kind,playerDamage]));
                }
             }
          }
       }
         else{ 
            batch.push(sendMsg('WALL_MOVE'));
       }
       dispatch(batchActions(batch));
    }
 }
 
 //modal actions
 
 export function setModal(payload){
    return {
       type:actionTypes.SET_MODAL,
       payload
    }
 }