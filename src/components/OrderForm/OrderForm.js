import React, { Component } from 'react';
import { setOrders } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addOrder } from '../../apiCalls';

export class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleIngredientChange = e => {
    e.preventDefault();
    this.setState({ingredients: [...this.state.ingredients, e.target.name]});
    console.log(this.state)
  }

  handleSubmit = e => {
    const { orders, setOrders } = this.props;
    e.preventDefault();

    if(this.state.name !== '' &&this.state.ingredients !== []) {
      addOrder(this.state)
        .then(data => setOrders([data, ...orders]))
        .catch(err => console.error('Error fetching', err))
      ;
    }
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export const mapStateToProps = ({ orders }) => ({
  orders
})

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setOrders,
    addOrder,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);