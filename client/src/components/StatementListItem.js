import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import * as numeral from 'numeral';

export const StatementListItem = ({ account, readings, paymentByConsumption, lastPayment }) => {
    moment.locale('es');

    const address = `${account.streetName}, ${account.houseNumber}, ${account.sector}`
    const clientName = `${account.firstName} ${account.lastName} ${account.motherSurname}`
    const totalCharges = paymentByConsumption.charges.reduce((sum, charge) => (sum + charge.amount), 0);
    const totalSubsidies = paymentByConsumption.subsidies.reduce((sum, subsidy) => (sum + subsidy.amount), 0);
    const totalPending = paymentByConsumption.charges.filter((charge) => (charge.idType === 1))[0];
    const totalAmountByConsumption = totalCharges - totalSubsidies;
    const subTotalPayment = 10000;
    const comission = subTotalPayment * 0.01;
    const totalPayment = subTotalPayment + comission;

    return (
        <div>
            <div>
                <div>Cuenta</div>
                <div>
                    <p>Cuenta:{account.idAccount}</p>
                    <p>Dirección:{address}</p>
                    <p>Titular:{clientName}</p>
                    <p>Comite:{account.orgName}</p>
                </div>
                <div>
                    <p>Emision: {moment(account.emissionDate).format('ll')}</p>
                    <p>Vencimiento: {moment(account.dueDate).format('ll')}</p>
                    <p>Boleta N°: {account.ticketNumber}</p>
                    <p>Periodo Facturacion: {moment(account.billingPeriod).format('ll')}</p>
                </div>
            </div>
            <div>
                <div>Consumo</div>
                <div>
                    <p>Lectura Anterior: {readings.previousReading} al {moment(readings.previousDate).format('ll')}</p>
                    <p>Lectura Actual: {readings.currentReading} al {moment(readings.currentDate).format('ll')}</p>
                    <p>M3 Consumidos: {readings.totalConsumed}</p>
                </div>
                <div>grafico</div>
            </div>
            <div>
                <div>Pago por consumo</div>
                <div>
                    <p>Saldo Actual:</p>
                    <ul>
                        {paymentByConsumption.charges.map((charge, index) => (
                            <li key={index}> <div>{charge.type}: </div><div>{charge.amount}</div></li>
                        ))}
                        {paymentByConsumption.subsidies.map((subsidy, index) => (
                            <li key={index}><div>{subsidy.type}: </div><div> - {subsidy.amount}</div></li>
                        ))}
                    </ul>
                    <div><div>Total Consumo a Pagar: </div><div>{totalAmountByConsumption}</div></div>

                </div>
            </div>
            <div>
                <div>Pago anterior</div>
                <div>
                    <div>
                        <div>Fecha Ultimo Pago: </div>
                        <div>{lastPayment.date}</div>
                    </div>
                    <div>
                        <div>Monto Ultimo Pago: </div>
                        <div>{lastPayment.amount}</div>
                    </div>
                </div>
            </div>
            <div>
                <div><img width="200px" src="./images/webpay.png" /></div>
                <div>
                    <h3>Paga en Línea</h3>
                </div>
                <div>
                    <p>Aumenta tu tiempo y paga directamente desde tu casa,
                        con tarjeta de Debito o Credito sin preocupaciones y
                        de forma segura.
                    </p>
                    <p>Aceptamos Cuenta Rut del Banco estado y todas estas tarjetas</p>
                    <img width="300px" src="./images/tarjetas.png" />
                </div>
                <div>
                    <button>Pagar tu cuenta</button>
                </div>
            </div>
            <div>
                <div>Pago en Line</div>
                <div>
                    <h3>¿Qué quieres pagar?</h3>
                    <button>Pago Total $ {totalAmountByConsumption}</button>
                    {totalPending && <button>Pago Pendiente $ {totalPending.amount}</button>}
                </div>
                <div>
                    <div>
                        Total Consumo $ {subTotalPayment}
                        <span>Comision por servicio: $ {comission}</span>
                        Total a Pagar $ {totalPayment}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default connect()(StatementListItem);
