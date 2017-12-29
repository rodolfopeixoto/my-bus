import React, { Component } from 'react';
import {
    Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Container
} from 'reactstrap';
import './../stylesheets/App.css';

class CardBus extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Card>
                        <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                        </CardBody>
                        <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card cap" />
                        <CardBody>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <CardLink href="/mapa">Visualizar o Ônibus</CardLink>
                            <CardLink href="/localizacao">Mostrar onde está Ônibus</CardLink>
                        </CardBody>
                    </Card>
                </Container>
            </div>      
        );
    }
}


export default CardBus;