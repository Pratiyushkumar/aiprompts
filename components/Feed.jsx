'use client';

import React, { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const fetchSearchText = (searchText) => {
    const regex = new RegExp(searchText, 'i');
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    let searchTimeOut;
    setSearchText(e.target.value);
    clearTimeout(searchTimeOut);
    searchTimeOut = setTimeout(() => {
      const searchResult = fetchSearchText(e.target.value);
      setSearchedResults(searchResult);
    }, 500);
  };

  const handleTagClick = (value) => {
    setSearchText(value);
    const searchResult = fetchSearchText(value);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a #tag or a username or text'
          required
          className='search_input peer'
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>
      {searchText ? (
        <>
          <PromptCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        </>
      ) : (
        <>
          <PromptCardList data={posts} handleTagClick={handleTagClick} />
        </>
      )}
    </section>
  );
};

export default Feed;
