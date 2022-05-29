/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect } from 'react'
import { Map, Marker } from 'pigeon-maps'
import { stamenToner } from 'pigeon-maps/providers'
import { Place } from 'contexts/types'

export const OrganizationMap = ({
  place,
  placeInformationRef
}: {
  place: Place
  placeInformationRef: HTMLDivElement | null
}) => {
  const [mapHeight, setMapHeight] = useState<number>(430)
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    place.latitude ? parseFloat(place.latitude) : 50.0647,
    place.longitude ? parseFloat(place.longitude) : 19.945
  ])
  const [mapZoom, setMapZoom] = useState<number>(14)

  useEffect(() => {
    if (placeInformationRef !== null) {
      setMapHeight(placeInformationRef.offsetHeight)
    }
  }, [placeInformationRef])

  return (
    <Map
      provider={stamenToner}
      dprs={[1, 2]}
      height={mapHeight}
      center={mapCenter}
      zoom={mapZoom}
      onBoundsChanged={({ center, zoom }) => {
        setMapCenter(center)
        setMapZoom(zoom)
      }}
    >
      {place.latitude && place.longitude && (
        <Marker
          width={50}
          anchor={[parseFloat(place.latitude!), parseFloat(place.longitude!)]}
          color="#00e676"
          onClick={() => {
            setMapCenter([
              parseFloat(place.latitude!),
              parseFloat(place.longitude!)
            ])
          }}
        />
      )}
    </Map>
  )
}
