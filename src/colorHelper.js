import chroma from 'chroma-js';


let levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

function generatePalette(starterPalette) {
    let newpalette = {
        paletteName: starterPalette.paletteName,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        colors: {}
    }
    for (let level of levels) {
        newpalette.colors[level] = []
    }
    for (let color of starterPalette.colors) {
        let scale = getScale(color.color, 10).reverse()
        for (let i in scale) {
            newpalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase().replace(/ /g, '-'),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css().replace('rgb', 'rgba').replace(')', ',1.0)')
            })
        }
    }
    return newpalette
}

function getRange(hexColor) {
    const endColor = '#fff';
    return [
        chroma(hexColor).darken(1.4).hex(), hexColor, endColor
    ]
}
function getScale(hexColor, numOfColors) {
    return chroma.scale(getRange(hexColor)).mode('lab').colors(numOfColors)
}

export { generatePalette }