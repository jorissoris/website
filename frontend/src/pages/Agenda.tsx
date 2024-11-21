import './Agenda.css';

import GenericPage from './GenericPage.tsx';
import ContentCard from '../components/ContentCard.tsx';

export default function Agenda() {
    return <GenericPage><div className="Agenda">
        <div className="Agenda-settings">
            <ContentCard>
                <h1>Calender</h1>
                <p>To register for activities you must first log in.</p>
                <p>Questions about activities or climbing weekends? Contact the board or the climbing commissioner.</p>
            </ContentCard>
            <ContentCard>
                <h2>Filter</h2>
            </ContentCard>
        </div>

        <div className="Agenda-content">

        </div>

        <div className="Agenda-pagination">

        </div>
    </div></GenericPage>;
}