import React from 'react';
import AppRouter from './AppRouter';
import Navbar from './components/UI/Navbar/Navbar';


class App extends React.Component {

    render() {
        return (
            <div>
                <Navbar/>
                <AppRouter/>
            </div>
        );
    }
}

export default App;
