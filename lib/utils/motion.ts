const staggerContainer = ({
  staggerChildren,
  delayChildren,
}: {
  staggerChildren?: number
  delayChildren?: number
}) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

const fadeDownVariant = () => ({
  hidden: {
    y: -10,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.25,
    },
  },
})

const fadeUpVariant = () => ({
  hidden: {
    y: 10,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.25,
    },
  },
})

export { staggerContainer, fadeDownVariant, fadeUpVariant }
