'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

const PeoplesProfile = () => {
  const [posts, setPosts] = useState([]);
  const path = usePathname();
  const searchParams = useSearchParams();
  const userName = searchParams.get('name');
  const userId = path.split('/')[2];

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (userId) fetchPosts();
  }, [userId]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  );
};

export default PeoplesProfile;
