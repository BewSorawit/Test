import * as React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const goToAbout = () => {
        navigate('/about');
    }

    return (
        <div>
            <div>Home</div>
            <button onClick={()=>navigate('/about')}>Go to About</button>
        </div>
    )
}

export default Home;
