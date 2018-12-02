import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import  _ from 'lodash';

import {createLevel, setDungeonLevel, handlePlayerMove,loadSounds} from "../actions";

const Cell = ({getClass,cell})=>{
   const name = getClass(cell);
   
   return (
   	<div
         className = {name}
         style ={{opacity:cell.opacity}}
         ></div>
   )
}

class GameBoard extends Component {
   
    constructor(props) {
    	super(props);
       this.state = {
          //game view window - 1/2 size
          remValue:0,//root font size. to size game window by rem
          boardHeight: 0,//in board cellSize
          boardWidth: 0,//in  board cellSize
          heightOffset: 8,//in rem
          widthOffset:30,//current sidebar/marquee & spacing. size in rem
          cssCellSize: 1.5,//rem
          fogRadius:7//radius of sight around player
       }
       this.handleKeyPress = this.handleKeyPress.bind(this);  
       this.handleWindowSizing = this.handleWindowSizing.bind(this); 
    }
   
   componentWillMount() {
      this.props.loadSounds();
      this.props.createLevel();
      this.props.setDungeonLevel(1);
      this.handleWindowSizing();
   }
   
   componentDidMount(){
      window.addEventListener('keydown', _.throttle(this.handleKeyPress, 100));
      window.addEventListener("resize", _.debounce(this.handleWindowSizing,300));
   }
   
   componentWillUnmount() {
      window.removeEventListener('keydown', _.throttle(this.handleKeyPress, 100));
      window.removeEventListener("resize", _.throttle(this.handleWindowSizing,300));
   }
   
   handleKeyPress(e){
      e.preventDefault();
      if(!this.props.alive){return;}
     switch(e.keyCode){
           //up
        case 38:
        case 87:
           this.props.handlePlayerMove([0,-1]);
           break;
           
           //down
        case 40:
        case 83:
           this.props.handlePlayerMove([0,1]);
           break;
           
           //left
        case 37:
        case 65:
           this.props.handlePlayerMove([-1,0]);
           break;
           
           //right
        case 39:
        case 68:
           this.props.handlePlayerMove([1,0]);
           break;
           
        default:
           return;
     }
      
   }
   
   //function to help with map window
   getMidOfThreeNums(numArray){
      return numArray.sort((a,b)=>{return a-b})[1];
   }
   
   getCellClass(cell){
      let c = "cell";
      if(cell.type){c += " " + cell.type};
      if(cell.kind){c += " " + cell.kind};
      return c;
   }
   
   handleWindowSizing(){
      const remValue = parseFloat(getComputedStyle(document.documentElement).fontSize); // root font size(rem)
      const cellSize = remValue * this.state.cssCellSize + 2; //add 2 for border
      const pxHeight = window.innerHeight - remValue * this.state.heightOffset;//remove title bar height
      const pxWidth = window.innerWidth - remValue * this.state.widthOffset;//remove sidebar/marquee width
      const boardHeight = Math.max(8,_.floor(pxHeight/cellSize/2));// 1/2 height in map cells 
      const boardWidth = Math.max(8,_.floor(pxWidth/cellSize/2));// 1/2 width in map cells 
      this.setState({
         remValue,boardHeight,boardWidth
      })
   }
   
  render(){
     const { entities, playerCoord,fog } = this.props;
     //set up vars for game view window
     let playerX,playerY;
     if(playerCoord){[playerX,playerY] = this.props.playerCoord}//get player coord(if we have props yet)
     const mapHeight = entities.length;
     const mapWidth = entities[0].length;
     
     //find boundry for game view
     const northBound = this.getMidOfThreeNums(
        [0, playerY-this.state.boardHeight,mapHeight-this.state.boardHeight*2]);//upper/north boundry
     const westBound =  this.getMidOfThreeNums(
           [0, playerX - this.state.boardWidth, mapWidth - (this.state.boardWidth * 2)]);//left/west boundry
     const southBound = this.getMidOfThreeNums(
        [mapHeight,playerY + this.state.boardHeight, this.state.boardHeight * 2])//lower/south boundry
	  const eastBound = this.getMidOfThreeNums(
        [mapWidth,playerX + this.state.boardWidth, this.state.boardWidth * 2]);//right/east boundry
     
     
     
     //set distance from player for 'fog of war'
    let gameEntities = entities.map((row,y)=>row.map((cell,x)=>{
        cell.distance =  Math.sqrt((Math.pow(playerY - y,2)) + (Math.pow(playerX - x,2)));
        return cell;
     }))
     
     //filter cells outside of game view
     gameEntities = gameEntities.filter((row,index)=>{ 
        return index >= northBound && index < southBound;
     })
     .map((row,index)=>{return row.filter((cell,i)=>{ 
        return i >= westBound && i < eastBound//is in game view window
     })})
     const cells  = gameEntities.map((row,index)=>{
         return (
            <div className="row" key={index}>
               {
                  row.map((cell,i)=>{
                     if(!fog){cell.opacity = 1;}
                     else{cell.distance>7?cell.opacity=0:cell.opacity= (1.16 - .16*cell.distance);}
                     
                     return <Cell 
                               getClass={this.getCellClass} 
                               cell={cell}
                               key={i +" "+ index}
                               />
                  })
               }
            </div>
         )
      })
      return (
      	<div className='game-board'>
            {cells}
        </div>  
      )
      
      
   }
   
}

const mapStateToProps = ({game,sound,player})=>{
   return {
      entities:game.entities,
      dungeonLevel:game.dungeonLevel,
      playerCoord:game.playerCoord,
      fog:game.fog,
      alive:player.alive,
      sound
	}
}

const mapDispatchToProps = (dispatch)=>{
   return bindActionCreators({ createLevel, setDungeonLevel, handlePlayerMove,loadSounds }, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(GameBoard);