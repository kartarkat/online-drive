import React from 'react'
import './ContextMenu.css'

function ContextMenu({ setIsContextMenuOpen, setIsModalOpen, handleDelete }) {

  const handleMenu = (event, isEdit) => {
    event.stopPropagation()
    if (isEdit) {
      setIsContextMenuOpen(false)
      setIsModalOpen(true)
    }
    else {
      handleDelete()
      setIsContextMenuOpen(false)
    }
  }

  return (
    <div className='menuContainer'>
      <div className='rename' onClick={(e) => handleMenu(e, true)}>Rename</div>
      <div className='delete' onClick={(e) => handleMenu(e, false)}>Delete</div>
    </div>
  )
}

export default ContextMenu