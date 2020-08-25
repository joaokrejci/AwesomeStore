import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const PRODUCTS_QUERY = gql`
    query products {
        products {
            _id
            name
            description
            price
            image
        }
    }
`

const ADD_CART_MUTATION = gql`
    mutation ($id: ID!) {
        insertIntoCart(id: $id) {
            _id            
        }
    }

`

const Home = () => {
    const { error, loading, data } = useQuery(PRODUCTS_QUERY)
    const [insertIntoCart, mutationData] = useMutation(ADD_CART_MUTATION)

    if (loading) return "Loading..."
    if (error) return JSON.stringify(error)

    let products = data.products

    const _addToCart = (id) => {        
        insertIntoCart({ variables: { id } })
    }

    return (
        <div className="Home">
            <h2>Products</h2>

            <div className="Products">
                {
                    products.map(product => (
                        <div className="Product" key={product._id}>
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <h4>$ {product.price}</h4>
                            <p>{product.description}</p>

                            <button onClick={() => _addToCart(product._id)}>Add to Cart</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home