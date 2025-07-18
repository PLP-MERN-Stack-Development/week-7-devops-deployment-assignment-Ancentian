import React, { useState, useEffect } from 'react';
import { postService, authService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
 

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchPosts = async () => {
      try {
        const userPosts = await postService.getMyPosts();
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [navigate, currentUser]);

  return (
    <Layout>
      {loading ? (
        <div className="text-center mt-4">Loading your posts...</div>
      ) : (
        <div className='w-full '>
          <h1 className="text-2xl font-bold mb-4">My Posts</h1>
          {posts.length === 0 ? (
            <p>You haven't created any posts yet.</p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post._id} className="p-4  bg-slate-60 rounded shadow">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <p className="text-sm text-gray-500">Views: {post.viewCount}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Layout>
  );
}
