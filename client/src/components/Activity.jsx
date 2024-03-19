import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faMarker,faTrash } from '@fortawesome/free-solid-svg-icons'
import { motion } from "framer-motion";
const Activity = ({dataId,dataTodo,dataTime,dataStatus,dataChange,dataDelete}) => {
    return (
        <>
            <div className="w-full bg-white p-2 rounded-sm flex ">
                <div className="w-8/12 flex  items-center gap-2 break-words ">
                <button onClick={()=>dataChange(dataId,!dataStatus,dataTodo,"buttonUpdate")} className='flex items-center'><FontAwesomeIcon icon={faCheck} className={`p-2 bg-base-100 rounded-md text-base-100 ${dataStatus === true ? "bg-primary text-white": null}`}/></button>
                    <div className='flex flex-col overflow-hidden'>
                        <h1 className={`font-semibold text-sm ${dataStatus === true ? "line-through": null}`}>{dataTodo}</h1>
                        <p className='text-xs'>{dataTime}</p>
                    </div>
                </div>
                <div className="w-1/3 flex justify-end items-center gap-2">
                    <motion.button whileTap={{ scale: 0.85 }} onClick={()=>dataDelete(dataId)} className='flex items-center'><FontAwesomeIcon icon={faTrash} className='p-2 bg-base-100 rounded-md text-primary'/></motion.button>
                    <motion.button whileTap={{ scale: 0.85 }} onClick={()=>dataChange(dataId,!dataStatus,dataTodo,"buttonEdit")}  className='flex items-center'><FontAwesomeIcon icon={faMarker} className='p-2 bg-base-100 rounded-md text-primary'/></motion.button>
                </div>
            </div>        
        </>
    )
}   
export default Activity