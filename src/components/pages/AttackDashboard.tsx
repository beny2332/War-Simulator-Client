import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { launchAttack } from '../../redux/slices/attackSlice';

export default function AttackDashboard() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [attackType, setAttackType] = useState('');
  const [targetRegion, setTargetRegion] = useState('North');
  const attackStatus = useAppSelector((state) => state.attack.status);

  useEffect(() => {
    if (user && user.role === 'attack' && user.resources && user?.resources?.length > 0) {
      setAttackType(user.resources[0].name); // Set default attack type to the first resource
    }
  }, [user]);

  const handleLaunchAttack = () => {
    dispatch(launchAttack({ attackType, targetRegion }));
  };

  return (
    <div>
      <h1>Attack Dashboard</h1>
      <div>
        <label>
          Attack Type:
          <select value={attackType} onChange={(e) => setAttackType(e.target.value)}>
            {user?.resources?.map((resource) => (
              <option key={resource.name} value={resource.name}>
                {resource.name} (Amount: {resource.amount})
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Target Region:
          <select value={targetRegion} onChange={(e) => setTargetRegion(e.target.value)}>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="Center">Center</option>
            <option value="WestBank">West Bank</option>
          </select>
        </label>
      </div>
      <button onClick={handleLaunchAttack}>Launch Attack</button>
      {attackStatus === 'loading' && <p>Launching attack...</p>}
      {attackStatus === 'succeeded' && <p>Attack launched successfully!</p>}
      {attackStatus === 'failed' && <p>Failed to launch attack. Please try again.</p>}
    </div>
  );
}