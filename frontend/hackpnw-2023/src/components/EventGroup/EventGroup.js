import CardGroup from 'react-bootstrap/CardGroup';
import EventCard from './EventCard';

function EventCardHolder() {
  return (
    <>
      <div className="w-100 d-flex justify-content-center mt-3">
        <CardGroup className="w-50">
          <EventCard title="Testing" description="Testingasdf asdfasdfasdfasdfasd" time="July 1st, 2023, 5am" />
        </CardGroup>
      </div>
    </>
  );
}

export default EventCardHolder;