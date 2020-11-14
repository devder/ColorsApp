import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function MiniPalette(props) {                       //(suppoesd to be PureComponent with a class)
    const { classes, paletteName, emoji, colors, openDialog, goToPalette, id } = props
    const miniColorBoxes = colors.map(c => (
        <div
            className={classes.miniColor}
            style={{ backgroundColor: c.color }}
            key={c.name}
        >

        </div>
    ))
    const removePalette = evt => {
        evt.stopPropagation();
        openDialog(props.id)
    },
        handleClick = () => {
            goToPalette(id)
        }
    return (
        <div className={classes.root} onClick={handleClick}>
            <DeleteForeverIcon className={classes.deleteIcon} onClick={removePalette} />
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
        </div>
    )
}

export default withStyles(styles)(MiniPalette)