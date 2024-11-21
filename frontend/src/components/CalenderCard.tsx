import { dividerClasses } from '@mui/material';
import './CalenderCard.css';

import TextCard from './TextCard.tsx';

import GroupIcon from '@mui/icons-material/Group';
import Moment from 'react-moment';

export default function CalenderCard(props: any) {

    const registerButton = props.registerState == 'register' ? <div className="register-button">Register</div>
        : props.registerState == 'full' ? <div className="register-button full">Full</div>
        : props.registerState == 'login' ? <div>You must login to register</div>
        : <div></div>
    

    return <div className='CalenderCard'>
        <img className="CalenderCard-image" src={props.image}></img>
        <div className="CalenderCard-content">
            <TextCard>{props.category}</TextCard>&nbsp;&nbsp;<TextCard>{props.datetimes}</TextCard>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </div>
        <div className="CalenderCard-bottom">
            {props.registerState != 'no-register' ? <div className="registrations"><GroupIcon /> {props.registrations}</div>: <div></div>}
            {registerButton}
        </div>
    </div>;
}