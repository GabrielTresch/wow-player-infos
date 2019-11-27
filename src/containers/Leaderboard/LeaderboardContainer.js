import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LeaderboardInfos from '../../api/Leaderboard';
import Leaderboard from '../../components/Leaderboard/Leaderboard';

const LeaderboardContainer = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  const token = useSelector((state) => state.token);

  useEffect(() => {
    LeaderboardInfos(token).then((data) => {
      setLeaderboard(data);
    });
  }, [token]);
  return (
    <Leaderboard leaderboard={leaderboard} />
  );
};

export default LeaderboardContainer;
