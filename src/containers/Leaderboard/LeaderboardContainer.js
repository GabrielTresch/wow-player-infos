import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Leaderboard from '../../api/Leaderboard';
import './LeaderboardContainer.scss';

const LeaderboardContainer = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  const token = useSelector((state) => state.token);

  useEffect(() => {
    Leaderboard(token).then((data) => {
      setLeaderboard(data);
    });
  }, [token]);
  console.log(leaderboard);
  return (
    <h1>Leaderboard</h1>
  );
};

export default LeaderboardContainer;
