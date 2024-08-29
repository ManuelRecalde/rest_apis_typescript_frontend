import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, updateProductAvailability } from "../services/ProductService"
import ProductDetails from "../components/ProductDetails"
import { Product } from "../types"

export async function loader(){
  const products = await getProducts()

  return products
}

export async function action({request}: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  await updateProductAvailability(+data.id)
  return{}
}

export default function Products() {

  const products = useLoaderData() as Product[]

  return (
    <>
        <div className="flex justify-between">
            <h2 className="text-2xl lg:text-4xl font-black text-slate-500">Productos</h2>
            <Link
                to='productos/nuevo'
                className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
            >
                Agregar Producto
            </Link>
        </div>
        <div className="p-2 overflow-auto">
          <table className="w-full mt-5 table-auto">
            <thead className="bg-slate-800 text-white">
                <tr>
                    <th className="p-2 text-left">Producto</th>
                    <th className="p-2 text-left">Precio</th>
                    <th className="p-2 text-left">Disponibilidad</th>
                    <th className="p-2 text-left">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                  <ProductDetails 
                    key={product.id}
                    product={product}
                  />
                ))}
            </tbody>
          </table>
        </div>
    </>
  )
}
