import React, { useRef, useState } from 'react'
import './CreateForm.css'

function CreateForm({ handleCreateItem }) {
    const [isFolder, setIsFolder] = useState(false)
    const inputRef = useRef(null)

    return (
        <div>
            <form className='form' onSubmit={(e) => handleCreateItem(e, inputRef, isFolder)}>
                <div className='dataType'>
                    <div
                        className={`fileType ${!isFolder ? 'active' : 'notActive'}`}
                        onClick={() => setIsFolder(prev => !prev)}
                    >
                        File</div>
                    <div
                        className={`folderType ${isFolder ? 'active' : 'notActive'}`}
                        onClick={() => setIsFolder(prev => !prev)}
                    >
                        Folder</div>
                </div>
                <input className='inputField' type='text' ref={inputRef} required />
                <button className='createBtn' type='submit'>Create</button>
            </form>
        </div>
    )
}

export default CreateForm