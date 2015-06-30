import React from "react";
import {Router} from "director";
import TodoItem from "../views/TodoItem";
import Footer from "../views/Footer";

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

const filters = {
  all: (list) => list,
  active: (list) => list.filterNot((todo) => todo.get('completed')).toList(),
  completed: (list) => list.filter((todo) => todo.get('completed')).toList(),
};

const TodoApp = React.createClass({
  propTypes: {
    store: React.PropTypes.object,
  },

  childContextTypes: {
    store: React.PropTypes.object,
  },

  getChildContext() {
    return { store: this.props.store };
  },

  componentDidMount() {
    this.props.store.changes.onValue((data) => this.setState({data}));
    this.props.store.actions.loadAll();
    const setState = this.setState;
    Router({
      '/': setState.bind(this, { filter: 'all' }),
      '/active': setState.bind(this, { filter: 'active' }),
      '/completed': setState.bind(this, { filter: 'completed' }),
    }).init('/');
  },

  getInitialState() {
    return {
      edit: null,
      data: this.props.store.data,
      filter: 'all',
    };
  },

  render() {
    const filter = filters[this.state.filter] || filters.all;
    const unfilteredData = this.state.data.valueSeq();
    const filteredData = filter(unfilteredData);
    const activeCount = filters.active(unfilteredData).size;
    const completedCount = filters.completed(unfilteredData).size;

    const listItems = filteredData.toJS().
      map((todo) =>
          <TodoItem
            key={todo.id}
            todo={todo}
            editing={this.state.edit === todo.id}
            onEdit={this._onEdit} />);

    var listView = null;
    if (filteredData.size > 0) {
      listView = (
        <section id="main">
          <input
            id="toggle-all"
            type="checkbox"
            checked={activeCount === 0}
            onChange={this._handleToggleAll} />
          <ul id="todo-list">{listItems}</ul>
        </section>
      );
    }

    var footerView = null;
    if (unfilteredData.size > 0) {
      footerView = (
        <Footer
          activeCount={activeCount}
          completedCount={completedCount}
          selectedFilter={this.state.filter}
          onFilterChange={this._handleFilterChange} />
      );
    }

    return (
      <div>
        <header id="header">
          <h1>To-do List</h1>
          <input
            ref="newField"
            id="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={this._handleNewTodoKeyDown}
            autoFocus={true} />
        </header>
        {listView}
        {footerView}
      </div>
    );
  },

  _onEdit(todo) {
    const id = todo ? todo.id : null;
    this.setState({ edit: id });
  },

  _handleNewTodoKeyDown(e) {
    if (e.which === ENTER_KEY) {
      e.preventDefault();
      const newField = React.findDOMNode(this.refs.newField);
      const text = newField.value.trim();
      if (text) {
        this.props.store.actions.create(text);
        newField.value = '';
      }
    }
  },

  _handleFilterChange(filter) {
    this.setState({filter});
  },

  _handleToggleAll(e) {
    var checked = e.target.checked;
    this.props.store.actions.toggleAll(checked);
  },
});

export default TodoApp;
