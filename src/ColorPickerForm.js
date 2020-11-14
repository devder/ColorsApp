import React, { useState, useEffect } from 'react'
import { ChromePicker } from 'react-color'
import { Button } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import useStyles from "./styles/ColorPickerFormStyles";

export default function ColorPickerForm(props) {
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        // code to run on component mount
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isColorNameUnique', value =>
            props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
        )
    });
    useEffect(() => {
        ValidatorForm.addValidationRule('isColorUnique', value =>
            props.colors.every(({ color }) => color !== currentColor)
        )
    });

    const classes = useStyles(),
        [currentColor, setcurrentColor] = useState('teal'),
        [newColorName, setnewColorName] = useState(''),
        handleChange = evt => {
            setnewColorName(evt.target.value)
        },
        updateCurrentColor = newColor => {
            setcurrentColor(newColor.hex)
        },
        handleSubmit = () => {
            const newColor = {
                color: currentColor,
                name: newColorName
            }
            props.addNewColor(newColor)
            setnewColorName('')
        }
    return (
        <div className={classes.ColorPickerForm}>
            <ChromePicker color={currentColor} onChangeComplete={updateCurrentColor} className={classes.picker} />

            <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
                <TextValidator
                    value={newColorName} variant="filled" margin='normal'
                    name='newColorName' className={classes.colorNameInput}
                    onChange={handleChange} placeholder="Color Name"
                    validators={['required', "isColorNameUnique", 'isColorUnique']}
                    errorMessages={['this field is required', 'name already exists', 'color already used']}
                />
                <Button type='submit' variant='contained' disabled={props.paletteFull}
                    style={{ backgroundColor: props.paletteFull ? "grey" : currentColor }}
                    className={classes.addColor}
                >
                    {props.paletteFull ? "Palette Full" : "Add Color"}
                </Button>
            </ValidatorForm>
        </div>
    )
}

