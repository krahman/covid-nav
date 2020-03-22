import React, { Component } from 'react'
import './Map.css'
import ReactTooltip from 'react-tooltip'
import {
  ComposableMap,
  Geographies,
  ZoomableGroup,
  Geography
} from 'react-simple-maps'

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m.json'

class Map extends Component {

  tooltipRebuild = () => ReactTooltip.rebuild()

  handleGeographyClick = (country) => () => {
    console.log(country)
  }

  defaultGeoStyle () {
    return {
      fill: 'var(--darker-grey)',
      stroke: '#333',
      strokeWidth: 0.1,
      outline: 'none'
    }
  }

  onGeoHover () {
    return {
      fill: '#FF5733',
      stroke: '#C70039',
      strokeWidth: 0.1,
      cursor: 'pointer',
      outline: 'none'
    }
  }

  onGeoPressed () {
    return {
      fill: '#19B5FE',
      stroke: '#1F4788',
      strokeWidth: 0.1,
      cursor: 'pointer',
      outline: 'none'
    }
  }

  componentDidUpdate () {
    setTimeout(() => {
      this.tooltipRebuild()
    }, 100)
  }

  render () {
    return (
      <div>
        <ComposableMap
          height={470}
          width={800}
          projection={'geoMercator'}
          projectionConfig={{
            scale: 80
          }}
          style={{
            backgroundColor: '#666'
          }}
        >
          <ZoomableGroup>
            <Geographies
              geography={geoUrl}
              onMouseEnter={() => {
                this.tooltipRebuild()
              }}
            >
              {({ geographies }) =>
                geographies
                  .filter(geo => geo.properties.ISO_A3 !== 'ATA')
                  .map((geo) => {
                    return (
                      <Geography
                        className="map-geography"
                        key={geo.rsmKey}
                        geography={geo}
                        data-tip={`${geo.properties.NAME}`}
                        onClick={this.handleGeographyClick(geo.properties)}
                        style={{
                          default: this.defaultGeoStyle(),
                          hover: this.onGeoHover(),
                          pressed: this.onGeoPressed()
                        }}
                      />
                    )
                  })}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <ReactTooltip className="plot-tooltip" type={'dark'} html={true}/>
      </div>
    )
  }
}

export default Map
