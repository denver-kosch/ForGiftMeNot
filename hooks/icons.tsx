import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';

interface IconProps {
  color: string;
  size: number;
}

export const HomeIcon: React.FC<IconProps> = ({ color, size }) => <Entypo name="home" color={color} size={size} />;

export const ListIcon: React.FC<IconProps> = ({ color, size }) => <Entypo name="list" color={color} size={size} />;

export const SettingsIcon: React.FC<IconProps> = ({ color, size }) => <Entypo name="cog" color={color} size={size} />;

export const ViewIcon: React.FC<IconProps> = ({ color, size }) => <Entypo name="eye" color={color} size={size} />;

export const NotifIcon: React.FC<IconProps> = ({ color, size }) => <Entypo name="bell" color={color} size={size} />;

export const SearchIcon: React.FC<IconProps> = ({ color, size }) => <Entypo name="magnifying-glass" color={color} size={size} />;

export const WebIcon: React.FC<IconProps> = ({ color, size }) => <Entypo name="globe" color={color} size={size} />;

export const BackIcon: React.FC<IconProps> = ({ color, size }) => <Entypo name="chevron-left" color={color} size={size} />;

export const ForwardIcon: React.FC<IconProps> = ({ color, size }) => <Entypo name="chevron-right" color={color} size={size} />;

export const CloseIcon: React.FC<IconProps> = ({ color, size }) => <Entypo name="cross" color={color} size={size} />;

export const AddIcon: React.FC<IconProps> = ({ color, size }) => <Entypo name="plus" color={color} size={size} />;

export const ProfileIcon: React.FC<IconProps> = ({ color, size }) => <Entypo name="user" color={color} size={size} />;