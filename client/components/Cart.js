import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, modifyProductInCart, sendCartCheckout, removeProductCart } from '../store/order_reducer'
import {
  Box,
  ButtonGroup,
  Button,
  Card,
  CardMedia,
  IconButton,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';


class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
      open: false
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      quantity: e.target.value
    })
  }

  handleClickOpen(){
   this.setState({
    open:true
   })
  }

  render() {
    const { quantity, open } = this.state
    const { books } = this.props.cart
    const { handleChange, handleClickOpen } = this
    return (
      <div>

        <h1>Shopping Cart</h1>
        <Grid container spacing={1}>
          {books ?
            <Grid item md={9} xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" colSpan={2}>Product</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="center">Total Price</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {books.sort((a, b) => a.id - b.id).map((book) => (
                      <TableRow
                        key={book.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" align="center" >
                          <img src={book.imageUrl} height="100px" />
                        </TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell align="center">
                          <ButtonGroup disableElevation variant="contained">
                            <Button disabled={book.bookOrder.quantity === 1} onClick={() => { this.props.modifyProductInCart(book, book.bookOrder.quantity - 1), this.props.fetchCart() }}>-</Button>
                            <Button >{book.bookOrder.quantity}</Button>
                            <Button onClick={() => { this.props.modifyProductInCart(book, book.bookOrder.quantity + 1), this.props.fetchCart() }}>+</Button>
                          </ButtonGroup></TableCell>
                        <TableCell align="center">${book.bookOrder.subTotal / 100}</TableCell>
                        <TableCell align="center">
                          <IconButton aria-label="delete" onClick={() => { this.props.removeProductCart(book), this.props.fetchCart() }}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid> : ''}
          <Grid item md={3} xs={12}>
            <Card>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography>
                          Total Price:
                        </Typography>
                      </TableCell>
                      <TableCell>${this.props.cart.purchaseTotal / 100}</TableCell>
                    </TableRow>
                    <TableRow align="center">
                      <TableCell>
                        <Button disabled={books && !books[0]} onClick={() => this.props.sendCartCheckout(this.props.cart)}>Checkout</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow align="center">
                      <TableCell>
                        <img src='https://images.squarespace-cdn.com/content/v1/5a760a4890bade7aa2cc94b2/1530909622840-T9MKK1Y7MHGJRECSTWXQ/credit-card-logos+copy.png?format=1000w' height="30px" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    modifyProductInCart: (product, quantity) => dispatch(modifyProductInCart(product, quantity, history)),
    sendCartCheckout: (cart) => dispatch(sendCartCheckout(cart, history)),
    removeProductCart: (product) => dispatch(removeProductCart(product, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
