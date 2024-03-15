import React, { useState, useEffect } from 'react';
import postsService from './postsService'; // Adjust the import path as necessary

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await postsService.fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []); // No dependency on the token

  const deletePost = async (postId) => {
    console.log(`Deleting post ${postId}`);
    try {
      await postsService.deletePost(postId);
      setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  // Implement the editPost functionality here similarly, using postsService.editPost

  return (
    <div>
      <h2>Posts</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {/* Adjust this logic based on how you check for user's ability to edit/delete posts */}
              <div>
                {/* Placeholder for Edit button */}
                <button onClick={() => console.log(`Edit post ${post.id}`)}>Edit</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default PostsList;
