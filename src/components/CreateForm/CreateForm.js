import React, { useRef, useState } from 'react'
import './CreateForm.css'

function CreateForm({ handleSubmit, isEditMode, currentItem, formError }) {
    const [activeTab, setActiveTab] = useState(currentItem.isFolder)
    const inputRef = useRef(null)
    const [inputError, setInputError] = useState(null)

    const handleFormSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const value = inputRef?.current?.value
        const folderNameRegex = /^[^\\/?%*:.|"<>]+$/
        const fileNameRegex = /^[^<>:"/\\|?*]*\.[^<>:"/\\|?*]*$/

        if (activeTab && !folderNameRegex.test(value)) {
            setInputError('Valid: name, Eg: myFolder')
        }
        else if (!activeTab && !fileNameRegex.test(value)) {
            setInputError('Valid: name.ext, Eg: index.js')
        }
        else {
            setInputError(null);
            handleSubmit(value, currentItem);
        }
    }

    const handleDataType = () => {
        setActiveTab(prev => !prev)
        setInputError(null)
        inputRef.current.value = ''
    }

    const renderDataType = () => (
        <div className='dataType'>
            <div className={`fileType ${!activeTab ? 'active' : 'notActive'}`}
                onClick={handleDataType}> File</div>
            <div className={`folderType ${activeTab ? 'active' : 'notActive'}`}
                onClick={handleDataType}>Folder</div>
        </div>
    )

    return (
        <div>
            <form className='form' onSubmit={handleFormSubmit}>
                {!isEditMode ? renderDataType() : ''}
                <input className='inputField'
                    placeholder={`Enter ${activeTab ? 'Folder' : 'File'} name`}
                    type='text'
                    ref={inputRef}
                    defaultValue={currentItem.name}
                    required />
                {formError ? <div className='error'>File / Folder name already exists!</div> : ''}
                {inputError ?
                    <div className='error'>{inputError}
                        <div>{`Not allowed: <, >, :, ", /, \\, |, ?, *`}</div>
                    </div> : ''}
                <button className='createBtn' type='submit'>{isEditMode ? 'Rename' : 'Create'}</button>
            </form>
        </div>
    )
}

export default CreateForm