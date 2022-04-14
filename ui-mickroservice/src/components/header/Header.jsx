import electroCar from '../../assets/electro-car.png';
import './header.css';

const Header = ({ className }) => {
  return (
    <header className={className}>
      <div className="header-image">
        <img src={electroCar} alt="car" />
      </div>
      <div className="header-title">
        <h1>
          Best Content Management System <br/>For Electric Cars
        </h1>
        <p>It is simple to manage, store, and track content from creation to publication.</p>
      </div>
    </header>
  )
}

export default Header;
