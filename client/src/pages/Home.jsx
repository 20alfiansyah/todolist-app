import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import Todo from "../components/Todo.jsx";
const Home = ({handleModal,handleNewChange,handleEditData}) => {
    const [todoData, settodoData] = useState([])
    const [newTodoData, setnewTodoData] = useState({ })
    const [deleteTodoData,setdeleteTodoData] = useState({})
    const [onStatus, setonStatus] = useState("All")
   
    const dataChange = (id,status,todo,mode) => {
        if (mode == "buttonUpdate") {
            setnewTodoData({
                id: id,
                todo: todo,
                status: status,
                mode: mode
            })
        }
        else {
            handleEditData({
                id: id,
                todo: todo,
                status: status,
                mode: mode
            })
            handleModal('Edit')
        }
    }

    const dataDelete = (id) => {    
        setdeleteTodoData({
            id: id
        })
    }

    const fetchActivity = async () =>{
        try {
            fetch('https://todolist-app-black-five.vercel.app/api')
            .then(res => res.json())
            .then(data => settodoData(data))
        } catch (error) {
            console.log(error)
            fetchActivity()
        }
    }

    const handlePatchRequest = async () => {
        try {
            const response = await fetch('https://todolist-app-black-five.vercel.app/api', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTodoData)
            })
            if (response.status === 200) {
                fetchActivity()
            }
            if (response.status === 404){
                fetchActivity()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteRequest = async() => {
        try {
            const response = await fetch('https://todolist-app-black-five.vercel.app/api',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(deleteTodoData)
            })
            if (response.status === 200) {
                fetchActivity()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleStatus = (e) => {
        setonStatus(e.target.value)
    }
    
    useEffect(() => {
        fetchActivity()        
    },[handleNewChange,handleEditData])

    useEffect(() =>{
        handlePatchRequest()
    },[newTodoData])

    useEffect(() =>{
        handleDeleteRequest()
    },[deleteTodoData])
    return (
        <>
            <div className="w-10/12 lg:w-2/5 bg-white p-5 lg:p-5 rounded-lg flex flex-col font-Poppins items-center justify-center lg:justify-between gap-3 overflow-hidden">
                <div className=" w-full flex flex-col lg:flex-row lg:justify-around gap-2">
                    <div className="font-bold flex justify-center items-center flex-col">
                        <h1 className="text-3xl lg:text-3xl ">TODO <span className="text-primary">LIST</span></h1>
                        <p className="text-lg lg:text-sm">One Task At a Time</p>
                    </div>
                    <div className="flex justify-end items-center gap-3">
                        <motion.button onClick={()=>handleModal('Create')} whileTap={{ scale: 0.85 }} className="w-1/2 py-3 px-2 lg:text-sm bg-base-100 text-white font-bold rounded-lg">ADD TASK <FontAwesomeIcon icon={faPlus}/></motion.button> 
                        <motion.select whileTap={{ scale: 0.85 }} onChange={handleStatus} name="status" id="" className="w-1/2 py-3 lg:text-sm bg-base-100 px-2 text-white font-bold rounded-lg">
                            <option value="All">All</option>
                            <option value="Completed">Completed</option>
                            <option value="Incompleted">Incompleted</option>
                        </motion.select> 
                    </div>
                </div>
                
                <div className="w-full max-h-96 overflow-x-hidden bg-base-100 p-3 rounded-md flex flex-col items-center justify-center gap-3">
                    <Todo todoData={todoData} statusData={onStatus} dataChange={dataChange} dataDelete={dataDelete}/>
                </div>
            </div>
        </>
    )
}
export default Home