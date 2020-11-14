import React, { Component } from 'react'
import Navbar from './Navbar'
import ColorBox from './ColorBox'
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteStyles'

class Palette extends Component {
    constructor(props) {
        super(props)
        this.state = {
            level: 500,
            format: 'hex'
        }
        this.changeLevel = this.changeLevel.bind(this)
        this.changeFormat = this.changeFormat.bind(this)
    }
    changeLevel(level) {
        this.setState({ level })
    }
    changeFormat(val) {
        this.setState({ format: val })
    }
    render() {
        const { colors, paletteName, emoji, id } = this.props.palette
        const { classes } = this.props
        const { level, format } = this.state
        const colorBoxes = colors[level].map(c => (
            <ColorBox
                background={c[format]}
                name={c.name} key={c.id}
                moreUrl={`/palette/${id}/${c.id}`} //alternative, this is then passed down 
                showingFullPalette
            />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showingAllColors />
                <div className={classes.PaletteColors}>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(Palette)