import Activity from "./Activity"
import Greetings from "./Greetings"
const Todo = ({todoData,statusData,dataChange,dataDelete}) =>{
    let searchData = null
    if(statusData == "All" && todoData.length!=0){
        return(
            todoData.map((c)=>{
                return(
                    <Activity key={c.id} dataId={c.id} dataStatus={c.status} dataTodo={c.todo} dataTime={c.time} dataChange={dataChange} dataDelete={dataDelete} />
                )
            })
        )
    }

    else if (statusData == "Completed"){
        searchData = todoData.filter((c)=> c.status === true)
        if (searchData.length!=0){
            return(
                searchData.map((c)=>{
                    return(
                        <Activity key={c.id} dataId={c.id} dataStatus={c.status} dataTodo={c.todo} dataTime={c.time} dataChange={dataChange} dataDelete={dataDelete}/>
                    )
                })
            )
        }
        else{
            return(
                <h1 className="text-white font-semibold text-center">Oops! There is no <span className="text-primary">Todo</span> found</h1>
            )
        }
    }

    else if (statusData == "Incompleted"){
        searchData = todoData.filter((c)=> c.status === false)
        if (searchData.length!=0){
            return(
                searchData.map((c)=>{
                    return(
                        <Activity key={c.id} dataId={c.id} dataStatus={c.status} dataTodo={c.todo} dataTime={c.time} dataChange={dataChange} dataDelete={dataDelete} />
                    )
                })
            )
        }
        else{
            return(
                <h1 className="text-white font-semibold text-center">Oops! There is no <span className="text-primary">Todo</span> found</h1>
            )
        }
    }

    else{
        return(
            <Greetings/>
        )
    }
}
export default Todo
