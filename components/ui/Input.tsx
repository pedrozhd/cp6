interface InputProps {
label?: string;
type?: string;
placeholder?: string;
value: string;
onChange: (value: string) => void;
onKeyPress?: (e: React.KeyboardEvent) => void;
}

export default InputProps