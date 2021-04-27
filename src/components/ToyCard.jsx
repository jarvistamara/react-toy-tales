import React, { Component } from 'react';

class ToyCard extends Component {
  handleDonateBtn = () => {
    this.props.donateToy(this.props.id)
  }

  handleLikeBtn = () => {
    this.props.likeToy(this.props.id, this.props.likes)}

  render() {
    return (
      <div className="card">
        <h2>{this.props.name}</h2>
        <img src={this.props.image} alt={this.props.name} className="toy-avatar" />
        <p>{this.props.likes} Likes </p>
        <button onClick={this.handleLikeBtn} className="like-btn">Like {'<3'}</button>
        <button onClick={this.handleDonateBtn} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
