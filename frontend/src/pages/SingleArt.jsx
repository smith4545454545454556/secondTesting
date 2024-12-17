import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { comment, deleteArt, getArt } from '../api/art';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SingleArt = () => {
    const { artData, userContextData } = useContext(UserContext); // Assuming artData is an object
    const [storeArt, setStoreArt] = useState([]);

    const [singleArt, setSingleArt] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate()
    const [addComment, setAddComment] = useState(null);

    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e, artId) => {
        e.preventDefault();
        if (!newComment) return;

        try {
            const response = await comment({ userId: userContextData.user, artId: artId, text: newComment });

            if (response?.data) {
                const lastComment = response.data.response.comments[response.data.response.comments.length - 1];
                // Alternatively, you can use the .at() method for modern syntax
                // const lastComment = response.data.response.comments.at(-1);

                setSingleArt((prevState) => ({
                    ...prevState,
                    comments: [...prevState.comments, lastComment] // Add the last comment to the current comments array
                }));

                console.log(singleArt, "comment checking")
                console.log(response.data.response.comments, "the actual response")



                setStoreArt((prevArt) =>
                    prevArt.map((art) =>
                        art._id === artId
                            ? {
                                ...art,
                                comments: [...art.comments, response.data.comment],
                            }
                            : art
                    )
                );

                setNewComment('');
                setAddComment(null);

                toast.success("Comment added successfully!");
            } else {
                throw new Error("Failed to add comment");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
            toast.error("Failed to add comment. Please try again.");
        }
    };
    useEffect(() => {
        const reload = async () => {
            try {
                const response = await getArt();
                console.log(response, "reload");

                // Find the specific art by id
                const filteredArt = response.data.art.find((artItem) => artItem._id === id);
                setSingleArt(filteredArt);
            } catch (error) {
                console.error("Error fetching art:", error);
            }
        };
        reload();
    }, [id]);

    useEffect(() => {
        console.log(singleArt, "singleArt");
    }, [singleArt]);
    const handleDeletePost = async (id) => {
        console.log(id, "the id")
        const response = await deleteArt({
            artId: id
        })
        if (response.data.success) {
            navigate("/art")
        }

        console.log(response.data, "deleted data")
        return response

    }
    const handleCommentCancel = () => {
        setAddComment(null);
    };

    return (
        <div className=' mt-6'>
            {singleArt ? (
                <>
                    <ToastContainer />

                    <div className="md:flex flex-row gap-16">
                        {/* Fixed Image Section */}
                        <div className="md:sticky md:top-0">
                            <img
                                src={singleArt.cover}
                                alt={singleArt.name}
                                className="art-cover"
                            />

                            {addComment === singleArt._id ? (
                                <div className="flex flex-col bg-gray-100 p-4 rounded-md border mt-2">
                                    <textarea
                                        placeholder="Write your comment here..."
                                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-800 resize-none"
                                        rows={3}
                                        value={newComment}
                                        onChange={handleCommentChange}
                                    ></textarea>
                                    <div className="flex justify-end mt-3 space-x-3">
                                        <button
                                            onClick={(e) => handleCommentSubmit(e, singleArt._id)}
                                            className="px-4 py-2 bg-[#681dad] text-white rounded-md hover:bg-[#8730d8] transition"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            onClick={handleCommentCancel}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 hover:text-gray-200 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    className="mt-8 ml-3  py-2 text-white px-2 bg-[#681dad]   rounded-md  transition"
                                    onClick={() => setAddComment(singleArt._id)}
                                >
                                    Add a Comment
                                </button>
                            )}
                            {userContextData.user === singleArt.user._id ? (
                                <button className=' bg-red-600 p-2 text-white rounded-md ml-4'
                                    onClick={() => {
                                        handleDeletePost(singleArt._id);
                                    }}
                                >
                                    Delete
                                </button>
                            ) :
                                <button className=' bg-green-600 p-2 text-white rounded-md ml-4'
                                    onClick={() => {
                                        navigate("/checkout")
                                    }}
                                >
                                    Buy
                                </button>}
                        </div>

                        {/* Scrollable Comments Section */}
                        <div className="flex flex-col overflow-y-auto pb-14 max-h-screen w-full">
                            {/* Art Info */}
                            <div className=' pl-14 pt-3'>
                                <h1 className="text-5xl text-[#4e3faf] capitalize">{singleArt.name}</h1>
                                <p className="text-[19px] text-gray-700  font-normal">{singleArt.description}</p>
                            </div>

                            {/* Comments */}
                            <div className="mt-24">
                                {/* Section Title */}
                                <h2 className="text-4xl font-semibold text-[#4b3ab6] text-center mb-8">Comments</h2>



                                {/* Comment List */}
                                <div className="mt-10 space-y-6">
                                    {singleArt.comments?.length > 0 ? (
                                        singleArt.comments.reverse().map((comment, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col gap-4 bg-white border border-gray-200 rounded-lg shadow-md p-5 max-w-2xl mx-auto"
                                            >
                                                {/* Comment Header */}
                                                <div className="flex items-center gap-4">
                                                    {/* User Avatar */}
                                                    <div className="w-12 h-12 bg-[#681dad] text-white flex items-center justify-center rounded-full text-lg font-semibold">
                                                        {comment.user.name[0].toUpperCase()}
                                                    </div>
                                                    {/* User Name */}
                                                    <h4 className="text-lg font-medium">{comment.user.name}</h4>
                                                </div>
                                                {/* Comment Text */}
                                                <p className="text-gray-700">{comment.text}</p>
                                                {/* Comment Timestamp */}
                                                <p className="text-sm text-gray-500">
                                                    Posted on: {new Date(comment.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500 text-lg">No comments yet. Be the first to comment!</p>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>




                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SingleArt;
