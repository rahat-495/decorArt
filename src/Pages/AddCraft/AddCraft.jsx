
import { Input } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

const AddCraft = () => {

    const [loading , setLoading] = useState(false) ;
    const {user} = useContext(AuthContext) ;
    
    const handleSubmit = (e) => {
        e.preventDefault() ;

        const form = e.target ;

        const itemName = form.itemName.value ;
        const subName = form.subName.value ;
        const image = form.image.value ;
        const shortDesc = form.shortDesc.value ;
        const processing = form.processing.value ;
        const price = form.price.value ;
        const rating = form.rating.value ;
        const stockStatus = form.stockStatus.value ;
        const customization = form.customization.value ;
        
        const itemInfo = {itemName , customization , subName , price , rating , stockStatus , processing , image , shortDesc , userName : user.displayName , userEmail : user.email} ;

        console.log(itemInfo);

        setLoading(true) ;
        fetch(`https://assignment-10-server-sandy-one.vercel.app/addCraftItem` , {
            method : 'POST' ,
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(itemInfo) 
        })
        .then(res => res.json())
        .then(data => {
            setLoading(false) ;
            console.log(data);
            if(data.insertedId){
                Swal.fire({
                    title: "Good job",
                    text: "Item Added Success Fully !",
                    icon: "success"
                  });
                form.reset() ;
            }
        })
    }

    if(loading){
        return <span className="loading min-h-[100vh] mx-auto min-w-[20%] flex items-center justify-center loading-spinner loading-lg"></span>
    }

    return (
        <div className="max-w-[1440px] flex items-center justify-center flex-col mx-auto px-10 my-14">

            <Fade direction="up">
                <h1 className="text-3xl gro font-bold">Add Item</h1>
            </Fade>

            <div className="w-full">
                <form onSubmit={handleSubmit}>

                    <div className="w-full my-5 grid lg:grid-cols-2 gap-5">
                        <Fade direction="left">
                            <Input required type="text" name="itemName" label="Item Name" className="w-2/4"></Input>
                        </Fade>
                        
                        <Fade direction="right">
                            <div className="w-full bg-transparent px-1 py-3 border flex items-center justify-between border-[#B0BEC5] md:px-3 md:py-3 lg:px-3 lg:py-[6px] rounded-lg">
                                <label className="text-[#607D8B] text-sm lg:text-base" htmlFor="subName">Sub Categorie Name :</label>
                                <select  className="bg-transparent" required name="subName" id="subName">
                                    <option value="Clay-Made-Pottry">Clay-made pottery</option>
                                    <option value="Stoneware">Stoneware</option>
                                    <option value="Porcelain">Porcelain</option>
                                    <option value="Terra-Cotta">Terra Cotta</option>
                                    <option value="Ceramics">Ceramics & Architectura</option>
                                    <option value="Decor-Pottery">Home decor pottery</option>
                                </select>
                            </div>
                        </Fade>
                    </div>

                    <div className="w-full my-5 grid lg:grid-cols-2 gap-5">
                        <Fade direction="left">
                            <Input required type="text" name="shortDesc" label="Short Description"></Input>
                        </Fade>
                        <Fade direction="right">
                            <Input required type="text" name="image" label="Image-URL"></Input>
                        </Fade>
                    </div>

                    <div className="w-full my-5 grid lg:grid-cols-2 gap-5">
                        <Fade direction="left">
                            <Input required type="text" name="price" label="price"></Input>
                        </Fade>
                        <Fade direction="right">
                            <Input required type="text" name="processing" label="Processing Time"></Input>
                        </Fade>
                    </div>

                    <div className="w-full my-5 grid lg:grid-cols-2 gap-5">
                        <Fade direction="left">
                            <Input required type="text" name="rating" label="Rating" className="w-full"></Input>
                        </Fade>
                        
                        <Fade direction="right">
                            <div className="w-full border flex items-center justify-between border-[#B0BEC5] px-3 py-2 rounded-lg">
                                <label className="text-[#607D8B]" htmlFor="customization">Customization :</label>
                                <select className="bg-transparent" required name="customization" id="customization">
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </Fade>
                    </div>

                    <div className="w-full my-5 grid lg:grid-cols-2 gap-5">
                        <Fade direction="left">
                            <div className="w-full border flex items-center justify-between border-[#B0BEC5] px-3 py-2 rounded-lg">
                            <label className="text-[#607D8B]" htmlFor="stockStatus">
                            Stock Status :
                            </label>
                            <select className="bg-transparent" defaultValue={user.stockStatus} required name="stockStatus" id="stockStatus">
                                <option value="In Stock">In Stock</option>
                                <option value="Made to Order">Made to Order</option>
                            </select>
                            </div>
                        </Fade>
                        <Fade direction="right">
                            <Input type="text" name="userName" label="User Name" defaultValue={user.displayName} readOnly></Input>
                        </Fade>
                    </div>
                    
                    <div className="w-full my-5 grid lg:grid-cols-1 gap-5">
                        <Fade direction="left">
                            <Input type="text" name="UserEmail" label="User Email" defaultValue={user.email} readOnly></Input>
                        </Fade>
                    </div>

                    <div className="">
                        <Fade direction="up">
                            <input type="submit" value={'Add Item'} className="w-full btn btn-outline hover:btn-ghost"/>
                        </Fade>
                    </div>

                </form>
            </div>

            <ToastContainer
            position="top-center"
            autoClose={800}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />

        </div>
    );
};

export default AddCraft;
