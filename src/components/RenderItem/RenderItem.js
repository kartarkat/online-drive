import React, { useEffect, useRef, useState } from 'react'
import { Images } from '../../Assets/Images'
import './RenderItem.css'
import Modal from '../Modal/Modal';
import CreateForm from '../CreateForm/CreateForm';

function RenderItem({ item = {}, setFileData, deleteData, updateData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataType, setDataType] = useState(false)

  const menuRef = useRef(null);
  const { id, name, isFolder } = item
  const { folder, file } = Images

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleItemClick = (event) => {
    setFileData(item)
  }

  const handleClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleRightClick = (event, isFolder) => {
    event.preventDefault()
    setIsMenuOpen(true)
    setDataType(isFolder)
  }

  const renderExtension = (name) => {
    const fileExtension = name.split('.').pop()
    return <span className='fileExtension'>.{fileExtension}</span>
  }

  const handleEditItem = (val) => {
    updateData(id, val)
    setIsModalOpen(false)
  }

  const handleMenu = (event, isEdit) => {
    event.stopPropagation()
    if (isEdit) {
      setIsMenuOpen(false)
      setIsModalOpen(true)
    }
    else deleteData(id)
  }

  const renderMenu = () => {
    return (
      <div className='menuContainer' ref={menuRef}>
        <div className='rename' onClick={(e) => handleMenu(e, true)}>Rename</div>
        <div className='delete' onClick={(e) => handleMenu(e, false)}>Delete</div>
      </div>
    )
  }

  return (
    <div
      className='item'
      onContextMenu={(e) => handleRightClick(e, isFolder)}
      onClick={isFolder ? handleItemClick : () => { }}
    >
      <img
        className='fileIcon'
        alt={name}
        src={isFolder ? folder : file}
      />
      {!isFolder ? renderExtension(name) : ''}
      <div className='itemName'>{name}</div>
      {isMenuOpen ? renderMenu() : ''}
      <Modal title='Rename' isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateForm isEdit={true} dataType={dataType} handleCreateItem={handleEditItem} />
      </Modal>
    </div>

  )
}

export default RenderItem