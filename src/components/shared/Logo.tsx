import { Link } from 'react-router-dom';
import * as IMG from './../../assets';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center flex-col">
      <img src={IMG.WarpPay} alt="Logo" className=" h-[55px] w-[150px]" />
    </Link>
  );
}
