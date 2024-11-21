import './GenericPage.css';

export default function GenericPage(props: { children: React.ReactNode }) {

    return <div className="GenericPage">
        <div className="GenericPage-header-image"></div>
        <div className="GenericPage-content">{props.children}</div>
    </div>
}