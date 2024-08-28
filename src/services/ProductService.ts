import { DraftProductSchema, Product, ProductsSchema, ProductSchema } from "../types"
import { safeParse , number, parse, string,boolean, transform, pipe} from "valibot"
import axios from "axios"

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data : ProductData){
    try{
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no validos')
        }
    } catch(error) {
        console.log(error)
    }

}

export async function getProducts(){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success){
            return result.output
        } else{
            throw new Error ('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id: Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success){
            return result.output
        } else{
            throw new Error ('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data: ProductData, id: Product['id']){
    try {
        const NumberSchema = pipe(string(), transform(Number), number());
        const BooleanSchema = pipe(
            string(),
            transform((value) => value === "true"),
            boolean()
        );
        
        const result = safeParse(ProductSchema,{
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: parse(BooleanSchema,data.availability)
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            
            await axios.put(url,result.output)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id: Product['id']){

    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
        
    } catch (error) {
        console.log(error)
    }   
}

export async function updateProductAvailability(id: Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
        
    } catch (error) {
        console.log(error)
    }
}