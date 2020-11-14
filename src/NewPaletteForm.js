import React, { useState } from 'react'
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button } from '@material-ui/core';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import useStyles from './styles/NewPaletteFormStyles'
import seedColors from './seedColors'


export default function NewPaletteForm(props) {
    const classes = useStyles(),
        [open, setOpen] = useState(true),
        [colors, setColors] = useState(props.palettes[0].colors || seedColors[0].colors),
        paletteFull = colors.length >= props.maxColors,
        handleDrawerOpen = () => {
            setOpen(true);
        },
        handleDrawerClose = () => {
            setOpen(false);
        },
        addNewColor = newColor => {
            setColors([...colors, newColor])
        },
        // handleChange2 = evt => {
        //     setpaletteName(evt.target.value)
        // },
        handleSubmit = (newPalette) => {
            // let newName = paletteName,
            //     newColor
            // const newPalette = {
            //     paletteName: newName, colors: newColor,
            //     id: newName.toLowerCase().replace(/ /g, "-")
            // }
            // props.savePalette(newPalette)
            // props.history.push("/")
            newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-")
            newPalette.colors = colors
            props.savePalette(newPalette)
            props.history.push("/")
        },
        removeColor = colorname => {
            setColors(colors.filter(color => color.name !== colorname))
        },
        onSortEnd = ({ oldIndex, newIndex }) => {
            setColors(arrayMove(colors, oldIndex, newIndex))
        },
        clearColors = () => {
            setColors([])
        },
        addRandomColor = () => {
            //pick random color from existng palette 
            const allColors = props.palettes.map(palette => palette.colors).flat()
            var rand = Math.floor(Math.random() * allColors.length)
            const randomColor = allColors[rand]
            if (colors.includes(randomColor)) {
                addRandomColor()
            } else {
                setColors([...colors, randomColor])
            }
        }


    return (
        <div className={classes.root}>
            <PaletteFormNav
                open={open} handleSubmit={handleSubmit} handleDrawerOpen={handleDrawerOpen}
                addNewColor={addNewColor} paletteFull={paletteFull} palettes={props.palettes} />
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <div className={classes.container}>
                    <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
                    <div className={classes.buttons}>
                        <Button variant='contained' color='secondary'
                            className={classes.button}
                            onClick={clearColors}>Clear Palette</Button>
                        <Button variant='contained' color='primary' onClick={addRandomColor}
                            className={classes.button}
                            disabled={colors.length >= props.maxColors}>
                            {paletteFull ? "Palette Full" : "Random Color"}</Button>
                    </div>
                    <ColorPickerForm paletteFull={paletteFull} addNewColor={addNewColor} colors={colors} />
                </div>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <DraggableColorList onSortEnd={onSortEnd} axis={'xy'}
                    colors={colors} removeColor={removeColor} distance={20} />
            </main>
        </div>
    );
}

NewPaletteForm.defaultProps = {
    maxColors: 20
}