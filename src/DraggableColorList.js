import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import DraggableColorBox from './DraggableColorBox'



// export default SortableContainer(function DraggableColorList({ colors, removeColor }) {
//     return (
//         <div style={{ height: '100%' }}>
//             {colors.map(c => (
//                 <DraggableColorBox
//                     color={c.color}
//                     name={c.name} key={c.name}
//                     handleClick={() => removeColor(c.name)}
//                 />
//             ))}
//         </div>
//     )
// }
// )


const DraggableColorList = SortableContainer((props) => {
    const { colors, removeColor } = props
    return (
        <div style={{ height: '100%' }}>
            {colors.map((c, idx) => (
                <DraggableColorBox
                    index={idx}
                    color={c.color}
                    name={c.name} key={c.name}
                    handleClick={() => removeColor(c.name)}
                />
            ))}
        </div>
    )
})

export default DraggableColorList


