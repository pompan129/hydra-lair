import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import GameBoard from "./game-board";
import MessageBoard, { Modal } from "./message-board";
import {
  createLevel,
  setDungeonLevel,
  resetPlayer,
  setModal
} from "../actions";

//they only give me 10 files in codepen so I put component here
const Header = props => {
  return (
    <div className="header">
      <h1>The Hydra's Lair</h1>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.props.resetPlayer();
    this.props.setDungeonLevel(1);
    this.props.createLevel();
    this.props.setModal({
      modalVisible: false,
      msg: "",
      pic: "",
      header: ""
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="console">
          <GameBoard />
          <MessageBoard />
        </div>
        <Modal
          header={this.props.modal.header}
          msg={this.props.modal.msg}
          pic={this.props.modal.pic}
          visible={this.props.modal.modalVisible}
          handleModalClose={this.handleModalClose}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ modal }) => {
  return {
    modal
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { createLevel, setDungeonLevel, resetPlayer, setModal },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
