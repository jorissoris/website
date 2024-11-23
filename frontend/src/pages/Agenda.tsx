import './Agenda.css';

import GenericPage from './GenericPage.tsx';
import ContentCard from '../components/ContentCard.tsx';
import CalenderCard from '../components/CalenderCard.tsx';

import { useLanguage } from '../providers/LanguageProvider.tsx';

import { useState } from 'react';

export default function Agenda() {
    const currentDay = new Date();
    currentDay.setHours(0, 0, 0, 0);

    const aYearFromNow = new Date(currentDay.getTime()); // Copy date object
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [fromDateTime, setFromDateTime] = useState(currentDay);
    const [toDateTime, setToDateTime] = useState(aYearFromNow);

    const exampleAPIResponse = {
        "categories": [
            { id: 'climbing-weekend', 'en-US': 'Climbing Weekend', 'nl-NL': 'Klimweekend' },
            { id: 'training', 'en-US': 'Training', 'nl-NL': 'Training' },
            { id: 'exam', 'en-US': 'Exam', 'nl-NL': 'Examen' },
            { id: 'outdoor', 'en-US': 'Outdoor Climbing', 'nl-NL': 'Buitenklimmen' },
            { id: 'other', 'en-US': 'Other', 'nl-NL': 'Overig' }
        ],
        "events": [
            {
                id: 1,
                image: '/images/test-header-image.jpg',
                title: { 'en-US': 'Albufeira', 'nl-NL': 'Albufeira' },
                categoryId: 'climbing-weekend',
                categoryName: { 'en-US': 'Climbing Weekend', 'nl-NL': 'Klimweekend' },
                descriptionMarkdown: { 'en-US': 'You must register to participate!', 'nl-NL': 'Je moet je registreren om mee te doen!' },
                registrations: 12,
                startDateTime: '2022-11-06T00:00:00.000Z',
                endDateTime: '2022-11-07T00:00:00.000Z',
                registerState: 'register'
            },
            {
                id: 2,
                image: '/images/test-header-image.jpg',
                title: { 'en-US': 'Albufeira', 'nl-NL': 'Albufeira' },
                categoryId: 'climbing-weekend',
                categoryName: { 'en-US': 'Climbing Weekend', 'nl-NL': 'Klimweekend' },
                descriptionMarkdown: { 'en-US': 'This event is full!', 'nl-NL': 'Deze activiteit zit vol!' },
                registrations: 20,
                startDateTime: '2022-11-06T00:00:00.000Z',
                endDateTime: '2022-11-07T00:00:00.000Z',
                registerState: 'full'
            },
            {
                id: 3,
                image: '/images/test-header-image.jpg',
                title: { 'en-US': 'Albufeira', 'nl-NL': 'Albufeira' },
                categoryId: 'climbing-weekend',
                categoryName: { 'en-US': 'Climbing Weekend', 'nl-NL': 'Klimweekend' },
                descriptionMarkdown: { 'en-US': 'Dit examen!', 'nl-NL': 'Je moet je registreren om mee te doen!' },
                registrations: null,
                startDateTime: '2022-11-06T00:00:00.000Z',
                endDateTime: '2022-11-07T00:00:00.000Z',
                registerState: 'login'
            },
            {
                id: 4,
                image: '/images/test-header-image.jpg',
                title: { 'en-US': 'Albufeira', 'nl-NL': 'Albufeira' },
                categoryId: 'climbing-weekend',
                categoryName: { 'en-US': 'Climbing Weekend', 'nl-NL': 'Klimweekend' },
                descriptionMarkdown: { 'en-US': 'You must register to participate!', 'nl-NL': 'Je moet je registreren om mee te doen!' },
                registrations: 12,
                startDateTime: '2022-11-06T00:00:00.000Z',
                endDateTime: '2022-11-07T00:00:00.000Z',
                registerState: 'no-register'
            }
        ]
    };

    const localeCode = useLanguage().getLocaleCode();

    return <GenericPage><div className="Agenda">
        <div className="Agenda-settings">
            <ContentCard>
                <h1>Calender</h1>
                <p>To register for activities you must first log in.</p>
                <p>Questions about activities or climbing weekends? Contact the board or the climbing commissioner.</p>
            </ContentCard>
            <ContentCard>
                <h2>Filter</h2>
                <div className="form-group">
                    <label>Categories</label>
                    <select className="form-control" onChange={(e) => console.log(e.target.value)}>
                        <option value="all">All</option>
                        {exampleAPIResponse.categories.map((category: any) => <option value={category.id} key={category.id}>{category[localeCode]}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>From Date</label>
                    <input type="date" className="form-control"></input>
                </div>
                <div className="form-group">
                    <label>To Date</label>
                    <input type="date" className="form-control"></input>
                </div>
            </ContentCard>
        </div>

        <div className="Agenda-content">
            {exampleAPIResponse.events.map((event: any) => <CalenderCard {...event} key={event.id} />)}
        </div>

        <div className="Agenda-pagination">

        </div>
    </div></GenericPage>;
}