import React from 'react';
import ContactForm from '../../Form/Form'
import { Container, Row, Col } from 'react-bootstrap';
class Contact extends React.Component {
    render() {
        return (
            <Container>
                <h1>Contact Us</h1>
                <Row>
                    <Col>
                        <ContactForm />
                    </Col>
                </Row>

            </Container>

        )
    }
}

export default Contact;