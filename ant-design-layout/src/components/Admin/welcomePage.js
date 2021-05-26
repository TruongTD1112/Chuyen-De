import React from 'react';
import { getCookieByName } from '../../utils/cookieHandler';

function WelcomePage() {
    const name = getCookieByName("Name");

    return (
        <h1 class="text-center">Chào mừng {name}</h1>
    );
}

export default WelcomePage;