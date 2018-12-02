import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {changeFogMode} from "../actions";

const GameStats = ({game})=>{
   
   return (
   	<div className="game-stats">
         <h3>
            Dungeon Level:{game.dungeonLevel}
         </h3>
      </div>
   )
}

const PlayerStats = ({player})=>{

   return (
   	<div className="player-stats"> 
         <hr></hr>
      	<ul>
            <li><label>Exp: </label><span>{player.exp}/{100+player.level*100}</span></li>
            <li><label>HP: </label><span>{player.hp}/{player.maxHp}</span></li>
            <li><label>Level: </label><span>{player.level}</span></li>
            <li><label>Weapon: </label><span>{player.weapon.kind}</span></li>
            <li><label>Damage: </label><span>({player.weapon.damage[0]}-{player.weapon.damage[1]})</span></li>
         </ul>
         <hr></hr>
      </div>
   )
}

const Messages = ({msgs})=>{
   const messages = [...msgs].reverse().map((item,index)=>{
      return <li>{item}</li>
   });
   return (
   	<div className="msg-board">
         <ul>
            {messages}
         </ul>
      </div>
   )
}

const ControlBoard = ({fog,toggleFog})=>{
   
   return (
      <div className="game-controls">
         <span>Fog Mode:</span>
         <label 
            className="switch"
            >
           <input type="checkbox" onClick={toggleFog}/>
           <div className="slider"></div>
         </label>
      </div>
   )
}

export const Modal = (props)=>{
   if(!props.visible){return null;}
   console.log("props.pic:",props.pic)
   return (
      <div  className="modal-wrap">
         <div className="msg-modal-backdrop"></div>
         <div className="msg-modal">
            <h2>
               {props.header}
            </h2>
            <div>
               <img src={props.pic}/>
            </div>
            <div>
               {props.msg}
            </div>
            <button
               onClick = {props.handleModalClose}
               >Try Again</button>
         </div>
      </div>
   	
   )
}



 class Marquee extends Component {
   constructor(props) {
    	super(props);
    }
   
   render(){
      return ( 											
         <div  className="marquee">
            <GameStats   game={this.props.game}/>
            <PlayerStats player={this.props.player}/>
            <Messages   msgs={this.props.marquee.msgs}/>
            <ControlBoard 
               toggleFog={()=>{this.props.changeFogMode(!this.props.game.fog)}}
               fog={this.props.game.fog}/>
         </div>
      )
   }

}

const mapStateToProps = ({game,player,marquee})=>{
   return {
      game,
      player,
      marquee
	}
}

const mapDispatchToProps = (dispatch)=>{
   return bindActionCreators({changeFogMode}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Marquee);