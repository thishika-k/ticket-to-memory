import React from 'react';
import { motion } from 'motion/react';
import { 
  Film, 
  Music, 
  TrainFront, 
  Plane, 
  Ticket as TicketIcon,
  Download,
  Share2,
  Heart,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Type,
  Palette,
  ChevronRight
} from 'lucide-react';

const icons = {
  Film,
  Music,
  TrainFront,
  Plane,
  TicketIcon,
  Download,
  Share2,
  Heart,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Type,
  Palette,
  ChevronRight
};

export type IconName = keyof typeof icons;

interface AnimatedIconProps {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({ name, size = 20, className, style }) => {
  const Icon = icons[name];

  const variants = {
    initial: { scale: 1, rotate: 0, x: 0, y: 0 },
    hover: (name: IconName) => {
      switch (name) {
        case 'Plane':
          return { 
            x: [0, 10, -5, 0], 
            y: [0, -10, 5, 0], 
            rotate: [0, -15, 10, 0],
            transition: { duration: 0.6, ease: "easeInOut" }
          };
        case 'Music':
          return { 
            scale: [1, 1.2, 1],
            rotate: [0, 15, -15, 0],
            transition: { duration: 0.5, repeat: Infinity }
          };
        case 'Film':
          return { 
            rotate: 360,
            transition: { duration: 1, ease: "linear", repeat: Infinity }
          };
        case 'TrainFront':
          return { 
            x: [0, 5, -5, 0],
            transition: { duration: 0.4, repeat: Infinity }
          };
        case 'Heart':
          return { 
            scale: [1, 1.3, 1],
            transition: { duration: 0.4, repeat: Infinity }
          };
        case 'Download':
          return { 
            y: [0, 4, 0],
            transition: { duration: 0.6, repeat: Infinity }
          };
        case 'Share2':
          return { 
            scale: 1.2,
            rotate: 45,
            transition: { duration: 0.3 }
          };
        case 'Sparkles':
          return { 
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
            transition: { duration: 0.8, repeat: Infinity }
          };
        default:
          return { scale: 1.1, transition: { duration: 0.2 } };
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      custom={name}
      variants={variants}
      className={className}
      style={{ display: 'inline-flex', ...style }}
    >
      <Icon size={size} />
    </motion.div>
  );
};
