import React from "react";
import { connect } from 'react-redux'
import { fetchOneProduct } from "../store/singleBook_reducer";
import { updateProductThunk } from "../store/books_reducer";
import { Button } from "@mui/material";

const initialState = {
  title: '',
  author: '',
  imageUrl: '',
  price: 0,
  discription: ''
}

export class AdminUpdateBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.id = this.props.match.params.id
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.getProduct(this.id)
    this.setState(this.props.product)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.editProduct({ ...this.state })
  }

  render() {
    const {
      title,
      author,
      imageUrl,
      price,
      description
    } = this.state

    return (
      <div id="edit-product">
        <h2>Edit Product</h2>
        <form id="edit-product-form" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input onChange={this.handleChange} name="title" value={title} />
          <label htmlFor="author">Author:</label>
          <input onChange={this.handleChange} name="author" value={author} />
          <label htmlFor="imageUrl">Image:</label>
          <input onChange={this.handleChange} name="imageUrl" value={imageUrl} />
          <label htmlFor="price">Price:</label>
          <input onChange={this.handleChange} name="price" value={price} />
          <label htmlFor="description">Description: </label>
          <textarea onChange={this.handleChange} name="description" value={description} />
          <br></br>
          <Button variant="contained" color="secondary" type="submit" sx={{ mt: 2 }}>Submit</Button>

        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    getProduct: id => dispatch(fetchOneProduct(id)),
    editProduct: product => dispatch(updateProductThunk(product, history))
  }
}

export default connect(mapState, mapDispatch)(AdminUpdateBooks)
