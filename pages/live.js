import {Form, Button} from 'react-bootstrap';

function Live() {
    return(
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Live Title</Form.Label>
                <Form.Control type="title" placeholder="Enter a title for your Live" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default Live