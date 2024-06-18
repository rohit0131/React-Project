import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import {toast} from 'react-toastify'
import SummaryApi from '../../common';






const AdminEditCategory = ({
  onClose,
  categoryData,
  fetchdata
}) => {

const [data,setData] = useState({
  ...categoryData,
  categoryName : categoryData?.categoryName,
  description : categoryData?.description

})



const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name]  : value
      }
    })
}



  




{/**upload product */}
const handleSubmit = async(e) =>{
  e.preventDefault()
  
  const response = await fetch(SummaryApi.updateCartProduct.url,{
    method : SummaryApi.updateCategory.method,
    credentials : 'include',
    headers : {
      "content-type" : "application/json"
    },
    body : JSON.stringify(data)
  })

  const responseData = await response.json()

  if(responseData.success){
      toast.success(responseData?.message)
      onClose()
      fetchdata()
  }


  if(responseData.error){
    toast.error(responseData?.message)
  }


}


  return (
   
    <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
    <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

         <div className='flex justify-between items-center pb-3'>
             <h2 className='font-bold text-lg'>Edit Category</h2>
             <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                 <CgClose/>
             </div>
         </div>

       <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
         <label htmlFor='categoryName'>Category Name :</label>
         <input 
           type='text' 
           id='categoryName' 
           placeholder='enter category name' 
           name='categoryName'
           value={data.categoryName} 
           onChange={handleOnChange}
           className='p-2 bg-slate-100 border rounded'
           required
         />



           <label htmlFor='description' className='mt-3'>Description :</label>
           <textarea 
             className='h-28 bg-slate-100 border resize-none p-1' 
             placeholder='enter category description' 
             rows={3} 
             onChange={handleOnChange} 
             name='description'
             value={data.description}
           >
           </textarea>





           <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Update Category</button>
       </form> 



   
    </div>



   
     

 </div>
  )
}

export default AdminEditCategory