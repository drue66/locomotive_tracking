import { Clusterer, Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { FC } from 'react';
import { locomotiveApi } from '../../../../entities/locomotive/api/locomotiveApi';
import { CENTER_LAT, CENTER_LNG } from '../../../../shared/constants/map';
import styles from './LocomotiveListMap.module.css';

const center = [CENTER_LAT, CENTER_LNG];

const { useFetchListQuery } = locomotiveApi;

const LocomotiveListMap: FC = () => {
  const {data} = useFetchListQuery();

  return (
      <YMaps query={{
        load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon'
      }}>
        <Map width={'100%'} height={400} defaultState={{ center: center, zoom: 5 }}>
          <Clusterer options={{
            preset: 'islands#invertedVioletClusterIcons',
            groupByCoordinates: false
          }}>
              {data?.map((locomotive) => (
                <Placemark
                  key={locomotive.id}
                  geometry={[locomotive.lat, locomotive.lng]}
                  options={{
                    iconLayout: "default#image",
                    iconImageSize: [50, 50],
                  }}
                  properties={{
                    balloonContentHeader: locomotive.name,
                    balloonContentBody: (`
                      <div class="${styles.description}">
                        <span class="${styles.description__title}">Серия</span>
                        <span class="${styles.description__value}">${locomotive.series}</span>
                      </div>
                      <div class="${styles.description}">
                        <span class="${styles.description__title}">Количество секции</span>
                        <span class="${styles.description__value}">${locomotive.quantitySections}</span>
                      </div>
                    `),
                  }}
                />
              ))}
            </Clusterer>
        </Map>
      </YMaps>
  );
};

export default LocomotiveListMap;