import React from 'react';
import StatementFilters from './StatementFilters';
import { connect } from 'react-redux';
import StatementItem from './StatementItem';

export class StatementDashboardPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h3>Tu cuenta</h3>
                <StatementFilters />
                {this.props.statements.hasOwnProperty('account') && <StatementItem statements={this.props.statements} />}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log('StatementDashboardPage', state.statements);
    return {
        statements: state.statements
    }
};

export default connect(mapStateToProps)(StatementDashboardPage);