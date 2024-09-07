import { useEffect, useRef, useState } from "react";
import Card from "../components/HomePage/Card";
import Modal from "../components/general/Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useAxios from "../hooks/useAxios";
import AddEditForm, { formPayload } from "../components/HomePage/AddEditForm";
import apiURLs from "../constants/apiURLs";


export interface dataInterface {'id' : number, 'type' : string, 'title' : string, 'position' : number, 'image' : string}

const HomePage = () => {
    const [data, setData] = useState<dataInterface[]>([]);
    const [currentImageShown, setCurrentImageShown] = useState<string>('');
    const [showAddEditForm, setShowAddEditForm] = useState<boolean>(false);
    const [editData, setEditData] = useState<dataInterface | {}>({});

    const { requestGET, requestPOST, requestPUT, requestDELETE } = useAxios();

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
        const URL = apiURLs.retrieveList;
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

    const handleFormSubmit = (formData : formPayload) => {
        const data : any = new FormData()
        data.append('title', formData.title);
        data.append('image', formData.image);

        if(Object.keys(editData).length) {
            if('id' in editData)
                editCatData(data, editData['id']);
        }
        else 
            addData(data);
    }

    const addData = async (formData : FormData) => {
        const URL = apiURLs.addData;
        const response = await requestPOST(URL, formData);
        
        if(response.status === 201) {
            setData((previousData) => [...previousData, response.data]);
            setShowAddEditForm(false);  
        } 
        else {
            // Handle error here
        }
    } 

    const editCatData = async (formData : FormData, id : number) => {
        const URL = `${apiURLs.EditOrDelete}/${id}/edit/`;
        const response = await requestPUT(URL, formData);
        
        if(response.status === 200) {
            const index = data.findIndex(aData => aData.id === id);
            const _data = [...data];
            _data[index] = response.data;
            setData(_data);
            setShowAddEditForm(false);  
        } 
        else {
            // Handle error here
        }
    }

    const handleDelete = async (id : number) => {
        const URL = `${apiURLs.EditOrDelete}/${id}/delete/`;
        const response = await requestDELETE(URL);
        if(response.status === 200) {
            let _data = data.filter(aData => aData.id !== id);
            setData(_data);
        }
        else {
            // Handle error here
        }
    }

    return (
        <>
            <div className="text-end mb-[50px] pr-[55px]">
                <button onClick={() => setShowAddEditForm(true)} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    + Add New Data
                </button>
            </div>
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
                                onDeleteClick = {(id) => handleDelete(id)}
                                onEditClick = {(data) => {
                                    setEditData(data);
                                    setShowAddEditForm(true);
                                }}
                            />
                        </div>
                    ))
                }

                {/* Add and Edit Modal */}
                <Modal show={showAddEditForm}>
                    <AddEditForm 
                        data = {editData}
                        onFormSubmit = {(formData) => handleFormSubmit(formData)}
                        onClose={() => {
                            setShowAddEditForm(false);
                            setEditData({});
                        }}
                        modalOpen = {showAddEditForm}
                    />
                </Modal>



                <Modal show={currentImageShown ? true : false}>
                    <LazyLoadImage 
                        src={currentImageShown}
                        alt={''} 
                        effect="blur"
                        placeholderSrc={currentImageShown}
                    />
                </Modal>
            </div>
        </>
    )
}

export default HomePage