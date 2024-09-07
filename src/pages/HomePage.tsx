import { useEffect, useRef, useState } from "react";
import Card from "../components/HomePage/Card";
import Image1 from "../assets/1.avif"
import Image2 from "../assets/2.avif"
import Image3 from "../assets/3.avif"
import Image4 from "../assets/4.avif"
import Image5 from "../assets/5.avif"
import Modal from "../components/general/Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useAxios from "../hooks/useAxios";


export interface dataInterface {'type' : string, 'title' : string, 'position' : number, 'image' : string}

const HomePage = () => {
    const [data, setData] = useState<dataInterface[]>([]);
    const [currentImageShown, setCurrentImageShown] = useState<string>('');
    const { requestGET } = useAxios();

    //save reference for dragItem and dragOverItem
    const dragItem = useRef<any>(null);
    const dragOverItem = useRef<any>(null);

    useEffect(() => {
        // Getting the data;
        getData();

        // Handling the escape button event
        document.addEventListener('keydown', (event) => {
            if(event.key === 'Escape') 
                event.preventDefault();
                setCurrentImageShown('');
        })
    }, []);

    const getData = async () => {
        const URL = '/cats/'
        const response = await requestGET(URL);
        
        if(response.status === 200) {
            setData(response.data);
        }
    }

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