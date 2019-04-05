import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGetPaymentStatus } from '../actions/payments';
import PaymentDone from './PaymentDone';
import PaymentNotDone from './PaymentNotDone';

export class PaymentResultsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }
    componentDidMount() {
        const transactionId = this.props.match.params.resp;

        this.setState(() => ({ isLoading: true }));

        new Promise((resolve, reject) => {
            resolve(this.props.getPaymentStatus(transactionId));
        }).then(() => {
            this.setState(() => ({ isLoading: false }));
        });
    }

    render() {
        return (
            <div>
                {this.state.isLoading ?
                    <div className="input-group__loader loader__image">
                        <img className="input-group__loader loader__image" src="/images/loader.gif" />
                    </div>
                    :
                    <div>
                        {this.props.payments && this.props.payments.status === 'paid' ? <PaymentDone paymentStatus={this.props.payments} /> : <PaymentNotDone paymentStatus={this.props.payments} />}
                    </div>
                }
            </div>
        )
    }
};
const mapStateToProps = (state, props) => {
    const results = props.match.params.resp;
    return {
        results: results,
        payments: { ...state.payments }
    }
}

const mapDispatchToProps = (dispatch) => ({
    getPaymentStatus: (transactionId) => dispatch(startGetPaymentStatus(transactionId))
});



export default connect(mapStateToProps, mapDispatchToProps)(PaymentResultsPage);