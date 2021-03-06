import axios from 'axios'
import history from '../history'

// Action types

const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

// Action creators

const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products
})

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

const updateProduct = product => ({
  type: UPDATE_PRODUCT,
  product
})

const removeProduct = product => ({
  type: REMOVE_PRODUCT,
  product

})

// Thunk Creator

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get('/api/products')
      dispatch(setProducts(products))
    } catch (error) {
      next(error)
    }
  }
}

export const addProductThunk = (product, history) => async dispatch => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.post(`/api/products/`, product, {
      headers: {
        authorization: token
      }
    })
    dispatch(addProduct(data))
    history.push('/products')
  } catch (error) {
    console.log(error)
  }
}

export const updateProductThunk = (product, history) => async dispatch => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.put(`/api/products/${product.id}`, product,
      {
        headers: {
          authorization: token
        }
      }
    )
    dispatch(updateProduct(data))
    history.push('/products/adminproducts')
  } catch (error) {
    console.log(error)
  }
}

export const removeProductThunk = (id, history) => {
  return async (dispatch) => {
    const token = localStorage.getItem('token')
    const { data: deletedProduct } = await axios.delete(`/api/products/${id}`,
      {
        headers: {
          authorization: token
        }
      })
    dispatch(removeProduct(deletedProduct))
    history.push('/products/adminproducts')
  }
}


// Reducer

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    case UPDATE_PRODUCT:
      return state.map(product => {
        return product.id === action.product.id ? action.product : product
      })
    case REMOVE_PRODUCT:
      return state.filter(product => product.id !== action.product.id)
    default:
      return state
  }
}

