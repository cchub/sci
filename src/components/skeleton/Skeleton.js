import React from 'react';

import './Skeleton.scss';

const Skeleton = ({len}) => {
    const arr = Array.from(Array(len).keys());
    return (
        <div className="skeleton-div">
            {
                arr.map(item => (
                    <div key={item} className="card">
                        <div className="top-section">
                            <div></div>
                            <div></div>
                        </div>
                        <div className="middle">
                            <div></div>
                            <div></div>
                        </div>
                        <div className="bottom">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Skeleton
