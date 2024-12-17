import React, { useContext, useEffect, useRef, useState } from 'react';
import { addArt, comment, getArt, likeArt } from '../api/art';
import { UserContext } from '../context/UserContext';
import useToggle from '../hook/useToggle';
import ArtPopUp from '../component/ArtPopUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { BiSolidLike } from "react-icons/bi";
import { MdClose } from "react-icons/md";

import { GoComment } from "react-icons/go";
import { trio } from 'ldrs';  // Importing jelly from ldrs

trio.register()

const Art = () => {
    const navigate = useNavigate();
    const { userContextData, artData, setArtData } = useContext(UserContext);
    const [storeArt, setStoreArt] = useState([]);
    const { open, close, isOpen } = useToggle();
    const allowedRef = useRef();

    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        const fetchArt = async () => {
            const response = await getArt();
            if (response?.data?.art) {
                setStoreArt(response.data.art);
            }
        };
        fetchArt();
    }, []);

    const handleFormChange = (e) => {
        const { value, name, files } = e.target;
        setArtData((prev) => ({
            ...prev,
            [name]: name === "cover" ? files[0] : value,
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!artData.name) {
            toast.error("Name is required");
            return;
        }
        if (!artData.description) {
            toast.error("Description is required");
            return;
        }
        if (!artData.cover) {
            toast.error("Cover image is required");
            return;
        }

        const formData = new FormData();
        formData.append("name", artData.name);
        formData.append("description", artData.description);
        formData.append("cover", artData.cover);
        formData.append("user", userContextData.user);

        setIsLoading(true);

        try {
            const response = await addArt(formData);
            if (response?.data?.art) {
                setStoreArt((prev) => [...prev, response.data.art]);
                toast.success("Art posted successfully!");
                setArtData({ name: "", description: "", cover: null });
                close();
            }
        } catch (error) {
            toast.error("Failed to post art. Please try again.");
            console.error("Error submitting art:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLike = async (id) => {
        setStoreArt((prevArt) =>
            prevArt.map((art) =>
                art._id === id
                    ? {
                        ...art,
                        likes: art.likes.includes(userContextData.user)
                            ? art.likes.filter((userId) => userId !== userContextData.user)
                            : [...art.likes, userContextData.user],
                    }
                    : art
            )
        );

        try {
            const response = await likeArt({
                userId: userContextData.user,
                artId: id,
            });
            if (!response || !response.data) {
                throw new Error("Failed to toggle like");
            }
        } catch (error) {
            console.error("Error toggling like:", error);
            setStoreArt((prevArt) =>
                prevArt.map((art) =>
                    art._id === id
                        ? {
                            ...art,
                            likes: art.likes.includes(userContextData.user)
                                ? [...art.likes, userContextData.user]
                                : art.likes.filter((userId) => userId !== userContextData.user),
                        }
                        : art
                )
            );
        }
    };

    useEffect(() => {
        console.log(userContextData.user, "the id");
    }, []);

    return (
        <div className='px-28'>
            <ToastContainer />
            <p className='text-6xl font-semibold text-[#4e3cc4]  text-center mt-6'>Posts</p>

            {userContextData?.role === "artist" && (
                <div className='flex flex-col items-start gap-4 p-8'>

                    <button
                        className='px-8 py-4 bg-[#4e3cc4] text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:bg-[#412ec2] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#412ec2]'
                        ref={allowedRef}
                        onClick={open}
                        aria-label='Add new art post'
                    >
                        Add Art
                    </button>
                </div>

            )}

            <ArtPopUp
                allowedRef={allowedRef}
                handleSubmit={handleSubmit}
                handleFormChange={handleFormChange}
                isOpen={isOpen}
                open={open}
                close={close}
            >
                <button className=' absolute top[10%] left-[89%] text-4xl text-red-600' onClick={close}><MdClose />
                </button>

                {isLoading ? (
                    <div className=' h-[100vh] w-[100vh] flex justify-center items-center'>
                        <l-trio
                            size="40"
                            speed="1.3"
                            color="white"
                        ></l-trio>
                    </div>
                ) : (<>
                    <form className="bg-white p-6 rounded-3xl shadow-lg max-w-lg mx-auto z-50" onSubmit={handleSubmit} encType="multipart/form-data">
                        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add Art</h2>

                        <div className="flex flex-col space-y-3">

                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    onChange={handleFormChange}
                                    type="text"
                                    name="name"
                                    value={artData.name || ""}
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#412ec2]"
                                    placeholder="Enter art title"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    onChange={handleFormChange}
                                    name="description"
                                    value={artData.description || ""}
                                    rows="4"
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#412ec2]"
                                    placeholder="Enter a brief description of the art"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Image</label>
                                <input
                                    onChange={handleFormChange}
                                    type="file"
                                    name="cover"
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#412ec2]"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 text-white font-semibold rounded-lg bg-[#412ec2]  focus:outline-none focus:ring-2 focus:ring-[#412ec2] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>

                </>




                )}
            </ArtPopUp>

            <div className="grid grid-cols-auto gap-5 pt-5 gap-y-6 sm:px-0 w-full">
                {storeArt.map((art, index) => (
                    <div
                        key={index}
                        className="border border-blue-200 rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500 "
                    >
                        <img className="bg-blue-50 object-cover h-60 " src={art.cover} alt={art.name} />
                        <div className="flex flex-col p-5">
                            <h1 className="font-semibold capitalize text-2xl text-[#10134e]">{art.name}</h1>
                            <p className="text-gray-900 text-sm mb-3">By: {art.user.name}</p>
                            <div>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center'>
                                        <button
                                            onClick={() => handleLike(art._id)}
                                            className="overflow-hidden"
                                        >
                                            <BiSolidLike
                                                className={`text-[25px] ${art.likes.includes(userContextData.user) ? "text-[#412ec2]" : "text-gray-500"}`}
                                            />
                                        </button>
                                        <p>{art.likes.length}</p>
                                    </div>
                                    <div onClick={() => { navigate(`/art/${art._id}`) }} className='flex relative'>
                                        <GoComment className='text-[#412ec2] text-[25px] cursor-pointer -z-0' />
                                        <p className=' cursor-pointer text-sm absolute -z-00 flex -top-4 -right-4 bg-[#412ec2] rounded-full text-white h-[2px] w-[2px] p-3 justify-center items-center'>
                                            {art.comments.length}
                                        </p>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <p className='cursor-pointer flex justify-center bg-[#4e3cc4] text-white p-2' onClick={() => navigate(`/art/${art._id}`)}>
                            More Details
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Art;
