import React from 'react';
import { PlusIcon, MinusIcon } from '../../components/Icons';

const Question = ({ faq, faqOpened, openFAQ }) => {
    const isOpen = faq===faqOpened;
    return (
        <div className="faq">
            <div className="faq-question" onClick={() => openFAQ(faq)}>
                <p>{faq.question}</p>
                <PlusIcon customClass={isOpen? 'hide' : 'show'}/>
                <MinusIcon customClass={isOpen? 'show' : 'hide'}/>
            </div>
            <div className="faq-answer">
                <p className={isOpen? 'open' : 'close'}>
                    {faq.answer}
                </p>
            </div>
        </div>
    )
}

export default Question
