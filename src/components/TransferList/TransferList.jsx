import React, { Component } from "react";
import List from "../ui/List/List";

export default class TransferList extends Component {
  list = [
    { id: 1, title: `Task 1` },
    { id: 2, title: `Task 2` },
    { id: 3, title: `Task 3` },
    { id: 4, title: `Task 4` },
  ];
  defaultColumn = 1;

  constructor() {
    super();
    this.state = {
      list: this.list.map(item => {
        return {
          ...item,
          columnId: this.defaultColumn,
          order: Date.now(),
        }
      }),

      columns: [
        { id: 1, title: 'todo' },
        { id: 2, title: 'inProgress' },
        { id: 3, title: 'remove' },
      ]
    }
  }

  moveTo(direction, currentColumnIndex) {
    return () => {
      this.setState((state) => {
        const isExistNextColumn = !!state.columns[currentColumnIndex + 1];
        const columnList = state.list.filter(item => item.columnId === this.state.columns[currentColumnIndex].id);
        const neededIndex = state.list.findIndex(item => item.id === columnList.at(isExistNextColumn ? 0 : -1).id);

        return {
          ...state,
          list: state.list
            .map((item, index) => {
              if(index === neededIndex) {
                return {
                  ...item,
                  columnId: this.state.columns[direction === 'right' ? currentColumnIndex + 1 : currentColumnIndex - 1]?.id,
                  order: Date.now()
                }
              }

              return item;
          })
            .sort((a, b) => b.order - a.order)
        }
      })
    }
  }

  render() {
    return (
      <section>
        {this.state.columns.map((column, index) => (
          <List
            key={column.id}
            id={column.id}
            listItems={this.state.list.filter(item => item.columnId === column.id)}
            listAction={(
              <div className="list__actions">
                {index > 0 && index < this.state.columns.length - 1 && (
                  <button onClick={this.moveTo('left', index)}>Transfer first to left</button>
                )}
                {index !== this.state.columns.length - 1 && (
                  <button onClick={this.moveTo('right', index)}>Transfer first to right</button>
                )}
                {index === this.state.columns.length - 1 && (
                  <button onClick={this.moveTo('right', index)}>Remove last item</button>
                )}
              </div>
            )}
          />
        ))}
      </section>
    )
  }
}
