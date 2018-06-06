// Libs
import _ from 'lodash'
import * as React from 'react'

// Components
import Fab from 'rmwc/Fab'

// Styles
import colors from '../colors'

// Types
import { ActionItem } from '../types'

// Local Styles
const styles = {
  container: ({ toggled }: State): React.CSSProperties => ({
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: !toggled ? 'transparent' : 'rgba(0,0,0,0.2)',
    paddingRight: 10,
    paddingBottom: 60,
    pointerEvents: toggled ? 'initial' : 'none',
  }),
  button: {
    pointerEvents: 'initial',
  },
  actionItems: {},
  actionItem: {
    pointerEvents: 'initial',
    backgroundColor: '#fafafa',
    border: '1px solid #efefef',
    padding: 7,
    borderRadius: '50%',
    boxShadow: `0 0 2px rgba(0,0,0,0.2)`,
    marginBottom: 10,
  },
}

interface Props {
  actionItems?: ActionItem[]
  selectedRecordIds: number[]
}

interface State {
  toggled: boolean
}

// Exports
export default class ActionItems extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      toggled: false,
    }

    this.onToggle = this.onToggle.bind(this)
  }

  public render() {
    if (!this.props.actionItems || !this.props.actionItems.length) {
      return null
    }

    return (
      <div
        data-test="fc-table/ActionItems"
        style={styles.container(this.state)}
        onClick={this.state.toggled ? this.onToggle : undefined}
      >
        <div style={styles.actionItems}>{this.renderActionItems()}</div>
        <div style={styles.button} onClick={this.onToggle}>
          <Fab mini>more_vert</Fab>
        </div>
      </div>
    )
  }

  private renderActionItems() {
    if (this.state.toggled && this.props.actionItems) {
      return this.props.actionItems.map((actionItem, index) => {
        let cmp: React.ReactElement<any>

        const props = {
          selectedRecordIds: this.props.selectedRecordIds,
        }

        if (React.isValidElement(actionItem)) {
          cmp = React.cloneElement(actionItem as React.ReactElement<any>, props)
        } else {
          cmp = React.createElement(actionItem as React.ComponentType<any>, props)
        }

        return (
          <div key={index} style={styles.actionItem}>
            {cmp}
          </div>
        )
      })
    }

    return null
  }

  private onToggle(e: React.MouseEvent<any>) {
    e.stopPropagation()

    this.setState({
      toggled: !this.state.toggled,
    })
  }
}
