import React from 'react';

class NavBar extends React.Component {
    render() {
        return (
            <header>
                <div className='three ui buttons'>
                    <button className='ui button active'>Image Search</button>
                    <button className='ui button'>To Do List</button>
                    <button className='ui button'>Click me please</button>
                </div>  
            </header>
        )
    }
}

export default NavBar;