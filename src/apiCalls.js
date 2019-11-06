export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
}

export const addOrder = (burrito) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(burrito),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch('http://localhost:3001/api/v1/orders', options)
    .then(response => response.json()); 
}