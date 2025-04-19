// BlogPost.js
import React from 'react';
import { useParams } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();

  // Sample data for blog posts
  const blogs = [
    { id: 1, title: 'Blog Post 1', content: 'Content of Blog Post 1' },
    { id: 2, title: 'Blog Post 2', content: 'Content of Blog Post 2' },
    { id: 3, title: 'Blog Post 3', content: 'Content of Blog Post 3' }
  ];

  // Find the blog post by ID
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) {
    return <h2>Blog post not found!</h2>;
  }

  return (
    <div className="blog-post">
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}

export default BlogPost;
