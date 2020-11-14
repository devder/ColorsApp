import sizes from './sizes'
export default {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    PaletteColors: {
        height: "90%"
    },
    goBack: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        opacity: "1",
        backgroundColor: 'black',
        '& a': {
            color: 'white',
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
            textDecoration: "none"
        },
        [sizes.down('lg')]: {
            width: "75%",
            height: "33.33333333%"
        },
        [sizes.down('md')]: {
            width: "50%",
            height: "20%"
        },
        [sizes.down('xs')]: {
            width: "100%",
            height: "10%"
        }
    }
}