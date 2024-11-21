import './TextCard.css';

export default function TextCard({ children }: { children: React.ReactNode }) {
    return <div className="TextCard">{children}</div>;
}