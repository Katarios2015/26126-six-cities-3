import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {City, OfferType} from '../../types/offer-type';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, EMPTY_LOCATION} from '../map/const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: OfferType[];
  selectedOffer: OfferType | undefined;
  mapWidth: string;
  mapHeight: string;
  mapMargin: string;
  actualCity: string;
  offerPageMap: boolean;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const {offers, selectedOffer, mapWidth, mapHeight, mapMargin, actualCity, offerPageMap} = props;


  const offer = offers.find((item)=> item.city.name === actualCity);


  const getCityFromOffer = (someOffer:OfferType|undefined):City=> {
    if(someOffer) {
      const city = someOffer.city;
      return city;
    }
    return EMPTY_LOCATION;
  };

  const activeCity = getCityFromOffer(offer);


  const mapRef = useRef(null);
  const map = useMap(mapRef, activeCity);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((item) => {
        const marker = new Marker({
          lat: item.location.latitude,
          lng: item.location.longitude
        });

        if(offerPageMap) {
          const selectedMarker = new Marker(
            selectedOffer !== undefined ? {
              lat: selectedOffer.location.latitude,
              lng: selectedOffer.location.longitude
            } : {
              lat: 0,
              lng: 0
            });
          selectedMarker
            .setIcon(currentCustomIcon)
            .addTo(markerLayer);
        }

        marker
          .setIcon(
            selectedOffer !== undefined && item.id === selectedOffer.id && !offerPageMap
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, offerPageMap]);

  return <div style={{height: mapHeight, width:mapWidth, margin: mapMargin}} ref={mapRef}></div>;
}

export default Map;
