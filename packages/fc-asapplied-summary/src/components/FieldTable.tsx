// Libs
import * as React from 'react'
import _ from 'lodash'

// Components
import Value from '../../../units/Value'
import { View, Text } from "@react-pdf/core";

// Styles
import { styleSheet } from './Styles'
const styles: typeof styleSheet = styleSheet

// Types
import { Field, Settings, Translations } from './AsAppliedSummary'

interface TableProps {
  entries: Array<Field>,
  settings: Settings
  translations: Translations
}
interface RowProps {
  key: number,
  odd: number,
  field: string,
  product: string,
  area: number,
  coveredArea: number,
  minTarget: number | null,
  maxTarget: number | null,
  totalApplied: number,
  settings: Settings,
}

class Row extends React.PureComponent<RowProps> {
  render() {
    return (
      <View style={this.props.odd ? styles.oddRowContainer : styles.rowContainer}>
        <View style={{ ...styles.productRowItem, flex: '0 0 15%' }}>
          <Text>{this.props.field}</Text>
        </View>
        <View style={{ ...styles.productRowItem, flex: '0 0 15%' }}>
          <Text>{this.props.product}</Text>
        </View>
        <View style={{ ...styles.rowItem, flex: '0 0 10%' }}>
          <Text>{this.props.area}</Text>
        </View>
        <View style={{ ...styles.rowItem, flex: '0 0 20%' }}>
          <Text>{this.props.coveredArea}</Text>
        </View>
        <View style={{ ...styles.rowItem, flex: '0 0 10%' }}>
          <Text>{this.props.minTarget}</Text>
        </View>
        <View style={{ ...styles.rowItem, flex: '0 0 10%' }}>
          <Text>{this.props.maxTarget}</Text>
        </View>
        <View style={{ ...styles.rowItem, flex: '0 0 20%' }}>
          <Text>{this.props.totalApplied}</Text>
        </View>
      </View>
    )
  }
}

class FieldTable extends React.Component<TableProps> {
  constructor(props: TableProps) {
    super(props)
    this.renderTitleRow = this.renderTitleRow.bind(this)
    this.renderTotalsRow = this.renderTotalsRow.bind(this)
  }

  renderTitleRow() {
    const { 
      field, 
      product, 
      area, 
      coverageArea, 
      minTarget, 
      maxTarget,
      totalApplied 
    } = this.props.translations
    
    return (
      <View style={styles.titleContainer}>
        <View style={{ ...styles.productTitleItem, flex: '0 0 15%' }}>
          <Text>{field}</Text>
        </View>
        <View style={{ ...styles.productTitleItem, flex: '0 0 15%' }}>
          <Text>{product}</Text>
        </View>
        <View style={{ ...styles.titleItem, flex: '0 0 10%' }}>
          <Text>{`${area} ${this.props.settings.areaUnit}`}</Text>
        </View>
        <View style={{ ...styles.titleItem, flex: '0 0 20%' }}>
          <Text>{`${coverageArea} ${this.props.settings.areaUnit}`}</Text>
        </View>
        <View style={{ ...styles.titleItem, flex: '0 0 10%' }}>
          <Text>{minTarget}</Text>
        </View>
        <View style={{ ...styles.titleItem, flex: '0 0 10%' }}>
          <Text>{maxTarget}</Text>
        </View>
        <View style={{ ...styles.titleItem, flex: '0 0 20%' }}>
          <Text>{totalApplied}</Text>
        </View>
      </View>
    )
  }

  renderTotalsRow() {
    // Sum Values
    const totalArea = _.sum(_.map(this.props.entries, 'area'))
    const totalCoveredArea = _.sum(_.map(this.props.entries, 'coveredArea'))
    const totalMinTargets = _.sum(_.map(this.props.entries, 'minTarget'))
    const totalMaxTargets = _.sum(_.map(this.props.entries, 'maxTarget'))
    const totalTotalApplied = _.sum(_.map(this.props.entries, 'totalApplied'))

    const { totals } = this.props.translations
    const blankText = ' '

    // Return Row
    return (
      <View style={styles.totalsRowContainer}>
        <View style={{ ...styles.totalsTotalItem, flex: '0 0 15%' }}>
          <Text>{totals}</Text>
        </View>
        <View style={{ ...styles.totalItem, flex: '0 0 15%' }}>
          <Text>{blankText}</Text>
        </View>
        <View style={{ ...styles.totalItem, flex: '0 0 10%' }}>
          <Text>{!isNaN(totalArea) ? totalArea : ''}></Text>
        </View>
        <View style={{ ...styles.totalItem, flex: '0 0 20%' }}>
          <Text>{!isNaN(totalCoveredArea) ? totalCoveredArea : ''}</Text>
        </View>
        <View style={{ ...styles.totalItem, flex: '0 0 10%' }}>
          <Text>{!isNaN(totalMinTargets) ? totalMinTargets : ''}</Text>
        </View>
        <View style={{ ...styles.totalItem, flex: '0 0 10%' }}>
          <Text>{!isNaN(totalMaxTargets) ? totalMaxTargets : ''}</Text>
        </View>
        <View style={{ ...styles.totalItem, flex: '0 0 20%' }}>
          <Text>{!isNaN(totalTotalApplied) ? totalTotalApplied : ''}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View
        style={{
          overflowX: 'auto',
          boxShadow: '0 0 2px rgba(0,0,0,0.2)',
        }}
        data-test="fc-asapplied-summary/FieldTable"
      >
        {this.renderTitleRow()}
        {this.props.entries.map((entry: Field, index: number): Object => {
          return (
            <Row
              key={index}
              odd={index % 2}
              field={entry.field}
              product={entry.product}
              area={entry.area}
              coveredArea={entry.coveredArea}
              minTarget={entry.minTarget}
              maxTarget={entry.maxTarget}
              totalApplied={entry.totalApplied}
              settings={this.props.settings}
            />
          )
        })}
        {this.renderTotalsRow()}
      </View>
    )
  }
}

export default FieldTable
