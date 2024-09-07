import { useEffect, useRef, useState } from "react";
import Card from "../components/HomePage/Card";
import Image1 from "../assets/1.avif"
import Image2 from "../assets/2.avif"
import Image3 from "../assets/3.avif"
import Image4 from "../assets/4.avif"
import Image5 from "../assets/5.avif"
import Modal from "../components/general/Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";


export interface dataInterface {'type' : string, 'title' : string, 'position' : number, 'thumbnail' : string}

const DATA : dataInterface[] = [
    {
        "type": "bank-draft", "title": "Bank Draft", "position": 0, "thumbnail" : Image1
    }, { "type": "bill-of-lading", "title": "Bill of Lading", "position": 1, "thumbnail" : Image2 }, {
        "type": "invoice", "title" : "Invoice", "position": 2, "thumbnail" : Image3
    }, { "type": "bank-draft-2", "title": "Bank Draft 2", "position": 3, "thumbnail" : Image4 }, {
        "type":
            "bill-of-lading-2", "title":
            "Bill of Lading 2", "position": 4,
            "thumbnail" : Image5
    }];

const HomePage = () => {
    const [data, setData] = useState<dataInterface[]>(DATA);
    const [currentImageShown, setCurrentImageShown] = useState<string>('');

    //save reference for dragItem and dragOverItem
    const dragItem = useRef<any>(null);
    const dragOverItem = useRef<any>(null);

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if(event.key === 'Escape') 
                event.preventDefault();
                setCurrentImageShown('');
        })
    }, []);

    //const handle drag sorting
    const handleSort = () => {
        //duplicate items
        let _data = [...data];

        //remove and save the dragged item content
        const draggedItemContent = _data.splice(dragItem.current, 1)[0];

        //switch the position
        _data.splice(dragOverItem.current, 0, draggedItemContent);

        //reset the position ref
        dragItem.current = null;
        dragOverItem.current = null;

        //update the actual array
        setData(_data);
    };

    return (
        <div className="grid grid-cols-3 gap-x-4 gap-y-8 items-center">
            {
                data.map((aData, index : number) => (
                    <div 
                        key={index} 
                        draggable
                        onDragStart={() => (dragItem.current = index)}
                        onDragEnter={() => (dragOverItem.current = index)}
                        onDragEnd={handleSort}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <Card 
                            data = {aData}
                            onThumbnailClick = {(image) => setCurrentImageShown(image)}
                        />
                    </div>
                ))
            }

            <Modal show={currentImageShown ? true : false}>
                <LazyLoadImage 
                    src={currentImageShown}
                    alt={''} 
                    effect="blur"
                    placeholderSrc={currentImageShown}
                />
            </Modal>
        </div>
    )
}

export default HomePage