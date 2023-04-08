import React, { useEffect, useRef, useState } from 'react'
import './Files.css'
import { Images } from '../../Assets/Images'
import FileItem from '../FileItem'
import Modal from '../Modal';
import Form from '../Form';
import useTreeTraversal from '../../hooks/useTreeTraversal';
import ContextMenu from '../ContextMenu/ContextMenu';

function Files({ fileData, setFileData, handleNavigate, breadcrumbs, setBreadcrumbs }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [formError, setFormError] = useState(false)
    const [currentItem, setCurrentItem] = useState({})
    const [isEditMode, setIsEditMode] = useState(false)
    const [contextMenuPos, setContextMenuPos] = useState({ xPos: 0, yPos: 0 })
    const menuRef = useRef(null);

    const { insertNode, updateNode, deleteNode } = useTreeTraversal();

    const { id, parentId, name, items = [] } = fileData
    const { arrowUp, newBtn } = Images

    useEffect(() => {
        document.addEventListener("click", CloseContextMenu);
        return () => {
            document.removeEventListener("click", CloseContextMenu);
        };
    }, []);

    const CloseContextMenu = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsContextMenuOpen(false);
        }
    };

    const isValuePresent = (value, config = fileData) => {
        const { items } = config;
        let isPresent
        items.forEach(item => item.name === value ? isPresent = true : isValuePresent(item.name, item));
        return isPresent
    }

    const handleFormSubmit = (value, isFolder, currentFormItem) => {
        if (!isValuePresent(value)) {
            if (isEditMode) updateNode(fileData, currentFormItem.id, value)
            else insertNode(fileData, id, value, isFolder)
            setIsModalOpen(false)
            setFormError(false)
            setIsEditMode(false)
        }
        else setFormError(true)
    }

    const handleDelete = () => {
        setFileData(deleteNode(fileData, currentItem.id))
        setIsModalOpen(false)
    }

    const handleRightClick = (event, item) => {
        event.preventDefault()
        const xPos = event.pageX + 20;
        const yPos = event.pageY;
        setContextMenuPos({ xPos, yPos })
        setIsContextMenuOpen(true)
        setIsEditMode(true)
        setCurrentItem(item)
    }

    const renderModal = () => (
        <Modal
            title={isEditMode ? 'Rename' : 'Create new'}
            isOpen={isModalOpen}
            onClose={() => { setIsModalOpen(false); setFormError(false); setIsEditMode(false) }}
        >
            <Form
                isEditMode={isEditMode}
                currentItem={currentItem}
                handleSubmit={handleFormSubmit}
                formError={formError} />
        </Modal>
    )

    return (
        <div className='container'>
            <div className='header'>
                <img
                    onClick={parentId ? () => handleNavigate(parentId) : () => { }}
                    className={`arrowIcon ${!parentId ? 'disable' : ''}`}
                    alt={name}
                    src={arrowUp} />
                <div className='headingContainer'>
                {breadcrumbs.map((obj, i) =>
                    <div key={i}
                        onClick={obj.id === id ? () => { } : () => handleNavigate(obj.id)}
                        className={`headingText ${obj.id === id ? 'activeHeading' : ''}`}>
                        {' / '}{obj.name}</div>
                )}
                    </div>
            </div>
            <div className='body'>
                {items.map(item =>
                    <FileItem
                        key={item.id}
                        item={item}
                        setFileData={setFileData}
                        fileData={fileData}
                        isValuePresent={isValuePresent}
                        setBreadcrumbs={setBreadcrumbs}
                        handleRightClick={handleRightClick}
                    />
                )}
                {isContextMenuOpen ?
                    <div ref={menuRef}style={{ position:'absolute', top: contextMenuPos.yPos, left: contextMenuPos.xPos }}>
                        <ContextMenu
                            contextMenuPos={contextMenuPos}
                            setIsContextMenuOpen={setIsContextMenuOpen}
                            setIsModalOpen={setIsModalOpen}
                            handleDelete={handleDelete}
                        />  </div> : ''}
                <div className='item' onClick={() => setIsModalOpen(true)}>
                    <img
                        className='fileIcon'
                        alt={name}
                        src={newBtn}
                    />
                </div>
            </div>
            {renderModal()}
        </div>
    )
}

export default Files