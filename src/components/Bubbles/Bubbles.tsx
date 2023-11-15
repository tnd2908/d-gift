
import heart from '../../assets/heart3d.png';

const Bubbles = () => {
    const bubbels = [11, 12, 24, 10, 14, 23, 18, 16, 19, 20, 22, 25, 18, 21, 15, 13, 26, 17, 13, 28, 22, 17, 18, 20, 13, 12, 14, 15, 19]
    return (
        <div className="bubbles w-full">
            {bubbels.map((b, index) => (
                <span key={'bub-' + index} style={{ animationDuration: (125 / b).toString() + 's' }}>
                    <img src={heart} alt="" />
                </span>
            ))}
        </div>
    );
};

export default Bubbles;