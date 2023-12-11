import { useState } from "react";

import Image from "next/image";

import btoa from 'btoa';

import useHttp from "@/hooks/useHttp";

import uploadIcon from "../public/upload.svg";


const CreatePost = ({ updateCommentsHandler }) => {
  const [base64Image, setBase64Image] = useState(null);

  const [comment, setComment] = useState();

  const { isLoading, error, sendRequest: createComment } = useHttp();

  const handleFileChange = (event) => {
     const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64 =  btoa(reader.result);
        console.log(base64)
        setBase64Image(base64);
      };

      reader.readAsBinaryString(file);
    }
  };

  const submitCommentHandlerResponse = (res) => {
    console.log(res);
    const { message } = res;

    if (message === "Post Created") {
      const chatUpdate = {
        post: comment,
        username: "james_hall@gmail.com",
      };
      updateCommentsHandler(chatUpdate);
      setComment("");
      if (base64Image) setBase64Image(null);
    }
  };

  const submitCommentHandler = (event) => {
    event.preventDefault();

    if (!comment) return;

    // const withImage = ;

    const url = base64Image ? "createpost" : "posts";

    createComment(
      {
        url,
        method: "POST",
        body: {
          username: "james_hall@gmail.com",
          base64str:  base64Image && base64Image,
          post: comment,
        },
      },
      submitCommentHandlerResponse
    );
  };

  return (
    <form
      onSubmit={submitCommentHandler}
      className="fixed bottom-0 w-full px-3 pb-3"
    >
      {error && <p className="bg-white w-full text-red-500">{error}</p>}

      {base64Image && (
        <div className="w-full h-40 bg-white">
          <Image
            src={`data:image/png;base64,${base64Image}`}
            alt="Uploaded"
            className="w-full h-full object-scale-down"
            width={300}
            height={200}
          />
        </div>
      )}
      <div className="flex border rounded-lg overflow-hidden h-12">
        <div className="flex items-center justify-center w-14 border bg-blue-950">
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="fileInput" className="cursor-pointer">
            <Image
              src={uploadIcon}
              alt="upload icon"
              priority
              loading="eager"
              className="w-6 h-6"
              height={40}
              width={40}
            />
          </label>{" "}
        </div>
        <textarea
          onChange={(event) => setComment(event.target.value)}
          value={comment}
          placeholder="Comment"
          className="p-2 outline-none w-full resize-none content-center"
        />
        <button
          disabled={!comment}
          className={` text-white p-3 text-sm md:text-base ${
            !comment || isLoading ? "bg-gray-600" : "bg-green-500"
          }`}
        >
          {isLoading ? "..." : "Post"}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
