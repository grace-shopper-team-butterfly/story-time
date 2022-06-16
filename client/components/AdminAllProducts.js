import React from "react";
import { connect } from 'react-redux'
import {fetchProducts, removeProductThunk} from '../store/books_reducer'
import { Link } from "react-router-dom";

export class AdminAllProducts extends React.Component {
  constructor(props){
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount(){
    this.props.fetchProducts()
  }

  handleDelete(product){
    this.props.removeProduct(product)
  }

  render() {
    const {products} = this.props
    return(
      <div>
      <h1>Books</h1>
      <div className='allDisplay'>
      {products.map(product => (
          <div key={product.id}>
              <Link to={`/products/${product.id}`} key= {product.id}>
              <div className='singleProduct' key={product.id}>
                  <h1>{product.title}</h1>
                  <img src={product.imageUrl}/>
                  <p>{product.price}</p>
              </div>
              </Link>
              <button type="button" onClick={() => {this.props.removeProduct(product)}}>Delete</button>
          </div>
      ))}
      </div>
  </div>
    )
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    isAdmin: state.user.admin
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    removeProduct: product => dispatch(removeProductThunk(product))
  }
}

export default connect(mapState, mapDispatch)(AdminAllProducts)