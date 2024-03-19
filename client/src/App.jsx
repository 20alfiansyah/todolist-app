import { useState } from 'react'
import Home from './pages/Home'
import CreateModal from './components/CreateModal'
import UpdateModal from './components/UpdateModal';
import toast, { Toaster } from 'react-hot-toast';
function App() {
  const [isOpenCreate, setIsOpenCreate] = useState(false)
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const [editTodoData, setEditTodoData] = useState()
  const handleEditData = (data) => {
    setEditTodoData(data)
  }
  const handleModal = (mode) =>{
    if (mode == 'Create' && isOpenUpdate == false) {
      setIsOpenCreate(!isOpenCreate)
    }

    else if(mode == 'Edit' && isOpenCreate == false){
      setIsOpenUpdate(!isOpenUpdate)
    }
    else{
      setIsOpenCreate(false)
      setIsOpenUpdate(false)
    }
  }
  const handleNotify = (status) => {
    status === "error" ? toast.error("Fill The TODO"): toast.success('Task Has Been Added')
  }
  return (
    <>
      <main className='w-full h-screen  bg-base-100 relative flex justify-center items-center font-Poppins overflow-hidden'>
        <Toaster/>
        {isOpenCreate === true ? <CreateModal handleModal={handleModal} handleNotify={handleNotify} /> : null}
        {isOpenUpdate === true ? <UpdateModal handleModal={handleModal} setTodoData={editTodoData} handleNotify={handleNotify}/> : null}
        <Home handleModal={handleModal} handleNewChange={isOpenCreate} handleEditData={handleEditData}/>
      </main>
    </>
  )
}

export default App
