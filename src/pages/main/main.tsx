import {useState} from 'react';
import CardsList from '../../components/cards-list/cards-list';
import Logo from '../../components/logo/logo';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {CITIES} from '../main/const';

import {OfferType} from '../../types/offer-type';
import Map from '../../components/map/map';

type MainProps = {
  cardsCount: number;
  offers: OfferType[];
}

function MainPage({cardsCount, offers}: MainProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<OfferType | undefined>(
    undefined
  );
  const handleListItemHover = (listItemId: string) => {
    const currentPin = offers.find((offer) => offer.id === listItemId);
    setSelectedOffer(currentPin);
  };
  const handleListItemOut = () => {
    setSelectedOffer(undefined);
  };
  return(
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo/>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                    Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="#">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {
                CITIES.map((city)=>(
                  <li key={city} className="locations__item">
                    <Link className="locations__item-link tabs__item" to="#">
                      <span>{city}</span>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cardsCount} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                  Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                  Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                  Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                  Top rated first
                  </li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <CardsList offers={offers} onListItemHover={handleListItemHover} onListItemOut={handleListItemOut}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" >
                <Map offers={offers} selectedOffer={selectedOffer}
                  mapWidth = {'auto'}
                  mapHeight = {'100%'}
                  mapMargin ={'auto'}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


export default MainPage;
