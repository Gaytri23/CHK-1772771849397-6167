<<<<<<< HEAD
export const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
};
export const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, type: "spring", stiffness: 220 } }
};
export const slideRight = {
    hidden: { x: -40, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } }
};
export const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11 } }
=======
export const ease = [0.22, 1, 0.36, 1] as const;

export const pageVariants = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.44, ease } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.26 } }
};

export const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.56, ease } }
};

export const scaleSpring = {
    hidden: { scale: 0.80, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 230, damping: 22 } }
};

export const slideRight = {
    hidden: { x: -32, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.40, ease } }
};

export const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } }
>>>>>>> 6c3cdc7b (Initial commit)
};
