import React, { useEffect, useRef, useState } from 'react'
import { Images } from '../../Assets/Images'
import './RenderItem.css'
import Modal from '../Modal/Modal';
import CreateForm from '../CreateForm/CreateForm';

function RenderItem({ item = {}, setFileData, deleteData, updateData, isValuePresent, setBreadcrumbs }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataType, setDataType] = useState(false)
  const [formError, setFormError] = useState(false)

  const menuRef = useRef(null);
  const { id, name, isFolder } = item
  const { folder, file } = Images

  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  const closeMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleItemClick = () => {
    setFileData(item)
    setBreadcrumbs(prev => ([...prev, {id: item.id, name: item.name, parentId: item.parentId}]));
  }

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
    if (!isValuePresent(val)) {
      updateData(id, val)
      setIsModalOpen(false)
      setFormError(false)
    }
    else setFormError(true)
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
      <Modal title='Rename' isOpen={isModalOpen} onClose={() => {setIsModalOpen(false); setFormError(false)}}>
        <CreateForm isEdit={true} dataType={dataType} formError={formError} btnText={'Rename'} handleCreateItem={handleEditItem} />
      </Modal>
    </div>

  )
}

export default RenderItem