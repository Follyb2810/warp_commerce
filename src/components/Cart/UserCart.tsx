import { useParams } from "react-router-dom"


export default function UserCart() {
    const {buyerCartId} = useParams()
  return (
    <div>UserCart {buyerCartId}</div>
  )
}
