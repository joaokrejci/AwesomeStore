import React, { useState, Fragment } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const CART_QUERY = gql`
    query {
        cart {
            _id
            name
            description
            price
            image
        }
    }
`

const REMOVE_MUTATION = gql`
    mutation removeFromCart($id: ID!) {
        removeFromCart(id: $id){
            _id
        }
    }
`

const EMPTY_MUTATION = gql`
    mutation {
        emptyCart {
            _id
        }
    }
`

const _Cart = props => {
    const [products, setProducts] = useState(props.products)
    const [removeFromCart, removeData] = useMutation(REMOVE_MUTATION)

    const _remove = (id) => {
        removeFromCart({ variables: { id } })
        let _products = products.filter(p => p._id != id)
        setProducts(_products)
    }

    const _getTotal = () => {
        let total = 0.0
        products.map(p => {
            total += p.price
        })
        return total
    }

    return (
        <Fragment>
            {
                products.map(p => (
                    <div key={p._id} className="ProductDescriptor">
                        <img src={p.image} alt={p.name} />
                        <div>
                            <p>{p.name}</p>
                            <p>$ {p.price}</p>
                            <button onClick={() => _remove(p._id)}>remove</button>
                        </div>
                    </div>
                ))
            }

            <p>Total: <span>{_getTotal()}</span></p>
        </Fragment>
    )

}

const Cart = () => {
    const [shipment, setShipment] = useState('ship')

    const { error, loading, data } = useQuery(CART_QUERY)
    const [emptyCart, emptyData] = useMutation(EMPTY_MUTATION)

    if (error) return JSON.stringify(error)
    if (loading) return "Loading..."

    products = data.cart

    const _finishOrder = () => {
        emptyCart()
        location.href = "/finished"
    }


    return (
        <div className="Cart">
            <h2>Cart</h2>
            <_Cart products={products} />

            <div className="Shipment">
                <h3>Shipment</h3>
                <div>
                    <input type="radio" value="ship" checked={shipment == 'ship'} onChange={() => setShipment('ship')} />
                    <label>Ship</label>
                </div>
                <div>
                    <input type="radio" value="withdraw" checked={shipment == 'withdraw'} onChange={() => setShipment('withdraw')} />
                    <label>Withdraw</label>
                </div>
            </div>

            <button onClick={_finishOrder}>Finish Order</button>
        </div>
    )
}

export default Cart