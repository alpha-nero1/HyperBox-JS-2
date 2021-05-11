/** @jsx boxToObject */

const { useVars, useReaction, createBox } = require('./hyperbox.js');

// Tutorial link: https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060
// Part two: https://medium.com/@deathmood/write-your-virtual-dom-2-props-events-a957608f5c76

const SmallBox = (props) => {
    return <div><p>Hello {props?.text}!</p></div>
}

const MediumBox = () => {
    return <div><h3>Hello!</h3></div>
}

const LargeBox = () => {
    return <div><h1>Hello!</h1><MediumBox /></div>
}

const MainBox = () => {
    const [counter, setCounter] = useVars(0);

    useReaction(() => {
        console.log('aa is counter changed!', counter);
    }, [counter])

    const onClick = () => {
        setCounter(counter + 1);
    }

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Virtuial DOM Proof of Concept!</h1>
            <h1>Clicks: {counter}</h1>
            <button
                style='margin-top: 1rem;'
                onClick={onClick} 
                className='btn btn-primary'
            >
                Click me!
            </button>
            <SmallBox text='General' counter={counter}/>
            <LargeBox />
        </div>
    );
}

function boxToObject(type, props, ...children) {
    return { type, props: props || {}, children };
}

const root = document.getElementById('root');
root.appendChild(createBox(MainBox));