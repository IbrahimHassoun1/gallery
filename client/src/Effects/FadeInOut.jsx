import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './FadeInOut.css'; 

const FadeInOut = ({ in: inProp, children }) => {
    const [visible, setVisible] = useState(inProp);

    useEffect(() => {
        if (inProp) {
            setVisible(true);
        } else {
            const timeout = setTimeout(() => setVisible(false), 300); // Match this duration with your CSS transition
            return () => clearTimeout(timeout);
        }
    }, [inProp]);

    return (
        <div className={`fade ${inProp ? 'in' : 'out'}`} style={{ display: visible ? 'block' : 'none' }}>
            {children}
        </div>
    );
};

FadeInOut.propTypes = {
    in: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default FadeInOut;