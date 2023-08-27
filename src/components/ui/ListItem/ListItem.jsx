import React, { Component } from "react";

export default class ListItem extends Component {
  render() {
    const { text } = this.props;

    return (
      <li>{text}</li>
    )
  }
}
