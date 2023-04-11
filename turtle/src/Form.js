
import React from 'react';

class Form extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        author: '',
        title: '',
        description: '',
        price: ''
    };
  }    

  handleAuthorChange = (event) => {
    this.setState({
      author: event.target.value,
      title: this.state.title,
      description: this.state.description,
      price: this.state.price
    });
  }

  handleTitleChange = (event) => {
    this.setState({
      author: this.state.author,
      title: event.target.value,
      description: this.state.description,
      price: this.state.price
    });
  }

  handleDescriptionChange = (event) => {
    this.setState({
      author: this.state.author,
      title: this.state.title,
      description: event.target.value,
      price: this.state.price
    });
  }

  handlePriceChange = (event) => {
    this.setState({
      author: this.state.author,
      title: this.state.title,
      description: this.state.description,
      price: event.target.value
    });
  }

  handleAddItem = () => {
    this.props.addItem(this.state.author, this.state.title, this.state.description, this.state.price);
    this.setState({
      author: '',
      title: '',
      description: '',
      price: ''
    });
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.author} onChange={this.handleAuthorChange} placeholder="author"/>
        <input type="text" value={this.state.title} onChange={this.handleTitleChange} placeholder="title"/>
        <textarea value={this.state.description} onChange={this.handleDescriptionChange} rows="5" cols="50" maxLength="500" placeholder="description"></textarea>
        <input type="text" value={this.state.price} onChange={this.handlePriceChange} placeholder="price"/>
        <button onClick={this.handleAddItem}>Add</button>
      </div>
    );
  }
}

export default Form;
