import React, { useRef, useState } from 'react'
import './Form.css'

function Form({ handleSubmit, isEditMode, currentItem, formError }) {
    const [dataType, setDataType] = useState(currentItem.isFolder)
    const inputRef = useRef(null)
    const [inputError, setInputError] = useState(null)

    const handleFormSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const value = inputRef?.current?.value
        const folderNameRegex = /^[^\\/?%*:.|"<>]+$/
        const fileNameRegex = /^[^<>:"/\\|?*]*\.[^<>:"/\\|?*]*$/

        if (dataType && !folderNameRegex.test(value)) {
            setInputError('Valid: name, Eg: myFolder')
        }
        else if (!dataType && !fileNameRegex.test(value)) {
            setInputError('Valid: name.ext, Eg: index.js')
        }
        else {
            setInputError(null);
            handleSubmit(value, dataType, currentItem);
        }
    }

    const handleDataType = () => {
        setDataType(prev => !prev)
        setInputError(null)
        inputRef.current.value = ''
    }

    const renderDataType = () => (
        <div className='dataType'>
            <div className={`fileType ${!dataType ? 'active' : 'notActive'}`}
                onClick={handleDataType}>File</div>
            <div className={`folderType ${dataType ? 'active' : 'notActive'}`}
                onClick={handleDataType}>Folder</div>
        </div>
    )

    return (
        <div>
            <form className='form' onSubmit={handleFormSubmit}>
                {!isEditMode ? renderDataType() : ''}
                <input className='inputField'
                    placeholder={`Enter ${dataType ? 'Folder' : 'File'} name`}
                    type='text'
                    ref={inputRef}
                    defaultValue={isEditMode ? currentItem.name : ''}
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

export default Form