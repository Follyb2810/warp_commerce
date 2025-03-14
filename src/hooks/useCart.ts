import { useUserCartQuery } from '@/api/cartService';

export default function useCart() {
    
  const {isLoading,data,error} = useUserCartQuery({});
  
  return {isLoading,data,error}
}
