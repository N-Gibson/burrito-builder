import React, { Component } from 'react';
import './Orders.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setOrders } from '../../actions';
import { getOrders } from '../../apiCalls';

export class Orders extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    getOrders()
      .then(data => this.props.setOrders(data.orders))
      .catch(err => console.error('Error fetching:', err));
  }

  render() {
    const { orders } = this.props
    const orderEls = orders.map(order => {
      return (
        <div className="order" key={order.id}>
          <h3>{order.name}</h3>
          <ul className="ingredient-list">
            {order.ingredients.map(ingredient => {
              return <li key={ingredient}>{ingredient}</li>
            })}
          </ul>
        </div>
      )
    });

    return (
      <section>
        { orderEls.length ? orderEls : <p>No orders yet!</p> }
      </section>
    )
  }
}

export const mapStateToProps = ({ orders }) => ({
  orders
});

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setOrders,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Orders);