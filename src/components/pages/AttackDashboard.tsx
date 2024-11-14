import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { launchAttack } from '../../redux/slices/attackSlice';
import { socket } from '../../services/socketServics';
import { useCountdown } from '../../hooks/useCountdown'

interface Attack {
  userId: string;
  id: string;
  missileType: string;
  target: string;
  status: string;
  speed: number;
  startTime: number;
}

const AttackRow = ({ attack }: { attack: Attack }) => {
  const timeLeft = useCountdown(attack.speed);
  
  return (
    <tr>
      <td>{attack.missileType}</td>
      <td>{attack.target}</td>
      <td>{attack.status}</td>
      <td>{timeLeft > 0 ? `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}` : 'Complete'}</td>
    </tr>
  );
};

export default function AttackDashboard() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [attackType, setAttackType] = useState('');
  const [targetRegion, setTargetRegion] = useState('North');
  const [attacks, setAttacks] = useState<Attack[]>([]);

  useEffect(() => {
    if (user?.id) {
      socket.emit('joinRoom', { role: 'attack', userId: user.id });

      socket.on('attackStatus', (data) => {
        setAttacks(prev => prev.map(attack => 
          attack.id === data.attackId 
            ? { ...attack, status: data.status, speed: data.speed }
            : attack
        ));
      });

      socket.on('attackResult', (data) => {
        setAttacks(prev => prev.map(attack => 
          attack.id === data.attackId 
            ? { ...attack, status: data.outcome, speed: 0 }
            : attack
        ));
      });
    }

    return () => {
      socket.off('attackStatus');
      socket.off('attackResult');
    };
  }, [user]);

  const handleLaunchAttack = async () => {
    const attackData = {
      missileType: attackType,
      targetRegion: targetRegion,
    };

    const result = await dispatch(launchAttack(attackData));
    if (launchAttack.fulfilled.match(result)) {
      const newAttack = {
        
        id: result.payload.attackId,
        missileType: attackType,
        target: targetRegion,
        status: 'Launched',
        speed: result.payload.speed,
        startTime: Date.now()
      };
      setAttacks(prev => [...prev, { ...newAttack, userId: user?.id ?? '' }]);
    }
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

      <div className="attacks-list">
        <h2>My Attacks</h2>
        <table>
          <thead>
            <tr>
              <th>Missile Type</th>
              <th>Target</th>
              <th>Status</th>
              <th>Time Left</th>
            </tr>
          </thead>
          <tbody>
            {attacks.map((attack) => (
              <AttackRow key={attack.id} attack={attack} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
