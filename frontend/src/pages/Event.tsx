import './Event.css';

import GenericPage from './GenericPage.tsx';

import CalenderCard from '../components/CalenderCard.tsx';
import ContentCard from '../components/ContentCard.tsx';

import EditIcon from '@mui/icons-material/Edit';

import { useLanguage } from '../providers/LanguageProvider.tsx';

import text from '../util.ts';

import moment from 'moment';

import Markdown from 'react-markdown'

import DataTable, { createTheme } from 'react-data-table-component';

import { useThemeMode } from '../providers/ThemeProvider.tsx';

export default function Event() {
    const exampleAPIResponse: any = {
        id: 1,
        image: '/images/test-header-image.jpg',
        title: { 'en-US': 'Albufeira', 'nl-NL': 'Albufeira' },
        categoryId: 'climbing-weekend',
        categoryName: { 'en-US': 'Climbing Weekend', 'nl-NL': 'Klimweekend' },
        descriptionMarkdown: { 'en-US': 'You must register to participate!', 'nl-NL': 'Je moet je registreren om mee te doen!' },
        registrations: 12,
        startDateTime: '2025-03-06T00:00:00.000Z',
        endDateTime: '2025-03-08T00:00:00.000Z',
        registerState: 'register',
        registrationOpenTime: '2025-03-05T00:00:00.000Z',
        registrationCloseTime: '2025-03-07T00:00:00.000Z',
        expandedDescriptionMarkdown: {
'en-US': `## General Information

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultricies quis odio vel fringilla. Cras laoreet facilisis quam. Nunc at urna in enim semper laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam commodo nisl vitae lectus ultricies congue. Sed sed eros non justo egestas semper. Vestibulum luctus augue in metus bibendum, a posuere tellus mollis. Sed sem nisi, vulputate sit amet elementum quis, bibendum nec mi.`,
'nl-NL': `## Algemene informatie

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultricies quis odio vel fringilla. Cras laoreet facilisis quam. Nunc at urna in enim semper laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam commodo nisl vitae lectus ultricies congue. Sed sed eros non justo egestas semper. Vestibulum luctus augue in metus bibendum, a posuere tellus mollis. Sed sem nisi, vulputate sit amet elementum quis, bibendum nec mi.`,
 },
        registrationsTable: [
            {
                id: 1,
                name: 'John Doe',
                email: 'xTl7T@example.com',
            }
        ]
    }
    const langCode = useLanguage().getLangCode();
    const localeCole = useLanguage().getLocaleCode();
    moment.locale(langCode);

    

    const registrationCloseTime = new Date(exampleAPIResponse.registrationCloseTime);
    const eventEndDateTime = new Date(exampleAPIResponse.endDateTime);

    let registrationClosingWarning;

    if (registrationCloseTime < eventEndDateTime) {
        registrationClosingWarning = <p><b>{text("Registration closes at", "Aanmeldingen sluiten op")} {registrationCloseTime.toLocaleString(langCode)}</b></p>;
    }

    const theme = useThemeMode().getThemeName();

    createTheme("dark", {
        background: {
            default: "#121212"
        },
        divider: {
            default: "rgba(255, 255, 255, 0.1)"
        } 
    }, "dark");

    return <GenericPage><div className="Event">
        <CalenderCard {...exampleAPIResponse}
            />
        <ContentCard>
            <Markdown>{exampleAPIResponse.expandedDescriptionMarkdown[localeCole]}</Markdown>

            {registrationClosingWarning}

            <div className="bottom-buttons">
                <div className="button"><EditIcon sx={{fontSize: '20px'}} />{text("Edit Event", "Bewerk activiteit")}</div>
            </div>
        </ContentCard>
    </div>
    
    <ContentCard>
        <div className="Event-data">
            <h1>{text("Participants", "Deelnemers")}</h1>
            <div className="data-table-holder">
            <DataTable
                columns={[
                    {
                        name: text("Name", "Naam"),
                        selector: row => row.name,
                    },
                    {
                        name: text("Email", "Email"),
                        selector: row => row.email,
                    },
                ]}
                data={exampleAPIResponse.registrationsTable}
                theme={theme}
            />
            </div>
            
        </div>
    </ContentCard>

    </GenericPage>;
}