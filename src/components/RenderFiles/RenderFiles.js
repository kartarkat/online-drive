import React from 'react'
import './RenderFiles.css'
import { Images } from '../../Assets/Images'
import RenderItem from '../RenderItem'

function RenderFiles({ fileData = {} }) {
    const { name, items } = fileData

    return (
        <div className='container'>
            <div className='header'>
                <img 
                className='arrowIcon'
                alt={name} 
                src={Images.arrowUp} />
                <div className='headingText'>{name}</div>
            </div>
            <div className='body'>
                {items.map(item => <RenderItem item={item} />)}
            </div>

        </div>
    )
}

export default RenderFiles