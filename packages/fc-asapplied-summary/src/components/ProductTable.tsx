// Libs
import * as React from 'react'
import * as _ from 'lodash'

// Components
import { View, Text } from "@react-pdf/core";
import Value from "../../../units/Value"

// Styles
import { styleSheet } from './Styles'
const styles: typeof styleSheet = styleSheet

// Types
import { Product, Settings, Translations } from './AsAppliedSummary'

interface RowProps {
  key: number,
  odd: number,
  product: string,
  area: number,
  coveredArea: number,
  amount: number,
  settings: Settings,
}

interface TableProps {
  entries: Array<Product>,
  settings: Settings
  translations: Translations,
}

class Row extends React.Component<RowProps> {
  render() {
    return (
      <View style={this.props.odd ? { ...styles.oddRowContainer, minWidth: 300 } : { ...styles.rowContainer, minWidth: 300 }}>
        <View style={{ ...styles.productRowItem, flex: '0 0 25%' }}>
          <Text>{this.props.product}</Text>
        </View>
        <View style={{ ...styles.rowItem, flex: '0 0 25%' }}>
          <Value from={'ha'} to={this.props.settings.areaUnit} value={this.props.area} />
        </View>
        <View style={{ ...styles.rowItem, flex: '0 0 25%' }}>
          <Value from={'ha'} to={this.props.settings.areaUnit} value={this.props.coveredArea} />
        </View>
        <View style={{ ...styles.rowItem, flex: '0 0 25%' }}>
          <Value from={'ea'} to={'ea'} value={this.props.amount} />
        </View>
      </View>
    )
  }
}

class ProductTable extends React.Component<TableProps> {
  constructor(props: TableProps) {
    super(props)
    this.renderTitleRow = this.renderTitleRow.bind(this)
    this.renderTotalsRow = this.renderTotalsRow.bind(this)
  }

  renderTitleRow() {
    const { product, area, coverageArea, totalApplied } = this.props.translations

    return (
      <View style={{ ...styles.titleContainer, minWidth: 300, flex: '0 0 auto' }}>
        <View style={{ ...styles.productTitleItem, flex: '0 0 25%' }}>
          <Text>{product}</Text>
        </View>
        <View style={{ ...styles.titleItem, flex: '0 0 25%' }}>
          <Text>
            {`${area} ${this.props.settings.areaUnit}`}
          </Text>
        </View>
        <View style={{ ...styles.titleItem, flex: '0 0 25%' }}>
          <Text>
            {`${coverageArea} ${this.props.settings.areaUnit}`}
          </Text>
        </View>
        <View style={{ ...styles.titleItem, flex: '0 0 25%' }}>
          <Text>
            {totalApplied}
          </Text>
        </View>
      </View>
    )
  }

  renderTotalsRow() {
    // Sum Values
    const totalArea = _.sum(_.map(this.props.entries, 'area'))
    const totalCoveredArea = _.sum(_.map(this.props.entries, 'coveredArea'))
    const totalAmount = _.sum(_.map(this.props.entries, 'amount'))

    return (
      <View style={{ ...styles.totalsRowContainer, minWidth: 300, flex: '0 0 auto' }}>
        <View style={{ ...styles.totalsTotalItem, flex: '0 0 25%' }}>
          <Text>{(this.props.translations.totals) ? this.props.translations.totals : ''}</Text>
        </View>
        <View style={{ ...styles.totalItem, flex: '0 0 25%' }}>
          <Text>{totalArea}</Text>
        </View>
        <View style={{ ...styles.totalItem, flex: '0 0 25%' }}>
          <Text>{totalCoveredArea}</Text>
        </View>
        <View style={{ ...styles.totalItem, flex: '0 0 25%' }}>
          <Text>{totalAmount}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container} data-test="fc-asapplied-summary/ProductTable">
        {this.renderTitleRow()}
        <View
          style={{
            flex: '1 1 auto',
            maxHeight: 500,
            overflowY: 'auto',
          }}
        >
          {this.props.entries.map((entry: Product, index: number): Object => {
            return (
              <Row
                key={index}
                odd={index % 2}
                product={entry.product}
                area={entry.area}
                coveredArea={entry.coveredArea}
                amount={entry.amount}
                settings={this.props.settings}
              />
            )
          })}
        </View>
        {this.renderTotalsRow()}
      </View>
    )
  }
}

export default ProductTable
