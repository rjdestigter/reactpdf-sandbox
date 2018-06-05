// Libs
import * as React from 'react'

// Components
import { View, Text } from "@react-pdf/core";

// Styles
import { styleSheet } from './Styles'
const styles: typeof styleSheet = styleSheet

import { Season, Translations } from './AsAppliedSummary'

interface Props {
  grower: string
  farm: string
  season: Season
  translations: Translations
}

export default class extends React.Component<Props> {
  constructor(props: Props){
    super(props)
  }
  render() {
    const { asAppliedSummary, grower, farm, season } = this.props.translations 

    return(
      <View style={styles.mainDiv}>
        <View style={styles.upperBox}>
          <View style={styles.titleDiv}>
            <Text>{asAppliedSummary}</Text>
          </View>
        </View>
        <View style={styles.lowerBox}>
          <View style={styles.infoDiv}>
            <View>
              <Text>{`${grower}: ${this.props.grower || 'Please Select a Grower'}`}</Text>
            </View>
            <View>
              <Text>{`${farm}: ${this.props.farm || 'Please Select a Farm'}`}</Text>
            </View>
            <View>
              <Text>{`${season}: ${this.props.season ? this.props.season.label : ''}`}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
