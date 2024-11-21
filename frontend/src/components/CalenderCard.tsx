import './CalenderCard.css';

export default function CalenderCard() {
    return <div className='CalenderCard'>
        <div className="CalenderCard-image"></div>
        <div className="CalenderCard-date"></div>
        <div className="CalenderCard-content"></div>
        <div className="CalenderCard-bottom">
            <div className="registrations"></div>

            <div className="register-button"></div>
        </div>
    </div>;
}