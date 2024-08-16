import { motion } from "framer-motion";

type buttonProps = {
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: React.CSSProperties;
  rest?: any;
};

export default function Button({
  title,
  onClick,
  disabled,
  children,
  className,
  ...rest
}: buttonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`px-9 py-3 text-white dark:text-black rounded-xl w-full bg-black dark:bg-white border border-transparent shadow-sm transition-transform duration-200 ease-in-out  transform 
        
        ${disabled ? "bg-gray-300" : "bg-blue-500"} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {title || children}
    </motion.button>
  );
}
