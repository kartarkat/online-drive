import React from 'react'
import { Images } from '../../Assets/Images'
import './RenderItem.css'

function RenderItem({ item = {}, setFileData }) {
  const { name, isFolder } = item
  const { folder, file } = Images

  const handleItemClick = () => {
    setFileData(item)
  }

  const renderExtension = (name) => {
    const fileExtension = name.split('.').pop()
    return <span className='fileExtension'>.{fileExtension}</span>
  }

  return (
    <div
      className='item'
      onClick={isFolder ? handleItemClick : () => { }}
    >
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