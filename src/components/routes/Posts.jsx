import React, { useEffect, useState } from 'react';
import { useFetchPost } from '../hooks/useFetchPost';
import { PostCard } from '../cards/PostCard';

export function Posts({ darkMode }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await useFetchPost();
        setPosts(data);
      } catch (error) {
        console.error('Error al cargar los posts:', error);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(270px,_1fr))] gap-12'>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            street="Centro"
            city="Puntarenas"
            name="Soda Maria"
            info={post.description}
            category="Soda"            
            media={Array.isArray(post.files) ? post.files.map(file => ({
              url: `http://localhost/escape-desarrollo-backend/public/storage/${file.file_path}`,
              type: file.file_type === 'image' ? 'image' : 'video',
            })) : []}
            likes="10"
            comments="10"
            darkMode={darkMode}
          />
        ))
      ) : (
        <p className="text-center dark:text-white">No hay posts disponibles</p>
      )}
    </div>
  );

}
