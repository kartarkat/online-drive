import React from 'react'
import { Images } from '../../Assets/Images'
import './RenderItem.css'

function RenderItem({ item = {} }) {
  const { id, name, isFolder } = item
  const { folder, file } = Images


  const renderExtension = (name) => {
    const fileExtension = name.split('.').pop()
    return <span className='fileExtension'>.{fileExtension}</span>

  }

  return (
    <div key={id} className='item'>
      <img
        className='fileIcon'
        alt={name}
        src={isFolder ? folder : file}
      />
      {!isFolder ? renderExtension(name) : ''}
      <div className='itemName'>{name}</div>
    </div>

  )
}

export default RenderItem