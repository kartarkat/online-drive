import React, { useRef, useState } from 'react'
import './CreateForm.css'

function CreateForm({ handleCreateItem, isEdit = false, dataType, formError, btnText = 'Create' }) {
    const [isFolder, setIsFolder] = useState(dataType)
    const inputRef = useRef(null)
    const [inputError, setInputError] = useState(null)

    const handleFormSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const value = inputRef?.current?.value
        const folderNameRegex = /^[^\\/?%*:.|"<>]+$/
        const fileNameRegex = /^[^<>:"/\\|?*]*\.[^<>:"/\\|?*]*$/

        if (isFolder && !folderNameRegex.test(value)) {
            setInputError('Valid: name, Eg: myFolder')
        }
        else if (!isFolder && !fileNameRegex.test(value)) {
            setInputError('Valid: name.ext, Eg: index.js')
        }
        else {
            setInputError(null);
            handleCreateItem(value, isFolder);
        }
    }

    const handleDataType = () => {
        setIsFolder(prev => !prev)
        setInputError(null)
        inputRef.current.value = ''
    }

    return (
        <div>
            <form className='form' onSubmit={handleFormSubmit}>
                {!isEdit ?
                    <div className='dataType'>
                        <div
                            className={`fileType ${!isFolder ? 'active' : 'notActive'}`}
                            onClick={handleDataType}
                        >
                            File</div>
                        <div
                            className={`folderType ${isFolder ? 'active' : 'notActive'}`}
                            onClick={handleDataType}
                        >
                            Folder</div>
                    </div>
                    : ''}
                <input className='inputField'
                    placeholder={`Enter ${isFolder ? 'Folder' : 'File'} name`}
                    type='text'
                    ref={inputRef}
                    required />
                {formError ? <div className='error'>File / Folder name already exists!</div> : '' }
                {inputError ?
                    <div className='error'>{inputError}
                        <div>{`Not allowed: <, >, :, ", /, \\, |, ?, *`}</div>
                    </div> : ''}
                <button className='createBtn' type='submit'>{btnText}</button>
            </form>
        </div>
    )
}

export default CreateForm