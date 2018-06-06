import * as colors from '../../../styles/colors'
import { StyleSheet, Font } from "@react-pdf/core";

// Font.register('../../../fonts/Roboto-Regular.ttf', {
//   family: "Roboto"
// })

// Font.register('../../../fonts/RobotoMono-Regular.ttf', {
//   family: "Roboto Mono"
// })

export const styleSheet = StyleSheet.create({
  // Header Styles
  mainDiv: {
    width: '100%',
    height: '20%',
    fontFamily: 'Roboto',
  },

  upperBox: {
    display: 'flex',
    backgroundColor: `${colors.secondary()}`,
    padding: 20,
  },

  lowerBox: {
    height: '30%',
    backgroundColor: `${colors.primary()}`,
    padding: 10,
  },

  titleDiv: {
    flex: '1 1 50%',
    float: 'left',
    fontFamily: 'Roboto Mono',
    color: 'white',
    fontSize: 24,
    fontWeight: 600,
  },

  reportPeriodDiv: {
    flex: '1 1 50%',
    float: 'right',
    color: 'white',
  },

  infoDiv: {
    display: 'flex',
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Table Styles
  titleContainer: {
    display: 'flex',
    minWidth: 810,
    alignItems: 'center',
    backgroundColor: `${colors.primary()}`,
    flexDirection: 'row',
    padding: 10,
    borderBottom: `thin solid ${colors.primary()}`,
    textTransform: 'uppercase',
    fontSize: '0.8em',
    fontWeight: 500,
    fontFamily: 'Roboto',
    position: 'relative',
    boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
  },

  rowContainer: {
    display: 'flex',
    minWidth: 810,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#dbeeff',
  },

  oddRowContainer: {
    display: 'flex',
    minWidth: 810,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f7faff',
  },

  totalsRowContainer: {
    display: 'flex',
    minWidth: 810,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#b5ddff',
  },

  titleItem: {
    flex: '1 1 0',
    padding: 5,
    fontSize: 10,
    float: 'right',
  },

  rowItem: {
    flex: '1 1 0',
    float: 'right',
    paddingTop: '5px',
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 6,
    borderRight: 'thin solid white',
    fontFamily: 'Roboto Mono',
    fontSize: 14,
  },

  totalItem: {
    flex: '1 1 0',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 5,
    borderRight: 'thin solid white',
    float: 'right',
    fontFamily: 'Roboto Mono',
    fontWeight: 500,
  },

  productTitleItem: {
    flex: '1 1 0',
    padding: 5,
    fontSize: 10,
    float: 'left',
  },

  productRowItem: {
    flex: '1 1 0',
    paddingTop: '5px',
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 6,
    borderRight: 'thin solid white',
    fontSize: 14,
    float: 'left',
    fontFamily: 'Roboto',
  },

  totalsTotalItem: {
    flex: '1 1 0',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 5,
    borderRight: 'thin solid white',
    fontWeight: 500,
    float: 'left',
    fontFamily: 'Roboto',
  }
})