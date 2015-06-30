import React from "react";
import TodoApp from "./views/TodoApp";
import TodoStore from "./stores/TodoStore.local";

export default class App extends React.Component {
  render() {
    return (
      <section id="todoapp">
        <TodoApp store={new TodoStore()} />
      </section>
    );
  }
}
