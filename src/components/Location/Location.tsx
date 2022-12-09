import styled from 'styled-components'
import React, { useEffect, useState } from 'react'

import { Box, TextInput } from '../../internal'
import { IconPrefix } from '@fortawesome/fontawesome-common-types';

export interface Place {
  address_components?: (AddressComponentsEntity)[] | null;
  adr_address: string;
  business_status: string;
  formatted_address: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  permanently_closed: boolean;
  photos?: (PhotosEntity)[] | null;
  place_id: string;
  plus_code: PlusCode;
  price_level: number;
  rating: number;
  reference: string;
  reviews?: (ReviewsEntity)[] | null;
  types?: (string)[] | null;
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  vicinity: string;
  website: string;
  html_attributions?: (null)[] | null;
  utc_offset_minutes: number;
}
export interface AddressComponentsEntity {
  long_name: string;
  short_name: string;
  types?: (string)[] | null;
}
export interface Geometry {
  location: Location;
  viewport: Viewport;
}
export interface Location {
  lat: () => number;
  lng: () => number;
}
export interface Viewport {
  south: number;
  west: number;
  north: number;
  east: number;
}
export interface PhotosEntity {
  height: number;
  html_attributions?: (string)[] | null;
  width: number;
}
export interface PlusCode {
  compound_code: string;
  global_code: string;
}
export interface ReviewsEntity {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export type LocationData = {
  displayName: string,
  address: {
    street1: string,
    city: string,
    region: string,
    postalCode: string
  },
  geolocation: {
    lat: number,
    lng: number
  },
  placeID: string
}

interface Props {
  value: LocationData,
  onChange: (props : LocationData) => void,
  iconPrefix?: IconPrefix,
  label?: string,
  alwaysHideMap?: boolean
}

export const Location = ({ 
  value,
  onChange,
  iconPrefix,
  label,
  alwaysHideMap
} : Props) => {
  const [hideMap, set_hideMap] = useState(true)

  const [googleMapsPlace, set_googleMapsPlace] = useState({} as Place)

  useEffect(() => {
    if (googleMapsPlace?.geometry?.location?.lat && googleMapsPlace?.geometry?.location?.lng) {

      const displayName = googleMapsPlace?.name
      const street1 = googleMapsPlace?.formatted_address
      const city = googleMapsPlace?.vicinity
      const region = ''
      const postalCode = ''
      const lat = googleMapsPlace.geometry.location.lat()
      const lng = googleMapsPlace.geometry.location.lng()
      const placeID = googleMapsPlace?.place_id


  
      onChange({
        displayName: displayName ? displayName : '',
        address: {
          street1: street1 ? street1 : '',
          city: city ? city : '',
          region,
          postalCode
        },
        geolocation: {
          lat: lat ? lat : 0,
          lng: lng ? lng : 0
        },
        placeID: placeID ? placeID : ''
      })
      set_displayName(displayName)
      set_hideMap(false)
    }
  }, [googleMapsPlace])

  const isScriptAlreadyIncluded = (src: string) => {
    const scripts = document.getElementsByTagName('script')
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].getAttribute('src') == src) {
        return true
      }
    }
    return false
  }

  const initialize = () => {
    const google = (window as any).google

    const map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 41.8781,
        lng: -87.6298
      },
      zoom: 13
    })
    const input = document.getElementById('pac-input') as HTMLInputElement
  
    const types = document.getElementById('type-selector')
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(types)
  
    const autocomplete = new google.maps.places.Autocomplete(input)
    autocomplete.bindTo('bounds', map)
  
    const infowindow = new google.maps.InfoWindow()
    const marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    })
  
    autocomplete.addListener('place_changed', function() {
      infowindow.close()
      marker.setVisible(false)
      const place = (autocomplete.getPlace() as Place)
      set_googleMapsPlace(place)
      
      if (!place.geometry) {
        return
      }
  
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport)
      } 
      else {
        map.setCenter(place.geometry.location)
        map.setZoom(17)
      }
      marker.setIcon({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      })
      marker.setPosition(place.geometry.location)
      marker.setVisible(true)
  
      let address = ''
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ')
      }
  
      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address)
      infowindow.open(map, marker)
    })

    // center map on location if it already is set
    if (value?.placeID && value?.displayName) {
      input.value = value?.displayName

      const placeId = value.placeID
      
      if (placeId) {
        const service = new google.maps.places.PlacesService(map)
        service.getDetails({
          placeId: placeId
        }, (result : any, status: any) => {
          const marker = new google.maps.Marker({
            map: map,
            place: {
              placeId: placeId,
              location: result.geometry.location
            }
          })
          map.fitBounds(result.geometry.viewport)
          marker.setPosition(result.geometry.location)
          marker.setVisible(true)
        })
      }
    }

    input.placeholder = ''
  }

  useEffect(() => {
    const src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBB0Rv9ax6hmOoWJ2gaY5IXw6WWGUHX0ko&v=3.exp&sensor=false&libraries=places'

    if (isScriptAlreadyIncluded(src)) {
      initialize()
    }
    else {
      const script = document.createElement('script')
      script.async = true
      script.src = src,
      document.body.appendChild(script)
      script.onload = initialize
    }
  }, [])


  const [displayName, set_displayName] = useState(value?.displayName ? value?.displayName : '')

  return (<Box width='100%' wrap={true}>
    <TextInput 
      value={displayName}
      onChange={newValue => set_displayName(newValue)}
      id='pac-input'
      icon='map-marker-alt'
      iconPrefix={iconPrefix}
      tooltip='The name of location may be shared with Google'
      label={label}
    />
    
    <S.Map id='map' hide={hideMap || !!alwaysHideMap}></S.Map>
  </Box>)
}

const S = {
  Location: styled.div`
    width: 100%;
  `,
  Map: styled.div<{
    hide: boolean
  }>`
    display: ${props => props.hide ? 'none' : 'block'};
    margin-top: .75rem;
    width: 100%;
    min-height: 200px;
    max-height: 30vh;
    border-radius: .5rem;
  `
}
