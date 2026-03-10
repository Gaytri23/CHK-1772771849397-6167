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
};
