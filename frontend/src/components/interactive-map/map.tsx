import React  from "react";
import {FullscreenControl , Layer , Map , Marker , NavigationControl , Source} from "react-map-gl";
import {useGeoLocation} from "../../hooks";
import {useAddressSearch} from "./address-search-provider.tsx";
import {createGeoJSONCircle , layerStyle} from "../../utils/geospatial.ts";
import {Pins} from "./pins.tsx";
import {useAppMapContext} from "../../provider/map.provider.tsx";










export const AppMap = () => {
   const {selectedLocation} = useAddressSearch();
   const { geoLocation} = useAppMapContext()

    const circle = createGeoJSONCircle(
        selectedLocation.coordinates ?
            selectedLocation.coordinates : {
                longitude: geoLocation.long ?? -73.935242,
                latitude: geoLocation.lat ?? 40.730610,
            } ,
        5
    );
   return(
       <React.Fragment>
           <Map
               id="mapA"
               mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
               initialViewState={{
                   longitude: -73.935242,
                   latitude: 40.730610,
                   zoom: 12

               }}
               style={{ width: '100%', height: '100%', position:"relative", zIndex: 12}}
               mapStyle="mapbox://styles/mapbox/streets-v11"
           >
               <FullscreenControl position="top-right" />
               <NavigationControl />
               {
                  selectedLocation.coordinates && <Marker
                       longitude={selectedLocation.coordinates.longitude}
                       latitude={selectedLocation.coordinates.latitude}
                   >
                       <span className="icon-[majesticons--map-marker] "  style={{width: "48px",height: "48px", color: "#49CC76" }}></span>
                   </Marker>
               }

               <Pins />
               <Source id="my-data" type="geojson" data={circle}>
                   <Layer {...layerStyle} />
               </Source>

           </Map>
       </React.Fragment>





   )
}
