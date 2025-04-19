// BlogList.js
import React from 'react';
import { Link } from 'react-router-dom';

function BlogList() {
  // Sample data for blog posts
  const blogs = [
    { id: 1, title: 'Blog Post 1' },
    { id: 2, title: 'Blog Post 2' },
    { id: 3, title: 'Blog Post 3' }
  ];

  return (
    <div className="blog-list">
      <h1>Blog List</h1>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
