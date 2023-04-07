import React from 'react'
import { Images } from '../../Assets/Images'
import './FileItem.css'

function FileItem({ item = {}, setFileData, setBreadcrumbs, handleRightClick }) {
  const { name, isFolder } = item
  const { folder, file } = Images

  const handleItemClick = () => {
    setFileData(item)
    setBreadcrumbs(prev => ([...prev, {id: item.id, name: item.name, parentId: item.parentId}]));
  }

  const renderExtension = (name) => {
    const fileExtension = name.split('.').pop()
    return <span className='fileExtension'>.{fileExtension}</span>
  }

  return (
    <div
      className='item'
      onContextMenu={(e) => handleRightClick(e, item)}
      onClick={isFolder ? handleItemClick : () => {}}
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

export default FileItem