import React, { useState, useContext } from 'react';
import Context from '../context/context';
import { startGetStatementByAccountId, getStatementByAccountId } from '../actions/statements';


const StatementFilters = () => {
    const { dispatch } = useContext(Context);

    const [accountId, setAccountId] = useState('PLC-0385');

    const onGetStatementByAccountId = (e) => {
        e.preventDefault();
        dispatch(startGetStatementByAccountId(accountId));
    };

    const onChangeAccountInput = (e) => {
        setAccountId(e.target.value)
    };


    return (
        <div>
            <form onSubmit={onGetStatementByAccountId}>
                <label>Ingresa tu numero de cuenta: </label>
                <input placeholder="Nro de cuenta" onChange={onChangeAccountInput} value={accountId} />
                <button>Buscar</button>
            </form>
        </div>
    );
};


export default StatementFilters;



// export class StatementFilters extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             accountId: 'PLC-0385'
//         }
//     };
//     componentDidMount() {
//         this.props.startGetStatementByAccountId(this.state.accountId);
//     }
//     onChangeAccountInput = (e) => {
//         const accountId = e.target.value;
//         this.setState(() => ({
//             accountId
//         }));
//     };
//     onGetStatementByAccountId = (e) => {
//         e.preventDefault();
//         this.props.startGetStatementByAccountId(this.state.accountId);

//     }
//     render() {
//         return (
//             <div>
//                 <form onSubmit={this.onGetStatementByAccountId}>
//                     <label>Ingresa tu numero de cuenta: </label>
//                     <input placeholder="Nro de cuenta" onChange={this.onChangeAccountInput} value={this.state.accountId} />
//                     <button>Buscar</button>
//                 </form>
//                 <StatementList statements={this.props.statements} />
//             </div>
//         )
//     }
// }

// const mapStateToProps = (state) => ({ statements: state.statements });

// const mapDispatchToProps = (dispatch) => ({
//     startGetStatementByAccountId: (accountId) => dispatch(startGetStatementByAccountId(accountId))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(StatementFilters);