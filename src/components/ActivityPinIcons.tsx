import React from 'react';
import { FaRunning, FaWalking, FaSwimmer, FaBiking, FaBasketballBall, FaTableTennis, FaSkiing, FaHiking, FaFish, FaDumbbell, FaFutbol, FaYoga, FaTennisBall } from 'react-icons/fa';

interface ActivityPinIconProps {
  activity: string;
  size?: number;
  color?: string;
}

const ActivityPinIcon: React.FC<ActivityPinIconProps> = ({ 
  activity, 
  size = 48, 
  color = '#4A90E2' 
}) => {
  const getActivityIcon = () => {
    switch (activity.toLowerCase()) {
      case 'running':
        return <FaRunning />;
      case 'dancing':
        return <FaDumbbell />; // Using dumbbell as a placeholder for dancing
      case 'football':
        return <FaFutbol />;
      case 'yoga':
        return <FaYoga />;
      case 'walking':
        return <FaWalking />;
      case 'tennis':
        return <FaTennisBall />;
      case 'fishing':
        return <FaFish />;
      case 'climbing':
        return <FaHiking />; // Using hiking as a placeholder for climbing
      case 'bike':
        return <FaBiking />;
      case 'swimming':
        return <FaSwimmer />;
      case 'skiing':
        return <FaSkiing />;
      case 'table-tennis':
        return <FaTableTennis />;
      case 'basketball':
        return <FaBasketballBall />;
      default:
        return <FaRunning />;
    }
  };

  return (
    <div style={{ position: 'relative', width: size, height: size * 1.5 }}>
      {/* Pin shape */}
      <div style={{
        position: 'absolute',
        width: size,
        height: size * 1.5,
        backgroundColor: color,
        clipPath: 'polygon(50% 0%, 100% 50%, 100% 100%, 0% 100%, 0% 50%)',
      }}>
        {/* Circle cutout */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: size * 0.6,
          height: size * 0.6,
          backgroundColor: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            color: color,
            fontSize: size * 0.4,
          }}>
            {getActivityIcon()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage component
export const ActivityPinIcons: React.FC = () => {
  const activities = [
    'running',
    'dancing',
    'football',
    'yoga',
    'walking',
    'tennis',
    'fishing',
    'climbing',
    'bike',
    'swimming',
    'skiing',
    'table-tennis',
    'basketball'
  ];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: '20px',
      padding: '20px'
    }}>
      {activities.map((activity) => (
        <div key={activity} style={{ textAlign: 'center' }}>
          <ActivityPinIcon activity={activity} />
          <p style={{ marginTop: '8px', textTransform: 'capitalize' }}>{activity}</p>
        </div>
      ))}
    </div>
  );
};

export default ActivityPinIcon; 