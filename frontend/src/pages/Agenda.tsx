import './Agenda.css';

import GenericPage from './GenericPage.tsx';
import ContentCard from '../components/ContentCard.tsx';
import CalenderCard from '../components/CalenderCard.tsx';

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
                <div className="form-group">
                    <label>Categories</label>
                    <select className="form-control">
                        <option value="All">All</option>
                        <option value="Climbing Weekend">Climbing Weekend</option>
                        <option value="Other">Other</option>
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
            <CalenderCard
                image={'/images/test-header-image.jpg'}
                title={'Albufeira'}
                category={'Climbing Weekend'}
                description={'You must register to participate!'}
                registrations={'12'}
                datetimes={'06 - 07 nov'}
                registerState={'register'}
            />
            <CalenderCard
                image={'/images/test-header-image.jpg'}
                title={'Friday Training'}
                category={'Training'}
                description={'This training is full!'}
                registrations={'20'}
                datetimes={'07 nov 19:00 - 21:00'}
                registerState={'full'}
            />
            <CalenderCard
                image={'/images/test-header-image.jpg'}
                title={'Important Exam'}
                category={'Exam'}
                description={'This exam does not track registrations'}
                registrations={'20'}
                datetimes={'07 nov 19:00 - 21:00'}
                registerState={'no-register'}
            />
            <CalenderCard
                image={'/images/test-header-image.jpg'}
                title={'Summer Week'}
                category={'Outdoor Climbing'}
                description={'You must register to participate!'}
                registrations={'999'}
                datetimes={'07 nov - 09 dec'}
                registerState={'login'}
            />
        </div>

        <div className="Agenda-pagination">

        </div>
    </div></GenericPage>;
}