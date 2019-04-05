import React from 'react';
import { connect } from 'react-redux';

export const PaymentDone = ({ paymentStatus }) => {
    return (
        <div>
            <div>Tu cuenta ha sido pagada exitosamente</div>
            <div>
                <span>Datos de tu transacción</span>
                {this.paymentStatus.amount}
            </div>
        </div>
    );
};

export default connect()(PaymentDone);