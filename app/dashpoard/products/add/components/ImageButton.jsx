import React from 'react'
import AddImageButton from './AddImageButton'

const ImageButton = ({setProduct}) => {
  return (
    <div>
      <AddImageButton  key={"images"} id={"sas"} setProduct={setProduct} />
    </div>
  )
}

export default ImageButton