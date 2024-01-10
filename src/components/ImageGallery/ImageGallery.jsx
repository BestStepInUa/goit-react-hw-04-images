import { nanoid } from 'nanoid'

import ImageGalleryItem from "components/ImageGalleryItem"

const ImageGallery = ({ hits, onHitClick }) => {
    return (
        <ul className="ImageGallery">
            {hits.length > 0 && hits.map(hit => (
                <ImageGalleryItem key={hit.id + nanoid()} hit={hit} onHitClick={onHitClick} />
            ))}  
        </ul>
    )
}

export default ImageGallery