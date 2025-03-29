import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaImage } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

function AddProduct() {
  const categorys = [
    {
      id: 1,
      name: "Sports",
    },
    {
      id: 2,
      name: "Tshirt",
    },
    {
      id: 3,
      name: "Mobile",
    },
    {
      id: 4,
      name: "Computer",
    },
    {
      id: 5,
      name: "Watch",
    },
    {
      id: 6,
      name: "Pant",
    },
  ];

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategorry] = useState(categorys);
  const [searchValue, setSearchValue] = useState("");

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategorry(srcValue);
    } else {
      setAllCategorry(categorys);
    }
  };

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];
      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };

  // console.log(images)
  // console.log(imageShow)

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImages = images;

      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImageShow([...tempUrl]);
      setImages([...tempImages]);
    }
  };

  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);

    setImages(filterImage);
    setImageShow(filterImageUrl);
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#fefeff] rounded-md border border-[#d2d3d2] ">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#6f6f70] text-xl font-semibold ">Add Product</h1>

          <Link
            to="/seller/dashboard/product"
            className="bg-[#fefeff] rounded-sm border border-[#d2d3d2] px-7 py-2 text-[#6f6f70] "
          >
            All Product
          </Link>
        </div>

        <div>
          <form>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#6f6f70] ">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product Name</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] "
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Product Name"
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Brand Name</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] "
                  onChange={inputHandle}
                  value={state.brand}
                  type="text"
                  name="brand"
                  id="brand"
                  placeholder="Brand Name"
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#6f6f70] ">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  onClick={() => setCateShow(!cateShow)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] "
                  onChange={inputHandle}
                  value={category}
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Category"
                />
                <div
                  className={`absolute top-[101%] bg-[#eeefee] w-full transition-all ${
                    cateShow ? "scale-100" : "scale-0"
                  } `}
                >
                  <div className="w-full px-4 py-2 fixed ">
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      className="px-4 py-2 w-full focus:border-indigo-500 outline-none  bg-transparent border border-slate-700 rounded-md text-[#6f6f70] overflow-hidden "
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scroll ">
                    {allCategory.map((c, i) => (
                      <span
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          category == c.name && "bg-indigo-500"
                        } `}
                        onClick={() => {
                          setCateShow(false);
                          setCategory(c.name);
                          setSearchValue("");
                          setAllCategorry(categorys);
                        }}
                      >
                        {c.name}{" "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Product stock</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] "
                  onChange={inputHandle}
                  value={state.stock}
                  type="text"
                  name=" stock"
                  id=" stock"
                  placeholder="Stock"
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#6f6f70] ">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] "
                  onChange={inputHandle}
                  value={state.price}
                  type="number"
                  name="price"
                  id="price"
                  placeholder="price"
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] "
                  onChange={inputHandle}
                  value={state.discount}
                  type="number"
                  name="discount"
                  id="discount"
                  placeholder="Discount"
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-1  text-[#6f6f70]">
              <label htmlFor="description">Description</label>

              <textarea
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] "
                onChange={inputHandle}
                value={state.description}
                name="description"
                id="description"
                placeholder="description"
                cols="10"
                rows="4"
              ></textarea>
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#6f6f70] mt-4 mb-4">
              {imageShow.map((img, i) => (
                <div className="h-[180px] relative ">
                  <label htmlFor={i}>
                    <img
                      className="w-full h-full rounded-sm "
                      src={img.url}
                      alt=""
                    />
                  </label>
                  <input
                    onChange={(e) => changeImage(e.target.files[0], i)}
                    type="file"
                    id={i}
                    className="hidden"
                  />
                  <span
                    onClick={(e) => removeImage(i)}
                    className="p-1 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 absolute top-1 right-1 rounded-full text-[#6f6f70] "
                  >
                    <IoMdCloseCircle />
                  </span>
                </div>
              ))}
              <label
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full text-[#6f6f70] "
                htmlFor="image"
              >
                <span>
                  <FaImage />{" "}
                </span>
                <span>Select Image </span>
              </label>
              <input
                className="hidden"
                onChange={imageHandle}
                multiple
                type="file"
                id="image"
              />
            </div>

            <div>
              <button className="bg-red-500 w-full hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 ">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
