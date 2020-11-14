import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorBoxStyles'
import clsx from 'clsx';


class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        }
        this.changeCopyState = this.changeCopyState.bind(this)
    }
    changeCopyState() {
        this.setState({ copied: true }, () => setTimeout(() => this.setState({ copied: false }), 1500))
    }
    render() {
        const { name, background, moreUrl, showingFullPalette, classes } = this.props
        const { copied } = this.state
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background }} className={classes.ColorBox}>
                    {/* <div style={{ background }} className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} /> */}
                    {/* same as below */}
                    <div style={{ background }} className={clsx(classes.copyOverlay, { [classes.showOverlay]: copied })} />
                    <div className={`${classes.copyMsg} ${copied && classes.showMsg}`}>
                        <h1 className={classes.copyText}>copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>
                            <span className={classes.copyText}>
                                Copy
                                </span>
                        </button >
                    </div>

                    {showingFullPalette &&
                        <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                            {/* <Link to={this.props.moreUrl} onClick={e => e.stopPropagation()}> */}
                            <span className={classes.seeMore}>More</span>
                        </Link>
                    }
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox)