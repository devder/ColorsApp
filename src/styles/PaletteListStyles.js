import sizes from './sizes'
import bg from './bg.svg'


const styles = {
    "@global": {
        ".fade-exit": {
            opacity: "1"
        },
        ".fade-exit-active": {
            opacity: "0",
            transition: "opacity 500ms ease-out"
        }
    },
    root: {
        backgroundImage: `url(${bg})`,
        backgroundColor: '#394bad',
        // background by svgbackgrounds.com
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: "scroll"
    },
    container: {
        width: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flexDirection: 'column',
        [sizes.down('xl')]: {
            width: "65%"
        },
        [sizes.down('xs')]: {
            width: "70%"
        }
    },
    heading: {
        fontSize: "2rem"
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        color: 'white',
        alignItems: "center",
        "& a": {
            color: 'white',

        }
    },
    palettes: {
        boxSizing: 'border-box',
        width: ' 100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '5%',
        [sizes.down('md')]: {
            gridTemplateColumns: 'repeat(2, 50%)',
        },
        [sizes.down('xs')]: {
            gridTemplateColumns: 'repeat(1, 100%)',
            gridGap: '1rem',
        }
    }
}

export default styles