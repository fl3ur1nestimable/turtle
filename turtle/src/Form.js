
import React from 'react';
import './Form.css';

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
      <div id = "body_form">
        <div className='row1'>
        <input className='formi' size = "30" type="text" value={this.state.title} onChange={this.handleTitleChange} placeholder="title"/>
        <input className='formi' type="text" value={this.state.price} onChange={this.handlePriceChange} placeholder="price"/>
        <button className='formb' onClick={this.handleAddItem}>Add</button>
        </div>
        <div className='row2'>
        <textarea className='formt' value={this.state.description} onChange={this.handleDescriptionChange} rows="5" cols="50" maxLength="500" placeholder="description"></textarea>
        </div>
        
      </div>

    );
  }
}

export default Form;
