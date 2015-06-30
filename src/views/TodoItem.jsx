import React from "react";
import classNames from "classnames";

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

const TodoItem = React.createClass({
  contextTypes: {
    store: React.PropTypes.object,
  },

  getInitialState() {
    return { editText: null };
  },

  render() {
    const className = classNames({
      completed: this.props.todo.completed,
      editing: this.props.editing,
    });
    return (
      <li className={className}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this._toggleComplete} />
          <label onDoubleClick={this._startEditing}>{this.props.todo.text}</label>
          <button className="destroy" onClick={this._deleteItem} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.state.editText}
          onBlur={this._handleSubmit}
          onChange={this._handleChange}
          onKeyDown={this._handleKeydown}
        />
      </li>
    );
  },

  _startEditing() {
    this.props.onEdit(this.props.todo);
    this.setState({ editText: this.props.todo.text });
    setTimeout(() => {
      const editField = React.findDOMNode(this.refs.editField);
      editField.select();
      editField.focus();
    }, 100);
  },

  _handleSubmit(e) {
    const text = this.state.editText.trim();
    if (text) {
      this.context.store.actions.updateText({ id: this.props.todo.id, text: text });
    } else {
      this._deleteItem();
    }
    this.props.onEdit(null);
  },

  _handleChange(e) {
    this.setState({ editText: e.target.value });
  },

  _handleKeydown(e) {
    if (e.which === ESCAPE_KEY) {
      this.props.onEdit(null);
      this.setState({ editText: this.props.todo.text });
    } else if (e.which === ENTER_KEY) {
      this._handleSubmit(e);
    }
  },

  _toggleComplete() {
    this.context.store.actions.toggleComplete(this.props.todo);
  },

  _deleteItem() {
    this.context.store.actions.destroy(this.props.todo);
  },
});

export default TodoItem;
