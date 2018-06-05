import "regenerator-runtime/runtime";
import * as React from "react";
import { Text, Document, Page, StyleSheet, Image, View, Font } from "@react-pdf/core";
import ReactPDF from "@react-pdf/node";
import Header from "./Header";
import AsAppliedSummary from './packages/fc-asapplied-summary/src/components/AsAppliedSummary'

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    "@media max-width: 400": {
      flexDirection: "column"
    }
  },
  image: {
    marginBottom: 10,
    "@media max-width: 400": {
      width: 290
    }
  },
  leftColumn: {
    flexDirection: "column",
    width: 170,
    marginLeft: 30,
    marginRight: 15,
    marginTop: 20,
    "@media max-width: 400": {
      width: 290,
      marginRight: 30
    },
    "@media orientation: landscape": {
      width: 200,
      marginRight: 50
    }
  },
  rightColumn: {
    flexDirection: "column",
    flexGrow: 1,
    marginLeft: 15,
    marginRight: 30,
    marginTop: 20,
    "@media max-width: 400": {
      marginTop: 10,
      marginLeft: 30
    }
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 25,
    marginHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: "gray",
    borderStyle: "dashed",
    "@media orientation: landscape": {
      marginTop: 10
    }
  },
  boxContainer: {
    display: "flex",
    flexWrap: "wrap"
  },
  clearBox: {
    width: 400,
    height: 400,
    fontFamily: 'Material Icons'
  },
  blueBox: {
    width: 400,
    height: 400,
    backgroundColor: "#0011ff"
  },
  greenBox: {
    width: 400,
    height: 400,
    backgroundColor: "#168918"
  }
});

const props = {
  viewport: {
    width: 1920,
    height: 955
  },
  appliedSummaries: [
    {
      field: "Home NE(E 17-11-26 W1)",
      product: "P1",
      area: 84.33,
      coveredArea: 33.32,
      minTarget: 1,
      maxTarget: 51.1,
      totalApplied: 201.11
    },
    {
      field: "Home NE(E 17-11-26 W1)",
      product: "Not specified",
      area: 84.33,
      coveredArea: 33.67,
      minTarget: 1,
      maxTarget: 321.08,
      totalApplied: 533.39
    },
    {
      field: "Barkleys N(N 8-11-26 W1)",
      product: "undetermined polygon product",
      area: 63.89,
      coveredArea: 61.55,
      minTarget: 1,
      maxTarget: 671.29,
      totalApplied: 906.25
    },
    {
      field: "Barkleys N(N 8-11-26 W1)",
      product: "P1",
      area: 63.89,
      coveredArea: 61.36,
      minTarget: 1,
      maxTarget: 211.4,
      totalApplied: 379.43
    },
    {
      field: "Barkleys N(N 8-11-26 W1)",
      product: "P1",
      area: 63.89,
      coveredArea: 61.19,
      minTarget: 1,
      maxTarget: 860,
      totalApplied: 329.7
    },
    {
      field: "Barkleys N(N 8-11-26 W1)",
      product: "undetermined polygon product",
      area: 63.89,
      coveredArea: 61.03,
      minTarget: 1,
      maxTarget: 447.37,
      totalApplied: 803.9
    }
  ],
  productsList: [
    {
      product: "P1",
      area: 212.11,
      coveredArea: 155.87,
      amount: 910.24
    },
    {
      product: "Not specified",
      area: 84.33,
      coveredArea: 33.67,
      amount: 533.39
    },
    {
      product: "undetermined polygon product",
      area: 127.78,
      coveredArea: 122.58,
      amount: 1710.15
    }
  ],
  grower: "Jay Kinnaird",
  farm: "Last Rock Farms",
  season: {
    id: 6,
    label: "2016",
    startDate: 1451631600,
    endDate: 1483167600,
    previous: 2
  },
  settings: {
    system: "metric",
    areaUnit: "ac",
    lengthUnit: "km",
    yieldUnit: "bu",
    elevUnit: "m",
    speedUnit: "km/h",
    fuelUnit: "l",
    liquidUnit: "l",
    solidUnit: "kg",
    rowSpacing: "m",
    seedingDepth: "cm",
    seedingRateMass: "g",
    seedingRateArea: "m2",
    plantPopulation: "ft2"
  },
  translations: {
    noData: 'No Data Available',
    field: 'Field',
    product: 'Product',
    area: 'Area',
    coverageArea: 'Coverage Area',
    minTarget: 'Minimum Target',
    maxTarget: 'Maximum Target',
    totalApplied: 'Total Applied',
    totals: 'Totals',
    asAppliedSummary: 'As Applied Summary',
    grower: 'Grower',
    farm: 'Farm',
    season: 'Season',
  }
}

// const ColoredBoxes = (props: any) => (
//   <Page {...props}>
//     <View style={styles.container}>
//       <View key="1" style={styles.boxContainer}>
//         <View key="2" style={styles.clearBox}>
//           <Text>event</Text>
//         </View>
//         <View key="3" style={styles.blueBox} />
//         <View key="4" style={styles.greenBox} />
//       </View>
//     </View>
//   </Page>
// );

// const Resume = (props: any) => (
//   <Page {...props}>
//     <Header />
//     <View style={styles.container}>
//       <View style={styles.leftColumn}>
//         <Image src="https://images.gr-assets.com/characters/1264613782p8/1783.jpg" style={styles.image} />
//       </View>
//     </View>
//     <Text style={styles.footer}>This IS the candidate you are looking for</Text>
//   </Page>
// );

Font.register(`${__dirname}/node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ttf`, {
  family: 'Material Icons',
});

Font.register(`${__dirname}/packages/fonts/Roboto-Regular.ttf`, {
  family: 'Roboto',
});

Font.register(`${__dirname}/packages/fonts/RobotoMono-Regular.ttf`, {
  family: 'Roboto Mono',
});

const Output = () => (
  <Document
    author="Luke Skywalker"
    keywords="awesome, resume, start wars"
    subject="The resume of Luke Skywalker"
    title="Resume"
  >
    <AsAppliedSummary 
      appliedSummaries={props.appliedSummaries}
      farm={props.farm}
      grower={props.grower}
      productsList={props.productsList}
      season={props.season}
      settings={props.settings}
      viewport={props.viewport}
      translations={props.translations}
    />
    {/* <Resume size="A4" />
    <Resume orientation="landscape" size="A4" />
    <Resume size={[350, 1250]} /> */}
  </Document>
);

ReactPDF.render(<Output />, `${__dirname}/output.pdf`);
