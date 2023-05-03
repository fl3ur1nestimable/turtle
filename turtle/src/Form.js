
import React from 'react';

class Form extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        title: '',
        description: '',
        price: ''
    };
  }    

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
      description: this.state.description,
      price: this.state.price
    });
  }

  handleDescriptionChange = (event) => {
    this.setState({
      title: this.state.title,
      description: event.target.value,
      price: this.state.price
    });
  }

  handlePriceChange = (event) => {
    this.setState({
      title: this.state.title,
      description: this.state.description,
      price: event.target.value
    });
  }

  handleAddItem = () => {
    this.props.addItem(this.state.title, this.state.description, this.state.price);
    this.setState({
      title: '',
      description: '',
      price: ''
    });
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.title} onChange={this.handleTitleChange} placeholder="title"/>
        <textarea value={this.state.description} onChange={this.handleDescriptionChange} rows="5" cols="50" maxLength="500" placeholder="description"></textarea>
        <input type="text" value={this.state.price} onChange={this.handlePriceChange} placeholder="price"/>
        <button onClick={this.handleAddItem}>Add</button>
      </div>
    );
  }
}

export default Form;
