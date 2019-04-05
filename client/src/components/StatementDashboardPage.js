import React from 'react';
import StatementFilters from './StatementFilters';
import { connect } from 'react-redux';
import StatementItem from './StatementItem';

export class StatementDashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    componentDidUpdate() {
        // console.log(this.props.payments);
        //go to payment provider site
        if (this.props.payments.hasOwnProperty('urlPayment')) {
            window.location = this.props.payments.urlPayment;
        }
    }
    render() {
        return (
            <div>
                <h3>Tu cuenta</h3>
                <StatementFilters />
                {this.props.statements.hasOwnProperty('account') && <StatementItem statements={this.props.statements} />}
                {this.props.statements.status && <p>Sin datos o cuenta pendiente por pagar</p>}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    // console.log('StatementDashboardPage', state)
    return {
        statements: state.statements,
        payments: { ...state.payments.message }
    }
};

export default connect(mapStateToProps)(StatementDashboardPage);