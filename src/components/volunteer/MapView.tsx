'use client'

import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix default marker icons for webpack/Next.js
const blueIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconRetinaUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface FitBoundsProps {
  volunteerPos: { lat: number; lng: number }
  destination: { lat: number; lng: number }
}

function FitBounds({ volunteerPos, destination }: FitBoundsProps): null {
  const map = useMap()
  const prevBoundsRef = useRef<string>('')

  useEffect(() => {
    const key = `${volunteerPos.lat},${volunteerPos.lng},${destination.lat},${destination.lng}`
    if (prevBoundsRef.current === key) return
    prevBoundsRef.current = key
    const bounds = L.latLngBounds(
      [volunteerPos.lat, volunteerPos.lng],
      [destination.lat, destination.lng]
    )
    map.fitBounds(bounds, { padding: [40, 40] })
  }, [map, volunteerPos.lat, volunteerPos.lng, destination.lat, destination.lng])

  return null
}

interface MapViewProps {
  volunteerPos: { lat: number; lng: number }
  destination: { lat: number; lng: number }
}

export default function MapView({ volunteerPos, destination }: MapViewProps): JSX.Element {
  const center: [number, number] = [
    (volunteerPos.lat + destination.lat) / 2,
    (volunteerPos.lng + destination.lng) / 2,
  ]

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[volunteerPos.lat, volunteerPos.lng]} icon={blueIcon} />
      <Marker position={[destination.lat, destination.lng]} icon={redIcon} />
      <Polyline
        positions={[
          [volunteerPos.lat, volunteerPos.lng],
          [destination.lat, destination.lng],
        ]}
        color="blue"
        weight={3}
        dashArray="6 6"
      />
      <FitBounds volunteerPos={volunteerPos} destination={destination} />
    </MapContainer>
  )
}
