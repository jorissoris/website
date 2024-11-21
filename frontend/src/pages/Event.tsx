import './Event.css';

import GenericPage from './GenericPage.tsx';

import CalenderCard from '../components/CalenderCard.tsx';
import ContentCard from '../components/ContentCard.tsx';

import EditIcon from '@mui/icons-material/Edit';

export default function Event() {
    return <GenericPage><div className="Event">
        <CalenderCard
                image={'/images/test-header-image.jpg'}
                title={'Albufeira'}
                category={'Climbing Weekend'}
                description={''}
                registrations={'12'}
                datetimes={'06 - 07 nov'}
                registerState={'register'}
            />
        <ContentCard>
            <h2>General Information</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultricies quis odio vel fringilla. Cras laoreet facilisis quam. Nunc at urna in enim semper laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam commodo nisl vitae lectus ultricies congue. Sed sed eros non justo egestas semper. Vestibulum luctus augue in metus bibendum, a posuere tellus mollis. Sed sem nisi, vulputate sit amet elementum quis, bibendum nec mi.</p>

            <div className="bottom-buttons">
                <div className="button"><EditIcon sx={{fontSize: '20px'}} />Edit Event</div>
            </div>
        </ContentCard>
    </div></GenericPage>;
}