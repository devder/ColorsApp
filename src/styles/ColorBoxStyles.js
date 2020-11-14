import chroma from 'chroma-js';
import sizes from "./sizes";

export default {
    ColorBox: {
        width: "20%",
        height: props => props.showingFullPalette ? '25%' : "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover button": {
            opacity: " 1",
            transition: "0.5s"
        },
        // "@media (max-width: 900px)": {
        //     width: "50%"
        // }
        [sizes.down('lg')]: {
            width: "25%",
            height: props => props.showingFullPalette ? '20%' : "33.33333333%",
        },
        [sizes.down('md')]: {
            width: "50%",
            height: props => props.showingFullPalette ? '10%' : "20%",
        },
        [sizes.down('xs')]: {
            width: "100%",
            height: props => props.showingFullPalette ? '5%' : "10%",
        }
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.2 ? 'black' : 'white'
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.1 ? 'white' : 'rgba(0,0,0,0.78)'
    },
    seeMore: {
        color: props => chroma(props.background).luminance() >= 0.2 ? 'black' : 'white',
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        border: "none",
        right: "0",
        bottom: "0",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase"
    },
    copyButton: {
        color: props => chroma(props.background).luminance() >= 0.2 ? 'black' : 'white',
        width: "100px",
        marginLeft: '-50px',
        height: "30px",
        marginTop: "-15px",
        position: "absolute",
        top: "50%",
        left: "50%",
        display: "inline-block",
        textAlign: "center",
        outline: "none",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        opacity: "0",
        textDecoration: "none"
    },
    boxContent: {
        position: "absolute",
        padding: "10px",
        left: "0",
        bottom: "0",
        width: "100%",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px"
    },
    copyOverlay: {
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transform: "scale(0.1)"/* to make it grow from the middle gan */
    },
    showOverlay: {
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute",
        transition: "transform 0.6s ease-in-out"
    },
    copyMsg: {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "4rem",
        transform: "scale(0.1)",
        opacity: "0",
        color: "white",
        '& h1': {
            fontWeight: "400",
            textShadow: "1px 2px black",
            background: "rgba(255, 255, 255, 0.2)",
            width: "100%",
            textAlign: "center",
            marginBottom: "0",
            padding: "1rem",
            textTransform: "uppercase",
            [sizes.down("xs")]: {
                fontSize: "4rem"
            }
        },
        "& p": {
            fontSize: "2rem",
            fontWeight: "100"
        }
    },
    showMsg: {
        opacity: "1",
        transform: "scale(1)",
        zIndex: "25",
        transition: "all 0.4s ease-in-out",
        transitionDelay: "0.3s"
    },

}

