import React, { Component } from 'react'
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles'

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formShowing: false
        }
        this.showform = this.showform.bind(this)
        this.hideForm = this.hideForm.bind(this)
    }
    handleChange2 = evt => {
        this.setState({ [evt.target.name]: evt.target.value })
    }
    showform() {
        this.setState({ formShowing: true })
    }
    hideForm() {
        this.setState({ formShowing: false })
    }
    render() {
        const { classes, open, handleDrawerOpen, handleSubmit } = this.props
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color='default'
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Create a Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link to="/">
                            <Button variant="contained" color="secondary" className={classes.button}>GO BACK</Button>
                        </Link>
                        <Button variant="contained" color="primary" onClick={this.showform} className={classes.button}>
                            Save
                        </Button>
                    </div>
                </AppBar>
                { this.state.formShowing && <PaletteMetaForm
                    handleSubmit={handleSubmit} palettes={this.props.palettes} hideForm={this.hideForm} />}
            </div>
        )
    }
}



export default withStyles(styles, { withTheme: true })(PaletteFormNav)