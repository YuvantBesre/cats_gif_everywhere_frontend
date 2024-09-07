import { dataInterface } from "../../pages/HomePage"
import { LazyLoadImage } from "react-lazy-load-image-component";

interface CardProps {
    data : dataInterface,
    onThumbnailClick : (image : string) => void,
    onDragEnd? : (source : number, destination : number) => void
}

const Card = (props : CardProps) => {
  return (
    <div 
      className="flex flex-col items-center justify-center" 
    >
        <p className="mb-2">
          {props.data.title}
        </p>
        <LazyLoadImage 
          draggable = {false}
          onClick={() => props.onThumbnailClick(props.data.image)} 
          className="w-[200px] h-[200px] object-cover rounded-md hover:scale-110 transition cursor-pointer" 
          src={props.data.image} 
          alt={props.data.type} 
          effect="blur"
          placeholderSrc={props.data.image}
        />
    </div>
  )
}

export default Card