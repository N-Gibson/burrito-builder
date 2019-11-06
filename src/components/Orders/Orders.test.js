import React from 'react';
import { Orders } from './Orders';
import { shallow } from 'enzyme';
import { mapStateToProps, mapDispatchToProps } from './Orders';
import { setOrders } from '../../actions/index';

describe('Orders', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Orders orders={[{ name: 'Bob', ingredients: ['eggs', 'potato'], id: 1}, { name: 'Sue', ingredients: ['pancake', 'sausage'], id: 2}]}/>)
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Orders mapStateToProps', () => {
  const mockState = {
    orders: [{ name: 'Bob', ingredients: ['eggs', 'potato']}, { name: 'Sue', ingredients: ['pancake', 'sausage']}]
  }

  const expectedState = {
    orders: [{ name: 'Bob', ingredients: ['eggs', 'potato']}, { name: 'Sue', ingredients: ['pancake', 'sausage']}]
  }

  const mappedProps = mapStateToProps(mockState);
  expect(mappedProps).toEqual(expectedState);
});

describe('Orders mapDispatchToProps', () => {
  let mockDispatch, mappedDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mappedDispatch = mapDispatchToProps(mockDispatch);
  });

  it('setOrders', () => {
    const actionToDispatch = setOrders([{ name: 'Bob', ingredients: ['eggs', 'potato']}, { name: 'Sue', ingredients: ['pancake', 'sausage']}]);
    mappedDispatch.setOrders([{ name: 'Bob', ingredients: ['eggs', 'potato']}, { name: 'Sue', ingredients: ['pancake', 'sausage']}])

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});