import * as IMG from './../../assets' 
export default function ShopBanner() {
    return (
      <div className="relative w-full h-56 bg-cover bg-center" 
      // style={{ backgroundImage: IMG.ShopBanner }}
      style={{ backgroundImage: `url(${IMG.ShopBanner})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center">
          <p className="text-sm uppercase">Lorem ipsum l sesa grem</p>
          <h1 className="text-2xl font-bold">Lorem Ipsum dolor sit turim</h1>
        </div>
      </div>
    );
  }
  