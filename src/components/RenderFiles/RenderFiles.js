import React, { useState } from 'react'
import './RenderFiles.css'
import { Images } from '../../Assets/Images'
import RenderItem from '../RenderItem'
import Modal from '../Modal';
import CreateForm from '../CreateForm/CreateForm';

function RenderFiles(
    { fileData = {},
        setFileData,
        handleNavigate,
        insertData,
        deleteData,
        updateData,
        isValuePresent,
        breadcrumbs,
        setBreadcrumbs
    }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formError, setFormError] = useState(false)
    const { id, parentId, name, items = [] } = fileData
    const { arrowUp, newBtn } = Images

    const handleCreateItem = (value, isFolder) => {
        if (!isValuePresent(value)) {
            insertData(id, value, isFolder, parentId)
            setIsModalOpen(false)
            setFormError(false)
        } else {
            setFormError(true)
        }
    }

    return (
        <div className='container'>
            <div className='header'>
                <img
                    onClick={parentId ? () => handleNavigate(parentId) : () => { }}
                    className={`arrowIcon ${!parentId ? 'disable' : ''}`}
                    alt={name}
                    src={arrowUp} />
                {breadcrumbs.map((obj, i) =>
                    <div 
                    key={i} 
                    onClick={obj.id === id ? () => {} : () => handleNavigate(obj.id)} 
                    className={`headingText ${obj.id === id ? 'activeHeading' : ''}`}>
                        {' / '}{obj.name}</div>
                )}
            </div>
            <div className='body'>
                {items.map(item =>
                    <RenderItem
                        key={item.id}
                        item={item}
                        setFileData={setFileData}
                        deleteData={deleteData}
                        updateData={updateData}
                        isValuePresent={isValuePresent}
                        setBreadcrumbs={setBreadcrumbs}
                    />)}
                <div className='item' onClick={() => setIsModalOpen(true)}>
                    <img
                        className='fileIcon'
                        alt={name}
                        src={newBtn}
                    />
                </div>
            </div>
            <Modal title='Create new' isOpen={isModalOpen} onClose={() => {setIsModalOpen(false); setFormError(false)}}>
                <CreateForm handleCreateItem={handleCreateItem} formError={formError} />
            </Modal>
        </div>
    )
}

export default RenderFiles