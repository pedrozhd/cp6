interface ButtonProps {
children: React.ReactNode;
onClick: () => void;
variant?: 'primary' | 'secondary' | 'danger';
disabled?: boolean;
icon?: React.ReactNode;
}

export default ButtonProps