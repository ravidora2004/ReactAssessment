import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

var destination = document.querySelector("#container");

var todoTitles = [];
todoTitles.push({id: 1, value: "Finally take out the trash", done: true});
todoTitles.push({id: 2, value: "Take the dog for a walk", done: false});
todoTitles.push({id: 3, value: "Take my sister out for lunch", done: false});
todoTitles.push({id: 4, value: "Do the to-do list design", done: false});
todoTitles.push({id: 5, value: "Get ready for the day", done: false});

class TodoList extends React.Component {
  render () {
    var titles = this.props.titles.map((title, id) => {
      return (
        <TodoListTitle key={id} title={title} id={id} removeTitle={this.props.removeTitle} completed={this.props.completed} />
      );
    });
    return (
      <table> {titles} </table>
    );
  }
}
  
class TodoListTitle extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    var id = parseInt(this.props.id);
    this.props.removeTitle(id);
  }
  onClickDone() {
    var id = parseInt(this.props.id);
    this.props.completed(id);
  }
  render () {
    var todoClass = this.props.title.done ? 
        "done" : "undone";
    var btnClass = this.props.title.done ? 
        "disabled" : "enabled";

    return(
      <table  className={todoClass}>
      <tr>
          <td width ="50%"> {this.props.title.value} </td>
          <td width ="10%" align ="center"><button type="button" className={btnClass} onClick={this.onClickDone}>Complete</button></td>
          <td width ="5%" align ="center"><button type="button" className="close" onClick={this.onClickClose}>&times;</button></td>
       </tr>
       </table> 
    );
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.refs.titleName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var newTitleValue = this.refs.titleName.value;
    
    if(newTitleValue) {
      this.props.addTitle({newTitleValue});
      this.refs.form.reset();
    }else{
    	alert("Oops. Please input a To-do to add to list.");

    }
  }
  render () {
    return (
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="titleName" className="form-control" placeholder="Please Add here"/>
        <button type="submit" className="buttonCSS">Add new To-do</button> 
        <p/>

      </form>
    );   
  }
}
  
class TodoHeader extends React.Component {
  render () {
    return <h1>TO-DO:</h1>;
  }
}
  
class AppTest extends React.Component {
  constructor (props) {
    super(props);
    this.addTitle = this.addTitle.bind(this);
    this.removeTitle = this.removeTitle.bind(this);
    this.completed = this.completed.bind(this);
    this.state = {todoTitles: todoTitles};
  }
  addTitle(todoTitle) {
    todoTitles.unshift({
      id: todoTitles.length+1, 
      value: todoTitle.newTitleValue, 
      done: false
    });
    this.setState({todoTitles: todoTitles});
  }
  removeTitle (titleId) {
    todoTitles.splice(titleId, 1);
    this.setState({todoTitles: todoTitles});
  }
  completed(titleId) {
    var todo = todoTitles[titleId];
    todoTitles.splice(titleId, 1);
    todo.done = !todo.done;
    todo.done ? todoTitles.push(todo) : todoTitles.unshift(todo);
    this.setState({todoTitles: todoTitles});  
  }
  render() {
    return (
      <div id="main">
        <TodoHeader />
        <TodoForm addTitle={this.addTitle} />
        <TodoList titles={this.props.initTitles} removeTitle={this.removeTitle} completed={this.completed}/>

      </div>
    );
  }
}
ReactDOM.render(<AppTest initTitles={todoTitles}/>, destination);
