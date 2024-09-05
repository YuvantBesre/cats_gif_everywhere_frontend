import { dataInterface } from "../../pages/HomePage"
import { LazyLoadImage } from "react-lazy-load-image-component";

interface CardProps {
    data : dataInterface,
    onThumbnailClick : (image : string) => void
}

const Card = (props : CardProps) => {
  return (
    <div className="flex flex-col items-center justify-center" draggable>
        <p className="mb-2">
          {props.data.title}
        </p>
        <LazyLoadImage 
          draggable = {false}
          onClick={() => props.onThumbnailClick(props.data.thumbnail)} 
          className="w-[200px] h-[200px] object-cover rounded-md hover:scale-110 transition cursor-pointer" 
          src={props.data.thumbnail} 
          alt={props.data.type} 
        />
    </div>
  )
}

export default Card