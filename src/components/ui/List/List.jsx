import React, { Component } from "react";
import ListItem from "../ListItem/ListItem";
import './styles.scss';

export default class List extends Component {
  render() {
    const {
      listItems,
      listAction
    } = this.props;

    return (
      <article className="list__card">
        <ul className="list">
          {!!listItems.length && listItems.map(item => {
            return (
              <ListItem key={item.id} text={item.title} />
            )
          })}
        </ul>
        {!!listItems.length && listAction}
      </article>
    )
  }
}
