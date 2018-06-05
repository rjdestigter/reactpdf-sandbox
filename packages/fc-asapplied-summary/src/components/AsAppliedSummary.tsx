// Libs
import * as React from 'react'
import * as colors from '../../../styles/colors'

// Components
import { View, StyleSheet, Text, Page } from "@react-pdf/core";
import FieldTable from './FieldTable'
import ProductTable from './ProductTable'
import Header from './Header'
// import AppliedImg from 'fc-icons/src/Applied'

// Types
export interface Season {
  startDate: number
  endDate: number
  id: number
  label: string
  previous: number
}

export interface Field {
  key?: number,
  odd?: number,
  field: string,
  product: string,
  area: number,
  coveredArea: number,
  minTarget: number | null,
  maxTarget: number | null,
  totalApplied: number,
}

export interface Product {
  key?: number,
  odd?: number,
  product: string,
  area: number,
  coveredArea: number,
  amount: number,
}

export interface Settings {
  system: string,
  areaUnit: string,
  lengthUnit: string,
  yieldUnit: string,
  elevUnit: string,
  speedUnit: string,
  fuelUnit: string,
  liquidUnit: string,
  solidUnit: string,
  rowSpacing: string,
  seedingDepth: string,
  seedingRateMass: string,
  seedingRateArea: string,
  plantPopulation: string,
}

export interface Translations {
  noData: string,
  field: string,
  product: string,
  area: string,
  coverageArea: string,
  minTarget: string,
  maxTarget: string,
  totalApplied: string,
  totals: string,
  asAppliedSummary: string,
  grower: string,
  farm: string,
  season: string,
}

interface Props {
  grower: string,
  farm: string,
  season: Season,
  productsList: Array<Product>,
  viewport: {
    width: number,
    height: number,
  },
  appliedSummaries: Array<Field>,
  settings: Settings,
  translations: Translations
}

const styles = StyleSheet.create({
  middle: {
    flexDirection: 'row',
    display: 'flex',
    paddingTop: 20,
  },
  image: {
    flex: '0 1 25%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginRight: 20,
  },
})

class AsAppliedSummary extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.renderNoDataMessage = this.renderNoDataMessage.bind(this)
  }

  renderNoDataMessage() {
    const { noData } = this.props.translations
    return (
      <Page size="A4">
        <View style={{ display: 'flex', padding: 30, justifyContent: 'center' }}>
          <Text>{noData}</Text>
        </View>
      </Page>
    )
  }

  render() {
    return this.props.appliedSummaries.length ? (
      <Page size="A4">
        <View style={styles.container} data-test="As Applied Summary">
          <Header
            grower={this.props.grower}
            farm={this.props.farm}
            season={this.props.season}
            translations={this.props.translations}
          />
          <View style={styles.middle}>
            {this.props.viewport.width >= 650 ? (
              <View style={styles.image}>
                <Text>Placeholder for image</Text>
                {/* insert AppliedImg here */}
              </View>
            ) : null}
            <ProductTable 
              entries={this.props.productsList} 
              settings={this.props.settings} 
              translations={this.props.translations}
            />
          </View>
          <View style={{ paddingTop: 20 }}>
            <FieldTable 
              entries={this.props.appliedSummaries}
              settings={this.props.settings} 
              translations={this.props.translations}
            />
          </View>
        </View>
      </Page>
    ) : (
      this.renderNoDataMessage()
    )
  }
}

export default AsAppliedSummary
