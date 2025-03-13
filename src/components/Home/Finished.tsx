import { finsidCardData } from '@/CONSTANT/data'
import FinishedCard from '../shared/FinishedCard'

export default function Finished() {
  return (
    <section className="container mx-auto py-10">
    <h2 className="text-2xl font-bold text-center mb-6">Featured Properties</h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {finsidCardData.map((property, index) => (
        <FinishedCard key={index} {...property} />
      ))}
    </div>
  </section>
  )
}
