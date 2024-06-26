const ChildComponent = ({ onStateChange }) => {
     const [childState, setChildState] = useState('');

    const handleChange = (e) => { 
        const value = e.target.value;
         setChildState(value); 
         onStateChange(value);
         };
    
    return ( 
    {
        childState

    }
     );
    
    }