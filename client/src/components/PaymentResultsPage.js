import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class PaymentResultsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { description: '' };
    }
    componentDidMount() {


    }

    render() {
        return (
            <div>

                {this.props.results.status === 'declined' && <div>Se ha cancelado el pago <Link to="/statements/">Volver a la pantalla de pago</Link></div>}
                <input type="text" id="token" />
            </div>
        )
    }
};
const mapStateToProps = (state, props) => {
    let querystring = Buffer.from(props.match.params.resp, 'base64').toString('utf-8');
    const results = JSON.parse(querystring);
    console.log(results);
    console.log(state);
    return {
        results: results,
        payments: { ...state.payments }
    }
}
export default connect(mapStateToProps)(PaymentResultsPage);