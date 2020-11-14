import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import MiniPalette from './MiniPalette'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import styles from "./styles/PaletteListStyles";


//in JSS the styles are passed as a prop called "classes"
//to access them, {classes.root}

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDeleteDialog: false,
            deletingId: ''
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.goToPalette = this.goToPalette.bind(this)
    }
    openDialog = id => {
        this.setState({ openDeleteDialog: true, deletingId: id })
    }
    closeDialog = () => {
        this.setState({ openDeleteDialog: false, deletingId: '' })
    }
    goToPalette(id) {
        this.props.history.push('/palette/' + id)
    }
    handleDelete() {
        this.props.deletePalette(this.state.deletingId)
        this.closeDialog()
    }
    render() {
        const { palettes, classes } = this.props,
            { openDeleteDialog } = this.state
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>REACT COLORS</h1>
                        <Link to="/palette/new">
                            Create Palette
                        </Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(p => (
                            <CSSTransition key={p.id} classNames="fade" timeout={500}>
                                <MiniPalette {...p} goToPalette={this.goToPalette}
                                    // handleDelete={deletePalette} 
                                    openDialog={this.openDialog}
                                    key={p.id} id={p.id}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <Dialog open={openDeleteDialog} aria-labelledby='delete-dialog-title' onClose={this.closeDialog}>
                    <DialogTitle id="delete-dialog-title">Delete this Palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}><CheckIcon /></Avatar>
                            </ListItemAvatar>
                            <ListItemText>Delete</ListItemText>
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[600] }}><CloseIcon /></Avatar>
                            </ListItemAvatar>
                            <ListItemText>Cancel</ListItemText>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
}


export default withStyles(styles)(PaletteList)