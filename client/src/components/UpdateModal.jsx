import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark,faPlus } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from "framer-motion";
import { useFormik } from 'formik';
import  * as yup from 'yup';
const UpdateModal = ({handleModal,setTodoData,handleNotify}) =>{
    const handleSubmit = async(values) => {
        try {
            // Send form data to your server
            const response = await fetch('https://todolist-app-black-five.vercel.app/api/edit', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
    
            // Check if request was successful
            if (response.status === 200) {
                // Optionally handle success
                console.log('Form submitted successfully');
                // You can also call any notification function here
                handleNotify("success");
                handleModal();
            } else {
                // Handle errors if the request was not successful
                console.error('Form submission failed');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error occurred while submitting form:', error);
        }
    }
    const formik = useFormik({
        initialValues:{
            id: setTodoData.id,
            todo: "",
            status : true
        },
        onSubmit: handleSubmit,
        validationSchema: yup.object().shape({
            todo: yup.string().required().min(3),
            status: yup.string()
        })
    })

    const handleForm = (e) => {
        const { target } = e
        formik.setFieldValue(target.name, target.value)
    }
    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}  className="w-full h-full absolute bg-black bg-opacity-35 flex flex-col justify-center items-center gap-2 ">
                <div className="w-10/12 lg:w-2/5 flex justify-end">
                    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={()=>handleModal('Exit')} whileTap={{ scale: 0.85 }}> <FontAwesomeIcon icon={faXmark} className='p-3 rounded-lg scale-x-110 bg-white'/></motion.button> 
                </div>
                <div className="w-10/12 lg:w-2/5 px-5 py-7 bg-white rounded-lg flex flex-col gap-2">
                    <div>
                        <h1 className='font-bold text-lg'>Update Your <span className='text-primary'>Activity</span></h1>
                        <hr  className='border-1 rounded-md border-opacity-45 border-base-100'/>
                    </div>
                    <div>
                        <form action="http://localhost:5000/api" method='PATCH' onSubmit={formik.handleSubmit}>
                            <label htmlFor="" className='font-semibold'>Title</label>
                            <input type="text" name='todo' onChange={handleForm} placeholder={setTodoData.todo} className='w-full border-2 rounded-md border-base-100 border-opacity-20 p-2'/>
                            <div className='my-2'></div>
                            <label htmlFor="" className='font-semibold'>Status</label>
                            <select  name="status" id="" onChange={handleForm} className="w-full p-3 lg:text-sm bg-base-100 text-white font-bold rounded-lg">
                                <option value={true}>Completed</option>
                                <option value={false}>Incompleted</option>
                            </select> 
                            <div className='my-3'></div>
                            <motion.button  type='submit'  whileTap={{ scale: 0.85 }} className="w-full p-3 lg:text-sm bg-base-100 text-white font-bold rounded-lg">Update TASK <FontAwesomeIcon icon={faPlus}/></motion.button> 
                        </form>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
export default UpdateModal