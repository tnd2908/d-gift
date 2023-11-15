import { MutableRefObject, useEffect, useRef, useState } from 'react';
import bg from '../assets/bg.jpeg';
import './gift.scss';
type InputElement = {
    id: number,
    value: null | number | string,
    ref: MutableRefObject<HTMLInputElement> | MutableRefObject<null>
}
type Props = {
    isCorrect: boolean, 
    onCheck: (b: boolean) => void, 
    unMountCb: ()=> void,
    onShowResult: (r: boolean) => void
}

const Gift = ({ isCorrect, onCheck, onShowResult, unMountCb }: Props) => {
    const [isChecked, setIsChecked] = useState(false);
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);

    const inputsValue: InputElement[] = [
        {
            id: 1,
            value: null,
            ref: inputRef1
        },
        {
            id: 2,
            value: null,
            ref: inputRef2
        },
        {
            id: 3,
            value: null,
            ref: inputRef3
        },
        {
            id: 4,
            value: null,
            ref: inputRef4
        },
    ];

    const toggleOpen = () => {
        setIsChecked(!isChecked);
    }

    const showResult = () => {
        onShowResult(true);
    }

    const [inputs, setInputs] = useState(inputsValue);
    const [hasError, setHasError] = useState(false);

    const onInputChange = (id: number, value: string) => {
        const list = inputs.map((e => {
            if (e.id === id) {
                return {
                    ...e,
                    value,
                }
            } return {
                ...e
            }
        }));
        setInputs(list);
        const nextEle = inputs[id];
        if (nextEle && value) {
            nextEle.ref.current?.focus();
        }
        const pw = list.map(e => e.value).join('')
        if (pw.length === 4) {
            if (pw === '0511') {
                onCheck(true);
                setHasError(false);
            } else {
                setHasError(true);
                setInputs(inputsValue);
                (inputRef1.current! as HTMLInputElement).focus();
                setTimeout(() => {
                    setHasError(false);
                }, 500)
            }
        }
    }
    useEffect(() => {
        return () => unMountCb();
    }, []);

    return (
        <section
            style={{ backgroundImage: `url(${bg})` }}
            className="bg-bottom bg-cover bg-no-repeat w-full relative h-screen flex items-center justify-between flex-col">
            <div className="w-full h-[100vh] flex justify-center items-center flex-col">
                {!isCorrect && <>
                    <div className={'flex gap-6 flex-wrap ' + (hasError ? 'shake' : '')}>
                        {inputs.map(e => (
                            <div onClick={() => e.ref.current?.focus()} key={e.id} className='bg-white w-[70px] h-[70px] rounded-xl shadow-lg flex justify-center'>
                                <input min={0} max={9} ref={e.ref} value={e.value || ''} onChange={(event) => onInputChange(e.id, event.target.value)} type="number" placeholder='0' className='app-input' />
                            </div>
                        ))}
                    </div>
                    <h2 className="text-white text-lg font-extrabold mt-6">Input password</h2>
                </>
                }
            </div>
            {isCorrect && <div className="gift-container relative">
                <div onClick={toggleOpen}  className={'gift cursor-pointer ' + (!isChecked ? 'animate-bounce' : '')}>
                    <input onChange={toggleOpen} checked={isChecked} type="checkbox" className="hidden" name="" id="gift-input" />
                    <div className="gift-input-label z-10 absolute -top-[40px] -left-[10px] origin-bottom-left duration-300 cursor-pointer"></div>
                    <button onClick={showResult} className="gift-content cursor-pointer">
                        <div className="valentines-day">
                            <div className="envelope" />
                            <div className="heart" />
                            <div className="text">
                                I JUST <br />
                                WANNA <br />
                                SAY
                            </div>
                            <div className="front" />
                            <div className="text2">- Click on the heart - </div>
                        </div>
                    </button>
                </div>
            </div>}
        </section>
    );
};

export default Gift;