import React from 'react';
import graph from '../assets/graph.png';
import line from '../assets/line.png';
import pie from '../assets/pie.png';
import png from '../assets/png.png';
import { ThemeContext } from '../Contexts/ContextProvider';
import { useContext } from 'react';
const Dashboard = () => {
    const { theme, toggleTheme, sidebarToggle } = useContext(ThemeContext);

    const styles = theme === 'light' ? {
        backgroundColor: '#ffffff',
        color: '#000000',
    } : {
        color: '#ffffff',

            backgroundColor: '#1C2420',

    };

    return (
        <div className='flex flex-col justify-start items-start'>
            <div>
                <h1 className='font-bold text-2xl my-5 ml-4'>Welcome to Dashboard, Subh Bihani</h1>
            </div>
            <div className='flex flex-row flex-wrap justify-start items-center '>

                {/* Card 1 */}
                <div className='flex flex-col max-w-xs m-4 bg-white shadow-lg shadow-black cursor-pointer rounded-md p-3 hover:scale-90 transition-all duration-500 ease-in-out'style={styles}>
                    <div className='text-center'>
                        <h1 className='font-bold text-xl underline'>Transactions</h1>
                    </div>
                    <div className="max-w-full h-auto">
                        <img src={graph} alt="graph" className="object-cover" />
                    </div>
                </div>

                {/* Card 2 */}
                <div className={`flex flex-col max-w-xs m-4 bg-white shadow-lg shadow-black cursor-pointer rounded-md p-3 hover:scale-90 transition-all duration-500 ease-in-out` }style={styles}>
                    <div className='text-center'>
                        <h1 className='font-bold text-xl underline'>Sales</h1>
                    </div>
                    <div className="max-w-full h-auto">
                        <img src={line} alt="line" className="object-cover" />
                    </div>
                </div>

                {/* Card 3 */}
                <div className='flex flex-col max-w-xs m-4 bg-white shadow-lg shadow-black cursor-pointer rounded-md p-3 hover:scale-90 transition-all duration-500 ease-in-out'style={styles}>
                    <div className='text-center'>
                        <h1 className='font-bold text-xl underline'>Digital</h1>
                    </div>
                    <div className="max-w-full h-auto">
                        <img src={pie} alt="pie" className="object-cover" />
                    </div>
                </div>

                {/* Card 4 */}
                <div className='flex flex-col max-w-xs m-4 bg-white shadow-lg shadow-black cursor-pointer rounded-md p-3 hover:scale-90 transition-all duration-500 ease-in-out'style={styles}>
                    <div className='text-center'>
                        <h1 className='font-bold text-xl underline'>Marketing</h1>
                    </div>
                    <div className="max-w-full h-auto">
                        <img src={png} alt="png" className="object-cover" />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Dashboard;
