import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function EventCard(props) {
  let title = props.title;
  let description = props.description;
  let time = props.time;
  let redirect = props.redirect;

  return (
    <Card className="">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{time}</small>
      </Card.Footer>
    </Card>
  );
}

export default EventCard;