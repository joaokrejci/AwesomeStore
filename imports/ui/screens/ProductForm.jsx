import React, { useState } from 'react'
import { encode } from 'base64-arraybuffer'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const INSERT_PRODUCT = gql`
    mutation insertProduct($input: ProductInput!){
        insertProduct(input: $input) {
            _id
        }
    }
`

const ProductForm = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0.0)
    const [image, setImage] = useState(null)

    const [insertProduct, { data }] = useMutation(INSERT_PRODUCT)

    const _submit = ev => {
        ev.preventDefault()

        if (image) insertProduct({
            variables: {
                input: { name, description, price, image }
            }
        })
    }

    const _loadImage = async ev => {
        let file = ev.target.files[0]

        let reader = new FileReader()
        reader.onload = () => {
            let data = encode(reader.result),
                img = `data:${file.type};base64,${data}`

            setImage(img)
        }
        reader.readAsArrayBuffer(file)
    }

    return (
        <div className="ProductForm">
            <h2>Product Insert</h2>
            <form onSubmit={_submit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={ev => setName(ev.target.value)} />
                <label htmlFor="description">Description</label>
                <textarea id="description" value={description} onChange={ev => setDescription(ev.target.value)} />
                <label htmlFor="price">Price</label>
                <input id="price" type="number" step={0.1} value={price} onChange={ev => setPrice(Number.parseFloat(ev.target.value))} />
                <label htmlFor="image">Photo</label>
                <input type="file" accepts="image/*" id="image" onChange={_loadImage} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default ProductForm
