type Props = {
    children: React.ReactNode;
    className?: string;
};

const Card = ({ children, className }: Props) => {
    return <div className={`bg-white rounded-md p-4 shadow-md w-full ${className ? className : ""}`}>{children}</div>;
};

export default Card;
