import * as React from 'react';
import { motion } from 'framer-motion';
import MenuItem from './MenuItem';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = ({ links, isOpen, toggleOpen }) => (
  <motion.ul variants={variants} className={isOpen ? undefined : 'hidden'}>
    {links.map((link, i) => (
      <MenuItem i={i} key={link.to} link={link} toggleOpen={toggleOpen} />
    ))}
  </motion.ul>
);



export default Navigation;
