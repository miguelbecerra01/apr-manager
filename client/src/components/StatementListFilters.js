import React from 'react';
import { connect } from 'react-redux';
import StatementList from './StatementList';
import { startGetStatementByAccountId } from '../actions/statements';

export class StatementListFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountId: 'PLC-0382'
        }
    };
    onChangeAccountInput = (e) => {
        const accountId = e.target.value;
        this.setState(() => ({
            accountId
        }));
    };
    onGetStatementByAccountId = (e) => {
        e.preventDefault();
        this.props.startGetStatementByAccountId(this.state.accountId);

    }
    render() {
        return (
            <div>
                <form onSubmit={this.onGetStatementByAccountId}>
                    <label>Ingresa tu numero de cuenta: </label>
                    <input placeholder="Nro de cuenta" onChange={this.onChangeAccountInput} value={this.state.accountId} />
                    <button>Buscar</button>
                </form>
                <StatementList statements={this.props.statements} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ statements: state.statements });

const mapDispatchToProps = (dispatch) => ({
    startGetStatementByAccountId: (accountId) => dispatch(startGetStatementByAccountId(accountId))
});

export default connect(mapStateToProps, mapDispatchToProps)(StatementListFilters);