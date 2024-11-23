import { dividerClasses } from '@mui/material';
import './CalenderCard.css';
import { useLanguage } from '../providers/LanguageProvider.tsx';

import TextCard from './TextCard.tsx';

import GroupIcon from '@mui/icons-material/Group';
import moment from 'moment';

import text from '../util.ts';

import 'moment/dist/locale/nl'

export default function CalenderCard(props: any) {
    const language = useLanguage();
    const localeCode = language.getLocaleCode();
    const langCode = language.getLangCode();
    moment.locale(langCode);

    const registerButton = props.registerState == 'register' ?
            (new Date(props.registrationOpenTime) > new Date() ? <p>{text("Registration opens at", "Aanmeldingen openen op")} {new Date(props.registrationOpenTime).toLocaleString(langCode)}</p>
            : new Date(props.registrationCloseTime) > new Date() ? <div className="register-button">{text("Register", "Aanmelden")}</div>
            : <p>{text("Registrations closed at", "Aanmeldingen zijn gesloten sinds")} {new Date(props.registrationCloseTime).toLocaleString(langCode)}</p>)
        : props.registerState == 'full' ? <div className="register-button full">{text("Full", "Vol"	)}</div>
        : props.registerState == 'login' ? <p>{text("You must login to register", "Je moet inloggen om je aan te melden")}</p>
        : <div></div>

    const startDate = new Date(props.startDateTime);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(props.endDateTime);
    endDate.setHours(0, 0, 0, 0);

    const startMonth = startDate.getMonth() + 1;
    const endMonth = endDate.getMonth() + 1;

    let dateResultString = '';

    if (startDate.getTime() === endDate.getTime()) {
        // Show only start date and time 
        dateResultString = moment(props.startDateTime).format('DD MMM HH:mm');
    } else if (startMonth === endMonth) {
        // Show start and end date
        dateResultString = `${moment(props.startDateTime).format('D')} - ${moment(props.endDateTime).format('D')} ${moment(props.startDateTime).format('MMM')}`;
    } else {
        // Show start and end date
        dateResultString = `${moment(props.startDateTime).format('D MMM')} - ${moment(props.endDateTime).format('D MMM')}`;
    }
    
    return <div className='CalenderCard'>
        <img className="CalenderCard-image" src={props.image}></img>
        <div className="CalenderCard-content">
            <TextCard>{props.categoryName[localeCode]}</TextCard>&nbsp;&nbsp;<TextCard>{dateResultString}</TextCard>
            <h2>{props.title[localeCode]}</h2>
            <p>{props.descriptionMarkdown[localeCode]}</p>
        </div>
        <div className="CalenderCard-bottom">
            {props.registerState != 'no-register' ? <div className="registrations"><GroupIcon /> {props.registrations}</div>: <div></div>}
            {registerButton}
        </div>
    </div>;
}