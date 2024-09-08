import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Card from "../components/HomePage/Card";
import Modal from "../components/general/Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useAxios from "../hooks/useAxios";
import AddEditForm, { formPayload } from "../components/HomePage/AddEditForm";
import apiURLs from "../constants/apiURLs";
import Toast from "../providers/Toast";


export interface dataInterface {'id' : number, 'type' : string, 'title' : string, 'position' : number, 'image' : string}

const HomePage = () => {
    const [data, setData] = useState<dataInterface[]>([]);
    const [currentImageShown, setCurrentImageShown] = useState<string>('');
    const [loader, setLoader] = useState(false);
    const [showAddEditForm, setShowAddEditForm] = useState<boolean>(false);
    const [editData, setEditData] = useState<dataInterface | {}>({});
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [timeAgo, setTimeAgo] = useState<string>('')
    const shufflingHappend = useRef<boolean>(false);
    const { setToastData } = useContext(Toast);
    const { requestGET, requestPOST, requestPUT, requestDELETE, requestPATCH } = useAxios();    
    
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
        });
    }, []);

    useEffect(() => {
        let timerID = undefined;
        if(shufflingHappend.current) {
            timerID = setInterval(() => {
                if(shufflingHappend.current) {
                    reorderPositions();
                }
            }, 5000);
        }

        return () => {
            clearInterval(timerID);
        }
    }, [shufflingHappend.current]);

    useEffect(() => {
        setInterval(() => {
            if(lastSaved)
                setTimeAgo(getTimeAgo());
        }, 5000);
    }, [lastSaved])

    const getTimeAgo = () => {
        if(lastSaved) {
            const now = new Date();
            const diff = Math.floor((now.getTime() - lastSaved.getTime()) / 1000); 
            if (diff < 60) {
                return `${diff} seconds ago`;
            } else if (diff < 3600) { // less than an hour
                const minutes = Math.floor(diff / 60);
                return `${minutes} minutes ago`;
            } else if (diff < 86400) { // less than a day
                const hours = Math.floor(diff / 3600);
                return `${hours} hours ago`;
            } else {
                const days = Math.floor(diff / 86400);
                return `${days} days ago`;
            }
        }
        return '';
    } 

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
        shufflingHappend.current = true;
        _data = _data.map((aData, index) => {
            return {...aData, position : index}
        });
        setData(_data);
    };

    const handleFormSubmit = (formData : formPayload) => {
        const data : any = new FormData()
        data.append('title', formData.title);
        data.append('image', formData.image);

        setLoader(true);

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
            setEditData({});
            setLoader(false);
        } 
        else {
            setLoader(false);
            setToastData({
                show : true,
                message : response.response.data.error,
                type : 'error'
            });
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
            setEditData({});
            setLoader(false);
        } 
        else {
            setToastData({
                show : true,
                message : response.response.data.error,
                type : 'error'
            });
            setLoader(false);
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
            setToastData({
                show : true,
                message : response.response.data.error,
                type : 'error'
            })
        }
    }    

    const reorderPositions = async () => {    
        const URL = apiURLs.reOrderPositions;

        const payload : any = {}

        data.forEach(aData => {
            payload[aData.id] = aData.position
        })        

        const response = await requestPATCH(URL, payload);

        if(response.status == 200) {
            shufflingHappend.current = false;
            setLastSaved(new Date());
        }
        else {
            // Handling error!
            setToastData({
                show : true,
                message : response.response.data.error,
                type : 'error'
            })
            shufflingHappend.current = false;
        }
    }

    return (
        <>
            <div className="flex justify-between items-center mb-[50px] px-[55px]">
                {
                    lastSaved ? 
                    <p> Last Saved : {timeAgo} </p>
                    :
                    <p> Last Saved : Never </p>
                }
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
                        loader = {loader}
                    />
                </Modal>

                {/* lazy load the images */}
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