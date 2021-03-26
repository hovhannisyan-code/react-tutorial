import React from 'react';
import ContactForm from '../../Form/FormHook'
import { Container, Row, Col } from 'react-bootstrap';
class Contact extends React.Component {
    render() {
        return (
            <Container>
                <h1>Contact Us</h1>
                <Row>
                    <Col xs={5} className="m-auto">
                        <ContactForm />
                    </Col>
                </Row>

            </Container>

        )
    }
}

export default Contact;