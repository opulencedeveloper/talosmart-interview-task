import { useEffect, useLayoutEffect, useRef, useState } from "react";

import useHttp from "@/hooks/useHttp";
import CreatePost from "@/components/CreatePost";

const Home = () => {
  const [comments, setComments] = useState();
  const { isLoading, error, sendRequest: fetchComments } = useHttp();
  const commentsContainerRef = useRef();

  useLayoutEffect(() => {
    const scrollToBottom = () => {
      if (commentsContainerRef.current) {
        commentsContainerRef.current.scrollTop =
          commentsContainerRef.current.scrollHeight;
      }
    };

    // Scroll to the bottom after the component mounts or whenever the chats change
    scrollToBottom();
  }, [comments]);

  useEffect(() => {
    const fetchCommentsResponse = (res) => {
      const { data, error } = res;

      if (!error) {
        setComments(data);
      }
    };

    fetchComments(
      {
        url: "posts/james_hall@gmail.com",
      },
      fetchCommentsResponse
    );
  }, [fetchComments]);

  const updateCommentsHandler = (commentUpdate) => {
    setComments((prev) => [...prev, commentUpdate]);
  };

  return (
    <div className="flex flex-col items-center overflow-hidden h-screen px-4 pt-6">
      <h1 className="text-2xl font-bold text-blue-950">Welcome</h1>

      <div
        ref={commentsContainerRef}
        className="h-full overflow-auto w-full pt-5 mb-16"
      >
        {error && <p className="text-gray-500 text-center">{error}</p>}
        {isLoading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : (
          comments &&
          comments.map((comment, index) => (
            <div
              key={index}
              className="bg-blue-950 p-3 rounded-xl my-2 text-white"
            >
              <p>{comment.post}</p>
              <p>{comment.username}</p>
            </div>
          ))
        )}
      </div>
      <CreatePost updateCommentsHandler={updateCommentsHandler} />
    </div>
  );
};

export default Home;
