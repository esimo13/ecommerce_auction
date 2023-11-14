// import React, { useState } from "react";

// const CreateAuctionForm = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     startingBid: "",
//     endTime: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         "http://localhost:3001/api/v1/admin/auction/new",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (response.ok) {
//         console.log("Auction created successfully!");
//         // Handle successful response,
//       } else {
//         console.error("Failed to create auction");
//         // Handle error response
//       }
//     } catch (error) {
//       console.error("Error creating auction:", error);
//       // Handle network or other errors
//     }
//   };

//   return (
//     <div>
//       <h2>Create Auction</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Description:
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Starting Bid:
//           <input
//             type="number"
//             name="startingBid"
//             value={formData.startingBid}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           End Time:
//           <input
//             type="datetime-local"
//             name="endTime"
//             value={formData.endTime}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <button type="submit">Create Auction</button>
//       </form>
//     </div>
//   );
// };

// export default CreateAuctionForm;

// import React, { Fragment, useEffect, useState } from "react";
// import "./newProduct.css";
// import { useSelector, useDispatch } from "react-redux";
// import { clearErrors, createProduct } from "../../actions/productAction";
// import { useAlert } from "react-alert";
// import { Button } from "@material-ui/core";
// import MetaData from "../layout/MetaData";
// import AccountTreeIcon from "@material-ui/icons/AccountTree";
// import DescriptionIcon from "@material-ui/icons/Description";
// import StorageIcon from "@material-ui/icons/Storage";
// import SpellcheckIcon from "@material-ui/icons/Spellcheck";
// import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
// import SideBar from "./Sidebar";
// import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

// const CreateAuctionForm = ({ history }) => {
//   const dispatch = useDispatch();
//   const alert = useAlert();

//   const { loading, error, success } = useSelector((state) => state.newProduct);

//   const [name, setName] = useState("");
//   const [price, setPrice] = useState(0);
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [Stock, setStock] = useState(0);
//   const [images, setImages] = useState([]);
//   const [imagesPreview, setImagesPreview] = useState([]);

//   const categories = [
//     "Laptop",
//     "Footwear",
//     "Bottom",
//     "Tops",
//     "Attire",
//     "Camera",
//     "SmartPhones",
//   ];

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     if (success) {
//       alert.success("Product Created Successfully");
//       history.push("/admin/dashboard");
//       dispatch({ type: NEW_PRODUCT_RESET });
//     }
//   }, [dispatch, alert, error, history, success]);

//   const createProductSubmitHandler = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();

//     myForm.set("name", name);
//     myForm.set("price", price);
//     myForm.set("description", description);
//     myForm.set("category", category);
//     myForm.set("Stock", Stock);

//     images.forEach((image) => {
//       myForm.append("images", image);
//     });
//     dispatch(createProduct(myForm));
//   };

//   const createProductImagesChange = (e) => {
//     const files = Array.from(e.target.files);

//     setImages([]);
//     setImagesPreview([]);

//     files.forEach((file) => {
//       const reader = new FileReader();

//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setImagesPreview((old) => [...old, reader.result]);
//           setImages((old) => [...old, reader.result]);
//         }
//       };

//       reader.readAsDataURL(file);
//     });
//   };

//   return (
//     <Fragment>
//       <MetaData title="Create Product" />
//       <div className="dashboard">
//         <SideBar />
//         <div className="newProductContainer">
//           <form
//             className="createProductForm"
//             encType="multipart/form-data"
//             onSubmit={createProductSubmitHandler}
//           >
//             <h1>Create Product</h1>

//             <div>
//               <SpellcheckIcon />
//               <input
//                 type="text"
//                 placeholder="Product Name"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div>
//               <AttachMoneyIcon />
//               <input
//                 type="number"
//                 placeholder="Price"
//                 required
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </div>

//             <div>
//               <DescriptionIcon />

//               <textarea
//                 placeholder="Product Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 cols="30"
//                 rows="1"
//               ></textarea>
//             </div>

//             <div>
//               <AccountTreeIcon />
//               <select onChange={(e) => setCategory(e.target.value)}>
//                 <option value="">Choose Category</option>
//                 {categories.map((cate) => (
//                   <option key={cate} value={cate}>
//                     {cate}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <StorageIcon />
//               <input
//                 type="number"
//                 placeholder="Stock"
//                 required
//                 onChange={(e) => setStock(e.target.value)}
//               />
//             </div>

//             <div id="createProductFormFile">
//               <input
//                 type="file"
//                 name="avatar"
//                 accept="image/*"
//                 onChange={createProductImagesChange}
//                 multiple
//               />
//             </div>

//             <div id="createProductFormImage">
//               {imagesPreview.map((image, index) => (
//                 <img key={index} src={image} alt="Product Preview" />
//               ))}
//             </div>

//             <Button
//               id="createProductBtn"
//               type="submit"
//               disabled={loading ? true : false}
//             >
//               Create
//             </Button>
//           </form>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default CreateAuctionForm;

// import React, { useState } from "react";

// const CreateAuctionForm = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     startingBid: "",
//     endTime: "",
//     images: [], // New field for handling image uploads
//   });

//   const handleChange = (e) => {
//     if (e.target.name === "images") {
//       // Handle file input separately
//       setFormData({
//         ...formData,
//         images: e.target.files,
//       });
//     } else {
//       // Handle other inputs
//       setFormData({
//         ...formData,
//         [e.target.name]: e.target.value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formDataWithImages = new FormData();

//       // Append other form data
//       formDataWithImages.append("title", formData.title);
//       formDataWithImages.append("description", formData.description);
//       formDataWithImages.append("startingBid", formData.startingBid);
//       formDataWithImages.append("endTime", formData.endTime);

//       // Append images
//       for (const image of formData.images) {
//         formDataWithImages.append("images", image);
//       }

//       const response = await fetch(
//         "http://localhost:3001/api/v1/admin/auction/new",
//         {
//           method: "POST",
//           body: formDataWithImages,
//         }
//       );

//       if (response.ok) {
//         console.log("Auction created successfully!");
//         // Handle successful response,
//       } else {
//         console.error("Failed to create auction");
//         // Handle error response
//       }
//     } catch (error) {
//       console.error("Error creating auction:", error);
//       // Handle network or other errors
//     }
//   };

//   return (
//     <div>
//       <h2>Create Auction</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Description:
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Starting Bid:
//           <input
//             type="number"
//             name="startingBid"
//             value={formData.startingBid}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           End Time:
//           <input
//             type="datetime-local"
//             name="endTime"
//             value={formData.endTime}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Images:
//           <input
//             type="file"
//             name="images"
//             multiple
//             onChange={handleChange}
//             accept="image/*"
//           />
//         </label>
//         <br />
//         <button type="submit">Create Auction</button>
//       </form>
//     </div>
//   );
// };

// export default CreateAuctionForm;

import React, { useState } from "react";

const CreateAuctionForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingBid: "",
    endTime: "",
    images: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataForUpload = new FormData();
    formDataForUpload.append("title", formData.title);
    formDataForUpload.append("description", formData.description);
    formDataForUpload.append("startingBid", formData.startingBid);
    formDataForUpload.append("endTime", formData.endTime);
    formDataForUpload.append("images", formData.images);

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/admin/auction/new",
        {
          method: "POST",
          body: formDataForUpload,
        }
      );

      if (response.ok) {
        console.log("Auction created successfully!");
        // Optionally, you can redirect the user or perform other actions on success.
      } else {
        console.error("Failed to create auction");
        // Handle error response
      }
    } catch (error) {
      console.error("Error creating auction:", error);
      // Handle network or other errors
    }
  };

  return (
    <div>
      <h2>Create Auction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Starting Bid:
          <input
            type="number"
            name="startingBid"
            value={formData.startingBid}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          End Time:
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Images:
          <input
            type="file"
            accept="image/*"
            name="images"
            onChange={handleImageChange}
          />
        </label>
        <br />
        <button type="submit">Create Auction</button>
      </form>
    </div>
  );
};

export default CreateAuctionForm;
