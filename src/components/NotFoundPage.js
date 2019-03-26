import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        ups! 404! <Link to="/">Go to Home</Link>
    </div>
);

export default NotFoundPage;