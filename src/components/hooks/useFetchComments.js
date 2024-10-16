import { useState } from 'react';
import { useUser } from '../../context/UserContext';

export const useFetchComments = () => {
  const [comments, setComments] = useState([]);

  const { user } = useUser();

  const fetchComments = async (postId) => {
    if (!postId) {
      console.error('Invalid postId:', postId);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost/escape-desarrollo-backend/public/api/posts/${postId}/comments`);
      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }
  
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const submitComment = async (postId, comment) => {
    console.log(user);
    try {
      const response = await fetch('http://localhost/escape-desarrollo-backend/public/api/create/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ daily_post_id: postId, comment }),
        credentials: 'include',
      });
  
      if (response.ok) {
        const newComment = await response.json();
        setComments((prevComments) => [...prevComments, newComment.comment]); 
      } else {
        console.error('Error submitting comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const updateComment = async (commentId, updatedComment) => {
    try {
      const response = await fetch(`http://localhost/escape-desarrollo-backend/public/api/update/comment/${commentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: updatedComment }),
        credentials: 'include',
      });

      if (response.ok) {
        const updatedData = await response.json();
        setComments((prevComments) =>
          prevComments.map((comment) => (comment.id === commentId ? updatedData : comment))
        );
      } else {
        console.error('Error updating comment');
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost/escape-desarrollo-backend/public/api/delete/comment/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      } else {
        console.error('Error deleting comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const getCommentCount = async (postId) => {
    try {
      const response = await fetch(`http://localhost/escape-desarrollo-backend/public/api/count/comments/${postId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(`Número de comentarios: ${data.comment_count}`);
        return data.comment_count;
      } else {
        console.error('Error fetching comment count');
      }
    } catch (error) {
      console.error('Error fetching comment count:', error);
    }
  };

  return { comments, fetchComments, submitComment, updateComment, deleteComment, getCommentCount };
};