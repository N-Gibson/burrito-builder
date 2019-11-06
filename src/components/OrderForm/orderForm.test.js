import React from 'react';
import { OrderForm } from './OrderForm';
import { shallow } from 'enzyme';
import { mapStateToProps, mapDispatchToProps } from './OrderForm';
import { setOrders } from '../../actions/index';

describe('Order Form', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<OrderForm orders={[{ name: 'Bob', ingredients: ['eggs', 'potato'], id: 1}, { name: 'Sue', ingredients: ['pancake', 'sausage'], id: 2}]}/>)
  })
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to handle a name change', () => {
    const mockEvent = {target : {name: 'Bob', value: 'Apples'}}

    wrapper.find('input').simulate('change', mockEvent);

    expect(wrapper.state('name').toEqual('Bob'))
  })
});

describe('Order Form mapStateToProps', () => {
  const mockState = {
    orders: [{ name: 'Bob', ingredients: ['eggs', 'potato']}, { name: 'Sue', ingredients: ['pancake', 'sausage']}],
    name: '',
    ingredients: [],
  }

  const expectedState = {
    orders: [{ name: 'Bob', ingredients: ['eggs', 'potato']}, { name: 'Sue', ingredients: ['pancake', 'sausage']}],
  }

  const mappedProps = mapStateToProps(mockState)
  expect(mappedProps).toEqual(expectedState)
});

describe('Order Form', () => {
  let mockDispatch, mappedDispatch

  beforeEach(() => {
    mockDispatch = jest.fn();
    mappedDispatch = mapDispatchToProps(mockDispatch);
  });

  it('setOrders', () => {
    const actionToDispatch = setOrders([{ name: 'Bob', ingredients: ['eggs', 'potato']}, { name: 'Sue', ingredients: ['pancake', 'sausage']}]);
    mappedDispatch.setOrders([{ name: 'Bob', ingredients: ['eggs', 'potato']}, { name: 'Sue', ingredients: ['pancake', 'sausage']}])

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  })
})