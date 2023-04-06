import React, { useState } from 'react'
import './RenderFiles.css'
import { Images } from '../../Assets/Images'
import RenderItem from '../RenderItem'
import Modal from '../Modal';
import CreateForm from '../CreateForm/CreateForm';


function RenderFiles({ fileData = {}, setFileData }) {
    const [isOpen, setIsOpen] = useState(false);
    const { name, items = [] } = fileData
    const { arrowUp, newBtn } = Images

    const handleCreateItem = (event, ref, isFolder) => {
        event.preventDefault()
        console.log('check', ref.current.value, isFolder)
        setIsOpen(false)
    }

    return (
        <div className='container'>
            <div className='header'>
                <img
                    className='arrowIcon'
                    alt={name}
                    src={arrowUp} />
                <div className='headingText'>{name}</div>
            </div>
            <div className='body'>
                {items.map(item => <RenderItem key={item.id} item={item} setFileData={setFileData} />)}
                <div className='item' onClick={()=> setIsOpen(true)}>
                    <img
                        className='fileIcon'
                        alt={name}
                        src={newBtn}
                    />
                </div>
            </div>
            <Modal title='Create new' isOpen={isOpen} onClose={() => setIsOpen(false)}>
               <CreateForm handleCreateItem={handleCreateItem}/>
            </Modal>
        </div>
    )
}

export default RenderFiles