import { motion, AnimatePresence } from "motion/react";
import "./card.css";

interface CardProps {
  id: number;
  openCardId: number | null;
  onToggle: (id: number) => void;
  title: string;
  description: string;
  creator: string;
  prep_time: number;
  cook_time: number;
  dietary_tags: string[];
  imageUrl: string;
}

export default function Card({ id, openCardId, onToggle, title, description, creator, prep_time, cook_time, dietary_tags, imageUrl }: CardProps) {
  const isOpen = openCardId === id;

  return (

  );
}
