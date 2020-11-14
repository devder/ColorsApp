import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            stage: "form",
            paletteName: ""
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.showEmojiPicker = this.showEmojiPicker.bind(this)
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            this.props.palettes.every(p => p.paletteName.toLowerCase() !== value.toLowerCase())
        )
    }
    handleChange2 = evt => {
        this.setState({ [evt.target.name]: evt.target.value })
    }
    handleClickOpen() {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    showEmojiPicker() {
        this.setState({ stage: "emoji" })
    }
    savePalette = emoji => {
        const newPalette = { paletteName: this.state.paletteName, emoji: emoji.native }
        this.props.handleSubmit(newPalette)
        this.setState({ stage: "" })
    }
    render() {
        const { paletteName, stage } = this.state,
            { hideForm } = this.props
        return (
            <div>
                <Dialog open={stage === "emoji"} onClose={hideForm} >
                    <DialogTitle id="form-dialog-title">Choose a Palette emoji</DialogTitle>
                    <Picker onSelect={this.savePalette} title='pick one' />
                </Dialog>
                <Dialog open={stage === "form"} onClose={hideForm} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your new beautiful Palette.
                                Make sure it's unique
                            </DialogContentText>
                            <TextValidator validators={["required", "isPaletteNameUnique"]}
                                errorMessages={["please give this palette a name", "sorry, name already exists"]}
                                label="Palette Name" fullWidth margin="normal"
                                name='paletteName'
                                value={paletteName} onChange={this.handleChange2} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={hideForm} color="primary">
                                Cancel
                            </Button>
                            <Button variant='contained' color='primary' type="submit">Save Palette</Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        )
    }
}


export default PaletteMetaForm