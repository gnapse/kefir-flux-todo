import React from "react";
import cx from "classnames";

const Footer = React.createClass({
  contextTypes: {
    store: React.PropTypes.object,
  },

  render() {
    const selectedFilter = this.props.selectedFilter;
    const count = this.props.activeCount === 0 ? 'no' : this.props.activeCount;
    const items = this.props.activeCount === 1 ? 'item' : 'items';

    var clearButton = null;
    if (this.props.completedCount > 0) {
      clearButton = (
        <button id="clear-completed" onClick={this._onClearCompleted}>Clear completed</button>
      );
    }

    return (
      <footer id="footer">
        <span id="todo-count">
          {count} {items} left
        </span>
        <ul id="filters">
          <li><a href="#/" className={cx({selected: selectedFilter == 'all'})}>All</a></li>
          <li><a href="#/active" className={cx({selected: selectedFilter == 'active'})}>Active</a></li>
          <li><a href="#/completed" className={cx({selected: selectedFilter == 'completed'})}>Completed</a></li>
        </ul>
        {clearButton}
      </footer>
    );
  },

  _onClearCompleted() {
    this.context.store.actions.clearCompleted();
  },
});

export default Footer;
