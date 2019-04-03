import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGetPaymentStatus } from '../actions/payments';

export class PaymentResultsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { description: '' };
    }
    componentDidMount() {
        console.log(this.props.match.params.resp);
        const transactionId = this.props.match.params.resp;
        this.props.startGetPaymentStatus(transactionId)
    }

    render() {
        return (
            <div>

                {this.props.results.status === 'declined' && <div>Se ha cancelado el pago <Link to="/statements/">Volver a la pantalla de pago</Link></div>}

            </div>
        )
    }
};
const mapStateToProps = (state, props) => {
    // let querystring = Buffer.from(props.match.params.resp, 'base64').toString('utf-8');
    const results = props.match.params.resp;
    // console.log(results);
    // console.log(state.payments);

    return {
        results: results,
        payments: { ...state.payments }
    }
}

const mapDispatchToProps = (dispatch) => ({
    startGetPaymentStatus: (transactionId) => dispatch(startGetPaymentStatus(transactionId))
});



export default connect(mapStateToProps, mapDispatchToProps)(PaymentResultsPage);