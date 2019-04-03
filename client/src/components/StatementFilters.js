import React from 'react';
import { connect } from 'react-redux';

import { startGetStatementByAccountId } from '../actions/statements';

export class StatementFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountId: 'PLC-0385'
        }
    };
    componentDidMount() {
        this.props.startGetStatement(this.state.accountId);
    }
    onChangeAccountInput = (e) => {
        const accountId = e.target.value;
        this.setState(() => ({
            accountId
        }));
    };
    onGetStatementByAccountId = (e) => {
        e.preventDefault();
        this.props.startGetStatement(this.state.accountId);

    }
    render() {
        return (
            <div>
                <form onSubmit={this.onGetStatementByAccountId}>
                    <label>Ingresa tu numero de cuenta: </label>
                    <input placeholder="Nro de cuenta" onChange={this.onChangeAccountInput} value={this.state.accountId} />
                    <button>Buscar</button>
                </form>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    statements: { ...state.statements },
    payments: { ...state.payments }
});

const mapDispatchToProps = (dispatch) => ({
    startGetStatement: (accountId) => dispatch(startGetStatementByAccountId(accountId))
});

export default connect(mapStateToProps, mapDispatchToProps)(StatementFilters);